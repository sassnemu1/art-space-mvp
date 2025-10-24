"use client";

import { useEffect, useState } from "react";
// import { getLatestNews } from '../../../lib/wordpress'

import "./NewsSection.css";

// ✅ Заглушка с фейковыми новостями
const mockNews = [
  {
    id: 1,
    title: "'Капитан Кусто в России': открытие выставки",
    date: "2025-10-20T12:00:00",
    news: {
      newsTitle: "'Капитан Кусто в России': открытие выставки",
      newsDescription2: "Об уникальных экспонатах из семейной коллекции вдовы Жака-Ива Кусто, изобретениях великого исследователя океана, редких фотографиях, сделанных им во время байкальской 'Одиссеи', а также картинах Андре Лабана, написанных под водой, расскажут руководитель Россотрудничества Евгений Примаков, руководитель Клуба 5 океанов Олег Дудкин, президент Cousteau Society и Équipe Cousteau, вдова Жака-Ива Кусто Франсин Кусто, управляющая Московским общественным фондом поддержки культуры и развития современного искусства Алла Карпенко, руководитель выставочного одела Музея Мирового океана Марина Королева и архивист Ассоциации Кусто Франк Машю",
      newsImage: {
        node: {
          sourceUrl: "/assets/news/news-1.webp",
          altText: "Современное искусство"
        }
      }
    }
  },
  {
    id: 2,
    title: "Мастер-класс от известного скульптора",
    date: "2025-10-18T14:00:00",
    news: {
      newsTitle: "28.10 19:00 | Лекция: КИНО И ФОТОГРАФИЯ КАК ЯЗЫК ОБЩЕНИЯ С МИРОМ",
      newsDescription2: "В рамках выставки, посвященной легендарному океанографу и исследователю Жаку-Иву Кусто, в галерее будут проходить лекции и организованные бесплатные экскурсии.",
      newsImage: {
        node: {
          sourceUrl: "/assets/news/news-2.webp",
          altText: "Мастер-класс"
        }
      }
    }
  },
  {
    id: 3,
    title: "6 ноября в культурно-технологическом пространстве Art-Space пройдёт событие: In Pulse ИИ Автоматизации",
    date: "2025-10-15T18:00:00",
    news: {
      newsTitle: "6 ноября в культурно-технологическом пространстве Art-Space пройдёт событие: In Pulse ИИ Автоматизации",
      newsDescription2: `6 ноября на In Pulse: ИИ Автоматизации мы соберём тех, кто не просто говорит об ИИ — они внедряют его, экономят бюджеты и снимают бизнес с ручника.Будем показывать, считать, обсуждать и спорить.`,
      newsImage: {
        node: {
          sourceUrl: "/assets/news/news-3.webp",
          altText: "Ночь музеев"
        }
      }
    }
  },
  {
    id: 4,
    title: "Анонс: В июне 2026 года пройдёт Московская международная неделя искусств",
    date: "2025-10-12T16:00:00",
    news: {
      newsTitle: "Московская международная неделя искусств",
      newsDescription2: "Московский общественный фонд поддержки культуры и развития современного искусства анонсирует Московскую международную неделю искусств в июне 2026 года",
      newsImage: {
        node: {
          sourceUrl: "/assets/news/news-4.webp",
          altText: "Московская международная неделя искусств"
        }
      }
    }
  },
  // {
  //   id: 5,
  //   title: "Открытие детской творческой студии",
  //   date: "2025-10-10T10:00:00",
  //   news: {
  //     newsTitle: "Открытие детской творческой студии",
  //     newsDescription2: "Новое пространство для юных художников. Занятия проводят профессиональные педагоги.",
  //     newsImage: {
  //       node: {
  //         sourceUrl: "/assets/news/news-5.webp",
  //         altText: "Детская студия"
  //       }
  //     }
  //   }
  // },
  // {
  //   id: 6,
  //   title: "Выставка фотографии 'Городские истории'",
  //   date: "2025-10-08T12:00:00",
  //   news: {
  //     newsTitle: "Выставка фотографии 'Городские истории'",
  //     newsDescription2: "Проект, посвященный жизни современного мегаполиса глазами талантливых фотографов.",
  //     newsImage: {
  //       node: {
  //         sourceUrl: "/assets/news/news-6.webp",
  //         altText: "Фотовыставка"
  //       }
  //     }
  //   }
  // }
];

export default function NewsSection() {
  const [posts, setPosts] = useState(mockNews); // ✅ Начинаем с заглушки
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const data = await getLatestNews();
        
  //       // ✅ Если данные пришли, заменяем заглушку
  //       if (data && data.length > 0) {
  //         setPosts(data);
  //         setError(false);
  //       } else {
  //         // ✅ Если данных нет, оставляем заглушку
  //         setError(true);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching news:', err);
  //       setError(true);
  //       // ✅ При ошибке оставляем заглушку
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
    
  //   fetchData();
  // }, []);

  return (
    <section className="news-section">
      <div className="news-section-header">
        <h2 className="news-title">Новости ART‑Space</h2>
        <p className="news-subtitle">
          {error ? "Демонстрационные новости (backend недоступен)" : "Актуальные события и инсайды галереи"}
        </p>
      </div>

      {/* ✅ Индикатор загрузки (опционально) */}
      {loading && posts.length === 0 && (
        <div className="news-loading">
          <div className="news-loading-spinner"></div>
          <p>Загрузка новостей...</p>
        </div>
      )}

      <div className="news-list">
        {posts.map((post, idx) => {
          const isFirst = idx === 0 || idx === 3;
          return (
            <a
              href="#"
              key={post.id}
              className={`minimal-news-card ${isFirst ? "news-card--double" : ""}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.news?.newsImage?.node?.sourceUrl && (
                <img
                  className="minimal-news-image"
                  src={post.news.newsImage.node.sourceUrl}
                  alt={post.news.newsImage.node.altText || post.news.newsTitle || post.title}
                  loading="lazy"
                />
              )}
              <div className="minimal-news-content">
                <h3 className="minimal-news-title">{post.news?.newsTitle || post.title}</h3>
                <div className="minimal-news-excerpt">{post.news?.newsDescription2 || ""}</div>
                <span className="minimal-news-date">
                  {new Date(post.date ?? Date.now()).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
