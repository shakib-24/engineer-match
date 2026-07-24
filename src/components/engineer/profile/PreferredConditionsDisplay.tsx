interface PreferredConditionsDisplayProps {
  contractTypeLabels: string[];
  locations: string[];
  workStyleLabel: string | null;
  availableFrom: string | null;
  desiredRateMin: number | null;
  desiredRateMax: number | null;
  desiredAnnualIncomeMin: number | null;
  desiredAnnualIncomeMax: number | null;
  desiredHourlyRateMin: number | null;
  desiredHourlyRateMax: number | null;
}

/** Shared between the engineer's own profile page and the company detail view -- restores the old PreferredConditions.tsx sharing pattern. */
export function PreferredConditionsDisplay({
  contractTypeLabels,
  locations,
  workStyleLabel,
  availableFrom,
  desiredRateMin,
  desiredRateMax,
  desiredAnnualIncomeMin,
  desiredAnnualIncomeMax,
  desiredHourlyRateMin,
  desiredHourlyRateMax,
}: PreferredConditionsDisplayProps) {
  const hasMonthlyRate = desiredRateMin !== null && desiredRateMax !== null;
  const hasAnnualIncome = desiredAnnualIncomeMin !== null && desiredAnnualIncomeMax !== null;
  const hasHourlyRate = desiredHourlyRateMin !== null && desiredHourlyRateMax !== null;

  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {contractTypeLabels.length > 0 && (
        <div>
          <dt className="text-xs text-muted-foreground">希望契約形態</dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {contractTypeLabels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                {label}
              </span>
            ))}
          </dd>
        </div>
      )}
      {locations.length > 0 && (
        <div>
          <dt className="text-xs text-muted-foreground">希望勤務地</dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {locations.map((location) => (
              <span
                key={location}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
              >
                {location}
              </span>
            ))}
          </dd>
        </div>
      )}
      {workStyleLabel && (
        <div>
          <dt className="text-xs text-muted-foreground">リモート希望</dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">{workStyleLabel}</dd>
        </div>
      )}
      {availableFrom && (
        <div>
          <dt className="text-xs text-muted-foreground">稼働開始可能日</dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">{availableFrom}</dd>
        </div>
      )}
      {hasAnnualIncome && (
        <div>
          <dt className="text-xs text-muted-foreground">希望年収</dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">
            {desiredAnnualIncomeMin}万円〜{desiredAnnualIncomeMax}万円
          </dd>
        </div>
      )}
      {hasMonthlyRate && (
        <div>
          <dt className="text-xs text-muted-foreground">希望月額単価</dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">
            {desiredRateMin}万円〜{desiredRateMax}万円
          </dd>
        </div>
      )}
      {hasHourlyRate && (
        <div>
          <dt className="text-xs text-muted-foreground">希望時間単価</dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">
            {desiredHourlyRateMin}円〜{desiredHourlyRateMax}円
          </dd>
        </div>
      )}
    </dl>
  );
}
