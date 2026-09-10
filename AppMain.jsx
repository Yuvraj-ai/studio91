import { useState, useEffect, useRef } from "react";

const TEAM = [
  { name: "Yuvraj Singh", role: "Co-founder · Chief Executive Officer", avatar: "YS", color: "#00ff9f" },
  { name: "Virendra Chaudhary", role: "Co-founder · React Native Dev", avatar: "VC", color: "#00cfff" },
];

const APPS = [
  {
    name: "Slow",
    desc: "10 minutes of 'SLOW' a day keeps anxiety and depression away.",
    tags: ["React Native"],
    status: "Live",
    icon: "🧘‍♂️",
  },
  {
    name: "FitLoop",
    desc: "Personalized workout planner with progress analytics and trainer chat built-in.",
    tags: ["React Native", "FastAPI", "Redis"],
    status: "Live",
    icon: "🏋️",
  },
  {
    name: "NovaMeet",
    desc: "Minimalist video conferencing app focused on privacy-first design and low latency.",
    tags: ["React Native", "FastAPI", "WebRTC"],
    status: "Beta",
    icon: "🎙️",
  },
  {
    name: "Grovia",
    desc: "Urban gardening companion — plant care reminders, community tips, growth logs.",
    tags: ["React Native", "FastAPI", "SQLite"],
    status: "In Dev",
    icon: "🌱",
  },
];

const STACK = [
  { name: "React Native", desc: "Cross-platform mobile", icon: "⚛️" },
  { name: "FastAPI", desc: "High-perf Python APIs", icon: "⚡" },
  { name: "PostgreSQL", desc: "Relational data store", icon: "🐘" },
  { name: "Redis", desc: "Caching & queues", icon: "🔴" },
  { name: "Docker", desc: "Containerised deploys", icon: "🐳" },
  { name: "GitHub Actions", desc: "CI/CD pipelines", icon: "🔄" },
];

const glitch = `
@keyframes glitch {
  0%   { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 0); }
  20%  { clip-path: inset(92% 0 1% 0);  transform: translate(2px, 0); }
  40%  { clip-path: inset(43% 0 30% 0); transform: translate(-1px, 0); }
  60%  { clip-path: inset(10% 0 60% 0); transform: translate(1px, 0); }
  80%  { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
  100% { clip-path: inset(40% 0 61% 0); transform: translate(2px, 0); }
}
@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes flicker {
  0%,100% { opacity: 1; }
  92%      { opacity: 1; }
  93%      { opacity: 0.4; }
  94%      { opacity: 1; }
  96%      { opacity: 0.7; }
  97%      { opacity: 1; }
}
@keyframes blink {
  0%,100% { opacity: 1; }
  50%      { opacity: 0; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes borderPulse {
  0%,100% { border-color: #00ff9f44; }
  50%      { border-color: #00ff9faa; }
}
@keyframes gridMove {
  from { background-position: 0 0; }
  to   { background-position: 0 60px; }
}
`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #020a05; color: #c8ffe0; font-family: 'Courier New', monospace; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #020a05; }
  ::-webkit-scrollbar-thumb { background: #00ff9f44; border-radius: 2px; }
  a { color: #00ff9f; text-decoration: none; }
  section { padding: 90px 0; }
`;

function NavBar({ active }) {
  const links = ["home", "about", "apps", "team", "stack", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(2,10,5,0.88)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #00ff9f22",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5vw", height: 56,
    }}>
      <span style={{ color: "#00ff9f", fontWeight: 700, fontSize: 18, letterSpacing: 3, fontFamily: "'Courier New', monospace" }}>
        STUDIO<span style={{ color: "#00cfff" }}>91</span>
        <span style={{ display: "inline-block", width: 8, height: 16, background: "#00ff9f", marginLeft: 4, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
      </span>
      <div style={{ display: "flex", gap: 28 }}>
        {links.map(l => (
          <a key={l} href={`#${l}`} style={{
            fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
            color: active === l ? "#00ff9f" : "#4a8a66",
            borderBottom: active === l ? "1px solid #00ff9f" : "1px solid transparent",
            paddingBottom: 2, transition: "color 0.2s",
          }}>{l}</a>
        ))}
      </div>
    </nav>
  );
}

