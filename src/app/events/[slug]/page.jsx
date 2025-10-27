"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import './event-detail.css';


const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  loading: () => null,
  ssr: true
});

// База данных событий
const eventsData = {
  'kusto': {
    id: 1,
    type: 'exhibition',
    title: "Капитан Кусто в России",
    subtitle: "Легендарный океанограф и его экспедиции",
    date: "24 октября - 30 ноября 2025",
    time: "Ежедневно с 10:00 до 20:00",
    location: "4 этаж, главный зал",
    image: "/exhibitions/kusto-v-rossii.png",
    description: `Впервые в России представлены экспонаты из семейной коллекции Франсин Кусто (Франция). 
    
Жак-Ив Кусто — легендарный французский океанограф, исследователь и изобретатель, посвятивший свою жизнь изучению подводного мира. Его работы изменили представление человечества о Мировом океане.

Выставка представляет уникальную возможность познакомиться с личными вещами, документами и изобретениями великого исследователя.`,
    
    highlights: [
      {
        title: "Предметы из экспедиций",
        description: "Оригинальные предметы, использовавшиеся командой Кусто во время легендарных морских экспедиций на судне Калипсо"
      },
      {
        title: "Изобретения Кусто",
        description: "Акваланг, подводные камеры и другие революционные изобретения, изменившие подводную съемку"
      },
      {
        title: "Редкие фотографии",
        description: "Уникальные снимки подводного мира и картины, написанные художниками под водой"
      },
      {
        title: "Документальные материалы",
        description: "Личные дневники, карты экспедиций и документы из архива семьи Кусто"
      }
    ],

    tickets: "https://tickets.art-space.world/#events",

    // Закомментировано для будущего использования
    // program: [
    //   {
    //     day: "Понедельник - Пятница",
    //     events: [
    //       { time: "14:00", title: "Экскурсия с гидом", duration: "45 мин" },
    //       { time: "17:00", title: "Документальный фильм", duration: "60 мин" }
    //     ]
    //   },
    //   {
    //     day: "Суббота - Воскресенье",
    //     events: [
    //       { time: "12:00", title: "Экскурсия с гидом", duration: "45 мин" },
    //       { time: "15:00", title: "Мастер-класс для детей", duration: "90 мин" },
    //       { time: "18:00", title: "Документальный фильм", duration: "60 мин" }
    //     ]
    //   }
    // ],

    // curator: {
    //   name: "Франсин Кусто",
    //   role: "Куратор выставки",
    //   bio: "Внучка легендарного океанографа Жака-Ива Кусто, продолжает дело своего деда по исследованию и защите Мирового океана"
    // },
  },

  'ai-summit': {
    id: 2,
    type: 'exhibition',
    title: "AI SUMMIT Creative",
    subtitle: "Искусственный интеллект и цифровое искусство",
    date: "30 октября – 6 ноября 2025",
    time: "Ежедневно с 10:00 до 22:00",
    location: "Все этажи комплекса",
    image: "/exhibitions/ai-summit.png",
    description: `Масштабное событие, посвященное искусственному интеллекту и его влиянию на искусство, бизнес и общество.

Весь комплекс МВК Art-Space трансформируется в иммерсивное путешествие по миру ИИ. Каждый этаж посвящен отдельной теме.`,

    highlights: [
      {
        title: "Лекции от экспертов",
        description: "Ольга Ускова (Cognitive Pilot), Александр Байкин (PRO Robots) и другие лидеры индустрии"
      },
      {
        title: "Интерактивные зоны",
        description: "Брендированные зоны от ведущих tech-компаний с демонстрацией флагманских продуктов"
      },
      {
        title: "AI Immersion Chamber",
        description: "Погружение в цифровые миры и нейросетевые визуализации"
      },
      {
        title: "VR/AR Лаборатория",
        description: "Портал в смешанную реальность с тестированием последних разработок"
      }
    ],

    tickets: "https://tickets.art-space.world/#events"
  },

  'tri-vostoka': {
    id: 3,
    type: 'exhibition',
    title: "Три Востока",
    subtitle: "Культурные традиции Китая, Японии и Индии",
    date: "20 ноября – 6 декабря 2025",
    time: "Ежедневно с 11:00 до 19:00",
    location: "3 этаж",
    image: "/exhibitions/tri-vostoka.png",
    description: `Экспозиция приглашает в увлекательное путешествие по культурным традициям трех великих восточных цивилизаций.

Выставка исследует влияние восточных философий на искусство, каллиграфию как медитативную практику и минималистичные созерцательные пространства.`,

    highlights: [
      {
        title: "Восточные философии",
        description: "Влияние буддизма, даосизма и индуизма на искусство и поиск гармонии"
      },
      {
        title: "Искусство каллиграфии",
        description: "Каллиграфия как медитативная практика и язык символов"
      },
      {
        title: "Дзен-пространства",
        description: "Минимализм, асимметрия и созерцательные композиции"
      }
    ],

    tickets: "https://tickets.art-space.world/#events"
  },

  'lecture-kino-foto': {
    id: 4,
    type: 'event',
    title: "Кино и фотография как язык общения с миром",
    subtitle: "Лекция в рамках выставки о Жаке-Иве Кусто",
    date: "28 октября 2025",
    time: "19:00 - 21:00",
    location: "Лекторий, 2 этаж",
    image: "/assets/news/news-2.webp",
    description: `
Друзья!

В рамках выставки, посвященной легендарному океанографу и исследователю Жаку-Иву Кусто, в галерее будут проходить лекции и организованные бесплатные экскурсии.

Наш тематический лекторий в галерее откроет гость из Нидерландов - наш замечательный друг, член Клуба 5 Океанов Брам ван Спенген лекцией на тему «Кино и фотография как язык общения с миром».

Если Кусто исследовал океан и рассказывал о нем миллионам зрителей, то современный документалист и фотограф Брам продолжает его миссию, помогая нам увидеть планету глазами других людей, понять разные культуры и услышать истории, которые звучат через объектив камеры.

Брам ван Спенген - искатель приключений, чья камера побывала в самых отдаленных и экстремальных уголках планеты. 

Побывав более чем в 150 странах, он запечатлел жизнь на всех океанах и континентах - от самых сложных морских соревнований в мире до портретов изолированных племен в пустынях Намибии.

Брам поделится тем, что побуждало его снимать в непростых условиях - в стенах бразильских тюрем, в самом сердце зон конфликта в Конго, где он работал бок о бок с повстанцами, и в глубине дикой природы, куда редко ступает человек.

🗓 28 октября, 19:00

🏛 Галерея Art Space, Москва, Тверская, 9

🎟 Вход свободный`,

    highlights: [
      {
        title: "История подводной съемки",
        description: "От первых экспериментов до современных технологий"
      },
      {
        title: "Техники Кусто",
        description: "Изобретения и методы легендарного океанографа"
      }
    ],

    tickets: "https://forms.yandex.ru/cloud/68f8ce79068ff02d79e3f0c9/"
  },

  'in-pulse-ai': {
    id: 5,
    type: 'event',
    title: "In Pulse ИИ Автоматизации",
    subtitle: "Конференция для бизнеса и разработчиков",
    date: "6 ноября 2025",
    time: "18:00 - 22:00",
    location: "Конференц-зал",
    image: "/assets/news/news-3.webp",
    description: `
Что происходит, когда интеллект становится не только творческим, но и исполнительным?

🌟 6 ноября в культурно-технологическом пространстве Art-Space пройдёт событие:

In Pulse ИИ Автоматизации в рамках AI Summit Creative.

`,

    highlights: [
      {
        title: "Погружение в мир ИИ.",
        description: "Четырёхэтажное иммерсивное погружение в мир ИИ."
      },
      {
        title: "Интерактивные зоны для тестирования технологий будущего",
        description: " "
      },
      {
        title: "Демонстрации ИИ-ботов",
        description: "Демонстрации ИИ-ботов и примеры автоматизации бизнес-процессов"
      },
      {
        title: "Панели и мастер-классы с экспертами индустрии",
        description: " "
      }
    ],

    tickets: "https://tickets.art-space.world/#events"
  }
};

