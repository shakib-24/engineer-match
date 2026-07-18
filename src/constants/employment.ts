/**
 * Employment (就職) labor-condition disclosure module.
 * UI only — no backend, no database. Field set follows the disclosure
 * items summarized by MHLW guidance on written labor condition notices:
 * https://www.mhlw.go.jp/bunya/roudoukijun/faq_kijyunhou_4.html
 *
 * Shared by the company create/edit job form and by the read-only
 * summaries shown on company/engineer/admin detail pages.
 */

// ============================================================
// Options
// ============================================================

export const EMPLOYMENT_TYPE_OPTIONS = [
  "正社員",
  "契約社員",
  "嘱託社員",
  "パート・アルバイト",
] as const;

export const CONTRACT_PERIOD_TYPE_OPTIONS = ["期間の定めなし", "期間の定めあり"] as const;
export type ContractPeriodType = (typeof CONTRACT_PERIOD_TYPE_OPTIONS)[number] | "";

export const WAGE_TYPE_OPTIONS = ["月給", "年俸", "日給", "時給"] as const;

export const YES_NO_OPTIONS = ["あり", "なし"] as const;
export type YesNo = (typeof YES_NO_OPTIONS)[number] | "";

// ============================================================
// Types
// ============================================================

export interface FixedTermRenewalConditions {
  hasRenewal: YesNo; // 契約更新の有無
  renewalCriteria: string; // 契約更新の判断基準
  hasRenewalLimit: YesNo; // 更新上限の有無
  renewalLimitCount: string; // 更新回数上限
  totalContractPeriodLimit: string; // 通算契約期間上限
}

export interface FixedOvertimePayConditions {
  hours: string; // 固定残業時間
  amount: string; // 固定残業代
  excessPayNote: string; // 固定残業時間を超えた場合の追加支給
}

export interface EmploymentConditions {
  // 雇用契約
  dutiesScopeOfChange: string; // 業務内容の変更の範囲
  employmentType: string; // 雇用形態
  contractPeriodType: ContractPeriodType; // 労働契約期間（期間の定めなし／あり）
  contractPeriod: string; // 労働契約期間（有期の場合の具体的な期間）
  probationPeriod: string; // 試用期間
  renewal: FixedTermRenewalConditions; // 有期契約時の更新条件

  // 就業場所
  workplace: string; // 就業場所
  workplaceScopeOfChange: string; // 就業場所の変更の範囲

  // 勤務時間
  startTime: string; // 始業時刻
  endTime: string; // 終業時刻
  breakTime: string; // 休憩時間
  scheduledWorkingHours: string; // 所定労働時間
  hasOvertime: YesNo; // 時間外労働の有無
  hasFixedOvertimePay: YesNo; // 固定残業制の有無
  fixedOvertimePay: FixedOvertimePayConditions;

  // 休日・休暇
  holidays: string; // 休日
  vacations: string; // 休暇
  annualHolidaysCount: string; // 年間休日数（任意）

  // 賃金・待遇
  baseSalary: string; // 基本給
  wageType: string; // 賃金形態
  wageCalculationMethod: string; // 賃金の計算方法
  wagePaymentMethod: string; // 賃金の支払方法
  wageClosingDate: string; // 賃金締切日
  wagePaymentDate: string; // 賃金支払日
  allowances: string; // 手当（任意）
  salaryIncrease: string; // 昇給（任意）
  bonus: string; // 賞与（任意）

  // 退職
  resignationProcedure: string; // 退職に関する事項
  dismissalGrounds: string; // 解雇事由

  // その他の労働条件（すべて任意）
  retirementAllowance: string; // 退職手当
  temporaryWages: string; // 臨時に支払われる賃金
  employeeBurden: string; // 労働者負担
  safetyAndHealth: string; // 安全衛生
  vocationalTraining: string; // 職業訓練
  disasterCompensation: string; // 災害補償
  commendationAndSanctions: string; // 表彰・制裁
  leaveOfAbsence: string; // 休職
}

