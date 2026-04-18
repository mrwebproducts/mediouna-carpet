import type { Language } from "./i18n";
import heroBg from "@/assets/hero-bg.png";
import rug1 from "@/assets/rug-1.png";
import rug2 from "@/assets/rug-2.png";
import rug3 from "@/assets/rug-3.png";

export type LocalizedText = Record<Language, string>;

export type Rug = {
  id: string;
  name: LocalizedText;
  artisan: LocalizedText;
  price: number;
  image: string;
  story: LocalizedText;
  symbols: LocalizedText;
  timeToCreate: LocalizedText;
};

export const rugs: Rug[] = [
  {
    id: "1",
    name: {
      ar: "شروق الأطلس",
      fr: "Lever de l'Atlas",
      en: "Atlas Sunrise"
    },
    artisan: {
      ar: "فاطمة الزهراء",
      fr: "Fatima Zahra",
      en: "Fatima Zahra"
    },
    price: 800,
    image: rug1,
    story: {
      ar: "نُسجت هذه السجادة في ساعات الصباح الأولى، حين كان الضوء يلمس الصوف مثل وعد جديد. وضعت فاطمة الزهراء في كل عقدة ذكرى من بيتها ورغبة في أن يصل دفء مديونة إلى بيت آخر. ليست قطعة جميلة فحسب، بل شهادة على امرأة اختارت أن تحفظ ما تعلمته من والدتها بخيط وصبر.",
      fr: "Ce tapis a été tissé aux premières heures du matin, lorsque la lumière touchait la laine comme une promesse. Fatima Zahra a placé dans chaque nœud un souvenir de sa maison et le désir de transmettre la chaleur de Mediona à un autre foyer. Ce n'est pas seulement une belle pièce, c'est le témoignage d'une femme qui protège ce que sa mère lui a appris.",
      en: "This rug was woven in the early morning, when light touched the wool like a promise. Fatima Zahra placed a memory of home into every knot and a wish for Mediona's warmth to reach another family. It is not just a beautiful piece; it is a testimony from a woman preserving what her mother taught her."
    },
    symbols: {
      ar: "المعينات ترمز للحماية وصون البيت، أما الخطوط المتعرجة فتستحضر الماء والحياة والخصوبة. اللون الأحمر يحمل حرارة الأرض وكرامة العمل اليدوي.",
      fr: "Les losanges évoquent la protection et le foyer, tandis que les zigzags rappellent l'eau, la vie et la fertilité. Le rouge porte la chaleur de la terre et la dignité du travail manuel.",
      en: "The diamonds suggest protection and the home, while zigzags evoke water, life, and fertility. The red carries the warmth of the earth and the dignity of handmade work."
    },
    timeToCreate: {
      ar: "4 أسابيع",
      fr: "4 semaines",
      en: "4 weeks"
    }
  },
  {
    id: "2",
    name: {
      ar: "رحلة الرحّل",
      fr: "Voyage nomade",
      en: "Nomad's Journey"
    },
    artisan: {
      ar: "أمينة يوسف",
      fr: "Amina Youssef",
      en: "Amina Youssef"
    },
    price: 1500,
    image: rug2,
    story: {
      ar: "تعلمت أمينة هذا النمط من جدتها، لا كرسمة تُنسخ، بل كحكاية تُروى من جديد. اختارت صوفاً طبيعياً غير مصبوغ ليبقى اللون قريباً من الأرض والقطيع والذاكرة. كل اختلاف صغير في النسيج يذكرنا أن التراث لا يعيش لأنه كامل، بل لأنه إنساني.",
      fr: "Amina a appris ce motif de sa grand-mère, non comme un dessin à copier, mais comme une histoire à raconter à nouveau. Elle a choisi une laine naturelle non teinte pour garder la couleur proche de la terre, du troupeau et de la mémoire. Chaque petite variation rappelle que le patrimoine vit parce qu'il est humain.",
      en: "Amina learned this pattern from her grandmother, not as a drawing to copy, but as a story to retell. She chose natural undyed wool so the color stays close to the earth, the flock, and memory. Every small variation reminds us that heritage survives because it is human."
    },
    symbols: {
      ar: "تتابع الأبيض والأسود يمثل الطريق الطويل للحياة: وضوح وغموض، راحة وتعب، بداية وعودة. الاختلافات الصغيرة بين الخطوط هي آثار اليد، لا أخطاء.",
      fr: "La séquence noire et blanche représente le long chemin de la vie : clarté et mystère, repos et effort, départ et retour. Les petites variations sont la trace de la main, pas des erreurs.",
      en: "The black and white sequence represents life's long road: clarity and mystery, rest and effort, departure and return. The small variations are traces of the hand, not mistakes."
    },
    timeToCreate: {
      ar: "8 أسابيع",
      fr: "8 semaines",
      en: "8 weeks"
    }
  },
  {
    id: "3",
    name: {
      ar: "تحفة مديونة",
      fr: "Chef-d'œuvre de Mediona",
      en: "Mediona Masterpiece"
    },
    artisan: {
      ar: "خديجة بنعلي",
      fr: "Khadija Benali",
      en: "Khadija Benali"
    },
    price: 3000,
    image: rug3,
    story: {
      ar: "خديجة بنعلي نسجت هذه القطعة كما يكتب الشاعر قصيدة طويلة. أربعون عاماً من الخبرة اجتمعت في سجادة واحدة: ذاكرة العائلة، قوة المرأة، وفرح الحصاد. هذه التحفة لا تطلب أن تُشاهد فقط؛ تطلب أن تُصان كجزء من هوية مديونة.",
      fr: "Khadija Benali a tissé cette pièce comme une poète écrit un long poème. Quarante ans d'expérience se réunissent dans un seul tapis : mémoire familiale, force des femmes et joie des récoltes. Cette œuvre ne demande pas seulement à être regardée ; elle demande à être préservée comme une partie de l'identité de Mediona.",
      en: "Khadija Benali wove this piece like a poet writing a long poem. Forty years of experience meet in one rug: family memory, women's strength, and the joy of harvest. This masterpiece does not only ask to be seen; it asks to be protected as part of Mediona's identity."
    },
    symbols: {
      ar: "النجمة المركزية تمثل روح الناسجة، وتحيط بها رموز الحصاد والازدهار وروابط العائلة. كثافة الزخارف تعكس طبقات الذاكرة التي تحملها كل أسرة.",
      fr: "L'étoile centrale représente l'âme de la tisseuse, entourée de symboles de récolte, de prospérité et de liens familiaux. La densité des motifs reflète les couches de mémoire portées par chaque famille.",
      en: "The central star represents the weaver's soul, surrounded by symbols of harvest, prosperity, and family bonds. The dense motifs reflect the layers of memory carried by every family."
    },
    timeToCreate: {
      ar: "16 أسبوعاً",
      fr: "16 semaines",
      en: "16 weeks"
    }
  }
];

