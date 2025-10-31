import { Geist, Geist_Mono } from "next/font/google";
import ScrollSmootherWrapper from '../components/ScrollSmootherWrapper';

import { Tektur } from 'next/font/google';

import "./globals.css";

// import LoaderGate from "@/components/Loading/LoaderGate/LoaderGate";
import Navbar from '@/components/Navbar/Navbar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = { 
  title: "ART SPACE — Международный выставочный центр", 
  description: "Главная площадка современного искусства в Москве. Тверская, 9.",
  keywords: [
    "ART Space",
    "art space",
    "art space тверская",
    "art space москва",
    "галереи москвы",
    "третьяковская галерея москва",
    "галерея москва сайт",
    "галерея москва официальный",
    "галерея москва официальный сайт",
    "государственные галереи москвы",
    "галерея картин в москве",
    "галерея искусств москва",
    "выставочный центр Москва",
    "современное искусство",
    "арт галерея Москва",
    "выставки 2025",
    "ART-SPACE выставки",
    "галерея современного искусства",
    "Московская неделя искусств",
    "выставки Москва Тверская 9",
    "цифровое искусство Москва",
    "международный выставочный комплекс Москва",
    "аренда площадки для выставки Москва",
    "галерея современного искусства Тверская",
    "экспозиция современного искусства Москва",
    "международная арт‑выставка Москва",
    "арт‑мероприятие Москва Тверская 9",
    "лекции Москва",
    "конференция Москва",
  ],
  openGraph: {
    title: "ART SPACE — Международный выставочный центр",
    description: "Главная площадка современного искусства в Москве. Тверская, 9.",
    url: "https://art-space.site",
    siteName: "ART SPACE",
    images: [
      {
        url: "https://art-space.site/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ART SPACE — Международный выставочный центр",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ART SPACE — Международный выставочный центр",
    description: "Главная площадка современного искусства в Москве.",
    images: ["https://art-space.site/og-image.jpg"],
  },
};

const tektur = Tektur({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  display: 'swap',
  variable: '--font-tektur'
});


export default function RootLayout({ children }) {  
  return (
    <html lang="ru-RU">
      <head>
        <meta name="keywords" content="ART SPACE, выставочный центр Москва, современное искусство, арт галерея Москва" />

        {/* Favicon и Touch Icons */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-title" content="ART-Space" />
        <link rel="manifest" href="/manifest.json" />

        {/* SEO и JSON-LD */}
        <link rel="canonical" href="https://art-space.site/" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ART SPACE",
          url: "https://art-space.site",
          logo: "https://art-space.site/logo.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Тверская, 9",
            addressLocality: "Москва",
            addressCountry: "RU",
          },
        })}} />
        
        {/* Yandex Отслеживание и Google Search*/}
        <meta name="yandex-verification" content="b8aa8062e017e490" />
        <meta name="google-site-verification" content="pTRVR2444HOGBjHFowrOD_I8bs8kuYc2ExacJWdi2lg" />
</head>

      <body className={`${geistSans.variable} ${geistMono.variable} ${tektur.variable}`}>
        {/* <LoaderGate /> */}
        <Navbar />
        <ScrollSmootherWrapper>
          {children}
        </ScrollSmootherWrapper>
      </body>
    </html>
  );
}
