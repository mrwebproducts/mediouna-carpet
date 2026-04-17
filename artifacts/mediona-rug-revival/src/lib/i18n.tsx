import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "ar" | "fr" | "en";

type Translations = Record<Language, Record<string, string>>;

const translations: Translations = {
  ar: {
    "brand": "إحياء سجاد مديونة",
    "nav.home": "الرئيسية",
    "nav.culture": "القصة",
    "nav.shop": "المتجر",
    "nav.learn": "تعلم",
    "language.label": "اللغة",
    "hero.kicker": "تراث مديونة حيّ بين أيدينا",
    "hero.title": "أنقذوا ذاكرة مديونة، سجادة بعد سجادة",
    "hero.subtitle": "من خيوط الصوف إلى رموز الأمهات والجدات، نربط الحرفة المغربية بالتكنولوجيا حتى يبقى التراث حياً، ويجد الحرفيون دخلاً كريماً، ويتعلم الشباب لغة النسيج من جديد.",
    "hero.discover": "اكتشف القصة",
    "hero.shop": "تسوق الآن",
    "hero.learn": "تعلم",
    "home.legacy.title": "ليست سجادة فقط، إنها ذاكرة عائلة ومدينة",
    "home.legacy.text": "كل عقدة تحمل دعاء، وكل لون يحكي موسم حصاد، وكل رمز يحفظ صوت امرأة صنعت الجمال بصبرها. عندما تختار سجادة مديونية، فأنت تساعد على حماية إرث ثقافي ودعم يدٍ ماهرة كي تستمر.",
    "home.culture": "ثقافة محفوظة",
    "home.artisan": "حرفيون مدعومون",
    "home.youth": "شباب يتعلمون",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.heritage": "نحافظ على تراث مديونة ونقرب قصصه من العالم",
    "culture.title": "قصة سجاد مديونة",
    "culture.subtitle": "كل سجادة وثيقة حية: تاريخ، صوف، رموز، وكرامة نساء حوّلن البيوت إلى متاحف صغيرة.",
    "culture.related": "عرض السجادة المرتبطة",
    "shop.title": "سوق الحرفيين",
    "shop.subtitle": "اقتناء سجادة مديونية ليس عملية شراء فقط؛ إنه وعد بأن تبقى الحرفة مصدر فخر ودخل ومعرفة للأجيال القادمة.",
    "shop.preorder": "طلب مسبق",
    "shop.discover": "اكتشف القصة",
    "product.by": "الحرفية",
    "product.story": "قصة السجادة",
    "product.videoTitle": "فيديو القصة والحرفة",
    "product.videoContext": "شاهد كيف تتحول اليد والصبر والذاكرة إلى قطعة ثقافية تحمل اسم مديونة.",
    "product.time": "مدة الإنجاز",
    "product.symbols": "شرح الرموز",
    "product.origin": "الأصل",
    "product.originValue": "مديونة، المغرب",
    "product.message": "بشرائك لهذه السجادة، أنت لا تشتري قطعة ديكور فقط؛ أنت تحافظ على إرث ثقافي وتدعم الحرفيين.",
    "product.order.title": "اطلب هذه السجادة مسبقاً",
    "product.order.name": "الاسم الكامل",
    "product.order.phone": "رقم الهاتف",
    "product.order.submit": "إرسال الطلب",
    "product.order.success": "شكراً لك! سنتصل بك قريباً.",
    "product.order.successNote": "سيتواصل معك فريقنا لتأكيد الطلب وتفاصيل التسليم.",
    "product.notFound": "لم يتم العثور على السجادة",
    "learn.title": "تعلم الحرفة",
    "learn.subtitle": "رحلة قصيرة من الأدوات الأولى إلى أول سجادة: تجربة تعليمية تجعل الشباب يكتشفون قيمة ما تركته الجدات.",
    "learn.videoTitle": "درس مصور: من الخيط إلى الذاكرة",
    "learn.videoCaption": "فيديو تعليمي مبسط عن أساسيات النسيج التقليدي.",
    "learn.quiz.title": "اختبار سريع",
    "learn.quiz.question": "ماذا يرمز شكل المعين غالباً في زخارف السجاد المغربي؟",
    "learn.quiz.answer1": "الماء والمطر فقط",
    "learn.quiz.answer2": "الحماية والأنوثة وصون البيت",
    "learn.quiz.answer3": "الجبال فقط",
    "learn.quiz.submit": "تحقق من الإجابة",
    "learn.quiz.success": "إجابة جميلة",
    "learn.quiz.successText": "أنت بدأت تفهم أن رموز مديونة ليست زينة فقط، بل لغة ثقافية كاملة.",
    "learn.level1": "المستوى 1: الأدوات",
    "learn.level1.desc": "تعرف على النول، المشط، المقص، والصوف الذي تبدأ منه الحكاية.",
    "learn.level2": "المستوى 2: البداية",
    "learn.level2.desc": "تعلم كيف تُشد الخيوط الأولى لتصبح أساساً قوياً للسجادة.",
    "learn.level3": "المستوى 3: الأنماط",
    "learn.level3.desc": "اقرأ المعين، الخط المتعرج، والحدود كما تقرأ كلمات في كتاب.",
    "learn.level4": "المستوى 4: التشطيب",
    "learn.level4.desc": "اكتشف كيف يكتمل العمل بالقص والغسل وترتيب الأطراف.",
    "learn.level5": "المستوى 5: أول سجادة",
    "learn.level5.desc": "حوّل ما تعلمته إلى قطعة صغيرة تحمل أول توقيع لك.",
    "qr.badge": "بطاقة تراث رقمية",
    "qr.title": "قصة هذه السجادة",
    "qr.completeStory": "القصة الكاملة",
    "qr.meaning": "المعنى الثقافي",
    "qr.note": "هذا السجل الرقمي يضمن ألا تضيع قصة السجادة ولا اليد التي نسجتها مع مرور الزمن.",
    "qr.notFound": "لم يتم العثور على القصة"
  },
  fr: {
    "brand": "Mediona Rug Revival",
    "nav.home": "Accueil",
    "nav.culture": "Histoire",
    "nav.shop": "Boutique",
    "nav.learn": "Apprendre",
    "language.label": "Langue",
    "hero.kicker": "Le patrimoine vivant de Mediona",
    "hero.title": "Sauver la mémoire de Mediona, tapis après tapis",
    "hero.subtitle": "Du fil de laine aux symboles transmis par les mères et les grands-mères, nous relions l'artisanat marocain à la technologie pour préserver la culture, soutenir les artisanes et inspirer les jeunes à apprendre le tissage.",
    "hero.discover": "Découvrir l'histoire",
    "hero.shop": "Acheter maintenant",
    "hero.learn": "Apprendre",
    "home.legacy.title": "Ce n'est pas seulement un tapis, c'est la mémoire d'une famille et d'une ville",
    "home.legacy.text": "Chaque nœud porte une prière, chaque couleur rappelle une saison, chaque symbole garde la voix d'une femme qui a créé la beauté avec patience. Choisir un tapis de Mediona, c'est protéger un héritage culturel et soutenir une main experte.",
    "home.culture": "Culture protégée",
    "home.artisan": "Artisanes soutenues",
    "home.youth": "Jeunes formés",
    "footer.rights": "Tous droits réservés.",
    "footer.heritage": "Préserver l'héritage de Mediona et partager ses histoires avec le monde",
    "culture.title": "L'histoire du tapis de Mediona",
    "culture.subtitle": "Chaque tapis est un document vivant : histoire, laine, symboles et dignité de femmes qui ont transformé leurs maisons en petits musées.",
    "culture.related": "Voir le tapis associé",
    "shop.title": "Le marché des artisanes",
    "shop.subtitle": "Acheter un tapis de Mediona n'est pas un simple achat ; c'est une promesse que le métier restera une source de fierté, de revenu et de savoir.",
    "shop.preorder": "Précommander",
    "shop.discover": "Découvrir l'histoire",
    "product.by": "Artisane",
    "product.story": "L'histoire du tapis",
    "product.videoTitle": "Vidéo de l'histoire et du métier",
    "product.videoContext": "Découvrez comment la main, la patience et la mémoire deviennent une pièce culturelle portant le nom de Mediona.",
    "product.time": "Temps de création",
    "product.symbols": "Explication des symboles",
    "product.origin": "Origine",
    "product.originValue": "Mediona, Maroc",
    "product.message": "En achetant ce tapis, vous n'achetez pas seulement une décoration ; vous préservez un héritage culturel et soutenez les artisanes.",
    "product.order.title": "Précommander ce tapis",
    "product.order.name": "Nom complet",
    "product.order.phone": "Numéro de téléphone",
    "product.order.submit": "Envoyer la demande",
    "product.order.success": "Merci ! Nous vous contacterons bientôt.",
    "product.order.successNote": "Notre équipe vous contactera pour confirmer la précommande et les détails de livraison.",
    "product.notFound": "Tapis introuvable",
    "learn.title": "Apprendre le métier",
    "learn.subtitle": "Un parcours court des premiers outils au premier tapis : une expérience qui aide les jeunes à ressentir la valeur transmise par les grands-mères.",
    "learn.videoTitle": "Leçon vidéo : du fil à la mémoire",
    "learn.videoCaption": "Une vidéo éducative simple sur les bases du tissage traditionnel.",
    "learn.quiz.title": "Quiz rapide",
    "learn.quiz.question": "Que représente souvent le losange dans les motifs du tapis marocain ?",
    "learn.quiz.answer1": "Seulement l'eau et la pluie",
    "learn.quiz.answer2": "La protection, la féminité et le foyer",
    "learn.quiz.answer3": "Seulement les montagnes",
    "learn.quiz.submit": "Vérifier la réponse",
    "learn.quiz.success": "Belle réponse",
    "learn.quiz.successText": "Vous commencez à comprendre que les symboles de Mediona ne sont pas de simples décorations, mais une langue culturelle.",
    "learn.level1": "Niveau 1 : Outils",
    "learn.level1.desc": "Découvrir le métier à tisser, le peigne, les ciseaux et la laine.",
    "learn.level2": "Niveau 2 : Commencer",
    "learn.level2.desc": "Apprendre à tendre les premiers fils pour créer une base solide.",
    "learn.level3": "Niveau 3 : Motifs",
    "learn.level3.desc": "Lire le losange, les zigzags et les bordures comme des mots.",
    "learn.level4": "Niveau 4 : Finition",
    "learn.level4.desc": "Comprendre la coupe, le lavage et les franges finales.",
    "learn.level5": "Niveau 5 : Premier tapis",
    "learn.level5.desc": "Transformer l'apprentissage en une petite pièce signée par vous.",
    "qr.badge": "Étiquette patrimoniale numérique",
    "qr.title": "L'histoire de ce tapis",
    "qr.completeStory": "L'histoire complète",
    "qr.meaning": "Signification culturelle",
    "qr.note": "Ce registre numérique garantit que l'histoire du tapis et les mains qui l'ont tissé ne disparaissent pas avec le temps.",
    "qr.notFound": "Histoire introuvable"
  },
  en: {
    "brand": "Mediona Rug Revival",
    "nav.home": "Home",
    "nav.culture": "Story",
    "nav.shop": "Shop",
    "nav.learn": "Learn",
    "language.label": "Language",
    "hero.kicker": "Mediona heritage, still alive",
    "hero.title": "Saving Mediona's memory, one rug at a time",
    "hero.subtitle": "From wool threads to symbols inherited from mothers and grandmothers, we connect Moroccan craft with technology so heritage stays alive, artisans earn with dignity, and young people learn the language of weaving again.",
    "hero.discover": "Discover the Story",
    "hero.shop": "Shop Now",
    "hero.learn": "Learn",
    "home.legacy.title": "This is not just a rug. It is the memory of a family and a city.",
    "home.legacy.text": "Every knot carries a prayer, every color remembers a season, and every symbol preserves the voice of a woman who turned patience into beauty. When you choose a Mediona rug, you help protect a cultural legacy and support the hands that keep it alive.",
    "home.culture": "Culture preserved",
    "home.artisan": "Artisans supported",
    "home.youth": "Youth learning",
    "footer.rights": "All rights reserved.",
    "footer.heritage": "Preserving Mediona heritage and sharing its stories with the world",
    "culture.title": "The Mediona Rug Story",
    "culture.subtitle": "Every rug is a living document: history, wool, symbols, and the dignity of women who turned homes into small museums.",
    "culture.related": "View Related Rug",
    "shop.title": "The Artisan Marketplace",
    "shop.subtitle": "Buying a Mediona rug is not just a purchase; it is a promise that the craft remains a source of pride, income, and knowledge for the next generation.",
    "shop.preorder": "Pre-order",
    "shop.discover": "Discover Story",
    "product.by": "Artisan",
    "product.story": "The Rug Story",
    "product.videoTitle": "Story and Craft Video",
    "product.videoContext": "See how hands, patience, and memory become a cultural piece carrying Mediona's name.",
    "product.time": "Creation time",
    "product.symbols": "Symbols Explanation",
    "product.origin": "Origin",
    "product.originValue": "Mediona, Morocco",
    "product.message": "By purchasing this rug, you are not just buying decor; you are preserving a cultural legacy and supporting artisans.",
    "product.order.title": "Pre-order this rug",
    "product.order.name": "Full Name",
    "product.order.phone": "Phone Number",
    "product.order.submit": "Submit Order",
    "product.order.success": "Thank you! We will contact you soon.",
    "product.order.successNote": "Our team will reach out to confirm your pre-order and delivery details.",
    "product.notFound": "Rug not found",
    "learn.title": "Learn the Craft",
    "learn.subtitle": "A short journey from the first tools to a first rug: an educational experience that helps young people feel the value grandmothers left behind.",
    "learn.videoTitle": "Video lesson: from thread to memory",
    "learn.videoCaption": "A simple educational video about traditional weaving fundamentals.",
    "learn.quiz.title": "Quick Quiz",
    "learn.quiz.question": "What does the diamond shape often represent in Moroccan rug patterns?",
    "learn.quiz.answer1": "Only water and rainfall",
    "learn.quiz.answer2": "Protection, femininity, and the home",
    "learn.quiz.answer3": "Only the mountains",
    "learn.quiz.submit": "Check Answer",
    "learn.quiz.success": "Beautiful answer",
    "learn.quiz.successText": "You are beginning to understand that Mediona symbols are not decoration only, but a complete cultural language.",
    "learn.level1": "Level 1: Tools",
    "learn.level1.desc": "Meet the loom, comb, scissors, and wool where the story begins.",
    "learn.level2": "Level 2: Starting",
    "learn.level2.desc": "Learn how the first threads are stretched into a strong foundation.",
    "learn.level3": "Level 3: Patterns",
    "learn.level3.desc": "Read diamonds, zigzags, and borders like words in a book.",
    "learn.level4": "Level 4: Finishing",
    "learn.level4.desc": "Discover trimming, washing, and arranging the final fringes.",
    "learn.level5": "Level 5: First Rug",
    "learn.level5.desc": "Turn what you learned into a small piece with your first signature.",
    "qr.badge": "Digital Heritage Tag",
    "qr.title": "The Story of this Rug",
    "qr.completeStory": "The Complete Story",
    "qr.meaning": "Cultural Meaning",
    "qr.note": "This digital record ensures that the story of this rug, and the hands that wove it, are never lost to time.",
    "qr.notFound": "Story not found"
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
  const [language, setLanguage] = useState<Language>("ar");
  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={language === "ar" ? "lang-ar" : "lang-latin"}>
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
