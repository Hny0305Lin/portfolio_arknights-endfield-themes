import { useEffect, useState } from 'react';

export function useScrollSection(sectionIds: string[]): string {
  const [currentSection, setCurrentSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSection(id);
          }
        },
        {
          rootMargin: '-50% 0px -50% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return currentSection;
}
