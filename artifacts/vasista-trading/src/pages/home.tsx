import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import {
  Mail, Phone, MapPin, Globe, ArrowRight,
  TrendingUp, ShieldCheck, Shield, Zap, Award,
  Truck, Users, Package, Search, FileText, CheckCircle2,
  Clock, Compass, Anchor, Ship, FileCheck, Layers
} from "lucide-react";
import logoImg from "@assets/IMG_9740_1777699336524.jpg";

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
  { x: 260, y: 195, label: "Mumbai (HQ)", gold: true },
  { x: 370, y: 155, label: "Shanghai", gold: false },
  { x: 310, y: 240, label: "Singapore", gold: false },
  { x: 220, y: 170, label: "Dubai", gold: false },
  { x: 150, y: 100, label: "London", gold: false },
  { x: 100, y: 160, label: "New York", gold: false },
  { x: 415, y: 140, label: "Tokyo", gold: false },
  { x: 450, y: 255, label: "Sydney", gold: false },
  { x: 175, y:  85, label: "Rotterdam", gold: false },
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
            <circle cx={hub.x} cy={hub.y} r="9" fill="none"
              stroke={hub.gold ? "rgba(240,192,64,0.4)" : "rgba(96,165,250,0.3)"}
              strokeWidth="1">
              <animate attributeName="r" values="6;12;6" dur="3s"
                begin={`${i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="3s"
                begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={hub.x} cy={hub.y} r="4.5"
              fill={hub.gold ? "#f0c040" : "#60a5fa"}
              style={{ filter: `drop-shadow(0 0 4px ${hub.gold ? "#f0c040" : "#60a5fa"})` }}
            />
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

// ── B2B Products Catalog with HS Codes, Origin Country, and MOQs ──────────────
const B2B_PRODUCTS = [
  {
    id: "limestone",
    name: "Limestone",
    category: "Minerals & Metals",
    hsCode: "HS 2521.00",
    originCountry: "India · Oman · UAE",
    moq: "100 MT (Container/Rake)",
    specs: "CaCO₃: 90%–95% | CaO: 50%–54% | SiO₂: < 3.0%",
    grades: "SMS Grade, BF Grade, Kiln Feed, Chemical & Micronized",
    packaging: "Bulk ocean vessels, Rake loads, 1.25 MT Jumbo bags",
    tag: "Flux Stone"
  },
  {
    id: "iron-ore",
    name: "Iron Ore",
    category: "Minerals & Metals",
    hsCode: "HS 2601.11",
    originCountry: "India · Australia · Brazil",
    moq: "500 MT (Bulk/Rake)",
    specs: "Fe: 58%–64.5% Basis | SiO₂: 2.5%–4.5% | Al₂O₃: 1.8%–3.2%",
    grades: "Iron Ore Fines (0–10mm), Calibrated Lump Ore (10–30mm), Pellets",
    packaging: "Supramax vessel cargo, Railway rakes, 20ft Containers",
    tag: "High-Fe Ore"
  },
  {
    id: "coal",
    name: "Thermal & Coking Coal",
    category: "Energy & Carbon",
    hsCode: "HS 2701.12",
    originCountry: "Indonesia · South Africa · Australia",
    moq: "500 MT (Bulk Vessel Cargo)",
    specs: "GCV: 3800–6000 kcal/kg | Moisture: 12%–28% | Ash: 6%–18%",
    grades: "Indonesian Steaming (GAR 3800/4200/5000), South African RB1/RB3",
    packaging: "Panamax/Capesize vessels, Rail rakes, Stockyard tipper trucks",
    tag: "Solid Fuel"
  },
  {
    id: "urea",
    name: "Urea (Technical & Agro)",
    category: "Chemicals & Inputs",
    hsCode: "HS 3102.10",
    originCountry: "Oman · Russia · India",
    moq: "100 MT (Container/Bulk)",
    specs: "Nitrogen: 46.0% min | Biuret: < 1.0% | Moisture: < 0.5%",
    grades: "Prilled Fertilizer Grade (Neem-coated), Technical Non-Coated",
    packaging: "50kg Woven PP bags with PE liner, 1.0 MT Jumbo slings",
    tag: "Fertilizer"
  },
  {
    id: "steel-scrap",
    name: "Steel Scrap (HMS 1/2)",
    category: "Minerals & Metals",
    hsCode: "HS 7204.49",
    originCountry: "ISRI-Certified Yards (USA, EU, UAE)",
    moq: "50 MT (2x20ft FCL)",
    specs: "ISRI 200–206 Standards | Min Thickness: 6mm | Non-metallics: < 1%",
    grades: "HMS 1, HMS 2 (80:20), Shredded (ISRI 211), Plate & Structural",
    packaging: "20ft Heavy shipping containers (approx. 24–28 MT per FCL)",
    tag: "Recycled Metal"
  },
  {
    id: "pet-coke",
    name: "Pet Coke (Green Delayed)",
    category: "Energy & Carbon",
    hsCode: "HS 2713.11",
    originCountry: "USA (US Gulf) · Saudi Arabia · India",
    moq: "200 MT (Bulk Consignment)",
    specs: "GCV: > 7500–8200 kcal/kg | Fixed Carbon: > 85% | Ash: < 1.0%",
    grades: "Fuel Grade Green Delayed Pet Coke (Raw GPC), Calcined CPC",
    packaging: "Bulk ocean vessels, Open railway wagons, Port tipper fleets",
    tag: "Carbon Fuel"
  },
  {
    id: "masala-items",
    name: "Whole Spices & Masala",
    category: "Food & Agri",
    hsCode: "HS 0910.30",
    originCountry: "India (Guntur, Nizamabad, Alleppey)",
    moq: "5 MT (1x20ft FCL)",
    specs: "Moisture: < 10%–12% | Curcumin in Turmeric: 3.0%–5.0% min",
    grades: "Stemless Teja Chilli, Salem/Nizamabad Turmeric, Cleaned Cumin",
    packaging: "10kg/25kg/50kg Food-grade Jute and PP laminated bags",
    tag: "Agro Commodity"
  },
  {
    id: "dry-fruits",
    name: "Dry Fruits & Cashews",
    category: "Food & Agri",
    hsCode: "HS 0801.32",
    originCountry: "India · Ivory Coast · Vietnam · USA",
    moq: "5 MT (1x20ft FCL)",
    specs: "Cashew Grades: W180, W210, W240, W320 | Moisture: < 5.0%",
    grades: "Whole White Export Cashews, Nonpareil Almonds, Golden Raisins",
    packaging: "2x25 lb Flexi vacuum pouches in 50 lb master export carton",
    tag: "Premium Nut"
  }
];

// ── Live Freight & Container Tracking Data Skeleton ─────────────────────────
interface TrackingMilestone {
  step: string;
  date: string;
  location: string;
  status: "completed" | "current" | "upcoming";
  desc: string;
}

interface ShipmentData {
  trackingId: string;
  containerNo: string;
  commodity: string;
  hsCode: string;
  carrier: string;
  vessel: string;
  originPort: string;
  destPort: string;
  status: string;
  statusColor: string;
  eta: string;
  milestones: TrackingMilestone[];
}

const SAMPLE_SHIPMENTS: Record<string, ShipmentData> = {
  "VAS-IN-849201": {
    trackingId: "VAS-IN-849201",
    containerNo: "MEDU8492015",
    commodity: "Limestone SMS Grade (Calibrated)",
    hsCode: "HS 2521.00",
    carrier: "MSC Mediterranean Shipping Company",
    vessel: "MSC TINA / V.VU2604W",
    originPort: "Visakhapatnam Port (INVTZ)",
    destPort: "Port of Singapore (SGSIN)",
    status: "On High Seas · Maritime Transit",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    eta: "18 Oct 2026",
    milestones: [
      { step: "Booking & Commercial Indent Confirmed", date: "28 Sep 2026", location: "Visakhapatnam Desk", status: "completed", desc: "Contract signed, LC verified, and container allocation booked." },
      { step: "Stockyard Staged & SGS Certified", date: "30 Sep 2026", location: "Berth 5 Stockyard, Vizag", status: "completed", desc: "SGS Lab Certificate #VIZ-2026-8812 verified (CaCO₃: 95.4%)." },
      { step: "Customs LEO & Vessel Loading", date: "03 Oct 2026", location: "Berth 5, Visakhapatnam Port", status: "completed", desc: "Let Export Order granted; Master B/L MEDUIN9940120 released." },
      { step: "Ocean Maritime Transit", date: "05 Oct 2026", location: "Bay of Bengal (AIS Coordinates 14.2°N, 83.9°E)", status: "current", desc: "Underway on maritime shipping corridor toward Malacca Strait." },
      { step: "Destination Port Discharge & Handover", date: "18 Oct 2026 (Est)", location: "Pasir Panjang Terminal, Singapore", status: "upcoming", desc: "Scheduled terminal discharge and direct handover to receiver." },
    ]
  },
  "MSKU-9028312": {
    trackingId: "MSKU-9028312",
    containerNo: "MSKU9028312",
    commodity: "Thermal Steaming Coal (GAR 5000)",
    hsCode: "HS 2701.12",
    carrier: "Maersk Line",
    vessel: "MAERSK BULKER / V.MB2026",
    originPort: "Port of Tanjung Priok, Jakarta (IDJKT)",
    destPort: "Mundra Port, Gujarat (INMUN)",
    status: "Customs Cleared · Discharge Ready",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    eta: "04 Oct 2026 (Arrived)",
    milestones: [
      { step: "Vessel Booking & Loading", date: "24 Sep 2026", location: "Jakarta Siding", status: "completed", desc: "Draft survey completed and hold sealing executed." },
      { step: "SGS Indonesian Lab Assay", date: "25 Sep 2026", location: "Tanjung Priok Lab", status: "completed", desc: "GCV 6,050 kcal/kg verified; Total Moisture 12.8% within limit." },
      { step: "Ocean Sea Route Transit", date: "01 Oct 2026", location: "Indian Ocean Gateway", status: "completed", desc: "Vessel transit completed without maritime deviations." },
      { step: "Mundra Port Berthing", date: "04 Oct 2026", location: "Berth 2 Mundra Port", status: "completed", desc: "Gantry crane grab discharge initiated into railway rakes." },
      { step: "Customs Cleared & Plant Rake Indent", date: "05 Oct 2026", location: "Mundra CFS & Rake Siding", status: "current", desc: "Bill of Entry out-of-charge granted; dispatching to power plant." }
    ]
  },
  "MEDU-4820194": {
    trackingId: "MEDU-4820194",
    containerNo: "MEDU4820194",
    commodity: "Iron Ore Fines (Fe 64.5% Basis)",
    hsCode: "HS 2601.11",
    carrier: "Indian Coastal Shipping Feeder",
    vessel: "MV GANGA VOYAGER",
    originPort: "Gangavaram Port (INGGV)",
    destPort: "JNPT Mumbai / Nhava Sheva (INNSA)",
    status: "Origin Berth Staged · Lab Audited",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    eta: "14 Oct 2026 (Est)",
    milestones: [
      { step: "Commercial Sales Indent", date: "01 Oct 2026", location: "Andhra Industrial Desk", status: "completed", desc: "Mining allocation and railway rake indent approved." },
      { step: "Gangavaram Port Yard Staging", date: "04 Oct 2026", location: "Gangavaram Yard Stack 4", status: "current", desc: "Pre-shipment sampling and composite chemical assay in progress." },
      { step: "Berth Loading onto Barge/Vessel", date: "07 Oct 2026 (Sched)", location: "Gangavaram Deepwater Berth", status: "upcoming", desc: "Scheduled conveyor loading onto bulk vessel." },
      { step: "Coastal Maritime Transit", date: "10 Oct 2026 (Sched)", location: "Southern Coastal Route", status: "upcoming", desc: "Navigating toward JNPT Mumbai coastal terminal." },
      { step: "JNPT Delivery & Pellet Plant Handover", date: "14 Oct 2026 (Sched)", location: "Nhava Sheva Terminal", status: "upcoming", desc: "Customs clearance and rail dispatch to steel plant." }
    ]
  }
};

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Compliance",
    desc: "Transparent, verified contracts conforming to international Incoterms 2020 rules and bank payment guarantees (LC at Sight / Escrow).",
    color: "from-blue-600 to-blue-400",
  },
  {
    icon: Award,
    title: "Lab-Verified Quality",
    desc: "Zero specification deviation. Third-party independent sampling by SGS, Bureau Veritas, and GeoChem prior to cargo loading.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: Zap,
    title: "Logistics Commitment",
    desc: "Integrated port-to-plant delivery covering maritime vessels, containerized freight, and direct railway rakes across Indian trade ports.",
    color: "from-indigo-600 to-blue-400",
  },
];

const stats = [
  { icon: Package, value: 19, suffix: "+", label: "HS-Standard Commodities" },
  { icon: MapPin, value: 6, suffix: "", label: "Gateway Sea Ports" },
  { icon: Users, value: 500, suffix: "+", label: "Institutional Trade Partners" },
];

const services = [
  { icon: Truck, title: "Import Procurement Desk", desc: "Direct sourcing of high-purity minerals, thermal coals, pet coke, and chemical inputs from global mines and producers." },
  { icon: Globe, title: "Export Sourcing & Freight", desc: "Connecting verified Indian commodity producers, iron ore, and agro-exporters to high-demand international markets." },
  { icon: Shield, title: "Third-Party Assay Verification", desc: "Rigorous joint-sampling, moisture tests, and chemical assays certified by SGS and Bureau Veritas." },
  { icon: TrendingUp, title: "Commercial Desk & Incoterms", desc: "Real-time benchmark pricing with flexible Incoterms 2020 options (CIF, FOB, CFR, EXW, and FOR rakes)." },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Live Freight Tracking State
  const [trackingInput, setTrackingInput] = useState("VAS-IN-849201");
  const [activeShipmentId, setActiveShipmentId] = useState("VAS-IN-849201");

  // RFQ Form State
  const [rfqMode, setRfqMode] = useState<"BUYER" | "SUPPLIER">("BUYER");
  const [selectedCommodity, setSelectedCommodity] = useState("Limestone");
  const [rfqVolume, setRfqVolume] = useState("500 MT");
  const [rfqIncoterm, setRfqIncoterm] = useState("CIF");
  const [rfqPort, setRfqPort] = useState("Visakhapatnam Port (INVTZ)");
  const [rfqSpecs, setRfqSpecs] = useState("SMS Grade, CaCO3 > 95%, Size 10-40mm");
  const [rfqName, setRfqName] = useState("");
  const [rfqCompany, setRfqCompany] = useState("");
  const [rfqContact, setRfqContact] = useState("");
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const activeShipment = SAMPLE_SHIPMENTS[activeShipmentId] || SAMPLE_SHIPMENTS["VAS-IN-849201"];

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackingInput.trim().toUpperCase();
    if (SAMPLE_SHIPMENTS[cleanId]) {
      setActiveShipmentId(cleanId);
    } else {
      // Fallback: match by container or default
      const found = Object.keys(SAMPLE_SHIPMENTS).find(k => 
        k.includes(cleanId) || SAMPLE_SHIPMENTS[k].containerNo.includes(cleanId)
      );
      if (found) {
        setActiveShipmentId(found);
      } else {
        alert("Consignment not found. Try sample tracking ID: VAS-IN-849201, MSKU-9028312, or MEDU-4820194");
      }
    }
  };

  const handleRfqCommodityChange = (name: string) => {
    setSelectedCommodity(name);
    const prod = B2B_PRODUCTS.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
    if (prod) {
      setRfqSpecs(`${prod.specs} | Grades: ${prod.grades}`);
    }
  };

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    setTimeout(() => setRfqSubmitted(false), 5000);
  };

  const handleWhatsAppRfq = () => {
    const text = encodeURIComponent(
      `*NEW INSTITUTIONAL TRADE RFQ (${rfqMode})*\n` +
      `• Organization: Vasista Trading Services Private Limited\n` +
      `• Representative: ${rfqName || "Institutional Buyer"} (${rfqCompany || "Corporate Client"})\n` +
      `• Commodity: ${selectedCommodity}\n` +
      `• Required Volume: ${rfqVolume}\n` +
      `• Target Incoterm: ${rfqIncoterm}\n` +
      `• Destination Port: ${rfqPort}\n` +
      `• Specifications: ${rfqSpecs}\n` +
      `• Contact: ${rfqContact}\n\n` +
      `Please provide current CIF/FOB benchmark quotation and availability.`
    );
    window.open(`https://wa.me/918591938908?text=${text}`, "_blank");
  };

  const filteredProducts = activeCategory === "All"
    ? B2B_PRODUCTS
    : B2B_PRODUCTS.filter(p => p.category === activeCategory);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="font-sans antialiased overflow-x-hidden bg-[#030b1e] text-white">
      {/* ── NAVBAR ── */}
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#040d24]/95 backdrop-blur-md shadow-lg py-3 border-b border-white/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-amber-400 ring-offset-1 ring-offset-[#030b1e] bg-navy-900">
              <img src={logoImg} alt="Vasista Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-rajdhani font-bold text-xl leading-tight tracking-wide text-white">VASISTA</div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-amber-400">Trading Services Pvt. Ltd.</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-blue-100/80">
            <a href="#about" className="hover:text-amber-400 transition-colors">Overview</a>
            <a href="#catalog" className="hover:text-amber-400 transition-colors">B2B Catalog</a>
            <a href="#tracking" className="hover:text-amber-400 transition-colors">Freight Tracking</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">Capabilities</a>
            <a href="#rfq" className="hover:text-amber-400 transition-colors">Submit RFQ</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GSTIN: 37AALCV9169R1ZY</span>
            </div>
            <a
              href="#rfq"
              data-testid="button-partner-nav"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-amber-400/30 transition-all"
            >
              Initiate RFQ <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── dark section with 3D globe */}
      <section className="relative min-h-screen bg-[#030b1e] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,79,216,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,79,216,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_60%_0%,rgba(20,60,180,0.30),transparent)]" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-700/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-indigo-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: "9s" }} />
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-amber-500/8 rounded-full blur-[60px] animate-pulse" style={{ animationDuration: "7s" }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#030b1e] to-transparent" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Compass className="w-3.5 h-3.5" />
              <span>International B2B Import & Export Desk</span>
            </div>

            <motion.h1 variants={fadeUp} className="font-rajdhani text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
              GLOBAL TRADE,{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                INDUSTRIAL
              </span>{" "}
              EXCELLENCE
            </motion.h1>

            <motion.p variants={fadeUp} className="text-blue-200/70 text-lg leading-relaxed max-w-lg mb-10">
              Vasista Trading Services Private Limited connects industrial enterprises to global commodity supply chains. Direct institutional sourcing with verified HS Codes, SGS lab assays, and port-to-plant freight logistics.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <a
                href="#catalog"
                data-testid="button-hero-explore"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:shadow-xl hover:shadow-amber-400/30 transition-all group text-sm"
              >
                Browse B2B Catalog
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#tracking"
                data-testid="button-hero-tracking"
                className="flex items-center gap-2 border border-white/20 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/10 transition-all text-sm"
              >
                <Ship className="h-4 w-4 text-amber-400" /> Track Consignment
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
              {[
                { val: "19+", label: "HS-Standard Commodities" },
                { val: "< 24h", label: "Quotation Turnaround SLA" },
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
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 text-xs text-blue-200 whitespace-nowrap">
              Live Trade Corridor Simulation — Mumbai & Visakhapatnam Hubs
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="relative bg-[#030b1e] py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#040d24] rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden shadow-2xl">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                data-testid={`stat-${i}`}
                className="flex items-center gap-5 px-10 py-9 group hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0a1a6e] to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform border border-white/10">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-rajdhani text-4xl font-bold text-white leading-none">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-gray-400 text-sm mt-1 font-medium">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / VALUES ── */}
      <section id="about" className="py-24 bg-[#030b1e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-3 block">Institutional Authority</span>
              <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Engineering India's Global Commodity Gateway
              </h2>
              <p className="text-blue-100/70 leading-relaxed mb-6">
                Vasista Trading Services Private Limited operates at the intersection of international commodity mining, precision laboratory testing, and multimodal maritime freight. We provide direct institutional allocations for minerals, energy carbon, technical chemicals, and agricultural staples.
              </p>
              <p className="text-blue-100/70 leading-relaxed mb-8">
                Operating under <strong className="text-amber-400 font-semibold">Trust · Quality · Commitment</strong>, our trade desk enforces standardized Incoterms 2020 (CIF, FOB, EXW) with transparent SGS/BV sampling reports on every bill of lading.
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
                  className="bg-[#040d24] rounded-2xl p-6 shadow-xl border border-white/10 flex gap-5 group hover:border-amber-400/40 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <v.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-rajdhani text-xl font-bold text-white mb-1">{v.title}</h3>
                    <p className="text-blue-200/60 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL B2B PRODUCT CATALOG (HS Codes, Origin Country, MOQs) ── */}
      <section id="catalog" className="py-24 bg-[#040d24] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 px-5 py-2 rounded-full border border-amber-400/20 bg-amber-400/5">
              Standardized Trade Matrix
            </span>
            <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white mt-2">
              Global B2B Product Catalog
            </h2>
            <p className="text-blue-200/60 max-w-2xl mx-auto mt-4 text-sm">
              Standardized HS Tariff classifications, certified origins, and minimum order quantities for institutional buyers and plant procurement desks.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {["All", "Minerals & Metals", "Energy & Carbon", "Chemicals & Inputs", "Food & Agri"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/20"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#030b1e] border border-white/10 hover:border-amber-400/40 rounded-2xl p-6 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      {p.hsCode}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-rajdhani text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {p.name}
                  </h3>

                  <div className="space-y-2 mb-4 text-xs">
                    <div className="text-blue-200/70 flex items-start gap-1.5">
                      <span className="text-gray-400 font-semibold">Origin:</span>
                      <span>{p.originCountry}</span>
                    </div>
                    <div className="text-blue-200/70 flex items-start gap-1.5">
                      <span className="text-gray-400 font-semibold">MOQ:</span>
                      <span className="text-amber-300 font-medium">{p.moq}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-blue-200/60 leading-relaxed font-mono text-[11px]">
                      {p.specs}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="#rfq"
                    onClick={() => handleRfqCommodityChange(p.name)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 uppercase tracking-wider"
                  >
                    Quote Desk <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] text-gray-500 font-mono">SGS / BV Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREIGHT & SHIPMENT TRACKING SYSTEM SKELETON ── */}
      <section id="tracking" className="py-24 bg-[#030b1e] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 px-5 py-2 rounded-full border border-amber-400/20 bg-amber-400/5">
              Live Logistics Desk
            </span>
            <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white mt-2">
              Freight & Container Tracking Terminal
            </h2>
            <p className="text-blue-200/60 max-w-xl mx-auto mt-4 text-sm">
              Live container lookup handling container numbers, carrier statuses, and destination gateway ports across active maritime corridors.
            </p>

            {/* Quick-track Presets */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Quick Sample Consignments:</span>
              {Object.keys(SAMPLE_SHIPMENTS).map(id => (
                <button
                  key={id}
                  onClick={() => {
                    setTrackingInput(id);
                    setActiveShipmentId(id);
                  }}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all ${
                    activeShipmentId === id
                      ? "bg-amber-400 text-gray-900 border-amber-400 font-bold"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-amber-400/40"
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>

            {/* Tracking Search Input Form */}
            <form onSubmit={handleTrackingSearch} className="max-w-xl mx-auto mt-6 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter Tracking ID or Container No (e.g. VAS-IN-849201)..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Track Cargo
              </button>
            </form>
          </div>

          {/* Active Consignment Card */}
          <div className="bg-[#040d24] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-2xl font-bold text-white">{activeShipment.trackingId}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border font-mono ${activeShipment.statusColor}`}>
                    {activeShipment.status}
                  </span>
                </div>
                <div className="text-xs text-blue-200/60 font-mono flex flex-wrap gap-x-4 gap-y-1">
                  <span>Container: <strong className="text-white">{activeShipment.containerNo}</strong></span>
                  <span>HS Code: <strong className="text-amber-400">{activeShipment.hsCode}</strong></span>
                  <span>Carrier: <strong className="text-white">{activeShipment.carrier}</strong></span>
                  <span>Vessel: <strong className="text-white">{activeShipment.vessel}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3">
                <div>
                  <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Port of Loading</div>
                  <div className="font-bold text-sm text-white">{activeShipment.originPort}</div>
                </div>
                <div className="text-amber-400 font-bold text-lg">➔</div>
                <div>
                  <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Port of Discharge</div>
                  <div className="font-bold text-sm text-white">{activeShipment.destPort}</div>
                </div>
              </div>
            </div>

            {/* Milestones Progression Timeline */}
            <div className="space-y-6">
              {activeShipment.milestones.map((m, idx) => (
                <div key={idx} className="relative flex items-start gap-4 group">
                  {idx !== activeShipment.milestones.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 bottom-0 w-0.5 ${
                        m.status === "completed" ? "bg-amber-400" : "bg-white/10"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      m.status === "completed"
                        ? "border-amber-400 bg-amber-400 text-gray-900"
                        : m.status === "current"
                        ? "border-amber-400 bg-amber-400/20 text-amber-400 ring-4 ring-amber-400/20"
                        : "border-white/20 bg-[#0b101b] text-gray-500"
                    }`}
                  >
                    {m.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-bold font-mono">0{idx + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 rounded-2xl bg-white/[0.02] border border-white/5 p-4 hover:border-amber-400/30 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-white">{m.step}</span>
                      <span className="text-xs font-mono text-amber-400">{m.date}</span>
                    </div>
                    <p className="text-xs text-blue-200/70 leading-relaxed mb-2">{m.desc}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{m.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES / CAPABILITIES ── */}
      <section id="services" className="bg-[#040d24] py-24 relative overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-amber-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 px-5 py-2 rounded-full border border-amber-400/20 bg-amber-400/5">Trade Scope</span>
            <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white mt-2">Operational Capabilities</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group relative bg-[#030b1e] border border-white/10 rounded-3xl p-8 hover:border-amber-400/40 transition-all overflow-hidden shadow-xl"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/40 group-hover:from-amber-500 group-hover:to-amber-700 transition-all">
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-rajdhani font-bold text-xl text-white mb-3">{s.title}</h3>
                  <p className="text-blue-200/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUEST FOR QUOTE (RFQ) CUSTOM FORM ENGINE ── */}
      <section id="rfq" className="py-24 bg-[#030b1e] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-3 block">Direct Commercial Desk</span>
            <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white">Request for Quote (RFQ) Engine</h2>
            <p className="text-blue-200/60 max-w-lg mx-auto mt-4 text-sm">
              Submit your commodity trade parameters for instant desk evaluation, CIF/FOB pricing, and specification alignment.
            </p>
          </div>

          <div className="bg-[#040d24] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Mode Toggle */}
            <div className="flex rounded-full bg-white/5 p-1 mb-8 max-w-sm mx-auto border border-white/10">
              <button
                type="button"
                onClick={() => setRfqMode("BUYER")}
                className={`flex-1 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  rfqMode === "BUYER" ? "bg-amber-400 text-gray-900 shadow-md" : "text-gray-400 hover:text-white"
                }`}
              >
                Institutional Buyer RFQ
              </button>
              <button
                type="button"
                onClick={() => setRfqMode("SUPPLIER")}
                className={`flex-1 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  rfqMode === "SUPPLIER" ? "bg-amber-400 text-gray-900 shadow-md" : "text-gray-400 hover:text-white"
                }`}
              >
                Supplier / Mine Allocation
              </button>
            </div>

            <form onSubmit={handleRfqSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                    Commodity Selection
                  </label>
                  <select
                    value={selectedCommodity}
                    onChange={(e) => handleRfqCommodityChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    {B2B_PRODUCTS.map(p => (
                      <option key={p.id} value={p.name} className="bg-[#040d24] text-white">
                        {p.name} ({p.hsCode})
                      </option>
                    ))}
                    <option value="Custom Mineral/Commodity" className="bg-[#040d24] text-white">Custom Mineral/Commodity Requirement</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                    Target Volume / Lot Size
                  </label>
                  <input
                    type="text"
                    value={rfqVolume}
                    onChange={(e) => setRfqVolume(e.target.value)}
                    placeholder="e.g. 500 MT, 10x20ft FCL, Bulk Vessel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                    Incoterms 2020 Preference
                  </label>
                  <select
                    value={rfqIncoterm}
                    onChange={(e) => setRfqIncoterm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="CIF" className="bg-[#040d24]">CIF — Cost, Insurance & Freight (Discharge Port)</option>
                    <option value="FOB" className="bg-[#040d24]">FOB — Free on Board (Loading Port)</option>
                    <option value="CFR" className="bg-[#040d24]">CFR — Cost & Freight</option>
                    <option value="EXW" className="bg-[#040d24]">EXW — Ex Works (Mine/Stockyard)</option>
                    <option value="FOR" className="bg-[#040d24]">FOR — Free on Rail (Destination Siding)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                    Discharge Port / Gateway
                  </label>
                  <select
                    value={rfqPort}
                    onChange={(e) => setRfqPort(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Visakhapatnam Port (INVTZ)" className="bg-[#040d24]">Visakhapatnam Port (INVTZ)</option>
                    <option value="Gangavaram Port (INGGV)" className="bg-[#040d24]">Gangavaram Port (INGGV)</option>
                    <option value="JNPT Mumbai / Nhava Sheva (INNSA)" className="bg-[#040d24]">JNPT Mumbai (INNSA)</option>
                    <option value="Chennai Port (INMAA)" className="bg-[#040d24]">Chennai Port (INMAA)</option>
                    <option value="Mundra Port, Gujarat (INMUN)" className="bg-[#040d24]">Mundra Port (INMUN)</option>
                    <option value="Port of Singapore (SGSIN)" className="bg-[#040d24]">Port of Singapore (SGSIN)</option>
                    <option value="Port of Jebel Ali, UAE (AEJEA)" className="bg-[#040d24]">Jebel Ali, UAE (AEJEA)</option>
                    <option value="Direct Plant Rail Siding" className="bg-[#040d24]">Direct Plant Rail Siding</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                  Chemical Assay & Specifications
                </label>
                <input
                  type="text"
                  value={rfqSpecs}
                  onChange={(e) => setRfqSpecs(e.target.value)}
                  placeholder="e.g. CaCO3 > 95%, Fe > 64%, Ash < 12%, Moisture tolerances..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={rfqName}
                    onChange={(e) => setRfqName(e.target.value)}
                    placeholder="e.g. Suresh Varma"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={rfqCompany}
                    onChange={(e) => setRfqCompany(e.target.value)}
                    placeholder="e.g. Global Steels Ltd"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                    Official Email / Phone
                  </label>
                  <input
                    type="text"
                    value={rfqContact}
                    onChange={(e) => setRfqContact(e.target.value)}
                    placeholder="e.g. procurement@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              {rfqSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                  ✓ RFQ registered successfully. Our commercial trade desk coordinator will contact you within 24 hours.
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 font-bold uppercase tracking-wider px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-amber-400/30 transition-all text-xs"
                >
                  Submit Institutional RFQ
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppRfq}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border border-emerald-400/40 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all text-xs"
                >
                  <span>💬 Instant WhatsApp Quote (+91 85919 38908)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-[#040d24] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-3 block">Direct Desk Coordinates</span>
            <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white">Commercial Trade Desk</h2>
            <p className="text-blue-200/60 max-w-md mx-auto mt-4 text-sm">
              Connect directly with our institutional trading desk for contracts, rake allotments, and port logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: Mail, label: "Email", value: "info@vasistatradingservices.com", href: "mailto:info@vasistatradingservices.com", testid: "link-contact-email" },
              { icon: Phone, label: "Desk Phone", value: "+91 85919 38908", href: "tel:+918591938908", testid: "link-contact-phone" },
              { icon: Globe, label: "Website", value: "vasistatradingservices.com", href: "https://www.vasistatradingservices.com", testid: "link-contact-website" },
              { icon: MapPin, label: "Headquarters", value: "Mumbai & Andhra Pradesh Ports, India", href: "#", testid: "link-contact-location" },
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
                className="group bg-[#030b1e] hover:bg-[#0a1a6e] border border-white/10 hover:border-amber-400/40 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 bg-white/5 group-hover:bg-white/10 rounded-xl flex items-center justify-center mb-4 transition-all">
                  <item.icon className="h-5 w-5 text-amber-400 group-hover:text-yellow-300 transition-colors" />
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-blue-200 font-semibold mb-1 transition-colors">{item.label}</div>
                <div className="text-sm font-medium text-white transition-colors">{item.value}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#020713] border-t border-white/10 pt-16 pb-8">
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
                International import/export trading desk. Delivering specification-verified industrial commodities, energy fuels, and agricultural staples. GSTIN: 37AALCV9169R1ZY.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: SiFacebook, href: "https://facebook.com/share/1HWeDcLf9Q", testid: "link-social-facebook" },
                  { icon: SiInstagram, href: "https://instagram.com/vasista_trading_services", testid: "link-social-instagram" },
                  { icon: FaLinkedinIn, href: "https://linkedin.com/company/vasista-trading-services-private-limited", testid: "link-social-linkedin" },
                ].map(({ icon: Icon, href, testid }) => (
                  <a
                    key={testid}
                    href={href}
                    data-testid={testid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:border-amber-400 hover:text-gray-900 text-white/60 transition-all"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="font-rajdhani font-bold text-white text-lg mb-4">Core Trade Verticals</div>
              <ul className="space-y-2 text-sm text-blue-200/50 font-mono text-xs">
                <li>• Minerals & Metals (HS 25/26/72)</li>
                <li>• Energy & Carbon (HS 27)</li>
                <li>• Chemicals & Agrochemicals (HS 31/38)</li>
                <li>• Agro & Food Commodities (HS 08/09/20)</li>
              </ul>
            </div>

            <div>
              <div className="font-rajdhani font-bold text-white text-lg mb-4">Gateway Ports</div>
              <ul className="space-y-2 text-sm text-blue-200/50 font-mono text-xs">
                <li>• Visakhapatnam (INVTZ)</li>
                <li>• Gangavaram (INGGV)</li>
                <li>• JNPT Mumbai (INNSA)</li>
                <li>• Mundra Port (INMUN)</li>
                <li>• Chennai Port (INMAA)</li>
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
