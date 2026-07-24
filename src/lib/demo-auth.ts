/**
 * Dev-only login-form autofill helper (see LOGIN_DEMO_HELPER / LoginCard,
 * gated to non-production builds). These are real seeded Supabase accounts
 * -- signing in still goes through real supabase.auth.signInWithPassword,
 * this module only exists to pre-fill the two form fields.
 *
 * Do not persist these passwords (or any user-entered password) to
 * localStorage, sessionStorage, or cookies.
 */

export type DemoRole = "engineer" | "company" | "admin";

interface DemoAccount {
  email: string;
  password: string;
  role: DemoRole;
}

export const DEMO_ACCOUNTS: Record<DemoRole, DemoAccount> = {
  engineer: {
    email: "demo-engineer@engineer-match.jp",
    password: "demo123",
    role: "engineer",
  },
  company: {
    email: "demo-company@engineer-match.jp",
    password: "demo123",
    role: "company",
  },
  admin: {
    email: "admin@example.com",
    password: "Admin123!",
    role: "admin",
  },
};

export function getDashboardPath(role: DemoRole): string {
  switch (role) {
    case "engineer":
      return "/engineer/dashboard";
    case "company":
      return "/company/dashboard";
    case "admin":
      return "/admin";
  }
}

export function isValidDemoLogin(
  role: DemoRole,
  email: string,
  password: string,
): boolean {
  const account = DEMO_ACCOUNTS[role];
  return account.email === email.trim() && account.password === password;
}
