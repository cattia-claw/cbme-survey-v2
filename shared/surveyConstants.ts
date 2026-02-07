/**
 * Shared constants for the CBME survey application
 */

export const PROFESSIONS = [
  { value: "NUR", label: "護理師 (Registered Nurse)" },
  { value: "RAD", label: "放射師 (Radiologic Technologist)" },
  { value: "MT", label: "檢驗師 (Medical Technologist)" },
  { value: "PHAR", label: "藥師 (Pharmacist)" },
  { value: "PT", label: "物理治療師 (Physical Therapist)" },
  { value: "OT", label: "職能治療師 (Occupational Therapist)" },
  { value: "RT", label: "呼吸治療師 (Respiratory Therapist)" },
  { value: "DT", label: "營養師 (Dietitian)" },
  { value: "SLP", label: "語言治療師 (Speech-Language Pathologist)" },
  { value: "CP", label: "臨床心理師 (Clinical Psychologist)" },
] as const;

export const CAMPUS_OPTIONS = [
  { value: "tainan", label: "台南院區" },
  { value: "madou", label: "麻豆院區" },
] as const;

export const PROFESSION_NAMES: Record<string, string> = {
  NUR: "護理師",
  RAD: "放射師",
  MT: "檢驗師",
  PHAR: "藥師",
  PT: "物理治療師",
  OT: "職能治療師",
  RT: "呼吸治療師",
  DT: "營養師",
  SLP: "語言治療師",
  CP: "臨床心理師",
};

export const LIKERT_SCALE_OPTIONS = [
  { value: 1, label: "1 - 尚未開始 / 完全沒有 / 非常不滿意" },
  { value: 2, label: "2 - 初步規劃 / 略有 / 不滿意" },
  { value: 3, label: "3 - 部分完成 / 普通" },
  { value: 4, label: "4 - 大致完成 / 相當 / 滿意" },
  { value: 5, label: "5 - 完全完成 / 非常 / 非常滿意" },
];

export const EPA_COUNT_OPTIONS = [
  { value: "0", label: "0 個" },
  { value: "1-3", label: "1-3 個" },
  { value: "4-6", label: "4-6 個" },
  { value: "7-10", label: "7-10 個" },
  { value: "10+", label: "10 個以上" },
];

export const EPA_REVISION_CYCLE_OPTIONS = [
  { value: "never", label: "從未檢討" },
  { value: "yearly", label: "每年" },
  { value: "biannual", label: "每半年" },
  { value: "quarterly", label: "每季" },
  { value: "as_needed", label: "視需要" },
];

export const DIRECT_OBSERVATION_OPTIONS = [
  { value: "0", label: "0 次" },
  { value: "1-2", label: "1-2 次" },
  { value: "3-5", label: "3-5 次" },
  { value: "6+", label: "6 次以上" },
];

export const ASSESSMENT_BURDEN_OPTIONS = [
  { value: 1, label: "1 - 負擔很輕" },
  { value: 2, label: "2 - 偏輕" },
  { value: 3, label: "3 - 普通" },
  { value: 4, label: "4 - 偏重" },
  { value: 5, label: "5 - 負擔很重" },
];

export const CALIBRATION_FREQUENCY_OPTIONS = [
  { value: "never", label: "從未舉辦" },
  { value: "yearly", label: "一年一次" },
  { value: "biannual", label: "半年一次" },
  { value: "quarterly", label: "季度一次" },
  { value: "monthly", label: "每月舉辦" },
];

export const FEEDBACK_TIMING_OPTIONS = [
  { value: "24h", label: "24 小時內" },
  { value: "2-3days", label: "2-3 天內" },
  { value: "1week", label: "一週內" },
  { value: "over1week", label: "超過一週" },
  { value: "varies", label: "不一定" },
];

export const CCC_ESTABLISHMENT_OPTIONS = [
  { value: "not_established", label: "未成立" },
  { value: "planning", label: "規劃中" },
  { value: "established_not_running", label: "已成立但尚未運作" },
  { value: "running", label: "已成立並開始運作" },
  { value: "running_well", label: "已成立且運作順暢" },
];

