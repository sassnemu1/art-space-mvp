import HeroSection from '../components/HeroSection';
import ContentSection from '../components/HomePage/ContentSection/ContentSection';
import TimelineSection from '@/components/HomePage/TimelineSection/TimelineSection';
import VeraAwardSection from '@/components/HomePage/VeraAwardSection/VeraAwardSection';
import Footer from '@/components/Footer/Footer';
import NewsSection from '@/components/HomePage/NewsSection/NewsSection';

// import LoaderGate from "@/components/Loading/LoaderGate/LoaderGate";

// import { getHomePageData, testWordPressConnection } from '../lib/wordpress';

// Загрузка данных из WordPress
// async function getPageData() {
//   // Проверяем соединение
//   const isConnected = await testWordPressConnection();
//   if (!isConnected) {
//     return null;
//   }
//   return await getHomePageData();
// }

// ✅ Данные выставок
const exhibitionsData = [
  {
    id: 1,
    title: "Капитан Кусто в России",
    dates: "24.10 - 30.11",
    year: "2025",
    description: "Экспонаты из семейной коллекции Франсин Кусто (Франция)",
    image: "/exhibitions/kusto-v-rossii.png",
    category: "Историческое событие",
    location: "4 Этаж",
    link: "/events/kusto/"
  },
  {
    id: 2,
    title: "AI Summit Creative",
    dates: "30.10 - 6.11",
    year: "2025",
    description: "Выставка цифрового искусства, созданного с использованием AI.",
    image: "/exhibitions/ai-summit.png",
    category: "AI Конфиренция",
    location: "Все залы",
    link: "/events/ai-summit"
  },
  {
    id: 3,
    title: "In Pulse ИИ Автоматизации",
    dates: "6.11",
    year: "2025",
    description: "Конференция для тех, кто внедряет ИИ, экономит бюджеты и развивает бизнес. Практические кейсы и нетворкинг.",
    image: "/assets/news/news-3.webp",
    category: "Конференция",
    location: "Все залы",
    link: "/events/in-pulse-ai/"
  },
  {
    id: 4,
    title: "Три Востока",
    dates: "20.11 - 6.12",
    year: "2025",
    description: "Масштабная выставка культурного наследия Востока.",
    image: "/exhibitions/tri-vostoka.png",
    category: "Культурное наследие",
    location: "3 этаж",
    link: "/events/tri-vostoka/"
  }
];

export default async function HomePage() {

  // const homeData = await getPageData();
  const data = {
    mode: 'sequence',
    frameCount: 280
  }


  // const data = homeData || fallbackData;
  // const data = homeData 
  return (
    <>
      {/* <HeroSection 
        mode={data.heroFields?.heroMode}
        frameCount={data.heroFields?.heroFrameCount}
      /> */}
      <HeroSection 
        mode={data.mode}
        frameCount={data.frameCount}
      />
      
      <ContentSection
        id="about-section"
      />

      <TimelineSection 
        exhibitions={exhibitionsData}
        label="Календарь событий"
        title="Выставки 2025"
        subtitle="Исследуйте наши предстоящие выставки"
      />

      <VeraAwardSection />

      <NewsSection />
      
      <Footer />
    </>
  );
}

// Настройки статической генерации
export const revalidate = 60; // ISR каждую минуту

// SEO метаданные из WordPress
// export async function generateMetadata() {
//   const homeData = await getPageData();
  
//   return {
//     title: homeData?.seo?.title || 'ART-Space | Искусство будущего',
//     description: homeData?.seo?.metaDesc || 'Цифровое искусство и интерактивные технологии',
//   };
// }
