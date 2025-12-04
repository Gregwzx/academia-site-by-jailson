"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface Modalidade {
  _id: number;
  nome: string;
  descricao: string;
}

const icones = ["🏋️", "🤸", "🧘", "🥊", "🏃", "💪"];

export default function Modalidades() {
  const [mods, setMods] = useState<Modalidade[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    axios
      .get<Modalidade[]>(`${apiUrl}/modalidades`)
      .then((res) => setMods(res.data))
      .catch(() =>
        setMods([
          { _id: 1, nome: "Musculação", descricao: "Treino com pesos" },
          { _id: 2, nome: "CrossFit", descricao: "Alta intensidade" },
          { _id: 3, nome: "Pilates", descricao: "Flexibilidade e core" },
        ])
      );
  }, []);

  return (
    <div id="modalidades" className="max-w-6xl mx-auto p-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-blue-600"
      >
        Modalidades
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {mods.map((m: Modalidade, index) => (
          <motion.div
            key={m._id}
            initial={{ opacity: 0, y: 50, rotateY: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              type: "spring" 
            }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            className="bg-black/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 backdrop-blur-sm border border-blue-700/40 relative overflow-hidden group"
            style={{ perspective: "1000px" }}
          >
            {/* Efeito de brilho ao hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Partículas flutuantes */}
            <motion.div
              className="absolute top-4 right-4 text-4xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {icones[index % icones.length]}
            </motion.div>

            <div className="relative z-10">
              <motion.h3 
                className="font-bold text-blue-600 text-xl mb-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {m.nome}
              </motion.h3>
              <p className="mt-2 text-white">{m.descricao}</p>

              <motion.div
                className="mt-4 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}