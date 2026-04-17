export const rugs = [
  {
    id: "1",
    name: "Atlas Sunrise",
    artisan: "Fatima Zahra",
    price: 800,
    image: "/src/assets/rug-1.png",
    story: "Woven during the early hours of the morning, this rug reflects the warm hues of the sunrise over the Atlas Mountains. Fatima Zahra spent over a month perfecting the symmetry of the diamonds.",
    symbols: "The diamond shapes represent protection against the evil eye, while the zigzag borders symbolize water and fertility.",
    timeToCreate: "4 weeks",
  },
  {
    id: "2",
    name: "Nomad's Journey",
    artisan: "Amina Youssef",
    price: 1500,
    image: "/src/assets/rug-2.png",
    story: "A strictly geometric piece using un-dyed sheep's wool. Amina learned this specific pattern from her grandmother, preserving a style that dates back centuries among nomadic tribes.",
    symbols: "The repetitive black and white sequence illustrates the journey of life, with individual variations in the weave representing personal challenges overcome.",
    timeToCreate: "8 weeks",
  },
  {
    id: "3",
    name: "Mediona Masterpiece",
    artisan: "Khadija Benali",
    price: 3000,
    image: "/src/assets/rug-3.png",
    story: "A true showcase of Mediona artistry. Khadija Benali, a master weaver with 40 years of experience, combined five distinct tribal techniques into this large, intricate rug.",
    symbols: "Contains a complex narrative of family, strength, and nature. The central star signifies the weaver's soul, surrounded by motifs of harvest and prosperity.",
    timeToCreate: "16 weeks",
  }
];

export const cultureSections = [
  {
    id: "history",
    title: "History of Mediona Rug",
    content: "The Mediona rug tradition has been passed down through generations of women. Originating from the rural plains, these rugs were initially created for warmth and practical use in homes before evolving into sophisticated artistic expressions. Each piece serves as a historical document of the weaver's life.",
    image: "/src/assets/hero-bg.png",
    relatedRugId: "3"
  },
  {
    id: "materials",
    title: "Materials Used",
    content: "Authentic Mediona rugs are made exclusively from local, high-quality sheep's wool. The dyes are traditionally sourced from nature: madder root for deep reds, indigo, pomegranate, and henna. The preparation of the wool—washing, carding, and spinning—is a communal activity that bonds the village.",
    image: "/src/assets/rug-2.png",
    relatedRugId: "2"
  },
  {
    id: "symbols",
    title: "Symbols and Meanings",
    content: "Moroccan rugs are not just decorative; they are a visual language. Weavers use ancient Amazigh symbols to tell stories, express desires, or offer protection. A diamond often represents a woman or protection from the evil eye, while chevrons and zigzags denote water and life.",
    image: "/src/assets/rug-1.png",
    relatedRugId: "1"
  }
];
