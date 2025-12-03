'use client';

import { forwardRef, useMemo, useRef, useEffect } from 'react';

interface VariableProximityProps {
  label: string;
  className?: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: React.RefObject<any>; // CORREÇÃO AQUI: Aceita any para evitar erro de tipo
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

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const words = useMemo(() => label.split(' '), [label]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        // Check simples para garantir que o elemento ainda existe
        if (!container.getBoundingClientRect) return;
        
        const rect = container.getBoundingClientRect();

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
            const progress = 1 - distance / radius;
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

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [containerRef, radius, fromFontVariationSettings, toFontVariationSettings]);

    return (
      <span
        ref={ref}
        className={`${className} inline-block`}
        style={{ display: 'inline', whiteSpace: 'normal' }}
      >
        {label.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => { letterRefs.current[index] = el; }}
            style={{ 
                fontVariationSettings: fromFontVariationSettings,
                transition: 'font-variation-settings 0.1s ease',
                display: 'inline-block',
                minWidth: char === ' ' ? '0.25em' : 'auto'
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

function calculateVariation(from: string, to: string, progress: number): string {
    try {
        const fromWeight = parseInt(from.match(/'wght'\s+(\d+)/)?.[1] || '400');
        const toWeight = parseInt(to.match(/'wght'\s+(\d+)/)?.[1] || '1000');
        const currentWeight = fromWeight + (toWeight - fromWeight) * progress;
        return `'wght' ${currentWeight}`;
    } catch (e) {
        return from;
    }
}

export default VariableProximity;