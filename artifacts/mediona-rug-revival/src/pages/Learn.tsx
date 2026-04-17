import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const educationVideoUrl = "https://www.youtube-nocookie.com/embed/rsoj6vzlPpk?rel=0&modestbranding=1&playsinline=1";

export default function Learn() {
  const { t, dir } = useLanguage();
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const steps = [1, 2, 3, 4, 5].map((step) => ({
    id: step,
    title: t(`learn.level${step}`),
    description: t(`learn.level${step}.desc`),
  }));

  const answers = [
    t("learn.quiz.answer1"),
    t("learn.quiz.answer2"),
    t("learn.quiz.answer3"),
  ];

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      setQuizSubmitted(true);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4" dir={dir}>
          <div className="mx-auto mb-14 max-w-4xl text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl font-extrabold text-primary md:text-6xl">{t("learn.title")}</h1>
            <p className="mx-auto max-w-3xl text-lg leading-9 text-muted-foreground">{t("learn.subtitle")}</p>
            <div className="mx-auto h-1.5 w-16 rounded-full bg-accent" />
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.45fr]">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <article
                  key={step.id}
                  className="story-card rounded-3xl p-5 animate-in fade-in slide-in-from-bottom-6 duration-700"
                  style={{ animationDelay: `${index * 110}ms`, animationFillMode: "both" }}
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground shadow-md">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                      <p className="mt-2 leading-7 text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-10">
              <section className="story-card rounded-3xl p-5 md:p-7 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                <div className="mb-5 space-y-2">
                  <h2 className="text-2xl font-bold text-primary md:text-3xl">{t("learn.videoTitle")}</h2>
                  <p className="leading-7 text-muted-foreground">{t("learn.videoCaption")}</p>
                </div>
                <div className="video-frame">
                  <iframe
                    className="h-full w-full"
                    src={educationVideoUrl}
                    title={t("learn.videoTitle")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>

              <section className="rounded-3xl border border-primary/20 bg-primary/8 p-7 md:p-9 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <h2 className="mb-6 text-2xl font-bold text-primary">{t("learn.quiz.title")}</h2>

                {quizSubmitted ? (
                  <div className="rounded-3xl bg-card p-8 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">✓</div>
                    <h3 className="mb-2 text-2xl font-bold text-primary">{t("learn.quiz.success")}</h3>
                    <p className="leading-8 text-muted-foreground">{t("learn.quiz.successText")}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-lg font-bold leading-8 text-foreground">{t("learn.quiz.question")}</p>

                    <div className="space-y-3">
                      {answers.map((answer, index) => (
                        <button
                          key={answer}
                          type="button"
                          onClick={() => setSelectedAnswer(index)}
                          className={`w-full rounded-2xl border p-4 text-start leading-7 transition-all duration-300 ${
                            selectedAnswer === index
                              ? "border-primary bg-primary/10 text-primary shadow-md"
                              : "border-border bg-background hover:-translate-y-0.5 hover:bg-muted"
                          }`}
                        >
                          {answer}
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={handleQuizSubmit}
                      disabled={selectedAnswer === null}
                      className="h-13 w-full rounded-2xl bg-primary text-base font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 disabled:opacity-50"
                    >
                      {t("learn.quiz.submit")}
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
