"use client";

import { useRef } from "react";
import dynamic from 'next/dynamic';
import './events.css';

// Lazy load Footer
const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  loading: () => null,
  ssr: true
});

export default function EventsPage() {
  const heroRef = useRef(null);

  const events = [
    {
      id: 1,
      title: "Капитан Кусто в России",
      date: "24 октября - 30 ноября",
      description: "ВПЕРВЫЕ ПРЕДСТАВЛЕНЫ В РОССИИ экспонаты из семейной коллекции Франсин Кусто (Франция)",
      image: "/exhibitions/kusto-v-rossii.png",
      teaser: `Что вас ждет:`,
      key1: 'предметы из легендарных экспедиций команды Кусто',
      key2: 'изобретения великого исследователя',
      key3: 'редкие фотографии и картины, написанные под водой' 
    },
    {
      id: 2,
      title: "AI SUMMIT Creative",
      date: "30 октября – 6 ноября",
      description: "Весь комплекс МВК “Art-Space” будет трансформирован в иммерсивное путешествие по миру ИИ, где каждый этаж посвящен своей теме: от социального и финансового применения ИИ до робототехники и генеративного искусства.",
      image: "/exhibitions/ai-summit.png",
      teaser: `Что вас ждет:`,
      key1: 'Примите участие в лекциях, мастер-классах и панельных дискуссиях с участием ведущих экспертов и лидеров мнений в сфере искусственного интеллекта, таких как Ольга Ускова (Cognitive Pilot) и Александр Байкин (PRO Robots).',
      key2: 'Оцените интеграцию флагманских продуктов от ведущих технологических компаний страны, которые являются нашими стратегическими партнерами. Взаимодействуйте с их разработками в специально созданных брендированных зонах.',
      key3: 'Вы сможете лично протестировать будущее. Погрузитесь в цифровые миры в комнате “AI Immersion Chamber”; испытайте смешанную реальность в VR/AR Лаборатории “Портал в Симулянтность”; наблюдайте за рождением физических объектов из цифрового кода в Лаборатории 3D-печати.' 
    },
    {
      id: 3,
      title: "Три востока",
      date: "20 ноября – 6 декабря",
      description: "Экспозиция приглашает посетителей в увлекательное путешествие по культурным традициям трех великих восточных цивилизаций: Китая, Японии и Индии.",
      image: "/exhibitions/tri-vostoka.png",
      teaser: `Что вас ждет:`,
      key1: 'Влияние восточных философий на искусство и поиск гармонии.',
      key2: 'Каллиграфия как медитативная практика и язык символов.',
      key3: 'Минимализм, асимметрия, созерцательные пространства, вдохновленные дзен-садами.'
    }
  ];

  return (
    <main className="events-page">
      {/* Hero Section */}
      <section ref={heroRef} className="events-hero">
        <div className="events-hero-content">
          <span className="events-hero-label">Предстоящие события</span>
          <h1 className="events-hero-title">
            Выставки <br /> в ART-Space
          </h1>
          <p className="events-hero-description">
            Откройте для себя будущие события нашего пространства. Эксклюзивные показы, лекции и встречи с художниками.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="events-list">
        {events.map((event) => (
          <article key={event.id} className="event-item">
            {/* Блюр фон только на десктопе */}
            <div className="event-blur-bg" style={{ backgroundImage: `url(${event.image})` }} />

            <div className="event-image-wrapper">
              <img 
                src={event.image} 
                alt={event.title} 
                loading="lazy"
                className="event-image"
              />
            </div>

            <div className="event-content">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-date">📅 {event.date}</p>
              <p className="event-description">{event.description}</p>

              <div className="event-teaser">
                <strong> {event.teaser}</strong>
                <ul>
                  <li>{event.key1}</li>
                  <li>{event.key2}</li>
                  <li>{event.key3}</li>
                </ul>
              </div>

              <a href="https://tickets.art-space.world/#events" className="event-cta-btn">
                Забронировать место
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* VIP Opening Section */}
      <section className="vip-opening-section">
        <div className="vip-container">
          <span className="vip-badge">✨ Эксклюзив</span>
          <h2 className="vip-title">Закрытый VIP Открытие</h2>
          <p className="vip-description">
            Мы рады пригласить вас на эксклюзивное VIP открытие наших выставок — уникальное событие с возможностью лично встретиться с художниками, насладиться коктейлями и погрузиться в атмосферу искусства.
          </p>
          <a href="#" className="vip-cta-btn">
            Узнать подробнее
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
