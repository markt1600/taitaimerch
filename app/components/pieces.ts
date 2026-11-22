/* ---------------------------------------------------------------------------
   Examples of Mel's work, shown in the hero, the gallery and (dimmed) behind
   the signup. These are portfolio pieces, NOT products — anything for sale
   comes from Shopify and appears in the Shop section instead.

   Most pieces are cut out of their original photo (transparent .webp) and
   float, spotlit, in a dark display niche. Mark an ordinary photo with
   `photo: true` and it fills the niche instead. Titles and notes are
   suggestions — edit freely.
--------------------------------------------------------------------------- */

export type Piece = {
  no: string;
  title: string;
  note: string;
  image: string;
  alt: string;
  /** Set for an ordinary photo; it fills its niche instead of floating. */
  photo?: boolean;
  /** "big" = 2×2 feature tile, "wide" = 2×1 landscape crop. */
  size?: "big" | "wide";
};

export const pieces: Piece[] = [
  {
    no: "01",
    title: "Napa Confetti",
    note: "Crystals on wine bottle",
    image: "/art/napa-confetti.webp",
    alt: "A wine bottle scattered with multicoloured crystals, topped with a crystal-covered stopper",
    size: "big",
  },
  {
    no: "02",
    title: "Prawn Star",
    note: "Beads on snack packet",
    image: "/art/prawn-star.webp",
    alt: "A silver prawn-cracker packet with the prawn picked out in gold beads and crystals",
  },
  {
    no: "03",
    title: "Madame Vert",
    note: "Beaded portrait on glass",
    image: "/art/madame-vert.webp",
    alt: "A green glass bottle with an abstract face worked in gold, silver and yellow beads",
  },
  {
    no: "04",
    title: "Sticks & Stones",
    note: "Crystals on snack box",
    image: "/art/sticks-and-stones.webp",
    alt: "A pretzel-stick box completely covered in blue, gold and iridescent crystals",
  },
  {
    no: "05",
    title: "Twin-Lens Twinkle",
    note: "Crystals on miniature camera",
    image: "/art/twin-lens-twinkle.webp",
    alt: "A miniature twin-lens camera studded with iridescent crystals",
  },
  {
    no: "06",
    title: "Bunny Business",
    note: "Crystals on a pair of bunnies",
    image: "/art/bunny-business.webp",
    alt: "Two long-eared bunny figures covered head to toe in iridescent crystals",
    size: "wide",
  },
  {
    no: "07",
    title: "Stick Shift",
    note: "Crystals on four snack boxes",
    image: "/art/stick-shift.webp",
    alt: "Four pretzel-stick boxes side by side, each fully covered in coloured crystals",
    size: "wide",
  },
  {
    no: "08",
    title: "Orange Crush",
    note: "Crystals on mint box",
    image: "/art/orange-crush.webp",
    alt: "A small mint box covered in orange crystals",
  },
  {
    no: "09",
    title: "Big Bag Energy",
    note: "Crystals on crisp packet",
    image: "/art/big-bag-energy.jpg",
    photo: true,
    alt: "A silver crisp packet with the words BIG BAG filled in with gunmetal crystals",
  },
];

export const piece = (title: string) => pieces.find((p) => p.title === title)!;
