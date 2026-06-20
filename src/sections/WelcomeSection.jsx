import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
      
      // Content entrance
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraphs = content.welcome.message.split('\n\n').filter(Boolean);

  return (
    <section 
      ref={sectionRef}
      id="welcome"
      className="relative w-full min-h-[100dvh] flex items-center py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(180deg, #0A0908 0%, rgba(114,9,183,0.05) 50%, #0A0908 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
        {/* Image */}
        <div 
          ref={imageRef}
          className="relative aspect-[3/4] rounded-xl overflow-hidden opacity-0"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
          }}
        >
          <video
          autoPlay
         muted
          loop
          playsInline
           className="w-full h-full object-cover"
         >
  <source src={content.welcome.video} type="video/mp4" />
</video>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 to-transparent" />
        </div>
        
        {/* Text Content */}
        <div ref={contentRef} className="flex flex-col">
          <span className="section-label mb-4">Welcome</span>
          <h2 
            className="font-display text-champagne mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            {content.welcome.title.split(' ').map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 2 ? (
                  <>
                    <em className="italic">{word}</em>{' '}
                  </>
                ) : i === arr.length - 1 ? (
                  <em className="italic">{word}</em>
                ) : (
                  <>{word} </>
                )}
              </span>
            ))}
          </h2>
          
          <div className="space-y-6">
            {paragraphs.map((paragraph, i) => (
              <p 
                key={i}
                className="text-champagne/85 font-body leading-relaxed"
                style={{ fontSize: '1rem', lineHeight: 1.7 }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
