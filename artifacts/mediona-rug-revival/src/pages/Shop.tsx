import { Layout } from "@/components/layout/Layout";
import { rugs } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const { t, dir } = useLanguage();

  return (
    <Layout>
      <div className="bg-background min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl md:text-5xl font-serif text-primary">{t("shop.title")}</h1>
            <p className="font-sans text-muted-foreground text-lg">
              Support Mediona artisans directly. Each pre-order helps sustain traditional weaving practices and empowers local communities.
            </p>
            <div className="w-12 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {rugs.map((rug, index) => (
              <div 
                key={rug.id} 
                className="group flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted relative">
                  <img 
                    src={rug.image} 
                    alt={rug.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-serif font-semibold">{rug.name}</h3>
                    <span className="font-sans text-primary font-medium">{rug.price} MAD</span>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground">
                    {t("product.by")} {rug.artisan}
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Link href={`/rug/${rug.id}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-none font-sans">
                      {t("shop.discover")}
                    </Button>
                  </Link>
                  <Link href={`/rug/${rug.id}?order=true`} className="flex-1">
                    <Button className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-sans">
                      {t("shop.preorder")}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}