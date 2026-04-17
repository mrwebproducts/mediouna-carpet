import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t, dir } = useLanguage();

  return (
    <Layout>
      <section className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/hero-bg.png"
            alt={t("hero.kicker")}
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.32),transparent_34rem)]" />
        </div>

        <div className="relative z-10 container mx-auto flex min-h-[calc(100vh-5rem)] items-center px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center text-white animate-in fade-in slide-in-from-bottom-8 duration-1000" dir={dir}>
            <div className="mx-auto mb-7 inline-flex rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 shadow-xl backdrop-blur-md">
              {t("hero.kicker")}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-white/86 md:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/culture" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 w-full rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-2xl sm:w-auto">
                  {t("hero.discover")}
                </Button>
              </Link>
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 w-full rounded-2xl border-white/70 bg-white/10 px-8 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black sm:w-auto">
                  {t("hero.shop")}
                </Button>
              </Link>
              <Link href="/learn" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 w-full rounded-2xl border border-accent/80 bg-accent px-8 text-base font-bold text-accent-foreground shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-accent/90 sm:w-auto">
                  {t("hero.learn")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-7 animate-in fade-in slide-in-from-bottom-6 duration-700" dir={dir}>
            <h2 className="text-3xl font-extrabold text-primary md:text-5xl">{t("home.legacy.title")}</h2>
            <p className="text-lg leading-9 text-muted-foreground md:text-xl">
              {t("home.legacy.text")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[t("home.culture"), t("home.artisan"), t("home.youth")].map((item, index) => (
              <div key={item} className="story-card rounded-3xl p-8 text-center animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: `${index * 120}ms`, animationFillMode: "both" }}>
                <div className="mx-auto mb-5 h-2 w-16 rounded-full bg-primary" />
                <h3 className="text-2xl font-bold text-foreground">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
