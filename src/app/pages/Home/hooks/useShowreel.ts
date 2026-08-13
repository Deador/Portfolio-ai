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
 */
export function useShowreel({ count, intervalMs = 4000 }: UseShowreelOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (count <= 1) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timerId = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((index) => (index + 1) % count);
      }
    }, intervalMs);

    return () => clearInterval(timerId);
  }, [count, intervalMs]);

  const pause = () => {
    pausedRef.current = true;
  };

  const resume = () => {
    pausedRef.current = false;
  };

  return { activeIndex, pause, resume };
}