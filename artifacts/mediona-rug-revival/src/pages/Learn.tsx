import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 1, title: "Tools of the Trade", description: "Learn about the loom, the comb, and the scissors." },
  { id: 2, title: "Preparing the Wool", description: "Washing, carding, and spinning the raw sheep's wool." },
  { id: 3, title: "Starting the Loom", description: "Setting up the warp threads to create the foundation." },
  { id: 4, title: "Weaving Patterns", description: "Tying the knots and creating the intricate symbols." },
  { id: 5, title: "Finishing Touches", description: "Trimming the pile, tying the fringes, and washing the final piece." }
];

export default function Learn() {
  const { t } = useLanguage();
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      setQuizSubmitted(true);
    }
  };

  return (
    <Layout>
      <div className="bg-background min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl md:text-5xl font-serif text-primary">{t("learn.title")}</h1>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow the journey of a Mediona rug from raw wool to a finished masterpiece.
            </p>
            <div className="w-12 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Steps Timeline */}
            <div className="lg:col-span-1 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent hidden lg:block">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 font-serif font-bold">
                    {step.id}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-sm border border-border bg-card shadow-sm">
                    <h3 className="font-serif font-bold text-lg mb-1 text-primary">{step.title}</h3>
                    <p className="font-sans text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Steps (Simple List) */}
            <div className="lg:hidden space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="flex gap-4 items-start p-4 rounded-sm border border-border bg-card shadow-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-serif font-bold shrink-0">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-1 text-primary">{step.title}</h3>
                    <p className="font-sans text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 space-y-12">
              {/* Educational Video */}
              <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-150 fill-mode-both">
                <h2 className="text-2xl font-serif text-secondary">The Master Weaver's Process</h2>
                <div className="aspect-video bg-secondary rounded-sm flex items-center justify-center flex-col text-secondary-foreground shadow-lg border-4 border-white">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                  <span className="font-sans text-sm">Play Masterclass</span>
                </div>
              </div>

              {/* Quiz */}
              <div className="bg-primary/5 p-8 rounded-sm border border-primary/20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <h2 className="text-2xl font-serif text-primary mb-6">{t("learn.quiz.title")}</h2>
                
                {quizSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-2">Excellent!</h3>
                    <p className="font-sans text-muted-foreground">You are on your way to understanding Mediona rug craftsmanship.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="font-sans text-lg font-medium text-foreground">What does the diamond shape commonly represent in Mediona rug patterns?</p>
                    
                    <div className="space-y-3">
                      {[
                        "Water and rainfall",
                        "A woman or protection from the evil eye",
                        "The Atlas Mountains"
                      ].map((answer, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAnswer(index)}
                          className={`w-full text-left p-4 rounded-none border ${selectedAnswer === index ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:bg-muted'} font-sans transition-colors`}
                        >
                          {answer}
                        </button>
                      ))}
                    </div>

                    <Button 
                      onClick={handleQuizSubmit} 
                      disabled={selectedAnswer === null}
                      className="w-full rounded-none h-12 bg-primary text-primary-foreground font-sans mt-4"
                    >
                      Check Answer
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}