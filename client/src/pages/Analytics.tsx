import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>資料分析</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            此問卷採用 Email 提交方式，問卷回覆以結構化格式寄送至管理者信箱。
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-medium text-amber-900 mb-2">📊 資料分析建議</h3>
            <ul className="text-sm text-amber-800 list-disc list-inside space-y-1">
              <li>Email 中包含完整的結構化問卷回覆</li>
              <li>可將資料複製到 Google Sheets 進行分析</li>
              <li>約 20 位填答者的規模，手動彙整即可</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
