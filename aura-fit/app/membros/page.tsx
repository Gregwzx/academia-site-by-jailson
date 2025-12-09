"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/navigation";

// --- Interfaces ---
interface Exercicio {
  nome: string;
  series: string;
  reps: string;
  concluido?: boolean;
}

interface Treino {
  id: number;
  nome: string;
  exercicios: Exercicio[];
}

// --- BANCO DE DADOS DE TREINOS (EXPANDIDO) ---
const treinosIniciais = {
  // --- PLANO BÁSICO (3 TREINOS) ---
  Básico: [
    {
      id: 1,
      nome: "Treino A - Adaptação Full Body",
      exercicios: [
        { nome: "Supino Máquina", series: "3", reps: "15" },
        { nome: "Puxada Frente", series: "3", reps: "15" },
        { nome: "Leg Press 45", series: "3", reps: "15" },
        { nome: "Desenvolvimento Máquina", series: "3", reps: "15" },
        { nome: "Abdominal Supra", series: "3", reps: "20" },
      ],
    },
    {
      id: 2,
      nome: "Treino B - Membros Inferiores & Cardio",
      exercicios: [
        { nome: "Agachamento Livre (Peso Leve)", series: "3", reps: "15" },
        { nome: "Cadeira Extensora", series: "3", reps: "15" },
        { nome: "Mesa Flexora", series: "3", reps: "15" },
        { nome: "Panturrilha Sentado", series: "3", reps: "20" },
        { nome: "Esteira", series: "1", reps: "20 min" },
      ],
    },
    {
      id: 3,
      nome: "Treino C - Core & Mobilidade",
      exercicios: [
        { nome: "Prancha Isométrica", series: "3", reps: "45 seg" },
        { nome: "Perdigueiro", series: "3", reps: "15/lado" },
        { nome: "Elevação Pélvica", series: "3", reps: "15" },
        { nome: "Alongamento Geral", series: "1", reps: "10 min" },
        { nome: "Bicicleta Ergométrica", series: "1", reps: "15 min" },
      ],
    },
  ],

  // --- PLANO PREMIUM (5 TREINOS) ---
  Premium: [
    {
      id: 1,
      nome: "Treino A - Peito e Tríceps",
      exercicios: [
        { nome: "Supino Reto Barra", series: "4", reps: "10" },
        { nome: "Supino Inclinado Halter", series: "3", reps: "12" },
        { nome: "Crossover", series: "3", reps: "15" },
        { nome: "Tríceps Corda", series: "4", reps: "12" },
        { nome: "Tríceps Testa", series: "3", reps: "12" },
      ],
    },
    {
      id: 2,
      nome: "Treino B - Costas e Bíceps",
      exercicios: [
        { nome: "Puxada Alta", series: "4", reps: "10" },
        { nome: "Remada Baixa Triângulo", series: "4", reps: "12" },
        { nome: "Serrote Unilateral", series: "3", reps: "12" },
        { nome: "Rosca Direta Barra W", series: "3", reps: "12" },
        { nome: "Rosca Martelo", series: "3", reps: "15" },
      ],
    },
    {
      id: 3,
      nome: "Treino C - Pernas Completo",
      exercicios: [
        { nome: "Agachamento Livre", series: "4", reps: "10" },
        { nome: "Leg Press 45", series: "4", reps: "12" },
        { nome: "Cadeira Extensora", series: "3", reps: "15" },
        { nome: "Mesa Flexora", series: "4", reps: "12" },
        { nome: "Panturrilha em Pé", series: "4", reps: "20" },
      ],
    },
    {
      id: 4,
      nome: "Treino D - Ombros e Trapézio",
      exercicios: [
        { nome: "Desenvolvimento Halter", series: "4", reps: "10" },
        { nome: "Elevação Lateral", series: "4", reps: "12-15" },
        { nome: "Elevação Frontal", series: "3", reps: "12" },
        { nome: "Encolhimento com Barra", series: "4", reps: "15" },
        { nome: "Face Pull", series: "3", reps: "15" },
      ],
    },
    {
      id: 5,
      nome: "Treino E - Funcional HIIT",
      exercicios: [
        { nome: "Burpees", series: "3", reps: "15" },
        { nome: "Kettlebell Swing", series: "4", reps: "20" },
        { nome: "Box Jump", series: "3", reps: "15" },
        { nome: "Abdominal Remador", series: "4", reps: "20" },
        { nome: "Corrida Tiro (Sprint)", series: "5", reps: "1 min" },
      ],
    },
  ],

  // --- PLANO VIP (7 TREINOS - ALTA PERFORMANCE) ---
  VIP: [
    {
      id: 1,
      nome: "Treino A - Chest Pro (Peitoral)",
      exercicios: [
        { nome: "Supino Inclinado Halter", series: "4", reps: "8-10" },
        { nome: "Supino Reto Barra", series: "4", reps: "8" },
        { nome: "Crucifixo Máquina", series: "3", reps: "12" },
        { nome: "Crossover Polia Alta", series: "4", reps: "15" },
        { nome: "Flexão de Braço (Falha)", series: "3", reps: "Max" },
      ],
    },
    {
      id: 2,
      nome: "Treino B - Back Width (Dorsal)",
      exercicios: [
        { nome: "Barra Fixa (com peso)", series: "4", reps: "8-10" },
        { nome: "Puxada Alta Aberta", series: "4", reps: "12" },
        { nome: "Remada Curvada Pronada", series: "4", reps: "10" },
        { nome: "Remada Cavalinho", series: "3", reps: "12" },
        { nome: "Pulldown com Corda", series: "3", reps: "15" },
      ],
    },
    {
      id: 3,
      nome: "Treino C - Quads Focus (Quadríceps)",
      exercicios: [
        { nome: "Agachamento Livre Profundo", series: "5", reps: "6-8" },
        { nome: "Hack Machine", series: "4", reps: "10" },
        { nome: "Leg Press (Pés baixos)", series: "4", reps: "12" },
        { nome: "Cadeira Extensora (Drop-set)", series: "3", reps: "12+12" },
        { nome: "Afundo no Smith", series: "3", reps: "10/perna" },
      ],
    },
    {
      id: 4,
      nome: "Treino D - Shoulder Armor (Ombros)",
      exercicios: [
        { nome: "Desenvolvimento Militar", series: "4", reps: "8" },
        { nome: "Elevação Lateral Halter", series: "4", reps: "12" },
        { nome: "Elevação Lateral Polia", series: "3", reps: "15" },
        { nome: "Crucifixo Inverso (Posterior)", series: "4", reps: "15" },
        { nome: "Remada Alta", series: "3", reps: "12" },
      ],
    },
    {
      id: 5,
      nome: "Treino E - Arms Blast (Braços)",
      exercicios: [
        { nome: "Rosca Direta Barra Reta", series: "4", reps: "10" },
        { nome: "Tríceps Testa Barra W", series: "4", reps: "10" },
        { nome: "Rosca Scott Unilateral", series: "3", reps: "12" },
        { nome: "Tríceps Francês Polia", series: "3", reps: "12" },
        { nome: "Rosca Martelo Alternada", series: "3", reps: "12" },
        { nome: "Tríceps Coice", series: "3", reps: "15" },
      ],
    },
    {
      id: 6,
      nome: "Treino F - Hamstrings & Glutes",
      exercicios: [
        { nome: "Levantamento Terra Romeno (Stiff)", series: "4", reps: "10" },
        { nome: "Mesa Flexora", series: "4", reps: "12" },
        { nome: "Elevação Pélvica (Hip Thrust)", series: "4", reps: "10" },
        { nome: "Cadeira Flexora", series: "3", reps: "15" },
        { nome: "Cadeira Abdutora", series: "3", reps: "20" },
      ],
    },
    {
      id: 7,
      nome: "Treino G - Cardio & Abs Elite",
      exercicios: [
        { nome: "Abdominal Infra na Barra", series: "4", reps: "15" },
        { nome: "Abdominal Supra com Carga", series: "4", reps: "20" },
        { nome: "Russian Twist", series: "3", reps: "30 seg" },
        { nome: "Stomach Vacuum", series: "4", reps: "Max Tempo" },
        { nome: "HIIT Esteira (30s on / 30s off)", series: "10", reps: "Tiros" },
      ],
    },
  ],
};

