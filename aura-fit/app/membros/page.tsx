"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/navigation";

interface Treino {
  id: number;
  nome: string;
  exercicios: {
    nome: string;
    series: string;
    reps: string;
  }[];
}

const treinosPorPlano = {
  Básico: [
    {
      id: 1,
      nome: "Treino A - Peito e Tríceps",
      exercicios: [
        { nome: "Supino Reto", series: "4", reps: "12" },
        { nome: "Supino Inclinado", series: "3", reps: "12" },
        { nome: "Crucifixo", series: "3", reps: "15" },
        { nome: "Tríceps Pulley", series: "3", reps: "15" },
        { nome: "Tríceps Testa", series: "3", reps: "12" },
      ],
    },
    {
      id: 2,
      nome: "Treino B - Costas e Bíceps",
      exercicios: [
        { nome: "Puxada Frontal", series: "4", reps: "12" },
        { nome: "Remada Curvada", series: "4", reps: "12" },
        { nome: "Remada Unilateral", series: "3", reps: "12" },
        { nome: "Rosca Direta", series: "3", reps: "12" },
        { nome: "Rosca Martelo", series: "3", reps: "15" },
      ],
    },
    {
      id: 3,
      nome: "Treino C - Pernas",
      exercicios: [
        { nome: "Agachamento Livre", series: "4", reps: "15" },
        { nome: "Leg Press", series: "4", reps: "20" },
        { nome: "Cadeira Extensora", series: "3", reps: "15" },
        { nome: "Mesa Flexora", series: "3", reps: "15" },
        { nome: "Panturrilha em Pé", series: "4", reps: "20" },
      ],
    },
  ],
  Premium: [
    {
      id: 1,
      nome: "Treino A - Peito, Ombro e Tríceps",
      exercicios: [
        { nome: "Supino Reto", series: "4", reps: "10-12" },
        { nome: "Supino Inclinado com Halter", series: "4", reps: "10-12" },
        { nome: "Crossover", series: "3", reps: "12-15" },
        { nome: "Desenvolvimento com Barra", series: "4", reps: "10" },
        { nome: "Elevação Lateral", series: "3", reps: "12" },
        { nome: "Tríceps Francês", series: "3", reps: "12" },
        { nome: "Mergulho", series: "3", reps: "Max" },
      ],
    },
    {
      id: 2,
      nome: "Treino B - Costas e Bíceps",
      exercicios: [
        { nome: "Barra Fixa", series: "4", reps: "Max" },
        { nome: "Puxada Aberta", series: "4", reps: "10-12" },
        { nome: "Remada Curvada", series: "4", reps: "10" },
        { nome: "Pulldown", series: "3", reps: "12" },
        { nome: "Rosca Direta com Barra", series: "4", reps: "10" },
        { nome: "Rosca Concentrada", series: "3", reps: "12" },
        { nome: "Rosca Invertida", series: "3", reps: "15" },
      ],
    },
    {
      id: 3,
      nome: "Treino C - Pernas Completo",
      exercicios: [
        { nome: "Agachamento Livre", series: "5", reps: "12" },
        { nome: "Leg Press 45°", series: "4", reps: "15" },
        { nome: "Hack Machine", series: "4", reps: "12" },
        { nome: "Cadeira Extensora", series: "3", reps: "15" },
        { nome: "Mesa Flexora", series: "4", reps: "12" },
        { nome: "Stiff", series: "3", reps: "12" },
        { nome: "Panturrilha Sentado", series: "4", reps: "20" },
      ],
    },
    {
      id: 4,
      nome: "Treino D - HIIT",
      exercicios: [
        { nome: "Burpees", series: "4", reps: "30seg" },
        { nome: "Mountain Climbers", series: "4", reps: "40seg" },
        { nome: "Jump Squat", series: "4", reps: "20" },
        { nome: "Box Jump", series: "3", reps: "15" },
        { nome: "Sprint Esteira", series: "6", reps: "30seg" },
      ],
    },
  ],
  VIP: [
    {
      id: 1,
      nome: "Treino A - Peito e Tríceps (Força)",
      exercicios: [
        { nome: "Supino Reto", series: "5", reps: "6-8" },
        { nome: "Supino Inclinado com Barra", series: "4", reps: "8-10" },
        { nome: "Supino Declinado", series: "4", reps: "10" },
        { nome: "Crossover Alto", series: "3", reps: "12" },
        { nome: "Crossover Baixo", series: "3", reps: "12" },
        { nome: "Tríceps Pulley Corda", series: "4", reps: "12" },
        { nome: "Tríceps Francês com Halter", series: "3", reps: "10" },
        { nome: "Mergulho com Peso", series: "3", reps: "Max" },
      ],
    },
    {
      id: 2,
      nome: "Treino B - Costas e Trapézio",
      exercicios: [
        { nome: "Levantamento Terra", series: "5", reps: "6" },
        { nome: "Barra Fixa Pegada Aberta", series: "4", reps: "Max" },
        { nome: "Remada Curvada com Barra", series: "4", reps: "8" },
        { nome: "Puxada Triangulo", series: "4", reps: "10" },
        { nome: "Remada Cavalinho", series: "3", reps: "12" },
        { nome: "Pullover com Halter", series: "3", reps: "12" },
        { nome: "Encolhimento com Barra", series: "4", reps: "15" },
      ],
    },
    {
      id: 3,
      nome: "Treino C - Ombros e Bíceps",
      exercicios: [
        { nome: "Desenvolvimento Militar", series: "5", reps: "8" },
        { nome: "Desenvolvimento Arnold", series: "4", reps: "10" },
        { nome: "Elevação Frontal", series: "3", reps: "12" },
        { nome: "Elevação Lateral", series: "4", reps: "12" },
        { nome: "Crucifixo Inverso", series: "3", reps: "15" },
        { nome: "Rosca Direta 21", series: "3", reps: "21" },
        { nome: "Rosca Scott", series: "4", reps: "10" },
        { nome: "Rosca Martelo Alternada", series: "3", reps: "12" },
      ],
    },
    {
      id: 4,
      nome: "Treino D - Pernas (Quadríceps)",
      exercicios: [
        { nome: "Agachamento Livre", series: "5", reps: "10" },
        { nome: "Agachamento Frontal", series: "4", reps: "12" },
        { nome: "Leg Press 45°", series: "4", reps: "20" },
        { nome: "Hack Machine", series: "4", reps: "15" },
        { nome: "Cadeira Extensora Drop Set", series: "3", reps: "12+8+6" },
        { nome: "Afundo com Barra", series: "3", reps: "12/perna" },
      ],
    },
    {
      id: 5,
      nome: "Treino E - Pernas (Posterior)",
      exercicios: [
        { nome: "Stiff com Barra", series: "5", reps: "10" },
        { nome: "Mesa Flexora", series: "4", reps: "12" },
        { nome: "Flexora em Pé", series: "3", reps: "15" },
        { nome: "Cadeira Abdutora", series: "3", reps: "15" },
        { nome: "Glúteo na Máquina", series: "4", reps: "15" },
        { nome: "Panturrilha em Pé", series: "5", reps: "20" },
        { nome: "Panturrilha Sentado", series: "4", reps: "25" },
      ],
    },
    {
      id: 6,
      nome: "Treino F - Funcional/HIIT",
      exercicios: [
        { nome: "Clean and Press", series: "4", reps: "10" },
        { nome: "Kettlebell Swing", series: "4", reps: "20" },
        { nome: "Battle Rope", series: "4", reps: "30seg" },
        { nome: "Box Jump", series: "4", reps: "15" },
        { nome: "Sled Push", series: "4", reps: "20m" },
        { nome: "Turkish Get-Up", series: "3", reps: "5/lado" },
      ],
    },
  ],
};

