import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SurveyFormData } from "@shared/surveyTypes";
import {
  EPORT_IMPLEMENTATION_OPTIONS,
  EPORT_TYPE_OPTIONS,
  EPORT_MOBILE_OPTIONS,
} from "@shared/surveyConstants";

interface EportPageProps {
  formData: Partial<SurveyFormData>;
  updateFormData: (data: Partial<SurveyFormData>) => void;
}

const satisfactionOptions = [
  { value: 1, label: "1 - 非常不滿足/不滿意" },
  { value: 2, label: "2 - 不滿足/不滿意" },
  { value: 3, label: "3 - 普通" },
  { value: 4, label: "4 - 滿足/滿意" },
  { value: 5, label: "5 - 非常滿足/滿意" },
];

export default function EportPage({ formData, updateFormData }: EportPageProps) {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = formData.eportType || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    updateFormData({ eportType: newValues });
  };

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        請評估貴職類在 e-Portfolio (電子學習歷程) 系統方面的執行狀況
      </p>

      {/* ePort Implementation */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          1. 系統導入狀況 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">是否已導入數位化 e-Portfolio 系統？</p>
        <RadioGroup
          value={formData.eportImplementation || ""}
          onValueChange={(value) => updateFormData({ eportImplementation: value })}
        >
          {EPORT_IMPLEMENTATION_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`eport-impl-${option.value}`} />
              <Label htmlFor={`eport-impl-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ePort Type */}
      <div className="space-y-3">
        <Label className="text-base font-medium">2. 系統類型</Label>
        <p className="text-sm text-muted-foreground">使用的系統類型？（可複選）</p>
        <div className="space-y-2">
          {EPORT_TYPE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`eport-type-${option.value}`}
                checked={formData.eportType?.includes(option.value) || false}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`eport-type-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {formData.eportType?.includes("other") && (
          <div className="pl-6">
            <Textarea
              id="eportTypeOther"
              value={formData.eportTypeOther || ""}
              onChange={(e) => updateFormData({ eportTypeOther: e.target.value })}
              placeholder="請填寫其他系統類型..."
              rows={3}
            />
          </div>
        )}
      </div>

      {/* ePort Functionality */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          3. 功能完整性 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">系統功能是否滿足需求？</p>
        <RadioGroup
          value={formData.eportFunctionality?.toString() || ""}
          onValueChange={(value) => updateFormData({ eportFunctionality: parseInt(value) })}
        >
          {satisfactionOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`eport-func-${option.value}`} />
              <Label htmlFor={`eport-func-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ePort Satisfaction */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          4. 使用者滿意度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">教師與學員對系統的滿意度？</p>
        <RadioGroup
          value={formData.eportSatisfaction?.toString() || ""}
          onValueChange={(value) => updateFormData({ eportSatisfaction: parseInt(value) })}
        >
          {satisfactionOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`eport-sat-${option.value}`} />
              <Label htmlFor={`eport-sat-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ePort Analytics Usage */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          5. 數據分析/儀表板功能使用程度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">是否使用系統的數據分析或儀表板功能？</p>
        <RadioGroup
          value={formData.eportAnalyticsUsage?.toString() || ""}
          onValueChange={(value) => updateFormData({ eportAnalyticsUsage: parseInt(value) })}
        >
          {satisfactionOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`eport-analytics-${option.value}`} />
              <Label htmlFor={`eport-analytics-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ePort Mobile */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          6. 行動裝置支援 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">系統是否支援手機/平板操作？</p>
        <RadioGroup
          value={formData.eportMobile || ""}
          onValueChange={(value) => updateFormData({ eportMobile: value })}
        >
          {EPORT_MOBILE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`eport-mobile-${option.value}`} />
              <Label htmlFor={`eport-mobile-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ePort Suggestions */}
      <div className="space-y-3">
        <Label htmlFor="eportSuggestions" className="text-base font-medium">
          7. 系統改善建議
        </Label>
        <p className="text-sm text-muted-foreground">對 e-Portfolio 系統的建議？</p>
        <Textarea
          id="eportSuggestions"
          value={formData.eportSuggestions || ""}
          onChange={(e) => updateFormData({ eportSuggestions: e.target.value })}
          placeholder="請提供對 e-Portfolio 系統的改善建議..."
          rows={4}
        />
      </div>
    </div>
  );
}
