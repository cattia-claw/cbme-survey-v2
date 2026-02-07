import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { SurveyFormData } from "@shared/surveyTypes";
import TooltipTerm from "@/components/survey/TooltipTerm";
import {
  CALIBRATION_FREQUENCY_OPTIONS,
  FEEDBACK_TIMING_OPTIONS,
  DIRECT_OBSERVATION_OPTIONS,
  ASSESSMENT_BURDEN_OPTIONS,
} from "@shared/surveyConstants";

interface ToolsPageProps {
  formData: Partial<SurveyFormData>;
  updateFormData: (data: Partial<SurveyFormData>) => void;
}

const usageOptions = [
  { value: 1, label: "1 - 從未使用" },
  { value: 2, label: "2 - 偶爾使用" },
  { value: 3, label: "3 - 定期使用" },
  { value: 4, label: "4 - 經常使用" },
  { value: 5, label: "5 - 非常頻繁" },
];

const msfOptions = [
  { value: 1, label: "1 - 未導入" },
  { value: 2, label: "2 - 規劃中" },
  { value: 3, label: "3 - 試行階段" },
  { value: 4, label: "4 - 部分實施" },
  { value: 5, label: "5 - 全面實施" },
];

const qualityOptions = [
  { value: 1, label: "1 - 非常不具體" },
  { value: 2, label: "2 - 較不具體" },
  { value: 3, label: "3 - 普通" },
  { value: 4, label: "4 - 較具體" },
  { value: 5, label: "5 - 非常具體" },
];

export default function ToolsPage({ formData, updateFormData }: ToolsPageProps) {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        請評估貴職類在評量工具使用方面的執行狀況
      </p>

      {/* Mini-CEX */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          1. <TooltipTerm term="Mini-CEX" description="迷你臨床演練評量" /> 使用狀況{" "}
          <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">Mini-CEX (迷你臨床演練評量) 的使用頻率？</p>
        <RadioGroup
          value={formData.toolMinicex?.toString() || ""}
          onValueChange={(value) => updateFormData({ toolMinicex: parseInt(value) })}
        >
          {usageOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`minicex-${option.value}`} />
              <Label htmlFor={`minicex-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* DOPS */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          2. <TooltipTerm term="DOPS" description="直接觀察程序性技能" /> 使用狀況{" "}
          <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">DOPS (直接觀察程序技能) 的使用頻率？</p>
        <RadioGroup
          value={formData.toolDops?.toString() || ""}
          onValueChange={(value) => updateFormData({ toolDops: parseInt(value) })}
        >
          {usageOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`dops-${option.value}`} />
              <Label htmlFor={`dops-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* MSF */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          3. <TooltipTerm term="MSF" description="多來源回饋 (360 度評量)" /> /360 度回饋{" "}
          <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">多元來源回饋 (MSF) 的實施狀況？</p>
        <RadioGroup
          value={formData.toolMsf?.toString() || ""}
          onValueChange={(value) => updateFormData({ toolMsf: parseInt(value) })}
        >
          {msfOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`msf-${option.value}`} />
              <Label htmlFor={`msf-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Direct Observation Frequency */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          4. 每位學員每月平均被直接觀察次數 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">平均每位學員每月被直接觀察的次數？</p>
        <RadioGroup
          value={formData.toolObservationFrequency || ""}
          onValueChange={(value) => updateFormData({ toolObservationFrequency: value })}
        >
          {DIRECT_OBSERVATION_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`observation-${option.value}`} />
              <Label htmlFor={`observation-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Assessment Burden */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          5. 評量負擔感受 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">對於評量工作的負擔感受？</p>
        <RadioGroup
          value={formData.toolBurden?.toString() || ""}
          onValueChange={(value) => updateFormData({ toolBurden: parseInt(value) })}
        >
          {ASSESSMENT_BURDEN_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`burden-${option.value}`} />
              <Label htmlFor={`burden-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Calibration Frequency */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          6. 評量者校準機制 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">是否定期進行評量者校準工作坊？</p>
        <RadioGroup
          value={formData.toolCalibration || ""}
          onValueChange={(value) => updateFormData({ toolCalibration: value })}
        >
          {CALIBRATION_FREQUENCY_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`calibration-${option.value}`} />
              <Label htmlFor={`calibration-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Feedback Quality */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          7. 回饋品質 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">教師給予學員的回饋品質？</p>
        <RadioGroup
          value={formData.toolFeedbackQuality?.toString() || ""}
          onValueChange={(value) => updateFormData({ toolFeedbackQuality: parseInt(value) })}
        >
          {qualityOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`quality-${option.value}`} />
              <Label htmlFor={`quality-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Feedback Timing */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          8. 回饋及時性 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">評量後多久給予回饋？</p>
        <RadioGroup
          value={formData.toolFeedbackTiming || ""}
          onValueChange={(value) => updateFormData({ toolFeedbackTiming: value })}
        >
          {FEEDBACK_TIMING_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`timing-${option.value}`} />
              <Label htmlFor={`timing-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Other Tools */}
      <div className="space-y-3">
        <Label htmlFor="toolOtherTools" className="text-base font-medium">
          9. 其他評量工具
        </Label>
        <p className="text-sm text-muted-foreground">除上述工具外，是否有使用其他評量工具？</p>
        <Textarea
          id="toolOtherTools"
          value={formData.toolOtherTools || ""}
          onChange={(e) => updateFormData({ toolOtherTools: e.target.value })}
          placeholder="請填寫其他評量工具..."
          rows={3}
        />
      </div>

      {/* Tool Challenges */}
      <div className="space-y-3">
        <Label htmlFor="toolChallenges" className="text-base font-medium">
          10. 評量工具的挑戰
        </Label>
        <p className="text-sm text-muted-foreground">在評量工具使用上遇到的困難？</p>
        <Textarea
          id="toolChallenges"
          value={formData.toolChallenges || ""}
          onChange={(e) => updateFormData({ toolChallenges: e.target.value })}
          placeholder="請描述您在評量工具使用上遇到的困難..."
          rows={4}
        />
      </div>
    </div>
  );
}
