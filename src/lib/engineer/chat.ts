import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * public.chat_rooms / public.messages, per 012_chat.sql. One room per
 * application (uq_chat_rooms_application). Rooms are lazily created on the
 * first message sent for a given application -- see 036_chat_mvp_and_message_notifications.sql
 * for the participant-scoped INSERT policies that make this safe (no
 * auto-create-on-apply trigger exists, by original design).
 */
export interface ConversationListItem {
  chatRoomId: string;
  applicationId: string;
  companyName: string;
  opportunityTitle: string;
  lastMessageBody: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

/**
 * Every chat_room the engineer is a participant in (chat_rooms_select_participant
 * RLS, 026_chat_policies.sql) -- batched lookups, same shape as
 * listCompanyApplicants() (src/lib/company/applicants.ts).
 */
export async function listMyConversations(
  supabase: SupabaseClient,
  userId: string,
): Promise<ConversationListItem[]> {
  const { data: rooms, error } = await supabase
    .from("chat_rooms")
    .select("id, application_id, company_user_id")
    .eq("engineer_id", userId);

  if (error) {
    console.error("[engineer-chat] failed to list chat rooms:", error);
    return [];
  }
  if (!rooms || rooms.length === 0) return [];

  const roomIds = rooms.map((r) => r.id as string);
  const applicationIds = rooms.map((r) => r.application_id as string);
  const companyIds = [...new Set(rooms.map((r) => r.company_user_id as string))];

  const [{ data: applications }, { data: companies }, { data: messages }] = await Promise.all([
    supabase.from("applications").select("id, opportunity_id").in("id", applicationIds),
    supabase.from("company_profiles").select("id, company_name").in("id", companyIds),
    supabase
      .from("messages")
      .select("chat_room_id, sender_id, body, sent_at, read_at")
      .in("chat_room_id", roomIds)
      .order("sent_at", { ascending: false }),
  ]);

  const opportunityIds = [
    ...new Set((applications ?? []).map((a) => a.opportunity_id as string)),
  ];
  const { data: opportunities } = await supabase
    .from("opportunities")
    .select("id, title")
    .in("id", opportunityIds);

  const opportunityIdByApplication = new Map(
    (applications ?? []).map((a) => [a.id as string, a.opportunity_id as string]),
  );
  const opportunityTitleById = new Map(
    (opportunities ?? []).map((o) => [o.id as string, o.title as string]),
  );
  const companyNameById = new Map(
    (companies ?? []).map((c) => [c.id as string, c.company_name as string]),
  );

  const lastMessageByRoom = new Map<string, { body: string; sent_at: string }>();
  const unreadCountByRoom = new Map<string, number>();
  for (const row of (messages ?? []) as {
    chat_room_id: string;
    sender_id: string;
    body: string;
    sent_at: string;
    read_at: string | null;
  }[]) {
    if (!lastMessageByRoom.has(row.chat_room_id)) {
      lastMessageByRoom.set(row.chat_room_id, { body: row.body, sent_at: row.sent_at });
    }
    if (row.sender_id !== userId && row.read_at === null) {
      unreadCountByRoom.set(row.chat_room_id, (unreadCountByRoom.get(row.chat_room_id) ?? 0) + 1);
    }
  }

  return rooms
    .map((room) => {
      const opportunityId = opportunityIdByApplication.get(room.application_id as string);
      const last = lastMessageByRoom.get(room.id as string);
      return {
        chatRoomId: room.id as string,
        applicationId: room.application_id as string,
        companyName: companyNameById.get(room.company_user_id as string) ?? "",
        opportunityTitle: opportunityId ? (opportunityTitleById.get(opportunityId) ?? "") : "",
        lastMessageBody: last?.body ?? null,
        lastMessageAt: last?.sent_at ?? null,
        unreadCount: unreadCountByRoom.get(room.id as string) ?? 0,
      };
    })
    .sort((a, b) => (b.lastMessageAt ?? "").localeCompare(a.lastMessageAt ?? ""));
}

export interface ConversationMessage {
  id: string;
  senderId: string;
  body: string;
  sentAt: string;
  readAt: string | null;
}

export interface ConversationDetail {
  chatRoomId: string;
  applicationId: string;
  companyName: string;
  opportunityTitle: string;
  messages: ConversationMessage[];
}

/**
 * Loads the conversation for one of the engineer's own applications,
 * creating the chat_room row on first use if it doesn't exist yet. Returns
 * null uniformly for "not my application" and "application doesn't exist" --
 * applications_select_own RLS (025_application_policies.sql) already makes
 * these collapse to the same "no row" result.
 */
export async function getOrCreateConversationForApplication(
  supabase: SupabaseClient,
  userId: string,
  applicationId: string,
): Promise<ConversationDetail | null> {
  const { data: application, error: applicationError } = await supabase
    .from("applications")
    .select("id, opportunity_id, applicant_id")
    .eq("id", applicationId)
    .eq("applicant_id", userId)
    .maybeSingle();

  if (applicationError) {
    console.error("[engineer-chat] failed to load application:", applicationError);
    return null;
  }
  if (!application) return null;

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select("id, title, posted_by")
    .eq("id", application.opportunity_id)
    .maybeSingle();

  if (!opportunity) return null;

  const { data: company } = await supabase
    .from("company_profiles")
    .select("company_name")
    .eq("id", opportunity.posted_by)
    .maybeSingle();

  let { data: room } = await supabase
    .from("chat_rooms")
    .select("id")
    .eq("application_id", applicationId)
    .maybeSingle();

  if (!room) {
    const { data: createdRoom, error: createError } = await supabase
      .from("chat_rooms")
      .insert({
        application_id: applicationId,
        engineer_id: userId,
        company_user_id: opportunity.posted_by,
      })
      .select("id")
      .single();

    if (createError || !createdRoom) {
      console.error("[engineer-chat] failed to create chat room:", createError);
      return null;
    }
    room = createdRoom;
  }

  const { data: messageRows } = await supabase
    .from("messages")
    .select("id, sender_id, body, sent_at, read_at")
    .eq("chat_room_id", room.id)
    .order("sent_at", { ascending: true });

  return {
    chatRoomId: room.id as string,
    applicationId,
    companyName: (company?.company_name as string) ?? "",
    opportunityTitle: (opportunity.title as string) ?? "",
    messages: ((messageRows ?? []) as {
      id: string;
      sender_id: string;
      body: string;
      sent_at: string;
      read_at: string | null;
    }[]).map((row) => ({
      id: row.id,
      senderId: row.sender_id,
      body: row.body,
      sentAt: row.sent_at,
      readAt: row.read_at,
    })),
  };
}

export async function sendMessage(
  supabase: SupabaseClient,
  chatRoomId: string,
  senderId: string,
  body: string,
) {
  return supabase
    .from("messages")
    .insert({ chat_room_id: chatRoomId, sender_id: senderId, body })
    .select("id, sender_id, body, sent_at, read_at")
    .single();
}

/** Marks every unread message from the other participant as read (messages_update_read_receipt RLS). */
export async function markConversationRead(
  supabase: SupabaseClient,
  chatRoomId: string,
  viewerId: string,
) {
  return supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("chat_room_id", chatRoomId)
    .neq("sender_id", viewerId)
    .is("read_at", null);
}
