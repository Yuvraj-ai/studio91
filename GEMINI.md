# Studio91 — Project Context & Memory

## Overview
- **Project Name:** Studio91 (`studio91`)
- **Repository:** `https://github.com/Yuvraj-ai/studio91.git`
- **Location:** Jaipur, Rajasthan, India (Est. 2024)
- **Live URL:** `https://studio91-gs78.vercel.app/#apps`
- **Positioning:** Studio91 empowers users by replacing complex visual interfaces with human-centered AI, turning natural speech into effortless device automation.
- **Brand Values:** Minimalism, Human-Centeredness, Intentionality, Mindfulness.
- **Visual Aesthetics:** Editorial Serenity, Calm Digitalism, Humanistic Minimalism, Spacious Restraint, Intentional Warmth.
- **Brand Motto:** *"Software that feels human."*
- **Brandbook Source:** Studio91 Brandbook by Pomelli (`google_labs`)
- **Color Tokens:** Classic Linen (`#F5F2EC`), Jet Black (`#0D0D0D`), Electric Chartreuse (`#C8FF00`).

## Team
- **Rahul Sharma:** Co-founder / Developer / Product & Engineering
- **Virendra Chaudhary:** Co-founder / Developer / React Native & Frontend

## Tech Stack
- **Framework:** React 19 (`react@^19.2.6`, `react-dom@^19.2.6`)
- **Tooling:** Create React App (`react-scripts@5.0.1`)
- **Animation:** `framer-motion@^12.38.0`
- **Typography:** `DM Serif Display` (serif) & `DM Mono` (monospace) via Google Fonts
- **Integrations:** EmailJS (client-side dynamic loader via jsdelivr CDN)
- **Design System:** Custom "Fluid Glass" aesthetic (glassmorphism tokens, backdrop blur, custom CSS in `src/App.jsx`)

## Project Structure
```
studio91/
├── public/
│   ├── creatives/       # 12 high-resolution campaign artwork posters
│   ├── favicon.ico
│   ├── logo_studio91.png # Official Studio91 brand emblem
│   ├── image.png        # Legacy icon
│   ├── index.html       # HTML template, includes Google site verification & favicon
│   └── manifest.json
├── src/
│   ├── App.jsx          # Primary application component (Single Page Portfolio)
│   ├── App.css          # Note: Currently contains duplicate JSX backup (not imported)
│   ├── App.test.js      # Default CRA boilerplate test
│   ├── index.css        # Base reset styles
│   ├── index.js         # React DOM root entry point
│   ├── reportWebVitals.js
│   └── setupTests.js
├── AppMain.jsx          # Root legacy component (cyberpunk terminal aesthetic)
├── package.json
└── README.md
```

## Key Components in `src/App.jsx`
- **Nav:** Sticky glass header with `logo_studio91.png` and anchor navigation (`#home`, `#about`, `#apps`, `#campaigns`, `#team`, `#contact`).
- **Hero:** Typing headline animation with rotating words ("calm.", "intentional.", "thoughtful.", "minimal.") and human-centered AI positioning.
- **Marquee:** Infinite scrolling badge strip highlighting studio values and aesthetic principles.
- **About:** Three core studio principles (Humanistic Minimalism, Spacious Restraint, Intentional Warmth).
- **Apps:** Showcase for studio products, highlighting "Slow" (Mindfulness & breathing app).
- **Campaigns:** Editorial creative gallery featuring 12 posters across 3 campaigns with filter tabs and full-screen lightbox modal with keyboard navigation.
- **Team:** Cards for Rahul Sharma and Virendra Chaudhary.
- **Contact:** Glassmorphic contact form with client-side validation and EmailJS dispatch.
- **Footer:** Logo, copyright, city attribution, live link, and social links.

## Known Anomalies & Considerations
1. `node_modules` is not committed/installed by default.
2. `src/App.css` is a stub as CSS styles are scoped in `src/App.jsx` and `src/index.css`.
3. `AppMain.jsx` is an older, dark terminal/cyberpunk version of the site left in the root directory.
4. `src/setupTests.js` includes mocks for `IntersectionObserver` and `window.matchMedia` for JSDOM test suite compatibility.

## Workflow & Git Conventions
- **Git Commits:** Always create structured, conventional commits locally using git commands after completing tasks.
- **Git Push:** DO NOT run `git push`. The user handles remote push manually.

