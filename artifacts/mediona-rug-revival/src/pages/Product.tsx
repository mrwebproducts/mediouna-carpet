import { Layout } from "@/components/layout/Layout";
import { rugs } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { useParams, useSearch } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const storyVideoUrl = "https://player.vimeo.com/video/1184530951?badge=0&autopause=0&player_id=0&app_id=58479";

export default function Product() {
  const { id } = useParams();
  const searchString = useSearch();
  const isOrderView = searchString.includes("order=true");
  const { t, language, dir } = useLanguage();
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const rug = rugs.find((r) => r.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isOrderView) {
      window.setTimeout(() => document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
    }
  }, [id, isOrderView]);

  if (!rug) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-bold text-primary">{t("product.notFound")}</h1>
        </div>
      </Layout>
    );
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16" dir={dir}>
            <div className="space-y-7">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-muted shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                <img src={rug.image} alt={rug.name[language]} className="h-full w-full object-cover" />
              </div>

              <div className="story-card rounded-3xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                <div className="mb-4 space-y-2">
                  <h2 className="text-2xl font-bold text-primary">{t("product.videoTitle")}</h2>
                  <p className="text-sm leading-7 text-muted-foreground">{t("product.videoContext")}</p>
                </div>
                <div className="video-frame">
                  <iframe
                    className="h-full w-full"
                    src={storyVideoUrl}
                    title={t("product.videoTitle")}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
              <div className="space-y-5">
                <h1 className="text-4xl font-extrabold leading-tight text-primary md:text-6xl">{rug.name[language]}</h1>
                <div className="flex flex-wrap items-center gap-3 text-lg">
                  <span className="text-muted-foreground">{t("product.by")}: <span className="font-bold text-foreground">{rug.artisan[language]}</span></span>
                  <span className="rounded-full bg-primary px-4 py-2 text-base font-bold text-primary-foreground">{rug.price} MAD</span>
                </div>
              </div>

              <div className="story-card rounded-3xl p-7 md:p-8 space-y-7">
                <section>
                  <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-primary">{t("product.story")}</h3>
                  <p className="text-lg leading-9 text-foreground">{rug.story[language]}</p>
                </section>

                <section>
                  <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-primary">{t("product.symbols")}</h3>
                  <p className="text-lg leading-9 text-foreground">{rug.symbols[language]}</p>
                </section>

                <div className="grid gap-4 border-y border-border py-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-1 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">{t("product.time")}</h3>
                    <p className="text-lg font-bold">{rug.timeToCreate[language]}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">{t("product.origin")}</h3>
                    <p className="text-lg font-bold">{t("product.originValue")}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/25 bg-primary/8 p-7 shadow-sm">
                <p className="text-center text-xl font-bold leading-9 text-primary">{t("product.message")}</p>
              </div>

              <div className="pt-2" id="order-section">
                {orderSubmitted ? (
                  <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center text-green-900 shadow-sm">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">✓</div>
                    <h3 className="text-2xl font-bold">{t("product.order.success")}</h3>
                    <p className="mt-3 leading-7">{t("product.order.successNote")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleOrderSubmit} className="story-card rounded-3xl p-7 md:p-8 space-y-6">
                    <h3 className="text-2xl font-bold text-primary">{t("product.order.title")}</h3>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("product.order.name")}</Label>
                        <Input id="name" required className="h-12 rounded-2xl bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("product.order.phone")}</Label>
                        <Input id="phone" type="tel" required className="h-12 rounded-2xl bg-background" />
                      </div>
                    </div>
                    <Button type="submit" className="h-14 w-full rounded-2xl bg-primary text-lg font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90">
                      {t("product.order.submit")}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
