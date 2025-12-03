'use client';

import { forwardRef, useMemo, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Se não quiser instalar framer-motion, me avise que faço versão pura, 
// mas framer-motion é padrão na indústria para isso.
// npm install framer-motion

interface VariableProximityProps {
  label: string;
  className?: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: React.RefObject<any>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (props, ref) => {
    const {
      label,
      className,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = 'linear',
    } = props;

    // Array para guardar referência de cada letra
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    
    // Divide o texto em letras, preservando espaços
    const words = useMemo(() => label.split(' '), [label]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = container.getBoundingClientRect();

        // Se o mouse estiver fora do container + uma margem, podemos ignorar para performance
        // Mas para garantir o efeito visual, calculamos sempre que estiver perto.

        letterRefs.current.forEach((letterSpan) => {
          if (!letterSpan) return;

          const letterRect = letterSpan.getBoundingClientRect();
          const letterCenterX = letterRect.left + letterRect.width / 2;
          const letterCenterY = letterRect.top + letterRect.height / 2;

          const distance = Math.hypot(
            clientX - letterCenterX,
            clientY - letterCenterY
          );

          if (distance < radius) {
            // Calcula a intensidade baseada na distância (0 a 1)
            const progress = 1 - distance / radius;
            
            // Aqui aplicamos a interpolação simples. 
            // Para produção real, seria ideal parsear a string de settings,
            // mas aqui vamos alternar baseado na proximidade.
            
            // Nota: Interpolar strings complexas como "'wght' 400" manualmente é difícil.
            // O ideal é usar CSS Variables se o navegador suportar ou simplificar para weight.
            
            // Abordagem simplificada para Weight:
            // Assumindo que o usuario quer mudar peso (wght).
            // Se precisar de 'opsz' também, o código fica bem mais complexo.
            
            // Vamos usar CSS Variables para controlar o peso dinamicamente
            letterSpan.style.fontVariationSettings = progress > 0.5 ? toFontVariationSettings : fromFontVariationSettings;
            
            // Melhoria suave (interpolação real exigiria regex nos valores numéricos)
            // Vou manter simples: se estiver perto, aplica o 'to', se longe, o 'from'.
            // Para interpolação gradual (smooth), precisariamos extrair os números.
             letterSpan.style.fontVariationSettings = calculateVariation(
                fromFontVariationSettings,
                toFontVariationSettings,
                progress
             );

          } else {
            letterSpan.style.fontVariationSettings = fromFontVariationSettings;
          }
        });
      };

      // Otimização: Adiciona listener na janela ou no container
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [containerRef, radius, fromFontVariationSettings, toFontVariationSettings]);

    return (
      <span
        ref={ref}
        className={`${className} inline-block`}
        style={{ display: 'inline', whiteSpace: 'normal' }} // Garante quebra de linha
      >
        {label.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => { letterRefs.current[index] = el; }}
            style={{ 
                fontVariationSettings: fromFontVariationSettings,
                transition: 'font-variation-settings 0.1s ease', // Suaviza a troca
                display: 'inline-block',
                minWidth: char === ' ' ? '0.25em' : 'auto' // Preserva espaço
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  }
);

VariableProximity.displayName = 'VariableProximity';

// Função auxiliar para interpolar valores nas strings de configuração
function calculateVariation(from: string, to: string, progress: number): string {
    // Esta função é um simplificador. Ela tenta interpolar o peso ('wght').
    // Exemplo de entrada: "'wght' 400, 'opsz' 9"
    
    try {
        const fromWeight = parseInt(from.match(/'wght'\s+(\d+)/)?.[1] || '400');
        const toWeight = parseInt(to.match(/'wght'\s+(\d+)/)?.[1] || '1000');
        
        const currentWeight = fromWeight + (toWeight - fromWeight) * progress;
        
        // Retorna string reconstruída (focada no peso para demonstração)
        return `'wght' ${currentWeight}`;
    } catch (e) {
        return from; // Fallback se falhar o regex
    }
}

export default VariableProximity;