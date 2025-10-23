import { Geist, Geist_Mono } from "next/font/google";
import ScrollSmootherWrapper from '../components/ScrollSmootherWrapper';

import "./globals.css";

import Navbar from '@/components/Navbar/Navbar'
import Loading from "@/components/Loading/Loading";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = { 
  title: "ART-Space Landing", 
  description: "Scroll-driven hero" 
};

export default function RootLayout({ children }) {

  // const criticalImages = [
  //   // Первые кадры вашей видео-последовательности из ContentSection
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-content/uploads/seq_afrika/output_2310.webp`,
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-content/uploads/seq_afrika/output_2311.webp`,
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-content/uploads/seq_afrika/output_2312.webp`,
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-content/uploads/seq_afrika/output_2313.webp`,
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-content/uploads/seq_afrika/output_2314.webp`,
  //   // Добавьте другие критичные изображения, если есть
  // ];

  
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Tektur:wght@500;700;800&display=swap" rel="stylesheet" />
        {/* <link rel="preload" as="image" href="/seq/output_0001.webp" imageSrcSet="/seq/output_0001.webp" /> */}

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <Loading images={criticalImages} minLoadTime={2000}/> */}
        <Navbar />
        <ScrollSmootherWrapper>
          {children}
        </ScrollSmootherWrapper>
      </body>
    </html>
  );
}
