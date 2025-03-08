'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return <div ref={pageRef}>{children}</div>;
} 