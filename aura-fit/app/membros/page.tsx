"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/navigation";

// --- DADOS ESTÁTICOS (Mantidos como referência inicial) ---
const treinosIniciais = {
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

const beneficiosPlano = {
  Básico: ["Acesso à musculação", "Suporte básico online", "1 Avaliação física mensal", "Horário livre"],
  Premium: ["Tudo do Básico", "Acesso a todas as aulas coletivas", "Suporte nutricional básico", "Treinos personalizados app", "Smart Drink Grátis"],
  VIP: ["Tudo do Premium", "Personal Trainer exclusivo 2x/sem", "Nutricionista esportivo dedicado", "Acesso à área VIP e Spa", "Kit exclusivo Aura Fit", "Avaliação bioimpedância semanal"]
};

export default function MembrosPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Estado para armazenar os treinos (agora editáveis)
  const [listaTreinos, setListaTreinos] = useState<any[]>([]);

  // Estados de controle
  const [treinoExpandido, setTreinoExpandido] = useState<number | null>(null);
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<{[key: string]: boolean}>({});
  const [treinoEmAndamento, setTreinoEmAndamento] = useState<number | null>(null);

  // Estados de Edição
  const [editandoTreinoId, setEditandoTreinoId] = useState<number | null>(null);
  const [treinoTemporario, setTreinoTemporario] = useState<any>(null); // Buffer de edição

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      // Carrega os treinos iniciais baseados no plano
      // @ts-ignore
      setListaTreinos(treinosIniciais[user.plano] || []);
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

  // --- Funções de Edição ---
  const iniciarEdicao = (e: React.MouseEvent, treino: any) => {
    e.stopPropagation(); // Evita abrir/fechar o card ao clicar no editar
    setEditandoTreinoId(treino.id);
    setTreinoTemporario(JSON.parse(JSON.stringify(treino))); // Cópia profunda para não alterar direto
    setTreinoExpandido(treino.id); // Garante que esteja aberto para ver os exercícios
  };

  const salvarEdicao = (e: React.MouseEvent) => {
    e.stopPropagation();
    setListaTreinos(prev => prev.map(t => t.id === treinoTemporario.id ? treinoTemporario : t));
    setEditandoTreinoId(null);
    setTreinoTemporario(null);
  };

  const cancelarEdicao = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditandoTreinoId(null);
    setTreinoTemporario(null);
  };

  const atualizarInputExercicio = (index: number, campo: string, valor: string) => {
    const novosExercicios = [...treinoTemporario.exercicios];
    novosExercicios[index] = { ...novosExercicios[index], [campo]: valor };
    setTreinoTemporario({ ...treinoTemporario, exercicios: novosExercicios });
  };

  // --- Funções de Treino ---
  const toggleTreino = (id: number) => {
    if (editandoTreinoId) return; // Bloqueia toggle se estiver editando
    setTreinoExpandido(treinoExpandido === id ? null : id);
  };

  const toggleExercicio = (treinoId: number, exercicioIndex: number) => {
    const key = `${treinoId}-${exercicioIndex}`;
    setExerciciosConcluidos(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const iniciarTreino = (treinoId: number) => {
    setTreinoEmAndamento(treinoId);
    setTreinoExpandido(treinoId);
    const newConcluidos = { ...exerciciosConcluidos };
    Object.keys(newConcluidos).forEach(key => {
      if (key.startsWith(`${treinoId}-`)) {
        delete newConcluidos[key];
      }
    });
    setExerciciosConcluidos(newConcluidos);
  };

  const finalizarTreino = (treinoId: number) => {
    const treino = listaTreinos.find(t => t.id === treinoId);
    const totalExercicios = treino?.exercicios.length || 0;
    const exerciciosFeitos = Object.keys(exerciciosConcluidos).filter(
      key => key.startsWith(`${treinoId}-`) && exerciciosConcluidos[key]
    ).length;

    if (exerciciosFeitos === totalExercicios) {
      setTreinoEmAndamento(null);
      alert("🎉🏆 TREINO CONCLUÍDO! 🏆🎉\n\nParabéns! Você completou todos os exercícios!\nSua dedicação está te levando mais perto dos seus objetivos!\n\n💪 Continue assim! #AuraFit");
    } else {
      const confirmacao = confirm(
        `⚠️ Atenção!\n\nVocê completou ${exerciciosFeitos} de ${totalExercicios} exercícios.\n\nDeseja finalizar mesmo assim?\n\nLembre-se: a consistência leva aos resultados! 💪`
      );
      if (confirmacao) {
        setTreinoEmAndamento(null);
        alert(`✅ Treino registrado!\n\nVocê completou ${Math.round((exerciciosFeitos/totalExercicios)*100)}% do treino.\n\nNa próxima vez, tente completar tudo! 🔥`);
      }
    }
  };

  const calcularProgresso = (treinoId: number, totalExercicios: number) => {
    const concluidos = Object.keys(exerciciosConcluidos).filter(
      key => key.startsWith(`${treinoId}-`) && exerciciosConcluidos[key]
    ).length;
    return (concluidos / totalExercicios) * 100;
  };

  // @ts-ignore
  const beneficios = beneficiosPlano[user.plano] || [];

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 relative overflow-hidden">
      {/* Efeitos de fundo animados */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header da área de membros */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 border-b border-blue-600/20 p-8 mb-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 mb-2 neon-title">
              Bem-vindo, {user.name}!
            </h1>
            <motion.p
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Plano: <span className="text-blue-500 font-bold text-xl">{user.plano}</span>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.1, type: "spring" }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-blue-900/40 to-black/60 border border-blue-600/50 rounded-3xl p-8 text-center overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="text-6xl mb-4 relative z-10"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              💪
            </motion.div>
            <h3 className="text-3xl font-bold text-blue-400 relative z-10">{listaTreinos.length}</h3>
            <p className="text-gray-400 relative z-10 mt-2">Treinos Disponíveis</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-blue-900/40 to-black/60 border border-blue-600/50 rounded-3xl p-8 text-center overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            <motion.div
              className="text-6xl mb-4 relative z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥
            </motion.div>
            <h3 className="text-3xl font-bold text-blue-400 relative z-10">
              {treinoEmAndamento ? "Em Ação!" : "Pronto!"}
            </h3>
            <p className="text-gray-400 relative z-10 mt-2">
              {treinoEmAndamento ? "Treino em Andamento" : "Comece seu Treino"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-blue-900/40 to-black/60 border border-blue-600/50 rounded-3xl p-8 text-center overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            <motion.div
              className="text-6xl mb-4 relative z-10"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              ⭐
            </motion.div>
            <h3 className="text-3xl font-bold text-blue-400 relative z-10">Plano {user.plano}</h3>
            <p className="text-gray-400 relative z-10 mt-2">Status Ativo</p>
          </motion.div>
        </div>
      </div>

      {/* Lista de Treinos */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Seus Treinos - Plano {user.plano}
          </h2>
          <p className="text-gray-400 text-lg">
            Clique em cada treino para ver os exercícios e acompanhe seu progresso
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {listaTreinos.map((treino, index) => {
            const progresso = calcularProgresso(treino.id, treino.exercicios.length);
            const isAtivo = treinoEmAndamento === treino.id;
            const isEditing = editandoTreinoId === treino.id;
            const dadosExibicao = isEditing ? treinoTemporario : treino;

            return (
              <motion.div
                key={treino.id}
                initial={{ opacity: 0, x: -100, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className={`relative bg-gradient-to-br from-gray-800/60 to-black/80 border-2 rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-sm ${
                  isAtivo 
                    ? "border-green-600 shadow-2xl shadow-green-600/40" 
                    : isEditing 
                        ? "border-yellow-500 shadow-xl shadow-yellow-500/20"
                        : "border-blue-600/30 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-600/30"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Brilho animado de fundo */}
                <motion.div
                  className={`absolute inset-0 ${isAtivo ? "bg-green-600/5" : "bg-blue-600/5"}`}
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Header do Treino */}
                <div
                  onClick={() => toggleTreino(treino.id)}
                  className="p-8 cursor-pointer hover:bg-blue-600/5 transition-all relative z-10"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-6 flex-1">
                      <motion.div 
                        className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl ${
                          isAtivo 
                            ? "bg-gradient-to-br from-green-600 to-green-900" 
                            : isEditing
                                ? "bg-gradient-to-br from-yellow-600 to-yellow-800"
                                : "bg-gradient-to-br from-blue-600 to-blue-900"
                        }`}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {String.fromCharCode(64 + treino.id)}
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                            <input 
                              type="text" 
                              value={treinoTemporario.nome}
                              onChange={(e) => setTreinoTemporario({...treinoTemporario, nome: e.target.value})}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-black/50 border border-yellow-500 text-white text-2xl md:text-3xl font-bold rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        ) : (
                            <div className="flex items-center gap-4 flex-wrap">
                                <h3 className="text-2xl md:text-3xl font-bold text-white">
                                    {treino.nome}
                                </h3>
                                {isAtivo && (
                                    <motion.span
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="bg-green-600 text-white text-sm px-4 py-1 rounded-full font-bold shadow-lg"
                                    >
                                    EM ANDAMENTO
                                    </motion.span>
                                )}
                            </div>
                        )}
                        
                        {!isEditing && (
                            <>
                                <p className="text-gray-400 flex items-center gap-2 mt-2 text-lg">
                                <span className="text-blue-500">💪</span>
                                {treino.exercicios.length} exercícios
                                </p>
                                {progresso > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                    <span className="text-sm text-gray-400">Progresso:</span>
                                    <span className="text-sm text-blue-400 font-bold">{Math.round(progresso)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progresso}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 h-3 rounded-full relative overflow-hidden"
                                    >
                                        <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        />
                                    </motion.div>
                                    </div>
                                </motion.div>
                                )}
                            </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Botões de Edição */}
                        {!isEditing && !treinoEmAndamento && (
                            <button 
                                onClick={(e) => iniciarEdicao(e, treino)}
                                className="p-3 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black text-white transition-all group z-20"
                                title="Editar Treino"
                            >
                                ✏️ 
                            </button>
                        )}

                        {isEditing ? (
                            <div className="flex gap-2 z-20">
                                <button onClick={cancelarEdicao} className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold text-sm hover:bg-red-700 shadow-lg">Cancelar</button>
                                <button onClick={salvarEdicao} className="px-4 py-2 bg-green-600 rounded-lg text-white font-bold text-sm hover:bg-green-700 shadow-lg">Salvar</button>
                            </div>
                        ) : (
                            <motion.div
                                animate={{ rotate: treinoExpandido === treino.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-blue-500 text-4xl"
                            >
                                ▼
                            </motion.div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Exercícios Expandidos */}
                <AnimatePresence>
                  {treinoExpandido === treino.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 space-y-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent mb-6" />
                        
                        {dadosExibicao.exercicios.map((ex: any, exIndex: number) => {
                          const key = `${treino.id}-${exIndex}`;
                          const concluido = exerciciosConcluidos[key];

                          if (isEditing) {
                             // --- VISUALIZAÇÃO DE EDIÇÃO (INPUTS) ---
                             return (
                               <div key={exIndex} className="bg-black/40 p-4 rounded-xl border border-gray-600 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                 <div className="flex-1 w-full">
                                   <label className="text-xs text-yellow-500 ml-1 font-bold">EXERCÍCIO</label>
                                   <input 
                                     value={ex.nome}
                                     onChange={(e) => atualizarInputExercicio(exIndex, 'nome', e.target.value)}
                                     className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:border-yellow-500 outline-none transition-colors"
                                   />
                                 </div>
                                 <div className="flex gap-2 w-full md:w-auto">
                                   <div className="w-1/2 md:w-24">
                                      <label className="text-xs text-yellow-500 ml-1 font-bold">SÉRIES</label>
                                      <input 
                                        value={ex.series}
                                        onChange={(e) => atualizarInputExercicio(exIndex, 'series', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white text-center focus:border-yellow-500 outline-none transition-colors"
                                      />
                                   </div>
                                   <div className="w-1/2 md:w-24">
                                      <label className="text-xs text-yellow-500 ml-1 font-bold">REPS</label>
                                      <input 
                                        value={ex.reps}
                                        onChange={(e) => atualizarInputExercicio(exIndex, 'reps', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white text-center focus:border-yellow-500 outline-none transition-colors"
                                      />
                                   </div>
                                 </div>
                               </div>
                             );
                          }

                          // --- VISUALIZAÇÃO NORMAL ---
                          return (
                            <motion.div
                              key={exIndex}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: exIndex * 0.05 }}
                              whileHover={{ scale: 1.03, x: 15 }}
                              className={`rounded-2xl p-6 transition-all group cursor-pointer ${
                                concluido 
                                  ? "bg-green-900/40 border-2 border-green-600/70 shadow-lg shadow-green-600/20" 
                                  : "bg-black/60 border-2 border-blue-600/30 hover:border-blue-600/70 hover:shadow-lg hover:shadow-blue-600/20"
                              }`}
                              onClick={() => isAtivo && toggleExercicio(treino.id, exIndex)}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                  {/* Checkbox customizado */}
                                  <div className={`w-8 h-8 min-w-[2rem] rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                    concluido 
                                      ? "bg-green-600 border-green-600 scale-110" 
                                      : "border-gray-500 group-hover:border-blue-500"
                                  }`}>
                                    {concluido && (
                                      <motion.span 
                                        initial={{ scale: 0 }} 
                                        animate={{ scale: 1 }} 
                                        className="text-white font-bold text-sm"
                                      >
                                        ✓
                                      </motion.span>
                                    )}
                                  </div>
                                  
                                  {/* Detalhes do exercício */}
                                  <div className="flex flex-col">
                                    <span className={`text-lg md:text-xl font-medium transition-colors ${
                                      concluido ? "text-green-400 line-through decoration-2" : "text-white group-hover:text-blue-200"
                                    }`}>
                                      {ex.nome}
                                    </span>
                                  </div>
                                </div>

                                {/* Séries e Repetições */}
                                <div className="text-right pl-4 border-l border-gray-700">
                                  <div className={`font-bold text-lg ${concluido ? "text-green-400" : "text-blue-400"}`}>
                                    {ex.series} x {ex.reps}
                                  </div>
                                  <div className="text-gray-500 text-xs uppercase tracking-wider font-bold">
                                    Séries / Reps
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}

                        {/* Botões de Ação (Iniciar/Finalizar) - Só aparecem se não estiver editando */}
                        {!isEditing && (
                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-4 flex justify-center"
                            >
                            {!treinoEmAndamento ? (
                                <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    iniciarTreino(treino.id);
                                }}
                                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg shadow-blue-600/30 border border-blue-400/30 flex items-center gap-3 group"
                                >
                                <span className="text-2xl group-hover:rotate-12 transition-transform">🚀</span>
                                INICIAR TREINO
                                </motion.button>
                            ) : isAtivo ? (
                                <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    finalizarTreino(treino.id);
                                }}
                                className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg shadow-green-600/30 border border-green-400/30 flex items-center gap-3 group"
                                >
                                <span className="text-2xl group-hover:scale-125 transition-transform">🏆</span>
                                FINALIZAR TREINO
                                </motion.button>
                            ) : (
                                <div className="text-gray-500 italic text-center border border-gray-700/50 rounded-xl p-4 bg-black/20">
                                ⚠️ Você já tem outro treino em andamento. Termine-o primeiro!
                                </div>
                            )}
                            </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- SEÇÃO DE BENEFÍCIOS DO PLANO (RODAPÉ) --- */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-1"
        >
          {/* Borda Animada */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-50 blur-sm" />
          
          <div className="relative bg-black rounded-[22px] p-8 md:p-12 border border-gray-800">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Seu Plano: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{user.plano}</span>
                </h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Aproveite ao máximo todos os recursos disponíveis na sua assinatura. 
                  Você tem acesso exclusivo a ferramentas que aceleram seus resultados.
                </p>
                <div className="inline-flex items-center gap-2 text-blue-400 font-semibold border-b border-blue-400/30 pb-1">
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {beneficios.map((item: string, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 bg-gray-900/60 p-4 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors group"
                    >
                      <div className="min-w-[2rem] w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors border border-blue-500/30">
                        <span className="text-blue-400 group-hover:text-white text-xs">★</span>
                      </div>
                      <span className="text-gray-300 text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <footer className="text-center text-gray-600 text-sm mt-12 pb-8">
            <p>"O corpo alcança o que a mente acredita" -Sócrates</p>
        </footer>
      </div>

    </div>
  );
}