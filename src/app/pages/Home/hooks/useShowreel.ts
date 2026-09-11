import { useEffect, useRef, useState } from 'react';

interface UseShowreelOptions {
  /**
   * Number of showreel frames to rotate
   */
  count: number;

  /**
   * Rotation interval in milliseconds
   */
  intervalMs?: number;
}

/**
 * useShowreel
 *
 * Crossfade-ротация кадров showreel: таймер + пауза (ref),
 * с учётом prefers-reduced-motion. При count <= 1 ротация не запускается.
 *
 * `loadedIndices` — какие кадры уже можно рендерить с реальным `src`.
 * Изначально загружен только кадр 0 (нужен для первого LCP); следующий по
 * циклу кадр открывается для загрузки сразу, как только текущий становится
 * активным — у браузера есть весь `intervalMs` на фоновую загрузку до того,
 * как кадр реально понадобится. Без этого все N кадров грузились бы разом
 * при монтировании, даже если показывается только один.
 */
export function useShowreel({ count, intervalMs = 4000 }: UseShowreelOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(() => new Set(count > 0 ? [0] : []));
  const pausedRef = useRef(false);

  useEffect(() => {
    if (count <= 1) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timerId = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((index) => (index + 1) % count);
      }
    }, intervalMs);

    return () => clearInterval(timerId);
  }, [count, intervalMs]);

  useEffect(() => {
    if (count <= 1) {
      return;
    }

    // При reduced-motion ротация не идёт — незачем предзагружать кадры,
    // которые никогда не покажутся.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const nextIndex = (activeIndex + 1) % count;
    setLoadedIndices((prev) => {
      if (prev.has(nextIndex)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(nextIndex);
      return next;
    });
  }, [activeIndex, count]);

  const pause = () => {
    pausedRef.current = true;
  };

  const resume = () => {
    pausedRef.current = false;
  };

  return { activeIndex, loadedIndices, pause, resume };
}