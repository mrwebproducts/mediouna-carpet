import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr" | "ar";

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.culture": "Culture",
    "nav.shop": "Shop",
    "nav.learn": "Learn",
    "hero.title": "Reviving Mediona Rug Heritage through Technology",
    "hero.subtitle": "Discover the rich history, intricate symbols, and master artisans behind authentic Mediona Moroccan rugs. Preserving our cultural legacy for the future.",
    "hero.discover": "Discover the Story",
    "hero.shop": "Shop Now",
    "hero.learn": "Learn",
    "footer.rights": "All rights reserved.",
    "footer.heritage": "Preserving Mediona Heritage",
    "shop.title": "The Artisan Marketplace",
    "shop.preorder": "Pre-order",
    "shop.discover": "Discover Story",
    "product.by": "By",
    "product.time": "Creation time",
    "product.symbols": "Symbols Explanation",
    "product.message": "By purchasing this rug, you help preserve cultural heritage and support artisans.",
    "product.order.title": "Pre-order this rug",
    "product.order.name": "Full Name",
    "product.order.phone": "Phone Number",
    "product.order.submit": "Submit Order",
    "product.order.success": "Thank you! We will contact you soon.",
    "learn.title": "Learn the Craft",
    "learn.quiz.title": "Knowledge Check",
    "culture.title": "The Mediona Story",
    "culture.related": "View Related Rug",
    "qr.title": "The Story of this Rug",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.culture": "Culture",
    "nav.shop": "Boutique",
    "nav.learn": "Apprendre",
    "hero.title": "Revitaliser l'héritage du tapis de Mediona grâce à la technologie",
    "hero.subtitle": "Découvrez la riche histoire, les symboles complexes et les maîtres artisans derrière les authentiques tapis marocains de Mediona. Préserver notre héritage culturel.",
    "hero.discover": "Découvrir l'histoire",
    "hero.shop": "Acheter",
    "hero.learn": "Apprendre",
    "footer.rights": "Tous droits réservés.",
    "footer.heritage": "Préservation de l'héritage de Mediona",
    "shop.title": "Le Marché Artisanal",
    "shop.preorder": "Précommander",
    "shop.discover": "Découvrir l'histoire",
    "product.by": "Par",
    "product.time": "Temps de création",
    "product.symbols": "Explication des symboles",
    "product.message": "En achetant ce tapis, vous aidez à préserver l'héritage culturel et à soutenir les artisans.",
    "product.order.title": "Précommander ce tapis",
    "product.order.name": "Nom complet",
    "product.order.phone": "Numéro de téléphone",
    "product.order.submit": "Soumettre la commande",
    "product.order.success": "Merci ! Nous vous contacterons bientôt.",
    "learn.title": "Apprendre le métier",
    "learn.quiz.title": "Vérification des connaissances",
    "culture.title": "L'histoire de Mediona",
    "culture.related": "Voir le tapis associé",
    "qr.title": "L'histoire de ce tapis",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.culture": "الثقافة",
    "nav.shop": "المتجر",
    "nav.learn": "تعلم",
    "hero.title": "إحياء تراث سجاد مديونة من خلال التكنولوجيا",
    "hero.subtitle": "اكتشف التاريخ الغني والرموز المعقدة والحرفيين المهرة وراء السجاد المغربي الأصيل من مديونة. الحفاظ على إرثنا الثقافي للمستقبل.",
    "hero.discover": "اكتشف القصة",
    "hero.shop": "تسوق الآن",
    "hero.learn": "تعلم",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.heritage": "الحفاظ على تراث مديونة",
    "shop.title": "سوق الحرفيين",
    "shop.preorder": "طلب مسبق",
    "shop.discover": "اكتشف القصة",
    "product.by": "بواسطة",
    "product.time": "وقت الإبداع",
    "product.symbols": "شرح الرموز",
    "product.message": "بشرائك لهذا السجاد، فإنك تساعد في الحفاظ على التراث الثقافي ودعم الحرفيين.",
    "product.order.title": "اطلب هذا السجاد مسبقاً",
    "product.order.name": "الاسم الكامل",
    "product.order.phone": "رقم الهاتف",
    "product.order.submit": "إرسال الطلب",
    "product.order.success": "شكرا لك! سنتصل بك قريباً.",
    "learn.title": "تعلم الحرفة",
    "learn.quiz.title": "اختبر معلوماتك",
    "culture.title": "قصة مديونة",
    "culture.related": "عرض السجاد ذي الصلة",
    "qr.title": "قصة هذا السجاد",
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={language === "ar" ? "font-sans" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
