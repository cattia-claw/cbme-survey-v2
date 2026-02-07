# CBME Survey v2 - 整合優化規格

## 專案目標
將 cbme-survey (Manus) 與 cbme-compass (Lovable) 的優點合併，簡化架構，改用 Email 提交。

## 核心變更

### 1. 移除資料庫，改用 Email 提交
- 移除 tRPC survey procedures (保留 server 結構供 email API 使用)
- 移除 Drizzle ORM 相關 (db.ts, drizzle.config.ts, drizzle/)
- 新增 `/api/submit` endpoint，使用 Resend API 發送 email
- Email 收件人: `liyoungc@pm.me`
- Email 格式: 結構化的問卷回覆 (見下方範例)

### 2. 問卷內容修改

#### 新增：院區選擇 (第一個問題，在 BasicInfoPage)
```typescript
const CAMPUS_OPTIONS = [
  { value: "tainan", label: "台南院區" },
  { value: "madou", label: "麻豆院區" },
];
```

#### 新增問題（依維度）

**EPA 設計與實施 (EpaPage):**
- 新增: EPA 驗證/審核流程是否建立？(1-5 Likert)
- 新增: EPA 修訂週期（選項：從未檢討、每年、每半年、每季、視需要）
- 「所需支援」加「其他」選項 + 文字輸入

**評量工具 (ToolsPage):**
- 新增: 每位學員每月平均被直接觀察次數（0次、1-2次、3-5次、6次以上）
- 新增: 評量負擔感受 (1-5 Likert, 1=負擔很輕, 5=負擔很重)
- 加「其他評量工具」選項 + 文字輸入

**CCC 運作 (CccPage):**
- 新增: 是否有標準化的個案討論記錄格式？(是/否/規劃中)
- 新增: 補救教學追蹤機制是否建立？(是/否/規劃中)
- 加「其他挑戰」選項 + 文字輸入

**e-Portfolio (EportPage):**
- 新增: 數據分析/儀表板功能使用程度 (1-5 Likert)
- 「系統類型」加「其他」選項 + 文字輸入

**師資培訓 (TrainingPage):**
- 新增: 是否有「種子教師」培訓機制？(是/否/規劃中)
- 新增: 師資持續支持機制 (選項：定期回訓、諮詢管道、社群交流、無、其他)
- 「培訓方法」加「其他」選項 + 文字輸入

**學員參與 (LearnerPage):**
- 新增: 學員主動尋求回饋的頻率 (1-5 Likert)
- 新增: 學員自我評估習慣 (1-5 Likert)
- 加「其他回饋」選項 + 文字輸入

**整體評估 (OverallPage):**
- 新增: 挑戰排序（從 cbme-compass 整合，使用 @dnd-kit 拖曳）
- 挑戰選項:
  - 人力不足
  - 時間不足
  - 經費不足
  - 教師培訓不足
  - 缺乏範本參考
  - 系統支援不足
  - 學員抗拒
  - 與現有制度衝突
  - 缺乏高層支持
  - 其他（可填入文字）

### 3. 拖曳排序實作 (OverallPage)

使用 @dnd-kit/core 和 @dnd-kit/sortable:

```tsx
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
```

每個挑戰項目顯示拖曳把手 (grip icon) 和排名數字。

### 4. UX 優化

**localStorage 自動儲存:**
```typescript
// 在 Survey.tsx 中
useEffect(() => {
  const saved = localStorage.getItem('cbme-survey-draft');
  if (saved) setFormData(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem('cbme-survey-draft', JSON.stringify(formData));
}, [formData]);

// 提交成功後清除
localStorage.removeItem('cbme-survey-draft');
```

**名詞 Tooltip:**
- EPA: 可信賴專業活動 (Entrustable Professional Activities)
- CCC: 臨床能力委員會 (Clinical Competency Committee)
- Mini-CEX: 迷你臨床演練評量
- DOPS: 直接觀察程序性技能
- MSF: 多來源回饋 (360度評量)

使用 shadcn Tooltip 組件。

### 5. Email 格式範例

```
主旨: 【CBME問卷】護理師 - 台南院區 - 王小明

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CBME 執行狀況調查問卷回覆
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 基本資料
• 院區：台南院區
• 職類：護理師
• 姓名：王小明
• 職稱：護理長
• 部門：內科病房
• Email：wang@example.com

━━━ EPA 設計與實施 ━━━
• 設計完成度：4 (大致完成)
• EPA 數量：4-6 個
• 信任等級明確度：4
• 里程碑行為對應：3
• 教師理解度：3
• 驗證流程建立：4
• 修訂週期：每年
• 所需支援：範本參考, 專家諮詢
• 挑戰：時間不足，人力有限

[... 其他維度 ...]

━━━ 整體評估 ━━━
• 整體進度：3 (發展階段 41-60%)
• 挑戰排序：
  1. 人力不足
  2. 時間不足
  3. 系統支援不足
  4. 教師培訓不足
  5. 經費不足
  6. 缺乏範本參考
  7. 與現有制度衝突
  8. 缺乏高層支持
  9. 學員抗拒
• 成功經驗：[填寫內容]
• 建議：[填寫內容]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
填答時間：2026-02-07 14:30:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6. 部署設定 (Zeabur)

建立 `zeabur.json`:
```json
{
  "build": {
    "build_command": "npm install && npm run build"
  },
  "output_dir": "dist"
}
```

環境變數:
- `RESEND_API_KEY`: Resend API key
- `EMAIL_TO`: liyoungc@pm.me

### 7. 依賴更新

新增:
- @dnd-kit/core
- @dnd-kit/sortable
- @dnd-kit/utilities
- resend (或 @sendgrid/mail)

移除:
- drizzle-orm
- drizzle-kit
- better-sqlite3
- @libsql/client

## 驗證清單

1. [ ] 院區選擇顯示在 Basic Info 頁
2. [ ] 所有新問題已加入
3. [ ] 所有「其他」選項可輸入文字
4. [ ] 挑戰排序可拖曳
5. [ ] 表單自動儲存到 localStorage
6. [ ] 提交成功發送 email
7. [ ] Tooltip 顯示名詞解釋
8. [ ] npm run build 成功
9. [ ] 可部署到 Zeabur
