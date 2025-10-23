"use client";

import { useEffect, useState } from "react";
// import { getLatestNews } from '../../../lib/wordpress'

import "./NewsSection.css";

// ✅ Заглушка с фейковыми новостями
const mockNews = [
  {
    id: 1,
    title: "Открытие новой выставки современного искусства",
    date: "2025-10-20T12:00:00",
    news: {
      newsTitle: "Открытие новой выставки современного искусства",
      newsDescription2: "В ART-Space представлена уникальная коллекция работ современных художников из 15 стран мира. Выставка продлится до конца года.",
      newsImage: {
        node: {
          sourceUrl: "/seq/output_0001.webp",
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
      newsTitle: "Мастер-класс от известного скульптора",
      newsDescription2: "Приглашаем на эксклюзивный мастер-класс, где вы познакомитесь с техниками современной скульптуры.",
      newsImage: {
        node: {
          sourceUrl: "/seq/output_0001.webp",
          altText: "Мастер-класс"
        }
      }
    }
  },
  {
    id: 3,
    title: "Ночь музеев в ART-Space",
    date: "2025-10-15T18:00:00",
    news: {
      newsTitle: "Ночь музеев в ART-Space",
      newsDescription2: "Специальное мероприятие с бесплатным входом, экскурсиями и живой музыкой. Не пропустите!",
      newsImage: {
        node: {
          sourceUrl: "/seq/output_0001.webp",
          altText: "Ночь музеев"
        }
      }
    }
  },
  {
    id: 4,
    title: "Лекция о digital art и NFT",
    date: "2025-10-12T16:00:00",
    news: {
      newsTitle: "Лекция о digital art и NFT",
      newsDescription2: "Погружение в мир цифрового искусства и блокчейн-технологий. Встреча с ведущими экспертами индустрии.",
      newsImage: {
        node: {
          sourceUrl: "/seq/output_0001.webp",
          altText: "Digital Art"
        }
      }
    }
  },
  {
    id: 5,
    title: "Открытие детской творческой студии",
    date: "2025-10-10T10:00:00",
    news: {
      newsTitle: "Открытие детской творческой студии",
      newsDescription2: "Новое пространство для юных художников. Занятия проводят профессиональные педагоги.",
      newsImage: {
        node: {
          sourceUrl: "/seq/output_0001.webp",
          altText: "Детская студия"
        }
      }
    }
  },
  {
    id: 6,
    title: "Выставка фотографии 'Городские истории'",
    date: "2025-10-08T12:00:00",
    news: {
      newsTitle: "Выставка фотографии 'Городские истории'",
      newsDescription2: "Проект, посвященный жизни современного мегаполиса глазами талантливых фотографов.",
      newsImage: {
        node: {
          sourceUrl: "/seq/output_0001.webp",
          altText: "Фотовыставка"
        }
      }
    }
  }
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
