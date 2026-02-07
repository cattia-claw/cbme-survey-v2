import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { SurveyFormData } from "@shared/surveyTypes";
import { CHALLENGE_OPTIONS } from "@shared/surveyConstants";
import { GripVertical } from "lucide-react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface OverallPageProps {
  formData: Partial<SurveyFormData>;
  updateFormData: (data: Partial<SurveyFormData>) => void;
}

const progressOptions = [
  { value: 1, label: "1 - 尚未開始（0-20%）" },
  { value: 2, label: "2 - 起步階段（21-40%）" },
  { value: 3, label: "3 - 發展階段（41-60%）" },
  { value: 4, label: "4 - 成熟階段（61-80%）" },
  { value: 5, label: "5 - 完善運作（81-100%）" },
];

export default function OverallPage({ formData, updateFormData }: OverallPageProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const defaultChallenges = useMemo(
    () => CHALLENGE_OPTIONS.map((option) => ({ id: option.value, label: option.label })),
    []
  );

  const getOrderedChallenges = (ranking?: string[]) => {
    const ordered: { id: string; label: string }[] = [];
    const map = new Map(defaultChallenges.map((item) => [item.id, item.label]));

    if (ranking && ranking.length > 0) {
      ranking.forEach((id) => {
        const label = map.get(id);
        if (label) ordered.push({ id, label });
      });
    }

    defaultChallenges.forEach((item) => {
      if (!ordered.find((existing) => existing.id === item.id)) {
        ordered.push(item);
      }
    });

    return ordered;
  };

  const [challengeItems, setChallengeItems] = useState(() =>
    getOrderedChallenges(formData.challengeRanking)
  );

  useEffect(() => {
    if (!formData.challengeRanking || formData.challengeRanking.length === 0) {
      updateFormData({ challengeRanking: defaultChallenges.map((item) => item.id) });
    }
  }, [defaultChallenges, formData.challengeRanking, updateFormData]);

  useEffect(() => {
    setChallengeItems(getOrderedChallenges(formData.challengeRanking));
  }, [formData.challengeRanking]);

  const handleDragEnd = (event: { active: { id: string | number }; over?: { id: string | number } | null }) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    setChallengeItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === overId);
      const newItems = arrayMove(items, oldIndex, newIndex);
      updateFormData({ challengeRanking: newItems.map((item) => item.id) });
      return newItems;
    });
  };

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        最後，請對貴職類 CBME 的整體執行狀況進行評估
      </p>

      {/* Overall Progress */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          1. 整體實施進度 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">貴職類 CBME 的整體實施進度？</p>
        <RadioGroup
          value={formData.overallProgress?.toString() || ""}
          onValueChange={(value) => updateFormData({ overallProgress: parseInt(value) })}
        >
          {progressOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`overall-progress-${option.value}`} />
              <Label htmlFor={`overall-progress-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Success Stories */}
      <div className="space-y-3">
        <Label htmlFor="successStories" className="text-base font-medium">
          2. 成功經驗分享
        </Label>
        <p className="text-sm text-muted-foreground">
          在 CBME 導入過程中，有哪些值得分享的成功經驗或亮點？
        </p>
        <Textarea
          id="successStories"
          value={formData.successStories || ""}
          onChange={(e) => updateFormData({ successStories: e.target.value })}
          placeholder="請分享您在 CBME 導入過程中的成功經驗..."
          rows={5}
        />
      </div>

      {/* Challenge Ranking */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          3. 挑戰排序（由最困難到較不困難）
        </Label>
        <p className="text-sm text-muted-foreground">
          請拖曳排序目前面臨的主要挑戰
        </p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={challengeItems} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {challengeItems.map((item, index) => (
                <SortableChallengeItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  index={index}
                  isOther={item.id === "other"}
                  otherValue={formData.challengeOtherText || ""}
                  onOtherChange={(value) => updateFormData({ challengeOtherText: value })}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <Label htmlFor="suggestions" className="text-base font-medium">
          4. 建議與期待
        </Label>
        <p className="text-sm text-muted-foreground">
          對於本院 CBME 推動，您有什麼建議或期待？
        </p>
        <Textarea
          id="suggestions"
          value={formData.suggestions || ""}
          onChange={(e) => updateFormData({ suggestions: e.target.value })}
          placeholder="請提供您對 CBME 推動的建議或期待..."
          rows={5}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium text-primary mb-2">感謝您的填寫！</h3>
        <p className="text-sm text-muted-foreground mb-4">
          您即將完成問卷。請確認所有必填欄位都已填寫完整，然後點擊「提交問卷」按鈕。
        </p>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• 提交後將無法修改，請仔細檢查</p>
          <p>• 您的回覆將協助我們改善 CBME 推動策略</p>
          <p>• 如有問題，歡迎透過 Email 與我們聯繫</p>
        </div>
      </div>
    </div>
  );
}

interface SortableChallengeItemProps {
  id: string;
  label: string;
  index: number;
  isOther: boolean;
  otherValue: string;
  onOtherChange: (value: string) => void;
}

function SortableChallengeItem({
  id,
  label,
  index,
  isOther,
  otherValue,
  onOtherChange,
}: SortableChallengeItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-white px-4 py-3 shadow-sm ${
        isDragging ? "ring-2 ring-primary/40" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-primary w-6 text-center">
          {index + 1}
        </span>
        <button
          type="button"
          className="flex items-center text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
          aria-label="拖曳排序"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <span className="flex-1 text-sm">{label}</span>
      </div>
      {isOther && (
        <div className="mt-3">
          <Textarea
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="請填寫其他挑戰..."
            rows={2}
          />
        </div>
      )}
    </div>
  );
}
