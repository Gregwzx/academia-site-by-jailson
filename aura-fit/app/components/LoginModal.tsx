"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlano?: string;
}

export default function LoginModal({ isOpen, onClose, selectedPlano }: LoginModalProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulação de delay de login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password.length >= 6) {
      const success = login(email, password, selectedPlano || "Básico");
      if (success) {
        setIsLoading(false);
        onClose();
        // Redirecionar para área de membros
        window.location.href = "/membros";
      }
    } else {
      setError("Email e senha (mín. 6 caracteres) são obrigatórios");
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-blue-600 rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Efeito de brilho de fundo */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 animate-pulse" />

            <div className="relative z-10">
              {/* Botão fechar */}
              <button
                onClick={onClose}
                className="absolute -top-4 -right-4 text-white hover:text-blue-600 transition-colors text-4xl font-bold"
              >
                ×
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <span className="text-4xl">🔐</span>
                </motion.div>
                <h2 className="text-3xl font-extrabold text-blue-600 neon-title">
                  Bem-vindo de volta!
                </h2>
                {selectedPlano && (
                  <p className="text-gray-400 mt-2">
                    Faça login para acessar o plano <span className="text-blue-500 font-bold">{selectedPlano}</span>
                  </p>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-blue-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 outline-none"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-blue-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 outline-none"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-blue-600/50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Entrando...
                    </span>
                  ) : (
                    "Entrar"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>Demo: Use qualquer email e senha (mín. 6 caracteres)</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}