// --- Mapeamento de Benefícios por Plano ---
const beneficiosPorPlano = {
  Básico: [
    { icon: "🏋️", text: "Acesso à Musculação" },
    { icon: "🚿", text: "Vestiários Compartilhados" },
    { icon: "📅", text: "Acesso Seg-Sex" },
  ],
  Premium: [
    { icon: "🏋️", text: "Acesso Total Musculação" },
    { icon: "🏃", text: "Aulas Coletivas" },
    { icon: "📱", text: "App de Treino Básico" },
    { icon: "📅", text: "Acesso Todos os Dias" },
    { icon: "👕", text: "1 Camiseta Aura" },
  ],
  VIP: [
    { icon: "👑", text: "Acesso Ilimitado 24h" },
    { icon: "👨‍🏫", text: "Personal Trainer Dedicado" },
    { icon: "🥗", text: "Consultoria Nutricional Mensal" },
    { icon: "💆", text: "Massagem Pós-Treino" },
    { icon: "🧖", text: "Acesso à Sauna & Spa" },
    { icon: "🅿️", text: "Vaga de Estacionamento VIP" },
    { icon: "🎒", text: "Kit Aura Elite (Mochila + Garrafa)" },
    { icon: "🥤", text: "Shake Proteico Pós-Treino Grátis" },
    { icon: "🎟️", text: "5 Convites de Amigo/Mês" },
    { icon: "🔒", text: "Armário Privativo" },
    { icon: "📱", text: "App com IA de Treino" },
    { icon: "⚡", text: "Prioridade nos Equipamentos" },
  ],
};

