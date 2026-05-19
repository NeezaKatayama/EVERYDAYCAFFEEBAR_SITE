"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const menuGroups = [
  {
    label: "COFFEE",
    items: [
      "POUR OVER COFFEE",
      "ORIGINAL BLEND COFFEE BEANS",
      "SEASONAL COFFEE BEANS",
      "ESPRESSO",
      "AMERICANO",
      "CAFE LATTE",
    ],
  },
  {
    label: "MATCHA / SOFT DRINK",
    items: [
      "MATCHA AMERICANO",
      "MATCHA LATTE",
      "CRAFT COLA",
      "CRAFT GINGER ALE",
      "GUAVA JUICE",
      "100% PREMIUM ORANGE JUICE",
    ],
  },
  {
    label: "ALCOHOL",
    items: [
      "TODAY'S GLASS RED WINE",
      "TODAY'S GLASS WHITE WINE",
      "TODAY'S GLASS SPARKLING WINE",
    ],
  },
];

const storeViewImages = [
  {
    src: "/store-view-4.jpeg",
    alt: "Everyday Coffee Bar storefront exterior",
  },
  {
    src: "/store-view-1.jpeg",
    alt: "Everyday Coffee Bar interior seating",
  },
  {
    src: "/store-view-2.jpeg",
    alt: "Everyday Coffee Bar espresso machine",
  },
  {
    src: "/store-view-3.jpeg",
    alt: "Everyday Coffee Bar signature cup",
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [activeStoreImage, setActiveStoreImage] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      setPointer({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveStoreImage((current) => (current + 1) % storeViewImages.length);
    }, 2500);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const heroShift = Math.min(scrollY * 0.12, 90);
  const heroScale = Math.max(1 - scrollY * 0.00012, 0.94);
  const copyOffset = Math.min(scrollY * 0.08, 48);
  const titleOffset = Math.min(scrollY * 0.06, 40);
  const menuOffset = Math.max(48 - scrollY * 0.08, 0);
  const infoOffset = Math.max(64 - Math.max(scrollY - 120, 0) * 0.08, 0);
  const progress = Math.min(scrollY / 18, 100);
  const heroCopyTransform = `translate3d(${pointer.x * -18}px, calc(-50% + ${copyOffset + pointer.y * 10}px), 0)`;
  const heroCenterTransform = `translate3d(${pointer.x * 18}px, ${heroShift + pointer.y * 12}px, 0) scale(${heroScale})`;
  const heroTitleTransform = `translate3d(${pointer.x * 16}px, calc(-50% + ${titleOffset + pointer.y * -10}px), 0)`;

  return (
    <main className="showcase-page">
      <div className="bg-triptych" aria-hidden="true">
        <span className="bg-panel bg-panel-1" />
        <span className="bg-panel bg-panel-2" />
        <span className="bg-panel bg-panel-3" />
      </div>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <header className="site-header reveal-on-scroll" data-reveal>
        <div className="brand-lockup">
          <span className="brand-mark accent-mark" />
          <span>EVERYDAY COFFEE BAR</span>
        </div>

        <nav className="top-nav">
          <a href="#menu">MENU</a>
          <a href="#information">INFO</a>
          <a
            className="nav-accent"
            href="https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8C%97%E9%9D%92%E5%B1%B13-10-25"
            target="_blank"
            rel="noreferrer"
          >
            GOOGLE MAPS
          </a>
          <a
            className="nav-button"
            href="https://www.instagram.com/everydaycoffeebar.omotesando/"
            target="_blank"
            rel="noreferrer"
          >
            INSTAGRAM
          </a>
        </nav>
      </header>

      <section className="showcase-hero">
        <div
          className="hero-copy reveal-on-scroll delay-1"
          data-reveal
          style={{ "--motion-transform": heroCopyTransform }}
        >
          <p>焙煎士がこだわる、</p>
          <p>最後の一滴まで深い、</p>
          <p>本物のコクと香り</p>
        </div>

        <div
          className="hero-center reveal-on-scroll delay-2"
          data-reveal
          style={{ "--motion-transform": heroCenterTransform }}
        >
          <Image
            src="/centerpiece-wireframe-v2.png"
            alt="Wireframe style coffee grinder artwork"
            width={1320}
            height={1080}
            priority
            sizes="(max-width: 1024px) 92vw, 56vw"
            className="centerpiece-image"
          />
        </div>

        <div
          className="hero-title reveal-on-scroll delay-3"
          data-reveal
          style={{ "--motion-transform": heroTitleTransform }}
        >
          <p>
            EVERYDAY <span className="accent-slash">/</span>
          </p>
          <p>COFFEE BAR</p>
        </div>

        <aside
          className="side-index reveal-on-scroll delay-3"
          data-reveal
        >
          <a href="#top">Top</a>
          <a href="#menu">Menu</a>
          <a href="#information">Overview</a>
          <a href="#information">Information</a>
        </aside>
      </section>

      <section
        className="content-section section-slide delay-2"
        data-reveal
      >
        <div className="section-label">
          STORE VIEW <span className="section-dot" />
        </div>
        <div className="section-panel">
          <div className="store-view-slider interactive-card">
            <div className="store-view-frame">
              {storeViewImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`store-view-slide ${
                    index === activeStoreImage ? "is-active" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 72vw"
                    className="store-view-image"
                  />
                </div>
              ))}
            </div>

            <div className="store-view-meta">
              <div className="store-view-dots" aria-hidden="true">
                {storeViewImages.map((image, index) => (
                  <span
                    key={image.src}
                    className={`store-view-dot ${
                      index === activeStoreImage ? "is-active" : ""
                    }`}
                  />
                ))}
              </div>
              <p className="store-view-counter">
                {String(activeStoreImage + 1).padStart(2, "0")} /{" "}
                {String(storeViewImages.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="information"
        className="content-section section-slide delay-1"
        data-reveal
        style={{ "--scroll-offset": `${infoOffset}px` }}
      >
        <div className="section-label">
          INFORMATION <span className="section-dot" />
        </div>
        <div className="section-panel information-panel interactive-card">
          <div>
            <p className="info-eyebrow">
              STORE <span className="accent-red-text">01</span>
            </p>
            <h2>EVERYDAY COFFEE BAR</h2>
          </div>

          <div className="info-grid">
            <div>
              <p className="info-eyebrow">ADDRESS</p>
              <p>東京都港区北青山3-10-25</p>
            </div>
            <div>
              <p className="info-eyebrow">HOURS</p>
              <p>11:00 - 19:00</p>
            </div>
            <div>
              <p className="info-eyebrow accent-red-text">NOTE</p>
              <p>TAKE OUT AVAILABLE</p>
            </div>
          </div>

          <div className="info-accent-line" />
        </div>
      </section>

      <section
        id="menu"
        className="content-section section-slide"
        data-reveal
        style={{ "--scroll-offset": `${menuOffset}px` }}
      >
        <div className="section-label">
          MENU <span className="section-dot" />
        </div>
        <div className="section-panel menu-grid">
          {menuGroups.map((group) => (
            <div key={group.label} className="menu-group interactive-card">
              <p className="menu-group-label">{group.label}</p>
              <div className="menu-group-list">
                {group.items.map((item) => (
                  <div key={item} className="list-row menu-row-compact">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
