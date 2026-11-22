/* ---------------------------------------------------------------------------
   Examples of Mel's work, shown in the hero, the gallery and (dimmed) behind
   the signup. These are portfolio pieces, NOT products — anything for sale
   comes from Shopify and appears in the Shop section instead.

   Most pieces are cut out of their original photo (transparent .webp) and
   float on a brand-coloured tile; `tone` picks that colour. A piece without
   `tone` is shown as a full-bleed photo instead. Titles and notes are
   suggestions — edit freely.
--------------------------------------------------------------------------- */

export type Piece = {
  no: string;
  title: string;
  note: string;
  image: string;
  alt: string;
  /** Tile colour behind a cut-out piece. Omit for a full-bleed photo. */
  tone?: "jade" | "deep" | "gold" | "sage" | "cream";
  /** "big" = 2×2 feature tile, "wide" = 2×1 landscape crop. */
  size?: "big" | "wide";
};

export const pieces: Piece[] = [
  {
    no: "01",
    title: "Napa Confetti",
    note: "Crystals on wine bottle",
    image: "/art/napa-confetti.webp",
    tone: "cream",
    alt: "A wine bottle scattered with multicoloured crystals, topped with a crystal-covered stopper",
    size: "big",
  },
  {
    no: "02",
    title: "Prawn Star",
    note: "Beads on snack packet",
    image: "/art/prawn-star.webp",
    tone: "jade",
    alt: "A silver prawn-cracker packet with the prawn picked out in gold beads and crystals",
  },
  {
    no: "03",
    title: "Madame Vert",
    note: "Beaded portrait on glass",
    image: "/art/madame-vert.webp",
    tone: "gold",
    alt: "A green glass bottle with an abstract face worked in gold, silver and yellow beads",
  },
  {
    no: "04",
    title: "Sticks & Stones",
    note: "Crystals on snack box",
    image: "/art/sticks-and-stones.webp",
    tone: "deep",
    alt: "A pretzel-stick box completely covered in blue, gold and iridescent crystals",
  },
  {
    no: "05",
    title: "Twin-Lens Twinkle",
    note: "Crystals on miniature camera",
    image: "/art/twin-lens-twinkle.webp",
    tone: "sage",
    alt: "A miniature twin-lens camera studded with iridescent crystals",
  },
  {
    no: "06",
    title: "Big Bag Energy",
    note: "Crystals on crisp packet",
    image: "/art/big-bag-energy.jpg",
    alt: "A silver crisp packet with the words BIG BAG filled in with gunmetal crystals",
    size: "wide",
  },
];
