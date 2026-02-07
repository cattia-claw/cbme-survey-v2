# CBME Survey v2 - Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- A Resend account and API key (for email functionality)

## Installation

1. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure environment variables**
   
   Create a `.env` file in the project root (already created, but needs API key):
   
   ```bash
   # Resend API Configuration
   RESEND_API_KEY=your_actual_resend_api_key_here  # ⚠️ REQUIRED
   EMAIL_TO=liyoungc@pm.me
   EMAIL_FROM=CBME Survey <onboarding@resend.dev>
   
   # Server Configuration
   NODE_ENV=development
   PORT=3000
   ```

3. **Get a Resend API Key**
   
   a. Go to https://resend.com and sign up for a free account
   
   b. Navigate to the API Keys section in your dashboard
   
   c. Create a new API key
   
   d. Copy the API key and paste it into your `.env` file, replacing `your_actual_resend_api_key_here`
   
   **Important**: For production use, you'll need to:
   - Verify your domain in Resend
   - Update `EMAIL_FROM` to use your verified domain
   - The default `onboarding@resend.dev` only works in test mode

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Testing the Survey

1. Open `http://localhost:3000` in your browser
2. Fill out the survey form
3. Test these features:
   - **Campus selection** should be the first question
   - **Auto-save**: Refresh the page - your data should persist
   - **Drag-and-drop ranking**: On the "整體評估與需求" page, try dragging the challenge items
   - **"其他" fields**: When you select "其他" options, text fields should appear
   - **Email submission**: Click "提交問卷" - you should receive an email at `liyoungc@pm.me`

## Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Features Implemented

✅ **Campus Selection**: 台南院區/麻豆院區 as first question  
✅ **Email Submission**: Using Resend API (no database needed)  
✅ **Drag-and-Drop Ranking**: Challenge ranking with @dnd-kit  
✅ **"其他" Options**: Text input fields for custom responses  
✅ **Auto-save**: Form data saved to localStorage  
✅ **All Required Questions**: Complete as per SPEC.md

## Project Structure

```
cbme-survey-v2/
├── client/                    # Frontend React app
│   └── src/
│       ├── components/
│       │   └── survey/       # Survey page components
│       │       ├── BasicInfoPage.tsx
│       │       ├── EpaPage.tsx
│       │       ├── ToolsPage.tsx
│       │       ├── CccPage.tsx
│       │       ├── EportPage.tsx
│       │       ├── TrainingPage.tsx
│       │       ├── LearnerPage.tsx
│       │       └── OverallPage.tsx
│       └── pages/
│           └── Survey.tsx     # Main survey container
├── server/                    # Backend Express app
│   └── _core/
│       └── index.ts          # API endpoint (/api/submit)
├── shared/                    # Shared types & constants
│   ├── surveyTypes.ts        # TypeScript types
│   └── surveyConstants.ts    # Form options & constants
├── .env                      # Environment configuration
└── package.json              # Dependencies

```

## Troubleshooting

### npm install fails with peer dependency errors

Solution: Use the `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

### Email not sending

Check that:
1. `RESEND_API_KEY` is set in `.env`
2. The API key is valid and active
3. You're not exceeding Resend's free tier limits (100 emails/day)
4. Check the server console for error messages

### Form data not saving

- Check browser console for errors
- Verify localStorage is enabled in your browser
- Try in incognito mode to rule out extension conflicts

### Drag-and-drop not working

- Ensure all @dnd-kit packages are installed
- Check for JavaScript errors in the browser console
- Try a different browser (Chrome/Firefox recommended)

## Next Steps for Production

1. **Get a production Resend API key** with a verified domain
2. **Update EMAIL_FROM** to use your verified domain
3. **Set up proper error logging** (e.g., Sentry, LogRocket)
4. **Add analytics** if needed (Google Analytics, Plausible)
5. **Deploy** to a hosting service:
   - Zeabur (recommended for easy deployment)
   - Vercel
   - Railway
   - Render

## Support

For issues or questions:
- Check `IMPLEMENTATION_STATUS.md` for feature status
- Review `SPEC.md` for project requirements
- Contact: liyoungc@pm.me
