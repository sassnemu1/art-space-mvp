"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import './ContentSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContentSection({ 
  id,
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stats = [
    { value: "2,500+", label: "Экспонатов" },
    { value: "50+", label: "Стран мира" },
    { value: "50+", label: "Выставок в год" }
  ];

  const features = [
    {
      id: 1,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
          <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="currentColor"/>
        </svg>
      ),
      title: "Мировые коллекции",
      description: "Уникальные арт-объекты из более чем 50 стран мира"
    },
    {
      id: 2,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L2 12H5V20H19V12H22L12 3ZM12 5.69L17 10.19V18H15V13H9V18H7V10.19L12 5.69ZM11 15H13V18H11V15Z" fill="currentColor"/>
        </svg>
      ),
      title: "Современные пространства",
      description: "Инновационные выставочные залы с передовыми технологиями"
    },
    {
      id: 3,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
        </svg>
      ),
      title: "Центр Москвы",
      description: "Тверская 9 — в самом сердце культурной столицы"
    },
    {
      id: 4,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L9 9L2 12L9 15L12 22L15 15L22 12L15 9L12 2Z" fill="currentColor"/>
        </svg>
      ),
      title: "Эксклюзивный опыт",
      description: "Уникальные культурные события и закрытые показы"
    }
  ];

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Только десктоп
    mm.add("(min-width: 769px)", () => {
      // Параллакс эффект для изображения
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.9, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Заголовки с задержкой
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Статистика
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.fromTo(stat,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.3 + (index * 0.1),
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // // Карточки с каскадным появлением
      // cardsRef.current.forEach((card, index) => {
      //   if (card) {
      //     gsap.fromTo(card,
      //       { opacity: 0, y: 60, rotateX: -15 },
      //       {
      //         opacity: 1,
      //         y: 0,
      //         rotateX: 0,
      //         duration: 0.9,
      //         delay: 0.4 + (index * 0.15),
      //         ease: "power3.out",
      //         scrollTrigger: {
      //           trigger: card,
      //           start: "top 85%",
      //           toggleActions: "play none none reverse"
      //         }
      //       }
      //     );
      //   }
      // });

      // CTA кнопка
      // if (ctaRef.current) {
      //   gsap.fromTo(ctaRef.current,
      //     { opacity: 0, y: 30 },
      //     {
      //       opacity: 1,
      //       y: 0,
      //       duration: 0.8,
      //       delay: 1,
      //       ease: "power2.out",
      //       scrollTrigger: {
      //         trigger: ctaRef.current,
      //         start: "top 90%",
      //         toggleActions: "play none none reverse"
      //       }
      //     }
      //   );
      // }
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section ref={sectionRef} id={id} className="about-section">
      <div className="about-container">
        {/* Left Column - Image */}
        <div 
          ref={imageRef} 
          className="about-image-column"
          style={isMobile ? { opacity: 1, transform: 'scale(1) translateY(0)' } : {}}
        >
          <div className="about-image-wrapper">
            <div className="about-image-badge">
              <span>Est. 2024</span>
            </div>
            <div className="about-image">
              <img 
                src="/assets/floor/floor-3.webp" 
                alt="ART-Space Exhibition"
                loading={isMobile ? "lazy" : "eager"}
              />
              <div className="about-image-overlay"></div>
            </div>
            <div className="about-image-decoration">
              <div className="about-image-decoration-line"></div>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="about-content-column">
          <div className="about-header">
            <span 
              ref={subtitleRef}
              className="about-label"
              style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
            >
              О пространстве
            </span>
            <h2 
              ref={titleRef} 
              className="about-title"
              style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
            >
              ART-Space
            </h2>
            <p 
              ref={descriptionRef} 
              className="about-description"
              style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
            >
              Международный выставочный комплекс — это уникальное культурное пространство 
              в сердце Москвы, где искусство со всего мира встречается с ценителями прекрасного. 
              Мы создаём незабываемый опыт погружения в мир современного и классического искусства.
            </p>
          </div>

          {/* Stats */}
          <div className="about-stats">
            {stats.map((stat, index) => (
              <div 
                key={index}
                ref={el => statsRef.current[index] = el}
                className="about-stat-item"
                style={isMobile ? { opacity: 1, transform: 'scale(1)' } : {}}
              >
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="about-features">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                ref={el => cardsRef.current[index] = el}
                className="about-feature-card"
                style={isMobile ? { opacity: 1, transform: 'translateY(0) rotateX(0)' } : {}}
              >
                <div className="about-feature-icon">{feature.icon}</div>
                <div className="about-feature-content">
                  <h3 className="about-feature-title">{feature.title}</h3>
                  <p className="about-feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div 
            ref={ctaRef}
            className="about-cta"
            style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
          >
            <Link href="/events" className="about-cta-button">
              <span>Смотреть выставки</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <div className="about-location-info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
              </svg>
              <span>Москва, Тверская 9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      {!isMobile && (
        <>
          <div className="about-decoration">
            <div className="about-decoration-grid"></div>
            <div className="about-decoration-circle about-decoration-circle--1"></div>
            <div className="about-decoration-circle about-decoration-circle--2"></div>
          </div>
          
          <div className="about-floating-elements">
            <div className="about-floating-element about-floating-element--1"></div>
            <div className="about-floating-element about-floating-element--2"></div>
            <div className="about-floating-element about-floating-element--3"></div>
          </div>
        </>
      )}
    </section>
  );
}
