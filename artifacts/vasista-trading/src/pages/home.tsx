import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import {
  Mail, Phone, MapPin, Globe, ArrowRight,
  TrendingUp, ShieldCheck, Shield, Zap, Award,
  Truck, Users
} from "lucide-react";
import logoImg from "@assets/IMG_9740_1777699336524.jpg";
import { Button } from "@/components/ui/button";
// ── SVG Globe with animated trade routes (no WebGL required) ─────────────────

const TRADE_ROUTES = [
  // [x1,y1, cx,cy, x2,y2, label, duration, delay]
  [260, 195, 310, 120, 370, 155, "Mumbai → Shanghai",   8,  0],
  [260, 195, 285, 230, 310, 240, "Mumbai → Singapore",  7,  1],
  [260, 195, 240, 150, 220, 170, "Mumbai → Dubai",      6,  2],
  [260, 195, 210,  80, 150, 100, "Mumbai → London",    10,  0.5],
  [260, 195, 185,  90, 100, 160, "Mumbai → New York",  12,  1.5],
  [260, 195, 340, 120, 415, 140, "Mumbai → Tokyo",      9,  2.5],
  [220, 170, 185,  90, 150, 100, "Dubai → London",      8,  3],
  [370, 155, 415, 100, 415, 140, "Shanghai → Tokyo",    6,  1],
];

const HUBS = [
  { x: 260, y: 195, label: "Mumbai", gold: true },
  { x: 370, y: 155, label: "Shanghai", gold: false },
  { x: 310, y: 240, label: "Singapore", gold: false },
  { x: 220, y: 170, label: "Dubai", gold: false },
  { x: 150, y: 100, label: "London", gold: false },
  { x: 100, y: 160, label: "New York", gold: false },
  { x: 415, y: 140, label: "Tokyo", gold: false },
  { x: 450, y: 255, label: "Sydney", gold: false },
  { x: 175, y:  85, label: "Berlin", gold: false },
];

