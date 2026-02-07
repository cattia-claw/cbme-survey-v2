import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { SurveyFormData } from "@shared/surveyTypes";
import TooltipTerm from "@/components/survey/TooltipTerm";
import {
  CCC_ESTABLISHMENT_OPTIONS,
  CCC_MEMBER_COUNT_OPTIONS,
  CCC_FREQUENCY_OPTIONS,
  CCC_PRESCRIPTION_OPTIONS,
  YES_NO_PLANNING_OPTIONS,
} from "@shared/surveyConstants";

interface CccPageProps {
  formData: Partial<SurveyFormData>;
  updateFormData: (data: Partial<SurveyFormData>) => void;
}

const clarityOptions = [
  { value: 1, label: "1 - 非常不明確" },
  { value: 2, label: "2 - 不明確" },
  { value: 3, label: "3 - 普通" },
  { value: 4, label: "4 - 明確" },
  { value: 5, label: "5 - 非常明確" },
];

export default function CccPage({ formData, updateFormData }: CccPageProps) {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        請評估貴職類在{" "}
        <TooltipTerm term="CCC" description="臨床能力委員會 (Clinical Competency Committee)" />{" "}
        運作方面的執行狀況
      </p>

      {/* CCC Establishment */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          1. <TooltipTerm term="CCC" description="臨床能力委員會 (Clinical Competency Committee)" />{" "}
          成立狀況 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">臨床能力委員會 (CCC) 是否已成立？</p>
        <RadioGroup
          value={formData.cccEstablishment || ""}
          onValueChange={(value) => updateFormData({ cccEstablishment: value })}
        >
          {CCC_ESTABLISHMENT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`ccc-est-${option.value}`} />
              <Label htmlFor={`ccc-est-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* CCC Member Count */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          2. 委員組成 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">CCC 委員人數？</p>
        <RadioGroup
          value={formData.cccMemberCount || ""}
          onValueChange={(value) => updateFormData({ cccMemberCount: value })}
        >
          {CCC_MEMBER_COUNT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`ccc-members-${option.value}`} />
              <Label htmlFor={`ccc-members-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* CCC Frequency */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          3. 會議頻率 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">CCC 會議召開頻率？</p>
        <RadioGroup
          value={formData.cccFrequency || ""}
          onValueChange={(value) => updateFormData({ cccFrequency: value })}
        >
          {CCC_FREQUENCY_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`ccc-freq-${option.value}`} />
              <Label htmlFor={`ccc-freq-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* CCC Clarity */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          4. 決策流程 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">CCC 的決策流程是否明確？</p>
        <RadioGroup
          value={formData.cccClarity?.toString() || ""}
          onValueChange={(value) => updateFormData({ cccClarity: parseInt(value) })}
        >
          {clarityOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`ccc-clarity-${option.value}`} />
              <Label htmlFor={`ccc-clarity-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* CCC Prescription */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          5. 學習處方使用 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">
          是否使用學習處方 (Learning Prescription) 協助落後學員？
        </p>
        <RadioGroup
          value={formData.cccPrescription || ""}
          onValueChange={(value) => updateFormData({ cccPrescription: value })}
        >
          {CCC_PRESCRIPTION_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`ccc-prescription-${option.value}`} />
              <Label htmlFor={`ccc-prescription-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* CCC Challenges */}
      <div className="space-y-3">
        <Label htmlFor="cccChallenges" className="text-base font-medium">
          6. CCC 運作的挑戰
        </Label>
        <p className="text-sm text-muted-foreground">CCC 運作遇到的主要問題？</p>
        <Textarea
          id="cccChallenges"
          value={formData.cccChallenges || ""}
          onChange={(e) => updateFormData({ cccChallenges: e.target.value })}
          placeholder="請描述 CCC 運作遇到的主要問題..."
          rows={4}
        />
      </div>

      {/* Case Record Standardization */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          7. 標準化個案討論記錄格式 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">
          是否有標準化的個案討論記錄格式？
        </p>
        <RadioGroup
          value={formData.cccCaseRecordStandard || ""}
          onValueChange={(value) => updateFormData({ cccCaseRecordStandard: value })}
        >
          {YES_NO_PLANNING_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`ccc-record-${option.value}`} />
              <Label htmlFor={`ccc-record-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Remediation Tracking */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          8. 補救教學追蹤機制 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">
          補救教學追蹤機制是否建立？
        </p>
        <RadioGroup
          value={formData.cccRemediationTracking || ""}
          onValueChange={(value) => updateFormData({ cccRemediationTracking: value })}
        >
          {YES_NO_PLANNING_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`ccc-remediation-${option.value}`} />
              <Label htmlFor={`ccc-remediation-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Other Challenges */}
      <div className="space-y-3">
        <Label htmlFor="cccChallengesOther" className="text-base font-medium">
          9. 其他挑戰
        </Label>
        <p className="text-sm text-muted-foreground">其他 CCC 運作上的挑戰？</p>
        <Textarea
          id="cccChallengesOther"
          value={formData.cccChallengesOther || ""}
          onChange={(e) => updateFormData({ cccChallengesOther: e.target.value })}
          placeholder="請填寫其他挑戰..."
          rows={3}
        />
      </div>
    </div>
  );
}
