import { useEffect } from 'react';

export function useMenuControl(menuRef, setIsMenuOpen) {
  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuRef, setIsMenuOpen]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    const handleBodyScroll = (isOpen) => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    };

    // Принимаем isMenuOpen как параметр через замыкание
    return (isOpen) => {
      handleBodyScroll(isOpen);
      return () => {
        document.body.style.overflow = 'unset';
      };
    };
  }, []);
}