function GlitchText({ text, size = 56, color = "#00ff9f" }) {
  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 1 }}>
      <span style={{ fontSize: size, fontWeight: 900, color, letterSpacing: -1, fontFamily: "'Courier New', monospace", animation: "flicker 6s infinite" }}>
        {text}
      </span>
      <span aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, fontSize: size, fontWeight: 900,
        color: "#ff4ecd", letterSpacing: -1, fontFamily: "'Courier New', monospace",
        animation: "glitch 2.5s infinite linear", opacity: 0.6,
      }}>{text}</span>
      <span aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, fontSize: size, fontWeight: 900,
        color: "#00cfff", letterSpacing: -1, fontFamily: "'Courier New', monospace",
        animation: "glitch 3.2s infinite linear reverse", opacity: 0.5,
      }}>{text}</span>
    </div>
  );
}

function Grid({ children, cols = 3 }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 20,
    }}>{children}</div>
  );
}

function Card({ children, style = {}, pulse = false }) {
  return (
    <div style={{
      background: "#040e08",
      border: "1px solid #00ff9f33",
      borderRadius: 2,
      padding: "24px 28px",
      animation: pulse ? "borderPulse 3s ease-in-out infinite" : "none",
      transition: "border-color 0.3s, box-shadow 0.3s",
      ...style,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff9f88"; e.currentTarget.style.boxShadow = "0 0 24px #00ff9f18"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "#00ff9f33"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {children}
    </div>
  );
}

function Tag({ label, color = "#00ff9f" }) {
  return (
    <span style={{
      fontSize: 10, letterSpacing: 1.5, padding: "3px 10px",
      border: `1px solid ${color}55`, color, borderRadius: 1,
      textTransform: "uppercase", fontFamily: "'Courier New', monospace",
    }}>{label}</span>
  );
}

function StatusBadge({ status }) {
  const map = { Live: "#00ff9f", Beta: "#00cfff", "In Dev": "#ff4ecd" };
  const c = map[status] || "#888";
  return (
    <span style={{ fontSize: 10, letterSpacing: 2, color: c, display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, display: "inline-block", boxShadow: `0 0 6px ${c}` }} />
      {status}
    </span>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{ fontSize: 11, letterSpacing: 5, color: "#00ff9f88", textTransform: "uppercase", marginBottom: 8 }}>// {label}</p>
      <div style={{ width: 40, height: 1, background: "#00ff9f" }} />
    </div>
  );
}

function TerminalInput({ label, type = "text", rows }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: "100%", background: "#020a05",
    border: `1px solid ${focused ? "#00ff9f" : "#00ff9f33"}`,
    color: "#c8ffe0", fontFamily: "'Courier New', monospace", fontSize: 13,
    padding: "10px 14px", borderRadius: 1, outline: "none",
    transition: "border-color 0.2s",
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 10, letterSpacing: 3, color: "#00ff9f88", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
        &gt;_ {label}
      </label>
      {rows
        ? <textarea rows={rows} style={{ ...base, resize: "vertical" }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        : <input type={type} style={base} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      }
    </div>
  );
}

export default function Studio91() {
  const [active, setActive] = useState("home");
  const [typed, setTyped] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const full = "We build mobile apps that feel like the future.";
  const containerRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(iv);
    }, 42);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const sections = ["home","about","apps","team","stack","contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const W = { maxWidth: 1080, margin: "0 auto", padding: "0 5vw" };

  return (
    <>
      <style>{glitch}{css}</style>
      <NavBar active={active} />

      {/* Scanline overlay */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, zIndex: 99, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,159,0.015) 2px, rgba(0,255,159,0.015) 4px)",
      }} />

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        backgroundImage: "linear-gradient(#00ff9f08 1px, transparent 1px), linear-gradient(90deg, #00ff9f08 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        animation: "gridMove 8s linear infinite",
        position: "relative",
      }}>
        {/* corner decorations */}
        {[{t:60,l:0},{t:60,r:0}].map((s,i) => (
          <div key={i} aria-hidden="true" style={{
            position: "absolute", ...s, width: 120, height: 120,
            borderTop: "1px solid #00ff9f44", borderLeft: i===0 ? "1px solid #00ff9f44" : "none",
            borderRight: i===1 ? "1px solid #00ff9f44" : "none",
          }}/>
        ))}
        <div style={{ ...W, width: "100%", animation: "fadeUp 1s ease both" }}>
          <p style={{ fontSize: 11, letterSpacing: 6, color: "#00cfff", marginBottom: 20, textTransform: "uppercase" }}>
            &gt;_ Initialising Studio91.exe ...
          </p>
          <GlitchText text="STUDIO91" size={72} />
          <div style={{ marginTop: 28, fontSize: 22, color: "#7affc3", fontFamily: "'Courier New', monospace", minHeight: 34 }}>
            {typed}<span style={{ animation: "blink 0.8s step-end infinite", opacity: typed.length < full.length ? 1 : 0 }}>|</span>
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: "#4a8a66", maxWidth: 480, lineHeight: 1.8 }}>
            A two-person indie studio crafting polished mobile experiences with React Native — from Sikar to the world.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
            <a href="#apps" style={{
              padding: "12px 28px", background: "#00ff9f", color: "#020a05",
              fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 3,
              textTransform: "uppercase", fontWeight: 700, borderRadius: 1, transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >View Apps</a>
            <a href="#contact" style={{
              padding: "12px 28px", border: "1px solid #00ff9f44", color: "#00ff9f",
              fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 3,
              textTransform: "uppercase", borderRadius: 1, transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#00ff9f"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#00ff9f44"}
            >Get In Touch</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "#020d06" }}>
        <div style={W}>
          <SectionLabel label="About the Studio" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: 36, color: "#00ff9f", fontFamily: "'Courier New', monospace", marginBottom: 20, lineHeight: 1.2 }}>
                Built by builders,<br/>not boardrooms.
              </h2>
              <p style={{ fontSize: 14, color: "#7affc3", lineHeight: 2, marginBottom: 16 }}>
                Studio91 is a lean mobile-app studio founded by two engineers who got tired of waiting for someone else to build what they imagined. We moved fast, shipped real products, and kept the team small on purpose.
              </p>
              <p style={{ fontSize: 14, color: "#4a8a66", lineHeight: 2 }}>
                Every app we release goes through the same bar: does it feel good to use? Is the API snappy? Does it hold up under real load? We obsess over the details because our users deserve it.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { num: "4", label: "Apps Shipped" },
                { num: "12k+", label: "Active Users" },
                { num: "99.7%", label: "API Uptime" },
                { num: "2", label: "Founders, Zero Bloat" },
              ].map(({ num, label }) => (
                <Card key={label} style={{ display: "flex", alignItems: "center", gap: 20, padding: "18px 24px" }}>
                  <span style={{ fontSize: 32, color: "#00ff9f", fontWeight: 900, minWidth: 80 }}>{num}</span>
                  <span style={{ fontSize: 12, letterSpacing: 2, color: "#4a8a66", textTransform: "uppercase" }}>{label}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPS */}
      <section id="apps">
        <div style={W}>
          <SectionLabel label="Our Apps" />
          <Grid cols={2}>
            {APPS.map(app => (
              <Card key={app.name} pulse>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ fontSize: 32 }}>{app.icon}</span>
                  <StatusBadge status={app.status} />
                </div>
                <h3 style={{ fontSize: 20, color: "#00ff9f", fontFamily: "'Courier New', monospace", marginBottom: 10 }}>{app.name}</h3>
                <p style={{ fontSize: 13, color: "#4a8a66", lineHeight: 1.8, marginBottom: 16 }}>{app.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {app.tags.map(t => <Tag key={t} label={t} />)}
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ background: "#020d06" }}>
        <div style={W}>
          <SectionLabel label="The Team" />
          <Grid cols={3}>
            {TEAM.map(m => (
              <Card key={m.name} style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", margin: "0 auto 18px",
                  border: `2px solid ${m.color}55`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, fontWeight: 700, color: m.color,
                  background: `${m.color}11`, boxShadow: `0 0 18px ${m.color}22`,
                }}>
                  {m.avatar}
                </div>
                <p style={{ fontSize: 16, color: "#c8ffe0", fontWeight: 700, marginBottom: 6 }}>{m.name}</p>
                <p style={{ fontSize: 11, letterSpacing: 1.5, color: "#4a8a66", textTransform: "uppercase" }}>{m.role}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* STACK */}
      <section id="stack">
        <div style={W}>
          <SectionLabel label="Tech Stack" />
          <Grid cols={3}>
            {STACK.map(s => (
              <Card key={s.name} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div>
                  <p style={{ fontSize: 15, color: "#00ff9f", fontWeight: 700, marginBottom: 4 }}>{s.name}</p>
                  <p style={{ fontSize: 12, color: "#4a8a66" }}>{s.desc}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#020d06" }}>
        <div style={{ ...W, maxWidth: 680 }}>
          <SectionLabel label="Contact" />
          <h2 style={{ fontSize: 32, color: "#00ff9f", fontFamily: "'Courier New', monospace", marginBottom: 12 }}>
            Let's build something.
          </h2>
          <p style={{ fontSize: 14, color: "#4a8a66", lineHeight: 1.8, marginBottom: 36 }}>
            Got an app idea? Need a FastAPI backend? Want to collaborate? Drop us a message — we usually respond within 24 hours.
          </p>
          <Card style={{ padding: "32px 36px" }}>
            <TerminalInput label="Your Name" />
            <TerminalInput label="Email" type="email" />
            <TerminalInput label="Message" rows={5} />
            <button
              style={{
                width: "100%", padding: "13px 0",
                background: "transparent", border: "1px solid #00ff9f",
                color: "#00ff9f", fontFamily: "'Courier New', monospace",
                fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
                cursor: "pointer", borderRadius: 1, transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#00ff9f"; e.currentTarget.style.color = "#020a05"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00ff9f"; }}
              onClick={() => setFormMsg("// Message sent. We'll be in touch.")}
            >
              {formMsg || "&gt;_ Send Message"}
            </button>
            {formMsg && <p style={{ fontSize: 12, color: "#00ff9f88", marginTop: 12, letterSpacing: 1 }}>{formMsg}</p>}
          </Card>

          <div style={{ display: "flex", gap: 28, marginTop: 40, paddingTop: 32, borderTop: "1px solid #00ff9f11" }}>
            {[
              { label: "Email", val: "virendremoond@gmail.com" },
              { label: "GitHub", val: "github.com/virendrachaudhary29" },
              { label: "Twitter", val: "https://x.com/MoondViren68171" },
            ].map(({ label, val }) => (
              <div key={label}>
                <p style={{ fontSize: 10, letterSpacing: 3, color: "#00ff9f55", textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 13, color: "#7affc3" }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #00ff9f11", padding: "24px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#4a8a66", letterSpacing: 2 }}>STUDIO91 © 2025</span>
        <span style={{ fontSize: 11, color: "#4a8a66", letterSpacing: 1 }}>Built with React · FastAPI · Passion</span>
      </footer>
    </>
  );
}
