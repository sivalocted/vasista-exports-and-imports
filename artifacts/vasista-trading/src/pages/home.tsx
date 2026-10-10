import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Globe,
  Handshake,
  Mail,
  Menu,
  Phone,
  TrendingUp,
  Truck,
  X,
} from "lucide-react";

import veEmblem from "@assets/ve-emblem.png";
import heroContainerShip from "@assets/hero-container-ship.jpg";
import bauxiteImage from "@/assets/products/bauxite.jpg";
import coalImage from "@/assets/products/coal.jpg";
import dapImage from "@/assets/products/dap.jpg";
import fomImage from "@/assets/products/fom.jpg";
import limestoneImage from "@/assets/products/limestone.jpg";
import manganeseImage from "@/assets/products/manganese.jpg";
import pesticidesImage from "@/assets/products/pesticides.jpg";
import rockPhosphateImage from "@/assets/products/rock-phosphate.jpg";
import scrapImage from "@/assets/products/scrap.jpg";
import sulphurImage from "@/assets/products/sulphur-granules.jpg";
import thermalCoalImage from "@/assets/products/thermal-coal.jpg";
import ureaImage from "@/assets/products/urea.jpg";

type Product = {
  name: string;
  note?: string;
  detail: string;
  image: string;
  alt: string;
};

const products: Product[] = [
  { name: "LIME STONE", detail: "Industrial Grade Premium Quality", image: limestoneImage, alt: "Pale limestone pieces" },
  { name: "UREA", detail: "Agricultural & Industrial Use", image: ureaImage, alt: "White urea fertilizer granules" },
  { name: "BAUXITE", detail: "High Grade Export Quality", image: bauxiteImage, alt: "Reddish-brown bauxite ore" },
  { name: "ALL TYPE OF SCRAPS", detail: "Ferrous & Non-Ferrous Metal Scraps", image: scrapImage, alt: "Ferrous and non-ferrous metal scrap" },
  { name: "MANGANESE", detail: "Metallurgical Grade Consistent Supply", image: manganeseImage, alt: "Manganese ore chunks" },
  { name: "COAL", detail: "Industrial & Thermal Applications", image: coalImage, alt: "Black coal chunks" },
  { name: "THERMAL COAL", detail: "Reliable Energy Solutions", image: thermalCoalImage, alt: "Thermal coal lumps" },
  { name: "DAP", note: "(AMMONIUM PHOSPHATE)", detail: "High Nutrient Fertilizer Grade", image: dapImage, alt: "DAP fertilizer granules" },
  { name: "ROCK PHOSPHATE", detail: "Mineral Fertilizer Raw Material", image: rockPhosphateImage, alt: "Natural rock phosphate" },
  { name: "PESTICIDES", detail: "Crop Protection Trusted Brands", image: pesticidesImage, alt: "Unbranded crop protection bottles among green leaves" },
  { name: "FOM", note: "(FERMENTED ORGANIC MANURE)", detail: "Organic Farming Healthier Soil", image: fomImage, alt: "Organic manure compost with green seedlings" },
  { name: "SULPHUR GRANULES", detail: "Industrial & Agricultural Applications", image: sulphurImage, alt: "Golden yellow sulphur granules" },
];

const benefits = [
  { title: "GLOBAL SOURCING", detail: "Quality Products Worldwide", Icon: Globe },
  { title: "TRUSTED PARTNERSHIPS", detail: "Long Term Relationships", Icon: Handshake },
  { title: "SEAMLESS LOGISTICS", detail: "On Time Delivery", Icon: Truck },
  { title: "GROWING TOGETHER", detail: "Sustainable Business", Icon: TrendingUp },
  { title: "DOMESTIC & INTERNATIONAL", detail: "Trade Facilitation", Icon: Globe },
];

