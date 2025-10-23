"use client";

import { useRef, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  ContactShadows, 
  PerspectiveCamera,
  useGLTF 
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import './VeraAwardSection.css';

gsap.registerPlugin(ScrollTrigger);

// ✅ ВАША 3D МОДЕЛЬ
function StatueModel() {
  // Укажите правильный путь к вашей модели
  const { scene } = useGLTF("/models/model.glb"); 
  
  return (
    <primitive 
      object={scene} 
      scale={7.5}           // Подберите нужный размер
      position={[0, -1.5, 0]} // Подберите позицию
      rotation={[0, 0, 0]}
    />
  );
}

// ✅ Предзагрузка модели
useGLTF.preload("/models/model.glb");

function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      
      {/* ✅ УВЕЛИЧИВАЕМ ЯРКОСТЬ */}
      <ambientLight intensity={1.2} /> {/* Было 0.5 → стало 0.8 */}
      <hemisphereLight intensity={2.2} groundColor="#ffffff" /> {/* Добавили */}
      
      {/* Основные споты - ярче */}
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3}
        penumbra={1} 
        intensity={8} 
        castShadow
      />
      <spotLight 
        position={[-10, 10, -10]} 
        angle={0.3}
        penumbra={1} 
        intensity={8} 
      />
      
      {/* Дополнительные источники света */}
      <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
      <pointLight position={[5, 0, 5]} intensity={0.8} color="#ffd700" />
      <pointLight position={[-5, 0, -5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, -5, 0]} intensity={0.5} />
      
      <Suspense fallback={null}>
        <StatueModel />
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.3} 
          scale={10} 
          blur={2}
        />
      </Suspense>
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}


export default function VeraAwardSection({ 
  id = "vera-award-section" 
}) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const canvasContainerRef = useRef(null);

  //Форма
  const [formOpen, setFormOpen] = useState(false);

  const handleFormSubmit = (data) => {
    console.log("Отправленные данные:", data);
    setFormOpen(false);
    // Здесь можно добавить отправку данных на сервер / amoCRM и т.д.
  };

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Анимация заголовков
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Анимация статистики
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.fromTo(stat,
            { opacity: 0, scale: 0.8, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: 0.6 + (index * 0.15),
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: section,
                start: "top 60%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Анимация 3D контейнера
      gsap.fromTo(canvasContainerRef.current,
        { opacity: 0, x: 100, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const stats = [
    { number: "XIV", label: "Фестиваль" },
    { number: "500+", label: "Участников" },
    { number: "30+", label: "Стран" },
    { number: "7", label: "Дней" }
  ];

  return (
    <>
    <section ref={sectionRef} id={id} className="vera-section">
      <div className="vera-container">
        {/* Левая колонка - Информация */}
        <div className="vera-content">
          <div className="vera-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                    fill="currentColor"/>
            </svg>
            <span>Ежегодная премия</span>
          </div>

          <h2 ref={titleRef} className="vera-title">
            Премия <span className="vera-title-highlight">VERA</span>
          </h2>

          <p ref={subtitleRef} className="vera-subtitle">
            Международный фестиваль искусств<br/>
            «Традиции и Современность»
          </p>

          <p ref={descriptionRef} className="vera-description">
            XIV Московский международный фестиваль искусств объединяет лучших 
            художников, скульпторов и мастеров декоративно-прикладного искусства 
            со всего мира. Фестиваль проходит с 29 мая по 4 июня в трех престижных 
            локациях: Гостином дворе, ЦВЗ «Манеж» и Центральном выставочном зале.
          </p>

          {/* Статистика */}
          <div className="vera-stats">
            {stats.map((stat, index) => (
              <div 
                key={index}
                ref={el => statsRef.current[index] = el}
                className="vera-stat-item"
              >
                <div className="vera-stat-number">{stat.number}</div>
                <div className="vera-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Кнопки */}
          <div className="vera-buttons">
              <a 
                href="https://vera.art-space.world" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="vera-button vera-button--primary"
              >
                <span>Узнать больше</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

          {/* Даты проведения */}
          <div className="vera-dates">
            <div className="vera-dates-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 8H17M7 2V6M13 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>29 мая - 4 июня 2025</span>
            </div>
            <div className="vera-dates-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C6.13 2 3 5.13 3 9C3 13.17 10 20 10 20C10 20 17 13.17 17 9C17 5.13 13.87 2 10 2ZM10 11.5C8.62 11.5 7.5 10.38 7.5 9C7.5 7.62 8.62 6.5 10 6.5C11.38 6.5 12.5 7.62 12.5 9C12.5 10.38 11.38 11.5 10 11.5Z" 
                      fill="currentColor"/>
              </svg>
              <span>Гостиный двор, ЦВЗ «Манеж»</span>
            </div>
          </div>
        </div>

        {/* Правая колонка - 3D Модель */}
        <div ref={canvasContainerRef} className="vera-canvas-container">
          <div className="vera-canvas-wrapper">
            <Canvas shadows>
              {/* <color attach="background" args={['#ffffffa3']} /> */}
              <Scene3D />
            </Canvas>
            
            {/* Подсказка */}
            <div className="vera-canvas-hint">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" 
                      fill="currentColor" opacity="0.6"/>
              </svg>
              <span>Поверните статуэтку мышью</span>
            </div>
          </div>

          {/* Декоративные элементы */}
          <div className="vera-canvas-decoration">
            <div className="vera-canvas-ring vera-canvas-ring--1"></div>
            <div className="vera-canvas-ring vera-canvas-ring--2"></div>
            <div className="vera-canvas-ring vera-canvas-ring--3"></div>
          </div>
        </div>
      </div>

      {/* Фоновые элементы */}
      <div className="vera-background">
        <div className="vera-bg-gradient vera-bg-gradient--1"></div>
        <div className="vera-bg-gradient vera-bg-gradient--2"></div>
        <div className="vera-bg-pattern"></div>
      </div>

      
    </section>

    
    </>
  );
}
