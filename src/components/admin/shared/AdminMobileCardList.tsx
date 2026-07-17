import type { ReactNode } from "react";

export function AdminMobileCardList({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3 lg:hidden">{children}</div>;
}
