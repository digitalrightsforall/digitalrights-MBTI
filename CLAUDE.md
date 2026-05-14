# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**数字公民人格 MBTI (Digital Rights Personality Assessment)** — A public-interest assessment system that evaluates users' digital rights awareness through 24 scenario-based questions. Results map to one of 16 digital citizen personas (e.g., "维权战神", "全自动咸鱼") across four DCP 2.0 dimensions:

- **S/U** — Data Sovereignty vs. Extreme Utility
- **C/O** — Algorithmic Caution vs. Technical Optimism  
- **M/D** — Autonomous Control vs. Delegated Agency
- **P/R** — Proactive Maintenance vs. Passive Response

## Architecture — Two separate apps

### 1. `src/web-app/` — Next.js web app (primary)
- **Next.js 16** (App Router), React 19, Tailwind CSS
- Build output is static export (`next build`) deployed to **AliCloud ECS** via GitHub Actions (rsync to `/var/www/digitalrights-mbti`)
- Data lives in two JSON files: `src/data/questions.json` (24 questions with 2 options each, mapping to DCP dimensions) and `src/data/personas.json` (16 persona definitions with dimension scores, colors, icons)
- **Key routes:**
  - `/` — Landing → Test → Results flow (single page, multi-step with `landing | test | result`)
  - `/preview` — Gallery of all 16 personas (totem previews)
- Key components: `PersonaAvatar`, radar chart visualization (Recharts)

### 2. `src/miniprogram/` — WeChat Mini Program (Taro)
- **Taro 4.0** with React 18, built for the WeChat platform (`--type weapp`)
- Uses the same questions/personas JSON data (duplicated in `src/miniprogram/src/data/`)
- **Build commands:** `npm run dev:weapp` (dev watch) / `npm run build:weapp` (production)
- Config in `config/index.ts` (Taro config), `src/app.config.ts` (WeChat pages/window config)
- Source in `src/`, output to `dist/`
- Cloud function: `cloudfunctions/mbti-submit`
- Supports share (`enableShareAppMessage`, `enableShareTimeline`)

### Data flow
Both apps share the same data model:
- **24 questions** — each has `id`, `text`, two options (`A`/`B`), dimension mapping (`dimension` like `S/U`), and `direction` (which option maps to which pole)
- **Scoring** — Answers determine which pole of each DCP dimension the user leans toward, producing a 4-letter code (e.g., `SCMP`)
- **16 personas** — Each persona maps to one of the 16 possible 4-letter codes and has a name, description, color theme, icon, and dimension scores (for radar chart)

### Data submission
- Answers can be submitted to Aliyun Function (via `NEXT_PUBLIC_ALIYUN_FUNCTION_URL` env var)
- Submission includes participant ID, answers, result, platform (`web` or `小程序`), and auth method

## Commands

### Web App
- `cd src/web-app && npm run dev` — Start dev server
- `cd src/web-app && npm run build` — Static export build
- `cd src/web-app && npm run deploy` — Build + deploy to GitHub Pages (gh-pages)
- `cd src/web-app && npm run lint` — ESLint

### Mini Program
- `cd src/miniprogram && npm run dev:weapp` — Dev build with watch
- `cd src/miniprogram && npm run build:weapp` — Production build

## CI/CD

GitHub Actions (`.github/workflows/deploy.yml`):
- Triggered on push to `main`
- Builds `src/web-app`, then rsyncs `out/` dir to AliCloud ECS

## Important notes
- The web-app uses **Next.js 16** which has breaking changes from older versions — check `node_modules/next/dist/docs/` for API differences before writing code
- Taro 4.0 project uses **webpack5** compiler (prebundle disabled)
- Environment variable `NEXT_PUBLIC_ALIYUN_FUNCTION_URL` must be set for data submission
- The project is licensed under **GNU GPL v3.0** — downstream modifications must open-source under the same license
