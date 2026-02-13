export type Era = "Victorian" | "Art Deco" | "Edwardian" | "Georgian" | "Retro";
export type Category = "necklace" | "earrings" | "bangles" | "rings" | "pendants" | "bridal";

export interface Gemstone {
  name: string;
  carat?: number;
  color?: string;
  cut?: string;
  provenance?: string;
  detailImage?: string;
}

export interface EraTimeline {
  year: string;
  event: string;
  description?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  era: Era;
  price: number;
  currency: "INR";
  story: string;
  curatorNote?: string;
  gemstones: Gemstone[];
  image?: string;
  secondaryImages?: string[];
  hallmarkImage?: string;
  timeline: EraTimeline[];
  isReadyToShip?: boolean;
  specs: {
    metal: string;
    weight: string;
    condition: string;
    origin: string;
  };
}

export const products: Product[] = [
  {
    slug: "antique-coral-gold-disc-necklace",
    name: "Traditional Beaded 'Haar' (Red Pavazha)",
    category: "necklace",
    era: "Victorian",
    price: 1,
    currency: "INR",
    story: "A magnificent Traditional Multi-Strand Beaded Statement Haar, often referred to as a 'Sita Haar' when worn in this long and ornate fashion. It features seven parallel strands of uniform Red Coral (Pavazha) beads, anchored by two large, hand-hammered gold 'Vati' discs. This classic silhouette, drawing from the rich 'Solah Shringar' traditions of Maharashtra and Karnataka, represents an auspicious blend of vibrant red and radiant gold, historically celebrated in regional bridal finery.",
    curatorNote: "The dual 'Vati' ornaments are a remarkable cultural signature, reminiscent of traditional Mangalsutra variations. The use of premium Red Coral (Pavazha) highlights the historical trade routes that brought these organic treasures to the master workshops of South India, where they are valued for both aesthetic and astrological significance.",
    gemstones: [
      {
        name: "Red Coral (Pavazha)",
        color: "Auspicious Crimson",
        provenance: "Mediterranean/South Indian Trade"
      }
    ],
    image: "/necklace-coral.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1850", event: "Solah Shringar Influence", description: "The peak of traditional bridal adornment styles incorporating regional gold disc motifs." },
      { year: "1880", event: "Vati Ornament Evolution", description: "Integration of multi-strand coral 'Malas' with traditional Vati plates in high-society jewelry." }
    ],
    specs: {
      metal: "Hand-Hammered Gold Tone",
      weight: "145g",
      condition: "Excellent Antique",
      origin: "Indian Subcontinent"
    },
    isReadyToShip: true
  },
  {
    slug: "stippled-gold-bead-necklace",
    name: "Traditional 'Thushi' Beaded Choker",
    category: "necklace",
    era: "Victorian",
    price: 1,
    currency: "INR",
    story: "A striking variation of the traditional 'Thushi' choker, this piece uses a thick, braided Black Silk Dori (cord) as its base—a signature element of tribal and regional Indian jewelry. In many cultures, these black threads are believed to ward off negative energy. The necklace features seven graduated beads adorned with intricate gold-toned stippling, a style often found in Kolhapuri or Temple Jewelry.",
    curatorNote: "While traditional Thushi necklaces are usually made of woven gold beads, this modern tribal variation uses the black cord to create a bolder 'statement' look. The stippling technique on the gilded beads is a masterclass in granular texturing, typical of the meticulous craftsmanship found in Kolhapur.",
    gemstones: [],
    image: "/necklace-stippled.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1860", event: "Rise of Granulation Techniques", description: "Revival of ancient stippling and dot-work in regional gold smithery." },
      { year: "1890", event: "The Dori Tradition", description: "Formalization of the silk cord suspension for heavy royal statement necklaces." }
    ],
    specs: {
      metal: "Gilded Brass with Kolhapuri-style Stippling",
      weight: "210g",
      condition: "Pristine Antique",
      origin: "Indian Subcontinent"
    },
    isReadyToShip: true
  },
  {
    slug: "himalayan-mandala-inlay-pendant",
    name: "Himalayan Coral & Turquoise Mandala Pendant",
    category: "pendants",
    era: "Victorian",
    price: 1,
    currency: "INR",
    story: "A magnificent Himalayan-style statement pendant deeply rooted in regional jewelry traditions. The central circular motif is a sacred Mandala—a fundamental Vedic symbol representing the cosmic order and the universe. It features the 'signature' mosaic of Tibetan and Nepalese artisans, where hand-cut Turquoise and Red Coral fragments are meticulously set in a gilded inlay. The pendant is suspended on a traditional hand-braided black silk Dori, creating a bold, adjustable silhouette.",
    curatorNote: "The combination of stones in this piece is highly symbolic: Turquoise represents the vast sky and spiritual protection, while Red Coral embodies life force and vitality. Together, they are traditionally believed to bring spiritual balance to the wearer. The precision of the mosaic fitting demonstrates the exceptional skill of Himalayan master craftsmen, turning organic fragments into a seamless celestial map.",
    gemstones: [
      {
        name: "Red Coral & Turquoise",
        color: "Crimson & Sky Blue",
        provenance: "Himalayan Region"
      }
    ],
    image: "/necklace-mandala.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1870", event: "Himalayan Trade Routes", description: "Expansion of jewelry styles incorporating coral and turquoise across the subcontinent." },
      { year: "1900", event: "Sacred Geometry in Jewelry", description: "The popularization of Mandala motifs in ceremonial and protective amulets." }
    ],
    specs: {
      metal: "Gilded Brass with Mosaic Inlay",
      weight: "185g",
      condition: "Excellent Antique",
      origin: "Himalayan Region / North India"
    },
    isReadyToShip: true
  },
  {
    slug: "antique-seed-pearl-multi-strand-mala",
    name: "Antique Multi-Strand Seed Pearl 'Mala'",
    category: "necklace",
    era: "Victorian",
    price: 1,
    currency: "INR",
    story: "A breathtaking multi-strand 'Waterfall' statement necklace featuring over 20 cascading rows of delicate white seed beads. This voluminous silhouette creates a dense, layered presence that drapes naturally across the chest, anchored by a traditional braided fabric neckband. Interspersed with hand-crafted gold-toned spacer beads, the ivory and gold palette represents a timeless symbol of purity, serenity, and elegance in South Asian traditions.",
    curatorNote: "This heavy, multi-layered style draws significant influence from the traditional attire of Naga tribes and regional folk jewelry of Western India, where jewelry volume historically indicated social standing. The 'Waterfall' effect provides a significant statement presence, making it a versatile masterpiece that pairs equally well with vibrant Silk Sarees or modern ethnic fusion wear.",
    gemstones: [
      {
        name: "Seed Beads",
        color: "Lustrous White",
        provenance: "Regional Folk Tradition"
      }
    ],
    image: "/necklace-white-pearl.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1875", event: "Pearl Trade Prosperity", description: "Expansion of pearl weaving techniques in regional jewelry hubs." },
      { year: "1910", event: "Social Significance", description: "Multi-strand seed pearl necklaces become a staple of aristocratic ceremonial wear." }
    ],
    specs: {
      metal: "Gold Toned Accents",
      weight: "120g",
      condition: "Excellent Antique",
      origin: "Indian Subcontinent"
    },
    isReadyToShip: true
  },
  {
    slug: "tribal-amber-disc-pendant-necklace",
    name: "Antique Tribal Amber & Gilded Disc Necklace",
    category: "pendants",
    era: "Victorian",
    price: 1,
    currency: "INR",
    story: "A commanding statement piece featuring a graduated strand of glossy maroon-red beads, meticulously separated by intricate gold-toned metallic spacers that add a regal shimmer. The focal point is a large, circular gold-toned pendant with engraved concentric circles—a design echoing the traditional 'Vati' and regional tribal ornaments of India. The necklace transitions into smaller, dark earthy beads at the neckline, providing a grounded contrast to the vibrant red and metallic gold.",
    curatorNote: "The combination of heavy beads and a singular large metal pendant is characteristic of folk jewelry from Gujarat and Rajasthan, where such pieces often served as protective talismans. The deep red palette symbolizes power and energy, while the concentric disc represents wholeness and the sun. This is a quintessential 'Statement Piece,' designed to be the centerpiece of a traditional or ethnic-fusion ensemble.",
    gemstones: [
      {
        name: "Glossy Maroon Beads",
        color: "Deep Red",
        provenance: "Gujarat / Rajasthan Regional Tradition"
      }
    ],
    image: "/necklace-amber-disc.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1880", event: "Tribal Metalwork Zenith", description: "The popularization of large-scale disc pendants in regional folk jewelry." },
      { year: "1915", event: "Symbolic Integration", description: "The adoption of sacred spiral motifs in ceremonial statement necklaces." }
    ],
    specs: {
      metal: "Gilded Brass with Concentric Engraving",
      weight: "195g",
      condition: "Pristine Antique",
      origin: "North India"
    }
  },
  {
    slug: "tribal-coral-turquoise-panel-necklace",
    name: "Antique Tribal Multi-Strand Coral & Turquoise Panel Necklace",
    category: "necklace",
    era: "Victorian",
    price: 1,
    currency: "INR",
    story: "A spectacular tribal statement necklace featuring a massive multi-strand drape composed of dozens of tiny terracotta-red seed beads. This 'waterfall' construction creates a dense, textile-like weight that is a hallmark of traditional Himalayan and Naga craftsmanship. The piece is uniquely anchored by two large, rectangular mosaic side-panels, each hand-crafted with intricate filigree and scrollwork, inlaid with vibrant turquoise and red coral fragments. This combination of earthy beads and refined metalwork provides a striking antique contrast.",
    curatorNote: "Deeply rooted in Tibetan and Nepalese traditions, the turquoise and coral inlay represents a balance between spiritual protection (sky) and life force (energy). By placing these ornate panels on the sides rather than the bottom, the design emphasizes the neckline in a style typical of High-Himalayan ceremonial wear. This piece perfectly bridges the gap between a historical spiritual artifact and a modern 'Boho-Chic' statement for the SALF Antqe collection.",
    gemstones: [
      {
        name: "Terracotta Seed Beads & Turquoise Mosaic",
        color: "Deep Red & Sky Blue",
        provenance: "Himalayan / Tibetan Region"
      }
    ],
    image: "/necklace-coral-turquoise.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1885", event: "Mosaic Inlay Mastery", description: "The refinement of hand-cut turquoise mosaic techniques in Himalayan workshops." },
      { year: "1920", event: "Regional Influence", description: "Integration of multi-strand coral silhouettes with ornate side-panel amulets." }
    ],
    specs: {
      metal: "Silver-Toned Brass with Filigree",
      weight: "165g",
      condition: "Excellent Antique",
      origin: "Himalayan Region / North India"
    },
    isReadyToShip: true
  },
  {
    slug: "royal-rajput-kundan-necklace",
    name: "Royal Rajput Kundan & Emerald Haar",
    category: "necklace",
    era: "Art Deco",
    price: 4500,
    currency: "INR",
    story: "A majestic Kundan Haar that epitomizes the grandeur of Rajputana royalty. This piece features a central medallion of uncut diamonds (Polki) set in pure gold foil, surrounded by deep green emerald droplets. The multi-strand pearl chain adds a layer of sophistication, making it a perfect heirloom piece for ceremonial occasions.",
    curatorNote: "The use of emeralds alongside traditional Kundan work reflects the influence of Mughal aesthetics on Rajput jewelry. This piece is a rare example of the transition from purely traditional to more stylized Art Deco influences in the early 20th century.",
    gemstones: [
      {
        name: "Emerald & Polki",
        color: "Forest Green & Translucent",
        provenance: "Rajasthan, India"
      }
    ],
    image: "/necklace-coral.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1925", event: "Rajputana Artistic Peak", description: "The era of grand Kundan sets commissioned by princely states." }
    ],
    specs: {
      metal: "22K Gold Plated Brass",
      weight: "180g",
      condition: "Pristine",
      origin: "Jaipur, India"
    },
    isReadyToShip: true
  },
  {
    slug: "victorian-gold-jhumkas",
    name: "Antique Victorian Filigree Jhumkas",
    category: "earrings",
    era: "Victorian",
    price: 2800,
    currency: "INR",
    story: "These exquisite Jhumkas feature the delicate filigree work characteristic of the Victorian era. The bell-shaped drops are adorned with tiny gold beads and a central ruby cabochon, suspended from an ornate floral stud. The intricate craftsmanship speaks to the romanticism of the late 19th century.",
    curatorNote: "Victorian Jhumkas are a unique fusion of European filigree techniques and traditional Indian bell-shaped earring silhouettes. This pair is particularly notable for its light, airy structure despite its significant size.",
    gemstones: [
      {
        name: "Ruby Cabochon",
        color: "Deep Pigeon Blood Red",
        provenance: "Burma (Myanmar)"
      }
    ],
    image: "/necklace-stippled.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1890", event: "Filigree Popularity", description: "The height of delicate wire-work in colonial-era jewelry." }
    ],
    specs: {
      metal: "Gilded Silver",
      weight: "45g",
      condition: "Excellent Antique",
      origin: "South India"
    },
    isReadyToShip: false
  },
  {
    slug: "art-deco-ruby-ring",
    name: "Art Deco Geometric Ruby Statement Ring",
    category: "rings",
    era: "Art Deco",
    price: 3200,
    currency: "INR",
    story: "A bold statement ring that showcases the geometric precision of the Art Deco movement. A central emerald-cut ruby is flanked by stepped gold shoulders, creating a powerful, architectural silhouette. This piece reflects the modernism and optimism of the 1920s.",
    curatorNote: "This ring is a departure from the organic forms of the Victorian era, embracing the machine-age aesthetics of Art Deco. The ruby's deep saturation contrasts beautifully with the polished gold surfaces.",
    gemstones: [
      {
        name: "Emerald-cut Ruby",
        color: "Vibrant Crimson",
        provenance: "Mozambique"
      }
    ],
    image: "/necklace-mandala.jpg",
    secondaryImages: [],
    hallmarkImage: "",
    timeline: [
      { year: "1930", event: "Art Deco Movement", description: "The global shift towards geometric and architectural jewelry design." }
    ],
    specs: {
      metal: "18K Gold Plated",
      weight: "18g",
      condition: "Like New",
      origin: "Western India"
    },
    isReadyToShip: true
  }
];
