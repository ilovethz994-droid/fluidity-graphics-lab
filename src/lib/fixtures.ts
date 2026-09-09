export type Confidence = number | null;
export type MetricValue = string | number | null;

export interface DecisionData {
  recommendation: "建议推进" | "有条件推进" | "暂不推进";
  rationale: string;
  viabilityScore: Confidence;
  evidenceConfidence: Confidence;
  decisionConfidence: Confidence;
  positiveEvidence: string[];
  negativeEvidence: string[];
  criticalUnknowns: string[];
}

export interface FinancialData {
  MRR: MetricValue; ARR: MetricValue; CAC: MetricValue; LTV: MetricValue;
  Burn: MetricValue; Runway: MetricValue; BreakEven: MetricValue;
  assumptionOrigins: { label: string; value: string; origin: string }[];
}

export interface EvidenceItem {
  classification: string; claim: string; source: string; period: string;
  geography: string; lastChecked: string;
}

export const previewDecision: DecisionData = {
  recommendation: "有条件推进",
  rationale: "当前证据支持继续验证，但购买意愿与获客成本仍是改变结论的关键变量。",
  viabilityScore: null,
  evidenceConfidence: null,
  decisionConfidence: null,
  positiveEvidence: ["目标用户的问题频率已获得初步来源支持", "现有替代方案存在流程断点"],
  negativeEvidence: ["采购周期可能长于最初假设", "同类工具的转换成本较高"],
  criticalUnknowns: ["首批客户的真实付费意愿", "可持续获客成本", "决策者与实际用户是否一致"],
};

export const previewFinancial: FinancialData = {
  MRR: null, ARR: null, CAC: null, LTV: null, Burn: null, Runway: null, BreakEven: null,
  assumptionOrigins: [
    { label: "目标客单价", value: "待补充", origin: "尚未验证" },
    { label: "月度新增客户", value: "待补充", origin: "尚未验证" },
    { label: "交付成本", value: "基于访谈范围", origin: "用户提供" },
  ],
};

export const previewEvidence: EvidenceItem[] = [
  { classification: "已验证事实", claim: "目标流程普遍依赖多个分散工具", source: "公开产品文档集合", period: "最近 12 个月", geography: "中国大陆", lastChecked: "今日" },
  { classification: "市场信号", claim: "用户正在主动寻找更轻量的替代方式", source: "公开讨论与评价样本", period: "最近 6 个月", geography: "中国大陆", lastChecked: "今日" },
  { classification: "尚未验证", claim: "目标客户愿意为自动化决策流程付费", source: "暂无可靠公开证据", period: "—", geography: "目标市场", lastChecked: "待核验" },
];

export const projectPreview = {
  name: "新项目",
  idea: "为小型创业团队提供基于证据的早期决策工作区",
  region: "中国大陆",
  stage: "问题验证",
};