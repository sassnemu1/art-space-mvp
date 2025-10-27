"use client";

import { useEffect, useState } from "react";
import "./Loading.css";

export default function Loading({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(() => onFinish?.(), 5000); // уменьшено с 10 до 5 сек
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="loader">
      <div className="loader__content">
        {/* Геометрические фигуры */}
        <div className="loader__shapes">
          {/* Квадрат - черный */}
          <svg className="loader__shape loader__shape--square" viewBox="0 0 100 100">
            <rect x="15" y="15" width="70" height="70" />
          </svg>

          {/* Круг - бордовый */}
          <svg className="loader__shape loader__shape--circle" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" />
          </svg>

          {/* Треугольник - бежевый */}
          <svg className="loader__shape loader__shape--triangle" viewBox="0 0 100 100">
            <polygon points="50,15 90,85 10,85" />
          </svg>
        </div>

        {/* Текст ART-Space */}
        <div className="loader__text">
          <span className="loader__letter">A</span>
          <span className="loader__letter">R</span>
          <span className="loader__letter">T</span>
          <span className="loader__separator">-</span>
          <span className="loader__letter">S</span>
          <span className="loader__letter">p</span>
          <span className="loader__letter">a</span>
          <span className="loader__letter">c</span>
          <span className="loader__letter">e</span>
        </div>
      </div>
    </div>
  );
}
