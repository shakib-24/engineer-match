CREATE TABLE IF NOT EXISTS public.abuse_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
    target_type VARCHAR(20) NOT NULL,
    target_id UUID NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    admin_note TEXT,
    handled_by UUID REFERENCES public.users (id) ON DELETE RESTRICT,
    handled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_abuse_reports_target_type CHECK (target_type IN ('user', 'company', 'opportunity')),
    CONSTRAINT chk_abuse_reports_status CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected'))
);

CREATE INDEX IF NOT EXISTS idx_abuse_reports_status ON public.abuse_reports (status);
CREATE INDEX IF NOT EXISTS idx_abuse_reports_target ON public.abuse_reports (target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_abuse_reports_reporter ON public.abuse_reports (reporter_id);
