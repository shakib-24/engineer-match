import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { STATS, STATS_NOTE } from "@/constants/lp";

export function Statistics() {
  return (
    <section
      id="statistics"
      aria-label="サービス実績"
      className="scroll-mt-[72px] border-y border-border bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-muted p-6 text-center sm:p-8"
            >
              <dt className="order-2 text-sm text-muted-foreground md:text-base">
                {stat.label}
              </dt>
              <dd className="order-1 text-3xl font-bold text-primary md:text-4xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {STATS_NOTE}
        </p>
      </div>
    </section>
  );
}