export default function MembrosPage() {
  const { user, logout } = useAuth(); 
  const router = useRouter();
  
  // Estados
  const [meusTreinos, setMeusTreinos] = useState<Treino[]>([]);
  const [treinoExpandido, setTreinoExpandido] = useState<number | null>(null);
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<{[key: string]: boolean}>({});
  const [treinoEmAndamento, setTreinoEmAndamento] = useState<number | null>(null);
  const [treinoEditando, setTreinoEditando] = useState<Treino | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    const planoKey = user.plano as keyof typeof treinosIniciais;
    const treinosDoPlano = treinosIniciais[planoKey] || treinosIniciais["Básico"];
    setMeusTreinos(treinosDoPlano);
  }, [user, router]);

  if (!user) return null;

  const beneficiosAtuais = beneficiosPorPlano[user.plano as keyof typeof beneficiosPorPlano] || beneficiosPorPlano["Básico"];

  // --- Lógica de Interação ---

  const toggleTreino = (id: number) => {
    setTreinoExpandido(treinoExpandido === id ? null : id);
  };

  const toggleExercicio = (treinoId: number, exercicioIndex: number) => {
    const key = `${treinoId}-${exercicioIndex}`;
    setExerciciosConcluidos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const iniciarTreino = (treinoId: number) => {
    setTreinoEmAndamento(treinoId);
    setTreinoExpandido(treinoId);
    const newConcluidos = { ...exerciciosConcluidos };
    Object.keys(newConcluidos).forEach(key => {
      if (key.startsWith(`${treinoId}-`)) delete newConcluidos[key];
    });
    setExerciciosConcluidos(newConcluidos);
    
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKzn77BdGAg+ltryxnMnBSl+zPDZkD4HHWm98eKeTA0OUanl8bVlGgg7k9jzx3QtBS2Bz/L");
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const finalizarTreino = (treinoId: number) => {
    setTreinoEmAndamento(null);
    alert("🎉 Treino Finalizado! Ótimo trabalho hoje.");
  };

  const abrirEditor = (treino: Treino) => setTreinoEditando(JSON.parse(JSON.stringify(treino)));

  const salvarEdicao = () => {
    if (!treinoEditando) return;
    setMeusTreinos(prev => prev.map(t => t.id === treinoEditando.id ? treinoEditando : t));
    setTreinoEditando(null);
  };

  const alterarExercicioNoEditor = (index: number, campo: keyof Exercicio, valor: string) => {
    if (!treinoEditando) return;
    const novosExercicios = [...treinoEditando.exercicios];
    novosExercicios[index] = { ...novosExercicios[index], [campo]: valor };
    setTreinoEditando({ ...treinoEditando, exercicios: novosExercicios });
  };

  const calcularProgresso = (treinoId: number, total: number) => {
    const feitos = Object.keys(exerciciosConcluidos).filter(k => k.startsWith(`${treinoId}-`) && exerciciosConcluidos[k]).length;
    return total > 0 ? (feitos / total) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-24 relative overflow-x-hidden selection:bg-blue-500/30">
      
      <div className="relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 neon-title animate-pulse-slow">{user.name}</span>
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Foco no plano <span className="text-blue-500 font-bold uppercase tracking-wider">{user.plano}</span>
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <StatsCard 
              icon="💪" 
              value={meusTreinos.length} 
              label="Treinos Disponíveis" 
              color="blue" 
              delay={0.1}
            />
            <StatsCard 
              icon="🔥" 
              value={treinoEmAndamento ? "ON" : "OFF"} 
              label="Status do Treino" 
              color={treinoEmAndamento ? "green" : "gray"} 
              delay={0.2}
            />
            <StatsCard 
              icon="⭐" 
              value={user.plano} 
              label="Plano Atual" 
              color="purple" 
              delay={0.3}
            />
          </div>
        </div>

        {/* Lista de Treinos */}
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
            Seus Treinos
          </h2>
          
          <div className="space-y-6">
            {meusTreinos.length > 0 ? meusTreinos.map((treino, index) => {
              const isAtivo = treinoEmAndamento === treino.id;
              const progresso = calcularProgresso(treino.id, treino.exercicios.length);

              return (
                <motion.div
                  key={treino.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`rounded-3xl border overflow-hidden transition-all duration-300 ${
                    isAtivo 
                      ? "bg-gradient-to-r from-green-900/10 to-black border-green-500/50 shadow-[0_0_30px_rgba(22,163,74,0.15)]" 
                      : "bg-zinc-900/40 backdrop-blur-sm border-white/5 hover:border-blue-500/30"
                  }`}
                >
                  <div 
                    onClick={() => toggleTreino(treino.id)}
                    className="p-6 md:p-8 cursor-pointer flex items-center justify-between group relative"
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-500 ${
                        isAtivo 
                          ? "bg-green-600 text-white shadow-green-500/20" 
                          : "bg-gray-800 text-gray-400 group-hover:bg-blue-600 group-hover:text-white"
                      }`}>
                        {String.fromCharCode(64 + treino.id)}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold transition-colors ${isAtivo ? "text-green-400" : "text-white group-hover:text-blue-400"}`}>
                          {treino.nome}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                          <span>{treino.exercicios.length} exercícios</span>
                          {isAtivo && <span className="text-green-500 text-[10px] uppercase font-bold animate-pulse">• Em Andamento</span>}
                        </p>
                      </div>
                    </div>
                    <div className={`text-2xl transition-colors duration-300 ${treinoExpandido === treino.id ? "text-blue-500 rotate-180" : "text-gray-700"}`}>▼</div>
                  </div>

                  <AnimatePresence>
                    {treinoExpandido === treino.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="px-6 pb-8 md:px-8">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-6" />

                          {isAtivo && (
                            <div className="mb-8">
                               <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase">
                                  <span>Progresso</span>
                                  <span className={progresso === 100 ? "text-green-400" : "text-blue-400"}>{Math.round(progresso)}%</span>
                               </div>
                               <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: `${progresso}%` }}
                                   className={`h-full ${progresso === 100 ? "bg-green-500" : "bg-blue-600"}`}
                                 />
                               </div>
                            </div>
                          )}

                          <div className="grid gap-3">
                            {treino.exercicios.map((ex, i) => {
                              const key = `${treino.id}-${i}`;
                              const concluido = exerciciosConcluidos[key];
                              return (
                                <div 
                                  key={i}
                                  onClick={() => isAtivo && toggleExercicio(treino.id, i)}
                                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                                    isAtivo ? "cursor-pointer hover:bg-white/5" : "opacity-50 cursor-not-allowed"
                                  } ${concluido ? "bg-green-900/10 border-green-800/50" : "bg-black/20 border-white/5"}`}
                                >
                                  <div>
                                    <h4 className={`font-bold ${concluido ? "text-green-500 line-through" : "text-white"}`}>{ex.nome}</h4>
                                    <div className="text-gray-500 text-sm">{ex.series} séries • {ex.reps} reps</div>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${concluido ? "bg-green-500 border-green-500 text-white" : "border-gray-700"}`}>
                                    {concluido && "✓"}
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          <div className="mt-8 flex gap-4">
                            {!isAtivo ? (
                              <>
                                <button onClick={() => iniciarTreino(treino.id)} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all">INICIAR TREINO 🚀</button>
                                <button onClick={(e) => { e.stopPropagation(); abrirEditor(treino); }} className="px-6 py-4 bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold rounded-xl border border-gray-700 transition-all">✏️ Editar</button>
                              </>
                            ) : (
                              <button onClick={() => finalizarTreino(treino.id)} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all animate-pulse">FINALIZAR TREINO 🏁</button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }) : (
              <p className="text-gray-500">Nenhum treino encontrado para este plano.</p>
            )}
          </div>
        </div>

        {/* 3. SEÇÃO DE BENEFÍCIOS DINÂMICA */}
        <div className="max-w-6xl mx-auto px-6 mb-24">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-b from-gray-900/80 to-black border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
              <span className="text-3xl">💎</span>
              Benefícios do Plano <span className="text-blue-500 uppercase">{user.plano}</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {/* RENDERIZA OS BENEFÍCIOS COM BASE NO PLANO ATUAL */}
              {beneficiosAtuais.map((ben, idx) => (
                <BenefitCard key={idx} icon={ben.icon} text={ben.text} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* MODAL EDITAR */}
        <AnimatePresence>
          {treinoEditando && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={() => setTreinoEditando(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-[#0f0f0f] border border-blue-900/50 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">Editar Treino</h3>
                  <button onClick={() => setTreinoEditando(null)} className="text-gray-500 hover:text-white">✕</button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 custom-scrollbar">
                  {treinoEditando.exercicios.map((ex, i) => (
                    <div key={i} className="bg-black/40 border border-white/10 p-4 rounded-xl flex gap-4 flex-col sm:flex-row">
                      <div className="flex-grow">
                        <label className="text-[10px] uppercase text-blue-400 font-bold mb-1 block">Exercício</label>
                        <input value={ex.nome} onChange={(e) => alterarExercicioNoEditor(i, 'nome', e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-lg outline-none" />
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <div className="w-24">
                          <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">Séries</label>
                          <input value={ex.series} onChange={(e) => alterarExercicioNoEditor(i, 'series', e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-lg outline-none text-center" />
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">Reps</label>
                          <input value={ex.reps} onChange={(e) => alterarExercicioNoEditor(i, 'reps', e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-lg outline-none text-center" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                  <button onClick={() => setTreinoEditando(null)} className="px-5 py-2.5 text-gray-400 hover:text-white">Cancelar</button>
                  <button onClick={salvarEdicao} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg">Salvar</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Componentes Auxiliares ---

function StatsCard({ icon, value, label, color, delay }: { icon: string, value: string | number, label: string, color: string, delay: number }) {
  const colorClasses = {
    blue: "from-blue-900/20 to-black border-blue-500/20 text-blue-500",
    green: "from-green-900/20 to-black border-green-500/20 text-green-500",
    purple: "from-purple-900/20 to-black border-purple-500/20 text-purple-500",
    gray: "from-gray-900/20 to-black border-gray-500/20 text-gray-500",
  };
  const currentClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.gray;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} whileHover={{ y: -5 }} className={`bg-gradient-to-br ${currentClass} border rounded-3xl p-6 relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-4xl font-bold mb-1 text-white">{value}</h3>
      <p className="text-gray-400 font-medium text-sm tracking-wide">{label}</p>
    </motion.div>
  );
}

function BenefitCard({ icon, text }: { icon: string; text: string }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl transition-colors cursor-default">
      <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center text-xl shadow-inner">{icon}</div>
      <span className="text-gray-300 font-medium text-sm">{text}</span>
    </motion.div>
  );
}