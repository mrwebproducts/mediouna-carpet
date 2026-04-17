import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col font-serif bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-xl text-primary tracking-tight">
            Mediona Revival
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">{t("nav.home")}</Link>
            <Link href="/culture" className="hover:text-primary transition-colors">{t("nav.culture")}</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">{t("nav.shop")}</Link>
            <Link href="/learn" className="hover:text-primary transition-colors">{t("nav.learn")}</Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "fr" | "ar")}
              className="bg-transparent text-sm border-none outline-none font-sans cursor-pointer"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-4 font-sans shadow-lg">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">{t("nav.home")}</Link>
            <Link href="/culture" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">{t("nav.culture")}</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">{t("nav.shop")}</Link>
            <Link href="/learn" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">{t("nav.learn")}</Link>
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <select 
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value as "en" | "fr" | "ar");
                  setMobileMenuOpen(false);
                }}
                className="bg-transparent text-base border-none outline-none font-sans"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t border-border py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-serif text-primary">Mediona Revival</h2>
          <p className="font-sans text-sm text-secondary-foreground/70">
            {t("footer.heritage")}
          </p>
          <p className="font-sans text-xs text-secondary-foreground/50">
            &copy; {new Date().getFullYear()} Mediona Rug Revival. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}