const regions = ["INDIA", "AFRICA", "MIDDLE EAST", "EUROPE", "GLOBAL"];
const whatsappUrl = "https://wa.me/918591938908?text=" + encodeURIComponent("Hello Vasista Team, I am interested in your products. Please share further details.");

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -36px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell" id="home">
      <div className="topline">
        <div className="topline__inner">
          <span>VASISTA TRADING SERVICES PVT. LTD.</span>
          <div className="topline__contact">
            <a href="mailto:info@vasistatradingservices.com"><Mail aria-hidden="true" /> info@vasistatradingservices.com</a>
            <a href="tel:+918591938908"><Phone aria-hidden="true" /> +91 8591938908</a>
          </div>
        </div>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <div className="site-nav__inner">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Vasista Trading Services home">
            <img src={veEmblem} alt="" className="brand__mark" />
            <span className="brand__wordmark">
              <strong>VASISTA</strong>
              <small>TRADING SERVICES PVT. LTD.</small>
            </span>
          </a>

          <div className="site-nav__links">
            <a href="#home">HOME</a>
            <a href="#products">OUR PRODUCTS</a>
            <a href="#advantages">WHY VASISTA</a>
            <a href="#contact">CONTACT</a>
          </div>

          <a className="nav-cta" href="#contact">
            GET A FREE QUOTE <ArrowRight aria-hidden="true" />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <div className={menuOpen ? "mobile-nav mobile-nav--open" : "mobile-nav"} id="mobile-navigation">
          <a href="#home" onClick={closeMenu}>HOME</a>
          <a href="#products" onClick={closeMenu}>OUR PRODUCTS</a>
          <a href="#advantages" onClick={closeMenu}>WHY VASISTA</a>
          <a href="#contact" onClick={closeMenu}>CONTACT</a>
          <a className="mobile-nav__cta" href="#contact" onClick={closeMenu}>GET A FREE QUOTE <ArrowRight aria-hidden="true" /></a>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <img className="hero__image" src={heroContainerShip} alt="Container ship carrying goods across the ocean at sunset" />
        <div className="hero__shade" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__orbit hero__orbit--one" aria-hidden="true" />
        <div className="hero__orbit hero__orbit--two" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__eyebrow hero-enter hero-enter--one">STRONG SOURCING, SMARTER TRADING</p>
          <h1 className="hero__title hero-enter hero-enter--two" id="hero-title">
            QUALITY RAW MATERIALS
            <span>FOR A STRONGER</span>
            <em>TOMORROW</em>
          </h1>
          <p className="hero__company hero-enter hero-enter--three">VASISTA TRADING SERVICES PVT. LTD.</p>
          <div className="hero__actions hero-enter hero-enter--four">
            <a className="button button--gold" href="#products">OUR PRODUCTS <ArrowDown aria-hidden="true" /></a>
            <a className="button button--outline" href="#contact">GET IN TOUCH <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="hero__markets hero-enter hero-enter--four" aria-label="Markets: India, Africa, Middle East, Europe, Global">
            {regions.map((region) => <span key={region}>{region}</span>)}
          </div>
        </div>
        <div className="hero__seal" aria-hidden="true">
          <span className="hero__seal-orbit" />
          <span className="hero__seal-label">DOMESTIC &<br />INTERNATIONAL</span>
          <span className="hero__seal-caption">TRADE FACILITATION</span>
        </div>
        <a className="hero__scroll" href="#products" aria-label="Scroll to products"><span /> SCROLL TO EXPLORE</a>
      </section>

      <section className="products-section" id="products" aria-labelledby="products-title">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span /> OUR PRODUCTS <span /></p>
          <h2 id="products-title">QUALITY RAW MATERIALS<br /><em>FOR A STRONGER TOMORROW</em></h2>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <article className="product-card" data-reveal key={product.name} style={{ transitionDelay: (index % 4) * 65 + "ms" }}>
              <div className="product-card__photo">
                <img src={product.image} alt={product.alt} loading="lazy" decoding="async" />
                <span className="product-card__corner" aria-hidden="true" />
              </div>
              <div className="product-card__body">
                <h3>{product.name}</h3>
                {product.note && <p className="product-card__note">{product.note}</p>}
                <p className="product-card__detail">{product.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="advantages" id="advantages" aria-label="Why Vasista">
        <div className="advantages__heading" data-reveal>
          <p className="eyebrow eyebrow--light"><span /> WHY VASISTA <span /></p>
          <h2>STRONG SOURCING.<br /><em>SMARTER TRADING.</em></h2>
        </div>
        <div className="advantages__grid">
          {benefits.map(({ title, detail, Icon }, index) => (
            <article className="benefit" data-reveal key={title} style={{ transitionDelay: index * 70 + "ms" }}>
              <div className="benefit__icon"><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="markets-ticker" aria-label="India, Africa, Middle East, Europe, Global">
        <div className="markets-ticker__track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <span className="markets-ticker__set" key={copy}>
              {regions.map((region) => <span className="markets-ticker__item" key={region}><Globe aria-hidden="true" /> {region}</span>)}
            </span>
          ))}
        </div>
      </div>

      <section className="contact-cta" id="contact" aria-labelledby="contact-title">
        <div className="contact-cta__glow" aria-hidden="true" />
        <div className="contact-cta__inner" data-reveal>
          <p className="eyebrow eyebrow--light"><span /> CONNECTING RESOURCES <span /></p>
          <h2 id="contact-title">CREATING OPPORTUNITIES.<br /><em>BUILDING A BETTER TOMORROW.</em></h2>
          <div className="contact-cta__actions">
            <a className="button button--gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">CONTACT OUR TEAM <ArrowRight aria-hidden="true" /></a>
            <a className="contact-link" href="mailto:info@vasistatradingservices.com"><Mail aria-hidden="true" /> info@vasistatradingservices.com</a>
            <a className="contact-link" href="tel:+918591938908"><Phone aria-hidden="true" /> +91 8591938908</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <img src={veEmblem} alt="" />
          <span>VASISTA TRADING SERVICES PVT. LTD.</span>
        </div>
        <p className="site-footer__regions">{regions.join("   |   ")}</p>
        <p className="site-footer__motto">CONNECTING RESOURCES <i /> CREATING OPPORTUNITIES <i /> BUILDING A BETTER TOMORROW</p>
      </footer>
    </main>
  );
}

export default Home;
