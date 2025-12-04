"use client";

import React from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-black to-black text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left text-sm leading-relaxed">
          <p>
            Jailson Ferreira © Todos os direitos reservados | Desenvolvido por{" "}
            <a
              href="https://github.com/Gregwzx"
              className="text-blue-400 hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Jailson Ferreira"
            >
              Jailson Ferreira
            </a>
          </p>
        </div>
      </div>

      <a
        href="https://wa.me/5581998965933"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 p-4 rounded-full shadow-lg text-white text-3xl transition-transform duration-200 hover:scale-110"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </footer>
  );
}