export default function EventDetailPage({ params }) {
  const resolvedParams = use(params);
  const event = eventsData[resolvedParams.slug];

  if (!event) {
    notFound();
  }

  return (
    <main className="event-detail-page">
      {/* Hero */}
      <section className="event-detail-hero">
        <div className="event-detail-hero-bg" style={{ backgroundImage: `url(${event.image})` }}></div>
        <div className="event-detail-hero-overlay"></div>
        <div className="event-detail-hero-content">
          <Link href="/events" className="event-detail-back">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Назад к событиям
          </Link>
          <span className="event-detail-badge">{event.type === 'exhibition' ? 'Выставка' : 'Мероприятие'}</span>
          <h1 className="event-detail-title">{event.title}</h1>
          <p className="event-detail-subtitle">{event.subtitle}</p>
        </div>
      </section>

      {/* Info Bar */}
      <section className="event-info-bar">
        <div className="event-info-container">
          <div className="event-info-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="event-info-label">Даты</div>
              <div className="event-info-value">{event.date}</div>
            </div>
          </div>

          <div className="event-info-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="event-info-label">Время</div>
              <div className="event-info-value">{event.time}</div>
            </div>
          </div>

          <div className="event-info-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="event-info-label">Место</div>
              <div className="event-info-value">{event.location}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="event-detail-content">
        <div className="event-detail-container">
          <div className="event-detail-main">
            {/* Description */}
            <div className="content-block">
              <h2 className="content-block-title">О событии</h2>
              <div className="content-block-text">
                {event.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            {event.highlights && (
              <div className="content-block">
                <h2 className="content-block-title">Что вас ждет</h2>
                <div className="highlights-grid">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-card">
                      <h3 className="highlight-title">{highlight.title}</h3>
                      <p className="highlight-description">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Program - ЗАКОММЕНТИРОВАНО */}
            {/* {event.program && (
              <div className="content-block">
                <h2 className="content-block-title">Программа</h2>
                <div className="program-list">
                  {event.program.map((day, idx) => (
                    <div key={idx} className="program-day">
                      <h3 className="program-day-title">{day.day}</h3>
                      <div className="program-events">
                        {day.events.map((evt, evtIdx) => (
                          <div key={evtIdx} className="program-event">
                            <div className="program-event-time">{evt.time}</div>
                            <div className="program-event-content">
                              <div className="program-event-title">{evt.title}</div>
                              <div className="program-event-duration">{evt.duration}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Curator - ЗАКОММЕНТИРОВАНО */}
            {/* {event.curator && (
              <div className="content-block">
                <h2 className="content-block-title">Куратор</h2>
                <div className="curator-card">
                  <div className="curator-info">
                    <h3 className="curator-name">{event.curator.name}</h3>
                    <div className="curator-role">{event.curator.role}</div>
                    <p className="curator-bio">{event.curator.bio}</p>
                  </div>
                </div>
              </div>
            )} */}
          </div>

          {/* Sidebar */}
          <aside className="event-detail-sidebar">
            <div className="sidebar-sticky">
              {/* Tickets - БЕЗ ЦЕНЫ */}
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Забронировать место</h3>
                <a href={event.tickets} className="sidebar-cta-btn">
                  Купить билет
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Share */}
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Поделиться</h3>
                <div className="share-buttons">
                  <button className="share-btn" title="VK">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.17 14.63h-1.15c-.68 0-.89-.54-2.11-1.76-.75-.71-1.08-.81-1.27-.81-.26 0-.33.07-.33.42v1.61c0 .43-.14.69-1.27.69-1.87 0-3.94-1.13-5.4-3.24-2.19-3-2.79-5.26-2.79-5.71 0-.19.07-.37.42-.37h1.15c.31 0 .43.14.55.47.65 1.83 1.74 3.44 2.19 3.44.17 0 .24-.08.24-.5v-1.97c-.06-.98-.58-1.06-.58-1.41 0-.15.13-.3.33-.3h1.8c.26 0 .35.14.35.44v2.67c0 .26.11.35.19.35.17 0 .3-.09.6-.39 1.03-1.16 1.77-2.96 1.77-2.96.09-.21.24-.37.55-.37h1.15c.37 0 .45.19.37.44-.17.75-1.83 3.11-1.83 3.11-.14.23-.17.33 0 .59.13.18.54.53.82.85.75.86 1.31 1.57 1.46 2.07.14.49-.08.74-.55.74z"/>
                    </svg>
                  </button>
                  <button className="share-btn" title="Telegram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.52-.47-.01-1.38-.27-2.05-.49-.82-.27-1.47-.42-1.42-.88.03-.24.37-.48 1.02-.73 4-1.74 6.68-2.88 8.03-3.43 3.82-1.59 4.62-1.87 5.14-1.87.11 0 .37.03.54.17.14.12.18.28.2.39-.01.06.01.24 0 .38z"/>
                    </svg>
                  </button>
                  <button className="share-btn" title="WhatsApp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
