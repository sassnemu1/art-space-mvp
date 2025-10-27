"use client";

import { useEffect, useState } from "react";
import Loading from "../Loading";

const KEY = "artspace_loader_session_seen";

export default function LoaderGate() {
  const [show, setShow] = useState(true); // ✅ Показываем сразу по умолчанию

  useEffect(() => {
    // Проверяем флаг
    const wasSeen = sessionStorage.getItem(KEY);
    
    if (wasSeen) {
      // Если уже показывали - сразу скрываем
      setShow(false);
    } else {
      // Первый раз - ставим флаг
      sessionStorage.setItem(KEY, "1");
    }

    // Очищаем флаг при закрытии страницы (для корректной работы с перезагрузкой)
    const handleBeforeUnload = () => {
      sessionStorage.removeItem(KEY);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  if (!show) return null;

  return <Loading onFinish={() => setShow(false)} />;
}
