import {
  EMPLOYMENT_FIELD_LABELS,
  type EmploymentConditions,
  type EmploymentFieldKey,
} from "@/constants/employment";

export interface EmploymentValidationError {
  fieldId: string;
  message: string;
}

function messageFor(key: EmploymentFieldKey): string {
  return `${EMPLOYMENT_FIELD_LABELS[key].label}を入力してください。`;
}

function pushIfEmpty(
  errors: EmploymentValidationError[],
  fieldId: EmploymentFieldKey,
  value: string,
) {
  if (!value.trim()) {
    errors.push({ fieldId, message: messageFor(fieldId) });
  }
}

/**
 * Validates the legally-required 就職 disclosure fields.
 * Conditional sub-fields (fixed-term renewal, fixed overtime pay) are only
 * required when their triggering toggle is set to "あり".
 */
export function validateEmploymentConditions(
  conditions: EmploymentConditions,
): EmploymentValidationError[] {
  const errors: EmploymentValidationError[] = [];

  pushIfEmpty(errors, "dutiesScopeOfChange", conditions.dutiesScopeOfChange);
  pushIfEmpty(errors, "employmentType", conditions.employmentType);
  if (!conditions.contractPeriodType) {
    errors.push({ fieldId: "contractPeriodType", message: messageFor("contractPeriodType") });
  }
  pushIfEmpty(errors, "probationPeriod", conditions.probationPeriod);

  if (conditions.contractPeriodType === "期間の定めあり") {
    pushIfEmpty(errors, "contractPeriod", conditions.contractPeriod);

    if (!conditions.renewal.hasRenewal) {
      errors.push({ fieldId: "hasRenewal", message: messageFor("hasRenewal") });
    } else if (conditions.renewal.hasRenewal === "あり") {
      pushIfEmpty(errors, "renewalCriteria", conditions.renewal.renewalCriteria);
    }

    if (!conditions.renewal.hasRenewalLimit) {
      errors.push({ fieldId: "hasRenewalLimit", message: messageFor("hasRenewalLimit") });
    } else if (conditions.renewal.hasRenewalLimit === "あり") {
      pushIfEmpty(errors, "renewalLimitCount", conditions.renewal.renewalLimitCount);
      pushIfEmpty(errors, "totalContractPeriodLimit", conditions.renewal.totalContractPeriodLimit);
    }
  }

  pushIfEmpty(errors, "workplace", conditions.workplace);
  pushIfEmpty(errors, "workplaceScopeOfChange", conditions.workplaceScopeOfChange);

  pushIfEmpty(errors, "startTime", conditions.startTime);
  pushIfEmpty(errors, "endTime", conditions.endTime);
  pushIfEmpty(errors, "breakTime", conditions.breakTime);
  pushIfEmpty(errors, "scheduledWorkingHours", conditions.scheduledWorkingHours);

  if (!conditions.hasOvertime) {
    errors.push({ fieldId: "hasOvertime", message: messageFor("hasOvertime") });
  }

  if (!conditions.hasFixedOvertimePay) {
    errors.push({ fieldId: "hasFixedOvertimePay", message: messageFor("hasFixedOvertimePay") });
  } else if (conditions.hasFixedOvertimePay === "あり") {
    pushIfEmpty(errors, "fixedOvertimeHours", conditions.fixedOvertimePay.hours);
    pushIfEmpty(errors, "fixedOvertimeAmount", conditions.fixedOvertimePay.amount);
  }

  pushIfEmpty(errors, "holidays", conditions.holidays);
  pushIfEmpty(errors, "vacations", conditions.vacations);

  pushIfEmpty(errors, "baseSalary", conditions.baseSalary);
  pushIfEmpty(errors, "wageType", conditions.wageType);
  pushIfEmpty(errors, "wageCalculationMethod", conditions.wageCalculationMethod);
  pushIfEmpty(errors, "wagePaymentMethod", conditions.wagePaymentMethod);
  pushIfEmpty(errors, "wageClosingDate", conditions.wageClosingDate);
  pushIfEmpty(errors, "wagePaymentDate", conditions.wagePaymentDate);

  pushIfEmpty(errors, "resignationProcedure", conditions.resignationProcedure);
  pushIfEmpty(errors, "dismissalGrounds", conditions.dismissalGrounds);

  return errors;
}
