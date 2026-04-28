import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const FRAME_COUNT = 165;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`,
);

const PRODUCTS = [
  {
    id: 1,
    name: "WAI Home",
    subtitle: "Indoor Feel Shoe",
    price: 169,
    color: "Indigo",
    material: "IVIVI Barefoot Textile",
    category: "home",
    image: "/wai_front.jpeg",
    hoverImage: "/wai_behind.jpeg",
    tag: "Signature",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Ein leichter Feel Shoe für Zuhause, den Morgen, das Studio und alle Momente dazwischen. Flexibel, atmungsaktiv und so reduziert konstruiert, dass sich der Schuh kaum in den Vordergrund drückt.",
  },
  {
    id: 2,
    name: "WAI Travel",
    subtitle: "Packable Loafer",
    price: 179,
    color: "Deep Navy",
    material: "Flexible textile upper",
    category: "travel",
    image: "/wai1_front.jpeg",
    hoverImage: "/wai1_behind.jpeg",
    tag: "Travel",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Gemacht für Wege, Wartezeiten und leichte Routinen unterwegs. Die flexible Konstruktion lässt sich flach verstauen und bleibt trotzdem stabil genug für den ganzen Tag.",
  },
  {
    id: 3,
    name: "WAI Flex",
    subtitle: "Barefoot Technology",
    price: 189,
    color: "Blue Canvas",
    material: "IVIVI sole system",
    category: "tech",
    image: "/wai2_front.jpeg",
    hoverImage: "/wai2_behind.jpeg",
    tag: "Flexible",
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    description:
      "Die weiche, rollbare Sohle gibt dem Fuß Raum, ohne den Look eines klassischen Slippers zu verlieren. Ein ruhiger Schuh mit technischer Substanz.",
  },
  {
    id: 4,
    name: "WAI Lounge",
    subtitle: "Soft Everyday Slip-on",
    price: 159,
    color: "Washed Blue",
    material: "Soft-woven textile",
    category: "home",
    image: "/wai3_front.jpeg",
    hoverImage: "/wai3_behind.jpeg",
    tag: null,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    description:
      "Ein entspannter Slip-on für ruhige Innenräume, kurze Wege und Tage, an denen Komfort selbstverständlich sein soll.",
  },
  {
    id: 5,
    name: "WAI Studio",
    subtitle: "Natural Movement",
    price: 174,
    color: "Ocean Blue",
    material: "Breathable upper",
    category: "tech",
    image: "/wai2_front.jpeg",
    hoverImage: "/wai2_behind.jpeg",
    tag: null,
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Minimal im Aufbau, weich im Auftritt und präzise dort, wo Halt gebraucht wird. Für Training, Reisen und Alltag mit mehr Bewegungsfreiheit.",
  },
  {
    id: 6,
    name: "WAI Classic",
    subtitle: "All-day Feel Shoe",
    price: 184,
    color: "Midnight",
    material: "Flexible sole",
    category: "travel",
    image: "/wai1_front.jpeg",
    hoverImage: "/wai1_behind.jpeg",
    tag: "New",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Der vielseitige WAI Slip-on für Alltag und Wochenende. Clean genug für Reisen, weich genug für Zuhause, belastbar genug für draußen.",
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
  const [selectedSize, setSelectedSize] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openProduct(productId) {
    setSelectedSize("");
    setActiveProduct(productId);
  }

  function closeProduct() {
    setSelectedSize("");
    setActiveProduct(null);
  }

  const product = activeProduct ? PRODUCTS.find((item) => item.id === activeProduct) : null;
  const filteredProducts = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((item) => item.category === filter)),
    [filter],
  );
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

  function addToBag(productId, size) {
    setBag((current) => {
      const found = current.findIndex((item) => item.productId === productId && item.size === size);
      if (found >= 0) {
        return current.map((item, index) => (index === found ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { productId, size, qty: 1 }];
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
          products={filteredProducts}
          filter={filter}
          setFilter={setFilter}
          onOpen={openProduct}
          onQuickAdd={(productId) => {
            const quickProduct = PRODUCTS.find((item) => item.id === productId);
            addToBag(productId, quickProduct.sizes[Math.floor(quickProduct.sizes.length / 2)]);
          }}
        />
        <ScrollAnimation />
        <InfoSections />
        <Footer />
      </main>

      <AnimatePresence initial={false}>
        {product && (
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
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              onBack={closeProduct}
              onAdd={() => selectedSize && addToBag(product.id, selectedSize)}
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
      <button className="brand" onClick={onHome} aria-label="Zur Startseite">VERHON</button>
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
      <img className="hero-bg" src="/wai4-opt.jpeg" alt="WAI Feel Shoe in einer ruhigen Interior-Szene" />
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Feel shoes for natural movement</p>
          <h1>Natural freedom, refined.</h1>
          <p className="hero-text">
            WAI verbindet den Komfort eines Hausschuhs mit der Ruhe eines reduzierten Loafers:
            leicht, flexibel und gemacht für Wege drinnen, draußen und unterwegs.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#shop">Shop Collection</a>
            <a className="secondary-btn" href="#story">Discover WAI</a>
          </div>
        </div>
        <p className="hero-proof">
          IVIVI Barefoot Technology, textile Struktur und eine flexible Sohle, die den Fuß arbeiten lässt.
        </p>
      </div>
    </section>
  );
}


function Shop({ products, filter, setFilter, onOpen, onQuickAdd }) {
  const filters = [
    ["all", "All"],
    ["home", "Home"],
    ["travel", "Travel"],
    ["tech", "Flex"],
  ];

  return (
    <section className="section" id="shop">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <p className="eyebrow">WAI Collection</p>
            <h2>Clean shapes. Real comfort.</h2>
            <p className="section-note">
              Der Shop setzt die Produktbilder größer, klarer und ruhiger ein. Kein lauter Katalog,
              sondern eine kompakte Auswahl mit Fokus auf Material, Bewegung und Alltag.
            </p>
          </div>
          <div className="filters" role="tablist" aria-label="Produkte filtern">
            {filters.map(([key, label]) => (
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

        <div className="shop-grid">
          {products.map((product, index) => (
            <article
              className="product-card"
              key={product.id}
              onClick={() => onOpen(product.id)}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="product-media">
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <img className="main-img" src={product.image} alt={product.name} />
                <img className="hover-img" src={product.hoverImage} alt="" aria-hidden="true" />
                <button
                  className="quick-add"
                  type="button"
                  aria-label={`${product.name} schnell in den Warenkorb legen`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onQuickAdd(product.id);
                  }}
                >
                  +
                </button>
              </div>
              <div className="product-info">
                <div className="product-title-row">
                  <div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-sub">{product.subtitle} · {product.color}</p>
                  </div>
                  <span className="price">EUR {product.price}</span>
                </div>
                <div className="product-meta">
                  <span>{product.material}</span>
                  <span>EU {product.sizes[0]}-{product.sizes[product.sizes.length - 1]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
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
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    function drawCover(img) {
      const cw = canvas.width;
      const ch = canvas.height;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
          <p className="eyebrow">WAI Feel Shoe</p>
          <h3>Built for natural movement.</h3>
          <p>Flexible Sohle, textile Struktur und ein Gewicht, das man kaum spürt.</p>
        </div>
        <div className="scroll-anim-label">
          <p>IVIVI Barefoot Technology</p>
          <h2>Engineered<br />for motion.</h2>
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
    plateMark: "Sole",
    eyebrow: "Foundation",
    tag: "Barefoot Flex",
    heading: "A sole that thinks with the foot.",
    body: "Our IVIVI Barefoot system rolls with each step instead of dictating it — hand-measured in Florence, direct-injected in a single piece. The result feels closer to skin than to footwear.",
    quote: "“A shoe is only good when you forget you’re wearing it.”",
    specs: [
      ["Sole", "IVIVI Barefoot Flex"],
      ["Drop", "0 mm"],
      ["Weight", "from 180 g"],
      ["Build", "Direct injection"],
    ],
  },
  {
    num: "02",
    tone: "tone-navy",
    plateMeta: "Plate II",
    plateMark: "Form",
    eyebrow: "Construction",
    tag: "Packable",
    heading: "Folded down. Ready anywhere.",
    body: "Seamless construction, soft-set materials and a footprint that collapses flat — engineered for the carry-on, the studio, the long weekend. Light enough to forget, structured enough to trust.",
    quote: "“Travel means becoming lighter — even in your shoes.”",
    specs: [
      ["Format", "Folds flat"],
      ["Stitch", "Seamless"],
      ["Care", "Hand wash, 30°"],
      ["Packaging", "100% recycled"],
    ],
  },
  {
    num: "03",
    tone: "tone-clay",
    plateMeta: "Plate III",
    plateMark: "Silhouette",
    eyebrow: "Restraint",
    tag: "Quiet design",
    heading: "Less shoe. More stance.",
    body: "Reduced lines, textile surfaces, no loud logos. A silhouette that holds its own in any room — and on any street. Built in Italy, designed to disappear into the rest of what you wear.",
    quote: "“Elegance begins where volume ends.”",
    specs: [
      ["Design", "Minimal slip-on"],
      ["Palette", "Earth tones"],
      ["Textile", "Italian woven"],
      ["Origin", "Made in Italy"],
    ],
  },
];

function InfoSections() {
  const [activeInfoIndex, setActiveInfoIndex] = useState(0);
  const activeInfoIndexRef = useRef(0);
  const storyRef = useRef(null);
  const snapLockRef = useRef(false);
  const stepRefs = useRef([]);

  useEffect(() => {
    activeInfoIndexRef.current = activeInfoIndex;
  }, [activeInfoIndex]);

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

  useEffect(() => {
    function handleWheel(event) {
      if (window.innerWidth <= 980 || snapLockRef.current || Math.abs(event.deltaY) < 24) return;

      const story = storyRef.current;
      if (!story) return;

      const rect = story.getBoundingClientRect();
      const storyIsActive = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.28;
      if (!storyIsActive) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const anchor = 112;
      const stepPositions = stepRefs.current
        .map((step, index) => (step ? { index, distance: Math.abs(step.getBoundingClientRect().top - anchor) } : null))
        .filter(Boolean);
      const nearest = stepPositions.sort((a, b) => a.distance - b.distance)[0];
      const currentIndex = nearest?.index ?? activeInfoIndexRef.current;
      const currentIsAligned = (nearest?.distance ?? 0) < 72;
      const nextIndex = currentIsAligned ? currentIndex + direction : currentIndex;

      if (nextIndex < 0 || nextIndex >= INFO_BLOCKS.length) return;

      const nextStep = stepRefs.current[nextIndex];
      if (!nextStep) return;

      event.preventDefault();
      snapLockRef.current = true;
      const top = nextStep.getBoundingClientRect().top + window.scrollY - anchor;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 760);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="info" id="movement">
      <div className="info-marquee">
        <strong>The WAI Index</strong>
        <span className="dot" />
        <span>Sole</span>
        <span className="dot" />
        <span>Form</span>
        <span className="dot" />
        <span>Silhouette</span>
        <span className="dot" />
        <span>Manifesto</span>
        <span className="dot" />
        <strong>Vol. 01 — 2026</strong>
      </div>

      <div className="info-story" ref={storyRef}>
        <aside className="info-story-sticky">
          <div>
            <p className="eyebrow">The WAI Principles</p>
            <h2>Three quiet ideas, <em>built into every pair.</em></h2>
            <p className="info-story-copy">
              We don’t design sneakers. We design feel-shoes — a category that begins with the foot,
              ends with the silhouette, and passes through everything in between. What follows is the index.
            </p>
          </div>
          <div className="info-progress" aria-label="WAI principles progress">
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
          <p className="eyebrow">Manifesto</p>
          <blockquote>
            “We build shoes that feel like they were already there — <em>quiet, light,</em>
            and exactly as much shoe as the day requires.”
          </blockquote>
          <cite>— WAI Studio, Florence</cite>
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

function ProductDetail({ product, selectedSize, setSelectedSize, onBack, onAdd }) {
  return (
    <main className="detail">
      <div className="detail-grid">
        <div className="detail-media">
          <img src={product.hoverImage || product.image} alt={product.name} />
        </div>
        <div className="detail-panel">
          <button className="back" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span>
            Back to shop
          </button>
          <p className="eyebrow">{product.material}</p>
          <h1>{product.name}</h1>
          <p className="detail-sub">{product.subtitle} · {product.color}</p>
          <div className="detail-price">EUR {product.price}</div>

          <div className="size-label">Select size</div>
          <div className="sizes">
            {product.sizes.map((size) => (
              <button
                className={`size${selectedSize === size ? " active" : ""}`}
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button className="add-to-bag" type="button" disabled={!selectedSize} onClick={onAdd}>
            Add to Bag
          </button>

          <p className="detail-copy">{product.description}</p>
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
              return (
                <div className="cart-row" key={`${item.productId}-${item.size}`}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>Size {item.size} · EUR {product.price} · Qty {item.qty}</p>
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
          <p className="footer-brand">WAI</p>
          <p>Feel Shoes für natürliche Bewegung. Ruhig im Design, leicht am Fuß.</p>
        </div>
        <div className="footer-links">
          <a href="#shop">Shop</a>
          <a href="#story">Design</a>
          <a href="#movement">Movement</a>
        </div>
      </div>
    </footer>
  );
}
