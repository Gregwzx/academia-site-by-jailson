"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", targetId: "#inicio" },
    { name: "Sobre", targetId: "#destaques" },  
    { name: "Treinos", targetId: "#modalidades" },
    { name: "Planos", targetId: "#planos" },
    { name: "Contato", targetId: "#contato" },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(targetId);
      if (element) {
        const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          scrolled 
            ? "bg-black/30 backdrop-blur-md shadow-lg border-white/5" 
            : "bg-transparent backdrop-blur-[2px]" 
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative">
          
          {/* --- ESQUERDA: Links de Navegação --- */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-start z-20">
            {navLinks.map((item) => (
              <Link 
                key={item.name}
                href={item.targetId === "#inicio" ? "/" : `/${item.targetId}`}
                onClick={(e) => handleNavigation(e, item.targetId)}
                className="
                  text-sm font-semibold uppercase tracking-[0.15em] 
                  text-gray-300 hover:text-white 
                  transition-all duration-300 relative group
                  hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
                "
              >
                {item.name}
                {/* Linha azul neon animada embaixo */}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0 shadow-[0_0_10px_#3b82f6]" />
              </Link>
            ))}
          </div>

          {/* --- CENTRO: LOGO (Mantido Intacto) --- */}
          <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center pointer-events-none z-10">
            <Link href="/" className="group flex flex-col items-center justify-center pointer-events-auto">
              <span className="text-2xl md:text-2xl font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-300 drop-shadow-xl">
                AURA <span className="text-blue-600 neon-title drop-shadow-[0_0_15px_rgba(37,99,235,0.9)]">FIT</span>
              </span>
            </Link>
          </div>

          {/* --- DIREITA: Área do Usuário / Login --- */}
          <div className="flex items-center gap-4 flex-1 justify-end z-20">
            {user ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="hidden sm:block text-right leading-tight">
                  {/* Removido 'text-arial', agora usa a fonte padrão */}
                  <p className="text-white font-extrabold tracking-wide">{user.name}</p>
                  <p className="text-blue-400 text-[10px] uppercase tracking-[0.2em] font-bold">{user.plano || "MEMBRO"}</p>
                </div>

                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/30">
                  {user.name[0].toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest border border-transparent hover:border-red-500/30 px-3 py-1 rounded-full"
                >
                  Sair
                </button>
              </motion.div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoginOpen(true)}
                className="
                  px-8 py-2.5
                  bg-blue-600/90 hover:bg-blue-500 
                  backdrop-blur-md
                  text-white font-bold uppercase tracking-[0.1em]
                  rounded-full 
                  transition-all duration-300 
                  shadow-[0_0_20px_rgba(37,99,235,0.3)] 
                  hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] 
                  border border-blue-400/30
                  cursor-pointer relative z-50
                "
              >
                {/* Removido 'text-arial', agora usa a fonte padrão */}
                Entrar
              </motion.button>
            )}
          </div>

        </div>
      </motion.nav>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
}