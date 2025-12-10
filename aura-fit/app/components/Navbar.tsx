"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import LoginModal from "./LoginModal";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiInfo, FiActivity, FiDollarSign, FiMail } from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Início", targetId: "#inicio", icon: FiHome },
    { name: "Sobre", targetId: "#destaques", icon: FiInfo },
    { name: "Treinos", targetId: "#modalidades", icon: FiActivity },
    { name: "Planos", targetId: "#planos", icon: FiDollarSign },
    { name: "Contato", targetId: "#contato", icon: FiMail },
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
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-black/30 backdrop-blur-md shadow-lg border-b border-white/5" 
            : "bg-transparent backdrop-blur-[2px]" 
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
          
          {/* --- ESQUERDA: Links Desktop --- */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-start z-20">
            {navLinks.map((item) => (
              <Link 
                key={item.name}
                href={item.targetId === "#inicio" ? "/" : `/${item.targetId}`}
                onClick={(e) => handleNavigation(e, item.targetId)}
                className="group relative text-sm font-semibold uppercase tracking-[0.15em] text-gray-300 hover:text-white transition-all duration-300"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </div>

          {/* --- CENTRO: LOGO --- */}
          <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center pointer-events-none z-10">
            <Link href="/" className="group flex flex-col items-center justify-center pointer-events-auto">
              <motion.span 
                className="text-lg sm:text-xl font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                AURA <span className="text-blue-600 neon-title">FIT</span>
              </motion.span>
            </Link>
          </div>

          {/* --- DIREITA: Área do Usuário / Login --- */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end z-20">
            {user ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6"
              >
                {/* --- MUDANÇA AQUI: Link envolvendo o perfil --- */}
                <Link href="/membros" className="flex items-center gap-3 group cursor-pointer">
                  <div className="text-right leading-tight group-hover:opacity-80 transition-opacity">
                    <p className="text-white font-extrabold tracking-wide">{user.name}</p>
                    <p className="text-blue-400 text-[10px] uppercase tracking-[0.2em] font-bold">{user.plano || "MEMBRO"}</p>
                  </div>

                  <motion.div 
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.95 }}
                     className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white font-bold shadow-lg border border-blue-400/30 group-hover:border-blue-400 transition-colors"
                  >
                    {user.name[0].toUpperCase()}
                  </motion.div>
                </Link>
                {/* ----------------------------------------------- */}

                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest border border-transparent hover:border-red-500/30 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <FiLogOut size={14} />
                  Sair
                </button>
              </motion.div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoginOpen(true)}
                className="px-6 py-2 bg-blue-600/80 hover:bg-blue-500 backdrop-blur-md text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-600/50 border border-blue-400/30 flex items-center gap-2"
              >
                <FiUser size={16} />
                Entrar
              </motion.button>
            )}
          </div>

          {/* --- MOBILE: Menu Hamburger --- */}
          <div className="lg:hidden flex items-center gap-3 z-20">
            {user && (
              // Link também no ícone mobile
              <Link href="/membros">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border border-blue-400/30 cursor-pointer">
                  {user.name[0].toUpperCase()}
                </div>
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-b from-gray-900 via-black to-gray-900 z-50 lg:hidden shadow-2xl border-l border-blue-500/20"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    {user && (
                      <p className="text-sm text-blue-400 mt-1">Olá, {user.name}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <nav className="space-y-2">
                    {navLinks.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.targetId === "#inicio" ? "/" : `/${item.targetId}`}
                            onClick={(e) => handleNavigation(e, item.targetId)}
                            className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-600/10 rounded-xl transition-all duration-300 group"
                          >
                            <Icon size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">{item.name}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* User Info Card (Mobile) */}
                  {user && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 p-4 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20"
                    >
                      {/* Tornei o card inteiro clicável também */}
                      <Link href="/membros" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="flex items-center gap-3 mb-3 cursor-pointer">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                            {user.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-bold">{user.name}</p>
                            <p className="text-blue-400 text-xs uppercase tracking-wider">{user.plano}</p>
                          </div>
                        </div>
                      </Link>
                      
                      <Link
                        href="/membros"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
                      >
                        Meus Treinos
                      </Link>
                    </motion.div>
                  )}
                </div>

                <div className="p-6 border-t border-white/10">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 font-bold rounded-xl transition-all duration-300 border border-red-500/30"
                    >
                      <FiLogOut size={18} />
                      Sair da Conta
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
                    >
                      <FiUser size={18} />
                      Entrar / Cadastrar
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
}