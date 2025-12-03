import { useEffect } from "react";

const MouseTrail = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "999999";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Point {
      x: number;
      y: number;
      life: number; // controla iluminação / fade
    }

    const points: Point[] = [];
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: target.x, y: target.y };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const drawComet = () => {
      if (points.length < 2) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length - 1; i++) {
        const p = points[i];
        const next = points[i + 1];

        const life = p.life;
        const width = life * 18; // cauda larga na frente e afinando atrás

        ctx.lineWidth = width;
        ctx.lineCap = "round";

        // gradiente do cometa
        const grad = ctx.createLinearGradient(p.x, p.y, next.x, next.y);
        grad.addColorStop(0, `rgba(0,180,255,${life})`);
        grad.addColorStop(1, `rgba(0,255,200,${life * 0.6})`);

        ctx.strokeStyle = grad;

        ctx.shadowBlur = 35 * life;
        ctx.shadowColor = `rgba(0,200,255,${life})`;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();

        // reduz vida da cauda
        p.life -= 0.02;
      }

      // remove pontos mortos
      for (let i = points.length - 1; i >= 0; i--) {
        if (points[i].life <= 0) points.splice(i, 1);
      }
    };

    const animate = () => {
      // mouse suavizado → movimento fluido do cometa
      smooth.x = lerp(smooth.x, target.x, 0.15);
      smooth.y = lerp(smooth.y, target.y, 0.15);

      // adiciona nova posição (cabeça do cometa)
      points.push({
        x: smooth.x,
        y: smooth.y,
        life: 1,
      });

      // limita tamanho da cauda
      if (points.length > 80) points.shift();

      drawComet();

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
};

export default MouseTrail;
