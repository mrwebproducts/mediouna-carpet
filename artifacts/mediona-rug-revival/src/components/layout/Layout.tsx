import { Link } from "wouter";
import { useLanguage, type Language } from "@/lib/i18n";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

const languages: { code: Language; label: string }[] = [
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, language, setLanguage, dir } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languageSwitcher = (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 p-1 shadow-sm" aria-label={t("language.label")}>
      <Globe className="mx-2 h-4 w-4 text-primary" />
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
            language === item.code
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-xl font-bold shadow-lg transition-transform group-hover:scale-105">
              م
            </span>
            <span className="font-serif text-lg md:text-xl font-bold text-primary tracking-tight">
              {language === "ar" ? "سجاد مديونة" : t("brand")}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link href="/" className="hover:text-primary transition-colors">{t("nav.home")}</Link>
            <Link href="/culture" className="hover:text-primary transition-colors">{t("nav.culture")}</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">{t("nav.shop")}</Link>
            <Link href="/learn" className="hover:text-primary transition-colors">{t("nav.learn")}</Link>
          </nav>

          <div className="hidden md:block">{languageSwitcher}</div>

          <button
            type="button"
            aria-label="Menu"
            className="md:hidden rounded-full border border-border bg-card p-2.5 text-foreground shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/98 p-4 shadow-xl animate-in fade-in slide-in-from-top-3 duration-300">
            <nav className="flex flex-col gap-3 text-lg font-semibold text-start" dir={dir}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="rounded-2xl px-4 py-3 hover:bg-muted">{t("nav.home")}</Link>
              <Link href="/culture" onClick={() => setMobileMenuOpen(false)} className="rounded-2xl px-4 py-3 hover:bg-muted">{t("nav.culture")}</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="rounded-2xl px-4 py-3 hover:bg-muted">{t("nav.shop")}</Link>
              <Link href="/learn" onClick={() => setMobileMenuOpen(false)} className="rounded-2xl px-4 py-3 hover:bg-muted">{t("nav.learn")}</Link>
            </nav>
            <div className="mt-4 flex justify-center border-t border-border pt-4">{languageSwitcher}</div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t border-border bg-secondary py-12 text-secondary-foreground">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-serif text-accent">{t("brand")}</h2>
          <p className="mx-auto max-w-2xl text-sm text-secondary-foreground/75 leading-relaxed">
            {t("footer.heritage")}
          </p>
          <p className="text-xs text-secondary-foreground/50">
            © {new Date().getFullYear()} {t("brand")}. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}
