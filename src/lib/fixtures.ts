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
/* ---------------------------------------------------------------
 * Preview-only design fixtures. No API, no database, no auth.
 * Every shape below is intended to be replaced by real Lumbyte
 * payloads inside the official founderwavechasecn/lumbyte-os repo.
 * Unknown values are null / "尚未验证" — never 0.
 * ------------------------------------------------------------- */

export const previewIndustry = {
  definition: "面向中国独立开发者与小型团队的用量计费基础设施服务",
  boundary: ["包含：计量、配额、账单与用量分析", "不包含：支付清算与发票合规", "不包含：通用云主机与网关托管"],
  segments: [
    { name: "API 产品团队", note: "自建计费逻辑成本高", status: "市场信号" },
    { name: "AI 应用开发者", note: "调用量波动大，需要实时配额", status: "市场信号" },
    { name: "SaaS 增值模块", note: "需要按用量升级套餐", status: "尚未验证" },
  ],
  trends: ["按用量计费在开发者工具中出现频率上升", "AI 调用成本核算成为独立需求"],
  policy: ["涉及交易信息的存储需遵循数据本地化要求", "跨境结算需要合规主体，属尚未验证项"],
  drivers: ["模型调用成本直接影响定价结构", "自建计量的工程维护成本"],
  constraints: ["与现有支付服务的集成深度", "客户对账准确性的容错极低"],
  market: [
    { label: "TAM", value: null }, { label: "SAM", value: null }, { label: "SOM", value: null },
  ],
};

export const previewCustomer = {
  rows: [
    { label: "目标客户", value: "有付费产品的独立开发者与 2–10 人团队", status: "市场信号" },
    { label: "实际用户", value: "后端 / 全栈工程师", status: "市场信号" },
    { label: "购买者", value: "创始人本人", status: "市场信号" },
    { label: "决策者", value: "创始人本人（与用户重合）", status: "推断" },
    { label: "JTBD", value: "把用量准确变成可收款的账单，而不自建计费系统", status: "市场信号" },
    { label: "核心痛点", value: "计量、配额与账单口径不一致导致对账困难", status: "已验证事实" },
    { label: "替代方案", value: "自研脚本、支付服务原生订阅、手工对账", status: "已验证事实" },
    { label: "购买意图", value: null, status: "尚未验证" },
    { label: "付费意愿", value: null, status: "尚未验证" },
    { label: "客户规模", value: null, status: "尚未验证" },
    { label: "需求信号", value: "公开讨论中反复出现计费实现问题", status: "市场信号" },
  ],
  sources: ["公开产品文档集合", "公开开发者讨论样本", "公开定价页面"],
};

export type CompetitorRow = {
  name: string; type: "直接竞品" | "间接竞品" | "替代方案" | "人工方案";
  position: string; audience: string;
  price: "公开价格" | "联系销售" | "未公开具体价格";
  capability: string; lastChecked: string;
};

export const previewCompetitors: CompetitorRow[] = [
  { name: "计量计费平台 A", type: "直接竞品", position: "面向成长期 SaaS 的计费中台", audience: "中型 SaaS", price: "联系销售", capability: "计量、账单、税务", lastChecked: "今日" },
  { name: "开发者计费服务 B", type: "直接竞品", position: "开发者优先的用量计费 API", audience: "独立开发者", price: "公开价格", capability: "用量事件、配额", lastChecked: "今日" },
  { name: "支付平台原生订阅", type: "间接竞品", position: "订阅与发票能力", audience: "所有付费产品", price: "公开价格", capability: "订阅、发票", lastChecked: "3 天前" },
  { name: "开源计量组件", type: "替代方案", position: "自托管计量库", audience: "工程能力强的团队", price: "未公开具体价格", capability: "事件采集", lastChecked: "本周" },
  { name: "表格 + 脚本对账", type: "人工方案", position: "早期团队的现实做法", audience: "极早期项目", price: "未公开具体价格", capability: "人工核对", lastChecked: "本周" },
];

