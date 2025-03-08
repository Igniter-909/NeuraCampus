'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import Loader from './Loader';

export default function PageTransition() {
  const overlayRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Set initial position with semi-circle shape
    gsap.set(overlayRef.current, {
      yPercent: -100,
      display: 'flex',
      height: '120vh',
      width: '100vw',
      position: 'fixed',
      zIndex: 9999,
      backgroundColor: '#2563eb',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      left: 0,
      borderRadius: '0 0 50% 50%',
      pointerEvents: 'none',
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Fast entry with easing
      tl.to(overlayRef.current, {
        duration: 0.6,
        yPercent: 0,
        borderRadius: '0',
        ease: 'power4.out',
      })
      // Slower exit with smooth easing
      .to(overlayRef.current, {
        duration: 1.2,
        yPercent: 100,
        borderRadius: '50% 50% 0 0',
        ease: 'power2.inOut',
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={overlayRef}>
      <Loader />
    </div>
  );
}
