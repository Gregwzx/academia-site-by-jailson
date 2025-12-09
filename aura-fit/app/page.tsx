"use client";

import { motion, useScroll, useSpring, Variants } from "framer-motion";
import { useEffect } from "react";

// Seus componentes (verifique se os caminhos estão corretos)
import Planos from "./components/Planos";
import Modalidades from "./components/Modalidades";
import DepoimentosFloatings from "./components/DepoimentosFloating";
import PhotoCarousel from "./components/Galeria";
import HeroSection from "./components/HeroSection";

// --- Componente da Barra de Progresso ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50 neon-shadow"
      style={{ scaleX }}
    />
  );
};

export default function Home() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="home-root relative">
      {/* 1. ADICIONADO: A barra de progresso aqui no topo */}
      <ScrollProgress />

      {/* HERO */}
      <HeroSection />

      {/* ESCOLHAS SAUDÁVEIS */}
      <motion.section
        id="destaques"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <motion.div 
            className="space-y-6"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 neon-title leading-tight">
              ESCOLHAS <br /> MAIS SAUDÁVEIS
            </h2>
            <p className="text-white text-lg max-w-xl">
              Na Aura Fit, cada treino é planejado para farma aura. Nosso foco é
              garantir sua aura e ego — com programas personalizados, equipamentos
              modernos e acompanhamento de profissionais qualificados.
            </p>
          </motion.div>
          <motion.div 
            className="flex justify-center md:justify-end"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <img
              src="/woman.png"
              alt="Instrutora Aura Fit"
              className="w-full max-w-md md:max-w-lg h-auto object-contain rounded-xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* MODALIDADES */}
      <Modalidades />   

      {/* GALERIA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Galeria</h2>
        <PhotoCarousel />
      </motion.section>

      {/* DEPOIMENTOS */}
      <DepoimentosFloatings />

      {/* PLANOS */}
      <Planos />

      {/* BANNER "VEM FAZER PARTE DA AURA" */}
      <motion.section
        id="contato"
        className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <video
          src="/footer.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center text-white max-w-4xl p-6 space-y-6"
        >
          {/* Título Principal */}
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold neon-title"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(26,115,255,0.8)",
                "0 0 40px rgba(26,115,255,0.6)",
                "0 0 20px rgba(26,115,255,0.8)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VEM FAZER PARTE DA <span className="text-blue-500">AURA</span>
          </motion.h2>

          {/* Subtítulo */}
          <motion.p 
            className="text-lg md:text-xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Farme aura conosco e se torne{" "}
            <span className="text-blue-500 neon-title font-bold">lendário</span>!
          </motion.p>

          <motion.p 
            className="text-white text-base md:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
          </motion.p>

          {/* Botões de Contato */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5581998965933"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-2xl hover:shadow-blue-600/70 text-base border-2 border-blue-400"
            >
               Falar no WhatsApp
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/l1.ferreira/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-3 border-blue-600 bg-black/50 backdrop-blur-sm text-blue-400 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-2xl text-base"
            >
               Seguir no Instagram
            </motion.a>
          </motion.div>

        </motion.div>
      </motion.section>
    </div>
  );
}