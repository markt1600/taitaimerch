/* ---------------------------------------------------------------------------
   Stand-in illustrations, drawn in the brand palette.

   These are PLACEHOLDERS so the layout has something cute to hold until
   Mel's real artwork is dropped in. To use real art, add an image to
   /public/art and set `image` on the matching entry in `pieces` below —
   the gallery will render the image instead of the doodle.
--------------------------------------------------------------------------- */

import type { ReactNode } from "react";

const JADE = "#16473b";
const DEEP = "#0e332b";
const IVORY = "#f3ebdd";
const CREAM = "#fbf6ec";
const SAGE = "#a6bbb0";
const GOLD = "#c9a24b";
const GLOW = "#e4c988";

function Face({
  x = 100,
  y = 100,
  ink = DEEP,
  gap = 16,
}: {
  x?: number;
  y?: number;
  ink?: string;
  gap?: number;
}) {
  return (
    <g>
      <circle cx={x - gap} cy={y} r="4" fill={ink} />
      <circle cx={x + gap} cy={y} r="4" fill={ink} />
      <path
        d={`M${x - 6} ${y + 7} q6 7 12 0`}
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx={x - gap - 9} cy={y + 9} rx="6" ry="4" fill={GOLD} opacity=".55" />
      <ellipse cx={x + gap + 9} cy={y + 9} rx="6" ry="4" fill={GOLD} opacity=".55" />
    </g>
  );
}

function Sparkle({ x, y, s = 1, fill = GOLD }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -10 C1.5 -3 3 -1.5 10 0 C3 1.5 1.5 3 0 10 C-1.5 3 -3 1.5 -10 0 C-3 -1.5 -1.5 -3 0 -10Z"
      fill={fill}
    />
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function Teacup() {
  return (
    <Frame label="A smiling teacup with curls of steam">
      <path d="M84 62 q-10 -12 0 -24 q10 -12 0 -24" fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
      <path d="M112 66 q-10 -12 0 -24 q8 -10 2 -20" fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
      <circle cx="152" cy="112" r="17" fill="none" stroke={IVORY} strokeWidth="9" />
      <path d="M46 84 h108 v12 a54 54 0 0 1 -108 0z" fill={IVORY} />
      <path d="M46 84 h108 v8 h-108z" fill={GLOW} />
      <ellipse cx="100" cy="166" rx="64" ry="9" fill={SAGE} />
      <Face x={100} y={116} />
    </Frame>
  );
}

export function Bao() {
  return (
    <Frame label="A cheerful steamed bun">
      <ellipse cx="100" cy="160" rx="72" ry="10" fill={GOLD} opacity=".5" />
      <path d="M36 138 C36 88 68 54 100 54 C132 54 164 88 164 138 C164 160 36 160 36 138Z" fill={CREAM} />
      <path d="M100 54 q-4 16 -18 22 M100 54 q0 18 0 26 M100 54 q4 16 18 22" fill="none" stroke={SAGE} strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="52" r="6" fill={GOLD} />
      <Face x={100} y={116} />
    </Frame>
  );
}

export function Tile() {
  return (
    <Frame label="A mahjong tile with a little flower">
      <rect x="62" y="30" width="88" height="140" rx="16" fill={DEEP} transform="translate(8 8)" />
      <rect x="62" y="30" width="88" height="140" rx="16" fill={CREAM} />
      <g transform="translate(106 82)">
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx="0" cy="-17" r="11" fill={GOLD} transform={`rotate(${a})`} />
        ))}
        <circle r="8" fill={JADE} />
      </g>
      <Face x={106} y={132} gap={13} />
    </Frame>
  );
}

export function Cat() {
  return (
    <Frame label="A cat wearing a string of pearls">
      <path d="M54 186 C54 128 146 128 146 186Z" fill={IVORY} />
      <path d="M58 70 L64 24 L96 50Z M142 70 L136 24 L104 50Z" fill={IVORY} />
      <path d="M66 54 L69 36 L82 47Z M134 54 L131 36 L118 47Z" fill={GLOW} />
      <ellipse cx="100" cy="88" rx="50" ry="44" fill={IVORY} />
      <path d="M56 92 h-18 M58 102 l-16 6 M144 92 h18 M142 102 l16 6" stroke={SAGE} strokeWidth="3" strokeLinecap="round" />
      <Face x={100} y={86} gap={18} />
      {[-30, -20, -10, 0, 10, 20, 30].map((dx) => (
        <circle key={dx} cx={100 + dx} cy={143 - (dx * dx) / 110} r="5.5" fill={CREAM} stroke={GOLD} strokeWidth="2" />
      ))}
    </Frame>
  );
}

export function Bag() {
  return (
    <Frame label="A little handbag with a gold clasp">
      <path d="M70 92 C70 34 130 34 130 92" fill="none" stroke={GOLD} strokeWidth="9" strokeLinecap="round" />
      <path d="M48 86 h104 l12 72 a12 12 0 0 1 -12 14 h-104 a12 12 0 0 1 -12 -14z" fill={JADE} />
      <path d="M48 86 h104 l3 18 h-110z" fill={DEEP} />
      <circle cx="100" cy="104" r="8" fill={GOLD} />
      <Face x={100} y={136} ink={IVORY} />
    </Frame>
  );
}

export function Star() {
  return (
    <Frame label="A happy lucky star">
      <path d="M100 22 C110 76 124 90 178 100 C124 110 110 124 100 178 C90 124 76 110 22 100 C76 90 90 76 100 22Z" fill={GOLD} />
      <Sparkle x={160} y={44} s={1.3} fill={IVORY} />
      <Sparkle x={42} y={158} s={1} fill={IVORY} />
      <Sparkle x={46} y={48} s={0.7} fill={GLOW} />
      <Face x={100} y={98} gap={13} />
    </Frame>
  );
}

export { Sparkle };

export type Piece = {
  no: string;
  title: string;
  note: string;
  tone: "jade" | "deep" | "gold" | "sage" | "cream";
  size?: "big" | "wide";
  Art: () => ReactNode;
  /** Path under /public, e.g. "/art/tea-for-one.jpg". Replaces the doodle. */
  image?: string;
};

// Placeholder titles — rename to Mel's real pieces.
export const pieces: Piece[] = [
  { no: "01", title: "Tea for One", note: "Slow mornings", tone: "jade", size: "big", Art: Teacup },
  { no: "02", title: "Pearls, Darling", note: "Dressed for lunch", tone: "sage", Art: Cat },
  { no: "03", title: "Lucky Tile", note: "Game night", tone: "gold", Art: Tile },
  { no: "04", title: "Bao Bao", note: "Soft & steamy", tone: "deep", size: "wide", Art: Bao },
  { no: "05", title: "The Good Bag", note: "Carry everything", tone: "cream", Art: Bag },
  { no: "06", title: "Huat Star", note: "A little luck", tone: "jade", Art: Star },
];
