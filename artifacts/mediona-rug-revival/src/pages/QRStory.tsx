import { Layout } from "@/components/layout/Layout";
import { rugs } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { useParams } from "wouter";

export default function QRStory() {
  const { id } = useParams();
  const { t } = useLanguage();

  const rug = rugs.find((r) => r.id === id);

  if (!rug) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-serif">Story not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-background min-h-screen py-12 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="inline-block px-4 py-1.5 mb-4 bg-primary text-primary-foreground text-xs font-sans uppercase tracking-widest rounded-sm">
              Digital Heritage Tag
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-4">{rug.name}</h1>
            <p className="text-lg font-sans text-muted-foreground">{t("product.by")} <span className="font-bold text-foreground">{rug.artisan}</span></p>
          </div>

          <div className="aspect-video lg:aspect-[21/9] w-full overflow-hidden rounded-sm bg-muted mb-12 shadow-xl animate-in fade-in zoom-in-95 duration-1000 delay-150 fill-mode-both relative">
            <img 
              src={rug.image} 
              alt={rug.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-white font-serif text-xl md:text-2xl italic max-w-2xl">
                "{rug.story.split('.')[0]}."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <div className="space-y-6">
              <div className="bg-card p-8 rounded-sm border border-border shadow-sm h-full">
                <h3 className="text-lg font-sans font-bold uppercase tracking-widest text-primary mb-4 border-b border-border pb-4">The Complete Story</h3>
                <p className="font-sans text-lg leading-relaxed text-foreground">{rug.story}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card p-8 rounded-sm border border-border shadow-sm h-full">
                <h3 className="text-lg font-sans font-bold uppercase tracking-widest text-primary mb-4 border-b border-border pb-4">{t("product.symbols")}</h3>
                <p className="font-sans text-lg leading-relaxed text-foreground">{rug.symbols}</p>
                
                <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="font-sans text-sm text-muted-foreground uppercase tracking-wider mb-1">Creation Time</p>
                    <p className="font-serif text-2xl text-foreground">{rug.timeToCreate}</p>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                     <span className="font-serif text-primary text-2xl font-bold">M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="font-serif text-muted-foreground italic text-lg max-w-2xl mx-auto">
              This digital record ensures that the story of this rug, and the hands that wove it, are never lost to time.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}