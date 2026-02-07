# CBME Survey v2 - Verification Checklist

Use this checklist to verify all features are working correctly.

## ✅ Pre-flight Checks

### Environment Setup
- [ ] `.env` file exists in project root
- [ ] `RESEND_API_KEY` is set to a valid API key (not placeholder)
- [ ] `EMAIL_TO` is set to correct recipient email
- [ ] All npm packages installed (`npm install --legacy-peer-deps` completed successfully)
- [ ] No TypeScript errors (`npm run check` passes)

### Starting the Application
- [ ] Development server starts without errors: `npm run dev`
- [ ] Application loads at `http://localhost:3000`
- [ ] No console errors in browser developer tools
- [ ] Welcome page displays correctly

---

## 📋 Feature Verification

### 1. Campus Selection (台南院區/麻豆院區)

**Location**: Basic Info Page (第一頁)

- [ ] Campus selection appears as the **first question**
- [ ] Dropdown shows two options: "台南院區" and "麻豆院區"
- [ ] Can select both options
- [ ] Selection is required (red asterisk shown)
- [ ] Selected value persists when navigating back

**Test Steps**:
1. Click "開始填寫" on welcome page
2. Verify campus dropdown is the first field
3. Select "台南院區"
4. Navigate to next page and back
5. Verify selection is still "台南院區"

---

### 2. Email Submission (Resend API)

**Location**: Final submission after completing all pages

- [ ] Submit button appears on the last page (Overall Assessment)
- [ ] Clicking submit shows "提交中..." loading state
- [ ] Success toast appears: "問卷提交成功！"
- [ ] Email is received at configured `EMAIL_TO` address
- [ ] Email subject format: `【CBME問卷】{職類} - {院區} - {姓名}`
- [ ] Email body contains all form data
- [ ] Email formatting is readable (sections separated, labels clear)
- [ ] Form is reset after submission
- [ ] localStorage is cleared after successful submission

**Test Steps**:
1. Fill out entire survey
2. Click "提交問卷" on last page
3. Check for success message
4. Check email inbox at `EMAIL_TO` address
5. Verify email content matches submitted data
6. Refresh page and verify form is empty (localStorage cleared)

**Sample Email Check**:
- [ ] Contains all basic info (campus, profession, name, title, department, email)
- [ ] Contains EPA section responses
- [ ] Contains Tools section responses
- [ ] Contains CCC section responses
- [ ] Contains ePort section responses
- [ ] Contains Training section responses
- [ ] Contains Learner section responses
- [ ] Contains Overall section responses
- [ ] Challenge ranking is formatted as numbered list
- [ ] Timestamp is in correct timezone (Asia/Taipei)

---

### 3. Drag-and-Drop Challenge Ranking (@dnd-kit)

**Location**: Overall Assessment Page (整體評估與需求)

- [ ] Challenge list displays with 10 items
- [ ] Each item shows:
  - [ ] Ranking number (1-10)
  - [ ] Grip icon (⋮⋮) on the left
  - [ ] Challenge text
- [ ] Can drag items by clicking and holding grip icon
- [ ] Visual feedback when dragging (item lifts up, shadow appears)
- [ ] Items can be dropped in new positions
- [ ] Rankings update immediately after drop
- [ ] Order persists when navigating away and back
- [ ] "其他" challenge shows text input field
- [ ] Keyboard navigation works (Tab + Space/Enter to grab, Arrow keys to move)

**Test Steps**:
1. Navigate to "整體評估與需求" page
2. Try dragging "人力不足" to position 5
3. Verify numbers update correctly
4. Try dragging with keyboard (Tab to challenge, Space to grab, Down arrow to move)
5. Verify "其他" item has a text input area
6. Navigate to previous page and back
7. Verify order is maintained

---

### 4. "其他" (Other) Text Input Options

Test these locations:

#### EPA Page (EPA 設計與實施)
- [ ] Question: "需要的協助"
- [ ] Checkbox option: "其他"
- [ ] Text area appears when "其他" is checked
- [ ] Text area hidden when unchecked
- [ ] Placeholder: "請填寫其他需要的支援..."
- [ ] Input persists when navigating away and back

#### Tools Page (評量工具使用)
- [ ] Question: "其他評量工具"
- [ ] Direct text area (no checkbox trigger)
- [ ] Placeholder: "請填寫其他評量工具..."

#### CCC Page (CCC 運作)
- [ ] Question: "其他挑戰"
- [ ] Direct text area
- [ ] Placeholder: "請填寫其他挑戰..."

#### ePort Page (e-Portfolio 系統)
- [ ] Question: "系統類型"
- [ ] Checkbox option: "其他"
- [ ] Text area appears when "其他" is checked
- [ ] Placeholder: "請填寫其他系統類型..."

