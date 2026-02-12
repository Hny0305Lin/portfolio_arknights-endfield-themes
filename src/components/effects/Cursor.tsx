import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (mouse)
    const mq = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mq.matches);

    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      requestAnimationFrame(() => {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      });
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    const handleInteractiveHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('interactive') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        cursor.style.backgroundColor = 'rgba(108, 229, 232, 0.2)';
        cursor.style.borderColor = '#6CE5E8';
      } else {
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = '#6CE5E8';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleInteractiveHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleInteractiveHover);
    };
  }, [hasFinePointer]);

  // Don't render on touch devices
  if (!hasFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed w-4 h-4 border border-[#6CE5E8] pointer-events-none z-[9999] opacity-0 mix-blend-difference"
      style={{
        transform: 'translate(-50%, -50%)',
        transition: 'background-color 0.2s, border-color 0.2s'
      }}
    />
  );
}
