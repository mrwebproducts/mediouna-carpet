import { Layout } from "@/components/layout/Layout";
import { cultureSections } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Culture() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="bg-background min-h-screen pb-24">
        {/* Header */}
        <div className="bg-secondary text-secondary-foreground py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-5xl font-serif text-primary">{t("culture.title")}</h1>
            <p className="font-sans text-lg text-secondary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Every Mediona rug is a living document—a testament to the resilience, creativity, and history of the women who weave them.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="container mx-auto px-4 mt-16 space-y-32">
          {cultureSections.map((section, index) => (
            <div 
              key={section.id} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
            >
              <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-1000"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-serif text-primary">{section.title}</h2>
                <div className="w-12 h-1 bg-accent"></div>
                <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
                <div className="pt-4">
                  <Link href={`/rug/${section.relatedRugId}`}>
                    <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans">
                      {t("culture.related")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}