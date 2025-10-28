import { Geist, Geist_Mono } from "next/font/google";
import ScrollSmootherWrapper from '../components/ScrollSmootherWrapper';

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
  title: "ART SPACE", 
  description: "Международный выставочный центр Москва, Тверская, 9" 
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <LoaderGate /> */}
        <Navbar />
        <ScrollSmootherWrapper>
          {children}
        </ScrollSmootherWrapper>
      </body>
    </html>
  );
}
