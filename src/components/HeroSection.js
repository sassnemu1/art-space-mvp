"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import fitContain from "@/lib/fitContain";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ mode, frameCount = 1500 }) {
  const desktopRoot = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const lastFrameRef = useRef(-1);
  const cache = useRef(new Map());
  const inflight = useRef(new Set());

  const isSequence = mode === "sequence";

  const currentFrame = useCallback(
    (i) => `/seq/output_${String(i).padStart(4, "0")}.webp`,
    []
  );

  // Загрузка одного изображения
  const loadImage = useCallback((idx) => {
    if (idx < 1 || idx > frameCount) return;
    if (cache.current.has(idx) || inflight.current.has(idx)) return;

    inflight.current.add(idx);
    const img = new Image();
    
    img.onload = () => {
      inflight.current.delete(idx);
      cache.current.set(idx, img);
    };
    
    img.onerror = () => {
      inflight.current.delete(idx);
    };
    
    img.src = currentFrame(idx);
  }, [frameCount, currentFrame]);

  // Поддержка окна загрузки
  const maintainWindow = useCallback((center) => {
    const windowBefore = 30;
    const windowAfter = 60;
    
    const start = Math.max(1, center - windowBefore);
    const end = Math.min(frameCount, center + windowAfter);
    
    for (let i = start; i <= end; i++) {
      loadImage(i);
    }
    
    // Очистка дальних кадров
    for (const key of cache.current.keys()) {
      if (key < start - 50 || key > end + 100) {
        cache.current.delete(key);
      }
    }
  }, [frameCount, loadImage]);

  // Отрисовка кадра
  // Отрисовка кадра с правильным масштабированием
const drawFrame = useCallback((index) => {
  const canvas = canvasRef.current;
  const ctx = ctxRef.current;
  if (!canvas || !ctx) return;

  const idx = Math.max(1, Math.min(frameCount, Math.round(index)));
  
  if (lastFrameRef.current === idx) return;

  const img = cache.current.get(idx);
  if (!img || !img.complete) {
    maintainWindow(idx);
    return;
  }

  try {
    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Получаем реальные размеры viewport (без DPR)
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Вычисляем размеры для cover/contain
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = viewportWidth / viewportHeight;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    // Cover (заполняет весь экран, обрезая лишнее)
    if (imgRatio > canvasRatio) {
      drawHeight = viewportHeight;
      drawWidth = drawHeight * imgRatio;
      offsetX = (viewportWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = viewportWidth;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (viewportHeight - drawHeight) / 2;
    }
    
    // Рисуем изображение
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    lastFrameRef.current = idx;
    maintainWindow(idx);
  } catch (error) {
    console.error('Error drawing frame:', error);
  }
}, [frameCount, maintainWindow]);

  // Установка размера canvas
  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    const ctx = canvas.getContext("2d", { 
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    ctxRef.current = ctx;
    
    const currentIdx = lastFrameRef.current > 0 ? lastFrameRef.current : 1;
    drawFrame(currentIdx);
  }, [drawFrame]);

  // Начальная загрузка
  useEffect(() => {
    if (!isSequence) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    // Загружаем первый кадр
    loadImage(1);
    
    // Предзагружаем первые 20 кадров
    for (let i = 2; i <= Math.min(20, frameCount); i++) {
      setTimeout(() => loadImage(i), i * 10);
    }

    return () => {
      cache.current.clear();
      inflight.current.clear();
    };
  }, [isSequence, frameCount, loadImage]);

  // GSAP анимации
  useGSAP(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (!isSequence) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = desktopRoot.current;
      if (!section) return;

      const firstText = section.querySelector(".text-item--first");
      const secondText = section.querySelector(".text-item--second");
      const thirdText = section.querySelector(".text-item--third");
      const fourthText = section.querySelector(".text-item--fourth");

      if (!firstText || !secondText || !thirdText || !fourthText) return;

      // Начальные состояния текста
      gsap.set([secondText, thirdText, fourthText], {
        opacity: 0,
        yPercent: 10,
        filter: "blur(4px)",
      });
      gsap.set(firstText, { opacity: 1, yPercent: 0, filter: "blur(0px)" });

      // Настройка canvas
      setCanvasSize();
      
      const handleResize = () => {
        requestAnimationFrame(setCanvasSize);
      };
      
      window.addEventListener("resize", handleResize);

      const mainScrollTrigger = {
        trigger: section,
        start: "top top",
        end: "+=1500vh",
        pin: true,
        anticipatePin: 1,
        scrub: 0.8,
        fastScrollEnd: true,
      };

      // Текстовая анимация
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1500vh",
          scrub: 0.8,
        },
      });

      tl.to({}, { duration: 600 })
        .to(firstText, {
          opacity: 0,
          yPercent: -10,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 100,
        }, 600)
        .fromTo(secondText,
          { opacity: 0, yPercent: 10, filter: "blur(6px)" },
          { opacity: 1, yPercent: 0, filter: "blur(0px)", ease: "power2.out", duration: 50 },
          650
        )
        .to({}, { duration: 600 }, 700)
        .to(secondText, {
          opacity: 0,
          yPercent: -10,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 100,
        }, 1300)
        .fromTo(thirdText,
          { opacity: 0, yPercent: 10, filter: "blur(6px)" },
          { opacity: 1, yPercent: 0, filter: "blur(0px)", ease: "power2.out", duration: 50 },
          1350
        )
        .to({}, { duration: 600 }, 1400)
        .to(thirdText, {
          opacity: 0,
          yPercent: -10,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 100,
        }, 2000)
        .fromTo(fourthText,
          { opacity: 0, yPercent: 10, filter: "blur(6px)" },
          { opacity: 1, yPercent: 0, filter: "blur(0px)", ease: "power2.out", duration: 50 },
          2050
        )
        .to({}, { duration: 450 }, 2100);

      // Canvas sequence анимация
      if (isSequence && canvasRef.current) {
        const state = { frame: 1 };
        
        gsap.to(state, {
          frame: frameCount,
          ease: "none",
          onUpdate: () => {
            requestAnimationFrame(() => {
              drawFrame(state.frame);
            });
          },
          scrollTrigger: {
            ...mainScrollTrigger,
            scrub: 1,
          },
        });
      }

      return () => {
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    });

    return () => mm.revert();
  }, { 
    scope: desktopRoot, 
    dependencies: [isSequence, frameCount, setCanvasSize, drawFrame] 
  });

  return (
    <>
      {/* Мобильная версия */}
      <section className="hero hero--mobile" role="banner" aria-label="Hero">
        <div className="hero__bg-mobile"></div>
        <div className="hero__content-mobile">
          <h1 className="hero__title-mobile">ART‑Space</h1>
          <p className="hero__subtitle-mobile">Exhibition</p>
          <p className="hero__location-mobile">Tverskaya 9, Moscow</p>
        </div>
      </section>

      {/* Десктопная версия */}
      <section ref={desktopRoot} className="hero hero--desktop" role="banner" aria-label="Hero">
        <div className="hero__media">
          <canvas ref={canvasRef} id="heroCanvas" />
        </div>

        <div className="text-swap-container">
          <h1 className="text-item text-item--first">ART‑Space</h1>
          <h1 className="text-item text-item--second">Exhibition</h1>
          <h1 className="text-item text-item--third">Tverskaya 9</h1>
          <h1 className="text-item text-item--fourth">Moscow</h1>
        </div>
      </section>
    </>
  );
}
