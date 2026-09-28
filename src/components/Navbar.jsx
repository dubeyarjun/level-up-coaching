import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.navbar.home, href: "#home" },
    { name: t.navbar.about, href: "#about" },
    { name: t.navbar.teachers, href: "#teachers" },
    { name: t.navbar.subjects, href: "#subjects" },
    { name: t.navbar.classes, href: "#classes" },
    {
      name: t.navbar.questionPapers,
      href: "#question-papers",
    },
    { name: t.navbar.contact, href: "#contact" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#0B1020]/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={handleLinkClick}
          className="group flex items-center gap-2"
        >
          {/* Logo Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400 text-sm font-black text-slate-950 transition group-hover:scale-105">
            LU
          </div>

          {/* Logo Text */}
          <div className="leading-none">
            <span className="block text-lg font-extrabold tracking-wide text-white sm:text-xl">
              LEVEL<span className="text-lime-400">-UP</span>
            </span>

            <span className="hidden text-[9px] font-medium tracking-[0.2em] text-slate-500 sm:block">
              COACHING
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-lime-400"
            >
              {link.name}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                language === "en"
                  ? "bg-lime-400 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              English
            </button>

            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                language === "hi"
                  ? "bg-lime-400 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-lime-400/10 transition hover:-translate-y-0.5 hover:bg-lime-300"
          >
            {t.navbar.admission}
          </a>
        </div>

        {/* Tablet CTA + Mobile Menu */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Language Switcher - Mobile/Tablet */}
          <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold transition ${
                language === "en"
                  ? "bg-lime-400 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold transition ${
                language === "hi"
                  ? "bg-lime-400 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              हिं
            </button>
          </div>

          {/* Small CTA */}
          <a
            href="#contact"
            className="hidden rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-slate-950 sm:block"
          >
            {t.navbar.admission}
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-xl text-white transition hover:border-lime-400 hover:text-lime-400"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-[#0F172A] shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-lime-400"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-4 border-t border-slate-800 pt-4">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="block rounded-xl bg-lime-400 px-4 py-3 text-center font-bold text-slate-950 transition hover:bg-lime-300"
              >
                {t.navbar.admission}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
