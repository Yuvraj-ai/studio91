import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── DATA & CONSTANTS ────────────────────────────────────────────────────── */
const BRAND = {
  name: "Studio91",
  tagline: "Software that feels minimal, human, calm, and intentional.",
  overview:
    "Studio91 empowers users by replacing complex visual interfaces with human-centered AI, turning natural speech into effortless device automation.",
  websiteUrl: "https://studio91-gs78.vercel.app/#apps",
  values: ["Minimalism", "Human-Centeredness", "Intentionality", "Mindfulness"],
  aesthetics: [
    "Editorial Serenity",
    "Calm Digitalism",
    "Humanistic Minimalism",
    "Spacious Restraint",
    "Intentional Warmth",
  ],
  tone: ["Calm", "Intentional", "Thoughtful", "Minimal"],
  colors: [
    {
      name: "Classic Linen",
      hex: "#F5F2EC",
      rgb: "245, 242, 236",
      cmyk: "0%, 1%, 4%, 4%",
      hsl: "40, 31%, 94%",
      role: "Base Canvas",
    },
    {
      name: "Jet Black",
      hex: "#0D0D0D",
      rgb: "13, 13, 13",
      cmyk: "0%, 0%, 0%, 95%",
      hsl: "0, 0%, 5%",
      role: "Editorial Contrast",
    },
    {
      name: "Electric Chartreuse",
      hex: "#C8FF00",
      rgb: "200, 255, 0",
      cmyk: "22%, 0%, 100%, 0%",
      hsl: "73, 100%, 50%",
      role: "Tactile Accent",
    },
  ],
  logo: "/logo_studio91.png",
};

const TEAM = [
  {
    name: "Rahul Sharma",
    role: "Product & Engineering",
    initials: "RS",
    intro:
      "Drives product direction and engineering decisions, pioneering human-centered AI that turns speech into seamless workflows.",
  },
  {
    name: "Virendra Chaudhary",
    role: "Frontend & Mobile",
    initials: "VC",
    intro:
      "Crafts smooth, minimal, and highly polished mobile interfaces using React Native, focused on editorial elegance and tactile delight.",
  },
];

const APP = {
  name: "Slow",
  tagline: "Less noise. More clarity.",
  desc: "A calm breathing and mindfulness experience designed for busy people seeking fewer distractions, spacious restraint, and daily presence.",
  tags: ["React Native", "Expo", "Mindfulness", "Calm Digitalism"],
};

const CAMPAIGNS = [
  {
    id: "restraint",
    label: "Deliberate Restraint",
    title: "Deliberate Restraint & Tactile Clarity",
    description:
      "Highlight the deliberate restraint and calm human-centered design behind Studio91 digital products. By focusing on macro visual details, crisp typography, and tactile interface textures, this campaign demonstrates how thoughtful digital tools respect user attention and bring quiet clarity back to daily workflows.",
    creatives: [
      {
        id: "c1-1",
        title: "Quiet Software for Mindful Living",
        subtitle: "Humanistic Minimalism",
        fileName: "resource_a0KlZd5FcPn9e-ScY6IOpc.png",
      },
      {
        id: "c1-2",
        title: "Designed to Calm, Not Clutter",
        subtitle: "Editorial Serenity",
        fileName: "resource_9Tto2wfDfdN5Pv5HNCp4R1.png",
      },
      {
        id: "c1-3",
        title: "Precision in Every Pixel",
        subtitle: "Tactile Restraint",
        fileName: "resource_ahogatRrCFN8irXRbpF_rx.png",
      },
      {
        id: "c1-4",
        title: "Reclaim Your Focus Daily",
        subtitle: "Spacious Clarity",
        fileName: "resource_agL8jBXdWRufe1axZu__Tv.png",
      },
    ],
  },
  {
    id: "mental-health",
    label: "Mental Health Day",
    title: "World Mental Health Day · Digital Restraint",
    description:
      "In honor of World Mental Health Day, disconnect from digital overload and experience software designed with quiet restraint to safeguard your daily focus.",
    creatives: [
      {
        id: "c2-1",
        title: "The noise stops when you decide.",
        subtitle: "Digital Detox",
        fileName: "resource_9Kr5NP820U03JgXm6HA_sX.png",
      },
      {
        id: "c2-2",
        title: "Software designed to leave you alone.",
        subtitle: "Quiet Interfaces",
        fileName: "resource_bH2OIoEMPcc74DP33VX_hK.png",
      },
      {
        id: "c2-3",
        title: "Trade friction for flow state.",
        subtitle: "Effortless Flow",
        fileName: "resource_9UAVEaItNl69peh59jkkas.png",
      },
      {
        id: "c2-4",
        title: "Restore peace to your screen.",
        subtitle: "Inner Stillness",
        fileName: "resource_9XNkaeASLGa819N6Uf6kH_.png",
      },
    ],
  },
  {
    id: "wellness",
    label: "Digital Wellness",
    title: "Digital Wellness & Intentional Living",
    description:
      "Connect deeply with a modern audience seeking digital wellness and mindful living. This campaign highlights intentional, human-centered software designed to respect your time, attention, and inner peace.",
    creatives: [
      {
        id: "c3-1",
        title: "Reclaiming Calm in Digital Spaces",
        subtitle: "Intentional Warmth",
        fileName: "resource_b5pErdpAqq76r-rUXXl4Fi.png",
      },
      {
        id: "c3-2",
        title: "Designed to Respect Your Focus",
        subtitle: "Attention Architecture",
        fileName: "resource_auBJFLU4FN-dpJTJT9DOYv.png",
      },
      {
        id: "c3-3",
        title: "Return to What Truly Matters",
        subtitle: "Spacious Living",
        fileName: "resource_aIn-tUfyHgY33A0RcgUOn8.png",
      },
      {
        id: "c3-4",
        title: "Mindful Living Starts Here",
        subtitle: "Daily Presence",
        fileName: "resource_8AppSKzaB0Ieo7iM9Bj_-m.png",
      },
    ],
  },
];

