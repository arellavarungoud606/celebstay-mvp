import { useState, useEffect } from "react";

// ─── FONTS ───────────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const PRIMARY = "#0D0A1E";
const GOLD = "#C9A96E";
const GOLD_LIGHT = "#F5ECD7";
const SURFACE = "#FAFAF8";

// ─── DATA ────────────────────────────────────────────────────────────────────
const OCCASIONS = [
  { id:"birthday",    label:"Birthday",       emoji:"🎂", tagline:"Make their day unforgettable",    accent:"#B5338A", light:"#FDF0F8", img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", description:"Balloons, banners, cake setup & confetti — perfectly timed before arrival." },
  { id:"anniversary", label:"Anniversary",    emoji:"💑", tagline:"Celebrate your love story",        accent:"#8B4513", light:"#FDF6EE", img:"https://images.unsplash.com/photo-1518621845628-5590a6b30e0b?w=600&q=80", description:"Rose petals, fairy lights, couple décor & candlelit mood — crafted for romance." },
  { id:"proposal",    label:"Proposal",       emoji:"💍", tagline:"The perfect yes moment",           accent:"#4A1D96", light:"#F5F0FF", img:"https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80", description:"Premium florals, ring reveal setup, candles & photographer to capture the moment." },
  { id:"surprise",    label:"Surprise Gifting",emoji:"🎁",tagline:"They won't see it coming",         accent:"#065F46", light:"#ECFDF5", img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80", description:"Full surprise coordination — décor, gifts & setup in stealth. Guest stays clueless." },
  { id:"datenight",   label:"Date Night",     emoji:"🕯️", tagline:"Just the two of you",             accent:"#881337", light:"#FFF1F2", img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", description:"Candlelight setup, music, wine arrangement & a private romantic ambience." },
];

const DECOR_PACKAGES = {
  birthday: [
    { id:"b1", name:"Classic Birthday",  price:1800, setupTime:2, desc:"Balloons arch, banner, cake table, confetti floor",              icon:"🎈", highlight:"Most booked" },
    { id:"b2", name:"Royal Birthday",    price:3200, setupTime:3, desc:"LED backdrop, premium balloons, fairy lights, floral table",     icon:"👑", highlight:"Instagram worthy" },
    { id:"b3", name:"Midnight Surprise", price:2500, setupTime:2, desc:"Dark theme, fairy lights, photo wall, number balloons",          icon:"🌙", highlight:"For midnight entry" },
  ],
  anniversary: [
    { id:"a1", name:"Rose Romance",   price:2000, setupTime:2, desc:"Rose petals trail, fairy lights, couple photo frame",         icon:"🌹", highlight:"Most romantic" },
    { id:"a2", name:"Golden Evening", price:3500, setupTime:3, desc:"Gold & white theme, candles, premium florals, wine setup",    icon:"✨", highlight:"Luxury pick" },
    { id:"a3", name:"Rustic Love",    price:2800, setupTime:3, desc:"Wooden props, string lights, wildflower bouquets, cozy setup",icon:"🌿", highlight:"Trending" },
  ],
  proposal: [
    { id:"p1", name:"Classic Proposal",  price:3000, setupTime:3, desc:"Red roses, candle path, ring reveal cushion, fairy lights",        icon:"💐", highlight:"Safe choice" },
    { id:"p2", name:"Grand Proposal",    price:5500, setupTime:4, desc:"Full floral arch, premium candles, petals, photographer included", icon:"💍", highlight:"Most memorable" },
    { id:"p3", name:"Minimalist Yes",    price:2200, setupTime:2, desc:"Clean white setup, single rose bouquet, simple candles",           icon:"🤍", highlight:"Subtle & elegant" },
  ],
  surprise: [
    { id:"s1", name:"Stealth Setup",    price:2200, setupTime:2, desc:"Full décor done before guest arrives, zero contact with guest", icon:"🤫", highlight:"Zero spoilers" },
    { id:"s2", name:"Gift & Glow",      price:3000, setupTime:3, desc:"Gift wrapped presents, LED décor, balloon surprise entry",      icon:"🎁", highlight:"WOW factor" },
    { id:"s3", name:"Themed Surprise",  price:3800, setupTime:3, desc:"Custom theme, photo wall, props, surprise entry decoration",   icon:"🎊", highlight:"Fully customised" },
  ],
  datenight: [
    { id:"d1", name:"Candlelight Mood", price:1600, setupTime:2, desc:"Candles, rose petals, soft music arrangement, dim lighting",      icon:"🕯️", highlight:"Most intimate" },
    { id:"d2", name:"Starlight Dinner", price:2800, setupTime:2, desc:"Fairy lights ceiling, private dinner table, wine setup",          icon:"🍷", highlight:"Most popular" },
    { id:"d3", name:"Luxury Date",      price:4000, setupTime:3, desc:"Premium setup, rose bath, jacuzzi prep, champagne & chocolates", icon:"🛁", highlight:"5-star feel" },
  ],
};

const ADDONS_BY_OCCASION = {
  birthday:    [{id:1,name:"Custom Cake",price:900,icon:"🎂"},{id:2,name:"Photographer",price:2500,icon:"📷"},{id:3,name:"Number Balloons",price:400,icon:"🔢"},{id:4,name:"Photo Booth Props",price:600,icon:"🎭"},{id:5,name:"Personalised Banner",price:350,icon:"🪧"},{id:6,name:"Party Music DJ",price:1800,icon:"🎵"}],
  anniversary: [{id:1,name:"Flower Bouquet",price:700,icon:"💐"},{id:2,name:"Photographer",price:2500,icon:"📷"},{id:3,name:"Couple Cake",price:900,icon:"🎂"},{id:4,name:"Candlelight Dinner",price:2000,icon:"🍽️"},{id:5,name:"Personalised Letter",price:300,icon:"💌"},{id:6,name:"Wine Bottle",price:800,icon:"🍷"}],
  proposal:    [{id:1,name:"Photographer",price:2500,icon:"📷"},{id:2,name:"Videographer",price:4000,icon:"🎥"},{id:3,name:"Flower Bouquet",price:700,icon:"💐"},{id:4,name:"Chocolate Box",price:500,icon:"🍫"},{id:5,name:"Proposal Board",price:400,icon:"💬"},{id:6,name:"Champagne",price:1200,icon:"🥂"}],
  surprise:    [{id:1,name:"Gift Wrapping",price:350,icon:"🎁"},{id:2,name:"Photographer",price:2500,icon:"📷"},{id:3,name:"Personalised Card",price:200,icon:"💌"},{id:4,name:"Cake",price:900,icon:"🎂"},{id:5,name:"Surprise Board",price:400,icon:"🪧"},{id:6,name:"Confetti Cannon",price:600,icon:"🎊"}],
  datenight:   [{id:1,name:"Candlelight Dinner",price:2000,icon:"🍽️"},{id:2,name:"Photographer",price:2500,icon:"📷"},{id:3,name:"Wine Bottle",price:800,icon:"🍷"},{id:4,name:"Rose Bath Setup",price:900,icon:"🛁"},{id:5,name:"Couple Massage",price:2800,icon:"💆"},{id:6,name:"Chocolates Box",price:500,icon:"🍫"}],
};

const STAYS = [
  { id:1, name:"The Bloom Villa",     type:"Villa",     price:4500, rating:4.8, reviews:124, tag:"Most Loved",  desc:"Private villa with garden, pool & premium amenities.", img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80" },
  { id:2, name:"Regal Farmhouse",     type:"Farmhouse", price:3200, rating:4.6, reviews:87,  tag:"Best Value",  desc:"2-acre rustic luxury. Perfect for group surprises.",  img:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80" },
  { id:3, name:"Citrine Hotel Suite", type:"Hotel",     price:2800, rating:4.5, reviews:210, tag:"Quick Setup", desc:"City-centre suite with fast decoration turnaround.",  img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" },
  { id:4, name:"Azure Skyview",       type:"Hotel",     price:3800, rating:4.9, reviews:65,  tag:"Top Rated",   desc:"Rooftop + panoramic views. Ideal for proposals.",     img:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const INR = n => "₹" + n.toLocaleString("en-IN");

const S = {
  font: { fontFamily: "'DM Sans', sans-serif" },
  serif: { fontFamily: "'Cormorant Garamond', serif" },
};

// ─── STEP INDICATOR ──────────────────────────────────────────────────────────
function StepBar({ step }) {
  const steps = [
    { key: "pick-occasion", label: "Occasion" },
    { key: "pick-stay",     label: "Stay" },
    { key: "book",          label: "Extras" },
    { key: "confirm",       label: "Confirmed" },
  ];
  const idx = steps.findIndex(s => s.key === step);
  if (step === "home") return null;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, padding: "14px 20px", background: "#fff", borderBottom: "1px solid #f0ede8" }}>
      {steps.map((s, i) => (
        <div key={s.key} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: i <= idx ? PRIMARY : "#f0ede8", color: i <= idx ? "#fff" : "#aaa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, transition: "all 0.3s" }}>
              {i < idx ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 10, color: i <= idx ? PRIMARY : "#bbb", fontWeight: i === idx ? 600 : 400, whiteSpace: "nowrap" }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 48, height: 1, background: i < idx ? PRIMARY : "#e8e8e8", margin: "0 4px", marginBottom: 14, transition: "all 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── TIME ALERT ──────────────────────────────────────────────────────────────
function TimeAlert({ checkIn, decor }) {
  if (!checkIn || !decor) return null;
  const hoursLeft = (new Date(checkIn) - new Date()) / 3600000;
  const needed = decor.setupTime + 1.5;
  const ok = hoursLeft >= needed;
  return (
    <div style={{ borderRadius: 10, padding: "10px 14px", background: ok ? "#ECFDF5" : "#FFFBEB", border: `1px solid ${ok ? "#6EE7B7" : "#FCD34D"}`, fontSize: 12, marginTop: 12, color: ok ? "#065F46" : "#92400E", display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 16 }}>{ok ? "✅" : "⚠️"}</span>
      {ok ? `Plenty of time for setup (needs ${decor.setupTime}h + 1.5h buffer)` : `Setup needs ${needed}h before check-in. Try a later time or faster package.`}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState("home");
  const [occasion, setOccasion] = useState(null);
  const [stay, setStay] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [decor, setDecor] = useState(null);
  const [addons, setAddons] = useState([]);
  const [surpriseMode, setSurpriseMode] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [bookingId] = useState("CS-" + Math.floor(100000 + Math.random() * 900000));

  const occ = OCCASIONS.find(o => o.id === occasion);
  const decorList = occasion ? DECOR_PACKAGES[occasion] : [];
  const addonList = occasion ? ADDONS_BY_OCCASION[occasion] : [];
  const toggleAddon = a => setAddons(p => p.find(x => x.id === a.id) ? p.filter(x => x.id !== a.id) : [...p, a]);
  const total = (stay?.price || 0) + (decor?.price || 0) + addons.reduce((s, a) => s + a.price, 0);
  const canBook = stay && checkIn && decor;
  const reset = () => { setStep("home"); setOccasion(null); setStay(null); setCheckIn(""); setDecor(null); setAddons([]); setSurpriseMode(false); };

  useEffect(() => {
    if (step !== "home") return;
    const t = setInterval(() => setHeroIdx(i => (i + 1) % OCCASIONS.length), 4000);
    return () => clearInterval(t);
  }, [step]);

  // ── CONFIRM PAGE ─────────────────────────────────────────────────────────
  if (step === "confirm") return (
    <div style={{ ...S.font, minHeight: "100vh", background: SURFACE, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "2.5rem 2rem", maxWidth: 440, width: "100%", textAlign: "center", border: "1px solid #f0ede8", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 32 }}>✅</div>
        <h2 style={{ ...S.serif, fontSize: 28, color: PRIMARY, margin: "0 0 6px", fontWeight: 700 }}>Booking Confirmed!</h2>
        <p style={{ color: "#888", fontSize: 14, margin: "0 0 20px" }}>Your {occ.label} experience is all set.</p>

        <div style={{ background: GOLD_LIGHT, borderRadius: 12, padding: "14px 18px", marginBottom: 20, border: `1px solid ${GOLD}44` }}>
          <p style={{ fontSize: 11, color: "#999", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 1 }}>Booking ID</p>
          <p style={{ fontWeight: 700, fontSize: 20, color: PRIMARY, margin: 0, ...S.serif }}>{bookingId}</p>
        </div>

        <div style={{ textAlign: "left", fontSize: 13, color: "#555", marginBottom: 20, borderTop: "1px solid #f0ede8", paddingTop: 16 }}>
          {[
            ["Occasion", occ.label + " " + occ.emoji],
            ["Stay", stay.name],
            ["Decoration", decor.icon + " " + decor.name],
            ["Check-in", new Date(checkIn).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })],
            ...addons.map(a => [a.icon + " " + a.name, INR(a.price)]),
          ].map(([k, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f9f6f2" }}>
              <span style={{ color: "#999" }}>{k}</span>
              <span style={{ fontWeight: 600, color: PRIMARY }}>{v}</span>
            </div>
          ))}
          {surpriseMode && <div style={{ padding: "7px 0", color: "#065F46", fontSize: 12 }}>🤫 Surprise mode active</div>}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 4px", fontWeight: 700, fontSize: 17, borderTop: "2px solid #f0ede8", marginTop: 6 }}>
            <span>Total Paid</span><span style={{ color: GOLD }}>{INR(total)}</span>
          </div>
        </div>

        <div style={{ background: "#ECFDF5", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#065F46", marginBottom: 20, textAlign: "left" }}>
          ✅ Decoration team assigned · Setup begins {decor.setupTime}h before arrival · You'll receive WhatsApp confirmation
        </div>

        <button onClick={reset} style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", borderRadius: 14, padding: "15px", fontWeight: 600, fontSize: 15, cursor: "pointer", letterSpacing: 0.3 }}>
          Plan Another Celebration →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ ...S.font, minHeight: "100vh", background: SURFACE, color: PRIMARY }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f0ede8", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 200 }}>
        <span onClick={reset} style={{ ...S.serif, fontSize: 22, fontWeight: 700, color: PRIMARY, cursor: "pointer", letterSpacing: 0.5 }}>
          CelebStay <span style={{ color: GOLD }}>✦</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {occ && <span style={{ background: occ.light, color: occ.accent, fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 20, border: `1px solid ${occ.accent}33` }}>{occ.emoji} {occ.label}</span>}
          <a href="tel:+919999999999" style={{ fontSize: 12, color: "#777", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, background: "#f5f5f3", padding: "5px 12px", borderRadius: 20 }}>📞 Support</a>
          {step !== "home" && <button onClick={reset} style={{ fontSize: 11, color: "#888", background: "none", border: "1px solid #e0d8f0", borderRadius: 20, padding: "5px 14px", cursor: "pointer" }}>← Start over</button>}
        </div>
      </header>

      {/* Step bar */}
      <StepBar step={step} />

      {/* ── HOME ──────────────────────────────────────────────────────────── */}
      {step === "home" && (
        <div>
          {/* Hero */}
          <div style={{ position: "relative", height: 540, overflow: "hidden" }}>
            {OCCASIONS.map((o, i) => (
              <div key={o.id} style={{ position: "absolute", inset: 0, backgroundImage: `url(${o.img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: i === heroIdx ? 1 : 0, transition: "opacity 1.2s ease", filter: "brightness(0.35)" }} />
            ))}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${PRIMARY}CC 100%)` }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: GOLD, margin: "0 0 14px", fontWeight: 500 }}>Hyderabad's #1 Celebration Platform</p>
              <h1 style={{ ...S.serif, fontSize: 48, fontWeight: 700, margin: "0 0 16px", lineHeight: 1.15, color: "#fff", maxWidth: 560 }}>
                Stay. Celebrate.<br /><em>Remember Forever.</em>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, margin: "0 auto 32px", maxWidth: 440, lineHeight: 1.7 }}>
                Book your stay + decoration + extras in one place. We handle the magic — you walk in to wonder.
              </p>
              <button onClick={() => setStep("pick-occasion")}
                style={{ background: GOLD, color: PRIMARY, border: "none", borderRadius: 50, padding: "16px 40px", fontWeight: 700, fontSize: 15, cursor: "pointer", letterSpacing: 0.4 }}>
                Plan My Celebration →
              </button>

              {/* Occasion quick pills */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
                {OCCASIONS.map(o => (
                  <span key={o.id} onClick={() => { setOccasion(o.id); setStep("pick-stay"); }}
                    style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "7px 18px", borderRadius: 20, fontSize: 12, cursor: "pointer", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)", fontWeight: 500 }}>
                    {o.emoji} {o.label}
                  </span>
                ))}
              </div>
            </div>
            {/* Hero dots */}
            <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {OCCASIONS.map((_, i) => (
                <div key={i} onClick={() => setHeroIdx(i)} style={{ width: i === heroIdx ? 24 : 6, height: 6, borderRadius: 3, background: i === heroIdx ? GOLD : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
          </div>

          {/* Trust bar */}
          <div style={{ background: PRIMARY, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            {[["1,200+","Celebrations done"],["4.8★","Average rating"],["100%","Setup on time"],["24h","Free cancellation"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <p style={{ ...S.serif, fontSize: 20, color: GOLD, margin: 0, fontWeight: 700 }}>{n}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", margin: 0, marginTop: 2 }}>{l}</p>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 24px" }}>
            {/* Occasions grid */}
            <h2 style={{ ...S.serif, fontSize: 28, color: PRIMARY, margin: "0 0 4px", fontWeight: 700 }}>5 experiences we specialise in</h2>
            <p style={{ color: "#999", fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>We do these and only these — so we do them exceptionally well.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {OCCASIONS.map(o => (
                <div key={o.id} onClick={() => { setOccasion(o.id); setStep("pick-stay"); }}
                  style={{ background: "#fff", border: "1px solid #f0ede8", borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
                  <div style={{ height: 140, backgroundImage: `url(${o.img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${o.accent}99, transparent)` }} />
                    <span style={{ position: "absolute", bottom: 10, left: 14, fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: 1, textTransform: "uppercase" }}>{o.label}</span>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <p style={{ fontSize: 12, color: o.accent, fontWeight: 600, margin: "0 0 6px" }}>{o.tagline}</p>
                    <p style={{ fontSize: 12, color: "#666", margin: "0 0 12px", lineHeight: 1.6 }}>{o.description}</p>
                    <span style={{ fontSize: 12, fontWeight: 600, color: o.accent }}>See packages →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div style={{ marginTop: 56 }}>
              <h2 style={{ ...S.serif, fontSize: 28, color: PRIMARY, margin: "0 0 6px", fontWeight: 700 }}>How it works</h2>
              <p style={{ color: "#999", fontSize: 14, margin: "0 0 24px" }}>Four steps to your perfect celebration</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
                {[
                  ["01","Choose your occasion","5 curated experiences, done perfectly","#F5F0FF"],
                  ["02","Pick your stay","Hotels, villas, farmhouses in Hyderabad","#FDF0F8"],
                  ["03","Add décor & extras","Occasion-specific packages + add-ons","#ECFDF5"],
                  ["04","We execute it","Setup complete before you arrive","#FFFBEB"],
                ].map(([n,t,d,bg]) => (
                  <div key={n} style={{ background: bg, borderRadius: 16, padding: "1.4rem", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <div style={{ ...S.serif, fontSize: 28, fontWeight: 700, color: PRIMARY, marginBottom: 8, opacity: 0.25 }}>{n}</div>
                    <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 6px", color: PRIMARY }}>{t}</p>
                    <p style={{ fontSize: 12, color: "#666", margin: 0, lineHeight: 1.6 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div style={{ marginTop: 48, background: PRIMARY, borderRadius: 20, padding: "2rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <h3 style={{ ...S.serif, fontSize: 22, color: "#fff", margin: "0 0 6px", fontWeight: 700 }}>Need help planning?</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 }}>Our team is available 9 AM – 10 PM, 7 days a week</p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://wa.me/919999999999" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "11px 20px", borderRadius: 50, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>💬 WhatsApp Us</a>
                <a href="tel:+919999999999" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "#fff", padding: "11px 20px", borderRadius: 50, fontWeight: 600, fontSize: 13, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>📞 Call Us</a>
              </div>
            </div>
          </div>

          <footer style={{ background: PRIMARY, color: "rgba(255,255,255,0.45)", padding: "1.5rem 24px", textAlign: "center", fontSize: 12, marginTop: 16 }}>
            <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.7)", ...S.serif, fontSize: 16 }}>CelebStay <span style={{ color: GOLD }}>✦</span></p>
            Birthday · Anniversary · Proposal · Surprise Gifting · Date Night · Hyderabad
          </footer>
        </div>
      )}

      {/* ── PICK OCCASION ─────────────────────────────────────────────────── */}
      {step === "pick-occasion" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 24px" }}>
          <h2 style={{ ...S.serif, fontSize: 28, margin: "0 0 4px", fontWeight: 700 }}>What are you celebrating?</h2>
          <p style={{ color: "#999", fontSize: 14, margin: "0 0 24px" }}>Pick your occasion to see matching stays, packages and add-ons</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {OCCASIONS.map(o => (
              <div key={o.id} onClick={() => { setOccasion(o.id); setStep("pick-stay"); }}
                style={{ background: "#fff", border: "1px solid #f0ede8", borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
                <div style={{ height: 120, backgroundImage: `url(${o.img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${o.accent}CC, transparent)` }} />
                  <span style={{ position: "absolute", bottom: 10, left: 14, fontSize: 22 }}>{o.emoji}</span>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <h3 style={{ ...S.serif, fontSize: 18, margin: "0 0 3px", color: PRIMARY }}>{o.label}</h3>
                  <p style={{ fontSize: 12, color: o.accent, fontWeight: 600, margin: 0 }}>{o.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PICK STAY ─────────────────────────────────────────────────────── */}
      {step === "pick-stay" && occ && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 24px" }}>
          <div style={{ background: occ.light, borderRadius: 16, padding: "1rem 1.4rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 14, border: `1px solid ${occ.accent}22` }}>
            <span style={{ fontSize: 32 }}>{occ.emoji}</span>
            <div>
              <h2 style={{ ...S.serif, fontSize: 20, margin: 0, color: PRIMARY, fontWeight: 700 }}>{occ.label} — Pick your stay</h2>
              <p style={{ fontSize: 12, color: "#777", margin: 0, marginTop: 2 }}>{occ.description}</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {STAYS.map(s => (
              <div key={s.id} onClick={() => { setStay(s); setStep("book"); }}
                style={{ background: "#fff", border: "1px solid #f0ede8", borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
                <div style={{ height: 160, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  <span style={{ position: "absolute", top: 10, left: 10, background: occ.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{s.tag}</span>
                  <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 11, padding: "3px 8px", borderRadius: 10 }}>★ {s.rating}</span>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <h3 style={{ ...S.serif, fontSize: 16, margin: "0 0 2px", color: PRIMARY, fontWeight: 700 }}>{s.name}</h3>
                  <p style={{ fontSize: 11, color: "#aaa", margin: "0 0 8px" }}>{s.type} · Hyderabad · {s.reviews} reviews</p>
                  <p style={{ fontSize: 12, color: "#555", margin: "0 0 12px", lineHeight: 1.5 }}>{s.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ ...S.serif, fontSize: 18, fontWeight: 700, color: PRIMARY }}>{INR(s.price)}<span style={{ fontSize: 11, fontWeight: 400, color: "#aaa" }}>/night</span></span>
                    <span style={{ background: occ.light, color: occ.accent, fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>Select →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BOOK ──────────────────────────────────────────────────────────── */}
      {step === "book" && occ && stay && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
            <div>
              {/* Stay card */}
              <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #f0ede8", padding: "1.2rem 1.4rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 72, height: 72, borderRadius: 12, backgroundImage: `url(${stay.img})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ ...S.serif, fontSize: 17, fontWeight: 700, margin: "0 0 2px", color: PRIMARY }}>{stay.name}</h3>
                      <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>{stay.type} · {INR(stay.price)}/night</p>
                    </div>
                    <button onClick={() => setStep("pick-stay")} style={{ fontSize: 11, color: "#888", background: "none", border: "1px solid #e0d8f0", borderRadius: 20, padding: "4px 12px", cursor: "pointer" }}>Change</button>
                  </div>
                </div>
              </div>

              {/* Check-in */}
              <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #f0ede8", padding: "1.2rem 1.4rem", marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: PRIMARY, display: "block", marginBottom: 8 }}>Check-in Date & Time</label>
                <input type="datetime-local" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={new Date().toISOString().slice(0,16)}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0d8f0", borderRadius: 12, fontSize: 14, boxSizing: "border-box", color: PRIMARY, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
              </div>

              {/* Occasion banner */}
              <div style={{ background: occ.light, borderRadius: 14, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, border: `1px solid ${occ.accent}22` }}>
                <span style={{ fontSize: 28 }}>{occ.emoji}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: occ.accent }}>{occ.label}</p>
                  <p style={{ fontSize: 11, color: "#777", margin: 0 }}>{occ.tagline}</p>
                </div>
              </div>

              {/* Decoration packages */}
              <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #f0ede8", padding: "1.2rem 1.4rem", marginBottom: 16 }}>
                <h3 style={{ ...S.serif, fontSize: 18, margin: "0 0 14px", fontWeight: 700 }}>Decoration Package</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {decorList.map(d => (
                    <div key={d.id} onClick={() => setDecor(d)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, cursor: "pointer", border: `2px solid ${decor?.id === d.id ? occ.accent : "#f0ede8"}`, background: decor?.id === d.id ? occ.light : "#faf8f5", transition: "all 0.15s" }}>
                      <span style={{ fontSize: 30, flexShrink: 0 }}>{d.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, fontSize: 14, color: PRIMARY }}>{d.name}</span>
                          <span style={{ background: occ.light, color: occ.accent, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, border: `1px solid ${occ.accent}22` }}>{d.highlight}</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#888", margin: "0 0 2px" }}>{d.desc}</p>
                        <p style={{ fontSize: 11, color: "#ccc", margin: 0 }}>Setup time: {d.setupTime}h</p>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 16, color: occ.accent, flexShrink: 0 }}>{INR(d.price)}</span>
                    </div>
                  ))}
                </div>
                <TimeAlert checkIn={checkIn} decor={decor} />
              </div>

              {/* Add-ons */}
              <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #f0ede8", padding: "1.2rem 1.4rem", marginBottom: 16 }}>
                <h3 style={{ ...S.serif, fontSize: 18, margin: "0 0 4px", fontWeight: 700 }}>Add-ons for {occ.label}</h3>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 14px" }}>Enhance your celebration with curated extras</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {addonList.map(a => {
                    const sel = addons.find(x => x.id === a.id);
                    return (
                      <div key={a.id} onClick={() => toggleAddon(a)}
                        style={{ background: sel ? occ.light : "#faf8f5", border: `2px solid ${sel ? occ.accent : "#f0ede8"}`, borderRadius: 12, padding: "12px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}>
                        <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: PRIMARY, margin: "0 0 3px", lineHeight: 1.3 }}>{a.name}</p>
                        <p style={{ fontSize: 11, color: occ.accent, fontWeight: 700, margin: 0 }}>{INR(a.price)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Surprise Mode */}
              <div onClick={() => setSurpriseMode(!surpriseMode)}
                style={{ background: surpriseMode ? occ.light : "#fff", borderRadius: 16, border: `2px solid ${surpriseMode ? occ.accent : "#e8e4f0"}`, padding: "1rem 1.2rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 26 }}>🤫</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 2px", color: PRIMARY }}>Surprise Mode</p>
                  <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Vendors briefed silently. Guest won't be contacted at all.</p>
                </div>
                <div style={{ width: 42, height: 24, borderRadius: 12, background: surpriseMode ? occ.accent : "#ddd", position: "relative", transition: "background 0.25s", flexShrink: 0 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 4, left: surpriseMode ? 22 : 4, transition: "left 0.25s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                </div>
              </div>
            </div>

            {/* RIGHT — Order Summary */}
            <div style={{ position: "sticky", top: 80 }}>
              <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #f0ede8", padding: "1.4rem", boxShadow: "0 6px 24px rgba(0,0,0,0.07)" }}>
                <h3 style={{ ...S.serif, fontSize: 18, margin: "0 0 16px", fontWeight: 700 }}>Your Order</h3>
                <div style={{ fontSize: 13, color: "#555" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f5f3f0" }}>
                    <span>🏠 {stay.name}</span><span style={{ fontWeight: 600 }}>{INR(stay.price)}</span>
                  </div>
                  {decor && (
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f5f3f0" }}>
                      <span>{decor.icon} {decor.name}</span><span style={{ fontWeight: 600 }}>{INR(decor.price)}</span>
                    </div>
                  )}
                  {addons.map(a => (
                    <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f5f3f0" }}>
                      <span>{a.icon} {a.name}</span><span style={{ fontWeight: 600 }}>{INR(a.price)}</span>
                    </div>
                  ))}
                  {surpriseMode && <div style={{ padding: "6px 0", color: occ.accent, fontSize: 12 }}>🤫 Surprise mode active</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 4px", fontWeight: 700, fontSize: 18, borderTop: "2px solid #f0ede8", marginTop: 8, ...S.serif }}>
                    <span>Total</span><span style={{ color: GOLD }}>{INR(total)}</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#ccc", margin: "2px 0 16px" }}>Incl. platform fee · {INR(Math.round(total * 0.17))} commission</p>
                </div>

                {!canBook && (
                  <div style={{ background: "#FFFBEB", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#92400E", marginBottom: 12 }}>
                    {!checkIn ? "⚠️ Set a check-in date & time" : !decor ? "⚠️ Choose a decoration package" : ""}
                  </div>
                )}
                <button onClick={() => canBook && setStep("confirm")} disabled={!canBook}
                  style={{ width: "100%", background: canBook ? PRIMARY : "#e0dbd8", color: canBook ? "#fff" : "#bbb", border: "none", borderRadius: 14, padding: "15px", fontWeight: 700, fontSize: 15, cursor: canBook ? "pointer" : "not-allowed", letterSpacing: 0.3, transition: "all 0.2s" }}>
                  {canBook ? `Confirm & Pay ${INR(total)}` : "Complete above to continue"}
                </button>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10 }}>
                  <span style={{ fontSize: 10, color: "#ccc" }}>🔒 Secured via Razorpay</span>
                  <span style={{ fontSize: 10, color: "#ccc" }}>·</span>
                  <span style={{ fontSize: 10, color: "#ccc" }}>Free cancellation 24h before</span>
                </div>

                {/* Contact support */}
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #f5f3f0", display: "flex", gap: 8 }}>
                  <a href="https://wa.me/919999999999" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#F0FDF4", color: "#065F46", padding: "8px", borderRadius: 10, fontWeight: 600, fontSize: 12, textDecoration: "none", border: "1px solid #BBF7D0" }}>💬 WhatsApp</a>
                  <a href="tel:+919999999999" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#F5F3FF", color: "#4A1D96", padding: "8px", borderRadius: 10, fontWeight: 600, fontSize: 12, textDecoration: "none", border: "1px solid #DDD6FE" }}>📞 Call Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step !== "home" && (
        <footer style={{ background: PRIMARY, color: "rgba(255,255,255,0.4)", padding: "1.2rem 24px", textAlign: "center", marginTop: 40, fontSize: 11 }}>
          CelebStay ✦ Birthday · Anniversary · Proposal · Surprise Gifting · Date Night · Hyderabad
        </footer>
      )}
    </div>
  );
}
