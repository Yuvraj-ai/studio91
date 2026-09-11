import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── DATA & CONSTANTS ────────────────────────────────────────────────────── */
const BRAND = {
  name: "Studio91",
  tagline: "Software that feels minimal, human, calm, and intentional.",
  overview:
    "Studio91 empowers users by replacing complex visual interfaces with human-centered AI, turning natural speech into effortless device automation.",
  websiteUrl: "https://studio91-gs78.vercel.app/#apps",
  logo: "/logo_studio91.png",
};

const TEAM = [
  {
    name: "Yuvraj Singh",
    role: "Product & Engineering",
    initials: "YS",
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

const ALL_CREATIVES = CAMPAIGNS.flatMap((c) =>
  c.creatives.map((item) => ({
    ...item,
    campaignId: c.id,
    campaignLabel: c.label,
    campaignTitle: c.title,
    campaignDesc: c.description,
  }))
);

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

  /* ── Creative slider & cards ── */
  .creative-slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 12px 0 24px;
    margin: 0 -8px;
    mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
  }
  .creative-slider-track {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 10px 24px 18px;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    scroll-behavior: auto;
  }
  .creative-slider-track:active {
    cursor: grabbing;
  }
  .creative-slider-track::-webkit-scrollbar {
    display: none;
  }
  .creative-slide-card {
    flex: 0 0 clamp(220px, 22vw, 265px);
    height: clamp(340px, 42vh, 395px);
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    background: #EAE6DD;
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: var(--glass-shadow);
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
  }
  .creative-slide-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 22px 50px rgba(13,13,13,0.16), inset 0 1px 0 rgba(255,255,255,0.9);
  }
  .creative-slide-card:hover .slide-img {
    transform: scale(1.045);
  }
  .slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }
  .slide-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(13,13,0,0.02) 40%, rgba(13,13,13,0.88) 100%);
    pointer-events: none;
    transition: background 0.3s;
  }
  .creative-slide-card:hover .slide-overlay {
    background: linear-gradient(180deg, rgba(13,13,0,0.02) 30%, rgba(13,13,13,0.94) 100%);
  }
  .slide-meta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 18px;
    color: var(--bg);
    z-index: 2;
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
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Redesigned Footer (Sarvam Inspired & Studio91 Brand Book) ── */
  .footer-container {
    padding: clamp(56px, 8vw, 108px) clamp(20px, 5vw, 56px) 0;
    border-top: 1px solid var(--rule);
    background: var(--bg);
    position: relative;
    overflow: hidden;
  }

  .footer-dir-grid {
    display: grid;
    grid-template-columns: 280px repeat(5, 1fr);
    gap: clamp(24px, 3vw, 44px);
    align-items: start;
    padding-bottom: clamp(48px, 6vw, 84px);
  }

  @media (max-width: 1200px) {
    .footer-dir-grid {
      grid-template-columns: 240px repeat(3, 1fr);
      row-gap: 36px;
    }
  }

  @media (max-width: 900px) {
    .footer-dir-grid {
      grid-template-columns: 1fr 1fr;
      row-gap: 32px;
    }
    .footer-brand-col {
      grid-column: 1 / -1;
      margin-bottom: 24px;
    }
  }

  @media (max-width: 520px) {
    .footer-dir-grid {
      grid-template-columns: 1fr;
    }
  }

  .footer-dir-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-dir-title {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .footer-dir-link {
    font-family: var(--sans);
    font-size: 13.5px;
    color: var(--ink-muted);
    line-height: 1.85;
    transition: color 0.2s, transform 0.2s;
    display: inline-block;
  }
  .footer-dir-link:hover {
    color: var(--ink);
    transform: translateX(2px);
  }

  .footer-social-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid var(--rule-strong);
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-mid);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .footer-social-btn:hover {
    color: var(--ink);
    background: rgba(255, 255, 255, 0.95);
    border-color: var(--ink);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 13, 13, 0.08);
  }

  .footer-badge-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 14px;
    border: 1px solid var(--rule-strong);
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 8px;
    font-family: var(--mono);
    transition: border-color 0.2s;
  }
  .footer-badge-card:hover {
    border-color: var(--ink);
  }

  .footer-address-card {
    padding: 14px 16px;
    border: 1px solid var(--rule-strong);
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 8px;
    font-family: var(--mono);
    font-size: 11px;
    line-height: 1.65;
    color: var(--ink-muted);
  }

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
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src={process.env.PUBLIC_URL + BRAND.logo}
            alt="Studio91"
            style={{
              height: 28,
              width: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
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
            <div style={{ marginBottom: 12 }}>
              <img
                src={process.env.PUBLIC_URL + BRAND.logo}
                alt="Studio91"
                style={{ height: 32, width: "auto", display: "block" }}
              />
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
  const [activeCreative, setActiveCreative] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const sliderRef = useRef(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);

  // Duplicate items for continuous seamless loop
  const displayList = useMemo(
    () => [...ALL_CREATIVES, ...ALL_CREATIVES],
    []
  );

  // Smooth continuous horizontal sliding animation loop
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId;
    let lastTime = performance.now();
    const speed = 0.55;

    const step = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      if (!isHovered && !isManualPaused && !isDraggingRef.current && el) {
        el.scrollLeft += speed * (dt / 16.67);
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
        if (el.scrollLeft <= 0) {
          el.scrollLeft += half;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isHovered, isManualPaused]);

  const handleOpen = (item) => setActiveCreative(item);
  const handleClose = () => setActiveCreative(null);

  const handlePrev = () => {
    if (!activeCreative) return;
    const currentIndex = ALL_CREATIVES.findIndex((c) => c.id === activeCreative.id);
    const prevIndex = (currentIndex - 1 + ALL_CREATIVES.length) % ALL_CREATIVES.length;
    setActiveCreative(ALL_CREATIVES[prevIndex]);
  };

  const handleNext = () => {
    if (!activeCreative) return;
    const currentIndex = ALL_CREATIVES.findIndex((c) => c.id === activeCreative.id);
    const nextIndex = (currentIndex + 1) % ALL_CREATIVES.length;
    setActiveCreative(ALL_CREATIVES[nextIndex]);
  };

  const scrollByAmount = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    startXRef.current = e.pageX - (sliderRef.current ? sliderRef.current.offsetLeft : 0);
    scrollLeftRef.current = sliderRef.current ? sliderRef.current.scrollLeft : 0;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) dragMovedRef.current = true;
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (item) => {
    if (dragMovedRef.current) return;
    handleOpen(item);
  };

  return (
    <section id="campaigns" className="section" aria-labelledby="campaigns-heading">
      <hr className="hr" style={{ marginBottom: "clamp(36px,7vw,80px)" }} />

      <FadeIn>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: "clamp(24px,4vw,36px)",
          }}
        >
          <div>
            <div className="pill" style={{ marginBottom: 14 }}>Campaigns</div>
            <h2 id="campaigns-heading" style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.06 }}>
              Visual narratives of<br /><em>quiet restraint.</em>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14, maxWidth: 440 }}>
            <p style={{ fontSize: "clamp(13px,1.4vw,14px)", color: "var(--ink-muted)", lineHeight: 1.7, fontFamily: "var(--sans)", margin: 0, textAlign: "right" }}>
              Explore editorial posters and brand expressions crafted around digital wellness, human-centered AI, and the beauty of peaceful interfaces.
            </p>

            {/* Slider Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--ink-muted)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--mono)",
                }}
              >
                {ALL_CREATIVES.length} works · Drag or click to preview
              </span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <motion.button
                  onClick={() => scrollByAmount(-280)}
                  aria-label="Slide left"
                  whileHover={{ backgroundColor: "var(--ink)", color: "var(--bg)", borderColor: "var(--ink)" }}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    border: "1px solid var(--rule-strong)", background: "rgba(255,255,255,0.65)",
                    color: "var(--ink)", fontSize: 16, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", fontFamily: "var(--mono)",
                    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  ‹
                </motion.button>
                <motion.button
                  onClick={() => setIsManualPaused((p) => !p)}
                  aria-label={isManualPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
                  whileHover={{ backgroundColor: "var(--ink)", color: "var(--bg)", borderColor: "var(--ink)" }}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    border: "1px solid var(--rule-strong)",
                    background: isManualPaused ? "var(--ink)" : "rgba(255,255,255,0.65)",
                    color: isManualPaused ? "var(--bg)" : "var(--ink)",
                    fontSize: 10, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", fontFamily: "var(--mono)",
                    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  {isManualPaused ? "▶" : "❚❚"}
                </motion.button>
                <motion.button
                  onClick={() => scrollByAmount(280)}
                  aria-label="Slide right"
                  whileHover={{ backgroundColor: "var(--ink)", color: "var(--bg)", borderColor: "var(--ink)" }}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    border: "1px solid var(--rule-strong)", background: "rgba(255,255,255,0.65)",
                    color: "var(--ink)", fontSize: 16, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", fontFamily: "var(--mono)",
                    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  ›
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── Single Row Animated Sliding Cards ── */}
      <div
        className="creative-slider-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); isDraggingRef.current = false; }}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div
          ref={sliderRef}
          className="creative-slider-track"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          role="region"
          aria-label="Campaign cards slider"
        >
          {displayList.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="creative-slide-card"
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen(item)}
              aria-label={`View ${item.title}`}
            >
              <img
                src={`${process.env.PUBLIC_URL}/creatives/${item.fileName}`}
                alt={item.title}
                loading="lazy"
                draggable={false}
                className="slide-img"
              />
              <div className="slide-overlay" />
              <div className="slide-meta">
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 5,
                    fontFamily: "var(--mono)",
                  }}
                >
                  {item.subtitle}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(16px, 1.8vw, 19px)",
                    fontWeight: 400,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.18,
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

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

