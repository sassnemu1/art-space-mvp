// components/Preloader.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./Loading.css";

export default function Loading({ images = [], minLoadTime = 2000 }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    // Деликатная входная анимация
    gsap.fromTo(logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
    );

    gsap.fromTo(loaderRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.8 }
    );

    const preloadAssets = async () => {
      const totalAssets = images.length || 1;
      let loadedAssets = 0;

      const updateProgress = () => {
        loadedAssets++;
        const currentProgress = Math.round((loadedAssets / totalAssets) * 100);
        
        if (isMounted) {
          gsap.to({ value: progress }, {
            value: currentProgress,
            duration: 0.4,
            ease: "power1.out",
            onUpdate: function() {
              setProgress(Math.round(this.targets()[0].value));
            }
          });
        }
      };

      if (images.length > 0) {
        const imagePromises = images.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              updateProgress();
              resolve();
            };
            img.onerror = () => {
              updateProgress();
              resolve();
            };
            img.src = src;
          });
        });

        await Promise.all(imagePromises);
      } else {
        // Имитация загрузки
        for (let i = 0; i <= 100; i += 20) {
          await new Promise(resolve => setTimeout(resolve, 150));
          if (isMounted) {
            setProgress(i);
          }
        }
      }

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        if (isMounted) {
          setProgress(100);
          
          // Элегантный выход
          const tl = gsap.timeline({
            onComplete: () => setIsComplete(true)
          });

          tl.to(loaderRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in"
          })
          .to(logoRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in"
          }, "-=0.2")
          .to(preloaderRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut"
          }, "-=0.3");
        }
      }, remainingTime);
    };

    preloadAssets();

    return () => {
      isMounted = false;
    };
  }, [images, minLoadTime, progress]);

  if (isComplete) return null;

  return (
    <div ref={preloaderRef} className="preloader-minimal">
      <div className="preloader-minimal-content">
        {/* Логотип ART */}
        <div ref={logoRef} className="minimal-logo">
          <span className="minimal-logo-text">ART</span>
        </div>

        {/* Loader */}
        <div ref={loaderRef} className="minimal-loader">
          {/* Тонкий прогресс-бар */}
          <div className="minimal-progress">
            <div 
              className="minimal-progress-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}