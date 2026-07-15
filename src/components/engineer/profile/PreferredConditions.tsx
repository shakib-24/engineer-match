interface PreferredConditionsLabels {
  contractTypes: string;
  locations: string;
  remotePreference: string;
  desiredAnnualIncome: string;
  desiredMonthlyRate: string;
  desiredHourlyRate: string;
  availableFrom: string;
}

interface PreferredConditionsProps {
  contractTypes: readonly string[];
  locations: readonly string[];
  remotePreference: string;
  desiredAnnualIncome: string;
  desiredMonthlyRate: string;
  desiredHourlyRate: string;
  availableFrom: string;
  labels: PreferredConditionsLabels;
}

export function PreferredConditions({
  contractTypes,
  locations,
  remotePreference,
  desiredAnnualIncome,
  desiredMonthlyRate,
  desiredHourlyRate,
  availableFrom,
  labels,
}: PreferredConditionsProps) {
  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <dt className="text-xs text-muted-foreground">{labels.contractTypes}</dt>
        <dd className="mt-1.5 flex flex-wrap gap-1.5">
          {contractTypes.map((type) => (
            <span
              key={type}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              {type}
            </span>
          ))}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">{labels.locations}</dt>
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
      <div>
        <dt className="text-xs text-muted-foreground">
          {labels.remotePreference}
        </dt>
        <dd className="mt-1.5 text-sm font-semibold text-foreground">
          {remotePreference}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">{labels.availableFrom}</dt>
        <dd className="mt-1.5 text-sm font-semibold text-foreground">
          {availableFrom}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">
          {labels.desiredAnnualIncome}
        </dt>
        <dd className="mt-1.5 text-sm font-semibold text-foreground">
          {desiredAnnualIncome}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">
          {labels.desiredMonthlyRate}
        </dt>
        <dd className="mt-1.5 text-sm font-semibold text-foreground">
          {desiredMonthlyRate}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">
          {labels.desiredHourlyRate}
        </dt>
        <dd className="mt-1.5 text-sm font-semibold text-foreground">
          {desiredHourlyRate}
        </dd>
      </div>
    </dl>
  );
}
