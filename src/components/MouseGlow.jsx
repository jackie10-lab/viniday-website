import { useMousePosition } from '@/hooks/useMousePosition';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MouseGlow() {
  const { x, y } = useMousePosition();
  const glowRef = useRef(null);

  useEffect(() => {
    if (glowRef.current && x > 0 && y > 0) {
      gsap.to(glowRef.current, {
        x,
        y,
        duration: 0.15,
        ease: 'power2.out'
      });
    }
  }, [x, y]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      style={{
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(64, 252, 224, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        willChange: 'transform'
      }}
    />
  );
}