export const previewPricingRows = [
  { product: "开发者计费服务 B", plan: "Starter", state: "公开价格", currency: "USD", cycle: "月", model: "按用量事件", free: "有免费额度", trial: "无", lastChecked: "今日" },
  { product: "计量计费平台 A", plan: "Growth", state: "联系销售", currency: "—", cycle: "年", model: "按流水比例", free: "无", trial: "定制", lastChecked: "今日" },
  { product: "支付平台原生订阅", plan: "标准", state: "公开价格", currency: "CNY", cycle: "按交易", model: "按交易费率", free: "无", trial: "无", lastChecked: "3 天前" },
];

export const previewPricingAssumptions = [
  { label: "起步套餐月费", value: "待确认", origin: "尚未验证" },
  { label: "计价单位", value: "每万次计费事件", origin: "用户提供" },
  { label: "免费额度", value: "每月 5 万事件", origin: "估算" },
  { label: "同类公开价格区间", value: "存在公开价格样本", origin: "来源数据" },
];

export const previewBusinessModel = [
  { label: "目标客户", value: "有付费产品的独立开发者与小团队", status: "有证据支持" },
  { label: "价值主张", value: "不自建计费系统也能准确按用量收款", status: "当前假设" },
  { label: "收入方式", value: "订阅 + 用量阶梯", status: "当前假设" },
  { label: "定价逻辑", value: "按计费事件量分层，与客户收入正相关", status: "待验证实验" },
  { label: "分发 / 获客", value: "开发者社区、文档内容、集成生态", status: "待验证实验" },
  { label: "关键成本", value: "事件存储与实时计算、对账支持人力", status: "有证据支持" },
  { label: "关键依赖", value: "与主流支付服务的稳定集成", status: "有证据支持" },
];

export type RiskRow = {
  name: string; category: string; likelihood: string; impact: string;
  confidence: string; cause: string; mitigation: string; effect: string;
  type: "已确认风险" | "潜在风险" | "尚未验证风险" | "阻断条件";
};

export const previewRisks: RiskRow[] = [
  { name: "对账偏差引发信任崩塌", category: "产品", likelihood: "中", impact: "高", confidence: "中", cause: "计量口径与支付流水存在时差", mitigation: "提供可复核对账明细与差异报告", effect: "影响是否可服务付费客户", type: "已确认风险" },
  { name: "获客成本高于可承受区间", category: "市场", likelihood: null as unknown as string, impact: "高", confidence: "低", cause: "渠道尚未验证", mitigation: "先做小规模内容与集成实验", effect: "可能转向当前不建议推进", type: "尚未验证风险" },
  { name: "支付服务政策变化", category: "外部依赖", likelihood: "低", impact: "高", confidence: "中", cause: "第三方条款调整", mitigation: "保持双通道集成设计", effect: "影响交付可行性", type: "潜在风险" },
  { name: "交易数据合规主体缺失", category: "合规", likelihood: "—", impact: "高", confidence: "低", cause: "跨境结算需要合规资质", mitigation: "确认主体资质后再承接跨境客户", effect: "阻断跨境业务范围", type: "阻断条件" },
];

