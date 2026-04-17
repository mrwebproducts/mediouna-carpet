import { Layout } from "@/components/layout/Layout";
import { rugs } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const { t, language, dir } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700" dir={dir}>
            <h1 className="text-4xl font-extrabold text-primary md:text-6xl">{t("shop.title")}</h1>
            <p className="text-lg leading-9 text-muted-foreground">{t("shop.subtitle")}</p>
            <div className="mx-auto h-1.5 w-16 rounded-full bg-accent" />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rugs.map((rug, index) => (
              <article
                key={rug.id}
                className="group story-card flex flex-col overflow-hidden rounded-3xl animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 140}ms`, animationFillMode: "both" }}
                dir={dir}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={rug.image}
                    alt={rug.name[language]}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 start-4 rounded-full bg-background/90 px-4 py-2 text-sm font-bold text-primary shadow-lg">
                    {rug.price} MAD
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold text-foreground">{rug.name[language]}</h3>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">
                    {t("product.by")}: {rug.artisan[language]}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link href={`/rug/${rug.id}`}>
                      <Button variant="outline" className="h-12 w-full rounded-2xl border-primary text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground">
                        {t("shop.discover")}
                      </Button>
                    </Link>
                    <Link href={`/rug/${rug.id}?order=true`}>
                      <Button className="h-12 w-full rounded-2xl bg-primary text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90">
                        {t("shop.preorder")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
