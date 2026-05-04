# 食策 (Food Strategy) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:execeting-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Taro-based Weapp prototype for dietary defense during external dining, featuring social game theory engines and inquiry-based translation.

**Architecture:** A React-based mini-program using state management for dietary slots and local JSON/Mock data for restaurant compliance ease scoring.

**Tech Stack:** Taro (React + TypeScript), SCSS, Local Storage.

---

### Task 1: Initialize Data Models & Diet Types

**Files:**
- Create: `src/data/diets.ts`
- Create: `src/types/food-strategy.d.ts`

- [ ] **Step 1: Define core types for diet archetypes and slots**

```typescript
// src/types/food-strategy.d.ts
export type DietType = 'KETO' | 'LOW_GI' | 'MEDITERRANEAN' | 'IF';

export interface IntegritySlot {
  id: string;
  status: 'RESERVED' | 'VALIDATED' | 'FAILED' | 'EMPTY';
  timestamp?: number;
  restaurantName?: string;
}

export interface SocialConfig {
  headcount: number;
  orderingPower: number; // 0 (weak) to 100 (strong)
}
```

- [ ] **Step 2: Define diet metadata**

```typescript
// src/data/diets.ts
export const DIET_CONFIG = {
  KETO: { name: '生酮模式', description: '极低碳水，高脂肪', weight: 3 },
  LOW_GI: { name: '低 GI 模式', description: '关注血糖稳定性', weight: 1 },
};
```

- [ ] **Step 3: Commit**

```bash
git add src/types/food-strategy.d.ts src/data/diets.ts
git commit -m "feat: define core data models and diet types"
```

---

### Task 2: Create Integrity Slot State Management

**Files:**
- Create: `src/store/integrity.ts`

- [ ] **Step 1: Implement slot storage logic**

```typescript
// src/store/integrity.ts
import Taro from '@tarojs/taro';

const STORAGE_KEY = 'FOOD_STRATEGY_SLOTS';

export const getSlots = () => Taro.getStorageSync(STORAGE_KEY) || Array(7).fill({ status: 'EMPTY' });
export const saveSlots = (slots) => Taro.setStorageSync(STORAGE_KEY, slots);
```

- [ ] **Step 2: Commit**

```bash
git add src/store/integrity.ts
git commit -m "feat: add integrity slot storage management"
```

---

### Task 3: Build the "Integrity Grid" UI

**Files:**
- Create: `src/pages/food-strategy/index.tsx`
- Create: `src/pages/food-strategy/index.scss`
- Modify: `src/app.config.ts`

- [ ] **Step 1: Add new page to config**

```typescript
// src/app.config.ts
export default defineAppConfig({
  pages: [
    'pages/food-strategy/index',
    'pages/index/index'
  ],
  window: {
    navigationBarTitleText: '食策 Food Strategy'
  }
})
```

- [ ] **Step 2: Implement the grid visualization component**

```tsx
// src/pages/food-strategy/index.tsx
import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { getSlots } from '../../store/integrity'
import './index.scss'

export default function FoodStrategy() {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    setSlots(getSlots())
  }, [])

  return (
    <View className='container'>
      <View className='grid'>
        {slots.map((slot, i) => (
          <View key={i} className={`slot ${slot.status}`}>
            <Text>{slot.status === 'EMPTY' ? '○' : '●'}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
```

- [ ] **Step 3: Add basic styles**

```scss
// src/pages/food-strategy/index.scss
.grid {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  .slot {
    width: 40px;
    height: 40px;
    border: 2px solid #ccc;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.VALIDATED { background: #2ecc71; border-color: #27ae60; }
    &.FAILED { background: #e74c3c; border-color: #c0392b; }
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app.config.ts src/pages/food-strategy/index.*
git commit -m "feat: implement integrity grid UI and config"
```

---

### Task 4: Social Configuration Slider & Logic

**Files:**
- Modify: `src/pages/food-strategy/index.tsx`

- [ ] **Step 1: Add Social Config (Headcount & Power) UI**

```tsx
// src/pages/food-strategy/index.tsx
import { Slider, Input } from '@tarojs/components'
// Inside component:
const [power, setPower] = useState(50)
const [headcount, setHeadcount] = useState(1)

// In JSX:
<View className='config'>
  <Text>点菜权: {power}</Text>
  <Slider min={0} max={100} value={power} onChange={e => setPower(e.detail.value)} />
  <Text>人数: {headcount}</Text>
  <Input type='number' value={headcount.toString()} onInput={e => setHeadcount(Number(e.detail.value))} />
</View>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/food-strategy/index.tsx
git commit -m "feat: add social configuration UI"
```

---

### Task 5: Compliance Recommendation Engine

**Files:**
- Create: `src/utils/engine.ts`
- Create: `src/data/restaurants.json`

- [ ] **Step 1: Create mock restaurant data with compliance scores**

```json
[
  { "name": "潮汕牛肉火锅", "baseScore": 95, "category": "HOTPOT" },
  { "name": "港式茶餐厅", "baseScore": 40, "category": "CANTONESE" }
]
```

- [ ] **Step 2: Implement engine to calculate tactical score**

```typescript
// src/utils/engine.ts
export const calculateTacticalScore = (baseScore, power) => {
  // If power is low, emphasize base score more (defensive)
  // If power is high, user can control more
  return baseScore * (1 - (100 - power) / 200);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/engine.ts src/data/restaurants.json
git commit -m "feat: implement compliance recommendation engine"
```

---

### Task 6: Inquiry Translator Component

**Files:**
- Create: `src/components/Translator/index.tsx`

- [ ] **Step 1: Build the translator component**

```tsx
// src/components/Translator/index.tsx
import { View, Text } from '@tarojs/components'

const PROMPTS = {
  'HOTPOT': ['锅底是否有糖？', '蘸料含糖吗？'],
  'CANTONESE': ['肉类裹粉吗？', '能去油吗？']
};

export default function Translator({ category }) {
  const questions = PROMPTS[category] || []
  return (
    <View className='translator'>
      {questions.map((q, i) => <Text key={i}>“{q}”</Text>)}
    </View>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Translator/index.tsx
git commit -m "feat: add inquiry-based translator component"
```
