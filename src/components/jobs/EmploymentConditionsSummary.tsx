import { Briefcase, type LucideIcon } from "lucide-react";
import { EMPLOYMENT_SECTION_LABELS, EMPLOYMENT_SUMMARY_LABELS, type EmploymentConditions } from "@/constants/employment";

interface SummaryRow {
  label: string;
  value: string;
}

function employmentContractRows(c: EmploymentConditions): SummaryRow[] {
  const rows: SummaryRow[] = [
    { label: "業務内容の変更の範囲", value: c.dutiesScopeOfChange },
    { label: "雇用形態", value: c.employmentType },
    { label: "労働契約期間", value: c.contractPeriodType },
  ];
  if (c.contractPeriodType === "期間の定めあり") {
    rows.push({ label: "契約期間", value: c.contractPeriod });
    rows.push({ label: "契約更新の有無", value: c.renewal.hasRenewal });
    if (c.renewal.hasRenewal === "あり") {
      rows.push({ label: "契約更新の判断基準", value: c.renewal.renewalCriteria });
    }
    rows.push({ label: "更新上限の有無", value: c.renewal.hasRenewalLimit });
    if (c.renewal.hasRenewalLimit === "あり") {
      rows.push({ label: "更新回数上限", value: c.renewal.renewalLimitCount });
      rows.push({ label: "通算契約期間上限", value: c.renewal.totalContractPeriodLimit });
    }
  }
  rows.push({ label: "試用期間", value: c.probationPeriod });
  return rows.filter((row) => row.value);
}

function workplaceRows(c: EmploymentConditions): SummaryRow[] {
  return [
    { label: "就業場所", value: c.workplace },
    { label: "就業場所の変更の範囲", value: c.workplaceScopeOfChange },
  ].filter((row) => row.value);
}

function workingHoursRows(c: EmploymentConditions): SummaryRow[] {
  const rows: SummaryRow[] = [
    { label: "始業時刻", value: c.startTime },
    { label: "終業時刻", value: c.endTime },
    { label: "休憩時間", value: c.breakTime },
    { label: "所定労働時間", value: c.scheduledWorkingHours },
    { label: "時間外労働の有無", value: c.hasOvertime },
    { label: "固定残業制の有無", value: c.hasFixedOvertimePay },
  ];
  if (c.hasFixedOvertimePay === "あり") {
    rows.push({ label: "固定残業時間", value: c.fixedOvertimePay.hours });
    rows.push({ label: "固定残業代", value: c.fixedOvertimePay.amount });
    if (c.fixedOvertimePay.excessPayNote) {
      rows.push({
        label: "固定残業時間を超えた場合の追加支給",
        value: c.fixedOvertimePay.excessPayNote,
      });
    }
  }
  return rows.filter((row) => row.value);
}

function holidayRows(c: EmploymentConditions): SummaryRow[] {
  return [
    { label: "休日", value: c.holidays },
    { label: "休暇", value: c.vacations },
    { label: "年間休日数", value: c.annualHolidaysCount },
  ].filter((row) => row.value);
}

function wageRows(c: EmploymentConditions): SummaryRow[] {
  return [
    { label: "基本給", value: c.baseSalary },
    { label: "賃金形態", value: c.wageType },
    { label: "賃金の計算方法", value: c.wageCalculationMethod },
    { label: "賃金の支払方法", value: c.wagePaymentMethod },
    { label: "賃金締切日", value: c.wageClosingDate },
    { label: "賃金支払日", value: c.wagePaymentDate },
    { label: "手当", value: c.allowances },
    { label: "昇給", value: c.salaryIncrease },
    { label: "賞与", value: c.bonus },
  ].filter((row) => row.value);
}

function resignationRows(c: EmploymentConditions): SummaryRow[] {
  return [
    { label: "退職に関する事項", value: c.resignationProcedure },
    { label: "解雇事由", value: c.dismissalGrounds },
  ].filter((row) => row.value);
}

function otherRows(c: EmploymentConditions): SummaryRow[] {
  return [
    { label: "退職手当", value: c.retirementAllowance },
    { label: "臨時に支払われる賃金", value: c.temporaryWages },
    { label: "労働者負担", value: c.employeeBurden },
    { label: "安全衛生", value: c.safetyAndHealth },
    { label: "職業訓練", value: c.vocationalTraining },
    { label: "災害補償", value: c.disasterCompensation },
    { label: "表彰・制裁", value: c.commendationAndSanctions },
    { label: "休職", value: c.leaveOfAbsence },
  ].filter((row) => row.value);
}

function SummaryGroup({
  title,
  rows,
  first,
}: {
  title: string;
  rows: SummaryRow[];
  first?: boolean;
}) {
  if (rows.length === 0) return null;
  return (
    <div className={first ? "" : "mt-6 border-t border-border pt-6"}>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <dl className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs text-muted-foreground">{row.label}</dt>
            <dd className="mt-1 text-sm font-medium whitespace-pre-line text-foreground">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface EmploymentConditionsSummaryProps {
  conditions: EmploymentConditions;
  icon?: LucideIcon;
}

export function EmploymentConditionsSummary({
  conditions,
  icon: Icon = Briefcase,
}: EmploymentConditionsSummaryProps) {
  const groups: Array<{ title: string; rows: SummaryRow[] }> = [
    { title: EMPLOYMENT_SECTION_LABELS.employmentContract, rows: employmentContractRows(conditions) },
    { title: EMPLOYMENT_SECTION_LABELS.workplace, rows: workplaceRows(conditions) },
    { title: EMPLOYMENT_SECTION_LABELS.workingHours, rows: workingHoursRows(conditions) },
    { title: EMPLOYMENT_SECTION_LABELS.holidays, rows: holidayRows(conditions) },
    { title: EMPLOYMENT_SECTION_LABELS.wage, rows: wageRows(conditions) },
    { title: EMPLOYMENT_SECTION_LABELS.resignation, rows: resignationRows(conditions) },
    { title: EMPLOYMENT_SECTION_LABELS.other, rows: otherRows(conditions) },
  ];
  const visibleGroups = groups.filter((group) => group.rows.length > 0);

  if (visibleGroups.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {EMPLOYMENT_SUMMARY_LABELS.title}
        </h3>
      </div>
      <div className="mt-5">
        {visibleGroups.map((group, index) => (
          <SummaryGroup key={group.title} title={group.title} rows={group.rows} first={index === 0} />
        ))}
      </div>
    </section>
  );
}
