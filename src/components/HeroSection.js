"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ frameCount = 1500 }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  const imageCache = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const currentFrame = useCallback(
    (index) => `/seq/output_${String(index).padStart(4, "0")}.webp`,
    []
  );

  const updateImage = useCallback((index) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const img = imageCache.current[index];
    if (!img) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const canvasRatio = viewportWidth / viewportHeight;
    const imageRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imageRatio > canvasRatio) {
      drawHeight = viewportHeight;
      drawWidth = drawHeight * imageRatio;
      offsetX = (viewportWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = viewportWidth;
      drawHeight = drawWidth / imageRatio;
      offsetX = 0;
      offsetY = (viewportHeight - drawHeight) / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const context = canvas.getContext("2d", { 
      alpha: false,
      desynchronized: true 
    });
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    contextRef.current = context;

    if (imageCache.current[1]) {
      updateImage(1);
    }
  }, [updateImage]);

  const preloadImages = useCallback(() => {
    console.log('📦 Начинаем предзагрузку...');
    let loadedCount = 0;

    const firstImg = new Image();
    firstImg.onload = () => {
      imageCache.current[1] = firstImg;
      console.log('✅ Первый кадр загружен');
      setFirstFrameLoaded(true);
      updateImage(1);
      loadedCount++;

      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        
        img.onload = () => {
          loadedCount++;
          imageCache.current[i] = img;
          
          if (loadedCount % 50 === 0) {
            console.log(`⏳ Загружено ${loadedCount}/${frameCount} кадров`);
          }
          
          if (loadedCount === frameCount) {
            console.log('✅ Все кадры загружены!');
            setIsLoaded(true);
          }
        };
        
        img.src = currentFrame(i);
      }
    };
    
    firstImg.src = currentFrame(1);
  }, [frameCount, currentFrame, updateImage]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    setCanvasSize();
    preloadImages();

    window.addEventListener("resize", setCanvasSize);
    return () => window.removeEventListener("resize", setCanvasSize);
  }, [setCanvasSize, preloadImages]);

  useGSAP(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (!isLoaded) return;

    console.log('🚀 Запуск GSAP');

    const section = sectionRef.current;
    if (!section) return;

    // Длина скролла для секции
    const scrollLength = "+=1500vh";

    // Pin секции
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: scrollLength,
      pin: true,
      anticipatePin: 1,
      scrub: 0.5,
      onUpdate: (self) => {
        // Рассчитываем кадр на основе прогресса ВНУТРИ секции
        const progress = self.progress;
        const targetFrame = Math.round(1 + progress * (frameCount - 1));
        updateImage(targetFrame);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { 
    scope: sectionRef, 
    dependencies: [isLoaded, frameCount, updateImage] 
  });

  return (
    <>
      <section className="hero hero--mobile" role="banner">
        <div className="hero__bg-mobile" />
        <div className="hero__content-mobile">
          <h1 className="hero__title-mobile">ART‑Space</h1>
          <p className="hero__subtitle-mobile">Международный выставочный комплекс</p>
          <p className="hero__location-mobile">Тверская 9, Москва</p>
          <div className="hero__buttons-mobile">
            <Link href="https://tickets.art-space.world/#events" className="hero__btn hero__btn--primary" target="_blank" rel="noopener noreferrer">
              Билеты
            </Link>
            <Link href="/events" className="hero__btn hero__btn--secondary">
              Афиша
            </Link>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="hero hero--desktop" role="banner">
        {!firstFrameLoaded && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Загрузка...</p>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hero__canvas" />

        <div className="text-swap-container">
          <h1 className="text-item text-item--first">ART‑Space</h1>
          <h3 className="text-item text-item--first">Международный</h3>
          <h3 className="text-item text-item--first">Выставочный</h3>
          <h3 className="text-item text-item--first">Комплекс</h3>
        </div>
      </section>
    </>
  );
}
