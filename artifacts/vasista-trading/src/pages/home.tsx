import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import {
  Mail, Phone, MapPin, Globe, ArrowRight,
  TrendingUp, ShieldCheck, Shield, Zap, Award,
  Truck, Users, Package, Search, CheckCircle2,
  Clock, Compass, Anchor, Ship, ChevronRight,
  Menu, X, Eye, Target, Play, ChevronLeft
} from "lucide-react";

import logoImg from "@assets/vasista-eng-logo.png";
import about2Img from "@assets/about-2.png";
import about3Img from "@assets/about-3.png";
import slider1Img from "@assets/slider-1.png";
import slider3Img from "@assets/slider-3.png";
import slider4Img from "@assets/slider-4.png";

// ── Animated Counter Component ───────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 50) || 1;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 25);
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

// ── Live Freight Tracking Milestone Data ──────────────────────────────────────
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
    statusColor: "text-amber-800 bg-amber-100 border-amber-300",
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
    statusColor: "text-emerald-800 bg-emerald-100 border-emerald-300",
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
    statusColor: "text-blue-800 bg-blue-100 border-blue-300",
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

const offerings = [
  {
    title: "Minerals & Flux Stone",
    category: "Mining & Heavy Industry",
    desc: "SMS & BF Grade Limestone, Calibrated Lump Iron Ore, Pellets, and high-purity Bauxite for blast furnaces and kiln feed.",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Energy & Carbon Fuels",
    category: "Power & Thermal Plants",
    desc: "Indonesian Steaming Coal (GAR 3800-5000), South African RB1/RB3, and Green Delayed Raw/Calcined Pet Coke.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Chemicals & Fertilizer Inputs",
    category: "Agro & Industrial Chemistry",
    desc: "Technical Non-Coated & Prilled Agro Urea (46% Nitrogen), chemical inputs, and bulk fertilizer commodities.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Industrial Scrap & Steel",
    category: "Recycled Metallurgy",
    desc: "ISRI-standard HMS 1/2 (80:20) heavy melting scrap, plate & structural steel scrap loaded directly in 20ft containers.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Agricultural Staples & Spices",
    category: "Global Food Supply",
    desc: "Stemless Guntur Teja Chilli, Salem/Nizamabad Turmeric (Curcumin >3%), cleaned Cumin, and export cashews (W180-W320).",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Port Logistics & Multimodal Freight",
    category: "Maritime Operations",
    desc: "Stevedoring at major Indian ports, customs house brokerage, railway rake allocation, and vessel chartering.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80",
  },
];

