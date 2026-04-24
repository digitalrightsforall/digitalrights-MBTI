# Digital-Rights MBTI 构建计划 (Project Execution Plan)

## 1. 项目背景与目标
本项目旨在构建一个基于 MBTI (Myers-Briggs Type Indicator) 逻辑的心理学/社会学测评系统，反映数字时代个体在以下三个关键维度的态度与偏好：
- **Layer 1 (Data Rights)**: 个人数据的分享、知情、控制与维权态度。
- **Layer 2 (GenAI)**: 对算法决策、生成式 AI 的信任度与依赖倾向。
- **Layer 3 (Agentic AI)**: 对 AI 代理（Agent）自主性、代理权（Agency）的接受度与边界感知。

---

## 2. 第一阶段：深度调研 (Deep Research Phase)
*通过多维度的可信信息源，挖掘影响态度的底层变量。*

### 2.1 多源信息调研 (Multi-Source Research)
- **学术研究 (Academic)**: 检索 CNKI、ResearchGate、Google Scholar，重点关注隐私悖论与 Human-AI 交互心理。
- **智库报告 (Think Tanks)**: 重点参考中国信通院 (CAICT)、阿里/腾讯研究院、Brookings 等机构关于 AI 治理与数字人权的白皮书。
- **主流媒体 (Media)**: 追踪 36Kr、财新、MIT Technology Review 等关于 Agentic AI 落地案例与公众争议的深度报道。

### 2.2 中国国情适配 (China Contextualization)
- **法律与合规**: 结合《个人信息保护法》(PIPL) 与《生成式人工智能服务管理暂行办法》，分析中国用户在强监管环境下的权利认知。
- **本土生态信任**: 调研用户对“超级 App” (WeChat/Alipay) 生态下数据流转的特殊信任模式。
- **Agentic AI 本土化**: 考量中国用户对企业级代理（如飞书、钉钉智能体）与消费级代理（如小度、车载 AI）的接受差异。

### 2.3 调研产出
- 形成《数字权利态度因子报告》，列出 10-15 个核心影响变量。

---

## 3. 第二阶段：框架构建 (Framework Construction Phase)
*基于 2026 深度研究报告，确立 Digital Citizen Personality (DCP) 模型。*

### 3.1 核心四轴 (The 4 Cognitive Axes)
1. **S / U (Sovereignty vs. Utility)**: 数据边界轴。权衡权利保护与便利收益。
2. **C / O (Cautious vs. Optimistic)**: 算法信任轴。权衡黑盒焦虑与技术红利。
3. **M / D (Mastery vs. Delegation)**: 代理授权轴。权衡自主掌控（Human-in-loop）与全自动代理。
4. **A / T (Anthropomorphic vs. sysTemic)**: 道德归因轴。权衡拟人化情感究责与系统结构性反思。

### 3.2 16 种人格类型
- 采用 2x2x2x2 矩阵，定义从 "全能委托者 (UODT)" 到 "数字主权派 (SCMT)" 的 16 种人格。
- **中国特色校准**: 在画像中加入对 PIPL 环境下的维权心理、钉钉/飞书职场压力、WeChat 社交边界等本土因子的描述。

---

## 4. 第三阶段：测评设计与验证 (Testing & Validation Phase)
*确保测评系统具有科学的信效度。*

### 4.1 题目设计
- **情境化设问 (Scenario-based)**: 设计 30-50 道情境驱动的迫选题目。
- **测试示例**: "如果一个 AI 代理可以全自动理财但不能解释每笔交易，你会：A. 授权；B. 拒绝"。

### 4.2 科学性验证
- **信度测试**: 计算 Cronbach's Alpha 系数（目标 > 0.7），确保题目内部一致。
- **效度测试**: 验证测评结果是否能真实预测用户的数字权利选择行为。

---

## 5. 第四阶段：Web APP 开发 (Implementation Phase)

### 5.1 技术选型
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion (交互动画).
- **Backend**: Python FastAPI (处理评分逻辑与因子映射).
- **Visualization**: Chart.js 或 D3.js (生成个人雷达图).

### 5.2 核心模块
- **测评引擎**: 处理逻辑跳转、权重计算与类型映射。
- **动态报告**: 生成包含人格画像、数字权利雷达图、专家建议的即时报告。

---

## 6. 持续迭代
- 每季度根据 AI 技术的最新演进（如 Agentic AI 的普及程度）更新维度权重。