export const previewEvidenceLedger: (EvidenceItem & {
  publisher: string; module: string; url: string; published: string;
})[] = [
  { classification: "已验证事实", claim: "同类产品普遍以用量事件作为计价单位", source: "公开定价页面集合", publisher: "各产品官方站点", module: "定价", url: "公开来源（预览环境未附链接）", published: "最近 3 个月", period: "最近 12 个月", geography: "全球", lastChecked: "今日" },
  { classification: "市场信号", claim: "开发者在公开讨论中反复提出计费实现困难", source: "公开开发者讨论样本", publisher: "公开社区", module: "客户", url: "公开来源（预览环境未附链接）", published: "最近 6 个月", period: "最近 6 个月", geography: "中国大陆", lastChecked: "今日" },
  { classification: "估算", claim: "免费额度设为每月 5 万事件可覆盖多数早期项目", source: "内部估算", publisher: "项目输入", module: "定价", url: "—", published: "—", period: "—", geography: "中国大陆", lastChecked: "本周" },
  { classification: "推断", claim: "购买者与实际用户在早期团队中高度重合", source: "由客户结构推断", publisher: "分析推断", module: "客户", url: "—", published: "—", period: "—", geography: "中国大陆", lastChecked: "本周" },
  { classification: "尚未验证", claim: "目标客户愿意为计费基础设施持续付费", source: "暂无可靠公开证据", publisher: "—", module: "财务", url: "—", published: "—", period: "—", geography: "目标市场", lastChecked: "待核验" },
  { classification: "证据冲突", claim: "同类产品的公开价格区间存在不一致口径", source: "两组公开定价样本", publisher: "各产品官方站点", module: "竞品", url: "公开来源（预览环境未附链接）", published: "最近 3 个月", period: "最近 6 个月", geography: "全球", lastChecked: "今日" },
  { classification: "历史验证", claim: "计量口径变化曾导致对账差异（历史核验记录）", source: "公开事故与变更说明", publisher: "各产品官方站点", module: "风险", url: "公开来源（预览环境未附链接）", published: "更早", period: "更早", geography: "全球", lastChecked: "上月" },
];

export const evidenceFilters = ["全部", "已验证事实", "市场信号", "估算", "推断", "尚未验证", "证据冲突", "历史验证"] as const;

export const previewFinancialOutputs = [
  { key: "MRR", value: null }, { key: "ARR", value: null }, { key: "毛利率", value: null },
  { key: "CAC", value: null }, { key: "LTV", value: null }, { key: "Burn", value: null },
  { key: "Runway", value: null }, { key: "盈亏平衡", value: null },
];

export const previewFinancialAssumptions = [
  { label: "ARPU", value: "待确认", origin: "尚未验证" },
  { label: "CAC", value: "待确认", origin: "尚未验证" },
  { label: "客户数量", value: "待确认", origin: "尚未验证" },
  { label: "转化率", value: "待确认", origin: "尚未验证" },
  { label: "流失率", value: "待确认", origin: "尚未验证" },
  { label: "毛利率", value: "按事件存储与计算成本推算", origin: "估算" },
  { label: "固定成本", value: "两人团队基础支出", origin: "用户提供" },
  { label: "现金", value: "待确认", origin: "尚未验证" },
];

export const previewFlip = {
  up: ["首批 10 个付费客户完成真实付费", "获客成本落在可承受区间内", "对账准确性在真实流量下通过验证"],
  down: ["目标客户明确表示不愿为该能力单独付费", "获客成本长期高于客户首年贡献", "关键支付集成不可用或合规主体缺失"],
};

export const previewNextSteps = [
  "向 10 位目标客户验证真实付费意愿与可接受价格",
  "用一个真实产品跑通计量到账单的端到端对账",
  "测算两条获客渠道的真实获取成本",
  "确认支付集成的可用范围与合规边界",
  "核验同类产品公开价格口径，消除证据冲突",
];

export const previewProjects = [
  { name: "用量计费 API 网关", idea: "为中国独立开发者提供用量计费与对账基础设施", lastRun: "今日", status: "分析中", recommendation: "有条件推进", evidence: "关键未知 3 项" },
  { name: "独立开发者账单助手", idea: "把订阅与用量账单整理成可对账报表", lastRun: "3 天前", status: "已完成一轮", recommendation: "暂不推进", evidence: "不利因素 2 项" },
];

export const previewReportMeta = {
  project: "用量计费 API 网关",
  decision: "有条件推进",
  evidenceConfidence: null,
  generated: "预览环境（未运行真实分析）",
  status: "设计预览",
};
