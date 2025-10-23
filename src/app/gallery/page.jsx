"use client";

import { useRef } from "react";
import dynamic from 'next/dynamic';
import './gallery.css';

// Ленивая загрузка Footer
const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  loading: () => null,
  ssr: true
});

export default function GalleryPage() {
  const heroRef = useRef(null);
  const floorsRef = useRef([]);

  const floors = [
    {
      id: 1,
      number: "01",
      title: "Первый этаж",
      subtitle: "Современное искусство",
      description: "Погрузитесь в мир современного искусства XXI века. Здесь представлены работы ведущих художников, исследующих границы между традицией и инновацией.",
      features: [
        "Живопись и графика",
        "Цифровое искусство",
        "Интерактивные инсталляции",
        "Временные выставки"
      ],
      image: "/assets/floor/floor-1.webp",
      alt: "Первый этаж - Современное искусство"
    },
    {
      id: 2,
      number: "02",
      title: "Второй этаж",
      subtitle: "Классическое искусство",
      description: "Коллекция шедевров классического искусства, охватывающая период от эпохи Возрождения до импрессионизма. Исследуйте эволюцию художественных техник и стилей.",
      features: [
        "Европейская живопись XV-XIX вв.",
        "Скульптура",
        "Антикварная мебель",
        "Декоративно-прикладное искусство"
      ],
      image: "/assets/floor/floor-2.webp",
      alt: "Второй этаж - Классическое искусство"
    },
    {
      id: 3,
      number: "03",
      title: "Третий этаж",
      subtitle: "Русское искусство",
      description: "Крупнейшая коллекция русского искусства от иконописи до авангарда. Откройте для себя богатство и многообразие русской художественной традиции.",
      features: [
        "Иконопись XII-XVII вв.",
        "Передвижники",
        "Русский авангард",
        "Советское искусство"
      ],
      image: "/assets/floor/floor-3.webp",
      alt: "Третий этаж - Русское искусство"
    },
    {
      id: 4,
      number: "04",
      title: "Четвертый этаж",
      subtitle: "Специальные проекты",
      description: "Пространство для экспериментальных выставок, кураторских проектов и образовательных программ. Место встречи искусства, науки и технологий.",
      features: [
        "VR/AR инсталляции",
        "Мультимедийные проекты",
        "Лекционный зал",
        "Творческие мастерские"
      ],
      image: "/assets/floor/floor-4.webp",
      alt: "Четвертый этаж - Специальные проекты"
    }
  ];

  return (
    <main className="gallery-page">
      {/* Hero Section */}
      <section ref={heroRef} className="gallery-hero">
        <div className="gallery-hero-content">
          <span className="gallery-hero-label">О пространстве</span>
          <h1 className="gallery-hero-title">
            Четыре этажа <br />искусства и культуры
          </h1>
          <p className="gallery-hero-description">
            ART-Space - это инновационное культурное пространство, 
            объединяющее традиции и современность на четырех уникальных 
            этажах выставочных залов.
          </p>
        </div>
      </section>

      {/* Intro Stats */}
      <section className="gallery-stats">
        <div className="gallery-stats-container">
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Этажа выставок</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2,500+</div>
            <div className="stat-label">Произведений искусства</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1,500м²</div>
            <div className="stat-label">Выставочного пространства</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Выставок в год</div>
          </div>
        </div>
      </section>

      {/* Floor Sections */}
      {floors.map((floor, index) => (
        <section 
          key={floor.id}
          className={`floor-section ${index % 2 === 0 ? 'floor-section--left' : 'floor-section--right'}`}
        >
          <div className="floor-container">
            <div className="floor-number">{floor.number}</div>

            <div className="floor-image-wrapper">
              <div className="floor-image">
                <img 
                  src={floor.image} 
                  alt={floor.alt}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill='%23111' width='800' height='600'/><text x='50%' y='50%' fill='%23666' font-size='24' text-anchor='middle' dominant-baseline='middle'>${floor.title}</text></svg>`;
                  }}
                />
                <div className="floor-image-overlay"></div>
              </div>
            </div>

            <div className="floor-content">
              <span className="floor-subtitle">{floor.subtitle}</span>
              <h2 className="floor-title">{floor.title}</h2>
              <p className="floor-description">{floor.description}</p>

              <ul className="floor-features">
                {floor.features.map((feature, idx) => (
                  <li key={idx} className="floor-feature-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.6666 5L7.49998 14.1667L3.33331 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#" className="floor-visit-btn">
                Посетить этаж
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="gallery-cta">
        <div className="gallery-cta-content">
          <h2 className="gallery-cta-title">
            Будущее искусства начинается сегодня
          </h2>
          <p className="gallery-cta-description">
            Станьте частью культурного пространства ART-Space
          </p>
          <div className="gallery-cta-buttons">
            <a href="/contact" className="gallery-cta-btn gallery-cta-btn--primary">
              Свяжитесь с нами
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/events" className="gallery-cta-btn gallery-cta-btn--secondary">
              Текущие выставки
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