export function createEmptyEmploymentConditions(): EmploymentConditions {
  return {
    dutiesScopeOfChange: "",
    employmentType: EMPLOYMENT_TYPE_OPTIONS[0],
    contractPeriodType: "",
    contractPeriod: "",
    probationPeriod: "",
    renewal: {
      hasRenewal: "",
      renewalCriteria: "",
      hasRenewalLimit: "",
      renewalLimitCount: "",
      totalContractPeriodLimit: "",
    },
    workplace: "",
    workplaceScopeOfChange: "",
    startTime: "",
    endTime: "",
    breakTime: "",
    scheduledWorkingHours: "",
    hasOvertime: "",
    hasFixedOvertimePay: "",
    fixedOvertimePay: { hours: "", amount: "", excessPayNote: "" },
    holidays: "",
    vacations: "",
    annualHolidaysCount: "",
    baseSalary: "",
    wageType: WAGE_TYPE_OPTIONS[0],
    wageCalculationMethod: "",
    wagePaymentMethod: "",
    wageClosingDate: "",
    wagePaymentDate: "",
    allowances: "",
    salaryIncrease: "",
    bonus: "",
    resignationProcedure: "",
    dismissalGrounds: "",
    retirementAllowance: "",
    temporaryWages: "",
    employeeBurden: "",
    safetyAndHealth: "",
    vocationalTraining: "",
    disasterCompensation: "",
    commendationAndSanctions: "",
    leaveOfAbsence: "",
  };
}

// ============================================================
// Section labels (recommended form / display order)
// ============================================================

export const EMPLOYMENT_SECTION_LABELS = {
  employmentContract: "雇用契約",
  workplace: "就業場所",
  workingHours: "勤務時間",
  holidays: "休日・休暇",
  wage: "賃金・待遇",
  resignation: "退職",
  other: "その他の労働条件",
} as const;

// ============================================================
// Field labels / placeholders / required flags
// ============================================================

interface EmploymentFieldMeta {
  label: string;
  placeholder: string;
  required: boolean;
}

