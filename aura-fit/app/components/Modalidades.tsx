"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface Modalidade {
  _id: number;
  nome: string;
  descricao: string;
}

const icones = ["🏋️", "🤸", "🧘", "🥊", "🏃", "💪"];

// texto genérico só pra preencher
const textosExtras: Record<string, string[]> = {
  Musculação: [
    "Treinos focados em força e hipertrofia.",
    "Equipamentos modernos e ambiente completo.",
    "Acompanhamento para iniciantes disponível."
  ],
  CrossFit: [
    "Alta intensidade combinada com movimentos funcionais.",
    "Treinos desafiadores que mudam todos os dias.",
    "Ambiente competitivo e motivador."
  ],
  Pilates: [
    "Alongamento, respiração e fortalecimento do core.",
    "Ótimo para postura e mobilidade.",
    "Aulas realizadas com aparelhos e solo."
  ]
};

export default function Modalidades() {
  const [mods, setMods] = useState<Modalidade[]>([]);
  const [modSelecionada, setModSelecionada] = useState<Modalidade | null>(null);

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
    <>
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
          {mods.map((m, index) => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 50, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              onClick={() => setModSelecionada(m)}
              className="cursor-pointer bg-black/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 backdrop-blur-sm border border-blue-700/40 relative overflow-hidden group"
              style={{ perspective: "1000px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                className="absolute top-4 right-4 text-4xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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

      {/* Modal de detalhes da modalidade */}
      <AnimatePresence>
        {modSelecionada && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setModSelecionada(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-blue-600 rounded-3xl p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-extrabold text-blue-600">
                  {modSelecionada.nome}
                </h3>

                <button
                  onClick={() => setModSelecionada(null)}
                  className="text-white hover:text-blue-600 transition-colors text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-300 text-lg mb-6">
                {modSelecionada.descricao}
              </p>

              <h4 className="text-xl font-bold text-blue-500 mb-4">Mais detalhes:</h4>

              <ul className="space-y-3">
                {(textosExtras[modSelecionada.nome] || [
                  "Horários flexíveis para todos os alunos.",
                  "Instrutores especializados.",
                  "Aulas projetadas para todos os níveis."
                ]).map((txt, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-white"
                  >
                    <span className="text-blue-600 text-xl">•</span>
                    <span>{txt}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setModSelecionada(null)}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600/10 font-bold py-3 px-6 rounded-full transition-all duration-300"
                >
                  Fechar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
