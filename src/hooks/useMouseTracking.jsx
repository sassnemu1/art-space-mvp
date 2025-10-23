import { useEffect } from 'react';

export function useMouseTracking(elementRef, isOpen, trackingClass) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));
      
      element.style.setProperty('--mouse-x', `${xPercent}%`);
      element.style.setProperty('--mouse-y', `${yPercent}%`);
      element.style.setProperty('--mouse-x-px', `${x}px`);
      element.style.setProperty('--mouse-y-px', `${y}px`);
      
      element.classList.add(trackingClass);
    };

    const handleMouseLeave = () => {
      element.classList.remove(trackingClass);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef, isOpen, trackingClass]);
}
