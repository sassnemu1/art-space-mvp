"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import fitContain from "@/lib/fitContain";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroSection({mode, frameCount}) {
  const desktopRoot = useRef(null);
  const canvasRef = useRef(null);

  // const currentFrame = (i) => {
  //   // const wpUploadsUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-content/uploads`;
  //   // const localUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL ? wpUploadsUrl : "";
  //   // return `${localUrl}/seq/output_${String(i).padStart(4, "0")}.webp`;
  //   return `/seq/output_${String(i).padStart(4, "0")}.webp`
  // };
  const currentFrame = (i) => `/seq/output_${String(i).padStart(4, "0")}.webp`;


  const images = useMemo(() => new Array(frameCount), [frameCount]);

  // Загрузка кадров
  useEffect(() => {
    if (mode !== "sequence") return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return; // не грузим на мобильных

    const firstImg = new Image();
    firstImg.src = currentFrame(1);
    images[0] = firstImg;

    for (let i = 2; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images[i - 1] = img;
    }
  }, [mode, frameCount, images]);

  // GSAP только для десктопа через matchMedia
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ТОЛЬКО десктоп
      mm.add("(min-width: 768px)", () => {
        const section = desktopRoot.current;
        if (!section) return;

        const firstText = section.querySelector(".text-item--first");
        const secondText = section.querySelector(".text-item--second");
        const thirdText = section.querySelector(".text-item--third");
        const fourthText = section.querySelector(".text-item--fourth");

        if (!firstText || !secondText || !thirdText || !fourthText) return;

        gsap.set([secondText, thirdText, fourthText], {
          opacity: 0,
          yPercent: 10,
          filter: "blur(4px)",
        });
        gsap.set(firstText, { opacity: 1, yPercent: 0, filter: "blur(0px)" });

        const mainScrollTrigger = {
          trigger: section,
          start: "top top",
          end: "+=1500vh",
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
        };

        const desktopTextTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1500vh",
            scrub: 0.8,
          },
        });

        desktopTextTimeline
          .to({}, { duration: 600 })
          .to(
            firstText,
            {
              opacity: 0,
              yPercent: -10,
              filter: "blur(6px)",
              ease: "power2.inOut",
              duration: 100,
            },
            600
          )
          .fromTo(
            secondText,
            { opacity: 0, yPercent: 10, filter: "blur(6px)" },
            { opacity: 1, yPercent: 0, filter: "blur(0px)", ease: "power2.out", duration: 50 },
            650
          )
          .to({}, { duration: 600 }, 700)
          .to(
            secondText,
            {
              opacity: 0,
              yPercent: -10,
              filter: "blur(6px)",
              ease: "power2.inOut",
              duration: 100,
            },
            1300
          )
          .fromTo(
            thirdText,
            { opacity: 0, yPercent: 10, filter: "blur(6px)" },
            { opacity: 1, yPercent: 0, filter: "blur(0px)", ease: "power2.out", duration: 50 },
            1350
          )
          .to({}, { duration: 600 }, 1400)
          .to(
            thirdText,
            {
              opacity: 0,
              yPercent: -10,
              filter: "blur(6px)",
              ease: "power2.inOut",
              duration: 100,
            },
            2000
          )
          .fromTo(
            fourthText,
            { opacity: 0, yPercent: 10, filter: "blur(6px)" },
            { opacity: 1, yPercent: 0, filter: "blur(0px)", ease: "power2.out", duration: 50 },
            2050
          )
          .to({}, { duration: 450 }, 2100);

        if (mode === "sequence") {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          const drawFrame = (index) => {
            const img = images[Math.min(frameCount - 1, Math.max(0, index - 1))];
            if (!img || !img.complete) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const size = fitContain(
              img.naturalWidth || 1920,
              img.naturalHeight || 1080,
              canvas.width,
              canvas.height
            );
            const x = (canvas.width - size.width) / 2;
            const y = (canvas.height - size.height) / 2;
            ctx.drawImage(img, x, y, size.width, size.height);
          };

          const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(1);
          };

          setCanvasSize();
          window.addEventListener("resize", setCanvasSize);

          const state = { frame: 1 };
          gsap.to(state, {
            frame: frameCount,
            ease: "none",
            onUpdate: () => drawFrame(Math.round(state.frame)),
            scrollTrigger: { ...mainScrollTrigger, scrub: 1 },
          });

          return () => window.removeEventListener("resize", setCanvasSize);
        }
      });

      return () => mm.revert();
    },
    { scope: desktopRoot, dependencies: [mode, frameCount] }
  );

  return (
    <>
      {/* Мобильная версия - используем CSS background вместо NextImage */}
      <section className="hero hero--mobile" role="banner" aria-label="Hero">
        <div className="hero__bg-mobile"></div>
        <div className="hero__content-mobile">
          <h1 className="hero__title-mobile">ART‑Space</h1>
          <p className="hero__subtitle-mobile">Exhibition</p>
          <p className="hero__location-mobile">Tverskaya 9, Moscow</p>
        </div>
      </section>

      {/* Десктопная версия - всегда рендерится, но скрыта на мобильных через CSS */}
      <section ref={desktopRoot} className="hero hero--desktop" role="banner" aria-label="Hero">
        <div className="hero__media">
          <canvas ref={canvasRef} id="heroCanvas" />
        </div>

        <div className="text-swap-container">
          <h1 className="text-item text-item--first">ART‑Space</h1>
          <h1 className="text-item text-item--second">Exhibition</h1>
          <h1 className="text-item text-item--third">Tverskaya 9</h1>
          <h1 className="text-item text-item--fourth">Moscow</h1>
        </div>
      </section>
    </>
  );
}
