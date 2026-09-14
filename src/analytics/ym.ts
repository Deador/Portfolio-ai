// Обёртки над Яндекс.Метрикой (window.ym из сниппета в index.html).
// Никаких сторонних библиотек — только официальный сниппет + этот модуль.

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    __ymInitialReferrer?: string;
  }
}

const COUNTER_ID = 112575188;

const isDev = import.meta.env.DEV;

interface YmHitOptions {
  title?: string;
  referer?: string;
}

/**
 * Строго no-op, если window.ym недоступен (adblock, скрипт не догрузился,
 * localhost — сниппет там вообще не выполняется). Никогда не бросает наружу.
 */
export function ymHit(url: string, options?: YmHitOptions): void {
  if (isDev) {
    console.debug('[ym] hit', url, options);
  }

  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return;
  }

  try {
    window.ym(COUNTER_ID, 'hit', url, options);
  } catch {
    // Намеренно проглатываем: аналитика не должна ронять приложение.
  }
}

/**
 * Строго no-op, если window.ym недоступен. Никогда не бросает наружу.
 */
export function ymGoal(target: string, params?: Record<string, unknown>): void {
  if (isDev) {
    console.debug('[ym] reachGoal', target, params);
  }

  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return;
  }

  try {
    window.ym(COUNTER_ID, 'reachGoal', target, params);
  } catch {
    // Намеренно проглатываем: аналитика не должна ронять приложение.
  }
}
