"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Footer from '@/components/Footer/Footer';

import './events.css';
import Head from "next/head";


export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const exhibitions = [
    {
      id: 1,
      type: 'exhibition',
      title: "Капитан Кусто в России",
      date: "24 октября - 30 ноября 2025",
      shortDate: "24.10 - 30.11",
      description: "Впервые в России — экспонаты из семейной коллекции Франсин Кусто (Франция). Уникальная возможность увидеть предметы из легендарных экспедиций.",
      image: "/exhibitions/kusto-v-rossii.webp",
      highlights: [
        "Предметы из легендарных экспедиций команды Кусто",
        "Изобретения великого исследователя",
        "Редкие фотографии и картины, написанные под водой"
      ],
      category: "Выставка",
      link: '/events/kusto'
    },
    {
      id: 2,
      type: 'exhibition',
      title: "AI SUMMIT Creative",
      date: "30 октября – 6 ноября 2025",
      shortDate: "30.10 - 6.11",
      description: "Весь комплекс МВК Art-Space трансформируется в иммерсивное путешествие по миру искусственного интеллекта. Каждый этаж — отдельная тема.",
      image: "/exhibitions/ai-summit.webp",
      highlights: [
        "Лекции и мастер-классы с ведущими экспертами",
        "Интеграция флагманских продуктов от tech-компаний",
        "VR/AR Лаборатория и 3D-печать в реальном времени"
      ],
      category: "Выставка",
      link: '/events/ai-summit'
    },
    {
      id: 3,
      type: 'exhibition',
      title: "Три Востока",
      date: "20 ноября – 6 декабря 2025",
      shortDate: "20.11 - 6.12",
      description: "Путешествие по культурным традициям трех великих цивилизаций: Китая, Японии и Индии. Философия, искусство и созерцание.",
      image: "/exhibitions/tri-vostoka.webp",
      highlights: [
        "Восточные философии и поиск гармонии",
        "Каллиграфия как медитативная практика",
        "Минимализм и созерцательные пространства"
      ],
      category: "Выставка",
      link: '/events/tri-vostoka'
    }
  ];

  const events = [
    {
      id: 4,
      type: 'event',
      title: "Кино и фотография как язык общения с миром",
      date: "28 октября 2025, 19:00",
      shortDate: "28.10, 19:00",
      description: "Лекция в рамках выставки, посвященной Жаку-Иву Кусто. Бесплатный вход с регистрацией.",
      image: "/assets/news/news-2.webp",
      category: "Лекция",
      link: '/events/lecture-kino-foto'
    },
    {
      id: 5,
      type: 'event',
      title: "In Pulse ИИ Автоматизации",
      date: "6 ноября 2025, 18:00",
      shortDate: "6.11, 18:00",
      description: "Конференция для тех, кто внедряет ИИ, экономит бюджеты и развивает бизнес. Практические кейсы и нетворкинг.",
      image: "/assets/news/news-3.webp",
      category: "Конференция",
      link: '/events/in-pulse-ai'
    },
  ];

  const allItems = [...exhibitions, ...events].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  const getFilteredItems = () => {
    switch(activeTab) {
      case 'exhibitions':
        return exhibitions;
      case 'events':
        return events;
      default:
        return allItems;
    }
  };

  const filteredItems = getFilteredItems();

  // ✅ Обработчик смены фильтра с плавным переходом
  const handleTabChange = (tab) => {
    setIsTransitioning(true);
    setActiveTab(tab);
    
    // Небольшая задержка для плавного fade
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // ✅ Пересчёт Footer при смене фильтра
  useEffect(() => {
    // Небольшая задержка чтобы DOM обновился
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <>
    <Head>
      <title>Афиша событий — ART SPACE, Москва</title>
        <meta
          name="description"
          content="Афиша выставок, лекций и конференций в ART SPACE, Тверская 9, Москва. Узнайте обо всех мероприятиях современного искусства."
        />
        <meta
          name="keywords"
          content="
            ART SPACE афиша, 
            выставки Москва, 
            мероприятия ART SPACE, 
            современное искусство Москва, 
            арт события Москва, 
            афиша выставок Москва, 
            лекции ART SPACE, 
            конференции ART SPACE
          "
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Выставки и лекции ART SPACE",
            startDate: "2025-11-01T10:00",
            endDate: "2025-11-30T20:00",
            location: {
              "@type": "Place",
              name: "ART SPACE",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Тверская, 9",
                addressLocality: "Москва",
                addressCountry: "RU",
              },
            },
            image: ["https://art-space.site/images/event-og.jpg"],
            description: "Афиша выставок, лекций и конференций в ART SPACE, Москва.",
            organizer: {
              "@type": "Organization",
              name: "ART SPACE",
              url: "https://art-space.site"
            }
          })}}
        />
    </Head>
    
    <main className="events-page">
      {/* Hero Section */}
      <section className="events-hero">
        <div className="events-hero-bg"></div>
        <div className="events-hero-content">
          <span className="events-hero-badge">Афиша</span>
          <h1 className="events-hero-title">
            События ART-Space
          </h1>
          <p className="events-hero-subtitle">
            Выставки, лекции и мастер-классы в культурно-технологическом пространстве
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="events-filter">
        <div className="events-filter-container">
          <button 
            className={`filter-btn ${activeTab === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => handleTabChange('all')}
          >
            Все события
            <span className="filter-count">{allItems.length}</span>
          </button>
          <button 
            className={`filter-btn ${activeTab === 'exhibitions' ? 'filter-btn--active' : ''}`}
            onClick={() => handleTabChange('exhibitions')}
          >
            Выставки
            <span className="filter-count">{exhibitions.length}</span>
          </button>
          <button 
            className={`filter-btn ${activeTab === 'events' ? 'filter-btn--active' : ''}`}
            onClick={() => handleTabChange('events')}
          >
            Мероприятия
            <span className="filter-count">{events.length}</span>
          </button>
        </div>
      </div>

      {/* Events Grid - с плавным переходом */}
      <section 
        className={`events-grid ${isTransitioning ? 'events-grid--transitioning' : ''}`}
        style={{ minHeight: '600px' }} // ✅ Минимальная высота
      >
        {filteredItems.map((item) => (
          <article key={item.id} className={`event-card event-card--${item.type}`}>
            <Link href={item.link} className="event-card-link">
              <div className="event-card-image">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="event-card-overlay"></div>
                <span className="event-card-category">{item.category}</span>
              </div>

              <div className="event-card-body">
                <div className="event-card-header">
                  <h3 className="event-card-title">{item.title}</h3>
                  <time className="event-card-date">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {item.shortDate}
                  </time>
                </div>

                <p className="event-card-description">{item.description}</p>

                {item.highlights && (
                  <ul className="event-card-highlights">
                    {item.highlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="event-card-footer">
                  <span className="event-card-cta">
                    {item.type === 'exhibition' ? 'Подробнее о выставке' : 'Узнать больше'}
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>

      {/* ✅ Footer с key для пересоздания */}
      <Footer key={activeTab} />
    </main>
    </>
  );
}


