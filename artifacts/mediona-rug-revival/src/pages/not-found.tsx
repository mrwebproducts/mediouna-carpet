import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/lib/i18n";

export default function NotFound() {
  const { language } = useLanguage();
  const message = {
    ar: "الصفحة غير موجودة",
    fr: "Page introuvable",
    en: "Page not found",
  }[language];

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-primary">{message}</h1>
      </div>
    </Layout>
  );
}
