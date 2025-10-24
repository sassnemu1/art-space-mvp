"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(footer.querySelector('.footer-content'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: footerRef });

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Логотип и описание */}
          <div className="footer-brand">
            <h2 className="footer-logo">ART-SPACE</h2>
            <p className="footer-tagline">
              Пространство современного искусства
            </p>
          </div>

          {/* Навигация */}
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h3 className="footer-nav-title">Навигация</h3>
              <ul className="footer-nav-list">
                <li><a href="#hero">Главная</a></li>
                <li><a href="#content-section">О нас</a></li>
                <li><a href="#timeline-section">Афиша</a></li>
                <li><a href="https://vera.art-space.world">Премия VERA</a></li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h3 className="footer-nav-title">Информация</h3>
              <ul className="footer-nav-list">
                <li><a href="/gallery">Галерея</a></li>
                <li><a href="#">Художники</a></li>
                <li><a href="/events">События</a></li>
                <li><a href="/contact">Контакты</a></li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h3 className="footer-nav-title">Контакты</h3>
              <ul className="footer-nav-list">
                <li>
                  <a href="tel:+74951234567">+7 (495) 123-45-67</a>
                </li>
                <li>
                  <a href="mailto:info@art-space.world">info@art-space.world</a>
                </li>
                <li>Москва, Тверская 9</li>
                <li>Пн-Вс: 10:00 - 22:00</li>
              </ul>
            </div>
          </div>

          {/* Социальные сети */}
          <div className="footer-social">
            <h3 className="footer-social-title">Мы в соцсетях</h3>
            <div className="footer-social-links">
              <a 
                href="https://t.me/tandcaward" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Telegram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z" 
                        fill="currentColor"/>
                </svg>
              </a>
              
              <a 
                href="https://vk.com/tandcaward" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="VK"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.23 13.5C16.79 14.03 17.38 14.53 17.85 15.14C18.03 15.37 18.2 15.61 18.29 15.89C18.43 16.32 18.23 16.78 17.85 16.8H16.23C15.76 16.84 15.36 16.64 15.03 16.31C14.77 16.05 14.54 15.77 14.3 15.5C14.21 15.39 14.11 15.29 14 15.21C13.73 15.03 13.5 15.09 13.34 15.36C13.18 15.64 13.14 15.95 13.13 16.27C13.11 16.73 12.97 16.84 12.51 16.8C11.53 16.71 10.61 16.49 9.76 16.01C9.02 15.59 8.43 15.01 7.93 14.33C6.95 13 6.16 11.53 5.46 10.01C5.29 9.65 5.39 9.45 5.79 9.44C6.38 9.43 6.97 9.43 7.56 9.44C7.83 9.45 8 9.6 8.11 9.86C8.47 10.71 8.92 11.5 9.48 12.23C9.63 12.43 9.78 12.63 10.01 12.76C10.27 12.91 10.46 12.85 10.58 12.57C10.65 12.39 10.68 12.2 10.7 12.01C10.76 11.34 10.77 10.67 10.67 10C10.61 9.58 10.36 9.32 9.94 9.25C9.73 9.22 9.76 9.14 9.86 9.03C10.03 8.85 10.19 8.74 10.5 8.74H12.29C12.68 8.82 12.77 9 12.82 9.39L12.83 12.03C12.82 12.18 12.9 12.62 13.16 12.72C13.37 12.79 13.5 12.61 13.63 12.47C14.27 11.77 14.71 10.95 15.09 10.09C15.25 9.73 15.38 9.36 15.51 8.99C15.6 8.74 15.76 8.61 16.04 8.62L17.85 8.63C17.92 8.63 17.99 8.63 18.06 8.64C18.43 8.71 18.54 8.88 18.43 9.24C18.24 9.86 17.86 10.38 17.47 10.89C17.05 11.43 16.59 11.95 16.17 12.5C15.8 12.98 15.83 13.22 16.23 13.5Z" 
                        fill="currentColor"/>
                </svg>
              </a>
              
              <a 
                href="https://www.instagram.com/artspace.world_/?igsh=bjA3aTlicDZ0YnVs#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 8.5C16.5 8.22 16.72 8 17 8H18C18.28 8 18.5 8.22 18.5 8.5V9.5C18.5 9.78 18.28 10 18 10H17C16.72 10 16.5 9.78 16.5 9.5V8.5ZM12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10ZM12 8.5C9.79 8.5 8 10.29 8 12.5C8 14.71 9.79 16.5 12 16.5C14.21 16.5 16 14.71 16 12.5C16 10.29 14.21 8.5 12 8.5ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" 
                        fill="currentColor"/>
                </svg>
              </a>
              
              {/* <a 
                href="https://youtube.com/@artspace" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="YouTube"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.19 15.19C15.88 15.5 15.38 15.71 14.54 15.76C13.68 15.81 11.55 15.81 10.46 15.76C9.62 15.71 9.12 15.5 8.81 15.19C8.5 14.88 8.29 14.38 8.24 13.54C8.19 12.68 8.19 10.55 8.24 9.46C8.29 8.62 8.5 8.12 8.81 7.81C9.12 7.5 9.62 7.29 10.46 7.24C11.55 7.19 13.68 7.19 14.54 7.24C15.38 7.29 15.88 7.5 16.19 7.81C16.5 8.12 16.71 8.62 16.76 9.46C16.81 10.55 16.81 12.68 16.76 13.54C16.71 14.38 16.5 14.88 16.19 15.19ZM10.5 13.5L14.5 11.5L10.5 9.5V13.5Z" 
                        fill="currentColor"/>
                </svg>
              </a> */}
            </div>
          </div>
        </div>

        {/* Нижняя линия */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} ART-SPACE. Все права защищены
            </p>
            <div className="footer-legal">
              <a href="/privacy">Политика конфиденциальности</a>
              <span className="footer-divider">•</span>
              <a href="/terms">Условия использования</a>
            </div>
          </div>
        </div>
      </div>

      {/* Декоративная линия */}
      <div className="footer-decoration"></div>
    </footer>
  );
}
