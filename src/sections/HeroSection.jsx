import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FloatingParticles from '@/components/FloatingParticles';
import content from '@/data/content';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });
    
    tl.fromTo(labelRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(titleRef.current.querySelectorAll('.word'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.2'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    return () => tl.kill();
  }, []);

  const scrollToWelcome = () => {
    document.getElementById('welcome')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Organic background */}
      <div className="absolute inset-0 organic-bg" style={{ zIndex: 0 }} />
      
      {/* Hero image */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src={content.heroVideo} type="video/mp4" />
</video>
      </div>
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 2,
          background: 'linear-gradient(180deg, rgba(10,9,8,0.3) 0%, rgba(10,9,8,0.1) 40%, rgba(10,9,8,0.6) 100%)'
        }}
      />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        {/* Label */}
        <p 
          ref={labelRef}
          className="mb-6 text-xs font-body uppercase tracking-[0.25em] text-neon-cyan opacity-0"
        >
          HAPPY VINISHAAAAA DAY
        </p>
        
        {/* Title */}
        <h1 
          ref={titleRef}
          className="font-display text-champagne leading-[0.95] tracking-[-0.02em] neon-glow"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          <span className="word inline-block opacity-0">Happy</span>{' '}
          <span className="word inline-block opacity-0">Birthday</span>
          <br />
          <span className="word inline-block opacity-0">{content.name}</span>
        </h1>
        
        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="mt-6 text-champagne/70 font-body uppercase tracking-[0.15em] opacity-0"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
        >
          A Small Journey Made Just For You
        </p>
        
        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToWelcome}
          className="btn-pill mt-12 opacity-0"
        >
          Begin The Journey
        </button>
      </div>
    </section>
  );
}
