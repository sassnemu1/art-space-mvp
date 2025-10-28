"use client";

import { useState, useRef } from "react";
import Link from "next/link";

import MenuButton from "../NavbarComponents/MenuButton";
import MenuOverlay from "../NavbarComponents/MenuOverlay";

import { useMenuControl } from "../../../hooks/useMenuControl";

import './MobileMenu.css';


export default function MobileMenu({ menuData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useMenuControl(menuRef, setIsMenuOpen);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const menuLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Афиша', href: '/events' },
    { label: 'Пространство', href: '/gallery' },
    { label: 'Контакты', href: '/contact' }
  ];

  return (
    <>
      <div className="menu-button-container" ref={menuRef}>
        <MenuButton 
          isOpen={isMenuOpen} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />

        <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
          <nav className="mobile-menu-nav">
            <ul className="mobile-menu-list">
              {menuLinks.map((link, index) => (
                <li key={index} className="mobile-menu-item">
                  <Link 
                    href={link.href} 
                    className="mobile-menu-link"
                    onClick={handleLinkClick}
                  >
                    <span className="mobile-menu-link-text">{link.label}</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <p className="mobile-menu-address">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
              </svg>
              Москва, Тверская 9
            </p>
          </div>
        </div>
      </div>

      <MenuOverlay 
        isActive={isMenuOpen} 
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}