export const CCC_MEMBER_COUNT_OPTIONS = [
  { value: "not_established", label: "尚未成立" },
  { value: "under3", label: "3 人以下" },
  { value: "4-6", label: "4-6 人" },
  { value: "7-10", label: "7-10 人" },
  { value: "over10", label: "10 人以上" },
];

export const CCC_FREQUENCY_OPTIONS = [
  { value: "not_meeting", label: "尚未開會" },
  { value: "biannual", label: "每半年一次" },
  { value: "quarterly", label: "每季一次" },
  { value: "monthly", label: "每月一次" },
  { value: "as_needed", label: "視需要召開" },
];

export const CCC_PRESCRIPTION_OPTIONS = [
  { value: "never", label: "從未使用" },
  { value: "heard_not_used", label: "聽過但未使用" },
  { value: "occasionally", label: "偶爾使用" },
  { value: "often", label: "經常使用" },
  { value: "systematically", label: "系統化使用" },
];

export const YES_NO_PLANNING_OPTIONS = [
  { value: "yes", label: "是" },
  { value: "no", label: "否" },
  { value: "planning", label: "規劃中" },
];

export const EPORT_IMPLEMENTATION_OPTIONS = [
  { value: "none", label: "完全沒有" },
  { value: "planning", label: "規劃中" },
  { value: "trial", label: "試用階段" },
  { value: "partial", label: "部分功能上線" },
  { value: "full", label: "完整系統運作" },
];

export const EPORT_TYPE_OPTIONS = [
  { value: "google", label: "Google Forms + Sheets" },
  { value: "microsoft", label: "Microsoft Power Apps" },
  { value: "airtable", label: "Airtable" },
  { value: "commercial", label: "商用系統（MedHub, Elentra 等）" },
  { value: "custom", label: "自行開發系統" },
  { value: "other", label: "其他" },
];

export const EPORT_MOBILE_OPTIONS = [
  { value: "not_supported", label: "完全不支援" },
  { value: "partial", label: "部分支援" },
  { value: "supported_poor", label: "支援但體驗不佳" },
  { value: "supported_good", label: "支援且體驗良好" },
  { value: "excellent", label: "優秀的行動體驗" },
];

export const TRAINING_COMPLETION_OPTIONS = [
  { value: "0-20", label: "0-20%" },
  { value: "21-40", label: "21-40%" },
  { value: "41-60", label: "41-60%" },
  { value: "61-80", label: "61-80%" },
  { value: "81-100", label: "81-100%" },
];

export const TRAINING_TOPICS_OPTIONS = [
  { value: "cbme_basics", label: "CBME 基本概念" },
  { value: "epa_design", label: "EPA 設計原則" },
  { value: "observation", label: "觀察與評量技巧" },
  { value: "feedback", label: "回饋技巧" },
  { value: "calibration", label: "評量者校準" },
  { value: "system", label: "系統操作" },
  { value: "none", label: "尚未培訓" },
];

export const TRAINING_METHODS_OPTIONS = [
  { value: "workshop", label: "工作坊" },
  { value: "online", label: "線上課程" },
  { value: "reading_group", label: "讀書會" },
  { value: "benchmarking", label: "標竿觀摩" },
  { value: "one_on_one", label: "一對一指導" },
  { value: "other", label: "其他" },
];

export const TRAINING_SUPPORT_OPTIONS = [
  { value: "refresh", label: "定期回訓" },
  { value: "consultation", label: "諮詢管道" },
  { value: "community", label: "社群交流" },
  { value: "none", label: "無" },
  { value: "other", label: "其他" },
];

export const EPA_SUPPORT_OPTIONS = [
  { value: "template", label: "範本參考" },
  { value: "workshop", label: "工作坊培訓" },
  { value: "expert", label: "專家諮詢" },
  { value: "exchange", label: "跨職類交流" },
  { value: "other", label: "其他" },
];

export const CHALLENGE_OPTIONS = [
  { value: "manpower", label: "人力不足" },
  { value: "time", label: "時間不足" },
  { value: "budget", label: "經費不足" },
  { value: "training", label: "教師培訓不足" },
  { value: "template", label: "缺乏範本參考" },
  { value: "system", label: "系統支援不足" },
  { value: "resistance", label: "學員抗拒" },
  { value: "conflict", label: "與現有制度衝突" },
  { value: "support", label: "缺乏高層支持" },
  { value: "other", label: "其他" },
];
