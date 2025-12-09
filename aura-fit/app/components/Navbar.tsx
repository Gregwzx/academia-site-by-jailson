"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "../components/AuthContext"; // Verifique se o caminho está correto
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Hook para saber em qual página estamos

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // Se estivermos na Home ("/"), prevenimos o redirecionamento e fazemos scroll suave
    if (pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // Se NÃO estivermos na Home (ex: "/membros"), o Link padrão do Next.js funcionará
    // e levará o user para a secao"
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo leva sempre para o topo da Home */}
        <Link href="/" className="text-2xl font-bold text-white">
          Aura <span className="text-blue-600 neon">Fit</span>
        </Link>

        {/* Links de Navegação */}
        <div className="hidden md:flex gap-8 text-white text-sm uppercase font-semibold">
          <Link 
            href="/" 
            onClick={(e) => handleNavigation(e, '#inicio')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Início
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link 
            href="/#destaques" 
            onClick={(e) => handleNavigation(e, '#destaques')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Sobre
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link 
            href="/#modalidades" 
            onClick={(e) => handleNavigation(e, '#modalidades')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Treinos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link 
            href="/#planos" 
            onClick={(e) => handleNavigation(e, '#planos')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Planos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link 
            href="/#contato" 
            onClick={(e) => handleNavigation(e, '#contato')}
            className="hover:text-blue-600 transition-all duration-300 cursor-pointer relative group"
          >
            Contato
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Área do Usuário */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden md:flex items-center gap-3"
              >
                <div className="text-right">
                  <p className="text-white text-sm font-bold">{user.name}</p>
                  <p className="text-blue-500 text-xs">{user.plano}</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name[0].toUpperCase()}
                </div>
              </motion.div>
              
              {/* Botão Meus Treinos (só aparece se não estiver na página de membros) */}
              {pathname !== "/membros" && (
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => router.push("/membros")}
                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all hidden md:block"
                 >
                   Meus Treinos
                 </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full font-semibold transition-all"
              >
                Sair
              </motion.button>
            </>
          ) : (
            // Opcional: Adicionar botão de Login se não estiver logado
            <Link href="/login" className="px-4 py-2 text-white hover:text-blue-400 font-semibold transition-all">
                Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}