function GlobeCanvas() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Rotating rings – CSS 3D globe illusion */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 30, 60, 90, 120, 150].map((deg, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-blue-500/20"
            style={{
              width: `${220 + i * 14}px`,
              height: `${220 + i * 14}px`,
              transform: `rotateX(75deg) rotateZ(${deg}deg)`,
              animation: `spin ${18 + i * 4}s linear infinite`,
            }}
          />
        ))}
        {/* Solid globe core */}
        <div
          className="absolute rounded-full"
          style={{
            width: 220, height: 220,
            background: "radial-gradient(circle at 38% 35%, #1a3a9f 0%, #0a1a6e 50%, #040d24 100%)",
            boxShadow: "0 0 60px 10px rgba(30,79,216,0.25), inset 0 0 40px rgba(0,0,0,0.5)",
          }}
        />
        {/* Atmosphere glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 240, height: 240,
            background: "radial-gradient(circle, transparent 45%, rgba(30,79,216,0.15) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* SVG trade routes overlay */}
      <svg
        viewBox="0 0 520 400"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 6px rgba(30,79,216,0.4))" }}
      >
        <defs>
          {/* Glowing gold dot marker */}
          <radialGradient id="goldDot">
            <stop offset="0%" stopColor="#f0c040" />
            <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blueDot">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Draw route arcs */}
        {TRADE_ROUTES.map(([x1, y1, cx, cy, x2, y2, , dur, delay], i) => (
          <g key={i}>
            <path
              d={`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`}
              fill="none"
              stroke="rgba(96,165,250,0.35)"
              strokeWidth="1.2"
              strokeDasharray="5 4"
            />
            {/* Animated traveler dot */}
            <circle r="3.5" fill="#f0c040" opacity="0.9">
              <animateMotion
                dur={`${dur}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
                path={`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`}
              />
            </circle>
          </g>
        ))}

        {/* Hub dots */}
        {HUBS.map((hub, i) => (
          <g key={i}>
            {/* Outer pulse ring */}
            <circle cx={hub.x} cy={hub.y} r="9" fill="none"
              stroke={hub.gold ? "rgba(240,192,64,0.4)" : "rgba(96,165,250,0.3)"}
              strokeWidth="1">
              <animate attributeName="r" values="6;12;6" dur="3s"
                begin={`${i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="3s"
                begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            {/* Core dot */}
            <circle cx={hub.x} cy={hub.y} r="4.5"
              fill={hub.gold ? "#f0c040" : "#60a5fa"}
              style={{ filter: `drop-shadow(0 0 4px ${hub.gold ? "#f0c040" : "#60a5fa"})` }}
            />
            {/* Label */}
            <text
              x={hub.x + (hub.x > 260 ? 8 : -8)} y={hub.y - 7}
              fontSize="8" fill={hub.gold ? "#f0c040" : "rgba(190,220,255,0.7)"}
              textAnchor={hub.x > 260 ? "start" : "end"}
              fontFamily="monospace"
            >{hub.label}</text>
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes spin { from { transform: rotateX(75deg) rotateZ(var(--r, 0deg)); } to { transform: rotateX(75deg) rotateZ(calc(var(--r, 0deg) + 360deg)); } }
      `}</style>
    </div>
  );
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(start);
    }, 20);
    return () => clearInterval(interval);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Data ─────────────────────────────────────────────────────────────────────


const values = [
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "Building enduring partnerships through transparent, ethical, and reliable trading practices.",
    color: "from-blue-600 to-blue-400",
  },
  {
    icon: Award,
    title: "Quality",
    desc: "Rigorous quality control ensuring premium-grade commodities meet every industry standard.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: Zap,
    title: "Commitment",
    desc: "Unwavering dedication to fulfillment timelines and excellence across the global supply chain.",
    color: "from-indigo-600 to-blue-400",
  },
];

const stats = [
  { icon: MapPin, value: 6, suffix: "", label: "States Covered" },
  { icon: Users, value: 500, suffix: "+", label: "Trade Partners" },
  { icon: Globe, value: 30, suffix: "+", label: "Countries Served" },
];

const services = [
  { icon: Truck, title: "Import Services", desc: "Seamless procurement and delivery of industrial commodities from global suppliers." },
  { icon: Globe, title: "Export Services", desc: "Connecting Indian producers to world markets with full logistics support." },
  { icon: Shield, title: "Quality Assurance", desc: "End-to-end quality inspection and certification for every shipment." },
  { icon: TrendingUp, title: "Market Intelligence", desc: "Real-time commodity pricing and market analysis for strategic decisions." },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="font-sans antialiased overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-amber-400 ring-offset-1 bg-navy-900">
              <img src={logoImg} alt="Vasista Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className={`font-rajdhani font-bold text-xl leading-tight tracking-wide ${scrolled ? "text-[#0a1a6e]" : "text-white"}`}>VASISTA</div>
              <div className={`text-[10px] uppercase tracking-widest font-semibold ${scrolled ? "text-amber-600" : "text-amber-400"}`}>Trading Services</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            {["About", "Services", "Contact"].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                data-testid={`link-nav-${link.toLowerCase()}`}
                className={`transition-colors hover:text-amber-500 ${scrolled ? "text-gray-700" : "text-white/80 hover:text-white"}`}
              >{link}</a>
            ))}
          </div>

          <a
            href="#contact"
            data-testid="button-partner-nav"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 font-bold text-sm uppercase tracking-wider px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-amber-400/30 transition-all"
          >
            Get In Touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>

      {/* ── HERO ── dark section with 3D globe */}
      <section className="relative min-h-screen bg-[#030b1e] overflow-hidden flex items-center">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,79,216,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,79,216,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_60%_0%,rgba(20,60,180,0.30),transparent)]" />
        {/* Floating glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-700/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-indigo-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: "9s" }} />
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-amber-500/8 rounded-full blur-[60px] animate-pulse" style={{ animationDuration: "7s" }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#030b1e] to-transparent" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Left text */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeUp} className="font-rajdhani text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
              GLOBAL TRADE,{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                INDUSTRIAL
              </span>{" "}
              EXCELLENCE
            </motion.h1>

            <motion.p variants={fadeUp} className="text-blue-200/70 text-lg leading-relaxed max-w-lg mb-10">
              Vasista Trading Services connects Indian industries to the global commodity market — delivering premium industrial materials with uncompromising quality and reliability.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <a
                href="#services"
                data-testid="button-hero-explore"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:shadow-xl hover:shadow-amber-400/30 transition-all group text-sm"
              >
                Our Services
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                data-testid="button-hero-contact"
                className="flex items-center gap-2 border border-white/20 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/10 transition-all text-sm"
              >
                Contact Us
              </a>
            </motion.div>

            {/* Live stats strip */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
              {[
                { val: "500+", label: "Trade Partners" },
                { val: "30+", label: "Countries" },
              ].map(s => (
                <div key={s.label} className="border-l-2 border-amber-400/40 pl-4">
                  <div className="font-rajdhani text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">{s.val}</div>
                  <div className="text-blue-300/60 text-xs uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-[480px] lg:h-[560px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-amber-400/5 rounded-full blur-3xl" />
            <div className="w-full h-full">
              <GlobeCanvas />
            </div>
            {/* Trade route label */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 text-xs text-blue-200 whitespace-nowrap">
              Live trade route simulation — Mumbai HQ
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
          SCROLL
        </div>
      </section>

      {/* ── STATS BAND ── gradient dark-to-white transition */}
      <section className="relative bg-gradient-to-b from-[#030b1e] to-white pt-0 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-blue-100 border border-gray-100 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 overflow-hidden">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                data-testid={`stat-${i}`}
                className="flex items-center gap-5 px-10 py-9 group hover:bg-blue-50/50 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0a1a6e] to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-rajdhani text-4xl font-bold text-[#0a1a6e] leading-none">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-gray-400 text-sm mt-1 font-medium">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / VALUES ── white */}
      <section id="about" className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-3 block">Who We Are</span>
              <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-[#0a1a6e] mb-6 leading-tight">
                Powering India's Industrial Supply Chain
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Vasista Trading Services Pvt. Ltd. is a Mumbai-headquartered import & export enterprise delivering excellence in global trading and industrial supply. With a growing network of global partnerships across continents, we are the trusted bridge between world commodity markets and Indian industry.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our tagline says it all: <strong className="text-[#0a1a6e]">Trust. Quality. Commitment.</strong> These are not just words — they are the foundation of every transaction we execute.
              </p>
              <div className="flex items-center gap-6">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-400 to-transparent" />
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-400">
                  <img src={logoImg} alt="Vasista" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:bg-white transition-all border border-gray-100 flex gap-5 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center flex-shrink-0`}>
                    <v.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-rajdhani text-xl font-bold text-[#0a1a6e] mb-1">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── SERVICES ── dark navy section */}
      <section id="services" className="bg-[#030b1e] py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,79,216,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,79,216,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-700/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-400/6 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block text-amber-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 px-5 py-2 rounded-full border border-amber-400/20 bg-amber-400/5">What We Offer</span>
            <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white mt-2">Our Services</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group relative bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.08] rounded-3xl p-8 hover:border-amber-400/25 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all rounded-3xl" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/40 group-hover:from-amber-500 group-hover:to-amber-700 transition-all">
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-rajdhani font-bold text-xl text-white mb-3">{s.title}</h3>
                  <p className="text-blue-200/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CONTACT ── white */}
      <section id="contact" className="bg-gray-50 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-3 block">Get In Touch</span>
            <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-[#0a1a6e]">Initiate a Trade Inquiry</h2>
            <p className="text-gray-500 max-w-md mx-auto mt-4">Connect with our Mumbai headquarters to discuss your import/export requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: Mail, label: "Email", value: "info@vasistatradingservices.com", href: "mailto:info@vasistatradingservices.com", testid: "link-contact-email" },
              { icon: Phone, label: "Phone", value: "+91 85919 38908", href: "tel:+918591938908", testid: "link-contact-phone" },
              { icon: Globe, label: "Website", value: "vasistatradingservices.com", href: "https://www.vasistatradingservices.com", testid: "link-contact-website" },
              { icon: MapPin, label: "Location", value: "Mumbai, Maharashtra, India", href: "#", testid: "link-contact-location" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-testid={item.testid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-gray-50 hover:bg-[#0a1a6e] border border-gray-100 hover:border-[#0a1a6e] rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-900/20"
              >
                <div className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-xl flex items-center justify-center mb-4 shadow-sm transition-all">
                  <item.icon className="h-5 w-5 text-blue-600 group-hover:text-amber-400 transition-colors" />
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-blue-200 font-semibold mb-1 transition-colors">{item.label}</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors">{item.value}</div>
              </motion.a>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#0a1a6e] via-[#1a2d8f] to-[#0a1a6e] rounded-3xl p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.1),transparent_70%)]" />
            <div className="relative z-10">
              <h3 className="font-rajdhani text-3xl md:text-4xl font-bold text-white mb-3">Ready to Trade Globally?</h3>
              <p className="text-blue-200/70 mb-8 max-w-md mx-auto">Whether you're sourcing industrial materials or looking to export, Vasista is your trusted partner.</p>
              <a
                href="mailto:info@vasistatradingservices.com"
                data-testid="button-cta-email"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 font-bold uppercase tracking-wider px-10 py-4 rounded-full hover:shadow-xl hover:shadow-amber-400/30 transition-all text-sm"
              >
                Send Trade Inquiry <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── dark */}
      <footer className="bg-[#040d24] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-amber-400">
                  <img src={logoImg} alt="Vasista" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-rajdhani font-bold text-xl text-white leading-tight">VASISTA</div>
                  <div className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">Trading Services Pvt. Ltd.</div>
                </div>
              </div>
              <p className="text-blue-200/50 text-sm leading-relaxed max-w-sm mb-6">
                Delivering excellence in global trading and industrial supply since establishment. GST: 37AALCV9169R1ZY
              </p>
              <div className="flex gap-3">
                {[
                  { icon: SiFacebook, href: "https://facebook.com/share/1HWeDcLf9Q", testid: "link-social-facebook" },
                  { icon: SiInstagram, href: "https://instagram.com/vasista_trading_services", testid: "link-social-instagram" },
                  { icon: FaLinkedinIn, href: "https://linkedin.com/company/vasista-trading-services-private-limited", testid: "link-social-linkedin" },
                ].map(({ icon: Icon, href, testid }) => (
                  <a key={testid} href={href} data-testid={testid} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:border-amber-400 hover:text-gray-900 text-white/60 transition-all">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="font-rajdhani font-bold text-white text-lg mb-4">Quick Links</div>
              <ul className="space-y-2 text-sm text-blue-200/50">
                {["About", "Services", "Contact"].map(l => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-amber-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-rajdhani font-bold text-white text-lg mb-4">Contact</div>
              <ul className="space-y-3 text-sm text-blue-200/50">
                <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-amber-400/60" />info@vasistatradingservices.com</li>
                <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-amber-400/60" />+91 85919 38908</li>
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-amber-400/60" />Mumbai, Maharashtra, India</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-200/30">
            <p>&copy; {new Date().getFullYear()} Vasista Trading Services Pvt. Ltd. All rights reserved.</p>
            <p className="flex items-center gap-2">
              TRUST <span className="w-1 h-1 rounded-full bg-amber-400/50 inline-block" />
              QUALITY <span className="w-1 h-1 rounded-full bg-amber-400/50 inline-block" />
              COMMITMENT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
