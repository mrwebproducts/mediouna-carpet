import { Layout } from "@/components/layout/Layout";
import { rugs } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { useParams } from "wouter";

const storyVideoUrl = "https://www.youtube-nocookie.com/embed/mfGZ5osj0k8?start=44&rel=0&modestbranding=1&playsinline=1";

export default function QRStory() {
  const { id } = useParams();
  const { t, language, dir } = useLanguage();

  const rug = rugs.find((r) => r.id === id);

  if (!rug) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-bold text-primary">{t("qr.notFound")}</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 md:py-20">
        <div className="container mx-auto max-w-5xl px-4" dir={dir}>
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="mb-5 inline-flex rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
              {t("qr.badge")}
            </span>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-primary md:text-6xl">{rug.name[language]}</h1>
            <p className="text-lg text-muted-foreground">
              {t("product.by")}: <span className="font-bold text-foreground">{rug.artisan[language]}</span>
            </p>
          </div>

          <section className="relative mb-10 overflow-hidden rounded-3xl bg-muted shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-150 fill-mode-both">
            <div className="aspect-video md:aspect-[21/9]">
              <img src={rug.image} alt={rug.name[language]} className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute bottom-0 start-0 p-6 md:p-9">
              <p className="max-w-3xl text-xl font-bold leading-9 text-white md:text-3xl">
                {t("qr.title")}
              </p>
            </div>
          </section>

          <section className="story-card mb-10 rounded-3xl p-5 md:p-7 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
            <div className="mb-4 space-y-2">
              <h2 className="text-2xl font-bold text-primary">{t("product.videoTitle")}</h2>
              <p className="leading-7 text-muted-foreground">{t("product.videoContext")}</p>
            </div>
            <div className="video-frame">
              <iframe
                className="h-full w-full"
                src={storyVideoUrl}
                title={t("product.videoTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          <div className="grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <section className="story-card rounded-3xl p-7 md:p-8">
              <h3 className="mb-5 border-b border-border pb-4 text-lg font-extrabold uppercase tracking-widest text-primary">{t("qr.completeStory")}</h3>
              <p className="text-lg leading-9 text-foreground">{rug.story[language]}</p>
            </section>

            <section className="story-card rounded-3xl p-7 md:p-8">
              <h3 className="mb-5 border-b border-border pb-4 text-lg font-extrabold uppercase tracking-widest text-primary">{t("qr.meaning")}</h3>
              <p className="text-lg leading-9 text-foreground">{rug.symbols[language]}</p>

              <div className="mt-8 grid gap-5 border-t border-border pt-8 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("product.time")}</p>
                  <p className="text-2xl font-bold text-foreground">{rug.timeToCreate[language]}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("product.origin")}</p>
                  <p className="text-2xl font-bold text-foreground">{t("product.originValue")}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-primary/20 bg-primary/8 p-7 text-center">
            <p className="text-lg font-bold leading-9 text-primary">{t("qr.note")}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
