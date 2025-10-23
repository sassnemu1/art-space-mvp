"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import './TimelineSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection({ 
  id = "timeline-section",
  label = "Календарь событий",
  title = "Выставки 2025",
  subtitle = "Исследуйте наши предстоящие выставки и культурные события",
  exhibitions = []
}) {
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const backgroundsRef = useRef([]);
  
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    const progressLine = progressLineRef.current;
    const items = timelineItemsRef.current.filter(Boolean);
    const backgrounds = backgroundsRef.current.filter(Boolean);
    
    if (!section || !progressLine || items.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop анимация
    mm.add("(min-width: 769px)", () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300vh",
        pin: true,
        anticipatePin: 1,
      });

      gsap.fromTo(progressLine, {
        scaleY: 0,
        transformOrigin: "top center"
      }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300vh",
          scrub: 0.5,
        }
      });

      // Анимация фонов
      backgrounds.forEach((bg, index) => {
        gsap.set(bg, { opacity: index === 0 ? 1 : 0 });
        
        if (index > 0) {
          const startProgress = (index - 0.5) * 0.22;
          const endProgress = index * 0.22;
          
          gsap.fromTo(bg, 
            { opacity: 0 },
            { 
              opacity: 1,
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=300vh",
                scrub: 1,
                onUpdate: (self) => {
                  const progress = self.progress;
                  if (progress >= startProgress && progress <= endProgress) {
                    const localProgress = (progress - startProgress) / (endProgress - startProgress);
                    bg.style.opacity = localProgress;
                  } else if (progress > endProgress) {
                    bg.style.opacity = 1;
                  } else {
                    bg.style.opacity = 0;
                  }
                }
              }
            }
          );
        }
      });

      // Анимация карточек
      items.forEach((item, index) => {
        const card = item.querySelector('.timeline-card');
        const dot = item.querySelector('.timeline-dot');
        const date = item.querySelector('.timeline-date');
        const content = item.querySelector('.timeline-content');

        gsap.set([card, dot, date], { opacity: 0 });
        gsap.set(card, { 
          x: index % 2 === 0 ? -100 : 100,
          scale: 0.8 
        });
        gsap.set(dot, { scale: 0 });
        gsap.set(date, { 
          x: index % 2 === 0 ? 50 : -50 
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300vh",
            scrub: 0.8,
          }
        });

        const startProgress = index * 0.22;

        tl
          .to(dot, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(2)"
          }, startProgress)
          .to(date, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out"
          }, startProgress + 0.1)
          .to(card, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out"
          }, startProgress + 0.2)
          .fromTo(content.querySelectorAll('.animate-in'),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out"
            },
            startProgress + 0.4
          );
      });
    });

    // Мобильная версия - полностью статичная без анимаций
    mm.add("(max-width: 768px)", () => {
      // Ничего не делаем - все элементы сразу видимы через CSS
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [exhibitions, isMobile] });

  if (!exhibitions || exhibitions.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} id={id} className="timeline-section">
      {/* Фоны для каждой выставки */}
      <div className="timeline-backgrounds">
        {exhibitions.map((exhibition, index) => (
          <div 
            key={`bg-${exhibition.id || index}`}
            ref={el => backgroundsRef.current[index] = el}
            className="timeline-background-layer"
            style={{
              backgroundImage: exhibition.image 
                ? `url(${exhibition.image})` 
                : 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
              // На мобильных показываем только первый фон
              ...(isMobile && index === 0 ? { opacity: 1 } : {}),
              ...(isMobile && index > 0 ? { display: 'none' } : {})
            }}
          >
            <div className="timeline-background-overlay"></div>
          </div>
        ))}
      </div>

      <div className="timeline-container">
        {/* Заголовок секции */}
        <div 
          className="timeline-header"
          style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
        >
          {label && <span className="timeline-label">{label}</span>}
          {title && <h2 className="timeline-title">{title}</h2>}
          {subtitle && <p className="timeline-subtitle">{subtitle}</p>}
        </div>

        {/* Прогресс-линия */}
        <div className="timeline-progress">
          <div 
            ref={progressLineRef} 
            className="timeline-progress-line"
            style={isMobile ? { transform: 'scaleY(1)', transformOrigin: 'top center' } : {}}
          ></div>
        </div>

        {/* Список выставок */}
        <div className="timeline-list">
          {exhibitions.map((exhibition, index) => (
            <div 
              key={exhibition.id || index}
              ref={el => timelineItemsRef.current[index] = el}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
              style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
            >
              {/* Дата */}
              <div 
                className="timeline-date"
                style={isMobile ? { opacity: 1, transform: 'translateX(0)' } : {}}
              >
                <span className="timeline-date-text">{exhibition.dates}</span>
                {exhibition.year && <span className="timeline-year">{exhibition.year}</span>}
              </div>

              {/* Точка на линии - с pulse анимацией на всех устройствах */}
              <div 
                className="timeline-dot"
                style={isMobile ? { opacity: 1, transform: 'scale(1)' } : {}}
              >
                <div className="timeline-dot-inner"></div>
                <div className="timeline-dot-pulse"></div>
              </div>

              {/* Карточка выставки */}
              <div 
                className="timeline-card"
                style={isMobile ? { opacity: 1, transform: 'translateX(0) scale(1)' } : {}}
              >
                <div className="timeline-card-background">
                  {exhibition.image ? (
                    <img 
                      src={exhibition.image} 
                      alt={exhibition.title}
                      className="timeline-card-bg-image"
                      loading={isMobile ? "lazy" : "eager"}
                    />
                  ) : (
                    <div className="timeline-card-bg-placeholder"></div>
                  )}
                  <div className="timeline-card-bg-overlay"></div>
                </div>

                {exhibition.category && (
                  <div className="timeline-card-category">{exhibition.category}</div>
                )}
                
                <div 
                  className="timeline-content timeline-content--blur"
                  style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
                >
                  <h3 
                    className="timeline-card-title animate-in"
                    style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
                  >
                    {exhibition.title}
                  </h3>
                  {exhibition.description && (
                    <p 
                      className="timeline-card-description animate-in"
                      style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
                    >
                      {exhibition.description}
                    </p>
                  )}
                  <div 
                    className="timeline-card-meta animate-in"
                    style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
                  >
                    {exhibition.dates && (
                      <span className="timeline-meta-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 11.59 4.41 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5ZM8 13C5.24 13 3 10.76 3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13Z" fill="currentColor"/>
                          <path d="M8.5 5H7.5V8.5H11V7.5H8.5V5Z" fill="currentColor"/>
                        </svg>
                        {exhibition.dates}
                      </span>
                    )}
                    {exhibition.location && (
                      <span className="timeline-meta-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1C5.24 1 3 3.24 3 6C3 9 8 15 8 15C8 15 13 9 13 6C13 3.24 10.76 1 8 1ZM8 7.5C7.17 7.5 6.5 6.83 6.5 6C6.5 5.17 7.17 4.5 8 4.5C8.83 4.5 9.5 5.17 9.5 6C9.5 6.83 8.83 7.5 8 7.5Z" fill="currentColor"/>
                        </svg>
                        {exhibition.location}
                      </span>
                    )}
                  </div>
                  {exhibition.link && (
                    <a 
                      href={exhibition.link} 
                      className="timeline-card-button animate-in"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={isMobile ? { opacity: 1, transform: 'translateY(0)' } : {}}
                    >
                      Подробнее
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Декоративные элементы - теперь показываем на всех устройствах */}
      <div className="timeline-decoration">
        <div className="timeline-decoration-circle timeline-decoration-circle--1"></div>
        <div className="timeline-decoration-circle timeline-decoration-circle--2"></div>
        <div className="timeline-decoration-circle timeline-decoration-circle--3"></div>
      </div>
    </section>
  );
}
