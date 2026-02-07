# CBME Survey v2 - 能力本位醫學教育執行狀況調查問卷

A comprehensive web-based survey system for evaluating Competency-Based Medical Education (CBME) implementation across different healthcare professions.

## 🎯 Project Overview

This application collects feedback on CBME implementation from various healthcare professionals (nurses, radiologists, pharmacists, physical therapists, etc.) across two campuses (台南院區/麻豆院區). Survey responses are submitted via email using the Resend API.

## ✨ Features

### Core Functionality
- ✅ **Multi-campus Support**: 台南院區 and 麻豆院區 selection
- ✅ **10 Professional Categories**: Nurses, Radiologists, Pharmacists, and more
- ✅ **9 Survey Sections**: Comprehensive evaluation across all CBME dimensions
- ✅ **Email Submission**: Direct email delivery via Resend API (no database required)
- ✅ **Auto-save**: Form data automatically saved to localStorage
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices

### User Experience
- ✅ **Drag-and-Drop Ranking**: Interactive challenge prioritization using @dnd-kit
- ✅ **"其他" (Other) Options**: Custom text input for additional responses
- ✅ **Tooltips**: Helpful definitions for CBME terminology (EPA, CCC, Mini-CEX, etc.)
- ✅ **Progress Indicator**: Visual progress bar showing completion percentage
- ✅ **Form Validation**: Client-side validation for required fields
- ✅ **Modern UI**: Built with shadcn/ui components and Tailwind CSS

### Survey Sections
1. 基本資訊 (Basic Information)
2. EPA 設計與實施 (EPA Design & Implementation)
3. 評量工具使用 (Assessment Tools)
4. CCC 運作 (Clinical Competency Committee)
5. e-Portfolio 系統 (e-Portfolio Systems)
6. 師資培訓 (Faculty Training)
7. 學員參與與反應 (Learner Engagement)
8. 整體評估與需求 (Overall Assessment)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm (or pnpm)
- Resend account (free tier available)

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure environment**
   
   Create `.env` file (or use the provided template):
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxx  # Get from https://resend.com
   EMAIL_TO=liyoungc@pm.me
   EMAIL_FROM=CBME Survey <onboarding@resend.dev>
   NODE_ENV=development
   PORT=3000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Wouter** - Lightweight routing
- **@dnd-kit** - Drag-and-drop functionality
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Express** - Web server
- **tRPC** - Type-safe API
- **Resend** - Email delivery
- **Node.js** - Runtime environment

### Build Tools
- **Vite** - Fast build tool
- **esbuild** - JavaScript bundler
- **TypeScript** - Compiler

## 📁 Project Structure

```
cbme-survey-v2/
├── client/                     # Frontend React application
│   └── src/
│       ├── components/
│       │   ├── survey/        # Survey page components
│       │   │   ├── WelcomePage.tsx
│       │   │   ├── BasicInfoPage.tsx
│       │   │   ├── EpaPage.tsx
│       │   │   ├── ToolsPage.tsx
│       │   │   ├── CccPage.tsx
│       │   │   ├── EportPage.tsx
│       │   │   ├── TrainingPage.tsx
│       │   │   ├── LearnerPage.tsx
│       │   │   ├── OverallPage.tsx
│       │   │   └── TooltipTerm.tsx
│       │   └── ui/            # shadcn/ui components
│       └── pages/
│           └── Survey.tsx     # Main survey container
├── server/                     # Backend Express application
│   ├── _core/
│   │   └── index.ts          # Server entry point, /api/submit endpoint
│   └── routers.ts            # tRPC router configuration
├── shared/                     # Shared types and constants
│   ├── surveyTypes.ts        # TypeScript type definitions
│   └── surveyConstants.ts    # Form options and constants
├── .env                       # Environment variables (create this)
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## 📧 Email Format

Survey responses are sent as formatted plain text emails:

```
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
...

━━━ 整體評估 ━━━
• 整體進度：3 (發展階段 41-60%)
• 挑戰排序：
  1. 人力不足
  2. 時間不足
  3. 系統支援不足
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
填答時間：2026-02-07 14:30:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🧪 Testing

Run TypeScript type checking:
```bash
npm run check
```

Run tests:
```bash
npm test
```

## 🏗️ Building for Production

Build the application:
```bash
npm run build
```

This creates:
- `dist/` - Optimized frontend assets
- `dist/index.js` - Backend server bundle

Start production server:
```bash
npm start
```

## 🚢 Deployment

### Zeabur (Recommended)

1. Create `zeabur.json`:
   ```json
   {
     "build": {
       "build_command": "npm install && npm run build"
     },
     "output_dir": "dist"
   }
   ```

2. Set environment variables in Zeabur dashboard:
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `EMAIL_FROM`
   - `NODE_ENV=production`

3. Deploy!

### Other Platforms

Compatible with:
- Vercel
- Railway
- Render
- Heroku
- Any Node.js hosting service

## 📝 Documentation

- **[SPEC.md](./SPEC.md)** - Complete project specification
- **[IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)** - Feature checklist
- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Detailed setup guide
- **[WORK_SUMMARY.md](./WORK_SUMMARY.md)** - Implementation details

## 🔧 Configuration

### Required Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `RESEND_API_KEY` | Resend API key | (required) |
| `EMAIL_TO` | Recipient email | `liyoungc@pm.me` |
| `EMAIL_FROM` | Sender email | `CBME Survey <onboarding@resend.dev>` |
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (for production)
3. Create API key
4. Update `.env` file

**Note**: Free tier includes:
- 100 emails/day
- 3,000 emails/month
- Test mode with `onboarding@resend.dev`

## 🎨 Customization

### Adding New Questions

1. Update `shared/surveyTypes.ts` - Add field to `SurveyFormData`
2. Update `shared/surveyConstants.ts` - Add options if needed
3. Update page component - Add form field
4. Update `server/_core/index.ts` - Add to email template

### Styling

- Modify `tailwind.config.js` for theme customization
- Update components in `client/src/components/ui/`
- Follow shadcn/ui documentation for component variants

## 🐛 Troubleshooting

### npm install fails
```bash
npm install --legacy-peer-deps
```

### Email not sending
- Verify `RESEND_API_KEY` is set
- Check Resend dashboard for errors
- Verify sender domain (production only)

### Form data not persisting
- Check browser localStorage
- Try incognito mode
- Clear localStorage: `localStorage.removeItem('cbme-survey-draft')`

### Drag-and-drop not working
- Ensure @dnd-kit packages installed
- Check browser compatibility (modern browsers only)
- Verify no JavaScript errors in console

## 📄 License

MIT

## 👥 Contributors

Built for CBME implementation evaluation across healthcare professions.

## 📞 Support

For questions or issues, contact: liyoungc@pm.me

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: February 2026
