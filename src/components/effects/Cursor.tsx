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
    let rafId: number | null = null;
    let isVisible = false;
    let isInteractive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        cursor.style.opacity = '1';
        isVisible = true;
      }

      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      });
    };

    const handleMouseLeaveWindow = () => {
      cursor.style.opacity = '0';
      isVisible = false;
    };

    const handleInteractiveHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('interactive') ||
        target.closest('a') ||
        target.closest('button');

      if (interactive) {
        cursor.style.backgroundColor = 'rgba(108, 229, 232, 0.2)';
        cursor.style.borderColor = '#6CE5E8';
        if (!isInteractive) {
          cursor.style.setProperty('--cursor-scale', '1.8');
          cursor.style.setProperty('--cursor-rotate', '45deg');
          isInteractive = true;
        }
      } else {
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = '#6CE5E8';
        if (isInteractive) {
          cursor.style.setProperty('--cursor-scale', '1');
          cursor.style.setProperty('--cursor-rotate', '0deg');
          isInteractive = false;
        }
      }
    };

    const handleMouseDown = () => {
      cursor.style.setProperty('--cursor-scale', isInteractive ? '2.1' : '1.3');
    };

    const handleMouseUp = () => {
      cursor.style.setProperty('--cursor-scale', isInteractive ? '1.8' : '1');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeaveWindow);
    window.addEventListener('blur', handleMouseLeaveWindow);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleInteractiveHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      window.removeEventListener('blur', handleMouseLeaveWindow);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleInteractiveHover);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [hasFinePointer]);

  // Don't render on touch devices
  if (!hasFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed w-4 h-4 border border-[#6CE5E8] pointer-events-none z-[9999] opacity-0 mix-blend-difference"
      style={{
        transform:
          'translate(-50%, -50%) scale(var(--cursor-scale, 1)) rotate(var(--cursor-rotate, 0deg))',
        transition:
          'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s, border-color 0.2s, opacity 0.12s'
      }}
    />
  );
}
