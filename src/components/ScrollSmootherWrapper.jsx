// components/ScrollSmootherWrapper.jsx - СОЗДАЙТЕ НОВЫЙ КОМПОНЕНТ
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function ScrollSmootherWrapper({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 8.5, 
      normalizeScroll: true, 
      ignoreMobileResize: true,
      effects: true 
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