export const EMPLOYMENT_FIELD_LABELS = {
  dutiesScopeOfChange: {
    label: "業務内容の変更の範囲",
    placeholder: "例：会社の定める業務全般",
    required: true,
  },
  employmentType: { label: "雇用形態", placeholder: "", required: true },
  contractPeriodType: { label: "労働契約期間", placeholder: "", required: true },
  contractPeriod: {
    label: "契約期間",
    placeholder: "例：2026年8月1日〜2027年7月31日",
    required: true,
  },
  probationPeriod: {
    label: "試用期間",
    placeholder: "例：あり（入社日から3ヶ月間）／なし",
    required: true,
  },
  hasRenewal: { label: "契約更新の有無", placeholder: "", required: true },
  renewalCriteria: {
    label: "契約更新の判断基準",
    placeholder: "例：契約期間満了時の業務量、勤務成績・態度、能力等により判断する",
    required: true,
  },
  hasRenewalLimit: { label: "更新上限の有無", placeholder: "", required: true },
  renewalLimitCount: { label: "更新回数上限", placeholder: "例：3回", required: true },
  totalContractPeriodLimit: {
    label: "通算契約期間上限",
    placeholder: "例：通算5年",
    required: true,
  },
  workplace: {
    label: "就業場所",
    placeholder: "例：東京都渋谷区（本社オフィス）",
    required: true,
  },
  workplaceScopeOfChange: {
    label: "就業場所の変更の範囲",
    placeholder: "例：会社の定める事業所",
    required: true,
  },
  startTime: { label: "始業時刻", placeholder: "例：09:00", required: true },
  endTime: { label: "終業時刻", placeholder: "例：18:00", required: true },
  breakTime: { label: "休憩時間", placeholder: "例：60分", required: true },
  scheduledWorkingHours: {
    label: "所定労働時間",
    placeholder: "例：1日8時間・週40時間",
    required: true,
  },
  hasOvertime: { label: "時間外労働の有無", placeholder: "", required: true },
  hasFixedOvertimePay: { label: "固定残業制の有無", placeholder: "", required: true },
  fixedOvertimeHours: { label: "固定残業時間", placeholder: "例：月20時間分", required: true },
  fixedOvertimeAmount: { label: "固定残業代", placeholder: "例：45,000円", required: true },
  fixedOvertimeExcessPayNote: {
    label: "固定残業時間を超えた場合の追加支給",
    placeholder: "例：超過分は別途割増賃金を支給",
    required: false,
  },
  holidays: {
    label: "休日",
    placeholder: "例：土日祝日、年末年始（12/29〜1/3）",
    required: true,
  },
  vacations: {
    label: "休暇",
    placeholder: "例：年次有給休暇、慶弔休暇、産前産後休暇",
    required: true,
  },
  annualHolidaysCount: { label: "年間休日数", placeholder: "例：125日", required: false },
  baseSalary: { label: "基本給", placeholder: "例：月額250,000円", required: true },
  wageType: { label: "賃金形態", placeholder: "", required: true },
  wageCalculationMethod: {
    label: "賃金の計算方法",
    placeholder: "例：所定労働時間分の月額固定給として計算",
    required: true,
  },
  wagePaymentMethod: {
    label: "賃金の支払方法",
    placeholder: "例：本人名義の銀行口座へ振込",
    required: true,
  },
  wageClosingDate: { label: "賃金締切日", placeholder: "例：毎月末日", required: true },
  wagePaymentDate: { label: "賃金支払日", placeholder: "例：翌月25日", required: true },
  allowances: { label: "手当", placeholder: "例：通勤手当、住宅手当", required: false },
  salaryIncrease: { label: "昇給", placeholder: "例：年1回（4月）", required: false },
  bonus: { label: "賞与", placeholder: "例：年2回（6月・12月）", required: false },
  resignationProcedure: {
    label: "退職に関する事項",
    placeholder: "例：退職を希望する場合は30日前までに届け出ること",
    required: true,
  },
  dismissalGrounds: {
    label: "解雇事由",
    placeholder: "例：就業規則に定める解雇事由に該当する場合",
    required: true,
  },
  retirementAllowance: {
    label: "退職手当",
    placeholder: "例：勤続3年以上の者に支給",
    required: false,
  },
  temporaryWages: { label: "臨時に支払われる賃金", placeholder: "例：該当なし", required: false },
  employeeBurden: {
    label: "労働者負担",
    placeholder: "例：制服費用の一部を負担",
    required: false,
  },
  safetyAndHealth: {
    label: "安全衛生",
    placeholder: "例：健康診断を年1回実施",
    required: false,
  },
  vocationalTraining: {
    label: "職業訓練",
    placeholder: "例：入社時研修を実施",
    required: false,
  },
  disasterCompensation: {
    label: "災害補償",
    placeholder: "例：労災保険による法定補償",
    required: false,
  },
  commendationAndSanctions: {
    label: "表彰・制裁",
    placeholder: "例：就業規則に定める表彰・懲戒制度による",
    required: false,
  },
  leaveOfAbsence: {
    label: "休職",
    placeholder: "例：私傷病休職制度あり（最長6ヶ月）",
    required: false,
  },
} as const satisfies Record<string, EmploymentFieldMeta>;

export type EmploymentFieldKey = keyof typeof EMPLOYMENT_FIELD_LABELS;

// ============================================================
// Copy
// ============================================================

export const EMPLOYMENT_FORM_NOTICE =
  "就職求人を掲載する際は、法令に基づき必要な労働条件を正確に入力してください。";

export const EMPLOYMENT_VALIDATION_MESSAGE = "必須項目を入力してください。";

export const EMPLOYMENT_OTHER_CONDITIONS_META = {
  summaryLabel: "その他の労働条件を入力する（任意）",
  description:
    "退職手当・臨時の賃金・安全衛生など、該当する場合に入力してください。すべて任意項目です。",
} as const;

export const EMPLOYMENT_SUMMARY_LABELS = {
  title: "労働条件",
  emptyValue: "—",
} as const;
