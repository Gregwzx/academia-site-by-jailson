"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import LoginModal from "./LoginModal";

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
  const [showLogin, setShowLogin] = useState(false);
  const [selectedPlanoForLogin, setSelectedPlanoForLogin] = useState<string>("");

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

  const handleMatricular = (planoNome: string) => {
    setSelectedPlanoForLogin(planoNome);
    setShowLogin(true);
    fecharModal();
  };

  return (
    <>
      <div id="planos" className="max-w-6xl mx-auto p-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-blue-600"
        >
          Planos
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {planos.map((p, index) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-br from-gray-800/80 to-black/90 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 backdrop-blur-sm border border-blue-700/40 relative overflow-hidden group"
            >
              {/* Efeito de brilho ao hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                <h3 className="font-bold text-xl text-white mb-2">
                  {p.nome} — <span className="text-blue-500">R$ {p.preco}</span>
                </h3>
                <p className="mt-2 text-gray-300">{p.descricao}</p>

                <ul className="mt-3 space-y-2">
                  {(p.beneficios || []).slice(0, 3).map((b, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-white text-sm flex items-start gap-2"
                    >
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => abrirModal(p)}
                  className="header-btn mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-blue-600/50 transition-all duration-300"
                >
                  Quero esse
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de detalhes do plano */}
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMatricular(planoSelecionado.nome)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-blue-600/50"
                >
                  Matricule-se Agora
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fecharModal}
                  className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600/10 font-bold py-4 px-6 rounded-full transition-all duration-300"
                >
                  Fechar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Login */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        selectedPlano={selectedPlanoForLogin}
      />
    </>
  );
}