#### Training Page (師資培訓)
- [ ] Question: "培訓方式"
- [ ] Checkbox option: "其他"
- [ ] Text area appears when "其他" is checked
- [ ] Placeholder: "請填寫其他培訓方式..."
- [ ] Question: "師資持續支持機制"
- [ ] Checkbox option: "其他"
- [ ] Text area appears when "其他" is checked
- [ ] Placeholder: "請填寫其他支持方式..."

#### Learner Page (學員參與與反應)
- [ ] Question: "其他回饋"
- [ ] Direct text area
- [ ] Placeholder: "請填寫其他回饋..."

#### Overall Page (整體評估與需求)
- [ ] "其他" challenge in drag-drop list
- [ ] Text area appears within the challenge item
- [ ] Placeholder: "請填寫其他挑戰..."

**Test Steps for Each**:
1. Navigate to the respective page
2. Find the "其他" option/field
3. If checkbox: check it and verify text area appears
4. Enter some text
5. Navigate away and back
6. Verify text persists
7. Submit form and check email includes the "其他" text

---

### 5. LocalStorage Auto-save

**Location**: All survey pages

- [ ] Form data saves automatically on input
- [ ] Data persists after page refresh
- [ ] Data persists after browser close and reopen
- [ ] Data persists across all pages (navigation doesn't lose data)
- [ ] Data is cleared after successful submission
- [ ] Can manually clear by: `localStorage.removeItem('cbme-survey-draft')`

**Test Steps**:
1. Start filling out the survey
2. Fill in first 2-3 pages
3. Close the browser tab
4. Reopen `http://localhost:3000`
5. Click "開始填寫"
6. Verify all previously entered data is still there
7. Complete and submit the survey
8. Verify form is reset (localStorage cleared)

**Advanced Test**:
1. Open browser console (F12)
2. Type: `localStorage.getItem('cbme-survey-draft')`
3. Verify it returns JSON with your form data
4. Fill in more fields
5. Check localStorage again - verify it updated
6. Submit form successfully
7. Check localStorage - verify it's now `null`

---

### 6. All Required Questions Present

Verify each question from SPEC.md exists:

#### Basic Info Page
- [ ] 院區 (Campus)
- [ ] 職類 (Profession)
- [ ] 填答人姓名 (Name)
- [ ] 職稱 (Title)
- [ ] 負責單位 (Department)
- [ ] 聯絡 Email (Email)

#### EPA Page
- [ ] EPA 設計完成度
- [ ] EPA 數量
- [ ] 信賴等級定義
- [ ] 里程碑行為描述
- [ ] 教師理解程度
- [ ] **EPA 驗證/審核流程建立** ⭐ (New)
- [ ] **EPA 修訂週期** ⭐ (New)
- [ ] EPA 設計的主要挑戰
- [ ] 需要的協助 (with 其他 option)

#### Tools Page
- [ ] Mini-CEX 使用狀況
- [ ] DOPS 使用狀況
- [ ] MSF/360 度回饋
- [ ] **每位學員每月平均被直接觀察次數** ⭐ (New)
- [ ] **評量負擔感受** ⭐ (New)
- [ ] 評量者校準機制
- [ ] 回饋品質
- [ ] 回饋及時性
- [ ] 其他評量工具
- [ ] 評量工具的挑戰

#### CCC Page
- [ ] CCC 成立狀況
- [ ] 委員組成
- [ ] 會議頻率
- [ ] 決策流程
- [ ] 學習處方使用
- [ ] CCC 運作的挑戰
- [ ] **標準化個案討論記錄格式** ⭐ (New)
- [ ] **補救教學追蹤機制** ⭐ (New)
- [ ] 其他挑戰

#### ePort Page
- [ ] 系統導入狀況
- [ ] 系統類型 (with 其他 option)
- [ ] 功能完整性
- [ ] 使用者滿意度
- [ ] **數據分析/儀表板功能使用程度** ⭐ (New)
- [ ] 行動裝置支援
- [ ] 系統改善建議

#### Training Page
- [ ] 基礎培訓完成率
- [ ] 培訓內容
- [ ] 培訓方式 (with 其他 option)
- [ ] 教師投入度
- [ ] **種子教師培訓機制** ⭐ (New)
- [ ] **師資持續支持機制** ⭐ (New, with 其他 option)
- [ ] 培訓需求

#### Learner Page
- [ ] 學員理解程度
- [ ] 學員參與度
- [ ] 學員滿意度
- [ ] 學習成效觀察
- [ ] 學員反饋
- [ ] **學員主動尋求回饋的頻率** ⭐ (New)
- [ ] **學員自我評估習慣** ⭐ (New)
- [ ] 其他回饋

#### Overall Page
- [ ] 整體實施進度
- [ ] 成功經驗分享
- [ ] **挑戰排序 (拖曳功能)** ⭐ (New, with drag-drop)
- [ ] 建議與期待

---

### 7. Tooltips for CBME Terms

**Locations**: Throughout survey pages

Verify tooltips appear on hover/focus:

- [ ] **EPA**: Shows "可信賴專業活動 (Entrustable Professional Activities)"
- [ ] **CCC**: Shows "臨床能力委員會 (Clinical Competency Committee)"
- [ ] **Mini-CEX**: Shows "迷你臨床演練評量"
- [ ] **DOPS**: Shows "直接觀察程序性技能"
- [ ] **MSF**: Shows "多來源回饋 (360度評量)"

**Test Steps**:
1. Navigate to each relevant page
2. Hover over underlined terms
3. Verify tooltip appears with definition
4. Verify tooltip has correct content
5. Test keyboard access (Tab to term, tooltip shows automatically)

---

### 8. Progress Indicator

**Location**: Top of survey pages (except Welcome)

- [ ] Progress bar appears on all pages except Welcome
- [ ] Shows current page number (e.g., "第 2 / 8 頁")
- [ ] Shows percentage complete (e.g., "25% 完成")
- [ ] Bar fills appropriately based on progress
- [ ] Progress updates when navigating forward/backward

**Test Steps**:
1. Navigate through survey
2. Verify progress bar updates on each page
3. Check percentage calculation is correct
4. Verify visual bar length matches percentage

---

### 9. Navigation & Validation

- [ ] "上一頁" (Previous) button works
- [ ] "下一頁" (Next) button works
- [ ] "提交問卷" (Submit) button appears only on last page
- [ ] Previous button disabled on first page (after Welcome)
- [ ] Required fields marked with red asterisk (*)
- [ ] Validation error shown if required fields empty on submit
- [ ] Toast error message: "請填寫所有必填欄位"
- [ ] Smooth scroll to top when changing pages

---

### 10. Responsive Design

Test on different screen sizes:

#### Desktop (≥1024px)
- [ ] Layout uses full width (max 4xl container)
- [ ] All form elements clearly visible
- [ ] Drag-and-drop works with mouse
- [ ] Tooltips display correctly

#### Tablet (768px - 1023px)
- [ ] Layout adapts appropriately
- [ ] Form remains usable
- [ ] Touch interactions work for drag-and-drop

#### Mobile (< 768px)
- [ ] Layout stacks vertically
- [ ] Form inputs sized appropriately for touch
- [ ] Buttons large enough to tap
- [ ] Drag-and-drop works with touch
- [ ] No horizontal scrolling

---

## 🔧 Technical Verification

### Build Process
- [ ] `npm run build` completes without errors
- [ ] `dist/` folder created with:
  - [ ] Static assets (HTML, CSS, JS)
  - [ ] `dist/index.js` (server bundle)
- [ ] `npm start` runs production server successfully
- [ ] Production build works at `http://localhost:3000`

### Code Quality
- [ ] `npm run check` - No TypeScript errors
- [ ] `npm run format` - Code formatted consistently
- [ ] No console warnings in development
- [ ] No console errors in production build

### Performance
- [ ] Initial page load < 3 seconds
- [ ] Form interactions feel instant
- [ ] Drag-and-drop is smooth (60fps)
- [ ] No lag when typing in text fields

---

## 📧 Email Delivery Verification

### Content Accuracy
- [ ] All form fields included in email
- [ ] Field labels match survey questions
- [ ] Multi-select values formatted as comma-separated
- [ ] Likert scale values show both number and label
- [ ] Challenge ranking formatted as numbered list
- [ ] "其他" text fields included where applicable
- [ ] Empty/未填寫 fields shown as "未填"
- [ ] Sections clearly separated with dividers (━━━)

### Formatting
- [ ] Plain text format (readable in all email clients)
- [ ] Chinese characters display correctly (UTF-8)
- [ ] Proper line breaks and spacing
- [ ] Dividers align properly
- [ ] Timestamp in correct timezone and format

### Reliability
- [ ] Email sends within 5 seconds of submission
- [ ] No duplicate emails sent
- [ ] Email arrives in inbox (not spam)
- [ ] From address displays correctly
- [ ] Subject line displays correctly

---

## ✅ Final Checklist

Before marking project as complete:

- [ ] All features verified and working
- [ ] No critical bugs found
- [ ] Email delivery tested and working
- [ ] Documentation complete and accurate
- [ ] `.env` configured with real API key
- [ ] Ready for production deployment
- [ ] Deployment instructions documented
- [ ] Support contact information provided

---

## 🐛 Bug Reporting Template

If you find issues, document them like this:

```
**Issue**: Brief description
**Location**: Which page/component
**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected**: What should happen
**Actual**: What actually happens
**Browser**: Chrome 120, Safari 17, etc.
**Console Errors**: Any JavaScript errors
**Screenshots**: If applicable
```

---

## 📞 Support

If any checks fail or you encounter issues:
1. Review the SETUP_INSTRUCTIONS.md
2. Check the TROUBLESHOOTING section in README.md
3. Contact: liyoungc@pm.me

---

**Verification Completed By**: _______________  
**Date**: _______________  
**Status**: ✅ Pass / ❌ Fail  
**Notes**: 
