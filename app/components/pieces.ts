/* ---------------------------------------------------------------------------
   Examples of Mel's work, shown in the hero, the gallery and (dimmed) behind
   the signup. These are portfolio pieces, NOT products — anything for sale
   comes from Shopify and appears in the Shop section instead.

   To add or swap a piece: put the photo in /public/art (portrait, roughly
   3:4) and add an entry here. Titles and notes are suggestions — edit freely.
--------------------------------------------------------------------------- */

export type Piece = {
  no: string;
  title: string;
  note: string;
  image: string;
  alt: string;
  /** "big" = 2×2 feature tile, "wide" = 2×1 landscape crop. */
  size?: "big" | "wide";
  /** CSS object-position, for steering the crop. */
  focus?: string;
};

export const pieces: Piece[] = [
  {
    no: "01",
    title: "Napa Confetti",
    note: "Crystals on wine bottle & case",
    image: "/art/napa-confetti.jpg",
    alt: "A wine bottle and its wooden case scattered with multicoloured crystals, with a crystal-covered stopper",
    size: "big",
  },
  {
    no: "02",
    title: "Prawn Star",
    note: "Beads on snack packet, framed",
    image: "/art/prawn-star.jpg",
    alt: "A framed silver prawn-cracker packet with the prawn picked out in gold beads and crystals",
    focus: "50% 60%",
  },
  {
    no: "03",
    title: "Madame Vert",
    note: "Beaded portrait on glass",
    image: "/art/madame-vert.jpg",
    alt: "A green glass bottle with an abstract face worked in gold, silver and yellow beads",
    focus: "50% 55%",
  },
  {
    no: "04",
    title: "Sticks & Stones",
    note: "Crystals on snack box, framed",
    image: "/art/sticks-and-stones.jpg",
    alt: "A pretzel-stick box completely covered in blue, gold and iridescent crystals, in a mirrored frame",
    focus: "50% 55%",
  },
  {
    no: "05",
    title: "Twin-Lens Twinkle",
    note: "Crystals on miniature camera",
    image: "/art/twin-lens-twinkle.jpg",
    alt: "A miniature twin-lens camera studded with iridescent crystals",
    focus: "50% 40%",
  },
  {
    no: "06",
    title: "Big Bag Energy",
    note: "Crystals on crisp packet",
    image: "/art/big-bag-energy.jpg",
    alt: "A silver crisp packet with the words BIG BAG filled in with gunmetal crystals",
    size: "wide",
    focus: "50% 47%",
  },
];
