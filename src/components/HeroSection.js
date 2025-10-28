"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ frameCount = 280 }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const imageCache = useRef({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // AVIF кадры
  const currentFrame = useCallback(
    (index) => `/seq/output_${String(index).padStart(4, "0")}.webp`,
    []
  );

  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    contextRef.current = context;
  }, []);

  const drawImage = useCallback((img) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || !img) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const canvasRatio = vw / vh;
    const imgRatio = img.width / img.height;

    let dw, dh, dx, dy;

    if (imgRatio > canvasRatio) {
      dh = vh;
      dw = dh * imgRatio;
      dx = (vw - dw) / 2;
      dy = 0;
    } else {
      dw = vw;
      dh = dw / imgRatio;
      dx = 0;
      dy = (vh - dh) / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, dx, dy, dw, dh);
  }, []);

  const preloadImages = useCallback(() => {
    let loadedCount = 0;
    const firstImg = new Image();
    firstImg.onload = () => {
      imageCache.current[1] = firstImg;
      setFirstFrameLoaded(true);
      drawImage(firstImg);
      loadedCount++;

      // ленивое предзагрузка остальных кадров
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        img.onload = () => {
          imageCache.current[i] = img;
          loadedCount++;
          if (loadedCount === frameCount) setIsLoaded(true);
        };
        img.src = currentFrame(i);
      }
    };
    firstImg.src = currentFrame(1);
  }, [frameCount, currentFrame, drawImage]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    setCanvasSize();
    preloadImages();
    window.addEventListener("resize", setCanvasSize);
    return () => window.removeEventListener("resize", setCanvasSize);
  }, [setCanvasSize, preloadImages]);

  useGSAP(() => {
    if (!isLoaded || typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const scrollLength = "+=800vh";
    let lastFrame = 1;

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: scrollLength,
      pin: true,
      anticipatePin: 1,
      scrub: 0.5,
      onUpdate: (self) => {
        const targetFrame = Math.round(1 + self.progress * (frameCount - 1));
        if (targetFrame !== lastFrame && imageCache.current[targetFrame]) {
          requestAnimationFrame(() => drawImage(imageCache.current[targetFrame]));
          lastFrame = targetFrame;
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, { scope: sectionRef, dependencies: [isLoaded, frameCount, drawImage] });

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
