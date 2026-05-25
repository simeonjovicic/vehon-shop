import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 165;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`,
);

const MATERIALS = [
  {
    id: "velvet-wool",
    name: "Velvet / Wool",
    short: "Velvet",
    category: "velvet",
    description: "Samtiges Velvet außen, weiche Wolle innen — bonded für Form und Halt.",
    colors: [
      { id: "charcoal", name: "Charcoal", hex: "#2c2a2c" },
      { id: "navy", name: "Navy", hex: "#1f2a45" },
      { id: "forest", name: "Forest", hex: "#1f3d2e" },
      { id: "bordeaux", name: "Bordeaux", hex: "#5b1a26" },
    ],
  },
  {
    id: "eco-suede",
    name: "Eco Suede",
    short: "Suede",
    category: "suede",
    description: "Vegane Wildleder-Alternative mit feiner, matter Oberfläche.",
    colors: [
      { id: "black", name: "Black", hex: "#111111" },
    ],
  },
  {
    id: "eco-suede-wool",
    name: "Eco Suede / Wool",
    short: "Suede + Wool",
    category: "suede",
    description: "Eco Suede außen, kuschelige Wolle innen — für kühlere Tage.",
    colors: [
      { id: "black", name: "Black", hex: "#161614" },
    ],
  },
  {
    id: "wool",
    name: "Wool",
    short: "Wool",
    category: "wool",
    description: "100% Wolle. Warm, atmungsaktiv und natürlich elastisch.",
    colors: [
      { id: "anthracite", name: "Anthracite", hex: "#3a3a3c" },
      { id: "navy", name: "Navy", hex: "#1b2a4a" },
    ],
  },
  {
    id: "vetech",
    name: "Vetech / Bonded Lycra",
    short: "Vetech",
    category: "vetech",
    description: "Technisches Stretchmaterial für Strand, Boot und unterwegs.",
    colors: [
      { id: "black", name: "Black", hex: "#1a1a1c" },
      { id: "blue", name: "Blue", hex: "#324f78" },
      { id: "teal", name: "Teal", hex: "#1f4a4d" },
      { id: "bordeaux", name: "Bordeaux", hex: "#5b2027" },
    ],
  },
];

const MATERIAL_FILTERS = [
  ["all", "All"],
  ["velvet", "Velvet"],
  ["suede", "Eco Suede"],
  ["wool", "Wool"],
  ["vetech", "Vetech"],
];

const PRODUCTS = [
  {
    id: "mocassino",
    name: "Mocassino",
    subtitle: "Italian Soft Loafer",
    tagline: "Mit Penny-Bar · Indoor & Outdoor",
    intro:
      "Der klassische italienische Mokassin. Die dezente Penny-Bar über dem Spann macht ihn zum vielseitigsten Schuh der Kollektion — zuhause, im Hotel, auf dem Boot. Eine Brücke zwischen Komfort und Auftritt.",
    detailIntro:
      "Eine Hommage an die italienische Handwerkstradition. Komplett Made in Italy mit sorgsam ausgewählten Materialien für raffinierten Komfort. Vom Wohnraum bis zum Bootsdeck.",
    price: 189,
    image: "/wai1_front.jpeg",
    hoverImage: "/wai1_behind.jpeg",
    tag: "Made in Italy",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    materials: MATERIALS,
    highlights: [
      "Penny-Bar Detail über dem Spann",
      "Versatile — Indoor & Outdoor",
      "Unisex Größen EU 39–46",
    ],
  },
  {
    id: "pantofola",
    name: "Pantofola",
    subtitle: "Italian House Slipper",
    tagline: "Cleaner Spann · Pure Indoor",
    intro:
      "Reduziert, glatt, ohne Schnitt über dem Spann. Der Pantofola ist die Pantoffel-Form in italienischer Handwerksqualität — gemacht für ruhige Räume, weiche Stoffe und Momente, in denen weniger mehr ist.",
    detailIntro:
      "Der Pantofola für den Wohnraum. Weiche Linien, warme Materialien — gemacht für Tage zu Hause, ruhige Morgen und entspannte Abende.",
    price: 169,
    image: "/wai_front.jpeg",
    hoverImage: "/wai_behind.jpeg",
    tag: "Made in Italy",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    materials: MATERIALS,
    highlights: [
      "Glatter Vamp ohne Penny-Bar",
      "Pure Indoor — Lounge & Home",
      "Größen EU 36–44",
    ],
  },
];

const FEATURES = [
  ["01", "Barefoot feel", "Flexible Sohle und viel Raum für natürliche Bewegung."],
  ["02", "Packable", "Leicht, weich und flach verstaubar für Reisen."],
  ["03", "Clean design", "Reduzierte Linien, textile Struktur, kein lauter Sportschuh."],
  ["04", "Easy care", "Gemacht für Alltag, kurze Wege und unkomplizierte Routinen."],
];

const DETAIL_TRANSITION = {
  duration: 0.58,
  ease: [0.22, 1, 0.36, 1],
};

const COMPARE_CARD_TRANSITION = {
  duration: 1.05,
  ease: [0.22, 1, 0.36, 1],
};

const COMPARE_CARD_VIEWPORT = { once: true, amount: 0.35 };

const DETAIL_VARIANTS = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: DETAIL_TRANSITION,
  },
  exit: {
    x: "100%",
    transition: { duration: 0.46, ease: [0.64, 0, 0.78, 0] },
  },
};

const MotionDiv = motion.div;
const MotionA = motion.a;

const LOADER_EXIT_TRANSITION = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

function Loader({ onDone }) {
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    const morphTimer = window.setTimeout(() => setMorphed(true), 600);
    const doneTimer = window.setTimeout(() => onDone(), 1450);
    return () => {
      window.clearTimeout(morphTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <span
      className={`loader-morph${morphed ? " is-morphed" : ""}`}
      aria-label="Vehon"
    >
      V<span className="loader-space" aria-hidden="true">&nbsp;</span>e<span className="loader-t" aria-hidden="true">t</span><span className="loader-space" aria-hidden="true">&nbsp;</span>hon
    </span>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

:root {
  --nav-h: 78px;
  --bg: #f7f3ed;
  --paper: #fffaf2;
  --text: #1c1917;
  --muted: #766b61;
  --line: rgba(28, 25, 23, 0.12);
  --line-strong: rgba(28, 25, 23, 0.22);
  --navy: #172333;
  --clay: #b8a898;
  --sand: #ede7de;
}

* { box-sizing: border-box; }
html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-h);
}
body { margin: 0; background: var(--bg); }
button, a { font: inherit; }
button { color: inherit; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.045); }
}

.site {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: "DM Sans", system-ui, sans-serif;
  font-weight: 300;
  overflow-x: clip;
}

.serif { font-family: "Cormorant Garamond", Georgia, serif; }

.product-overlay {
  position: fixed;
  inset: 0;
  z-index: 45;
  background: var(--bg);
  overflow: hidden;
  will-change: transform, opacity;
}

.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 28px;
  padding: 22px 44px;
  border-bottom: 1px solid transparent;
  transition: background 0.35s ease, border-color 0.35s ease, padding 0.35s ease;
}

.nav.scrolled {
  background: rgba(247, 243, 237, 0.9);
  border-bottom-color: var(--line);
  backdrop-filter: blur(18px);
}

.nav.dark:not(.scrolled) { color: var(--paper); }
.nav-left, .nav-right { display: flex; align-items: center; gap: 30px; }
.nav-right { justify-content: flex-end; }
.nav a, .nav button {
  text-decoration: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: inherit;
}

.nav-link {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  opacity: 0.72;
}

.brand {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 34px;
  letter-spacing: 0.12em;
  line-height: 1;
  white-space: nowrap;
}
.wordmark {
  font-family: "Cormorant Garamond", Georgia, serif;
  letter-spacing: 0.12em;
}

.bag-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid currentColor !important;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  opacity: 0.88;
}

.bag-count {
  display: inline-grid;
  place-items: center;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: currentColor;
  color: var(--bg);
  font-size: 10px;
}

.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: end;
  padding: 128px 44px 48px;
  color: var(--paper);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% center;
  animation: slowZoom 14s ease-out both;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(20, 17, 14, 0.78) 0%, rgba(20, 17, 14, 0.44) 38%, rgba(20, 17, 14, 0.08) 72%),
    linear-gradient(0deg, rgba(20, 17, 14, 0.25), rgba(20, 17, 14, 0.02));
}

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 690px) 1fr;
  gap: 40px;
  align-items: end;
  width: 100%;
}

.hero-copy {
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.eyebrow {
  margin: 0 0 18px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  opacity: 0.76;
}

.hero h1 {
  margin: 0;
  max-width: 680px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 92px;
  line-height: 0.93;
  font-weight: 300;
  letter-spacing: 0;
}

.hero-text {
  max-width: 480px;
  margin: 26px 0 0;
  color: rgba(255, 250, 242, 0.78);
  font-size: 17px;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 34px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-radius: 999px;
  padding: 0 24px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 12px;
}

.primary-btn { background: var(--paper); color: var(--text); }
.secondary-btn { color: var(--paper); border: 1px solid rgba(255, 250, 242, 0.46); }

.hero-proof {
  justify-self: end;
  width: min(360px, 100%);
  border-top: 1px solid rgba(255, 250, 242, 0.44);
  padding-top: 20px;
  color: rgba(255, 250, 242, 0.78);
  font-size: 13px;
  line-height: 1.65;
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
}

.story-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 32px;
  margin-top: 36px;
  padding-top: 30px;
  border-top: 1px solid var(--line);
}

.story-feature strong {
  display: block;
  margin-bottom: 5px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 500;
}

.story-feature span {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

.section {
  padding: 92px 44px;
}

.section-inner {
  max-width: 1360px;
  margin: 0 auto;
}

.section-head {
  display: grid;
  grid-template-columns: minmax(0, 620px) auto;
  gap: 36px;
  align-items: end;
  margin-bottom: 34px;
}

.section h2 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 58px;
  line-height: 1;
  font-weight: 300;
  letter-spacing: 0;
}

.section-note {
  margin: 16px 0 0;
  max-width: 520px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.filter {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  padding: 10px 16px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  cursor: pointer;
}

.filter.active {
  background: var(--text);
  color: var(--paper);
  border-color: var(--text);
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.product-card {
  position: relative;
  display: grid;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  min-height: 520px;
  cursor: pointer;
  text-align: left;
  animation: fadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.product-media {
  position: relative;
  height: 440px;
  overflow: hidden;
  background: var(--sand);
}

.product-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
}

.product-card:hover .product-media img { transform: scale(1.045); }

.product-media .hover-img {
  position: absolute;
  inset: 0;
  opacity: 0;
}

.product-card:hover .hover-img { opacity: 1; }
.product-card:hover .main-img { opacity: 0; }

.product-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  border-radius: 999px;
  background: rgba(255, 250, 242, 0.88);
  padding: 7px 12px;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 10px;
}

.quick-add {
  position: absolute;
  right: 14px;
  bottom: 14px;
  z-index: 2;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(28, 25, 23, 0.18);
  background: rgba(255, 250, 242, 0.9);
  cursor: pointer;
  font-size: 23px;
  line-height: 1;
}

.product-info {
  display: grid;
  gap: 18px;
  padding: 22px;
}

.product-title-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
}

.product-name {
  margin: 0 0 6px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 30px;
  line-height: 1;
  font-weight: 400;
}

.product-sub {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

.price {
  white-space: nowrap;
  font-size: 14px;
  color: var(--muted);
}

.product-meta {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 12px;
}

.silhouette-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-bottom: 88px;
}
.compare-card {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 0;
  text-decoration: none;
  color: inherit;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
  will-change: transform, opacity;
}
.compare-card:hover {
  border-color: var(--text);
  box-shadow: 0 20px 50px rgba(28, 25, 23, 0.08);
}
.compare-card:hover .compare-media img {
  transform: scale(1.04);
}
.compare-media img {
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.compare-media {
  position: relative;
  background: linear-gradient(180deg, #eee7dc 0%, #d8cdc0 100%);
  min-height: 320px;
  overflow: hidden;
}
.compare-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.compare-body {
  padding: 28px 28px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.compare-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}
.compare-head h3 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 38px;
  font-weight: 400;
  line-height: 1;
}
.compare-price {
  color: var(--muted);
  font-size: 14px;
}
.compare-tagline {
  margin: 0;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
}
.compare-intro {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}
.compare-highlights {
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}
.compare-highlights li {
  position: relative;
  padding-left: 16px;
  color: var(--muted);
  font-size: 13px;
}
.compare-highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 9px;
  width: 8px;
  height: 1px;
  background: currentColor;
}
.compare-cta {
  margin-top: 6px;
  align-self: flex-start;
  padding-bottom: 4px;
  border-bottom: 1px solid currentColor;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 12px;
}

.shop-filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
  margin-bottom: 24px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.shop-filters-bar .eyebrow {
  margin: 0;
}

.model-section {
  margin-top: 72px;
  scroll-margin-top: calc(var(--nav-h) + 24px);
}
.model-section:first-of-type {
  margin-top: 48px;
}
.model-section-head {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.model-section-eyebrow {
  margin: 0;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 11px;
}
.model-section-title {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 56px;
  font-weight: 300;
  line-height: 1;
}
.model-section-sub {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  letter-spacing: 0.04em;
}

.swatch-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.swatch {
  border: 1px solid rgba(28, 25, 23, 0.18);
  border-radius: 999px;
  padding: 0;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.swatch:hover {
  transform: scale(1.08);
  border-color: var(--text);
}
.swatch--card {
  width: 16px;
  height: 16px;
}
.swatch--detail {
  width: 26px;
  height: 26px;
}
.swatch--detail.active {
  border-color: var(--text);
  box-shadow: 0 0 0 2px var(--paper), 0 0 0 3px var(--text);
}
.swatch-more {
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-left: 4px;
}

.story {
  background: #fff;
}

.story-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);
  gap: 52px;
  align-items: center;
}

.story-copy {
  max-width: 490px;
}

.story-copy p {
  color: var(--muted);
  line-height: 1.82;
  font-size: 15px;
}

.story-link {
  display: inline-flex;
  margin-top: 18px;
  color: var(--text);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 12px;
  border-bottom: 1px solid currentColor;
  padding-bottom: 5px;
}

.story-images {
  display: grid;
  grid-template-columns: 1fr 0.72fr;
  gap: 18px;
  align-items: end;
}

.story-image {
  overflow: hidden;
  border-radius: 8px;
  background: var(--sand);
}
.story-image.large { aspect-ratio: 4 / 5; }
.story-image.small { aspect-ratio: 4 / 4.8; margin-bottom: 58px; }
.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner {
  position: relative;
  min-height: 520px;
  display: grid;
  align-items: end;
  color: var(--paper);
  overflow: hidden;
  padding: 44px;
}

.banner img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(13, 17, 20, 0.74), rgba(13, 17, 20, 0.06));
}

.banner-content {
  position: relative;
  z-index: 1;
  max-width: 560px;
}

.banner h2 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 62px;
  line-height: 1;
  font-weight: 300;
}

.banner p {
  color: rgba(255, 250, 242, 0.78);
  font-size: 16px;
  line-height: 1.75;
}

.scroll-anim {
  position: relative;
  height: 600vh;
  margin-top: var(--nav-h);
}

.scroll-anim-sticky {
  position: sticky;
  top: var(--nav-h);
  height: calc(100vh - var(--nav-h));
  overflow: hidden;
  background: #fff;
}

.scroll-anim-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.scroll-anim-label {
  position: absolute;
  bottom: 52px;
  left: 44px;
  z-index: 2;
  color: var(--text);
  pointer-events: none;
}

.scroll-anim-label p {
  margin: 0 0 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--muted);
}

.scroll-anim-label h2 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 52px;
  font-weight: 300;
  line-height: 1;
}

.scroll-anim-info {
  position: absolute;
  top: 36px;
  left: 44px;
  z-index: 2;
  color: var(--text);
  pointer-events: none;
}

.scroll-anim-info .eyebrow {
  margin: 0 0 12px;
  opacity: 0.55;
}

.scroll-anim-info h3 {
  margin: 0 0 18px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 58px;
  font-weight: 300;
  line-height: 1.0;
  max-width: 440px;
}

.scroll-anim-info p {
  margin: 0;
  font-size: 15px;
  line-height: 1.75;
  max-width: 320px;
  color: var(--muted);
}

.info {
  background: #fff;
  color: var(--text);
}

.info-marquee {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 22px 44px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--muted);
  overflow: hidden;
  white-space: nowrap;
}

.info-marquee span { opacity: 0.55; }
.info-marquee strong {
  color: var(--text);
  font-weight: 400;
  letter-spacing: 0.18em;
}
.info-marquee .dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--clay);
  flex-shrink: 0;
}

.info-story {
  max-width: 1360px;
  margin: 0 auto;
  padding: 120px 44px 40px;
  display: grid;
  grid-template-columns: minmax(320px, 0.38fr) minmax(0, 0.62fr);
  gap: 72px;
  border-bottom: 1px solid var(--line);
}

.info-story-sticky {
  position: sticky;
  top: calc(var(--nav-h) + 34px);
  min-height: calc(100svh - var(--nav-h) - 68px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: start;
}

.info-story-sticky::before {
  content: "Vol. 01";
  display: block;
  margin-bottom: 56px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: 14px;
  color: var(--muted);
  letter-spacing: 0.04em;
}

.info-story .eyebrow {
  margin: 0 0 22px;
  color: var(--clay);
  opacity: 1;
  font-size: 11px;
  letter-spacing: 0.22em;
}

.info-story h2 {
  margin: 0 0 clamp(22px, 3vh, 34px);
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(54px, 5.45vw, 86px);
  line-height: 0.94;
  font-weight: 300;
  letter-spacing: -0.015em;
}

.info-story h2 em {
  font-style: italic;
  font-weight: 300;
}

.info-story-copy {
  margin: 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.85;
  max-width: 460px;
}

.info-progress {
  display: grid;
  gap: 10px;
  margin-top: clamp(26px, 4vh, 42px);
}

.info-progress-item {
  display: grid;
  grid-template-columns: 42px 44px 1fr;
  align-items: center;
  gap: 14px;
  color: var(--muted);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: color 0.25s ease, opacity 0.25s ease;
  opacity: 0.52;
}

.info-progress-item::before {
  content: "";
  width: 100%;
  height: 1px;
  background: currentColor;
  opacity: 0.35;
}

.info-progress-item.is-active {
  color: var(--text);
  opacity: 1;
}

.info-progress-num {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 20px;
  letter-spacing: 0.04em;
}

.info-steps {
  position: relative;
}

.info-step {
  display: grid;
  grid-template-columns: minmax(260px, 0.46fr) minmax(0, 0.54fr);
  gap: 46px;
  min-height: calc(100svh - var(--nav-h));
  padding: 44px 0;
  align-items: center;
  border-bottom: 1px solid var(--line);
  scroll-margin-top: calc(var(--nav-h) + 34px);
}

.info-step:last-child {
  border-bottom: 0;
}

.info-block-plate {
  position: relative;
  aspect-ratio: 4 / 5;
  max-height: 620px;
  padding: 0 13%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-block-plate.tone-sand { background: var(--sand); color: var(--text); }
.info-block-plate.tone-navy { background: var(--navy); color: var(--paper); }
.info-block-plate.tone-clay { background: var(--clay); color: #1c1917; }

.info-block-numeral {
  display: block;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: clamp(205px, 15.5vw, 270px);
  line-height: 1;
  font-weight: 300;
  letter-spacing: 0;
  opacity: 0;
  clip-path: inset(-20% 120% -20% -24%);
  transform: translateX(-18px);
  transition:
    clip-path 1.05s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.45s ease,
    transform 1.05s cubic-bezier(0.22, 1, 0.36, 1);
}

.info-step.is-active .info-block-numeral {
  opacity: 0.92;
  clip-path: inset(-20% -30% -20% -24%);
  transform: translateX(0);
}

.info-block-plate-meta {
  position: absolute;
  top: 28px;
  left: 28px;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.7;
}

.info-block-plate-mark {
  position: absolute;
  bottom: 28px;
  right: 28px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: 14px;
  opacity: 0.7;
}

.info-block-plate-arc {
  position: absolute;
  bottom: -45%;
  left: -10%;
  width: 120%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid currentColor;
  opacity: 0.18;
  pointer-events: none;
}

.info-block-copy {
  display: flex;
  flex-direction: column;
}

.info-block-copy .info-marker {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 26px;
  color: var(--clay);
}

.info-block-copy .info-marker-num {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 22px;
  letter-spacing: 0.06em;
}

.info-block-copy .info-marker-line {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.info-block-copy .info-marker-tag {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: var(--muted);
}

.info-block-copy h3 {
  margin: 0 0 28px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 60px;
  font-weight: 300;
  line-height: 1.02;
  letter-spacing: -0.01em;
  max-width: 480px;
}

.info-block-copy > p {
  margin: 0 0 40px;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.88;
  max-width: 460px;
}

.info-quote {
  margin: 0 0 44px;
  padding: 4px 0 4px 24px;
  border-left: 1px solid var(--text);
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: 24px;
  line-height: 1.4;
  color: var(--text);
  max-width: 460px;
}

.info-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border-top: 1px solid var(--text);
  max-width: 500px;
}

.info-spec {
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding-right: 24px;
}

.info-spec:nth-child(odd) {
  border-right: 1px solid var(--line);
  padding-left: 0;
}
.info-spec:nth-child(even) {
  padding-left: 24px;
  padding-right: 0;
}

.info-spec span {
  color: var(--muted);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.info-spec strong {
  color: var(--text);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.01em;
  text-align: right;
}

.info-manifesto {
  position: relative;
  background: var(--bg);
  padding: 180px 44px 170px;
  text-align: center;
  border-top: 1px solid var(--line);
}

.info-manifesto::before,
.info-manifesto::after {
  content: "";
  position: absolute;
  left: 50%;
  width: 1px;
  height: 60px;
  background: var(--line-strong);
}
.info-manifesto::before { top: 60px; }
.info-manifesto::after { bottom: 60px; }

.info-manifesto-inner {
  max-width: 980px;
  margin: 0 auto;
}

.info-manifesto .eyebrow {
  margin: 0 0 42px;
  color: var(--clay);
  opacity: 1;
  font-size: 11px;
  letter-spacing: 0.28em;
}

.info-manifesto blockquote {
  margin: 0 0 50px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 56px;
  line-height: 1.15;
  font-weight: 300;
  letter-spacing: -0.01em;
  color: var(--text);
}

.info-manifesto blockquote em {
  font-style: italic;
}

.info-manifesto cite {
  font-style: normal;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: var(--muted);
}

.etymology {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin: 0 0 40px;
  padding: 40px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.etymology-morph {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: 64px;
  line-height: 1;
  color: var(--text);
  display: inline-flex;
  align-items: baseline;
  cursor: default;
  outline: none;
}
.etymology-space,
.etymology-t {
  display: inline-block;
  overflow: hidden;
  white-space: pre;
  max-width: 0.6em;
  opacity: 1;
  transition:
    max-width 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.45s ease;
}
.etymology-morph:hover .etymology-space,
.etymology-morph:focus .etymology-space,
.etymology-morph:hover .etymology-t,
.etymology-morph:focus .etymology-t {
  max-width: 0;
  opacity: 0;
}
.etymology-hint {
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--muted);
}

.loader {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--bg);
  color: var(--text);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.loader-morph {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: clamp(72px, 14vw, 160px);
  line-height: 1;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: baseline;
  opacity: 0;
  transform: translateY(8px);
  animation: loader-enter 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.08s forwards;
}
.loader-space,
.loader-t {
  display: inline-block;
  overflow: hidden;
  white-space: pre;
  max-width: 0.6em;
  opacity: 1;
  transition:
    max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease;
}
.loader-morph.is-morphed .loader-space,
.loader-morph.is-morphed .loader-t {
  max-width: 0;
  opacity: 0;
}
@keyframes loader-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-cta {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 48px;
  max-width: 1360px;
  margin: 0 auto;
  padding: 70px 44px;
  border-top: 1px solid var(--line);
}

.info-cta-eyebrow {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: var(--muted);
  margin: 0;
}

.info-cta-text {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 44px;
  line-height: 1;
  font-weight: 300;
  letter-spacing: -0.01em;
  margin: 0;
  text-align: center;
}

.info-cta-link {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 20px 36px;
  border-radius: 999px;
  background: var(--text);
  color: var(--paper);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
  transition: background 0.3s ease, gap 0.3s ease;
}

.info-cta-link:hover {
  background: var(--navy);
  gap: 18px;
}

.info-cta-link::after {
  content: "→";
  font-size: 14px;
  letter-spacing: 0;
}

.footer {
  padding: 58px 44px 38px;
  border-top: 1px solid var(--line);
}

.footer-inner {
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
}

.footer-brand {
  margin: 0 0 10px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 42px;
  letter-spacing: 0.12em;
}
.footer-motto {
  margin: 0 0 18px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: 15px;
  color: var(--muted);
}

.footer p {
  color: var(--muted);
  margin: 0;
  line-height: 1.7;
}

.footer-links {
  display: flex;
  gap: 34px;
  align-items: start;
}

.footer-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 13px;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(0, 0, 0, 0.38);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.drawer-overlay.open { opacity: 1; pointer-events: auto; }

.drawer {
  position: fixed;
  inset: 0 0 0 auto;
  z-index: 90;
  width: min(430px, 100vw);
  background: var(--bg);
  border-left: 1px solid var(--line);
  display: grid;
  grid-template-rows: auto 1fr auto;
  transform: translateX(102%);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer.open { transform: translateX(0); }

.drawer-head,
.drawer-foot {
  padding: 26px;
  border-bottom: 1px solid var(--line);
}
.drawer-foot { border-bottom: 0; border-top: 1px solid var(--line); }
.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drawer-head h2 {
  margin: 0;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 32px;
  font-weight: 400;
}
.close {
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.drawer-body {
  overflow: auto;
  padding: 18px 26px;
}
.empty {
  display: grid;
  place-items: center;
  min-height: 260px;
  text-align: center;
  color: var(--muted);
}
.cart-row {
  display: grid;
  grid-template-columns: 82px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.cart-row img {
  width: 82px;
  height: 82px;
  object-fit: cover;
  border-radius: 6px;
  background: var(--sand);
}
.cart-row h3 {
  margin: 0 0 6px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 22px;
  font-weight: 400;
}
.cart-row p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}
.remove {
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 20px;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;
}
.checkout {
  width: 100%;
  min-height: 50px;
  border: 0;
  border-radius: 999px;
  background: var(--text);
  color: var(--paper);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 12px;
  cursor: pointer;
}

.detail {
  height: 100svh;
  padding: calc(var(--nav-h) + 18px) 44px 28px;
  overflow: hidden;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(390px, 0.92fr);
  gap: 48px;
  height: 100%;
  max-width: 1680px;
  margin: 0 auto;
  align-items: stretch;
}

.detail-media {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 0;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: linear-gradient(180deg, #eee7dc 0%, #d8cdc0 100%);
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(28, 25, 23, 0.08);
}
.detail-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
.detail-color-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 6px;
  transition: background 0.3s ease;
  z-index: 1;
}

.detail-panel {
  min-height: 0;
  padding: 22px 18px 18px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  scrollbar-width: none;
}
.detail-panel::-webkit-scrollbar { display: none; }
.back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  min-height: 42px;
  padding: 0 18px;
  margin-bottom: clamp(16px, 3vh, 30px);
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: rgba(255, 250, 242, 0.48);
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.back:hover {
  background: var(--text);
  border-color: var(--text);
  color: var(--paper);
  transform: translateX(-2px);
}
.detail-panel h1 {
  margin: 0 0 8px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(48px, 4.6vw, 72px);
  line-height: 0.98;
  font-weight: 300;
}
.detail-sub {
  margin: 0 0 clamp(18px, 2.6vh, 26px);
  color: var(--muted);
}
.detail-price {
  margin-bottom: clamp(22px, 3.2vh, 34px);
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(34px, 3vw, 42px);
}
.size-label {
  margin-bottom: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 12px;
}
.picker {
  margin-bottom: clamp(18px, 2.6vh, 26px);
}
.picker-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 11px;
}
.picker-value {
  color: var(--text);
  letter-spacing: 0.06em;
  text-transform: none;
  font-size: 13px;
}
.material-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}
.material-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.material-chip:hover {
  border-color: var(--line-strong);
}
.material-chip.active {
  border-color: var(--text);
  background: rgba(28, 25, 23, 0.04);
}
.material-chip-swatch {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid rgba(28, 25, 23, 0.18);
  flex-shrink: 0;
}
.material-chip-label {
  font-size: 13px;
  letter-spacing: 0.02em;
}
.color-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.sizes {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: clamp(20px, 2.8vh, 30px);
}
.size {
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.size.active {
  background: var(--text);
  color: var(--paper);
  border-color: var(--text);
}
.add-to-bag {
  min-height: 54px;
  border: 0;
  border-radius: 999px;
  background: var(--text);
  color: var(--paper);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 12px;
  cursor: pointer;
}
.add-to-bag:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.detail-copy {
  margin-top: clamp(18px, 3vh, 30px);
  padding-top: clamp(16px, 2.4vh, 24px);
  border-top: 1px solid var(--line);
  color: var(--muted);
  line-height: 1.65;
  max-width: 560px;
}

@media (max-width: 980px) {
  .nav {
    grid-template-columns: auto 1fr auto;
    padding: 18px 20px;
  }
  .nav-left { display: none; }
  .brand { font-size: 30px; justify-self: start; }
  .nav-right { gap: 12px; }
  .nav-right .nav-link { display: none; }
  .hero {
    min-height: 86svh;
    padding: 108px 22px 34px;
  }
  .hero-bg { object-position: 67% center; }
  .hero::after {
    background: linear-gradient(90deg, rgba(20, 17, 14, 0.82), rgba(20, 17, 14, 0.34));
  }
  .hero-content { grid-template-columns: 1fr; }
  .hero h1 { font-size: 58px; max-width: 430px; }
  .hero-proof { justify-self: start; width: 100%; max-width: 430px; }
  .section { padding: 68px 20px; }
  .section-head { grid-template-columns: 1fr; }
  .section h2 { font-size: 44px; }
  .filters { justify-content: flex-start; }
  .shop-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .silhouette-compare {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 56px;
  }
  .compare-card { grid-template-columns: 1fr; }
  .compare-media { min-height: 260px; }
  .compare-body { padding: 22px; }
  .compare-head h3 { font-size: 32px; }
  .shop-filters-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 20px 0;
  }
  .model-section { margin-top: 48px; }
  .model-section-title { font-size: 42px; }
  .story-layout { grid-template-columns: 1fr; }
  .story-copy { max-width: 650px; }
  .banner { padding: 28px 20px; min-height: 430px; }
  .banner h2 { font-size: 44px; }
  .info-marquee { padding: 18px 22px; gap: 20px; font-size: 10px; }
  .info-story {
    grid-template-columns: 1fr;
    gap: 44px;
    padding: 80px 22px 40px;
  }
  .info-story-sticky {
    position: static;
    min-height: auto;
    gap: 34px;
  }
  .info-story-sticky::before {
    margin-bottom: 26px;
    font-size: 12px;
  }
  .info-story h2 { font-size: 56px; }
  .info-progress {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-top: 0;
  }
  .info-progress-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .info-progress-item::before { width: 100%; }
  .info-step {
    grid-template-columns: 1fr;
    gap: 36px;
    min-height: auto;
    padding: 64px 0;
  }
  .info-block-numeral { font-size: 200px; }
  .info-block-copy h3 { font-size: 40px; }
  .info-manifesto { padding: 110px 22px 100px; }
  .info-manifesto::before, .info-manifesto::after { display: none; }
  .info-manifesto blockquote { font-size: 32px; }
  .info-cta {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 48px 22px;
    text-align: center;
  }
  .info-cta-text { font-size: 30px; }
  .info-cta-link { justify-self: center; }
  .scroll-anim-label { left: 20px; bottom: 32px; }
  .scroll-anim-label h2 { font-size: 36px; }
  .footer-inner { grid-template-columns: 1fr; }
  .detail {
    height: auto;
    min-height: 100svh;
    padding: calc(var(--nav-h) + 16px) 20px 42px;
    overflow: visible;
  }
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    height: auto;
  }
  .detail-media { min-height: 420px; }
  .detail-panel { padding: 42px 24px 64px; }
}

@media (min-width: 981px) and (max-height: 760px) {
  .detail { padding: calc(var(--nav-h) + 10px) 34px 18px; }
  .detail-grid { gap: 34px; }
  .detail-panel { padding-top: 8px; padding-bottom: 8px; }
  .back { margin-bottom: 14px; }
  .detail-panel h1 { font-size: 50px; }
  .detail-sub { margin-bottom: 14px; }
  .detail-price { margin-bottom: 18px; }
  .sizes { margin-bottom: 18px; }
  .size { width: 40px; height: 40px; }
  .add-to-bag { min-height: 48px; }
  .detail-copy {
    margin-top: 18px;
    padding-top: 14px;
    line-height: 1.5;
  }
}

@media (max-width: 640px) {
  .bag-btn {
    width: 42px;
    height: 42px;
    padding: 0;
    justify-content: center;
  }
  .bag-label { display: none; }
  .hero h1 { font-size: 46px; }
  .hero-text { font-size: 15px; }
  .hero-actions { align-items: stretch; }
  .primary-btn, .secondary-btn { width: 100%; }
  .shop-grid { grid-template-columns: 1fr; }
  .product-card { min-height: auto; }
  .product-media { height: 330px; }
  .story-images { grid-template-columns: 1fr; }
  .story-image.small { margin-bottom: 0; }
  .footer-links { flex-direction: column; gap: 12px; }
  .detail-panel h1 { font-size: 48px; }
}
`;