export const cultureSections = [
  {
    id: "history",
    title: {
      ar: "تاريخ سجاد مديونة",
      fr: "Histoire du tapis de Mediona",
      en: "History of Mediona Rug"
    },
    content: {
      ar: "في بيوت مديونة، لم يكن النسيج عملاً جانبياً؛ كان طريقة لحفظ الحكايات. تعلمت النساء من أمهاتهن كيف يتحول الصوف إلى دفء، وكيف تصبح الرموز سجلاً للحياة اليومية: الزواج، المطر، الحصاد، والخوف على البيت. اليوم نعيد تقديم هذا التاريخ بلغة رقمية حتى لا يبقى مخفياً في الذاكرة فقط.",
      fr: "Dans les maisons de Mediona, le tissage n'était pas une activité secondaire ; c'était une manière de garder les histoires. Les femmes apprenaient de leurs mères comment transformer la laine en chaleur et les symboles en archives de la vie quotidienne : mariage, pluie, récoltes et protection du foyer. Aujourd'hui, nous présentons cette histoire dans un langage numérique.",
      en: "In Mediona homes, weaving was never a side activity; it was a way to protect stories. Women learned from their mothers how wool becomes warmth and how symbols become records of daily life: marriage, rain, harvest, and care for the home. Today we retell this history through digital tools so it is not hidden in memory alone."
    },
    image: heroBg,
    relatedRugId: "3"
  },
  {
    id: "materials",
    title: {
      ar: "المواد المستعملة",
      fr: "Matériaux utilisés",
      en: "Materials Used"
    },
    content: {
      ar: "تبدأ السجادة من صوف محلي يُغسل ويُمشط ويُغزل بعناية. الألوان التقليدية تأتي من الطبيعة: جذور الفوة للأحمر، الرمان والحناء للدفء، وظلال الصوف الطبيعي للهدوء. لذلك تحمل القطعة رائحة الأرض والعمل الجماعي قبل أن تحمل شكلها النهائي.",
      fr: "Le tapis commence avec une laine locale lavée, cardée et filée avec soin. Les couleurs traditionnelles viennent de la nature : garance pour le rouge, grenade et henné pour la chaleur, nuances naturelles de laine pour la douceur. La pièce porte donc la terre et le travail collectif avant même sa forme finale.",
      en: "The rug begins with local wool that is washed, carded, and spun with care. Traditional colors come from nature: madder root for red, pomegranate and henna for warmth, and natural wool tones for calm. The piece carries the earth and communal labor before it carries its final shape."
    },
    image: rug2,
    relatedRugId: "2"
  },
  {
    id: "symbols",
    title: {
      ar: "الرموز والمعاني",
      fr: "Symboles et significations",
      en: "Symbols and Meanings"
    },
    content: {
      ar: "زخارف السجاد لغة بصرية. المعين قد يحمي البيت، والخط المتعرج يستدعي الماء والحياة، والحدود المتكررة تعبر عن الاستمرارية. حين نفهم هذه الرموز، نرى السجادة كرسالة من امرأة إلى العالم، لا كزخرفة صامتة.",
      fr: "Les motifs du tapis sont une langue visuelle. Le losange peut protéger le foyer, le zigzag évoque l'eau et la vie, les bordures répétées parlent de continuité. Comprendre ces symboles permet de voir le tapis comme un message d'une femme au monde, et non comme une décoration silencieuse.",
      en: "Rug motifs are a visual language. The diamond may protect the home, the zigzag calls for water and life, and repeated borders speak of continuity. When we understand these symbols, the rug becomes a message from a woman to the world, not silent decoration."
    },
    image: rug1,
    relatedRugId: "1"
  },
  {
    id: "types",
    title: {
      ar: "أنواع السجاد",
      fr: "Types de tapis",
      en: "Types of Rugs"
    },
    content: {
      ar: "تتعدد قطع مديونة بين سجادات يومية دافئة، وقطع احتفالية غنية بالرموز، وأعمال كبيرة تُنسج للمناسبات أو للبيع. ما يجمعها هو حضور اليد والحكاية: لا توجد سجادتان متطابقتان لأن كل واحدة تحمل لحظة إنسانية مختلفة.",
      fr: "Les pièces de Mediona varient entre tapis du quotidien, œuvres cérémonielles riches en symboles et grandes pièces tissées pour les occasions ou la vente. Elles partagent la présence de la main et de l'histoire : deux tapis ne sont jamais identiques car chacun porte un moment humain différent.",
      en: "Mediona pieces range from warm everyday rugs to ceremonial works rich with symbols and larger pieces woven for special moments or sale. What unites them is the presence of the hand and the story: no two rugs are identical because each carries a different human moment."
    },
    image: rug3,
    relatedRugId: "3"
  }
];
