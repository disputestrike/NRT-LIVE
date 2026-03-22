"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const LINKS = [
  { l:"Live",          slug:"/" },
  { l:"Nigeria",       slug:"/nigeria" },
  { l:"Africa",        slug:"/africa" },
  { l:"Sports",        slug:"/sports" },
  { l:"Business",      slug:"/economy" },
  { l:"Entertainment", slug:"/entertainment" },
  { l:"Money",         slug:"/money" },
  { l:"Tech",          slug:"/tech" },
  { l:"World",         slug:"/world" },
  { l:"Health",        slug:"/health" },
  { l:"Opinion",       slug:"/opinion" },
];

export default function Navbar({ onLeak }: { onLeak: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className="top-nav" style={{ boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.12)" : "0 2px 10px rgba(0,0,0,0.06)" }}>
      <div className="nav-inner">
        <Link href="/" className="nrt-logo" style={{ fontSize:34, letterSpacing:2 }}>NRT<span>.</span></Link>
        <div className="nav-divider" />
        <div className="nav-links">
          {LINKS.map(({ l, slug }) => (
            <a key={l} href={slug} className="nav-link">{l}</a>
          ))}
        </div>
        <div className="nav-right">
          <button className="pill-btn">🔍 Search</button>
          <button className="pill-btn" onClick={onLeak}>🔒 Submit Leak</button>
          <button className="pill-btn-primary">Subscribe</button>
        </div>
      </div>
    </nav>
  );
}