/* ─── EMAILJS CONFIG ──────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID = "service_ozzpa1d";
const EMAILJS_TEMPLATE_ID = "template_uy9h0yi";
const EMAILJS_PUBLIC_KEY = "Or8WawFxe2jXw-BKW";

async function sendContactEmail({ name, email, message }) {
  if (!window.emailjs) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  return window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: name,
    from_email: email,
    message,
    to_name: "Studio91",
  });
}

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F5F2EC;
    --ink: #0D0D0D;
    --ink-mid: #3A3830;
    --ink-muted: #6B6860;
    --accent: #C8FF00;
    --accent-dark: #9DC400;
    --accent-soft: rgba(200,255,0,0.15);
    --rule: rgba(13,13,13,0.1);
    --rule-strong: rgba(13,13,13,0.16);
    --serif: 'DM Serif Display', Georgia, serif;
    --mono: 'DM Mono', 'Courier New', monospace;
    --sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    /* ── Fluid Glass tokens ── */
    --glass-bg: rgba(255,255,255,0.58);
    --glass-bg-heavy: rgba(255,255,255,0.76);
    --glass-border: rgba(255,255,255,0.8);
    --glass-border-subtle: rgba(255,255,255,0.45);
    --glass-shadow: 0 10px 36px rgba(13,13,13,0.06),
                    0 2px 6px rgba(13,13,13,0.03),
                    inset 0 1px 0 rgba(255,255,255,0.95),
                    inset 0 -1px 0 rgba(13,13,13,0.04);
    --glass-shadow-hover: 0 20px 50px rgba(13,13,13,0.12),
                          inset 0 1px 0 rgba(255,255,255,1);
    --glass-blur: blur(28px) saturate(180%);
    --glass-blur-heavy: blur(42px) saturate(200%);
    --radius-card: 22px;
    --radius-pill: 999px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--mono);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    min-height: 100vh;
  }

  :focus-visible {
    outline: 2px solid var(--accent-dark);
    outline-offset: 3px;
    border-radius: 4px;
  }

  ::selection { background: var(--accent); color: var(--ink); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: var(--ink-muted); border-radius: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  a { color: inherit; text-decoration: none; }

  .noise {
    position: fixed; inset: 0; z-index: 1; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.024;
  }

  /* ── Fluid Glass utilities ── */
  .glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    box-shadow: var(--glass-shadow);
    border-radius: var(--radius-card);
    transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .glass:hover { box-shadow: var(--glass-shadow-hover); }

  .glass-heavy {
    background: var(--glass-bg-heavy);
    border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur-heavy);
    -webkit-backdrop-filter: var(--glass-blur-heavy);
    box-shadow: var(--glass-shadow);
    border-radius: var(--radius-card);
  }

  .pill {
    display: inline-block; padding: 5px 13px;
    background: var(--ink); color: var(--bg);
    font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
    border-radius: 3px; font-family: var(--mono);
  }

  .pill-glass {
    display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    box-shadow: var(--glass-shadow);
    border-radius: var(--radius-pill);
    font-size: 10px; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--ink-mid); font-family: var(--mono);
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .pill-glass:hover { box-shadow: var(--glass-shadow-hover); transform: translateY(-1px); }

  .tag {
    display: inline-block; padding: 6px 13px;
    border: 1px solid var(--rule-strong); border-radius: 4px;
    font-size: 10px; letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--ink-muted); transition: border-color 0.2s, color 0.2s;
    font-family: var(--mono); cursor: default;
  }
  .tag:hover { border-color: var(--ink); color: var(--ink); }

  .hr { border: none; border-top: 1px solid var(--rule); }

  /* ── Marquee ── */
  .marquee-wrap { overflow: hidden; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); padding: 16px 0; user-select: none; }
  .marquee-track { display: flex; gap: 52px; width: max-content; animation: marquee 32s linear infinite; }
  .marquee-item { display: flex; align-items: center; gap: 18px; white-space: nowrap; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-muted); font-family: var(--mono); }
  .mdot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent-dark); flex-shrink: 0; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) {
    .marquee-track { animation: none; }
  }

  /* ── Cursor blink ── */
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .cursor { display: inline-block; width: 2px; height: 0.9em; background: var(--ink); vertical-align: middle; margin-left: 3px; animation: blink 1s step-end infinite; }

  /* ── Nav ── */
  .nav-link { font-size: 11px; letter-spacing: 0.13em; text-transform: uppercase; color: var(--ink-muted); transition: color 0.2s; padding: 4px 0; position: relative; }
  .nav-link::after { content:''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--ink); transition: width 0.25s; }
  .nav-link:hover { color: var(--ink); }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .nav-link.active { color: var(--ink); }

  /* ── Creative poster card ── */
  .creative-card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    background: #EAE6DD;
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: var(--glass-shadow);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }
  .creative-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 24px 60px rgba(13,13,13,0.14), inset 0 1px 0 rgba(255,255,255,1);
  }
  .creative-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 9 / 16;
    overflow: hidden;
    background: #111;
  }
  .creative-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s;
  }
  .creative-card:hover .creative-img {
    transform: scale(1.035);
  }
  .creative-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(13,13,0,0.02) 40%, rgba(13,13,13,0.85) 100%);
    opacity: 0.88;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .creative-card:hover .creative-overlay {
    opacity: 0.94;
  }
  .creative-meta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 22px 20px;
    color: var(--bg);
    z-index: 2;
  }

  /* ── Filter button ── */
  .filter-btn {
    padding: 9px 20px;
    border-radius: var(--radius-pill);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-family: var(--mono);
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.25s;
    background: transparent;
    color: var(--ink-muted);
  }
  .filter-btn:hover {
    color: var(--ink);
    border-color: var(--rule-strong);
  }
  .filter-btn.active {
    background: var(--ink);
    color: var(--bg);
    box-shadow: 0 4px 14px rgba(13,13,13,0.15);
  }

  /* ── Form card specific ── */
  .contact-card {
    background: linear-gradient(145deg,
      rgba(255,255,255,0.72) 0%,
      rgba(245,242,236,0.6) 50%,
      rgba(255,255,255,0.68) 100%);
    border: 1px solid rgba(255,255,255,0.85);
    backdrop-filter: blur(36px) saturate(200%) brightness(1.04);
    -webkit-backdrop-filter: blur(36px) saturate(200%) brightness(1.04);
    box-shadow:
      0 20px 60px rgba(13,13,13,0.09),
      0 2px 8px rgba(13,13,13,0.06),
      inset 0 1.5px 0 rgba(255,255,255,1),
      inset 0 -1px 0 rgba(13,13,13,0.05);
    border-radius: 28px;
    position: relative;
    overflow: hidden;
  }

  .field {
    width: 100%; background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.75);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-radius: 12px; padding: 14px 16px;
    font-family: var(--mono); font-size: 14px; color: var(--ink);
    outline: none; transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
    resize: none; box-shadow: inset 0 1px 3px rgba(13,13,13,0.04);
  }
  .field::placeholder { color: var(--ink-muted); opacity: 0.8; }
  .field:focus {
    border-color: rgba(157,196,0,0.6);
    background: rgba(255,255,255,0.78);
    box-shadow: 0 0 0 3px rgba(200,255,0,0.15), inset 0 1px 3px rgba(13,13,13,0.02);
  }
  .field:hover:not(:focus) { border-color: rgba(13,13,13,0.2); }

  .field-label {
    display: block; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ink-muted); margin-bottom: 7px; font-family: var(--mono);
  }

  .send-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    background: var(--ink); color: var(--bg);
    border: none; border-radius: var(--radius-pill);
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    font-family: var(--mono); font-weight: 500;
    cursor: pointer; transition: all 0.25s;
    box-shadow: 0 4px 16px rgba(13,13,13,0.2);
    position: relative; overflow: hidden;
  }
  .send-btn:hover { background: #1a1a0a; box-shadow: 0 8px 28px rgba(13,13,13,0.28); transform: translateY(-1px); }
  .send-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  /* ── Layout sections ── */
  .section { padding: clamp(56px,10vw,120px) clamp(20px,5vw,56px); }
  .grid-1-2 { display: grid; grid-template-columns: 1fr 2fr; gap: clamp(28px,6vw,80px); align-items: start; }
  .grid-1-14 { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(28px,6vw,80px); align-items: start; }
  .grid-app { display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }

  .app-left { padding: clamp(28px,5vw,64px) clamp(22px,4vw,56px); border-right: 1px solid var(--rule); display: flex; flex-direction: column; justify-content: space-between; gap: 28px; min-height: 300px; }
  .app-right { background: var(--ink); display: flex; align-items: center; justify-content: center; position: relative; min-height: 260px; overflow: hidden; }

  .about-row { display: grid; grid-template-columns: 36px 1fr; gap: clamp(12px,3vw,24px); padding: clamp(22px,4vw,36px) 0; border-bottom: 1px solid var(--rule); transition: padding-left 0.25s; }
  .about-row:hover { padding-left: 8px; }

  .team-row { display: grid; grid-template-columns: 52px 1fr auto; gap: clamp(12px,3vw,24px); align-items: center; padding: clamp(22px,4vw,36px) 0; border-bottom: 1px solid var(--rule); cursor: default; transition: padding-left 0.25s; }
  .team-row:hover { padding-left: 8px; }
  .team-role { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-muted); white-space: nowrap; }

  /* ── Lightbox overlay ── */
  .lightbox-overlay {
    position: fixed; inset: 0; z-index: 500;
    background: rgba(10,10,10,0.88);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    display: flex; align-items: center; justify-content: center;
    padding: clamp(16px, 4vw, 40px);
  }

  /* ── Mobile menu ── */
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: transparent; border: none; padding: 8px; border-radius: 4px; }
  .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--ink); border-radius: 2px; transition: transform 0.25s, opacity 0.25s; }
  .mobile-menu { position: fixed; inset: 0; z-index: 350; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; }

  .field-error { font-size: 10px; color: #c0392b; letter-spacing: 0.08em; margin-top: 5px; font-family: var(--mono); }

  @media (max-width: 920px) {
    .grid-1-2, .grid-1-14 { grid-template-columns: 1fr; }
    .team-role { display: none; }
    .team-row { grid-template-columns: 48px 1fr; }
  }
  @media (max-width: 680px) {
    .grid-app { grid-template-columns: 1fr; }
    .app-left { border-right: none; border-bottom: 1px solid var(--rule); min-height: unset; }
    .app-right { min-height: 220px; }
    .hamburger { display: flex; }
    .nav-desktop { display: none !important; }
  }
  @media (min-width: 681px) { .hamburger { display: none !important; } }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    .cursor { animation: none; opacity: 1; }
  }
