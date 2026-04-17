import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/hero-bg.png" 
            alt="Moroccan Mediona rug weaving" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center text-center text-white space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-4 py-1.5 mb-4 border border-white/30 text-white/90 text-sm font-sans uppercase tracking-widest backdrop-blur-sm">
            Mediona Heritage
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif max-w-4xl leading-tight">
            {t("hero.title")}
          </h1>
          
          <p className="text-lg md:text-xl font-sans max-w-2xl text-white/80 leading-relaxed">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link href="/culture">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-sans w-full sm:w-auto h-14 px-8 rounded-none border border-primary">
                {t("hero.discover")}
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="bg-transparent hover:bg-white hover:text-black text-white font-sans w-full sm:w-auto h-14 px-8 rounded-none border-white">
                {t("hero.shop")}
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="ghost" className="text-white hover:text-primary hover:bg-transparent font-sans w-full sm:w-auto h-14 px-8 rounded-none">
                {t("hero.learn")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Short teaser section */}
      <div className="bg-background py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h2 className="text-3xl font-serif text-foreground">A Legacy Woven in Time</h2>
          <p className="font-sans text-muted-foreground leading-relaxed">
            Every thread carries a story. Every pattern holds a meaning. Mediona rugs are not just floor coverings; they are historical records, artistic expressions, and the soul of the artisans who weave them.
          </p>
          <div className="w-12 h-1 bg-primary mx-auto mt-8"></div>
        </div>
      </div>
    </Layout>
  );
}