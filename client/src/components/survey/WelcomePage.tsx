import { Button } from "@/components/ui/button";
import { FileText, Target, Users, TrendingUp } from "lucide-react";

interface WelcomePageProps {
  onNext: () => void;
}

export default function WelcomePage({ onNext }: WelcomePageProps) {
  return (
    <div className="space-y-6">
      <div className="prose prose-blue max-w-none">
        <p className="text-lg leading-relaxed">
          親愛的教學負責人，您好：
        </p>
        
        <p className="leading-relaxed">
          為了系統性了解本院各職類 <strong>CBME (勝任能力導向醫學教育)</strong> 的導入狀況，
          我們設計了這份問卷。您的寶貴意見將協助我們：
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
          <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">掌握各職類的實施進度</h3>
              <p className="text-sm text-muted-foreground">了解各專業領域的 CBME 推動現況</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">識別共同面臨的挑戰</h3>
              <p className="text-sm text-muted-foreground">發現導入過程中的障礙與需求</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">規劃後續支援與資源配置</h3>
              <p className="text-sm text-muted-foreground">為後續改善提供數據支持</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">促進跨職類經驗交流</h3>
              <p className="text-sm text-muted-foreground">建立跨職類經驗分享基礎</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg border my-6">
          <h3 className="text-base font-medium mb-2 text-foreground">問卷說明</h3>
          <ul className="space-y-1 text-sm text-muted-foreground mb-0">
            <li><strong>填寫時間：</strong>約 15-20 分鐘</li>
            <li><strong>資料保密：</strong>僅供教學改善使用，不影響績效考核</li>
            <li><strong>問卷結構：</strong>共 9 個部分，涵蓋 EPA 設計、評量工具、CCC 運作等面向</li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          點擊「開始填寫」即表示您同意參與本調查。
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={onNext} size="lg" className="min-w-[200px]">
          開始填寫
        </Button>
      </div>
    </div>
  );
}
