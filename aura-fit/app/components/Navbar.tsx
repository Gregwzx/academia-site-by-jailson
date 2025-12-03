"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-white">
          Aura <span className="text-blue-600 neon">Fit</span>
        </Link>

        <div className="hidden md:flex gap-8 text-white text-sm uppercase font-semibold">
          <a 
            href="#inicio" 
            onClick={(e) => scrollToSection(e, '#inicio')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Início
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#destaques" 
            onClick={(e) => scrollToSection(e, '#destaques')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Sobre
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#modalidades" 
            onClick={(e) => scrollToSection(e, '#modalidades')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Treinos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#planos" 
            onClick={(e) => scrollToSection(e, '#planos')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Planos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#contato" 
            onClick={(e) => scrollToSection(e, '#contato')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Contato
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}