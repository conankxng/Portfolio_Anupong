import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [navH, setNavH] = useState(80);

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portofolio" },
    { href: "#Contact", label: "Contact" },
  ];

  const GRAD_TXT =
    "bg-gradient-to-r from-[#ff0202] to-[#f755d9] bg-clip-text text-transparent";
  const GRAD_BAR = "bg-gradient-to-r from-[#ff0202] to-[#f755d9]";

  const updateNavHeight = useCallback(() => {
    const h = document.querySelector("nav")?.offsetHeight || 80;
    setNavH(h);
  }, []);

  // track navbar height + set scrollMarginTop for sections
  useEffect(() => {
    updateNavHeight();
    const onResize = () => updateNavHeight();
    window.addEventListener("resize", onResize);

    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) el.style.scrollMarginTop = `${(document.querySelector("nav")?.offsetHeight || 80) + 8}px`;
    });

    return () => window.removeEventListener("resize", onResize);
  }, [updateNavHeight]);

  // blur / bg when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active tab detection
  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRect.height - a.intersectionRect.height)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      {
        root: null,
        rootMargin: `-${navH + 8}px 0px -60% 0px`,
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [navItems, navH]);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // smooth scroll with offset
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;

    const target = el.getBoundingClientRect().top + window.pageYOffset - (navH + 8);
    window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    setIsOpen(false);
    history.replaceState(null, "", href);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[linear-gradient(90deg,rgba(255,2,2,0.06),rgba(247,85,217,0.06))] backdrop-blur-xl"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#Home"
              onClick={(e) => scrollToSection(e, "#Home")}
              className={`text-xl font-bold ${GRAD_TXT}`}
            >
              Anupong
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="group relative px-1 py-2 text-sm font-medium"
                  >
                    <span
                      className={`relative z-10 transition-colors duration-300 ${isActive
                        ? `${GRAD_TXT} font-semibold`
                        : "text-[#e2d3fd] group-hover:text-white"
                        }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 ${GRAD_BAR} transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile toggle button — theming */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className={`
                relative p-2 rounded-xl
                text-[#e2d3fd] hover:text-white
                bg-white/5 hover:bg-white/10
                border border-white/10
                backdrop-blur-xl
                shadow-[0_10px_28px_-12px_rgba(247,85,217,0.35)]
                transition-all duration-300 ease-in-out
                ${isOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"}
              `}
            >
              {/* soft glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-0.5 rounded-xl opacity-0 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg,#ff0202,#f755d9)", filter: "blur(8px)" }}
              />
              <span className="relative block">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — theming */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div
          className="
            px-4 py-6 space-y-3
            border-t border-white/10
            bg-[linear-gradient(90deg,rgba(255,2,2,0.06),rgba(247,85,217,0.06))]
            backdrop-blur-xl
            shadow-[0_24px_80px_-24px_rgba(255,2,2,0.28)]
          "
        >
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`
                  block w-full px-4 py-3 rounded-xl font-medium
                  transition-all duration-300 ease
                  border border-white/10
                  ${isActive
                    ? `${GRAD_TXT} font-semibold`
                    : "text-[#e2d3fd] hover:text-white bg-white/5 hover:bg-white/10"}
                `}
                style={{
                  transitionDelay: `${index * 60}ms`,
                  transform: isOpen ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