const articles = [
  {
    title: "Global Maritime Corridors: Port Congestion & Freight Index Outlook 2026",
    date: "31",
    month: "Mar",
    category: "Maritime Logistics",
    excerpt: "An in-depth analysis of ocean freight rates, vessel charter availability across the Indian Ocean, and bunker fuel impacts on bulk commodity shipping.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "SGS Chemical Assays: Ensuring Grade Compliance in Bulk Mineral Shipments",
    date: "28",
    month: "Mar",
    category: "Quality Assurance",
    excerpt: "Best practices in pre-shipment sampling, draft surveys, and moisture determination for limestone and iron ore consignments at loading berths.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Incoterms 2020 Masterclass: Navigating CIF vs FOB for Bulk Commodities",
    date: "24",
    month: "Mar",
    category: "Commercial Contracts",
    excerpt: "Key considerations for buyers and sellers when allocating risk, insurance coverage, and demurrage liabilities in international trade contracts.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80"
  }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Freight Tracking State
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

  const heroSlides = [
    {
      img: slider1Img,
      subtitle: "WE BRING COMMODITIES INTO REALITY",
      title: "Trade Everything With Passion",
      desc: "Delivering reliable international commodity supply chains, verified SGS lab assays, and multimodal freight solutions with 13+ years of group experience."
    },
    {
      img: slider3Img,
      subtitle: "GLOBAL LOGISTICS & PRECISION SOURCING",
      title: "Empowering Industries Worldwide",
      desc: "Direct allocation of high-purity minerals, thermal coals, pet coke, and agricultural staples connecting international ports to industrial plants."
    },
    {
      img: slider4Img,
      subtitle: "VERIFIED QUALITY · ZERO DEVIATION",
      title: "Built On Trust, Quality & Commitment",
      desc: "Rigorous third-party sampling by SGS and Bureau Veritas, standardized Incoterms 2020, and dedicated trade desk execution."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const activeShipment = SAMPLE_SHIPMENTS[activeShipmentId] || SAMPLE_SHIPMENTS["VAS-IN-849201"];

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackingInput.trim().toUpperCase();
    if (SAMPLE_SHIPMENTS[cleanId]) {
      setActiveShipmentId(cleanId);
    } else {
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

  return (
    <div className="min-h-screen bg-white text-[#76787C] font-sans antialiased overflow-x-hidden selection:bg-[#FBD903] selection:text-[#13223C]">

      {/* ── 1. TOP BAR (Mirroring vasistaengineering.com) ────────────────── */}
      <header className="bg-[#13223C] text-white text-xs border-b border-white/10 hidden md:block">
        <div className="max-w-[1290px] mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6 text-gray-300">
            <a href="mailto:info@vasistatradingservices.com" className="flex items-center gap-2 hover:text-[#FBD903] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#FBD903]" />
              <span>info@vasistatradingservices.com</span>
            </a>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-[#FBD903]" />
              <span>Mon - Sat 8:00 - 6:30, Sunday - CLOSED</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[11px] uppercase tracking-wider mr-1">Follow Us:</span>
              <a href="https://facebook.com/share/1HWeDcLf9Q" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FBD903] hover:text-[#13223C] transition-colors">
                <SiFacebook className="w-3 h-3" />
              </a>
              <a href="https://instagram.com/vasista_trading_services" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FBD903] hover:text-[#13223C] transition-colors">
                <SiInstagram className="w-3 h-3" />
              </a>
              <a href="https://linkedin.com/company/vasista-trading-services-private-limited" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FBD903] hover:text-[#13223C] transition-colors">
                <FaLinkedinIn className="w-3 h-3" />
              </a>
              <a href="https://wa.me/918591938908" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FBD903] hover:text-[#13223C] transition-colors">
                <SiWhatsapp className="w-3 h-3" />
              </a>
            </div>

            <div className="h-4 w-px bg-white/20" />

            <a href="tel:+918591938908" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded bg-[#FBD903] text-[#13223C] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] text-gray-400 uppercase font-semibold">Call Anytime</div>
                <div className="text-white font-bold group-hover:text-[#FBD903] transition-colors">+91 8591938908</div>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* ── 2. STICKY MAIN NAVIGATION BAR ─────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#DFE3EA]/80">
        <div className="max-w-[1290px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="Vasista Trading Services"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <div className="font-heading text-2xl font-black text-[#13223C] tracking-tight leading-none">
                VASISTA
              </div>
              <div className="text-[10px] font-extrabold tracking-[0.2em] text-[#FBD903] uppercase">
                Trading Services Pvt. Ltd.
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-bold text-[13px] tracking-wider uppercase text-[#13223C]">
            <a href="#" className="text-[#FBD903] hover:text-[#FBD903] transition-colors relative py-2">
              HOME
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FBD903]" />
            </a>
            <a href="#about" className="hover:text-[#FBD903] transition-colors py-2">ABOUT US</a>
            <a href="#services" className="hover:text-[#FBD903] transition-colors py-2">SERVICES</a>
            <a href="#tracking" className="hover:text-[#FBD903] transition-colors py-2">FREIGHT TRACKING</a>
            <a href="#catalog" className="hover:text-[#FBD903] transition-colors py-2">B2B CATALOG</a>
            <a href="#news" className="hover:text-[#FBD903] transition-colors py-2">INSIGHTS</a>
            <a href="#contact" className="hover:text-[#FBD903] transition-colors py-2">CONTACT</a>
          </div>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#rfq"
              className="inline-flex items-center gap-2 bg-[#FBD903] hover:bg-[#13223C] text-[#13223C] hover:text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-none transition-all duration-300 shadow-sm"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#13223C] hover:text-[#FBD903] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#13223C] text-white border-t border-white/10 px-6 py-6 space-y-4">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-sm tracking-wider uppercase text-[#FBD903]">HOME</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-sm tracking-wider uppercase hover:text-[#FBD903]">ABOUT US</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-sm tracking-wider uppercase hover:text-[#FBD903]">SERVICES</a>
            <a href="#tracking" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-sm tracking-wider uppercase hover:text-[#FBD903]">FREIGHT TRACKING</a>
            <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-sm tracking-wider uppercase hover:text-[#FBD903]">B2B CATALOG</a>
            <a href="#news" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-sm tracking-wider uppercase hover:text-[#FBD903]">INSIGHTS</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-sm tracking-wider uppercase hover:text-[#FBD903]">CONTACT</a>
            <div className="pt-2">
              <a
                href="#rfq"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-[#FBD903] text-[#13223C] font-extrabold text-xs uppercase tracking-wider py-3"
              >
                GET A FREE QUOTE
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── 3. HERO SLIDER SECTION (Matching Revolution Slider) ───────────── */}
      <section className="relative min-h-[620px] lg:min-h-[720px] bg-[#101C30] overflow-hidden flex items-center">
        {/* Slide Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              transition: "opacity 1s ease-in-out, transform 8s ease"
            }}
          />
        ))}

        {/* Industrial Dark Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#101C30]/90 via-[#101C30]/75 to-transparent" />

        {/* Content Box */}
        <div className="max-w-[1290px] mx-auto px-6 py-20 relative z-10 w-full">
          <div className="max-w-2xl text-white">
            {/* Signature Eyebrow */}
            <div className="inline-flex items-center gap-3 text-[#FBD903] font-extrabold text-xs tracking-[0.25em] uppercase mb-4">
              <span className="w-8 h-0.5 bg-[#FBD903]" />
              <span>{heroSlides[activeSlide].subtitle}</span>
            </div>

            {/* Giant Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] mb-6">
              {heroSlides[activeSlide].title}
            </h1>

            {/* Sub-text */}
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-medium">
              {heroSlides[activeSlide].desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#about"
                className="bg-[#FBD903] hover:bg-[#13223C] text-[#13223C] hover:text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <span>DISCOVER MORE</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#tracking"
                className="bg-transparent hover:bg-white text-white hover:text-[#13223C] border-2 border-white/80 font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 transition-all duration-300 flex items-center gap-2"
              >
                <Ship className="w-4 h-4 text-[#FBD903]" />
                <span>TRACK CONSIGNMENT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating 13+ Years Experience Badge (Real Site Marker) */}
        <div className="hidden md:flex absolute bottom-12 right-12 lg:right-24 z-20 bg-[#FBD903] text-[#13223C] p-6 shadow-2xl flex-col items-center justify-center text-center w-48 border-4 border-white/20">
          <span className="font-heading text-5xl font-extrabold leading-none">13+</span>
          <span className="text-xs font-black uppercase tracking-wider mt-1 text-[#13223C]">
            Years of Experience
          </span>
        </div>

        {/* Slider Navigation Arrows & Dots */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 transition-all rounded-full ${
                activeSlide === idx ? "w-8 bg-[#FBD903]" : "w-2.5 bg-white/40 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── 4. ABOUT COMPANY SECTION (Mirroring Elementor Section 3dc97ad) ─ */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1290px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Overlapping Real Site Photography & Badges */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[480px]">

                {/* Base Image (about-2.png) */}
                <div className="relative z-10 overflow-hidden shadow-xl">
                  <img
                    src={about2Img}
                    alt="Vasista Operations"
                    className="w-full h-[480px] object-cover object-center"
                  />
                </div>

                {/* Overlapping Inset Image (about-3.png) with 15px White Border */}
                <div className="absolute -bottom-10 -right-4 sm:-right-8 z-20 w-64 sm:w-72 shadow-2xl">
                  <img
                    src={about3Img}
                    alt="Vasista Engineering and Trade"
                    className="w-full h-auto object-cover border-[12px] border-white shadow-2xl"
                  />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute top-8 left-4 z-30 bg-[#FBD903] text-[#13223C] p-4 text-center shadow-lg border-2 border-white">
                  <div className="font-heading text-3xl font-extrabold leading-none">13+</div>
                  <div className="text-[10px] font-black uppercase tracking-wider mt-0.5">Years Experience</div>
                </div>

                {/* Dark Navy Banner at Bottom */}
                <div className="absolute -bottom-6 left-0 z-30 bg-[#13223C] text-white px-6 py-3 font-extrabold text-xs uppercase tracking-wider shadow-lg border-l-4 border-[#FC811B]">
                  We bring commodities into reality
                </div>

                {/* Vertical Orange Line Marker */}
                <div className="absolute -left-6 top-1/4 w-1.5 h-32 bg-[#FC811B] hidden sm:block" />
              </div>
            </div>

            {/* Right Column: Mission, Vision, and Text */}
            <div className="lg:col-span-6 space-y-6 pt-6 lg:pt-0">
              <div className="inline-flex items-center gap-3 text-[#13223C] font-extrabold text-xs tracking-[0.25em] uppercase">
                <span className="w-8 h-0.5 bg-[#FBD903]" />
                <span className="text-[#13223C]">ABOUT COMPANY</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#13223C] leading-tight">
                Empowering Industries Worldwide
              </h2>

              <p className="text-[#76787C] leading-relaxed text-sm sm:text-base">
                Vasista Trading Services Private Limited is a premier international commodity trading and supply chain organization. With over 13 years of core group background spanning industrial engineering, infrastructure, and multimodal logistics, we connect major global mines and producers directly to steel plants, thermal power units, chemical refineries, and agro processors.
              </p>

              <div className="space-y-4 pt-2">
                {/* Vision Box */}
                <div className="border-b border-[#DFE3EA] pb-4">
                  <div className="font-heading text-lg font-extrabold text-[#13223C] uppercase mb-2">
                    OUR VISION
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-[#FBD903] text-[#13223C] flex items-center justify-center flex-shrink-0">
                      <Eye className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-[#76787C] leading-relaxed">
                      To establish ourselves as the global benchmark for excellence, transparency, and dependability in international commodity trade and freight solutions.
                    </p>
                  </div>
                </div>

                {/* Mission Box */}
                <div className="border-b border-[#DFE3EA] pb-4">
                  <div className="font-heading text-lg font-extrabold text-[#13223C] uppercase mb-2">
                    OUR MISSION
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-[#FBD903] text-[#13223C] flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-[#76787C] leading-relaxed">
                      To continuously embrace modern trade technologies, enforce strict laboratory quality compliance, and deliver best-in-class solutions, empowering our partners to thrive in an ever-evolving world.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <a
                  href="#catalog"
                  className="bg-[#13223C] hover:bg-[#FBD903] text-white hover:text-[#13223C] font-extrabold text-xs uppercase tracking-wider px-8 py-4 transition-all duration-300 shadow-md inline-flex items-center gap-2"
                >
                  <span>EXPLORE COMMODITIES</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="text-xs font-mono text-[#13223C] font-bold">
                  GSTIN: 37AALCV9169R1ZY
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. COUNTER BAND / ACHIEVEMENTS (Elementor Section 9044d5b) ────── */}
      <section className="py-16 bg-[#EFF1F5] border-y border-[#DFE3EA]">
        <div className="max-w-[1290px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white p-8 border-b-4 border-[#FBD903] shadow-sm flex items-center gap-5 group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#13223C] group-hover:bg-[#FBD903] text-[#FBD903] group-hover:text-[#13223C] flex items-center justify-center transition-colors">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#13223C] leading-none">
                  <Counter target={19} suffix="+" />
                </div>
                <div className="text-xs uppercase font-extrabold tracking-wider text-[#76787C] mt-1">
                  HS Commodities
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border-b-4 border-[#FBD903] shadow-sm flex items-center gap-5 group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#13223C] group-hover:bg-[#FBD903] text-[#FBD903] group-hover:text-[#13223C] flex items-center justify-center transition-colors">
                <Ship className="w-7 h-7" />
              </div>
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#13223C] leading-none">
                  <Counter target={500} suffix="+" />
                </div>
                <div className="text-xs uppercase font-extrabold tracking-wider text-[#76787C] mt-1">
                  Shipments Executed
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border-b-4 border-[#FBD903] shadow-sm flex items-center gap-5 group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#13223C] group-hover:bg-[#FBD903] text-[#FBD903] group-hover:text-[#13223C] flex items-center justify-center transition-colors">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#13223C] leading-none">
                  <Counter target={100} suffix="%" />
                </div>
                <div className="text-xs uppercase font-extrabold tracking-wider text-[#76787C] mt-1">
                  SGS Assayed Cargo
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border-b-4 border-[#FBD903] shadow-sm flex items-center gap-5 group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#13223C] group-hover:bg-[#FBD903] text-[#FBD903] group-hover:text-[#13223C] flex items-center justify-center transition-colors">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#13223C] leading-none">
                  <Counter target={30} suffix="+" />
                </div>
                <div className="text-xs uppercase font-extrabold tracking-wider text-[#76787C] mt-1">
                  Active Corridors
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. "WHAT WE’RE OFFERING" (Services & Commodities Grid) ────────── */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-[1290px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[#13223C] font-extrabold text-xs tracking-[0.25em] uppercase mb-3">
              <span className="w-8 h-0.5 bg-[#FBD903]" />
              <span>WHAT WE'RE OFFERING</span>
              <span className="w-8 h-0.5 bg-[#FBD903]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#13223C] leading-tight">
              We provide best services for Global Trading
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#EFF1F5] group overflow-hidden border border-[#DFE3EA] hover:border-[#FBD903] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with hover zoom */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#FBD903] text-[#13223C] p-2.5 font-bold shadow-md">
                      <Truck className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider font-extrabold text-[#FC811B] mb-2">
                      {item.category}
                    </div>
                    <h3 className="font-heading text-xl font-extrabold text-[#13223C] mb-3 group-hover:text-[#FC811B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#76787C] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#DFE3EA]/50 flex items-center justify-between mt-4">
                  <a
                    href="#rfq"
                    onClick={() => handleRfqCommodityChange(item.title)}
                    className="text-xs uppercase font-extrabold tracking-wider text-[#13223C] group-hover:text-[#FC811B] transition-colors flex items-center gap-1.5"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#FBD903] text-[#13223C] flex items-center justify-center transition-colors shadow-sm">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. "WHAT ELSE WE DO" (Elementor Section 8243a87 - Navy Dark) ─── */}
      <section className="py-24 bg-[#101C30] text-white relative overflow-hidden">
        <div className="max-w-[1290px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="w-16 h-16 rounded-full bg-[#FBD903] text-[#13223C] mx-auto flex items-center justify-center mb-6 shadow-xl">
              <Play className="w-6 h-6 ml-0.5" />
            </div>

            <div className="inline-flex items-center gap-3 text-[#FBD903] font-extrabold text-xs tracking-[0.25em] uppercase mb-3">
              <span className="w-8 h-0.5 bg-[#FBD903]" />
              <span>WHAT ELSE WE DO</span>
              <span className="w-8 h-0.5 bg-[#FBD903]" />
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Delivering Excellence in Multimodal Freight & Quality Assurance
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              We handle end-to-end institutional supply chains with strict Incoterms 2020 enforcement, third-party SGS assays, and complete customs clearance at gateway sea ports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#13223C] p-8 border-t-4 border-[#FBD903] shadow-xl">
              <div className="w-12 h-12 bg-white/10 text-[#FBD903] flex items-center justify-center mb-6 font-heading font-black text-xl">
                01
              </div>
              <h3 className="font-heading text-xl font-extrabold text-white mb-3">
                Direct Mine Procurement
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Long-term off-take allocations with certified Indian and international mines for Limestone, Iron Ore, Coal, and recycled steel scrap.
              </p>
              <ul className="text-xs text-gray-400 space-y-2 font-mono">
                <li>✓ Direct producer pricing</li>
                <li>✓ Minimum 100 MT to Supramax</li>
                <li>✓ Assured grade consistency</li>
              </ul>
            </div>

            <div className="bg-[#13223C] p-8 border-t-4 border-[#FC811B] shadow-xl">
              <div className="w-12 h-12 bg-white/10 text-[#FC811B] flex items-center justify-center mb-6 font-heading font-black text-xl">
                02
              </div>
              <h3 className="font-heading text-xl font-extrabold text-white mb-3">
                Incoterms 2020 Compliance
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Transparent international trade contracts executing CIF, FOB, CFR, and EXW terms backed by prime bank Letters of Credit (LC at Sight).
              </p>
              <ul className="text-xs text-gray-400 space-y-2 font-mono">
                <li>✓ Strict demurrage controls</li>
                <li>✓ Comprehensive marine insurance</li>
                <li>✓ Clean On-Board B/L documentation</li>
              </ul>
            </div>

            <div className="bg-[#13223C] p-8 border-t-4 border-[#7EB441] shadow-xl">
              <div className="w-12 h-12 bg-white/10 text-[#7EB441] flex items-center justify-center mb-6 font-heading font-black text-xl">
                03
              </div>
              <h3 className="font-heading text-xl font-extrabold text-white mb-3">
                Zero-Tolerance Lab Assays
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Independent composite sampling by SGS, Bureau Veritas, and GeoChem prior to vessel hold loading and container sealing.
              </p>
              <ul className="text-xs text-gray-400 space-y-2 font-mono">
                <li>✓ Certified chemical assay reports</li>
                <li>✓ Moisture & sizing sieve tests</li>
                <li>✓ Berth draft survey verification</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#rfq"
              className="inline-flex items-center gap-2 bg-[#FBD903] hover:bg-white text-[#13223C] font-extrabold text-xs uppercase tracking-wider px-9 py-4 transition-all duration-300 shadow-xl"
            >
              <span>REQUEST AN INSTITUTIONAL QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. FREIGHT TRACKING SYSTEM TERMINAL ───────────────────────────── */}
      <section id="tracking" className="py-24 bg-white border-t border-[#DFE3EA]">
        <div className="max-w-[1290px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-[#13223C] font-extrabold text-xs tracking-[0.25em] uppercase mb-3">
              <span className="w-8 h-0.5 bg-[#FBD903]" />
              <span>LIVE LOGISTICS DESK</span>
              <span className="w-8 h-0.5 bg-[#FBD903]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#13223C] leading-tight">
              Freight & Consignment Tracking Terminal
            </h2>
            <p className="text-[#76787C] text-sm mt-3">
              Live consignment status handling container numbers, ocean carriers, and destination gateway ports.
            </p>

            {/* Quick Demo Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Sample Consignments:</span>
              {Object.keys(SAMPLE_SHIPMENTS).map(id => (
                <button
                  key={id}
                  onClick={() => {
                    setTrackingInput(id);
                    setActiveShipmentId(id);
                  }}
                  className={`text-xs font-mono font-bold px-3 py-1.5 transition-all ${
                    activeShipmentId === id
                      ? "bg-[#13223C] text-[#FBD903] shadow"
                      : "bg-[#EFF1F5] text-[#13223C] hover:bg-[#DFE3EA]"
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <form onSubmit={handleTrackingSearch} className="max-w-lg mx-auto mt-6 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter Tracking ID (e.g. VAS-IN-849201)..."
                  className="w-full pl-10 pr-4 py-3 bg-[#EFF1F5] border border-[#DFE3EA] font-mono text-sm text-[#13223C] focus:outline-none focus:border-[#13223C]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#13223C] hover:bg-[#FBD903] text-white hover:text-[#13223C] font-extrabold text-xs uppercase tracking-wider px-6 py-3 transition-colors"
              >
                TRACK
              </button>
            </form>
          </div>

          {/* Active Consignment Card */}
          <div className="bg-[#EFF1F5] border border-[#DFE3EA] p-8 md:p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#DFE3EA] mb-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-heading text-2xl font-black text-[#13223C]">{activeShipment.trackingId}</span>
                  <span className={`text-xs font-extrabold px-3 py-1 border font-mono ${activeShipment.statusColor}`}>
                    {activeShipment.status}
                  </span>
                </div>
                <div className="text-xs text-[#76787C] font-mono flex flex-wrap gap-x-4 gap-y-1">
                  <span>Container: <strong className="text-[#13223C]">{activeShipment.containerNo}</strong></span>
                  <span>HS Code: <strong className="text-[#FC811B]">{activeShipment.hsCode}</strong></span>
                  <span>Carrier: <strong className="text-[#13223C]">{activeShipment.carrier}</strong></span>
                  <span>Vessel: <strong className="text-[#13223C]">{activeShipment.vessel}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-[#DFE3EA] px-5 py-3 shadow-sm">
                <div>
                  <div className="text-[10px] uppercase text-gray-400 font-extrabold tracking-wider">Port of Loading</div>
                  <div className="font-heading font-extrabold text-sm text-[#13223C]">{activeShipment.originPort}</div>
                </div>
                <div className="text-[#FC811B] font-bold text-lg">➔</div>
                <div>
                  <div className="text-[10px] uppercase text-gray-400 font-extrabold tracking-wider">Port of Discharge</div>
                  <div className="font-heading font-extrabold text-sm text-[#13223C]">{activeShipment.destPort}</div>
                </div>
              </div>
            </div>

            {/* Milestones Timeline */}
            <div className="space-y-6">
              {activeShipment.milestones.map((m, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {idx !== activeShipment.milestones.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 bottom-0 w-0.5 ${
                        m.status === "completed" ? "bg-[#13223C]" : "bg-[#DFE3EA]"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center font-heading font-bold text-xs ${
                      m.status === "completed"
                        ? "bg-[#13223C] text-[#FBD903]"
                        : m.status === "current"
                        ? "bg-[#FBD903] text-[#13223C] ring-4 ring-[#FBD903]/30"
                        : "bg-white border border-[#DFE3EA] text-gray-400"
                    }`}
                  >
                    {m.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : `0${idx + 1}`}
                  </div>

                  <div className="flex-1 bg-white border border-[#DFE3EA] p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-heading font-extrabold text-sm text-[#13223C]">{m.step}</span>
                      <span className="text-xs font-mono font-bold text-[#FC811B]">{m.date}</span>
                    </div>
                    <p className="text-xs text-[#76787C] leading-relaxed mb-2">{m.desc}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#FC811B]" />
                      <span>{m.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. GLOBAL B2B PRODUCT CATALOG (HS Codes, Origins, MOQs) ───────── */}
      <section id="catalog" className="py-24 bg-[#EFF1F5]">
        <div className="max-w-[1290px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-[#13223C] font-extrabold text-xs tracking-[0.25em] uppercase mb-3">
              <span className="w-8 h-0.5 bg-[#FBD903]" />
              <span>STANDARDIZED TRADE MATRIX</span>
              <span className="w-8 h-0.5 bg-[#FBD903]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#13223C] leading-tight">
              Global B2B Product Catalog
            </h2>
            <p className="text-[#76787C] text-sm mt-3">
              Harmonized Tariff classifications, verified origins, chemical assay specs, and minimum order quantities.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {["All", "Minerals & Metals", "Energy & Carbon", "Chemicals & Inputs", "Food & Agri"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-[#13223C] text-[#FBD903] shadow"
                      : "bg-white text-[#13223C] border border-[#DFE3EA] hover:bg-[#DFE3EA]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-[#DFE3EA] hover:border-[#13223C] p-6 shadow-sm transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-[#EFF1F5] text-[#13223C] border border-[#DFE3EA]">
                      {p.hsCode}
                    </span>
                    <span className="text-[10px] text-[#FC811B] uppercase tracking-widest font-black">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-extrabold text-[#13223C] mb-2 group-hover:text-[#FC811B] transition-colors">
                    {p.name}
                  </h3>

                  <div className="space-y-2 mb-4 text-xs">
                    <div className="text-[#76787C] flex items-start gap-1.5">
                      <span className="text-[#13223C] font-bold">Origin:</span>
                      <span>{p.originCountry}</span>
                    </div>
                    <div className="text-[#76787C] flex items-start gap-1.5">
                      <span className="text-[#13223C] font-bold">MOQ:</span>
                      <span className="text-[#13223C] font-semibold">{p.moq}</span>
                    </div>
                    <div className="p-2.5 bg-[#EFF1F5] border border-[#DFE3EA] text-[#13223C] leading-relaxed font-mono text-[11px]">
                      {p.specs}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DFE3EA] flex items-center justify-between">
                  <a
                    href="#rfq"
                    onClick={() => handleRfqCommodityChange(p.name)}
                    className="text-xs text-[#13223C] hover:text-[#FC811B] font-extrabold flex items-center gap-1 uppercase tracking-wider"
                  >
                    Quote Desk <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] text-gray-400 font-mono">SGS / BV Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. REQUEST FOR QUOTE (RFQ) FORM ENGINE ───────────────────────── */}
      <section id="rfq" className="py-24 bg-white border-t border-[#DFE3EA]">
        <div className="max-w-[960px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-[#13223C] font-extrabold text-xs tracking-[0.25em] uppercase mb-3">
              <span className="w-8 h-0.5 bg-[#FBD903]" />
              <span>DIRECT COMMERCIAL DESK</span>
              <span className="w-8 h-0.5 bg-[#FBD903]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#13223C] leading-tight">
              Request for Quote (RFQ) Engine
            </h2>
            <p className="text-[#76787C] text-sm mt-3">
              Submit your commodity trade parameters for instant desk evaluation, CIF/FOB pricing, and specification alignment.
            </p>
          </div>

          <div className="bg-[#EFF1F5] border border-[#DFE3EA] p-8 md:p-12 shadow-sm">
            {/* Mode Switcher */}
            <div className="flex bg-white p-1 mb-8 max-w-sm mx-auto border border-[#DFE3EA]">
              <button
                type="button"
                onClick={() => setRfqMode("BUYER")}
                className={`flex-1 py-2.5 text-xs font-extrabold tracking-wider uppercase transition-all ${
                  rfqMode === "BUYER" ? "bg-[#13223C] text-[#FBD903] shadow-sm" : "text-[#76787C] hover:text-[#13223C]"
                }`}
              >
                Institutional Buyer
              </button>
              <button
                type="button"
                onClick={() => setRfqMode("SUPPLIER")}
                className={`flex-1 py-2.5 text-xs font-extrabold tracking-wider uppercase transition-all ${
                  rfqMode === "SUPPLIER" ? "bg-[#13223C] text-[#FBD903] shadow-sm" : "text-[#76787C] hover:text-[#13223C]"
                }`}
              >
                Supplier / Mine Allocation
              </button>
            </div>

            <form onSubmit={handleRfqSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-extrabold text-[#13223C] uppercase tracking-wider block mb-2">
                    Commodity Selection
                  </label>
                  <select
                    value={selectedCommodity}
                    onChange={(e) => handleRfqCommodityChange(e.target.value)}
                    className="w-full bg-white border border-[#DFE3EA] px-4 py-3 text-[#13223C] text-sm focus:outline-none focus:border-[#13223C]"
                  >
                    {B2B_PRODUCTS.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.hsCode})
                      </option>
                    ))}
                    <option value="Custom Mineral/Commodity">Custom Mineral/Commodity Requirement</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#13223C] uppercase tracking-wider block mb-2">
                    Target Volume / Lot Size
                  </label>
                  <input
                    type="text"
                    value={rfqVolume}
                    onChange={(e) => setRfqVolume(e.target.value)}
                    placeholder="e.g. 500 MT, 10x20ft FCL, Bulk Vessel"
                    className="w-full bg-white border border-[#DFE3EA] px-4 py-3 text-[#13223C] text-sm focus:outline-none focus:border-[#13223C]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-extrabold text-[#13223C] uppercase tracking-wider block mb-2">
                    Incoterms 2020 Preference
                  </label>
                  <select
                    value={rfqIncoterm}
                    onChange={(e) => setRfqIncoterm(e.target.value)}
                    className="w-full bg-white border border-[#DFE3EA] px-4 py-3 text-[#13223C] text-sm focus:outline-none focus:border-[#13223C]"
                  >
                    <option value="CIF">CIF — Cost, Insurance & Freight (Discharge Port)</option>
                    <option value="FOB">FOB — Free on Board (Loading Port)</option>
                    <option value="CFR">CFR — Cost & Freight</option>
                    <option value="EXW">EXW — Ex Works (Mine/Stockyard)</option>
                    <option value="FOR">FOR — Free on Rail (Destination Siding)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#13223C] uppercase tracking-wider block mb-2">
                    Discharge Port / Gateway
                  </label>
                  <select
                    value={rfqPort}
                    onChange={(e) => setRfqPort(e.target.value)}
                    className="w-full bg-white border border-[#DFE3EA] px-4 py-3 text-[#13223C] text-sm focus:outline-none focus:border-[#13223C]"
                  >
                    <option value="Visakhapatnam Port (INVTZ)">Visakhapatnam Port (INVTZ)</option>
                    <option value="Gangavaram Port (INGGV)">Gangavaram Port (INGGV)</option>
                    <option value="JNPT Mumbai / Nhava Sheva (INNSA)">JNPT Mumbai (INNSA)</option>
                    <option value="Chennai Port (INMAA)">Chennai Port (INMAA)</option>
                    <option value="Mundra Port, Gujarat (INMUN)">Mundra Port (INMUN)</option>
                    <option value="Port of Singapore (SGSIN)">Port of Singapore (SGSIN)</option>
                    <option value="Port of Jebel Ali, UAE (AEJEA)">Jebel Ali, UAE (AEJEA)</option>
                    <option value="Direct Plant Rail Siding">Direct Plant Rail Siding</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#13223C] uppercase tracking-wider block mb-2">
                  Chemical Assay & Specifications
                </label>
                <input
                  type="text"
                  value={rfqSpecs}
                  onChange={(e) => setRfqSpecs(e.target.value)}
                  placeholder="e.g. CaCO3 > 95%, Fe > 64%, Ash < 12%, Moisture tolerances..."
                  className="w-full bg-white border border-[#DFE3EA] px-4 py-3 text-[#13223C] text-sm focus:outline-none focus:border-[#13223C]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-extrabold text-[#13223C] uppercase tracking-wider block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={rfqName}
                    onChange={(e) => setRfqName(e.target.value)}
                    placeholder="e.g. Suresh Varma"
                    className="w-full bg-white border border-[#DFE3EA] px-4 py-3 text-[#13223C] text-sm focus:outline-none focus:border-[#13223C]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#13223C] uppercase tracking-wider block mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={rfqCompany}
                    onChange={(e) => setRfqCompany(e.target.value)}
                    placeholder="e.g. Global Steels Ltd"
                    className="w-full bg-white border border-[#DFE3EA] px-4 py-3 text-[#13223C] text-sm focus:outline-none focus:border-[#13223C]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#13223C] uppercase tracking-wider block mb-2">
                    Official Email / Phone
                  </label>
                  <input
                    type="text"
                    value={rfqContact}
                    onChange={(e) => setRfqContact(e.target.value)}
                    placeholder="e.g. trade@company.com"
                    className="w-full bg-white border border-[#DFE3EA] px-4 py-3 text-[#13223C] text-sm focus:outline-none focus:border-[#13223C]"
                    required
                  />
                </div>
              </div>

              {rfqSubmitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono text-center">
                  ✓ RFQ registered successfully. Our commercial trade desk will contact you within 24 hours.
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#13223C] hover:bg-[#FBD903] text-white hover:text-[#13223C] font-extrabold text-xs uppercase tracking-wider px-8 py-4 transition-all duration-300 shadow-md"
                >
                  Submit Institutional RFQ
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppRfq}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-4 transition-all shadow-md"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  <span>Instant WhatsApp Quote (+91 85919 38908)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── 11. BLOG POSTS / INSIGHTS (Elementor Section 23ed9af) ─────────── */}
      <section id="news" className="py-24 bg-[#EFF1F5]">
        <div className="max-w-[1290px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[#13223C] font-extrabold text-xs tracking-[0.25em] uppercase mb-3">
              <span className="w-8 h-0.5 bg-[#FBD903]" />
              <span>DIRECTLY BLOG POSTS</span>
              <span className="w-8 h-0.5 bg-[#FBD903]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#13223C] leading-tight">
              Latest news & articles from the posts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((item, idx) => (
              <div key={idx} className="bg-white border border-[#DFE3EA] overflow-hidden group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Date Badge (Elementor Style) */}
                    <div className="absolute top-4 left-4 bg-[#13223C] text-white p-3 text-center min-w-[54px] shadow-md border-t-2 border-[#FBD903]">
                      <div className="font-heading text-xl font-extrabold leading-none">{item.date}</div>
                      <div className="text-[10px] uppercase font-bold text-[#FBD903] mt-0.5">{item.month}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-bold text-[#FC811B] uppercase tracking-wider mb-2">
                      {item.category}
                    </div>
                    <h3 className="font-heading text-lg font-extrabold text-[#13223C] leading-snug mb-3 group-hover:text-[#FC811B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#76787C] leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#DFE3EA]/50 mt-4">
                  <a
                    href="#rfq"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#13223C] group-hover:text-[#FC811B] uppercase tracking-wider transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. CONTACT COORDINATES ───────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-white border-t border-[#DFE3EA]">
        <div className="max-w-[1290px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[#13223C] font-extrabold text-xs tracking-[0.25em] uppercase mb-3">
              <span className="w-8 h-0.5 bg-[#FBD903]" />
              <span>DIRECT DESK COORDINATES</span>
              <span className="w-8 h-0.5 bg-[#FBD903]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#13223C] leading-tight">
              Commercial Trade Desk
            </h2>
            <p className="text-[#76787C] text-sm mt-3">
              Connect directly with our trading coordinators for allocation contracts, rake allotments, and port logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="mailto:info@vasistatradingservices.com"
              className="bg-[#EFF1F5] hover:bg-[#13223C] group p-8 text-center border border-[#DFE3EA] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white group-hover:bg-[#FBD903] text-[#13223C] mx-auto flex items-center justify-center mb-4 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-extrabold text-gray-500 group-hover:text-gray-300 tracking-wider mb-1">
                Official Email
              </div>
              <div className="font-heading font-extrabold text-sm text-[#13223C] group-hover:text-white break-all">
                info@vasistatradingservices.com
              </div>
            </a>

            <a
              href="tel:+918591938908"
              className="bg-[#EFF1F5] hover:bg-[#13223C] group p-8 text-center border border-[#DFE3EA] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white group-hover:bg-[#FBD903] text-[#13223C] mx-auto flex items-center justify-center mb-4 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-extrabold text-gray-500 group-hover:text-gray-300 tracking-wider mb-1">
                Desk Hotline
              </div>
              <div className="font-heading font-extrabold text-sm text-[#13223C] group-hover:text-white">
                +91 85919 38908
              </div>
            </a>

            <a
              href="https://www.vasistatradingservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EFF1F5] hover:bg-[#13223C] group p-8 text-center border border-[#DFE3EA] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white group-hover:bg-[#FBD903] text-[#13223C] mx-auto flex items-center justify-center mb-4 transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-extrabold text-gray-500 group-hover:text-gray-300 tracking-wider mb-1">
                Official Portal
              </div>
              <div className="font-heading font-extrabold text-sm text-[#13223C] group-hover:text-white">
                vasistatradingservices.com
              </div>
            </a>

            <div className="bg-[#EFF1F5] hover:bg-[#13223C] group p-8 text-center border border-[#DFE3EA] transition-all duration-300">
              <div className="w-12 h-12 bg-white group-hover:bg-[#FBD903] text-[#13223C] mx-auto flex items-center justify-center mb-4 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-extrabold text-gray-500 group-hover:text-gray-300 tracking-wider mb-1">
                Port Corridors
              </div>
              <div className="font-heading font-extrabold text-sm text-[#13223C] group-hover:text-white">
                Mumbai & Andhra Ports, India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. OFFICIAL FOOTER (Mirroring vasistaengineering.com) ────────── */}
      <footer className="bg-[#101C30] text-gray-300 pt-20 pb-10 border-t border-white/10">
        <div className="max-w-[1290px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">

            {/* Col 1: Brand & Bio */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={logoImg} alt="Vasista Logo" className="h-10 w-auto brightness-110" />
                <div>
                  <div className="font-heading text-xl font-black text-white leading-none">VASISTA</div>
                  <div className="text-[9px] uppercase tracking-widest text-[#FBD903] font-extrabold">Trading Services Pvt. Ltd.</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Delivering reliable commodity trading, verified SGS assays, and multimodal freight solutions across minerals, energy fuels, and agro commodities. GSTIN: 37AALCV9169R1ZY.
              </p>
              <div className="flex items-center gap-2">
                <a href="https://facebook.com/share/1HWeDcLf9Q" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FBD903] hover:text-[#13223C] flex items-center justify-center transition-colors">
                  <SiFacebook className="w-3.5 h-3.5" />
                </a>
                <a href="https://instagram.com/vasista_trading_services" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FBD903] hover:text-[#13223C] flex items-center justify-center transition-colors">
                  <SiInstagram className="w-3.5 h-3.5" />
                </a>
                <a href="https://linkedin.com/company/vasista-trading-services-private-limited" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FBD903] hover:text-[#13223C] flex items-center justify-center transition-colors">
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </a>
                <a href="https://wa.me/918591938908" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FBD903] hover:text-[#13223C] flex items-center justify-center transition-colors">
                  <SiWhatsapp className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <div className="font-heading text-base font-extrabold text-white uppercase tracking-wider mb-6 pb-2 border-b border-[#FBD903] inline-block">
                Navigation
              </div>
              <ul className="space-y-3 text-xs uppercase tracking-wider font-bold">
                <li><a href="#" className="hover:text-[#FBD903] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#FBD903] transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-[#FBD903] transition-colors">Commodities & Services</a></li>
                <li><a href="#tracking" className="hover:text-[#FBD903] transition-colors">Freight Tracking</a></li>
                <li><a href="#catalog" className="hover:text-[#FBD903] transition-colors">B2B Product Matrix</a></li>
                <li><a href="#rfq" className="hover:text-[#FBD903] transition-colors">RFQ Desk</a></li>
                <li><a href="#contact" className="hover:text-[#FBD903] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Coordinates */}
            <div>
              <div className="font-heading text-base font-extrabold text-white uppercase tracking-wider mb-6 pb-2 border-b border-[#FBD903] inline-block">
                Locations
              </div>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-white font-bold mb-1">Registered Office:</div>
                  <p className="text-gray-400">Vizianagaram, Andhra Pradesh 535002, India</p>
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Operational Desk:</div>
                  <p className="text-gray-400">Navi Mumbai, Maharashtra, India</p>
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Direct Phone:</div>
                  <p className="text-[#FBD903] font-mono font-bold">+91 85919 38908</p>
                </div>
              </div>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <div className="font-heading text-base font-extrabold text-white uppercase tracking-wider mb-6 pb-2 border-b border-[#FBD903] inline-block">
                Newsletter
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Subscribe for weekly benchmark commodity pricing, freight indices, and port updates.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }} className="flex">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FBD903]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#FBD903] hover:bg-white text-[#13223C] px-4 font-bold text-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© Copyright 2025-2026 by vasistatradingservices.com. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <span>TRUST</span>
              <span className="w-1 h-1 rounded-full bg-[#FBD903]" />
              <span>QUALITY</span>
              <span className="w-1 h-1 rounded-full bg-[#FBD903]" />
              <span>COMMITMENT</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