export default function App() {
  const [bag, setBag] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [loading]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openProduct(productId, materialId, colorId) {
    const target = PRODUCTS.find((item) => item.id === productId);
    if (!target) return;
    const material = materialId
      ? target.materials.find((m) => m.id === materialId) || target.materials[0]
      : target.materials[0];
    const color = colorId
      ? material.colors.find((c) => c.id === colorId) || material.colors[0]
      : material.colors[0];
    setSelectedMaterial(material.id);
    setSelectedColor(color.id);
    setSelectedSize("");
    setActiveProduct(productId);
  }

  function closeProduct() {
    setSelectedSize("");
    setActiveProduct(null);
  }

  const product = activeProduct ? PRODUCTS.find((item) => item.id === activeProduct) : null;
  const activeMaterial = product
    ? product.materials.find((m) => m.id === selectedMaterial) || product.materials[0]
    : null;
  const activeColor = activeMaterial
    ? activeMaterial.colors.find((c) => c.id === selectedColor) || activeMaterial.colors[0]
    : null;

  function changeMaterial(materialId) {
    if (!product) return;
    const material = product.materials.find((m) => m.id === materialId);
    if (!material) return;
    setSelectedMaterial(material.id);
    setSelectedColor(material.colors[0].id);
  }
  const bagCount = bag.reduce((sum, item) => sum + item.qty, 0);
  const bagTotal = bag.reduce((sum, item) => {
    const match = PRODUCTS.find((p) => p.id === item.productId);
    return sum + (match ? match.price * item.qty : 0);
  }, 0);

  useEffect(() => {
    if (!product) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [product]);

  function addToBag(productId, materialId, colorId, size) {
    setBag((current) => {
      const found = current.findIndex(
        (item) =>
          item.productId === productId &&
          item.materialId === materialId &&
          item.colorId === colorId &&
          item.size === size,
      );
      if (found >= 0) {
        return current.map((item, index) => (index === found ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { productId, materialId, colorId, size, qty: 1 }];
    });
    setBagOpen(true);
  }

  function removeFromBag(index) {
    setBag((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="site">
      <style>{CSS}</style>
      <Navigation
        scrolled={scrolled}
        dark={!product}
        bagCount={bagCount}
        onBag={() => setBagOpen(true)}
        onHome={closeProduct}
      />

      <main>
        <Hero />
        <Shop
          products={PRODUCTS}
          filter={filter}
          setFilter={setFilter}
          onOpen={openProduct}
        />
        <ScrollAnimation />
        <InfoSections />
        <Footer />
      </main>

      <AnimatePresence initial={false}>
        {product && activeMaterial && activeColor && (
          <MotionDiv
            className="product-overlay"
            key={product.id}
            variants={DETAIL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ProductDetail
              product={product}
              activeMaterial={activeMaterial}
              activeColor={activeColor}
              selectedSize={selectedSize}
              onMaterialChange={changeMaterial}
              onColorChange={(colorId) => setSelectedColor(colorId)}
              onSizeChange={setSelectedSize}
              onBack={closeProduct}
              onAdd={() =>
                selectedSize && addToBag(product.id, activeMaterial.id, activeColor.id, selectedSize)
              }
            />
          </MotionDiv>
        )}
      </AnimatePresence>

      <BagDrawer
        bag={bag}
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        onRemove={removeFromBag}
        total={bagTotal}
      />

      <AnimatePresence>
        {loading && (
          <MotionDiv
            className="loader"
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: LOADER_EXIT_TRANSITION }}
          >
            <Loader onDone={() => setLoading(false)} />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navigation({ scrolled, dark, bagCount, onBag, onHome }) {
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${dark ? " dark" : ""}`}>
      <div className="nav-left">
        <a className="nav-link" href="#shop">Shop</a>
        <a className="nav-link" href="#story">Design</a>
        <a className="nav-link" href="#movement">Movement</a>
      </div>
      <button className="brand" onClick={onHome} aria-label="Zur Startseite">VEHON</button>
      <div className="nav-right">
        <a className="nav-link" href="#story">Made in Italy</a>
        <button className="bag-btn" onClick={onBag} aria-label="Warenkorb oeffnen">
          <span className="bag-label">Bag</span>
          <span className="bag-count">{bagCount}</span>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <img className="hero-bg" src="/wai4-opt.jpeg" alt="Vehon Mokassin in einer ruhigen Interior-Szene" />
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow"><span className="wordmark">Vehon</span> · Vol. 01 · Made in Italy</p>
          <h1><em>Vis et honor.</em></h1>
          <p className="hero-text">
            Forza e onore — Stärke und Ehre. Ein lateinischer Leitsatz der römischen Legionäre, übersetzt
            in zwei italienische Schuh-Silhouetten. Der <strong>Mocassino</strong> für draußen, der
            <strong> Pantofola</strong> für drinnen — beide aus den feinsten Materialien, von Cashmere
            und Velvet bis zur technischen Lycra.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#shop">Shop Collection</a>
            <a className="secondary-btn" href="#story">The Vehon story</a>
          </div>
        </div>
        <p className="hero-proof">
          Komplett Made in Italy. Cashmere · Velvet · Wolle · Eco Suede · Vetech.
          Eine Schuh-Familie mit zwei Gesichtern — Komfort und Würde, in jeder Bewegung.
        </p>
      </div>
    </section>
  );
}


function Shop({ products, filter, setFilter, onOpen }) {
  return (
    <section className="section" id="shop">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <p className="eyebrow">Vehon Collection</p>
            <h2>Two silhouettes.<br />One Italian craft.</h2>
            <p className="section-note">
              Vehon ist auf zwei Schuh-Formen reduziert: der <strong>Mocassino</strong> mit
              klassischer Penny-Bar als vielseitiger Begleiter, und der <strong>Pantofola</strong>
              mit cleanem Spann als reiner Indoor-Schuh. Beide aus den gleichen, sorgsam
              ausgewählten Materialien gefertigt — komplett Made in Italy.
            </p>
          </div>
        </div>

        <div className="silhouette-compare">
          {products.map((product, idx) => {
            const fromLeft = idx === 0;
            return (
              <MotionA
                className="compare-card"
                key={product.id}
                href={`#shop-${product.id}`}
                initial={{ x: fromLeft ? -120 : 120, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={COMPARE_CARD_VIEWPORT}
                transition={{ ...COMPARE_CARD_TRANSITION, delay: idx * 0.12 }}
              >
                <div className="compare-media">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="compare-body">
                  <div className="compare-head">
                    <h3>{product.name}</h3>
                    <span className="compare-price">EUR {product.price}</span>
                  </div>
                  <p className="compare-tagline">{product.tagline}</p>
                  <p className="compare-intro">{product.intro}</p>
                  <ul className="compare-highlights">
                    {product.highlights.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <span className="compare-cta">
                    Discover {product.name} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </MotionA>
            );
          })}
        </div>

        <div className="shop-filters-bar">
          <p className="eyebrow">Browse by material</p>
          <div className="filters" role="tablist" aria-label="Nach Material filtern">
            {MATERIAL_FILTERS.map(([key, label]) => (
              <button
                className={`filter${filter === key ? " active" : ""}`}
                key={key}
                onClick={() => setFilter(key)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {products.map((product, productIdx) => {
          const visibleMaterials =
            filter === "all"
              ? product.materials
              : product.materials.filter((material) => material.category === filter);
          if (visibleMaterials.length === 0) return null;

          return (
            <div className="model-section" id={`shop-${product.id}`} key={product.id}>
              <div className="model-section-head">
                <p className="model-section-eyebrow">0{productIdx + 1} / {product.name}</p>
                <h3 className="model-section-title">{product.name}</h3>
                <p className="model-section-sub">{product.tagline}</p>
              </div>

              <div className="shop-grid">
                {visibleMaterials.map((material, idx) => (
                  <article
                    className="product-card"
                    key={`${product.id}-${material.id}`}
                    onClick={() => onOpen(product.id, material.id)}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="product-media">
                      {product.tag && <span className="product-tag">{product.tag}</span>}
                      <img className="main-img" src={product.image} alt={`${product.name} in ${material.name}`} />
                      <img className="hover-img" src={product.hoverImage} alt="" aria-hidden="true" />
                    </div>
                    <div className="product-info">
                      <div className="product-title-row">
                        <div>
                          <h3 className="product-name">{product.name}</h3>
                          <p className="product-sub">{material.name}</p>
                        </div>
                        <span className="price">EUR {product.price}</span>
                      </div>
                      <div className="swatch-row" aria-label={`Verfügbare Farben für ${product.name} in ${material.name}`}>
                        {material.colors.map((color) => (
                          <button
                            key={color.id}
                            type="button"
                            className="swatch swatch--card"
                            style={{ background: color.hex }}
                            aria-label={color.name}
                            title={color.name}
                            onClick={(event) => {
                              event.stopPropagation();
                              onOpen(product.id, material.id, color.id);
                            }}
                          />
                        ))}
                        <span className="swatch-more">
                          {material.colors.length} {material.colors.length === 1 ? "color" : "colors"}
                        </span>
                      </div>
                      <div className="product-meta">
                        <span>{material.description.split(" — ")[0]}</span>
                        <span>EU {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ScrollAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const imagesRef = useRef([]);
  const lastFrame = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function sizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    function drawCover(img) {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function getIdx() {
      if (!containerRef.current) return 0;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      return Math.round(progress * (FRAME_COUNT - 1));
    }

    function renderFrame(idx) {
      const img = imagesRef.current[idx];
      if (!img?.complete || lastFrame.current === idx) return;
      lastFrame.current = idx;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      drawCover(img);
    }

    function update() {
      renderFrame(getIdx());
    }

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    // Load all frames; draw frame 0 as soon as it's ready
    imagesRef.current = FRAMES.map((src, i) => {
      const img = new Image();
      img.onload = () => {
        if (i === 0) renderFrame(0);
        else renderFrame(getIdx());
      };
      img.src = src;
      return img;
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      window.removeEventListener("resize", sizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-anim" id="story">
      <div className="scroll-anim-sticky">
        <canvas ref={canvasRef} className="scroll-anim-canvas" />
        <div className="scroll-anim-info">
          <p className="eyebrow"><span className="wordmark">Vehon</span> Mocassino</p>
          <h3>Italian craft, in motion.</h3>
          <p>Eine Sohle, sorgsam in Italien gefertigt. Materialien, die jeden Schritt begleiten.</p>
        </div>
        <div className="scroll-anim-label">
          <p>Made in Italy · Vis et honor</p>
          <h2>Forza<br />e onore.</h2>
        </div>
      </div>
    </div>
  );
}

const INFO_BLOCKS = [
  {
    num: "01",
    tone: "tone-sand",
    plateMeta: "Plate I",
    plateMark: "Origin",
    eyebrow: "Vis et honor",
    tag: "Latin roots",
    heading: "Forza e onore. Strength and honor.",
    body: "Vehon nimmt seinen Namen aus dem lateinischen „Vis et honor“ — Stärke und Ehre. Eine Devise der römischen Legionäre und Gladiatoren, ein strenger Ehrenkodex aus Mut, Wert, Loyalität und Würde. Wir tragen ihn nicht in der Hand, sondern unter dem Fuß.",
    quote: "“V et hon · V & hon · V + hon → VEHON”",
    specs: [
      ["Etymology", "Vis et honor"],
      ["Meaning", "Force & honor"],
      ["Heritage", "Roman virtue"],
      ["Volume", "Vol. 01"],
    ],
  },
  {
    num: "02",
    tone: "tone-navy",
    plateMeta: "Plate II",
    plateMark: "Craft",
    eyebrow: "Made in Italy",
    tag: "Italian atelier",
    heading: "Materials chosen, not assembled.",
    body: "Jeder Vehon wird komplett in Italien gefertigt. Wir setzen edle Texturen wie Cashmere, Velvet und Wolle direkt neben technisch funktionale Stoffe wie Vetech und Bonded Lycra — Luxus und Praktikabilität in einem Schuh. Die Sohle: eine eigens entwickelte Form, gemacht für Halt, Leichtigkeit und Ruhe.",
    quote: "“Equilibrio tra tradizione artigianale e design contemporaneo.”",
    specs: [
      ["Origin", "Made in Italy"],
      ["Upper", "Cashmere · Velvet · Wool"],
      ["Tech", "Vetech · Bonded Lycra"],
      ["Sole", "Custom moulded"],
    ],
  },
  {
    num: "03",
    tone: "tone-clay",
    plateMeta: "Plate III",
    plateMark: "Form",
    eyebrow: "Two silhouettes",
    tag: "Indoor & out",
    heading: "From the home to the harbor.",
    body: "Der Mocassino mit Penny-Bar trägt dich vom Wohnraum aufs Boot, an den Strand, durch den Tag. Der Pantofola mit cleanem Spann hält die Ruhe von Cashmere-Decken und Marmorböden. Ein Material — zwei Charaktere. Eine Familie, gemacht für jede Stunde des Tages.",
    quote: "“Una scarpa versatile, capace di unire lusso e praticità.”",
    specs: [
      ["Mocassino", "Indoor & Outdoor"],
      ["Pantofola", "Indoor only"],
      ["Style", "Italian loafer"],
      ["Sizes", "EU 36–46"],
    ],
  },
];

function InfoSections() {
  const [activeInfoIndex, setActiveInfoIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.dataset.index) {
          setActiveInfoIndex(Number(visible.target.dataset.index));
        }
      },
      {
        rootMargin: "-34% 0px -42% 0px",
        threshold: [0.18, 0.32, 0.48, 0.64],
      },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="info" id="movement">
      <div className="info-marquee">
        <strong className="wordmark">Vehon</strong>
        <span className="dot" />
        <span>Vis et honor</span>
        <span className="dot" />
        <span>Origin</span>
        <span className="dot" />
        <span>Craft</span>
        <span className="dot" />
        <span>Form</span>
        <span className="dot" />
        <strong>Vol. 01 — Made in Italy</strong>
      </div>

      <div className="info-story">
        <aside className="info-story-sticky">
          <div>
            <p className="eyebrow">The Vehon Index</p>
            <h2>Three ideas, <em>woven into every pair.</em></h2>
            <p className="info-story-copy">
              Vehon ist auf das Wesentliche reduziert: zwei Schuh-Silhouetten, fünf Materialien, eine
              lateinische Devise. Was folgt, ist der Index — Ursprung, Handwerk und Form.
            </p>
          </div>
          <div className="info-progress" aria-label="Vehon principles progress">
            {INFO_BLOCKS.map((block, index) => (
              <div
                className={`info-progress-item${activeInfoIndex === index ? " is-active" : ""}`}
                key={block.num}
              >
                <span className="info-progress-num">{block.num}</span>
                <span>{block.plateMark}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="info-steps">
          {INFO_BLOCKS.map((block, i) => (
            <article
              className={`info-step${activeInfoIndex === i ? " is-active" : ""}`}
              data-index={i}
              key={block.num}
              ref={(node) => {
                stepRefs.current[i] = node;
              }}
            >
              <div className={`info-block-plate ${block.tone}`}>
                <span className="info-block-plate-meta">{block.plateMeta}</span>
                <span className="info-block-numeral">{block.num}</span>
                <span className="info-block-plate-mark">— {block.plateMark}</span>
                <span className="info-block-plate-arc" />
              </div>
              <div className="info-block-copy">
                <div className="info-marker">
                  <span className="info-marker-num">{block.num}</span>
                  <span className="info-marker-line" />
                  <span className="info-marker-tag">{block.tag}</span>
                </div>
                <h3>{block.heading}</h3>
                <p>{block.body}</p>
                <blockquote className="info-quote">{block.quote}</blockquote>
                <div className="info-specs">
                  {block.specs.map(([label, value]) => (
                    <div className="info-spec" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="info-manifesto">
        <div className="info-manifesto-inner">
          <p className="eyebrow">Manifesto · Etymology</p>
          <blockquote>
            <em>“Vis et honor”</em> — forza e onore. Eine römische Devise, gemacht für den Marsch
            der Legionen. Heute getragen unter dem Fuß, in zwei Schuh-Silhouetten Made in Italy.
          </blockquote>
          <div className="etymology">
            <span className="etymology-morph" tabIndex={0} aria-label="V et hon becomes Vehon">
              V<span className="etymology-space" aria-hidden="true">&nbsp;</span>e<span className="etymology-t" aria-hidden="true">t</span><span className="etymology-space" aria-hidden="true">&nbsp;</span>hon
            </span>
            <span className="etymology-hint">— hover</span>
          </div>
          <cite>— Vehon Atelier, Italy</cite>
        </div>
      </div>

      <div className="info-cta">
        <p className="info-cta-eyebrow">Vol. 01 / The Index</p>
        <p className="info-cta-text">Ready to wear less?</p>
        <a className="info-cta-link" href="#shop">Discover the collection</a>
      </div>
    </section>
  );
}

function ProductDetail({
  product,
  activeMaterial,
  activeColor,
  selectedSize,
  onMaterialChange,
  onColorChange,
  onSizeChange,
  onBack,
  onAdd,
}) {
  return (
    <main className="detail">
      <div className="detail-grid">
        <div className="detail-media">
          <img src={product.hoverImage || product.image} alt={product.name} />
          <div
            className="detail-color-bar"
            style={{ background: activeColor.hex }}
            aria-hidden="true"
          />
        </div>
        <div className="detail-panel">
          <button className="back" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span>
            Back to shop
          </button>
          <p className="eyebrow">Vehon · Made in Italy</p>
          <h1>{product.name}</h1>
          <p className="detail-sub">
            {product.subtitle} · {activeMaterial.name} · {activeColor.name}
          </p>
          <div className="detail-price">EUR {product.price}</div>

          <div className="picker">
            <div className="picker-label">
              <span>Material</span>
              <span className="picker-value">{activeMaterial.name}</span>
            </div>
            <div className="material-grid">
              {product.materials.map((material) => {
                const isActive = material.id === activeMaterial.id;
                return (
                  <button
                    key={material.id}
                    type="button"
                    className={`material-chip${isActive ? " active" : ""}`}
                    onClick={() => onMaterialChange(material.id)}
                  >
                    <span
                      className="material-chip-swatch"
                      style={{ background: material.colors[0].hex }}
                      aria-hidden="true"
                    />
                    <span className="material-chip-label">{material.short}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="picker">
            <div className="picker-label">
              <span>Color</span>
              <span className="picker-value">{activeColor.name}</span>
            </div>
            <div className="color-row">
              {activeMaterial.colors.map((color) => {
                const isActive = color.id === activeColor.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    className={`swatch swatch--detail${isActive ? " active" : ""}`}
                    style={{ background: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                    onClick={() => onColorChange(color.id)}
                  />
                );
              })}
            </div>
          </div>

          <div className="picker">
            <div className="picker-label">
              <span>Size</span>
              <span className="picker-value">{selectedSize ? `EU ${selectedSize}` : "—"}</span>
            </div>
            <div className="sizes">
              {product.sizes.map((size) => (
                <button
                  className={`size${selectedSize === size ? " active" : ""}`}
                  key={size}
                  type="button"
                  onClick={() => onSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="add-to-bag" type="button" disabled={!selectedSize} onClick={onAdd}>
            {selectedSize ? "Add to Bag" : "Select size"}
          </button>

          <p className="detail-copy">
            <strong>{activeMaterial.name}.</strong> {activeMaterial.description} {product.detailIntro}
          </p>
        </div>
      </div>
    </main>
  );
}

function BagDrawer({ bag, open, onClose, onRemove, total }) {
  return (
    <>
      <div className={`drawer-overlay${open ? " open" : ""}`} onClick={onClose} />
      <aside className={`drawer${open ? " open" : ""}`} aria-label="Warenkorb">
        <div className="drawer-head">
          <h2>Your Bag</h2>
          <button className="close" type="button" onClick={onClose} aria-label="Warenkorb schliessen">×</button>
        </div>
        <div className="drawer-body">
          {bag.length === 0 ? (
            <div className="empty">Your bag is empty.</div>
          ) : (
            bag.map((item, index) => {
              const product = PRODUCTS.find((p) => p.id === item.productId);
              if (!product) return null;
              const material = product.materials.find((m) => m.id === item.materialId);
              const color = material?.colors.find((c) => c.id === item.colorId);
              const key = `${item.productId}-${item.materialId}-${item.colorId}-${item.size}`;
              return (
                <div className="cart-row" key={key}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {material?.name}
                      {color ? ` · ${color.name}` : ""} · EU {item.size} · EUR {product.price} · Qty {item.qty}
                    </p>
                  </div>
                  <button className="remove" type="button" onClick={() => onRemove(index)} aria-label="Produkt entfernen">×</button>
                </div>
              );
            })
          )}
        </div>
        {bag.length > 0 && (
          <div className="drawer-foot">
            <div className="total">
              <span>Total</span>
              <strong>EUR {total}</strong>
            </div>
            <button className="checkout" type="button">Proceed to Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">Vehon</p>
          <p className="footer-motto">Vis et honor — forza e onore.</p>
          <p>Italienisches Handwerk in zwei Silhouetten. Mocassino & Pantofola. Made in Italy.</p>
        </div>
        <div className="footer-links">
          <a href="#shop">Shop</a>
          <a href="#story">Atelier</a>
          <a href="#movement">Vis et honor</a>
        </div>
      </div>
    </footer>
  );
}
