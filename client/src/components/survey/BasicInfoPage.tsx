import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurveyFormData } from "@shared/surveyTypes";
import { CAMPUS_OPTIONS, PROFESSIONS } from "@shared/surveyConstants";

interface BasicInfoPageProps {
  formData: Partial<SurveyFormData>;
  updateFormData: (data: Partial<SurveyFormData>) => void;
}

export default function BasicInfoPage({ formData, updateFormData }: BasicInfoPageProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Campus Selection */}
        <div className="space-y-2">
          <Label htmlFor="campus" className="text-base">
            院區 <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.campus || ""}
            onValueChange={(value) => updateFormData({ campus: value })}
          >
            <SelectTrigger id="campus">
              <SelectValue placeholder="請選擇院區" />
            </SelectTrigger>
            <SelectContent>
              {CAMPUS_OPTIONS.map((campus) => (
                <SelectItem key={campus.value} value={campus.value}>
                  {campus.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Profession Selection */}
        <div className="space-y-2">
          <Label htmlFor="profession" className="text-base">
            職類 <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.profession || ""}
            onValueChange={(value) => updateFormData({ profession: value })}
          >
            <SelectTrigger id="profession">
              <SelectValue placeholder="請選擇您的職類" />
            </SelectTrigger>
            <SelectContent>
              {PROFESSIONS.map((prof) => (
                <SelectItem key={prof.value} value={prof.value}>
                  {prof.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Respondent Name */}
        <div className="space-y-2">
          <Label htmlFor="respondentName" className="text-base">
            填答人姓名 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="respondentName"
            value={formData.respondentName || ""}
            onChange={(e) => updateFormData({ respondentName: e.target.value })}
            placeholder="請輸入您的姓名"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base">
            職稱 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="例：護理部教學督導、放射科主任"
          />
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor="department" className="text-base">
            負責單位 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="department"
            value={formData.department || ""}
            onChange={(e) => updateFormData({ department: e.target.value })}
            placeholder="例：護理部、放射科"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">
            聯絡 Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="your.email@example.com"
          />
          <p className="text-sm text-muted-foreground">
            用於接收結果與後續聯繫
          </p>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg border text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">填寫提示</p>
        <p>請確保提供的聯絡資訊正確，以便我們在需要時與您聯繫。所有資料將嚴格保密。</p>
      </div>
    </div>
  );
}