`;

/* ─── FADE-IN WRAPPER ─────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 22 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}


/* ─── LIGHTBOX MODAL ──────────────────────────────────────────────────────── */
function LightboxModal({ creative, campaignTitle, onClose, onPrev, onNext }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!creative) return null;

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={creative.title}
    >
      {/* Close button */}
      <motion.button
        onClick={onClose}
        aria-label="Close preview"
        whileHover={{ backgroundColor: "var(--accent)", color: "var(--ink)", borderColor: "var(--accent)" }}
        style={{
          position: "fixed", top: 20, right: 24, zIndex: 510,
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", transition: "all 0.2s",
        }}
      >
        ✕
      </motion.button>

      {/* Prev / Next Nav */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous creative"
        whileHover={{ backgroundColor: "var(--accent)", color: "var(--ink)", borderColor: "var(--accent)" }}
        style={{
          position: "fixed", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 510,
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", transition: "all 0.2s",
        }}
      >
        ‹
      </motion.button>
      <motion.button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next creative"
        whileHover={{ backgroundColor: "var(--accent)", color: "var(--ink)", borderColor: "var(--accent)" }}
        style={{
          position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 510,
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", transition: "all 0.2s",
        }}
      >
        ›
      </motion.button>

      {/* Main card */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        style={{
          maxHeight: "90vh",
          maxWidth: "min(520px, 86vw)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 22,
          overflow: "hidden",
          background: "#141414",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15)",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxHeight: "72vh", overflow: "hidden", background: "#000" }}>
          <img
            src={`${process.env.PUBLIC_URL}/creatives/${creative.fileName}`}
            alt={creative.title}
            style={{ width: "100%", height: "100%", maxHeight: "72vh", objectFit: "contain", display: "block" }}
          />
        </div>
        <div style={{ padding: "20px 24px", color: "var(--bg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--mono)" }}>
              {campaignTitle}
            </span>
            <span style={{ color: "rgba(245,242,236,0.3)" }}>·</span>
            <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,242,236,0.5)", fontFamily: "var(--mono)" }}>
              {creative.subtitle}
            </span>
          </div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", color: "#fff" }}>
            {creative.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── NAV ─────────────────────────────────────────────────────────────────── */
function Nav({ active }) {
  const links = ["about", "apps", "campaigns", "team", "contact"];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 clamp(20px,5vw,56px)", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(245,242,236,0.76)" : "transparent",
          backdropFilter: scrolled ? "blur(28px) saturate(190%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(190%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.7)" : "1px solid transparent",
          boxShadow: scrolled
            ? "0 2px 24px rgba(13,13,13,0.05), inset 0 -1px 0 rgba(255,255,255,0.55)"
            : "none",
          transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s",
        }}
      >
        {/* Brand with logo */}
        <a
          href="#home"
          aria-label="Studio91 home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src={process.env.PUBLIC_URL + BRAND.logo}
            alt="Studio91 Emblem"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              objectFit: "contain",
              boxShadow: "0 2px 8px rgba(13,13,13,0.08)",
            }}
          />
          <span style={{ fontFamily: "var(--serif)", fontSize: 20, letterSpacing: "-0.02em", fontWeight: 400 }}>
            Studio<span style={{ color: "var(--accent-dark)" }}>91</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: "flex", gap: "clamp(16px,2.2vw,28px)", alignItems: "center" }}>
          {links.map((l) => (
            <a key={l} href={`#${l}`} className={`nav-link ${active === l ? "active" : ""}`} aria-current={active === l ? "true" : undefined}>
              {l}
            </a>
          ))}

          <motion.a
            href="#contact"
            whileHover={{ backgroundColor: "var(--accent-dark)" }}
            style={{
              display: "inline-block", padding: "9px 18px",
              background: "var(--ink)", color: "var(--bg)",
              fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase",
              borderRadius: 3, transition: "background 0.2s",
            }}
          >
            Work with us
          </motion.a>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              background: "rgba(245,242,236,0.92)",
              backdropFilter: "blur(36px) saturate(210%)",
              WebkitBackdropFilter: "blur(36px) saturate(210%)",
              borderBottom: "1px solid rgba(255,255,255,0.7)",
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              style={{
                position: "absolute", top: 16, right: 20,
                width: 44, height: 44, background: "transparent",
                border: "1px solid var(--rule-strong)", borderRadius: 3,
                fontSize: 15, cursor: "pointer", fontFamily: "var(--mono)", color: "var(--ink)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ✕
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <img
                src={process.env.PUBLIC_URL + BRAND.logo}
                alt="Studio91 Logo"
                style={{ width: 36, height: 36, borderRadius: 8 }}
              />
              <span style={{ fontFamily: "var(--serif)", fontSize: 24 }}>
                Studio<span style={{ color: "var(--accent-dark)" }}>91</span>
              </span>
            </div>
            {links.map((l) => (
              <a
                key={l}
                href={`#${l}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(26px,7vw,42px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  textTransform: "capitalize",
                }}
              >
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── MARQUEE ─────────────────────────────────────────────────────────────── */
function Marquee() {
  const items = [
    "Human-Centered AI",
    "Speech to Automation",
    "Editorial Serenity",
    "Calm Digitalism",
    "Humanistic Minimalism",
    "Spacious Restraint",
    "Intentional Warmth",
    "Mindfulness",
    "Studio91",
    "Jaipur, IN",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            <span className="mdot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────────────── */
const HERO_WORDS = ["human.", "calm.", "intentional.", "thoughtful.", "minimal."];

function Hero() {
  const [typed, setTyped] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = HERO_WORDS[wi];
    let t;
    if (!deleting && typed.length < word.length) {
      t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80);
    } else if (!deleting && typed.length === word.length) {
      t = setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && typed.length > 0) {
      t = setTimeout(() => setTyped(typed.slice(0, -1)), 44);
    } else {
      setDeleting(false);
      setWi((wi + 1) % HERO_WORDS.length);
    }
    return () => clearTimeout(t);
  }, [typed, deleting, wi]);

  return (
    <section
      id="home"
      aria-label="Hero — Studio91 digital product studio"
      style={{
        minHeight: "100svh",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "96px clamp(20px,5vw,56px) clamp(44px,8vw,80px)",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="nav-desktop"
        style={{ position: "absolute", top: 86, right: "clamp(20px,5vw,56px)", textAlign: "right" }}
        aria-hidden="true"
      >
        <div style={{ fontSize: 10, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 2.2 }}>
          <div>Jaipur, IN</div>
          <div>Est. 2024</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginTop: 4, color: "var(--ink)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
            Available for projects
          </div>
        </div>
      </motion.div>

      <FadeIn delay={0.05}>
        <div className="pill-glass" style={{ marginBottom: 26, width: "fit-content" }}>
          <img
            src={process.env.PUBLIC_URL + BRAND.logo}
            alt=""
            style={{ width: 16, height: 16, borderRadius: 3, objectFit: "contain" }}
          />
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
          Human-Centered AI & Digital Product Studio
        </div>
      </FadeIn>

      <FadeIn delay={0.17}>
        <h1 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(44px,9.5vw,120px)",
          lineHeight: 0.94, letterSpacing: "-0.03em",
          fontWeight: 400, marginBottom: 32,
        }}>
          Software that<br />
          feels{" "}
          <span style={{ fontStyle: "italic", color: "var(--ink-muted)" }} aria-live="polite" aria-label={`feels ${typed}`}>
            {typed}<span className="cursor" aria-hidden="true" />
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <p style={{ fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.8, color: "var(--ink-mid)", maxWidth: 520, fontFamily: "var(--sans)" }}>
            {BRAND.overview}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <motion.a href="#campaigns" whileHover={{ backgroundColor: "var(--accent)", color: "var(--ink)" }}
              style={{ padding: "13px 24px", background: "var(--ink)", color: "var(--bg)", fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase", borderRadius: 3, transition: "all 0.2s" }}>
              Explore campaigns
            </motion.a>
            <motion.a href="#apps" whileHover={{ borderColor: "var(--ink)", color: "var(--ink)" }}
              style={{ padding: "13px 24px", border: "1px solid var(--rule-strong)", fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase", borderRadius: 3, color: "var(--ink-muted)", transition: "all 0.2s" }}>
              Our products
            </motion.a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── ABOUT ───────────────────────────────────────────────────────────────── */
function About() {
  const principles = [
    {
      n: "01",
      title: "Humanistic Minimalism",
      body: "Replacing complex visual interfaces with human-centered AI. We strip away friction until natural speech translates into effortless device automation.",
    },
    {
      n: "02",
      title: "Spacious Restraint",
      body: "Deliberate negative space and tactile interface textures that respect your time, attention, and cognitive peace.",
    },
    {
      n: "03",
      title: "Intentional Warmth",
      body: "Technology that feels calm, gentle, and grounding — built around genuine digital wellness rather than manufactured urgency.",
    },
  ];

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <hr className="hr" style={{ marginBottom: "clamp(36px,7vw,80px)" }} />
      <div className="grid-1-2">
        <FadeIn>
          <div className="pill" style={{ marginBottom: 18 }}>Philosophy</div>
          <h2 id="about-heading" style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,50px)", lineHeight: 1.06, fontWeight: 400, letterSpacing: "-0.02em" }}>
            Editorial serenity,<br /><em>calm digitalism.</em>
          </h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,14px)", color: "var(--ink-muted)", lineHeight: 1.8, fontFamily: "var(--sans)", marginTop: 18, maxWidth: 380 }}>
            {BRAND.overview}
          </p>
        </FadeIn>
        <div>
          {principles.map((p, i) => (
            <FadeIn key={p.n} delay={i * 0.09}>
              <div className="about-row">
                <span style={{ fontSize: 10, color: "var(--ink-muted)", letterSpacing: "0.1em", paddingTop: 5 }} aria-hidden="true">{p.n}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(17px,2.4vw,22px)", fontWeight: 400, marginBottom: 8, letterSpacing: "-0.01em" }}>{p.title}</h3>
                  <p style={{ fontSize: "clamp(13px,1.4vw,14px)", color: "var(--ink-muted)", lineHeight: 1.8, fontFamily: "var(--sans)" }}>{p.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ─── Brand Book Identity Showcase ─── */}
      <FadeIn delay={0.2}>
        <div
          style={{
            marginTop: "clamp(48px,8vw,80px)",
            padding: "clamp(32px,5vw,60px) clamp(24px,4vw,48px)",
            background: "linear-gradient(150deg, rgba(255,255,255,0.7) 0%, rgba(245,242,236,0.55) 50%, rgba(255,255,255,0.65) 100%)",
            border: "1px solid rgba(255,255,255,0.85)",
            borderRadius: 24,
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            boxShadow: "var(--glass-shadow)",
          }}
        >
          {/* Centered Brand Motto & Swatches from Page 2 */}
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto clamp(36px,6vw,60px)" }}>
            <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", display: "block", marginBottom: 14 }}>
              Brand Book · Core Premise
            </span>
            <blockquote style={{ fontFamily: "var(--mono)", fontSize: "clamp(24px,4.5vw,44px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.2, marginBottom: 24 }}>
              "Software that<br />feels human."
            </blockquote>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "8px 18px", borderRadius: 999, background: "rgba(13,13,13,0.04)", border: "1px solid var(--rule)" }}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#F5F2EC", border: "1px solid rgba(13,13,13,0.2)", display: "inline-block" }} title="Classic Linen #F5F2EC" />
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#0D0D0D", display: "inline-block" }} title="Jet Black #0D0D0D" />
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#C8FF00", border: "1px solid rgba(13,13,13,0.1)", display: "inline-block" }} title="Electric Chartreuse #C8FF00" />
              <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mid)" }}>
                Classic Linen · Jet Black · Electric Chartreuse
              </span>
            </div>
          </div>

          {/* Values Bar from Page 6 */}
          <div style={{
            textAlign: "center",
            padding: "20px 24px",
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: 14,
            marginBottom: 32,
          }}>
            <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", display: "block", marginBottom: 8 }}>
              Values
            </span>
            <p style={{ fontFamily: "var(--mono)", fontSize: "clamp(13px,1.8vw,17px)", color: "var(--ink)", letterSpacing: "0.02em" }}>
              "{BRAND.values.join(", ")}"
            </p>
          </div>

          {/* Side-by-Side Cards: Aesthetic & Tone of Voice from Page 6 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 36 }}>
            {/* Aesthetic card */}
            <div style={{
              padding: "28px 26px",
              background: "linear-gradient(145deg, rgba(200,255,0,0.1) 0%, rgba(255,255,255,0.55) 100%)",
              border: "1px solid rgba(200,255,0,0.25)",
              borderRadius: 18,
            }}>
              <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-mid)", display: "block", marginBottom: 16 }}>
                Aesthetic
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {BRAND.aesthetics.map((a) => (
                  <li key={a} style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px,2.2vw,22px)", color: "var(--ink)", letterSpacing: "-0.01em" }}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tone of Voice card */}
            <div style={{
              padding: "28px 26px",
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.8)",
              borderRadius: 18,
            }}>
              <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", display: "block", marginBottom: 16 }}>
                Tone of Voice
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {BRAND.tone.map((t) => (
                  <li key={t} style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px,2.2vw,22px)", color: "var(--ink-mid)", letterSpacing: "-0.01em" }}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Color Palette Detailed Breakdown from Page 5 */}
          <div>
            <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", display: "block", marginBottom: 16 }}>
              Color Palette · Chromatic Intentionality
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {BRAND.colors.map((c) => (
                <div
                  key={c.name}
                  style={{
                    padding: "18px 20px",
                    background: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.75)",
                    borderRadius: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: c.hex, border: c.hex === "#F5F2EC" ? "1px solid rgba(13,13,13,0.15)" : "none", boxShadow: "0 2px 8px rgba(13,13,13,0.06)" }} />
                    <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", fontFamily: "var(--mono)" }}>{c.role}</span>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 400, color: "var(--ink)", marginBottom: 4 }}>{c.name}</h4>
                    <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-mid)", lineHeight: 1.6 }}>
                      <div>HEX: {c.hex}</div>
                      <div>RGB: {c.rgb}</div>
                      <div>HSL: {c.hsl}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── APPS ────────────────────────────────────────────────────────────────── */
function Apps() {
  return (
    <section id="apps" className="section" aria-labelledby="apps-heading">
      <hr className="hr" style={{ marginBottom: "clamp(36px,7vw,80px)" }} />
      <FadeIn>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: "clamp(28px,5vw,52px)" }}>
          <div>
            <div className="pill" style={{ marginBottom: 14 }}>Products</div>
            <h2 id="apps-heading" style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.06 }}>
              Thoughtfully crafted<br /><em>for real people.</em>
            </h2>
          </div>
          <span style={{ fontSize: 10, color: "var(--ink-muted)", letterSpacing: "0.1em" }} aria-hidden="true">01 / 01</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.28 }}
          className="grid-app"
          style={{ border: "1px solid var(--rule-strong)", borderRadius: 16, overflow: "hidden" }}
        >
          <div className="app-left">
            <div>
              <div style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: 26,
                background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
                backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
                boxShadow: "var(--glass-shadow)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--serif)", fontSize: 22, fontStyle: "italic", color: "var(--ink)",
              }} aria-hidden="true">
                S
              </div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,5vw,46px)", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 8 }}>
                {APP.name}
              </h3>
              <p style={{ fontSize: 13, color: "var(--ink-muted)", fontStyle: "italic", marginBottom: 14, letterSpacing: "0.04em" }}>{APP.tagline}</p>
              <p style={{ fontSize: "clamp(12px,1.4vw,14px)", color: "var(--ink-muted)", lineHeight: 1.8, fontFamily: "var(--sans)", maxWidth: 360 }}>{APP.desc}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }} role="list" aria-label="Technologies">
              {APP.tags.map((t) => <span key={t} className="tag" role="listitem">{t}</span>)}
            </div>
          </div>

          <div className="app-right" aria-hidden="true">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.55, 1], opacity: [0.18, 0.04, 0.18] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: 150 + i * 80, height: 150 + i * 80,
                  borderRadius: "50%",
                  border: `1px solid rgba(200,255,0,${0.28 / i})`,
                }}
              />
            ))}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 72, height: 72, borderRadius: "50%", zIndex: 2,
                background: "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.4), rgba(200,255,0,0.72) 55%, rgba(157,196,0,0.92))",
                border: "1px solid rgba(255,255,255,0.45)",
                backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 8px 36px rgba(200,255,0,0.38), inset 0 1px 0 rgba(255,255,255,0.55)",
              }}
            />
            <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,242,236,0.22)" }}>
              Breathe · Focus
            </div>
            <div style={{
              position: "absolute", top: 18, right: 18,
              padding: "7px 14px",
              background: "rgba(245,242,236,0.07)", border: "1px solid rgba(245,242,236,0.15)",
              backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
              color: "rgba(245,242,236,0.6)",
              fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
              borderRadius: 999, fontFamily: "var(--mono)",
            }}>
              Coming soon
            </div>
          </div>
        </motion.div>
      </FadeIn>
    </section>
  );
}

/* ─── CAMPAIGNS & CREATIVES SECTION ───────────────────────────────────────── */
function Campaigns() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeCreative, setActiveCreative] = useState(null);

  const allCreatives = CAMPAIGNS.flatMap((c) =>
    c.creatives.map((item) => ({
      ...item,
      campaignId: c.id,
      campaignLabel: c.label,
      campaignTitle: c.title,
      campaignDesc: c.description,
    }))
  );

  const filteredCreatives =
    selectedFilter === "all"
      ? allCreatives
      : allCreatives.filter((c) => c.campaignId === selectedFilter);

  const currentCampaign = CAMPAIGNS.find((c) => c.id === selectedFilter);

  const handleOpen = (item) => setActiveCreative(item);
  const handleClose = () => setActiveCreative(null);

  const handlePrev = () => {
    if (!activeCreative) return;
    const currentIndex = filteredCreatives.findIndex((c) => c.id === activeCreative.id);
    const prevIndex = (currentIndex - 1 + filteredCreatives.length) % filteredCreatives.length;
    setActiveCreative(filteredCreatives[prevIndex]);
  };

  const handleNext = () => {
    if (!activeCreative) return;
    const currentIndex = filteredCreatives.findIndex((c) => c.id === activeCreative.id);
    const nextIndex = (currentIndex + 1) % filteredCreatives.length;
    setActiveCreative(filteredCreatives[nextIndex]);
  };

  return (
    <section id="campaigns" className="section" aria-labelledby="campaigns-heading">
      <hr className="hr" style={{ marginBottom: "clamp(36px,7vw,80px)" }} />

      <FadeIn>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: "clamp(24px,4vw,44px)" }}>
          <div>
            <div className="pill" style={{ marginBottom: 14 }}>Campaigns</div>
            <h2 id="campaigns-heading" style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.06 }}>
              Visual narratives of<br /><em>quiet restraint.</em>
            </h2>
          </div>
          <p style={{ fontSize: "clamp(13px,1.4vw,14px)", color: "var(--ink-muted)", maxWidth: 440, lineHeight: 1.7, fontFamily: "var(--sans)" }}>
            Explore editorial posters and brand expressions crafted around digital wellness, human-centered AI, and the beauty of peaceful interfaces.
          </p>
        </div>
      </FadeIn>

      {/* Filter Tabs */}
      <FadeIn delay={0.1}>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 28,
            padding: "8px 12px",
            background: "rgba(255,255,255,0.45)",
            border: "1px solid rgba(255,255,255,0.65)",
            borderRadius: 999,
            width: "fit-content",
            backdropFilter: "blur(12px)",
          }}
          role="tablist"
          aria-label="Filter campaigns"
        >
          <button
            role="tab"
            aria-selected={selectedFilter === "all"}
            className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
            onClick={() => setSelectedFilter("all")}
          >
            All Works ({allCreatives.length})
          </button>
          {CAMPAIGNS.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={selectedFilter === c.id}
              className={`filter-btn ${selectedFilter === c.id ? "active" : ""}`}
              onClick={() => setSelectedFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Selected Campaign Context Banner */}
        {currentCampaign && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass"
            style={{
              padding: "18px 24px",
              marginBottom: 36,
              borderRadius: 14,
              borderLeft: "3px solid var(--accent-dark)",
            }}
          >
            <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontFamily: "var(--mono)", display: "block", marginBottom: 6 }}>
              Campaign Premise
            </span>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--ink-mid)", fontFamily: "var(--sans)" }}>
              {currentCampaign.description}
            </p>
          </motion.div>
        )}
      </FadeIn>

      {/* Creatives Grid */}
      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "clamp(20px, 3vw, 32px)",
        }}
      >
        <AnimatePresence>
          {filteredCreatives.map((item, i) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="creative-card"
              onClick={() => handleOpen(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen(item)}
              aria-label={`View ${item.title}`}
            >
              <div className="creative-img-wrap">
                <img
                  src={`${process.env.PUBLIC_URL}/creatives/${item.fileName}`}
                  alt={item.title}
                  loading="lazy"
                  className="creative-img"
                />
                <div className="creative-overlay" />
                <div className="creative-meta">
                  <span style={{
                    display: "inline-block",
                    fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--accent)", marginBottom: 6, fontFamily: "var(--mono)"
                  }}>
                    {item.subtitle}
                  </span>
                  <h3 style={{
                    fontFamily: "var(--serif)", fontSize: "clamp(18px,2vw,22px)",
                    fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.15,
                  }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeCreative && (
          <LightboxModal
            creative={activeCreative}
            campaignTitle={activeCreative.campaignLabel}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── TEAM ────────────────────────────────────────────────────────────────── */
function Team() {
  return (
    <section id="team" className="section" aria-labelledby="team-heading">
      <hr className="hr" style={{ marginBottom: "clamp(36px,7vw,80px)" }} />
      <div className="grid-1-2">
        <FadeIn>
          <div className="pill" style={{ marginBottom: 18 }}>Team</div>
          <h2 id="team-heading" style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.06 }}>
            Two people.<br /><em>One vision.</em>
          </h2>
        </FadeIn>
        <div>
          {TEAM.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.1}>
              <div className="team-row">
                <div
                  role="img"
                  aria-label={`${m.name} initials`}
                  style={{
                    width: 46, height: 46, borderRadius: 10, flexShrink: 0,
                    background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
                    backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
                    boxShadow: "var(--glass-shadow)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--serif)", fontSize: 13, color: "var(--ink-mid)", letterSpacing: "-0.01em",
                  }}
                >
                  {m.initials}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(17px,2.4vw,21px)", fontWeight: 400, marginBottom: 5, letterSpacing: "-0.01em" }}>
                    {m.name}
                  </h3>
                  <p style={{ fontSize: "clamp(12px,1.3vw,13px)", color: "var(--ink-muted)", lineHeight: 1.7, fontFamily: "var(--sans)" }}>
                    {m.intro}
                  </p>
                </div>
                <span className="team-role" aria-label={`Role: ${m.role}`}>{m.role}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────────────────────────────────── */
function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const statusRef = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  async function handleSubmit(e) {
    e?.preventDefault?.();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstErrField = Object.keys(errs)[0];
      document.getElementById(`contact-${firstErrField}`)?.focus();
      return;
    }

    try {
      setLoading(true);
      await sendContactEmail(form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => statusRef.current?.focus(), 100);
    } catch (err) {
      console.error(err);
      setErrors({ _global: "Something went wrong. Please try again or email us directly at hello@studio91.in." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <hr className="hr" style={{ marginBottom: "clamp(36px,7vw,80px)" }} />

      <div className="grid-1-14">
        {/* Left column */}
        <FadeIn>
          <div className="pill" style={{ marginBottom: 18 }}>Contact</div>
          <h2
            id="contact-heading"
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px,4vw,50px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.06,
              marginBottom: 18,
            }}
          >
            Let's build
            <br />
            <em>something</em>
            <br />
            meaningful.
          </h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,14px)", color: "var(--ink-muted)", lineHeight: 1.8, fontFamily: "var(--sans)", marginBottom: 28 }}>
            Interested in human-centered AI, speech automation, or mindful product design? We'd love to connect.
          </p>

          <div className="glass" style={{ padding: "18px 22px", borderRadius: 16, marginTop: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Email", value: "hello@studio91.in", href: "mailto:hello@studio91.in" },
                { label: "Location", value: "Jaipur, Rajasthan" },
                { label: "Website", value: "studio91-gs78.vercel.app", href: BRAND.websiteUrl },
                { label: "Status", value: "Available for projects", dot: "#4ADE80" },
              ].map(({ label, value, href, dot }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)", fontFamily: "var(--mono)" }}>{label}</span>
                  {href ? (
                    <a href={href} style={{ fontSize: 12, color: "var(--ink)", fontFamily: "var(--mono)", textDecoration: "underline", textDecorationColor: "rgba(13,13,13,0.2)" }}>
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 12, color: "var(--ink)", fontFamily: "var(--mono)", display: "flex", alignItems: "center", gap: 6 }}>
                      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, display: "inline-block" }} />}
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Right column — form */}
        <FadeIn delay={0.13}>
          <div className="contact-card" style={{ padding: "clamp(22px,4vw,38px)" }}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 14 }}
                  role="status"
                  aria-live="polite"
                  ref={statusRef}
                  tabIndex={-1}
                >
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    style={{
                      width: 54, height: 54, borderRadius: 16, marginBottom: 8,
                      background: "linear-gradient(135deg, var(--accent-dark), var(--accent))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, color: "var(--ink)",
                      boxShadow: "0 8px 28px rgba(157,196,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                    aria-hidden="true"
                  >
                    ✓
                  </motion.div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.03em", marginBottom: 6 }}>
                    Message received.
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--ink-muted)", fontFamily: "var(--sans)", lineHeight: 1.7 }}>
                    We'll get back to you soon. Thanks for reaching out!
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{
                      marginTop: 10, padding: "10px 20px",
                      background: "transparent", border: "1px solid var(--rule-strong)",
                      borderRadius: 8, fontFamily: "var(--mono)", fontSize: 11,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--ink-mid)", cursor: "pointer", transition: "border-color 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.borderColor = "var(--ink)")}
                    onMouseOut={(e) => (e.target.style.borderColor = "var(--rule-strong)")}
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {errors._global && (
                    <div role="alert" style={{
                      marginBottom: 18, padding: "12px 16px",
                      background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.2)",
                      borderRadius: 10, fontSize: 13, color: "#c0392b", fontFamily: "var(--sans)", lineHeight: 1.6,
                    }}>
                      {errors._global}
                    </div>
                  )}

                  <div
                    role="form"
                    aria-label="Contact form"
                    onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleSubmit(); }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <label className="field-label" htmlFor="contact-name">Your name *</label>
                        <input
                          className="field"
                          id="contact-name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={update}
                          placeholder="Rahul Sharma"
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "error-name" : undefined}
                        />
                        {errors.name && <p id="error-name" className="field-error" role="alert">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="field-label" htmlFor="contact-email">Email address *</label>
                        <input
                          className="field"
                          id="contact-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={update}
                          placeholder="you@example.com"
                          autoComplete="email"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "error-email" : undefined}
                        />
                        {errors.email && <p id="error-email" className="field-error" role="alert">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="field-label" htmlFor="contact-message">Message *</label>
                        <textarea
                          className="field"
                          id="contact-message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={update}
                          placeholder="Tell us about your product idea, speech automation vision, or say hello…"
                          aria-required="true"
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "error-message" : undefined}
                        />
                        {errors.message && <p id="error-message" className="field-error" role="alert">{errors.message}</p>}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 4 }}>
                        <button
                          className="send-btn"
                          onClick={handleSubmit}
                          disabled={loading}
                          aria-busy={loading}
                          aria-label={loading ? "Sending message…" : "Send message"}
                        >
                          {loading ? (
                            <>
                              <span style={{
                                width: 12, height: 12, borderRadius: "50%",
                                border: "2px solid rgba(245,242,236,0.3)",
                                borderTopColor: "var(--bg)",
                                display: "inline-block",
                                animation: "spin 0.7s linear infinite",
                              }} aria-hidden="true" />
                              Sending…
                            </>
                          ) : (
                            "Send message →"
                          )}
                        </button>
                        <span style={{ fontSize: 9, color: "var(--ink-muted)", letterSpacing: "0.1em", fontFamily: "var(--mono)" }}>
                          ⌃↵ to send
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        padding: "clamp(24px,4vw,44px) clamp(20px,5vw,56px)",
        borderTop: "1px solid var(--rule)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src={process.env.PUBLIC_URL + BRAND.logo}
          alt="Studio91 Emblem"
          style={{ width: 24, height: 24, borderRadius: 6, objectFit: "contain" }}
        />
        <span style={{ fontFamily: "var(--serif)", fontSize: 18, letterSpacing: "-0.01em" }}>
          Studio<span style={{ color: "var(--accent-dark)" }}>91</span>
        </span>
      </div>
      <span style={{ fontSize: 10, color: "var(--ink-muted)", letterSpacing: "0.1em" }}>
        © 2025 Studio91 · Jaipur, Rajasthan, India
      </span>
      <nav aria-label="Social and product links" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[
          { name: "Live Site", href: BRAND.websiteUrl },
          { name: "Twitter", href: "https://twitter.com" },
          { name: "GitHub", href: "https://github.com/Yuvraj-ai/studio91" },
        ].map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.target.style.color = "var(--ink)")}
            onMouseOut={(e) => (e.target.style.color = "var(--ink-muted)")}
            aria-label={`${s.name} (opens in new tab)`}
          >
            {s.name}
          </a>
        ))}
      </nav>
    </footer>
  );
}

/* ─── ROOT COMPONENT ──────────────────────────────────────────────────────── */
export default function Studio91() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const ids = ["home", "about", "apps", "campaigns", "team", "contact"];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.25 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="noise" aria-hidden="true" />
      <a
        href="#home"
        className="sr-only"
        style={{
          position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden",
        }}
        onFocus={(e) => {
          e.target.style.cssText =
            "position:fixed;left:16px;top:16px;width:auto;height:auto;z-index:9999;padding:10px 20px;background:var(--ink);color:var(--bg);font-family:var(--mono);font-size:12px;border-radius:4px;text-decoration:none;";
        }}
        onBlur={(e) => {
          e.target.style.cssText = "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;";
        }}
      >
        Skip to main content
      </a>

      <Nav active={active} />
      <main id="main-content">
        <Hero />
        <Marquee />
        <About />
        <Apps />
        <Campaigns />
        <Team />
        <Contact />
        <Footer />
      </main>
    </>
  );
}