"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSectionLite() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/seq/frame_0001.avif"; // показываем просто первый кадр
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <section className="hero hero--lite" role="banner">
      {!isLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Загрузка...</p>
        </div>
      )}

      <div
        className="hero__bg-lite"
        style={{
          backgroundImage: 'url("/seq/frame_0001.avif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      />

      <div className="hero__content-lite">
        <h1 className="hero__title">ART-Space</h1>
        <p className="hero__subtitle">Международный выставочный комплекс</p>
        <p className="hero__location">Тверская 9, Москва</p>
        <div className="hero__buttons">
          <Link
            href="https://tickets.art-space.world/#events"
            className="hero__btn hero__btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Билеты
          </Link>
          <Link href="/events" className="hero__btn hero__btn--secondary">
            Афиша
          </Link>
        </div>
      </div>
    </section>
  );
}
