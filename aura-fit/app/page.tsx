"use client";

import { motion, Variants } from "framer-motion";
import { useEffect } from "react";
import Planos from "./components/Planos";
import Modalidades from "./components/Modalidades";
import DepoimentosFloatings from "./components/DepoimentosFloating";
import PhotoCarousel from "./components/Galeria";
import HeroSection from "./components/HeroSection";

export default function Home() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  
  return (
    <div className="home-root">
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

      {/* BANNER "VEM FAZER PARTE DA AURA" COM BOTÕES DE CONTATO */}
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
        
        {/* Overlay escuro para melhor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center text-white max-w-4xl p-6 space-y-8"
        >
          {/* Título Principal */}
          <motion.h2 
            className="text-5xl md:text-7xl font-extrabold neon-title"
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
            className="text-xl md:text-3xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Farme aura conosco e se torne{" "}
            <span className="text-blue-500 neon-title font-bold">lendário</span>!
          </motion.p>

          {/* Texto de Contato */}
          <motion.p 
            className="text-white text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
          </motion.p>

          {/* Botões de Contato */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-blue-600/70 text-lg border-2 border-blue-400"
            >
               Falar no WhatsApp
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/l1.ferreira/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-3 border-blue-600 bg-black/50 backdrop-blur-sm text-blue-400 hover:bg-blue-600 hover:text-white font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-2xl text-lg"
            >
               Seguir no Instagram
            </motion.a>
          </motion.div>

          {/* Badge de Chamada para Ação */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md border border-blue-500/50 rounded-full px-6 py-3 mt-6"
          >
            <span className="text-2xl">⚡</span>
            <span className="text-blue-300 font-semibold">
              Matrículas Abertas
            </span>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}