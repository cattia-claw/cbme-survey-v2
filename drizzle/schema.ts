import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, float } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Survey responses table - stores all CBME survey submissions
 */
export const surveyResponses = mysqlTable("survey_responses", {
  id: int("id").autoincrement().primaryKey(),
  
  // Basic Information
  profession: mysqlEnum("profession", ["NUR", "RAD", "MT", "PHAR", "PT", "OT", "RT", "DT", "SLP", "CP"]).notNull(),
  respondentName: varchar("respondent_name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  
  // EPA Design & Implementation (Page 3)
  epaDesignCompletion: int("epa_design_completion").notNull(), // 1-5
  epaCount: varchar("epa_count", { length: 50 }).notNull(), // "0", "1-3", "4-6", "7-10", "10+"
  epaEntrustmentLevel: int("epa_entrustment_level").notNull(), // 1-5
  epaMilestoneDescription: int("epa_milestone_description").notNull(), // 1-5
  epaTeacherUnderstanding: int("epa_teacher_understanding").notNull(), // 1-5
  epaChallenges: text("epa_challenges"), // Open text
  epaSupport: text("epa_support"), // Checkbox selections as JSON array
  
  // Assessment Tools (Page 4)
  toolMinicex: int("tool_minicex").notNull(), // 1-5
  toolDops: int("tool_dops").notNull(), // 1-5
  toolMsf: int("tool_msf").notNull(), // 1-5
  toolCalibration: varchar("tool_calibration", { length: 50 }).notNull(), // "never", "yearly", "biannual", "quarterly", "monthly"
  toolFeedbackQuality: int("tool_feedback_quality").notNull(), // 1-5
  toolFeedbackTiming: varchar("tool_feedback_timing", { length: 50 }).notNull(), // "24h", "2-3days", "1week", "over1week", "varies"
  toolChallenges: text("tool_challenges"), // Open text
  
  // CCC Operations (Page 5)
  cccEstablishment: varchar("ccc_establishment", { length: 50 }).notNull(), // "not_established", "planning", "established_not_running", "running", "running_well"
  cccMemberCount: varchar("ccc_member_count", { length: 50 }).notNull(), // "not_established", "under3", "4-6", "7-10", "over10"
  cccFrequency: varchar("ccc_frequency", { length: 50 }).notNull(), // "not_meeting", "biannual", "quarterly", "monthly", "as_needed"
  cccClarity: int("ccc_clarity").notNull(), // 1-5
  cccPrescription: varchar("ccc_prescription", { length: 50 }).notNull(), // "never", "heard_not_used", "occasionally", "often", "systematically"
  cccChallenges: text("ccc_challenges"), // Open text
  
  // e-Portfolio Systems (Page 6)
  eportImplementation: varchar("eport_implementation", { length: 50 }).notNull(), // "none", "planning", "trial", "partial", "full"
  eportType: text("eport_type"), // Checkbox selections as JSON array
  eportFunctionality: int("eport_functionality").notNull(), // 1-5
  eportSatisfaction: int("eport_satisfaction").notNull(), // 1-5
  eportMobile: varchar("eport_mobile", { length: 50 }).notNull(), // "not_supported", "partial", "supported_poor", "supported_good", "excellent"
  eportSuggestions: text("eport_suggestions"), // Open text
  
  // Faculty Training (Page 7)
  trainingCompletion: varchar("training_completion", { length: 50 }).notNull(), // "0-20", "21-40", "41-60", "61-80", "81-100"
  trainingTopics: text("training_topics"), // Checkbox selections as JSON array
  trainingMethods: text("training_methods"), // Checkbox selections as JSON array
  trainingEngagement: int("training_engagement").notNull(), // 1-5
  trainingNeeds: text("training_needs"), // Open text
  
  // Learner Engagement (Page 8)
  learnerUnderstanding: int("learner_understanding").notNull(), // 1-5
  learnerEngagement: int("learner_engagement").notNull(), // 1-5
  learnerSatisfaction: int("learner_satisfaction").notNull(), // 1-5
  learnerEffectiveness: int("learner_effectiveness").notNull(), // 1-5
  learnerFeedback: text("learner_feedback"), // Open text
  
  // Overall Assessment (Page 9)
  overallProgress: int("overall_progress").notNull(), // 1-5
  challengeRanking: text("challenge_ranking"), // JSON array of ranked challenges
  successStories: text("success_stories"), // Open text
  suggestions: text("suggestions"), // Open text
  
  // Calculated Scores
  epaAvg: float("epa_avg").notNull(),
  toolAvg: float("tool_avg").notNull(),
  cccAvg: float("ccc_avg").notNull(),
  eportAvg: float("eport_avg").notNull(),
  trainingAvg: float("training_avg").notNull(),
  learnerAvg: float("learner_avg").notNull(),
  overallAvg: float("overall_avg").notNull(),
  
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type SurveyResponse = typeof surveyResponses.$inferSelect;
export type InsertSurveyResponse = typeof surveyResponses.$inferInsert;
