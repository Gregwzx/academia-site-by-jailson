"use client";

import { motion, useScroll, useSpring, Variants } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

import Planos from "./components/Planos";
import Modalidades from "./components/Modalidades";
import DepoimentosFloatings from "./components/DepoimentosFloating";
import PhotoCarousel from "./components/Galeria";
import HeroSection from "./components/HeroSection";

const benefits = [
  {
    title: "Equipamentos Premium",
    description: "Tecnologia biomecânica de ponta para maximizar seus resultados com segurança.",
  },
  {
    title: "Ambiente Climatizado",
    description: "Treine com conforto máximo em qualquer estação do ano em toda a academia.",
  },
  {
    title: "Profissionais Expert",
    description: "Instrutores certificados e prontos para montar seu treino personalizado.",
  },
  {
    title: "Nutrição Integrada",
    description: "Parceria com nutricionistas para alinhar sua dieta aos seus objetivos de treino.",
  },
];

// --- COMPONENTES AUXILIARES ---

// 1. Componente StatCard 
const StatCard = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
    whileHover={{ 
      scale: 1.05, 
      backgroundColor: "rgba(17, 24, 39, 0.9)",
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
      borderColor: "rgba(59, 130, 246, 0.6)"
    }}
    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900/80 to-black backdrop-blur-md rounded-2xl border border-gray-800 transition-all duration-500 group cursor-default"
  >
    <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2 drop-shadow-lg">
      {value}
    </h3>
    <p className="text-gray-400 text-sm sm:text-base font-medium uppercase tracking-wider text-center group-hover:text-white transition-colors">
      {label}
    </p>
  </motion.div>
);

// 2. Componente BenefitCard (Com efeito de brilho e entrada suave)
const BenefitCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ y: -5, borderColor: "rgba(37, 99, 235, 0.5)" }}
    className="p-6 bg-gray-900/40 rounded-xl border border-gray-800 transition-all duration-300 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-blue-900/20 group"
  >
    <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
      <CheckCircle className="w-6 h-6 text-blue-500 group-hover:text-blue-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

// --- Barra de Progresso ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // container dos benefícios
  const containerStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 
      }
    }
  };

  return (
    <div className="home-root relative">
      {/* Barra de progresso */}
      <ScrollProgress />

      {/* HERO */}
      <HeroSection />

      {/* ESTATÍSTICAS */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black via-gray-900/20 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12">
            <StatCard value="500+" label="Semi-deuses" delay={0.01} />
            <StatCard value="3+" label="Modalidades" delay={0.02} />
            <StatCard value="99%" label="Satisfação" delay={0.03} />
            <StatCard value="24/7" label="Acesso VIP" delay={0.04} />
          </div>
        </div>
      </section>

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
              garantir sua aura e ego — com programas personalizados,
              equipamentos modernos e acompanhamento de profissionais
              qualificados.
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

      {/* BENEFÍCIOS (Com Animação em Cascata) */}
      <section className="section-padding bg-gradient-to-b from-gray-900/30 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Por que escolher a{" "}
              <motion.span 
                className="text-blue-600 neon-title inline-block"
                animate={{ textShadow: ["0 0 10px #2563eb", "0 0 20px #2563eb", "0 0 10px #2563eb"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Aura Fit
              </motion.span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transforme seu corpo e mente com a melhor estrutura e
              acompanhamento profissional
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* MODALIDADES */}
      <Modalidades />

      {/* GALERIA */}
      <section className="section-padding bg-gradient-to-b from-black to-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 neon-title mb-2">
              Nossa Academia
            </h2>
            <p className="text-gray-400">
              Conheça nossa estrutura e ambiente
            </p>
          </motion.div>
          <PhotoCarousel />
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <DepoimentosFloatings />

      {/* PLANOS */}
      <Planos />

      {/* CTA FINAL */}
      <section id="contato" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <video
          src="/footer.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6 py-16"
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold neon-title mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(26,115,255,0.8)",
                "0 0 40px rgba(26,115,255,0.6)",
                "0 0 20px rgba(26,115,255,0.8)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VEM FAZER PARTE DA <span className="text-blue-500">AURA</span>
          </motion.h2>

          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Farme aura conosco e se torne{" "}
            <span className="text-blue-500 font-bold neon-title">lendário</span>!
          </motion.p>

          <motion.p
            className="text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Entre em contato agora e comece sua jornada de transformação
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5581998965933"
              target="_blank"
              rel="noopener noreferrer"
              className="header-btn ripple flex items-center gap-2 text-lg shadow-xl hover:shadow-blue-600/70"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/l1.ferreira/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full border-2 border-blue-600 bg-black/50 backdrop-blur-sm text-blue-400 hover:bg-blue-600 hover:text-white font-bold transition-all duration-300 shadow-xl ripple flex items-center gap-2 text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Seguir no Instagram
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}