import { Layout } from "@/components/layout/Layout";
import { cultureSections } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Culture() {
  const { t, language, dir } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-24">
        <section className="bg-secondary px-4 py-20 text-center text-secondary-foreground md:py-28">
          <div className="container mx-auto max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000" dir={dir}>
            <h1 className="text-4xl font-extrabold text-accent md:text-6xl">{t("culture.title")}</h1>
            <p className="mx-auto max-w-3xl text-lg leading-9 text-secondary-foreground/80 md:text-xl">
              {t("culture.subtitle")}
            </p>
          </div>
        </section>

        <section className="container mx-auto mt-16 space-y-20 px-4 md:mt-24 md:space-y-28">
          {cultureSections.map((section, index) => (
            <article
              key={section.id}
              className={`grid items-center gap-10 md:grid-cols-2 ${index % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}
              dir={dir}
            >
              <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-700">
                <img
                  src={section.image}
                  alt={section.title[language]}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>

              <div className="story-card rounded-3xl p-7 md:p-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{section.title[language]}</h2>
                <div className="my-6 h-1.5 w-16 rounded-full bg-accent" />
                <p className="text-lg leading-9 text-muted-foreground">{section.content[language]}</p>
                <div className="pt-7">
                  <Link href={`/rug/${section.relatedRugId}`}>
                    <Button variant="outline" className="rounded-2xl border-primary px-6 text-primary transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                      {t("culture.related")}
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </Layout>
  );
}
