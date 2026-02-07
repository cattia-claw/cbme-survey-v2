import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>問卷管理</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            此問卷採用 Email 提交方式，所有回覆將直接寄送至管理者信箱。
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">📧 Email 接收設定</h3>
            <p className="text-sm text-blue-800">
              問卷回覆將寄送至：<code className="bg-blue-100 px-1 rounded">liyoungc@pm.me</code>
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>如需更改接收信箱，請修改環境變數 <code>EMAIL_TO</code>。</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
