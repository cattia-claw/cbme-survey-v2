import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, surveyResponses, InsertSurveyResponse, SurveyResponse } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Survey Response Operations

/**
 * Calculate dimension averages based on survey responses
 */
export function calculateDimensionScores(response: Omit<InsertSurveyResponse, 'epaAvg' | 'toolAvg' | 'cccAvg' | 'eportAvg' | 'trainingAvg' | 'learnerAvg' | 'overallAvg'>) {
  // EPA average: design, entrustment, milestone, teacher understanding
  const epaAvg = (
    response.epaDesignCompletion +
    response.epaEntrustmentLevel +
    response.epaMilestoneDescription +
    response.epaTeacherUnderstanding
  ) / 4;

  // Tool average: minicex, dops, msf, feedback quality
  const toolAvg = (
    response.toolMinicex +
    response.toolDops +
    response.toolMsf +
    response.toolFeedbackQuality
  ) / 4;

  // CCC average: establishment (converted to score) + clarity
  const cccEstablishmentScore = convertEstablishmentToScore(response.cccEstablishment);
  const cccAvg = (cccEstablishmentScore + response.cccClarity) / 2;

  // e-Portfolio average: functionality + satisfaction
  const eportAvg = (response.eportFunctionality + response.eportSatisfaction) / 2;

  // Training average: engagement only
  const trainingAvg = response.trainingEngagement;

  // Learner average: understanding, engagement, satisfaction, effectiveness
  const learnerAvg = (
    response.learnerUnderstanding +
    response.learnerEngagement +
    response.learnerSatisfaction +
    response.learnerEffectiveness
  ) / 4;

  // Overall average: average of all dimensions
  const overallAvg = (epaAvg + toolAvg + cccAvg + eportAvg + trainingAvg + learnerAvg) / 6;

  return {
    epaAvg: parseFloat(epaAvg.toFixed(2)),
    toolAvg: parseFloat(toolAvg.toFixed(2)),
    cccAvg: parseFloat(cccAvg.toFixed(2)),
    eportAvg: parseFloat(eportAvg.toFixed(2)),
    trainingAvg: parseFloat(trainingAvg.toFixed(2)),
    learnerAvg: parseFloat(learnerAvg.toFixed(2)),
    overallAvg: parseFloat(overallAvg.toFixed(2)),
  };
}

/**
 * Convert CCC establishment status to numeric score
 */
function convertEstablishmentToScore(status: string): number {
  const mapping: Record<string, number> = {
    'not_established': 1,
    'planning': 2,
    'established_not_running': 3,
    'running': 4,
    'running_well': 5,
  };
  return mapping[status] || 0;
}

/**
 * Create a new survey response
 */
export async function createSurveyResponse(response: Omit<InsertSurveyResponse, 'epaAvg' | 'toolAvg' | 'cccAvg' | 'eportAvg' | 'trainingAvg' | 'learnerAvg' | 'overallAvg'>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const scores = calculateDimensionScores(response);
  const fullResponse: InsertSurveyResponse = {
    ...response,
    ...scores,
  };

  const result = await db.insert(surveyResponses).values(fullResponse);
  // MySQL returns insertId in the result
  const insertId = Number((result as any).insertId || 0);
  return { insertId };
}

/**
 * Get all survey responses with optional filters
 */
export async function getSurveyResponses(filters?: {
  profession?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  let query = db.select().from(surveyResponses);

  if (filters) {
    const conditions = [];
    
    if (filters.profession) {
      conditions.push(eq(surveyResponses.profession, filters.profession as any));
    }
    
    if (filters.startDate) {
      conditions.push(gte(surveyResponses.createdAt, filters.startDate));
    }
    
    if (filters.endDate) {
      conditions.push(lte(surveyResponses.createdAt, filters.endDate));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
  }

  const results = await query.orderBy(desc(surveyResponses.createdAt));
  return results;
}

/**
 * Get a single survey response by ID
 */
export async function getSurveyResponseById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(surveyResponses).where(eq(surveyResponses.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

/**
 * Get summary statistics grouped by profession
 */
export async function getSummaryStatsByProfession() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const results = await db
    .select({
      profession: surveyResponses.profession,
      count: sql<number>`COUNT(*)`,
      avgEpa: sql<number>`AVG(${surveyResponses.epaAvg})`,
      avgTool: sql<number>`AVG(${surveyResponses.toolAvg})`,
      avgCcc: sql<number>`AVG(${surveyResponses.cccAvg})`,
      avgEport: sql<number>`AVG(${surveyResponses.eportAvg})`,
      avgTraining: sql<number>`AVG(${surveyResponses.trainingAvg})`,
      avgLearner: sql<number>`AVG(${surveyResponses.learnerAvg})`,
      avgOverall: sql<number>`AVG(${surveyResponses.overallAvg})`,
    })
    .from(surveyResponses)
    .groupBy(surveyResponses.profession);

  return results;
}

/**
 * Get overall summary statistics
 */
export async function getOverallSummaryStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const results = await db
    .select({
      totalResponses: sql<number>`COUNT(*)`,
      avgEpa: sql<number>`AVG(${surveyResponses.epaAvg})`,
      avgTool: sql<number>`AVG(${surveyResponses.toolAvg})`,
      avgCcc: sql<number>`AVG(${surveyResponses.cccAvg})`,
      avgEport: sql<number>`AVG(${surveyResponses.eportAvg})`,
      avgTraining: sql<number>`AVG(${surveyResponses.trainingAvg})`,
      avgLearner: sql<number>`AVG(${surveyResponses.learnerAvg})`,
      avgOverall: sql<number>`AVG(${surveyResponses.overallAvg})`,
    })
    .from(surveyResponses);

  return results[0] || null;
}
