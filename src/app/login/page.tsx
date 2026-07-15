import type { Metadata } from "next";
import { LoginCard } from "@/components/auth/LoginCard";

export const metadata: Metadata = {
  title: "ログイン | ENGINEER MATCH",
  description: "ENGINEER MATCHにログインして、続きから始めましょう。",
};

export default function LoginPage() {
  return <LoginCard />;
}