export default function MembrosPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [treinoSelecionado, setTreinoSelecionado] = useState<Treino | null>(null);
  const [treinoExpandido, setTreinoExpandido] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const treinos = treinosPorPlano[user.plano] || [];

  const toggleTreino = (id: number) => {
    setTreinoExpandido(treinoExpandido === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header da área de membros */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900/30 to-black border-b border-blue-600/30 p-6 mb-8"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600 neon-title">
              Bem-vindo, {user.name}!
            </h1>
            <p className="text-gray-300 mt-1">
              Plano: <span className="text-blue-500 font-bold">{user.plano}</span>
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600/10 transition-all"
            >
              Início
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all"
            >
              Sair
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Stats */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-900/50 to-black border border-blue-600/50 rounded-2xl p-6 text-center"
          >
            <div className="text-5xl mb-2">💪</div>
            <h3 className="text-2xl font-bold text-blue-500">{treinos.length}</h3>
            <p className="text-gray-400">Treinos Disponíveis</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-900/50 to-black border border-green-600/50 rounded-2xl p-6 text-center"
          >
            <div className="text-5xl mb-2">🔥</div>
            <h3 className="text-2xl font-bold text-green-500">100%</h3>
            <p className="text-gray-400">Energia Máxima</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-600/50 rounded-2xl p-6 text-center"
          >
            <div className="text-5xl mb-2">⭐</div>
            <h3 className="text-2xl font-bold text-purple-500">Plano {user.plano}</h3>
            <p className="text-gray-400">Status Ativo</p>
          </motion.div>
        </div>
      </div>

      {/* Lista de Treinos Detalhados */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Seus Treinos - Plano {user.plano}
          </h2>
          <p className="text-gray-400">
            Clique em cada treino para ver os exercícios detalhados
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {treinos.map((treino, index) => (
            <motion.div
              key={treino.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/80 to-black border-2 border-blue-600/40 rounded-2xl overflow-hidden hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30"
            >
              {/* Header do Treino */}
              <motion.div
                onClick={() => toggleTreino(treino.id)}
                className="p-6 cursor-pointer hover:bg-blue-600/5 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {String.fromCharCode(64 + treino.id)}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {treino.nome}
                      </h3>
                      <p className="text-gray-400 flex items-center gap-2">
                        <span className="text-blue-500">💪</span>
                        {treino.exercicios.length} exercícios
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: treinoExpandido === treino.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-blue-500 text-3xl"
                  >
                    ▼
                  </motion.div>
                </div>
              </motion.div>

              {/* Exercícios Expandidos */}
              <AnimatePresence>
                {treinoExpandido === treino.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-3">
                      <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent mb-4" />
                      
                      {treino.exercicios.map((ex, exIndex) => (
                        <motion.div
                          key={exIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: exIndex * 0.05 }}
                          whileHover={{ scale: 1.02, x: 10 }}
                          className="bg-black/50 border border-blue-600/30 rounded-xl p-5 hover:border-blue-600/60 transition-all group"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm">
                                  {exIndex + 1}
                                </span>
                                <h4 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
                                  {ex.nome}
                                </h4>
                              </div>
                              <div className="flex gap-6 ml-11">
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-500 font-semibold">Séries:</span>
                                  <span className="text-white bg-blue-600/20 px-3 py-1 rounded-full text-sm font-bold">
                                    {ex.series}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-green-500 font-semibold">Reps:</span>
                                  <span className="text-white bg-green-600/20 px-3 py-1 rounded-full text-sm font-bold">
                                    {ex.reps}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                            >
                              ✓
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}

                      {/* Botão Iniciar Treino */}
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: treino.exercicios.length * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/50 flex items-center justify-center gap-2"
                      >
                        <span className="text-2xl">🔥</span>
                        Iniciar Treino {String.fromCharCode(64 + treino.id)}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Card de Benefícios do Plano */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-blue-900/30 to-black border-2 border-blue-600/50 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            Benefícios do seu Plano {user.plano}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {user.plano === "Básico" && (
              <>
                <BenefitCard icon="🏋️" text="Acesso ilimitado à musculação" />
                <BenefitCard icon="📅" text="Segunda a sexta-feira" />
                <BenefitCard icon="📊" text="Avaliação física inicial" />
                <BenefitCard icon="🔐" text="Vestiário com armários" />
              </>
            )}
            {user.plano === "Premium" && (
              <>
                <BenefitCard icon="🏋️" text="Tudo do plano Básico" />
                <BenefitCard icon="👨‍🏫" text="Personal trainer 2x/semana" />
                <BenefitCard icon="📱" text="App de treino personalizado" />
                <BenefitCard icon="🎯" text="Aulas coletivas ilimitadas" />
                <BenefitCard icon="📅" text="Acesso fins de semana" />
                <BenefitCard icon="⚡" text="Treinos HIIT exclusivos" />
              </>
            )}
            {user.plano === "VIP" && (
              <>
                <BenefitCard icon="👑" text="Tudo do plano Premium" />
                <BenefitCard icon="🌟" text="Personal trainer ilimitado" />
                <BenefitCard icon="🎪" text="Área VIP exclusiva" />
                <BenefitCard icon="🥗" text="Acompanhamento nutricional" />
                <BenefitCard icon="📊" text="Avaliação mensal completa" />
                <BenefitCard icon="🧴" text="Kit amenities premium" />
                <BenefitCard icon="🚗" text="Estacionamento gratuito" />
                <BenefitCard icon="💼" text="Toalhas e vestiário VIP" />
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal removido - agora tudo é inline */}
    </div>
  );
}

// Componente auxiliar para os cards de benefícios
function BenefitCard({ icon, text }: { icon: string; text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, x: 5 }}
      className="flex items-center gap-3 bg-black/30 border border-blue-600/30 rounded-xl p-4 hover:border-blue-600/60 transition-all"
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-white">{text}</span>
    </motion.div>
  );
}