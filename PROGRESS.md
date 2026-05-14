# 数字公民人格 MBTI 项目进度文档

## 一、项目概述

本项目包含两个版本：
- Web 版本：Next.js + React 19
- 小程序版本：Taro + React 18

当前主要任务：实现数据收集功能，将用户答题记录保存到飞书多维表格。

---

## 二、已完成工作

### 2.1 Web 版本

| 任务 | 状态 | 说明 |
|------|------|------|
| 基础功能 | ✅ 完成 | MBTI 测试完整流程 |
| 品牌信息同步 | ✅ 完成 | 结果页显示 TYPE ARCHIVE |
| 结果页调整 | ✅ 完成 | 去掉稀有度，显示性格字母 |
| 答题页品牌 footer | ✅ 完成 | 添加出品信息 |
| 数据上报接口 | ✅ 完成 | 调用阿里云函数 |
| 静态部署配置 | ✅ 完成 | GitHub Actions 同步到 ECS |

### 2.2 小程序版本

| 任务 | 状态 | 说明 |
|------|------|------|
| 基础功能 | ✅ 完成 | MBTI 测试完整流程 |
| Canvas 替换 SVG | ✅ 完成 | PersonaTotem 组件 |
| 品牌信息同步 | ✅ 完成 | 结果页显示 TYPE ARCHIVE |
| 海报生成 | ✅ 完成 | Canvas 2D 实现 |

### 2.3 飞书多维表格

| 任务 | 状态 | 说明 |
|------|------|------|
| 表格创建 | ✅ 完成 | 参与者记录表 |
| 字段配置 | ✅ 完成 | 参与者标识、来源平台、MBTI结果等 |
| 应用权限 | ✅ 完成 | bitable:app 权限开通 |

### 2.4 阿里云函数计算

| 任务 | 状态 | 说明 |
|------|------|------|
| 函数创建 | ✅ 完成 | mbti-submit 函数 |
| 环境变量配置 | ✅ 完成 | 飞书 App ID/Secret 等 |
| HTTP 触发器 | ✅ 完成 | POST 请求配置 |
| 代码部署 | ✅ 完成 | 已上传并部署 |

---

## 三、待完成工作

| 任务 | 优先级 | 说明 |
|------|--------|------|
| 函数请求体解析 | 🔴 高 | 目前无法正确解析 POST 请求体 |
| Web 端数据上报测试 | 🔴 高 | 测试数据是否能写入飞书表格 |
| 小程序端数据上报 | 🟡 中 | 集成云函数调用 |
| Dashboard 页面 | 🟢 低 | 查看统计数据 |

---

## 四、当前问题

### 4.1 阿里云函数请求体解析问题

**问题描述**：
- 函数能收到请求，但无法正确解析 POST 请求体
- curl 发送的是 POST 请求，包含 JSON 数据
- 函数接收到的 event 是数字键对象（Buffer 形式）
- 解析后无法找到请求体数据

**当前状态**：
- 已确认事件格式：JSON 字符串，包含 `version`、`rawPath`、`headers` 等字段
- 但 `body` 字段为空或未找到

**待解决**：
- 进一步调试找到请求体的正确位置

---

## 五、技术栈

### 5.1 前端

| 模块 | 技术 | 版本 |
|------|------|------|
| Web | Next.js | 16 |
| Web | React | 19 |
| 小程序 | Taro | 4.x |
| 小程序 | React | 18 |

### 5.2 后端/服务

| 服务 | 说明 |
|------|------|
| 数据存储 | 飞书多维表格 |
| API 网关 | 阿里云函数计算 |
| 部署 | GitHub Actions + ECS |

---

## 六、配置信息

### 6.1 飞书配置

| 配置项 | 值 |
|--------|-----|
| Base Token | SqdAblVhpalBZCsucn9c2mU3nmS |
| Table ID | tblhxjhTdsx0sUbr |
| App ID | cli_a9700b3a7afd5cc3 |
| App Secret | 已配置在阿里云环境变量 |

### 6.2 阿里云函数

| 配置项 | 值 |
|--------|-----|
| 函数名称 | mbti-submit |
| 运行环境 | Node.js 18 |
| 触发器 URL | https://mbti-submit-jzwespyaby.cn-shanghai.fcapp.run |

---

## 七、文件结构

```
digital-rights-MBTI/
├── aliyun-function/
│   └── mbti-submit/
│       └── index.js          # 阿里云函数代码
├── src/
│   ├── web-app/              # Web 版本
│   │   ├── src/app/
│   │   │   └── page.tsx      # 主页面
│   │   ├── .env.local        # 环境变量
│   │   └── next.config.ts    # Next.js 配置
│   └── miniprogram/          # 小程序版本
│       ├── src/
│       │   ├── components/
│       │   │   └── PersonaTotem.tsx
│       │   └── pages/
│       │       └── index/
│       │           └── index.tsx
│       └── cloudfunctions/
│           └── mbti-submit/
│               └── index.js
└── .github/workflows/
    └── deploy.yml            # GitHub Actions 部署配置
```

---

## 八、下一步计划

1. **修复阿里云函数请求体解析问题**
   - 进一步调试事件结构
   - 找到正确的请求体位置

2. **测试数据上报功能**
   - 测试 curl 请求
   - 验证数据写入飞书表格

3. **集成到前端**
   - 更新 Web 端 API 调用
   - 测试完整流程

4. **小程序端集成**
   - 配置云函数
   - 集成数据上报