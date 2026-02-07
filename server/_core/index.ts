import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { Resend } from "resend";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import {
  ASSESSMENT_BURDEN_OPTIONS,
  CALIBRATION_FREQUENCY_OPTIONS,
  CAMPUS_OPTIONS,
  CCC_ESTABLISHMENT_OPTIONS,
  CCC_FREQUENCY_OPTIONS,
  CCC_MEMBER_COUNT_OPTIONS,
  CCC_PRESCRIPTION_OPTIONS,
  CHALLENGE_OPTIONS,
  DIRECT_OBSERVATION_OPTIONS,
  EPORT_IMPLEMENTATION_OPTIONS,
  EPORT_MOBILE_OPTIONS,
  EPORT_TYPE_OPTIONS,
  EPA_COUNT_OPTIONS,
  EPA_REVISION_CYCLE_OPTIONS,
  EPA_SUPPORT_OPTIONS,
  FEEDBACK_TIMING_OPTIONS,
  LIKERT_SCALE_OPTIONS,
  PROFESSION_NAMES,
  TRAINING_COMPLETION_OPTIONS,
  TRAINING_METHODS_OPTIONS,
  TRAINING_SUPPORT_OPTIONS,
  TRAINING_TOPICS_OPTIONS,
  YES_NO_PLANNING_OPTIONS,
} from "@shared/surveyConstants";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Survey email submission endpoint
  app.post("/api/submit", async (req, res) => {
    try {
      const apiKey = process.env.RESEND_API_KEY;
      const emailTo = process.env.EMAIL_TO || "liyoungc@pm.me";
      const emailFrom = process.env.EMAIL_FROM || "CBME Survey <onboarding@resend.dev>";

      if (!apiKey) {
        return res.status(500).json({ message: "RESEND_API_KEY is not configured" });
      }

      const data = req.body || {};
      if (!data.campus || !data.profession || !data.respondentName || !data.email) {
        return res.status(400).json({ message: "缺少必填欄位" });
      }

      const resend = new Resend(apiKey);

      const campusLabel =
        CAMPUS_OPTIONS.find((option) => option.value === data.campus)?.label || data.campus;
      const professionLabel = PROFESSION_NAMES[data.profession] || data.profession;

      const subject = `【CBME問卷】${professionLabel} - ${campusLabel} - ${data.respondentName}`;

      const formatOption = (
        value: string | number | undefined,
        options: { value: string | number; label: string }[]
      ) =>
        value !== undefined && value !== ""
          ? options.find((option) => option.value === value)?.label || String(value)
          : "未填";

      const formatLikert = (value?: number, options = LIKERT_SCALE_OPTIONS) => {
        if (typeof value !== "number") return "未填";
        const label = options.find((option) => option.value === value)?.label;
        if (!label) return String(value);
        const cleaned = label.replace(/^[0-9]+\\s*-\\s*/, "");
        return `${value} (${cleaned})`;
      };

      const formatMulti = (values: string[] | undefined, options: { value: string; label: string }[]) => {
        if (!values || values.length === 0) return "無";
        return values
          .map((value) => options.find((option) => option.value === value)?.label || value)
          .join(", ");
      };

      const formatRanking = (values: string[] | undefined) => {
        if (!values || values.length === 0) return "未填";
        return values
          .map((value, index) => {
            const label = CHALLENGE_OPTIONS.find((option) => option.value === value)?.label || value;
            return `${index + 1}. ${label}`;
          })
          .join("\\n  ");
      };

      const toolListWithOther = (values: string[] | undefined, other?: string) => {
        if (!values || values.length === 0) return other ? `其他：${other}` : "無";
        const base = values
          .map((value) => EPA_SUPPORT_OPTIONS.find((option) => option.value === value)?.label || value)
          .filter((label) => label !== "其他");
        const extra = other ? `其他：${other}` : values.includes("other") ? "其他" : "";
        const combined = [...base, extra].filter(Boolean);
        return combined.length > 0 ? combined.join(", ") : "無";
      };

      const eportTypes = (values: string[] | undefined, other?: string) => {
        if (!values || values.length === 0) return other ? `其他：${other}` : "無";
        const base = values
          .map((value) => EPORT_TYPE_OPTIONS.find((option) => option.value === value)?.label || value)
          .filter((label) => label !== "其他");
        const extra = other ? `其他：${other}` : values.includes("other") ? "其他" : "";
        const combined = [...base, extra].filter(Boolean);
        return combined.length > 0 ? combined.join(", ") : "無";
      };

      const trainingMethods = (values: string[] | undefined, other?: string) => {
        if (!values || values.length === 0) return other ? `其他：${other}` : "無";
        const base = values
          .map((value) => TRAINING_METHODS_OPTIONS.find((option) => option.value === value)?.label || value)
          .filter((label) => label !== "其他");
        const extra = other ? `其他：${other}` : values.includes("other") ? "其他" : "";
        const combined = [...base, extra].filter(Boolean);
        return combined.length > 0 ? combined.join(", ") : "無";
      };

      const trainingSupport = (values: string[] | undefined, other?: string) => {
        if (!values || values.length === 0) return other ? `其他：${other}` : "無";
        const base = values
          .map((value) => TRAINING_SUPPORT_OPTIONS.find((option) => option.value === value)?.label || value)
          .filter((label) => label !== "其他");
        const extra = other ? `其他：${other}` : values.includes("other") ? "其他" : "";
        const combined = [...base, extra].filter(Boolean);
        return combined.length > 0 ? combined.join(", ") : "無";
      };

      const trainingTopics = (values: string[] | undefined) => formatMulti(values, TRAINING_TOPICS_OPTIONS);

      const timestamp = new Date().toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false,
      });

      const emailBody = [
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "CBME 執行狀況調查問卷回覆",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "",
        "📋 基本資料",
        `• 院區：${campusLabel}`,
        `• 職類：${professionLabel}`,
        `• 姓名：${data.respondentName ?? "未填"}`,
        `• 職稱：${data.title ?? "未填"}`,
        `• 部門：${data.department ?? "未填"}`,
        `• Email：${data.email ?? "未填"}`,
        "",
        "━━━ EPA 設計與實施 ━━━",
        `• 設計完成度：${formatLikert(data.epaDesignCompletion)}`,
        `• EPA 數量：${formatOption(data.epaCount, EPA_COUNT_OPTIONS)}`,
        `• 信任等級明確度：${data.epaEntrustmentLevel ?? "未填"}`,
        `• 里程碑行為對應：${data.epaMilestoneDescription ?? "未填"}`,
        `• 教師理解度：${data.epaTeacherUnderstanding ?? "未填"}`,
        `• 驗證流程建立：${formatLikert(data.epaVerificationProcess)}`,
        `• 修訂週期：${formatOption(data.epaRevisionCycle, EPA_REVISION_CYCLE_OPTIONS)}`,
        `• 所需支援：${toolListWithOther(data.epaSupport, data.epaSupportOther)}`,
        `• 挑戰：${data.epaChallenges ?? "未填"}`,
        "",
        "━━━ 評量工具 ━━━",
        `• Mini-CEX 使用：${data.toolMinicex ?? "未填"}`,
        `• DOPS 使用：${data.toolDops ?? "未填"}`,
        `• MSF 使用：${data.toolMsf ?? "未填"}`,
        `• 直接觀察次數：${formatOption(data.toolObservationFrequency, DIRECT_OBSERVATION_OPTIONS)}`,
        `• 評量負擔感受：${formatOption(data.toolBurden, ASSESSMENT_BURDEN_OPTIONS)}`,
        `• 校準機制：${formatOption(data.toolCalibration, CALIBRATION_FREQUENCY_OPTIONS)}`,
        `• 回饋品質：${data.toolFeedbackQuality ?? "未填"}`,
        `• 回饋及時性：${formatOption(data.toolFeedbackTiming, FEEDBACK_TIMING_OPTIONS)}`,
        `• 其他評量工具：${data.toolOtherTools ?? "未填"}`,
        `• 挑戰：${data.toolChallenges ?? "未填"}`,
        "",
        "━━━ CCC 運作 ━━━",
        `• 成立狀況：${formatOption(data.cccEstablishment, CCC_ESTABLISHMENT_OPTIONS)}`,
        `• 委員人數：${formatOption(data.cccMemberCount, CCC_MEMBER_COUNT_OPTIONS)}`,
        `• 會議頻率：${formatOption(data.cccFrequency, CCC_FREQUENCY_OPTIONS)}`,
        `• 決策流程：${data.cccClarity ?? "未填"}`,
        `• 學習處方使用：${formatOption(data.cccPrescription, CCC_PRESCRIPTION_OPTIONS)}`,
        `• 標準化記錄格式：${formatOption(data.cccCaseRecordStandard, YES_NO_PLANNING_OPTIONS)}`,
        `• 補救教學追蹤：${formatOption(data.cccRemediationTracking, YES_NO_PLANNING_OPTIONS)}`,
        `• 挑戰：${data.cccChallenges ?? "未填"}`,
        `• 其他挑戰：${data.cccChallengesOther ?? "未填"}`,
        "",
        "━━━ e-Portfolio ━━━",
        `• 系統導入：${formatOption(data.eportImplementation, EPORT_IMPLEMENTATION_OPTIONS)}`,
        `• 系統類型：${eportTypes(data.eportType, data.eportTypeOther)}`,
        `• 功能完整性：${data.eportFunctionality ?? "未填"}`,
        `• 使用者滿意度：${data.eportSatisfaction ?? "未填"}`,
        `• 數據分析使用：${data.eportAnalyticsUsage ?? "未填"}`,
        `• 行動裝置支援：${formatOption(data.eportMobile, EPORT_MOBILE_OPTIONS)}`,
        `• 建議：${data.eportSuggestions ?? "未填"}`,
        "",
        "━━━ 師資培訓 ━━━",
        `• 基礎培訓完成率：${formatOption(data.trainingCompletion, TRAINING_COMPLETION_OPTIONS)}`,
        `• 培訓內容：${trainingTopics(data.trainingTopics)}`,
        `• 培訓方式：${trainingMethods(data.trainingMethods, data.trainingMethodsOther)}`,
        `• 教師投入度：${data.trainingEngagement ?? "未填"}`,
        `• 種子教師機制：${formatOption(data.trainingSeedTeacher, YES_NO_PLANNING_OPTIONS)}`,
        `• 持續支持機制：${trainingSupport(data.trainingSupportMechanism, data.trainingSupportMechanismOther)}`,
        `• 培訓需求：${data.trainingNeeds ?? "未填"}`,
        "",
        "━━━ 學員參與 ━━━",
        `• 理解程度：${data.learnerUnderstanding ?? "未填"}`,
        `• 參與度：${data.learnerEngagement ?? "未填"}`,
        `• 滿意度：${data.learnerSatisfaction ?? "未填"}`,
        `• 成效觀察：${data.learnerEffectiveness ?? "未填"}`,
        `• 主動尋求回饋頻率：${data.learnerFeedbackSeekingFrequency ?? "未填"}`,
        `• 自我評估習慣：${data.learnerSelfAssessmentHabit ?? "未填"}`,
        `• 學員反饋：${data.learnerFeedback ?? "未填"}`,
        `• 其他回饋：${data.learnerOtherFeedback ?? "未填"}`,
        "",
        "━━━ 整體評估 ━━━",
        `• 整體進度：${formatLikert(data.overallProgress, [
          { value: 1, label: "1 - 尚未開始（0-20%）" },
          { value: 2, label: "2 - 起步階段（21-40%）" },
          { value: 3, label: "3 - 發展階段（41-60%）" },
          { value: 4, label: "4 - 成熟階段（61-80%）" },
          { value: 5, label: "5 - 完善運作（81-100%）" },
        ])}`,
        "• 挑戰排序：",
        `  ${formatRanking(data.challengeRanking)}`,
        `• 其他挑戰補充：${data.challengeOtherText ?? "未填"}`,
        `• 成功經驗：${data.successStories ?? "未填"}`,
        `• 建議：${data.suggestions ?? "未填"}`,
        "",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        `填答時間：${timestamp}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      ].join("\\n");

      await resend.emails.send({
        from: emailFrom,
        to: emailTo,
        subject,
        text: emailBody,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Email submission failed:", error);
      return res.status(500).json({ message: "提交失敗，請稍後再試" });
    }
  });
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
