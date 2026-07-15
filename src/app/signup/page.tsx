import type { Metadata } from "next";
import { RegisterCard, type AccountType } from "@/components/auth/RegisterCard";

export const metadata: Metadata = {
  title: "無料登録 | ENGINEER MATCH",
  description: "ENGINEER MATCHへの無料登録はこちらから。",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialAccountType: AccountType | undefined =
    role === "company" ? "company" : undefined;

  return <RegisterCard initialAccountType={initialAccountType} />;
}
