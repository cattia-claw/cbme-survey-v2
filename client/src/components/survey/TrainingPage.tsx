import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SurveyFormData } from "@shared/surveyTypes";
import {
  TRAINING_COMPLETION_OPTIONS,
  TRAINING_TOPICS_OPTIONS,
  TRAINING_METHODS_OPTIONS,
  TRAINING_SUPPORT_OPTIONS,
  YES_NO_PLANNING_OPTIONS,
} from "@shared/surveyConstants";

interface TrainingPageProps {
  formData: Partial<SurveyFormData>;
  updateFormData: (data: Partial<SurveyFormData>) => void;
}

const engagementOptions = [
  { value: 1, label: "1 - 非常低" },
  { value: 2, label: "2 - 偏低" },
  { value: 3, label: "3 - 普通" },
  { value: 4, label: "4 - 偏高" },
  { value: 5, label: "5 - 非常高" },
];

export default function TrainingPage({ formData, updateFormData }: TrainingPageProps) {
  const handleTopicsChange = (value: string, checked: boolean) => {
    const currentValues = formData.trainingTopics || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    updateFormData({ trainingTopics: newValues });
  };

  const handleMethodsChange = (value: string, checked: boolean) => {
    const currentValues = formData.trainingMethods || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    updateFormData({ trainingMethods: newValues });
  };

  const handleSupportChange = (value: string, checked: boolean) => {
    const currentValues = formData.trainingSupportMechanism || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    updateFormData({ trainingSupportMechanism: newValues });
  };

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        請評估貴職類在師資培訓方面的執行狀況
      </p>

      {/* Training Completion */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          1. 基礎培訓完成率 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">臨床教師完成 CBME 基礎培訓的比例？</p>
        <RadioGroup
          value={formData.trainingCompletion || ""}
          onValueChange={(value) => updateFormData({ trainingCompletion: value })}
        >
          {TRAINING_COMPLETION_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`training-comp-${option.value}`} />
              <Label htmlFor={`training-comp-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Training Topics */}
      <div className="space-y-3">
        <Label className="text-base font-medium">2. 培訓內容</Label>
        <p className="text-sm text-muted-foreground">已完成的培訓主題？（可複選）</p>
        <div className="space-y-2">
          {TRAINING_TOPICS_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`training-topic-${option.value}`}
                checked={formData.trainingTopics?.includes(option.value) || false}
                onCheckedChange={(checked) =>
                  handleTopicsChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`training-topic-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Training Methods */}
      <div className="space-y-3">
        <Label className="text-base font-medium">3. 培訓方式</Label>
        <p className="text-sm text-muted-foreground">主要採用的培訓方式？（可複選）</p>
        <div className="space-y-2">
          {TRAINING_METHODS_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`training-method-${option.value}`}
                checked={formData.trainingMethods?.includes(option.value) || false}
                onCheckedChange={(checked) =>
                  handleMethodsChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`training-method-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {formData.trainingMethods?.includes("other") && (
          <div className="pl-6">
            <Textarea
              id="trainingMethodsOther"
              value={formData.trainingMethodsOther || ""}
              onChange={(e) => updateFormData({ trainingMethodsOther: e.target.value })}
              placeholder="請填寫其他培訓方式..."
              rows={3}
            />
          </div>
        )}
      </div>

      {/* Training Engagement */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          4. 教師投入度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">教師對 CBME 的投入意願？</p>
        <RadioGroup
          value={formData.trainingEngagement?.toString() || ""}
          onValueChange={(value) => updateFormData({ trainingEngagement: parseInt(value) })}
        >
          {engagementOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`training-eng-${option.value}`} />
              <Label htmlFor={`training-eng-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Seed Teacher */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          5. 種子教師培訓機制 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">是否有「種子教師」培訓機制？</p>
        <RadioGroup
          value={formData.trainingSeedTeacher || ""}
          onValueChange={(value) => updateFormData({ trainingSeedTeacher: value })}
        >
          {YES_NO_PLANNING_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`training-seed-${option.value}`} />
              <Label htmlFor={`training-seed-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Training Support */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          6. 師資持續支持機制
        </Label>
        <p className="text-sm text-muted-foreground">是否有持續支持師資的機制？（可複選）</p>
        <div className="space-y-2">
          {TRAINING_SUPPORT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`training-support-${option.value}`}
                checked={formData.trainingSupportMechanism?.includes(option.value) || false}
                onCheckedChange={(checked) =>
                  handleSupportChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`training-support-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {formData.trainingSupportMechanism?.includes("other") && (
          <div className="pl-6">
            <Textarea
              id="trainingSupportMechanismOther"
              value={formData.trainingSupportMechanismOther || ""}
              onChange={(e) => updateFormData({ trainingSupportMechanismOther: e.target.value })}
              placeholder="請填寫其他支持方式..."
              rows={3}
            />
          </div>
        )}
      </div>

      {/* Training Needs */}
      <div className="space-y-3">
        <Label htmlFor="trainingNeeds" className="text-base font-medium">
          7. 培訓需求
        </Label>
        <p className="text-sm text-muted-foreground">師資培訓方面最需要的協助？</p>
        <Textarea
          id="trainingNeeds"
          value={formData.trainingNeeds || ""}
          onChange={(e) => updateFormData({ trainingNeeds: e.target.value })}
          placeholder="請描述師資培訓方面最需要的協助..."
          rows={4}
        />
      </div>
    </div>
  );
}
