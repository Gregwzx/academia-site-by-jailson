"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LoginModal from "./LoginModal";

export default function HeroSection() {
  const [showLogin, setShowLogin] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.section
        id="inicio"
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <video
          src="/hero.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="z-10 max-w-3xl mx-auto p-6 text-center"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-blue-600 neon-title">
            AURA FIT
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl">AURA + EGO</p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform shadow-lg hover:shadow-blue-600/50"
            >
              Matricule-se
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#modalidades')}
              className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform"
            >
              Ver Modalidades
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}