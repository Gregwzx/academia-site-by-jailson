"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface Plano {
  _id: number;
  nome: string;
  preco: number;
  descricao: string;
  beneficios: string[];
}

export default function Planos() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [planoSelecionado, setPlanoSelecionado] = useState<Plano | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    axios
      .get(`${apiUrl}/planos`)
      .then((res) => setPlanos(res.data))
      .catch(() =>
        setPlanos([
          {
            _id: 1,
            nome: "Básico",
            preco: 79,
            descricao: "Acesso à academia",
            beneficios: [
              "Acesso ilimitado à área de musculação",
              "Vestiário com armários",
              "Avaliação física inicial",
              "Horário livre de segunda a sexta"
            ],
          },
          {
            _id: 2,
            nome: "Premium",
            preco: 129,
            descricao: "Acesso + aulas",
            beneficios: [
              "Tudo do plano Básico",
              "Acesso a todas as aulas coletivas",
              "Personal trainer 2x por semana",
              "Acesso aos finais de semana",
              "App de treino personalizado"
            ],
          },
          {
            _id: 3,
            nome: "VIP",
            preco: 199,
            descricao: "Tudo incluso",
            beneficios: [
              "Tudo do plano Premium",
              "Personal trainer ilimitado",
              "Acesso à área VIP exclusiva",
              "Acompanhamento nutricional",
              "Avaliação física mensal",
              "Toalha e kit amenities",
              "Estacionamento gratuito"
            ],
          },
        ])
      );
  }, []);

  const abrirModal = (plano: Plano) => {
    setPlanoSelecionado(plano);
  };

  const fecharModal = () => {
    setPlanoSelecionado(null);
  };

  return (
    <>
      <div id="planos" className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Planos</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {planos.map((p) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <h3 className="font-bold text-xl text-white">
                {p.nome} — R$ {p.preco}
              </h3>
              <p className="mt-2 text-white">{p.descricao}</p>

              <ul className="mt-3 list-disc ml-5">
                {(p.beneficios || []).slice(0, 3).map((b, i) => (
                  <li key={i} className="text-white text-sm">
                    {b}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => abrirModal(p)}
                className="header-btn mt-4 w-full"
              >
                Quero esse
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {planoSelecionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={fecharModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-blue-600 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-extrabold text-blue-600 neon-title">
                    Plano {planoSelecionado.nome}
                  </h3>
                  <p className="text-4xl font-bold text-white mt-2">
                    R$ {planoSelecionado.preco}<span className="text-lg text-gray-400">/mês</span>
                  </p>
                </div>
                <button
                  onClick={fecharModal}
                  className="text-white hover:text-blue-600 transition-colors text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-300 text-lg mb-6">
                {planoSelecionado.descricao}
              </p>

              <div className="space-y-4 mb-8">
                <h4 className="text-xl font-bold text-blue-500">
                  O que está incluído:
                </h4>
                <ul className="space-y-3">
                  {planoSelecionado.beneficios.map((beneficio, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 text-white"
                    >
                      <span className="text-blue-600 text-xl">✓</span>
                      <span>{beneficio}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contato"
                  onClick={fecharModal}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-blue-600/50"
                >
                  Matricule-se Agora
                </a>
                <button
                  onClick={fecharModal}
                  className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600/10 font-bold py-4 px-6 rounded-full transition-all duration-300"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}