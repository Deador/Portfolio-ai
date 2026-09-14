import { useEffect, useRef, RefObject } from 'react';
import { ymGoal } from './ym';

// Module-level: переживает ре-монтирование CaseRenderer (например, при
// смене slug) и гарантирует «не чаще одного раза на кейс за сессию»
// независимо от того, сколько раз пользователь долистает до сентинела.
const readCases = new Set<string>();

/**
 * useCaseReadEnd
 *
 * IntersectionObserver на сентинел в конце контента кейса — фиксирует цель
 * case_read_end, как только сентинел появляется во вьюпорте. Возвращает
 * ref, который нужно навесить на элемент-сентинел в конце страницы кейса.
 */
export function useCaseReadEnd(slug: string): RefObject<HTMLDivElement> {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug || readCases.has(slug)) {
      return undefined;
    }

    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !readCases.has(slug)) {
          readCases.add(slug);
          ymGoal('case_read_end', { case: slug });
          observer.disconnect();
        }
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [slug]);

  return sentinelRef;
}
