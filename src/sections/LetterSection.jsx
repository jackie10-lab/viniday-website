import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '@/hooks/useInView';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function LetterSection() {
  const sectionRef = useRef(null);
  const { ref: letterRef, isInView } = useInView(0.2);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const letterText = content.letter.text;
  const paragraphs = letterText.split('\n\n').filter(Boolean);

  // Typewriter effect
  useEffect(() => {
    if (!isInView || isTyping) return;
    setIsTyping(true);

    let totalIndex = 0;
    let currentPara = 0;
    let charIndex = 0;
    const allChars = paragraphs.map(p => p.split(''));
    const fullText = letterText;

    const interval = setInterval(() => {
      if (totalIndex < fullText.length) {
        setTypedText(fullText.slice(0, totalIndex + 1));
        totalIndex++;
      } else {
        clearInterval(interval);
        setShowSignature(true);
        // Hide cursor after 2 seconds
        setTimeout(() => setCursorVisible(false), 2000);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, isTyping, letterText, paragraphs]);

  // Cursor blink
  useEffect(() => {
    if (!isTyping || showSignature) return;
    const blink = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(blink);
  }, [isTyping, showSignature]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.letter-container'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="letter"
      className="relative w-full min-h-[100dvh] py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(247,37,133,0.08) 0%, #0A0908 50%)'
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">A Letter For You</span>
          <h2 
            className="font-display text-champagne"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            My <em className="italic">Words</em> For You
          </h2>
        </div>

        {/* Letter Container */}
        <div 
          ref={letterRef}
          className="letter-container relative opacity-0"
        >
          <div 
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 9, 8, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(216, 207, 208, 0.1)',
              boxShadow: '0 20px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Top gradient border */}
            <div 
              className="h-1 w-full"
              style={{
                background: 'linear-gradient(90deg, #40FCE0 0%, #FD4AE5 50%, #D4BBFC 100%)'
              }}
            />

            {/* Corner decorations */}
            <div 
              className="absolute top-4 left-4 w-8 h-8 opacity-30 pointer-events-none"
              style={{
                borderLeft: '2px solid #40FCE0',
                borderTop: '2px solid #40FCE0',
              }}
            />
            <div 
              className="absolute bottom-4 right-4 w-8 h-8 opacity-30 pointer-events-none"
              style={{
                borderRight: '2px solid #40FCE0',
                borderBottom: '2px solid #40FCE0',
              }}
            />

            {/* Letter content */}
            <div className="p-8 md:p-16 relative">
              {/* Paper texture overlay */}
              <div 
                className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-2xl"
                style={{
                  backgroundImage: `url('/images/letter-bg.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'overlay'
                }}
              />

              {/* Salutation */}
              <p className="font-display text-champagne/90 mb-8" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.8 }}>
                My Dearest {content.name},
              </p>

              {/* Body text with typewriter */}
              <div 
                className="font-display text-champagne/85 whitespace-pre-line"
                style={{ 
                  fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)', 
                  lineHeight: 1.8,
                  letterSpacing: '0.005em'
                }}
              >
                {typedText}
                {isTyping && cursorVisible && (
                  <span className="inline-block w-[2px] h-[1.2em] bg-neon-cyan ml-0.5 animate-pulse" />
                )}
              </div>

              {/* Signature */}
              {showSignature && (
                <div 
                  className="mt-12 text-right"
                  style={{ animation: 'fadeIn 0.5s ease-out' }}
                >
                  <p className="font-display text-neon-cyan italic text-xl md:text-2xl">
                    {content.letter.signature}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
