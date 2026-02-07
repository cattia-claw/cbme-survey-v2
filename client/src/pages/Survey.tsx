import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { toast } from "sonner";
import { SurveyFormData, SURVEY_PAGES, PAGE_TITLES, type SurveyPage } from "@shared/surveyTypes";

// Import page components
import WelcomePage from "@/components/survey/WelcomePage";
import BasicInfoPage from "@/components/survey/BasicInfoPage";
import EpaPage from "@/components/survey/EpaPage";
import ToolsPage from "@/components/survey/ToolsPage";
import CccPage from "@/components/survey/CccPage";
import EportPage from "@/components/survey/EportPage";
import TrainingPage from "@/components/survey/TrainingPage";
import LearnerPage from "@/components/survey/LearnerPage";
import OverallPage from "@/components/survey/OverallPage";

export default function Survey() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<SurveyFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPage = SURVEY_PAGES[currentPageIndex];
  const totalPages = SURVEY_PAGES.length;
  const progress = ((currentPageIndex + 1) / totalPages) * 100;

  useEffect(() => {
    const saved = localStorage.getItem("cbme-survey-draft");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<SurveyFormData>;
      setFormData(parsed);
    } catch (error) {
      console.warn("Failed to parse saved survey draft:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cbme-survey-draft", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data: Partial<SurveyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.campus || !formData.profession || !formData.respondentName || !formData.email) {
      toast.error("請填寫所有必填欄位");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result?.message || "提交失敗");
      }

      toast.success("問卷提交成功！", {
        description: "感謝您的寶貴意見，我們已收到您的回覆。",
      });
      localStorage.removeItem("cbme-survey-draft");
      setFormData({});
      setCurrentPageIndex(0);
    } catch (error) {
      toast.error("提交失敗", {
        description: error instanceof Error ? error.message : "請稍後再試或聯繫管理員。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPageContent = () => {
    const pageProps = {
      formData,
      updateFormData,
      onNext: goToNextPage,
    };

    switch (currentPage) {
      case "welcome":
        return <WelcomePage {...pageProps} />;
      case "basic-info":
        return <BasicInfoPage {...pageProps} />;
      case "epa":
        return <EpaPage {...pageProps} />;
      case "tools":
        return <ToolsPage {...pageProps} />;
      case "ccc":
        return <CccPage {...pageProps} />;
      case "eport":
        return <EportPage {...pageProps} />;
      case "training":
        return <TrainingPage {...pageProps} />;
      case "learner":
        return <LearnerPage {...pageProps} />;
      case "overall":
        return <OverallPage {...pageProps} />;
      default:
        return null;
    }
  };

  const isWelcomePage = currentPage === "welcome";
  const isLastPage = currentPageIndex === totalPages - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container max-w-4xl py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            CBME 執行狀況調查問卷
          </h1>
          <p className="text-muted-foreground">
            Competency-Based Medical Education Implementation Survey
          </p>
        </div>

        {/* Progress Bar */}
        {!isWelcomePage && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                第 {currentPageIndex} / {totalPages - 1} 頁
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(((currentPageIndex) / (totalPages - 1)) * 100)}% 完成
              </span>
            </div>
            <Progress value={((currentPageIndex) / (totalPages - 1)) * 100} className="h-2" />
          </div>
        )}

        {/* Main Content Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              {PAGE_TITLES[currentPage]}
            </CardTitle>
            {!isWelcomePage && (
              <CardDescription>
                請根據貴職類的實際狀況填寫以下問題
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {renderPageContent()}

            {/* Navigation Buttons */}
            {!isWelcomePage && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={goToPreviousPage}
                  disabled={currentPageIndex === 1 || isSubmitting}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  上一頁
                </Button>

                {isLastPage ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <>提交中...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        提交問卷
                      </>
                    )}
                  </Button>
                ) : (
                  <Button onClick={goToNextPage} disabled={isSubmitting}>
                    下一頁
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>本問卷填寫時間約 15-20 分鐘</p>
          <p className="mt-1">資料保密：僅供教學改善使用，不影響績效考核</p>
        </div>
      </div>
    </div>
  );
}
