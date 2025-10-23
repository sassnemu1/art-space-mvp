"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';

import Logo from "./NavbarComponents/Logo";
import Navigation from "./NavbarComponents/Navigation";
import SVGFilters from "./NavbarComponents/SVGFilters";

import { menuData } from "../../data/menuData";

import './Navbar.css';

// Динамическая загрузка мобильного меню без SSR
const MobileMenu = dynamic(() => import('./MobileMenu/MobileMenu'), {
  ssr: false,
  loading: () => null
});

export default function Header() {
  const [activeItem, setActiveItem] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <SVGFilters />
      
      <header className="terminal-header">
        <div className="terminal-nav-container">
          <Logo />
          
          <Navigation 
            items={menuData.menuItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />

          {/* Загружается только на клиенте */}
          {isMobile && <MobileMenu menuData={menuData} />}
        </div>
      </header>
    </>
  );
}
