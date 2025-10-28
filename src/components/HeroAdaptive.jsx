"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection"; // твоя полная версия
import HeroSectionLite from "@/components/HeroSectionLite"; // лёгкая версия

export default function HeroAdaptive() {
  const [isPowerful, setIsPowerful] = useState(null);
  const data = {
    mode: "sequence",
    frameCount: 280,
  };

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const ram = navigator.deviceMemory || 4;

    // простая логика: ≥ 8 ядер и ≥ 8 ГБ → мощное устройство
    const strong = cores >= 8 && ram >= 8;

    // fallback на тест FPS
    let frames = 0;
    const start = performance.now();

    const testFPS = () => {
      frames++;
      if (performance.now() - start < 1000) {
        requestAnimationFrame(testFPS);
      } else {
        const fps = frames;
        setIsPowerful(strong || fps > 40);
      }
    };

    requestAnimationFrame(testFPS);
  }, []);

  if (isPowerful === null) return null;

  return isPowerful ? <HeroSection frameCount={data.frameCount} /> : <HeroSectionLite />;
}
