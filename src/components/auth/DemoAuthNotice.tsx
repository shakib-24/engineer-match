import { Info } from "lucide-react";
import { DEMO_AUTH_NOTICE } from "@/constants/auth";

interface DemoAuthNoticeProps {
  line1?: string;
  line2?: string;
}

export function DemoAuthNotice({
  line1 = DEMO_AUTH_NOTICE.line1,
  line2 = DEMO_AUTH_NOTICE.line2,
}: DemoAuthNoticeProps) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-white/15 bg-white/10 p-3.5 text-xs leading-relaxed text-white/70">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
      <p>
        {line1}
        <br />
        {line2}
      </p>
    </div>
  );
}
