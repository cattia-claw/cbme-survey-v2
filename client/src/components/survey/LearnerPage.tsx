import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { SurveyFormData } from "@shared/surveyTypes";

interface LearnerPageProps {
  formData: Partial<SurveyFormData>;
  updateFormData: (data: Partial<SurveyFormData>) => void;
}

const understandingOptions = [
  { value: 1, label: "1 - 完全不了解" },
  { value: 2, label: "2 - 略有了解" },
  { value: 3, label: "3 - 基本了解" },
  { value: 4, label: "4 - 相當了解" },
  { value: 5, label: "5 - 非常了解" },
];

const engagementOptions = [
  { value: 1, label: "1 - 非常消極" },
  { value: 2, label: "2 - 偏消極" },
  { value: 3, label: "3 - 普通" },
  { value: 4, label: "4 - 偏積極" },
  { value: 5, label: "5 - 非常積極" },
];

const satisfactionOptions = [
  { value: 1, label: "1 - 非常不滿意" },
  { value: 2, label: "2 - 不滿意" },
  { value: 3, label: "3 - 普通" },
  { value: 4, label: "4 - 滿意" },
  { value: 5, label: "5 - 非常滿意" },
];

const effectivenessOptions = [
  { value: 1, label: "1 - 明顯較差" },
  { value: 2, label: "2 - 略差" },
  { value: 3, label: "3 - 差不多" },
  { value: 4, label: "4 - 略好" },
  { value: 5, label: "5 - 明顯較好" },
];

const frequencyOptions = [
  { value: 1, label: "1 - 很少/幾乎沒有" },
  { value: 2, label: "2 - 偶爾" },
  { value: 3, label: "3 - 有時" },
  { value: 4, label: "4 - 經常" },
  { value: 5, label: "5 - 非常頻繁" },
];

export default function LearnerPage({ formData, updateFormData }: LearnerPageProps) {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        請評估學員在 CBME 訓練中的參與與反應狀況
      </p>

      {/* Learner Understanding */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          1. 學員理解程度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">學員對 CBME 的理解程度？</p>
        <RadioGroup
          value={formData.learnerUnderstanding?.toString() || ""}
          onValueChange={(value) => updateFormData({ learnerUnderstanding: parseInt(value) })}
        >
          {understandingOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`learner-understand-${option.value}`} />
              <Label htmlFor={`learner-understand-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Learner Engagement */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          2. 學員參與度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">學員的參與積極度？</p>
        <RadioGroup
          value={formData.learnerEngagement?.toString() || ""}
          onValueChange={(value) => updateFormData({ learnerEngagement: parseInt(value) })}
        >
          {engagementOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`learner-engage-${option.value}`} />
              <Label htmlFor={`learner-engage-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Learner Satisfaction */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          3. 學員滿意度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">學員對 CBME 訓練方式的滿意度？</p>
        <RadioGroup
          value={formData.learnerSatisfaction?.toString() || ""}
          onValueChange={(value) => updateFormData({ learnerSatisfaction: parseInt(value) })}
        >
          {satisfactionOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`learner-sat-${option.value}`} />
              <Label htmlFor={`learner-sat-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Learner Effectiveness */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          4. 學習成效觀察 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">相較於傳統訓練，您觀察到的學習成效？</p>
        <RadioGroup
          value={formData.learnerEffectiveness?.toString() || ""}
          onValueChange={(value) => updateFormData({ learnerEffectiveness: parseInt(value) })}
        >
          {effectivenessOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`learner-effect-${option.value}`} />
              <Label htmlFor={`learner-effect-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Learner Feedback */}
      <div className="space-y-3">
        <Label htmlFor="learnerFeedback" className="text-base font-medium">
          5. 學員反饋
        </Label>
        <p className="text-sm text-muted-foreground">學員提出的主要意見或建議？</p>
        <Textarea
          id="learnerFeedback"
          value={formData.learnerFeedback || ""}
          onChange={(e) => updateFormData({ learnerFeedback: e.target.value })}
          placeholder="請描述學員提出的主要意見或建議..."
          rows={4}
        />
      </div>

      {/* Feedback Seeking Frequency */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          6. 學員主動尋求回饋的頻率 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">學員主動向教師尋求回饋的頻率？</p>
        <RadioGroup
          value={formData.learnerFeedbackSeekingFrequency?.toString() || ""}
          onValueChange={(value) => updateFormData({ learnerFeedbackSeekingFrequency: parseInt(value) })}
        >
          {frequencyOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`learner-feedback-seek-${option.value}`} />
              <Label htmlFor={`learner-feedback-seek-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Self Assessment Habit */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          7. 學員自我評估習慣 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">學員是否有自我評估學習狀況的習慣？</p>
        <RadioGroup
          value={formData.learnerSelfAssessmentHabit?.toString() || ""}
          onValueChange={(value) => updateFormData({ learnerSelfAssessmentHabit: parseInt(value) })}
        >
          {frequencyOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`learner-self-assess-${option.value}`} />
              <Label htmlFor={`learner-self-assess-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Other Feedback */}
      <div className="space-y-3">
        <Label htmlFor="learnerOtherFeedback" className="text-base font-medium">
          8. 其他回饋
        </Label>
        <p className="text-sm text-muted-foreground">其他與學員參與相關的回饋？</p>
        <Textarea
          id="learnerOtherFeedback"
          value={formData.learnerOtherFeedback || ""}
          onChange={(e) => updateFormData({ learnerOtherFeedback: e.target.value })}
          placeholder="請填寫其他回饋..."
          rows={3}
        />
      </div>
    </div>
  );
}