/* ─── FOOTER SLIDESHOW IMAGES ─────────────────────────────────────────────── */
// The hollow "studio" bottom wordmark cycles through these images.
// Each entry specifies the image and optimal framing position:
export const FOOTER_SLIDESHOW_IMAGES = [
  { src: "/behind/peakpx.jpg", position: "center 45%" },
  { src: "/behind/claudio-testa--SO3JtE3gZo-unsplash.jpg", position: "center 70%" },
  { src: "/behind/mulyadi-kIYH9ja6HhY-unsplash.jpg", position: "center 50%" },
  { src: "/behind/jaanus-jagomagi-7aTrthCFBiU-unsplash.jpg", position: "center 60%" },
  { src: "/behind/restu-kurnia-oPZih_dRKvQ-unsplash.jpg", position: "center 40%" },
  { src: "/behind/teemu-paananen-OOE4xAnBhKo-unsplash.jpg", position: "center 50%" },
  { src: "/behind/mimipic-photography-XmR3y0bp3Kw-unsplash.jpg", position: "center 70%" },
];

const getImageSrc = (item) => (typeof item === "string" ? item : item.src);
const getImagePos = (item) => (typeof item === "object" && item.position ? item.position : "center");

/* ─── FOOTER & CONTACT ────────────────────────────────────────────────────── */
function Footer() {
  // Contact form state
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

  // Slideshow state for hollow "studio" wordmark: steady metronome timer
  const [slideIndex, setSlideIndex] = useState(0);

  // Preload all slideshow images on mount so transitions never hitch or stutter
  useEffect(() => {
    FOOTER_SLIDESHOW_IMAGES.forEach((item) => {
      const img = new Image();
      img.src = process.env.PUBLIC_URL + getImageSrc(item);
    });
  }, []);

  // Metronome timer: perfectly consistent 4.2s intervals
  useEffect(() => {
    if (!FOOTER_SLIDESHOW_IMAGES.length) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % FOOTER_SLIDESHOW_IMAGES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  const advanceSlide = () => {
    setSlideIndex((prev) => (prev + 1) % FOOTER_SLIDESHOW_IMAGES.length);
  };

  const directoryColumns = [
    {
      title: "Products",
      links: [
        { label: "Slow (Mindfulness)", href: "#apps" },
        { label: "Speech Automation", href: "#apps" },
        { label: "Human-Centered AI", href: "#about" },
        { label: "Sensory UI Kit", href: "#campaigns" },
        { label: "Calm Interfaces", href: "#about" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "Voice Automation", href: "#about" },
        { label: "Contextual AI", href: "#about" },
        { label: "Device Workflows", href: "#apps" },
        { label: "Tactile Restraint", href: "#campaigns" },
        { label: "Sensory Design", href: "#about" },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "About Studio91", href: "#about" },
        { label: "Brand Philosophy", href: "#about" },
        { label: "Visual Campaigns", href: "#campaigns" },
        { label: "Brand Book (Pomelli)", href: "#about" },
        { label: "Research & Craft", href: "#about" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Yuvraj Singh", href: "#team" },
        { label: "Virendra Chaudhary", href: "#team" },
        { label: "Jaipur Headquarters", href: "#contact" },
        { label: "Work With Us", href: "#contact" },
        { label: "Careers", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Trust & Ethics", href: "#about" },
        { label: "Terms of Craft", href: "#about" },
        { label: "Privacy Policy", href: "#about" },
        { label: "Accessibility", href: "#about" },
      ],
    },
  ];

  const wordmarkFontStyle = {
    fontFamily: "var(--serif)",
    fontSize: "clamp(46px, 15.5vw, 240px)",
    fontWeight: 400,
    lineHeight: 1.15,
    letterSpacing: "-0.04em",
    userSelect: "none",
    textTransform: "lowercase",
  };

  return (
    <footer id="contact" role="contentinfo" className="footer-container" aria-labelledby="contact-heading">
      {/* ── ZONE 1: Contact & Collaborations ── */}
      <div style={{ marginBottom: "clamp(48px, 7vw, 84px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }}>
          {/* Left Column — Manifesto & Direct Contact */}
          <FadeIn>
            <div className="pill" style={{ marginBottom: 18 }}>Contact & Collaborations</div>
            <h2
              id="contact-heading"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 4vw, 50px)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
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
            <p style={{ fontSize: "clamp(13px, 1.4vw, 15px)", color: "var(--ink-muted)", lineHeight: 1.8, fontFamily: "var(--sans)", marginBottom: 28 }}>
              Interested in human-centered AI, speech automation, or mindful product design? We'd love to connect.
            </p>

            <div className="glass" style={{ padding: "18px 22px", borderRadius: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Email", value: "hello@studio91.in", href: "mailto:hello@studio91.in" },
                  { label: "Location", value: "Jaipur, Rajasthan, India" },
                  { label: "Website", value: "studio91-gs78.vercel.app", href: BRAND.websiteUrl },
                  { label: "Status", value: "Available for select projects", dot: "var(--accent-dark)" },
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

          {/* Right Column — Contact Card */}
          <FadeIn delay={0.12}>
            <div className="contact-card" style={{ padding: "clamp(22px, 4vw, 38px)" }}>
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
                            placeholder="Yuvraj Singh"
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
                            rows={4}
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
      </div>

      {/* ── Divider ── */}
      <hr style={{ border: "none", height: 1, background: "var(--rule)", margin: "clamp(36px, 5vw, 64px) 0" }} />

      {/* ── ZONE 2: Sarvam-Style Directory Grid ── */}
      <div className="footer-dir-grid">
        {/* Brand Column (replaces Sarvam) */}
        <div className="footer-brand-col" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <a href="#home" aria-label="Studio91 home" style={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src={process.env.PUBLIC_URL + BRAND.logo}
              alt="Studio91"
              style={{ height: 28, width: "auto", display: "block" }}
            />
          </a>

          <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-muted)", lineHeight: 1.65, margin: 0 }}>
            Software that feels human.
            <br />
            AI & mindful digital craft from India.
          </p>

          {/* Two Studio Badges (matching Sarvam's ISO / SOC2 style) */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div className="footer-badge-card">
              <span style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 2 }}>
                EST. 2024
              </span>
              <span style={{ fontSize: 11, fontWeight: 500, color: "var(--ink)" }}>
                JAIPUR, RJ
              </span>
              <span style={{ fontSize: 8, color: "var(--accent-dark)", letterSpacing: "0.08em" }}>
                STUDIO91
              </span>
            </div>

            <div className="footer-badge-card">
              <span style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 2 }}>
                HUMAN-AI
              </span>
              <span style={{ fontSize: 11, fontWeight: 500, color: "var(--ink)" }}>
                ZERO BLOAT
              </span>
              <span style={{ fontSize: 8, color: "var(--accent-dark)", letterSpacing: "0.08em" }}>
                MINIMAL CRAFT
              </span>
            </div>
          </div>

          {/* Social icons row ("Find us at") */}
          <div>
            <span style={{
              display: "block",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              fontFamily: "var(--mono)",
              marginBottom: 10,
            }}>
              Find us at
            </span>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="X / Twitter">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://github.com/Yuvraj-ai/studio91" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Discord">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="mailto:hello@studio91.in" className="footer-social-btn" aria-label="Email Studio91">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>

          {/* Address Card (matching Sarvam address card in Picture 2) */}
          <div className="footer-address-card">
            <p style={{ margin: "0 0 8px", fontWeight: 500, color: "var(--ink)" }}>
              © 2025 Studio91 Labs.
              <br />
              All rights reserved.
            </p>
            <p style={{ margin: 0, fontSize: 10.5, color: "var(--ink-muted)", lineHeight: 1.5 }}>
              C-Scheme / Malviya Nagar,
              <br />
              Jaipur, Rajasthan 302017,
              <br />
              India
            </p>
          </div>
        </div>

        {/* Directory Link Columns (5 columns matching Picture 2) */}
        {directoryColumns.map((col) => (
          <div key={col.title} className="footer-dir-col">
            <span className="footer-dir-title">{col.title}</span>
            {col.links.map((lnk) => (
              <a key={lnk.label} href={lnk.href} className="footer-dir-link">
                {lnk.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* ── ZONE 3: Showstopper Giant Wordmark (Hollow "studio" slideshow + green "91") ── */}
      <div
        className="footer-wordmark-wrap"
        style={{
          width: "100%",
          overflow: "hidden",
          borderTop: "1px solid var(--rule)",
          paddingTop: "clamp(24px, 3.5vw, 48px)",
          paddingBottom: "clamp(8px, 1.5vw, 20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={advanceSlide}
        title="Click to cycle slideshow visuals"
      >
        <div style={{ display: "inline-flex", alignItems: "baseline", justifyContent: "center", gap: "clamp(4px, 1.2vw, 18px)", textAlign: "center" }}>
          {/* Hollow "studio" with interior photo slideshow without black borders */}
          <div style={{ position: "relative", display: "inline-block", lineHeight: 1.15 }}>
            {/* Structural invisible text ensuring exact layout bounds for ascenders and descenders */}
            <span
              style={{
                ...wordmarkFontStyle,
                visibility: "hidden",
                pointerEvents: "none",
                display: "block",
                lineHeight: 1.15,
              }}
              aria-hidden="true"
            >
              studio
            </span>

            {/* Crossfading image slide without black borders */}
            <AnimatePresence initial={false}>
              <motion.span
                key={slideIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  ...wordmarkFontStyle,
                  lineHeight: 1.15,
                  backgroundImage: `url(${process.env.PUBLIC_URL + getImageSrc(FOOTER_SLIDESHOW_IMAGES[slideIndex])})`,
                  backgroundSize: "cover",
                  backgroundPosition: getImagePos(FOOTER_SLIDESHOW_IMAGES[slideIndex]),
                  backgroundRepeat: "no-repeat",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  display: "block",
                  pointerEvents: "none",
                }}
              >
                studio
              </motion.span>
            </AnimatePresence>
          </div>

          {/* "91" in Electric Chartreuse (#C8FF00) brand book green without black borders */}
          <span
            style={{
              ...wordmarkFontStyle,
              lineHeight: 1.15,
              color: "var(--accent)",
              display: "inline-block",
              userSelect: "none",
            }}
          >
            91
          </span>
        </div>
      </div>
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
      </main>
      <Footer />
    </>
  );
}