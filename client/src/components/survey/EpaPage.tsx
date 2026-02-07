import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SurveyFormData } from "@shared/surveyTypes";
import TooltipTerm from "@/components/survey/TooltipTerm";
import {
  LIKERT_SCALE_OPTIONS,
  EPA_COUNT_OPTIONS,
  EPA_SUPPORT_OPTIONS,
  EPA_REVISION_CYCLE_OPTIONS,
} from "@shared/surveyConstants";

interface EpaPageProps {
  formData: Partial<SurveyFormData>;
  updateFormData: (data: Partial<SurveyFormData>) => void;
}

export default function EpaPage({ formData, updateFormData }: EpaPageProps) {
  const handleCheckboxChange = (field: 'epaSupport', value: string, checked: boolean) => {
    const currentValues = formData[field] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    updateFormData({ [field]: newValues });
  };

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        請評估貴職類在{" "}
        <TooltipTerm term="EPA" description="可信賴專業活動 (Entrustable Professional Activities)" />{" "}
        方面的執行狀況
      </p>

      {/* EPA Design Completion */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          1. <TooltipTerm term="EPA" description="可信賴專業活動 (Entrustable Professional Activities)" />{" "}
          設計完成度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">貴職類的 EPA 已完成設計的程度？</p>
        <RadioGroup
          value={formData.epaDesignCompletion?.toString() || ""}
          onValueChange={(value) => updateFormData({ epaDesignCompletion: parseInt(value) })}
        >
          {LIKERT_SCALE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`epa-design-${option.value}`} />
              <Label htmlFor={`epa-design-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* EPA Count */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          2. <TooltipTerm term="EPA" description="可信賴專業活動 (Entrustable Professional Activities)" />{" "}
          數量 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">目前已設計的 EPA 數量？</p>
        <RadioGroup
          value={formData.epaCount || ""}
          onValueChange={(value) => updateFormData({ epaCount: value })}
        >
          {EPA_COUNT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`epa-count-${option.value}`} />
              <Label htmlFor={`epa-count-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Entrustment Level */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          3. 信賴等級定義 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">
          EPA 的信賴等級 (Entrustment Level 1-5) 是否已明確定義？
        </p>
        <RadioGroup
          value={formData.epaEntrustmentLevel?.toString() || ""}
          onValueChange={(value) => updateFormData({ epaEntrustmentLevel: parseInt(value) })}
        >
          {[
            { value: 1, label: "1 - 完全沒有" },
            { value: 2, label: "2 - 有初步概念" },
            { value: 3, label: "3 - 部分 EPA 已定義" },
            { value: 4, label: "4 - 大部分已定義" },
            { value: 5, label: "5 - 全部明確定義" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`epa-entrustment-${option.value}`} />
              <Label htmlFor={`epa-entrustment-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Milestone Description */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          4. 里程碑行為描述 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">各信賴等級的行為指標是否具體可觀察？</p>
        <RadioGroup
          value={formData.epaMilestoneDescription?.toString() || ""}
          onValueChange={(value) => updateFormData({ epaMilestoneDescription: parseInt(value) })}
        >
          {[
            { value: 1, label: "1 - 非常模糊" },
            { value: 2, label: "2 - 較模糊" },
            { value: 3, label: "3 - 普通" },
            { value: 4, label: "4 - 較具體" },
            { value: 5, label: "5 - 非常具體" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`epa-milestone-${option.value}`} />
              <Label htmlFor={`epa-milestone-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Teacher Understanding */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          5. 教師理解程度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">臨床教師對 EPA 概念的理解程度？</p>
        <RadioGroup
          value={formData.epaTeacherUnderstanding?.toString() || ""}
          onValueChange={(value) => updateFormData({ epaTeacherUnderstanding: parseInt(value) })}
        >
          {[
            { value: 1, label: "1 - 完全不了解" },
            { value: 2, label: "2 - 略有了解" },
            { value: 3, label: "3 - 基本了解" },
            { value: 4, label: "4 - 相當了解" },
            { value: 5, label: "5 - 非常了解" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`epa-understanding-${option.value}`} />
              <Label htmlFor={`epa-understanding-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* EPA Verification */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          6. <TooltipTerm term="EPA" description="可信賴專業活動 (Entrustable Professional Activities)" />{" "}
          驗證/審核流程建立 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">
          是否已建立 EPA 驗證/審核流程？
        </p>
        <RadioGroup
          value={formData.epaVerificationProcess?.toString() || ""}
          onValueChange={(value) => updateFormData({ epaVerificationProcess: parseInt(value) })}
        >
          {LIKERT_SCALE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`epa-verify-${option.value}`} />
              <Label htmlFor={`epa-verify-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* EPA Revision Cycle */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          7. EPA 修訂週期 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">EPA 是否定期檢討與修訂？</p>
        <RadioGroup
          value={formData.epaRevisionCycle || ""}
          onValueChange={(value) => updateFormData({ epaRevisionCycle: value })}
        >
          {EPA_REVISION_CYCLE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`epa-revision-${option.value}`} />
              <Label htmlFor={`epa-revision-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* EPA Challenges */}
      <div className="space-y-3">
        <Label htmlFor="epaChallenges" className="text-base font-medium">
          8. EPA 設計的主要挑戰
        </Label>
        <p className="text-sm text-muted-foreground">在 EPA 設計過程中遇到的主要困難？</p>
        <Textarea
          id="epaChallenges"
          value={formData.epaChallenges || ""}
          onChange={(e) => updateFormData({ epaChallenges: e.target.value })}
          placeholder="請描述您在 EPA 設計過程中遇到的主要困難..."
          rows={4}
        />
      </div>

      {/* EPA Support Needed */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          9. 需要的協助
        </Label>
        <p className="text-sm text-muted-foreground">在 EPA 方面需要什麼支援？（可複選）</p>
        <div className="space-y-2">
          {EPA_SUPPORT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`epa-support-${option.value}`}
                checked={formData.epaSupport?.includes(option.value) || false}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('epaSupport', option.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`epa-support-${option.value}`}
                className="font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {formData.epaSupport?.includes("other") && (
          <div className="pl-6">
            <Textarea
              id="epaSupportOther"
              value={formData.epaSupportOther || ""}
              onChange={(e) => updateFormData({ epaSupportOther: e.target.value })}
              placeholder="請填寫其他需要的支援..."
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  );
}
