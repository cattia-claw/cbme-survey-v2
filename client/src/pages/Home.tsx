import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { 
  ClipboardList, 
  BarChart3, 
  Users, 
  FileText, 
  Target,
  TrendingUp,
  Shield
} from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">CBME 執行狀況調查</h1>
                <p className="text-xs text-muted-foreground">Implementation Survey System</p>
              </div>
            </div>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {user?.name || user?.email}
                </span>
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    管理後台
                  </Button>
                </Link>
              </div>
            ) : (
              <a href={getLoginUrl()}>
                <Button variant="outline" size="sm">
                  管理員登入
                </Button>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            勝任能力導向醫學教育
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            CBME 執行狀況調查系統
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            系統性蒐集各職類 CBME 導入現況與挑戰，協助掌握全院推動進度，
            識別共同面臨的障礙，並為後續改善提供數據支持。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/survey">
              <Button size="lg" className="min-w-[200px]">
                <ClipboardList className="w-5 h-5 mr-2" />
                開始填寫問卷
              </Button>
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link href="/admin">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  查看統計報表
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">調查面向</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>EPA 設計與實施</CardTitle>
                <CardDescription>
                  評估可信賴專業活動的設計完成度、數量、信賴等級定義與教師理解程度
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>評量工具使用</CardTitle>
                <CardDescription>
                  調查 Mini-CEX、DOPS、MSF 等評量工具的使用頻率與回饋品質
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>CCC 運作</CardTitle>
                <CardDescription>
                  了解臨床能力委員會的成立狀況、會議頻率與決策流程明確度
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>e-Portfolio 系統</CardTitle>
                <CardDescription>
                  評估電子學習歷程系統的導入狀況、功能完整性與使用者滿意度
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>師資培訓</CardTitle>
                <CardDescription>
                  掌握 CBME 基礎培訓完成率、培訓內容與教師投入意願
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>學員參與反應</CardTitle>
                <CardDescription>
                  評估學員對 CBME 的理解程度、參與積極度與學習成效
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">適用職類</CardTitle>
              <CardDescription>本調查涵蓋十大醫事職類</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "護理師 (Registered Nurse)",
                  "放射師 (Radiologic Technologist)",
                  "檢驗師 (Medical Technologist)",
                  "藥師 (Pharmacist)",
                  "物理治療師 (Physical Therapist)",
                  "職能治療師 (Occupational Therapist)",
                  "呼吸治療師 (Respiratory Therapist)",
                  "營養師 (Dietitian)",
                  "語言治療師 (Speech-Language Pathologist)",
                  "臨床心理師 (Clinical Psychologist)",
                ].map((profession, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{profession}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">準備好開始了嗎？</h3>
          <p className="text-muted-foreground mb-8">
            問卷填寫時間約 15-20 分鐘，所有資料將嚴格保密，僅供教學改善使用。
          </p>
          <Link href="/survey">
            <Button size="lg" className="min-w-[250px]">
              立即開始填寫
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 CBME Implementation Survey System</p>
          <p className="mt-2">教學部 CBME 推動小組</p>
        </div>
      </footer>
    </div>
  );
}
