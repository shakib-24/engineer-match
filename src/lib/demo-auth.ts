/**
 * Demo authentication utility.
 *
 * This is a UI-only demo helper — there is no backend, no database, and no
 * real session handling behind it. Credentials below exist purely so the
 * login/registration UI has something deterministic to compare against.
 *
 * Do not treat this as secure authentication. Do not persist these
 * passwords (or any user-entered password) to localStorage, sessionStorage,
 * or cookies.
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
