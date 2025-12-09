'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EscolhasSaudaveis() {
  return (
    <section id="saudaveis" className="max-w-6xl mx-auto px-6 py-20 grid gap-8 md:grid-cols-2 items-center">
      {/* Texto à esquerda */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 neon-title leading-tight">
          ESCOLHAS<br /> MAIS SAUDÁVEIS
        </h2>

        <p className="text-white text-lg max-w-xl">
          Na Aura Fit, cada treino é planejado para te deixar em outro nível. Nosso
          foco é garantir sua energia e bem-estar — com programas personalizados,
          equipamentos modernos e acompanhamento de profissionais qualificados.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <a href="#planos" className="header-btn">Ver Planos</a>
          <a
            href="#contato"
            className="px-5 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600/10 transition"
          >
            Fale com um Coach
          </a>
        </div>
      </motion.div>

      {/* Imagem à direita */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center md:justify-end"
      >
        <Image
          src="/woman.png"
          alt="Instrutora Aura Fit"
          width={600}
          height={600}
          className="w-full max-w-md md:max-w-lg h-auto object-contain rounded-xl"
        />
      </motion.div>
    </section>
  );
}
