import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import content from '@/data/content';

// Floating heart component
function FloatingHeart({ delay, left, color, size }) {
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: `${left}%`,
        bottom: '-50px',
        color,
        fontSize: `${size}px`,
        animation: `heartFloat 8s ease-in-out ${delay}s infinite`,
        opacity: 0,
        zIndex: 9001
      }}
    >
      ♥
    </div>
  );
}

export default function SecretChapter() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [typedText, setTypedText] = useState('');
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);

  // Secret trigger - hidden in the page
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger.classList.add('opacity-30');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isRevealed) return;

    const text = content.secretChapter.message;
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isRevealed]);

  const handleReveal = useCallback(() => {
    setIsRevealed(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClose = useCallback(() => {
    setIsRevealed(false);
    document.body.style.overflow = '';
  }, []);

  // Generate floating hearts
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.4,
    left: 5 + Math.random() * 90,
    color: ['#FD4AE5', '#F72585', '#40FCE0'][Math.floor(Math.random() * 3)],
    size: 12 + Math.random() * 20
  }));

  return (
    <>
      {/* Hidden Trigger - barely visible heart in timeline section */}
      <div 
        ref={triggerRef}
        className="absolute left-1/2 -translate-x-1/2 opacity-0 hover:opacity-60 cursor-pointer transition-opacity duration-300 z-10"
        style={{ 
          bottom: '100px',
          color: '#40FCE0',
          fontSize: '14px',
          textShadow: '0 0 10px rgba(64, 252, 224, 0.5)'
        }}
        onClick={handleReveal}
        title="?"
      >
        ♥
      </div>

      {/* Also add a trigger in the navigation or another spot */}
      <button
        onClick={handleReveal}
        className="fixed bottom-20 right-4 lg:right-auto lg:left-4 w-8 h-8 rounded-full opacity-0 hover:opacity-40 transition-opacity duration-300 cursor-pointer z-50 flex items-center justify-center"
        style={{ 
          background: 'rgba(64, 252, 224, 0.1)',
          border: '1px solid rgba(64, 252, 224, 0.2)'
        }}
        aria-label="Secret"
        title="?"
      >
        <span className="text-neon-cyan text-xs">♥</span>
      </button>

      {/* Secret Overlay */}
      {isRevealed && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[9000] overflow-auto"
          style={{ backgroundColor: '#0A0908' }}
        >
          {/* Organic background at full intensity */}
          <div className="absolute inset-0 organic-bg" />
          
          {/* Floating hearts */}
          {hearts.map((heart, i) => (
            <FloatingHeart key={i} {...heart} />
          ))}
          
          {/* Content */}
          <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center p-8">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(216, 207, 208, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <X size={18} className="text-champagne" />
            </button>

            {/* Title */}
            <h2 
              className="font-display text-champagne text-center mb-8"
              style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)', 
                lineHeight: 1.1,
                animation: 'fadeIn 0.8s ease-out'
              }}
            >
              <em className="italic">One</em> More Thing...
            </h2>

            {/* Message with typewriter */}
            <div 
              className="max-w-2xl mx-auto text-center mb-12"
              style={{ animation: 'fadeIn 1s ease-out 0.3s both' }}
            >
              <p className="font-display text-champagne/90 leading-relaxed whitespace-pre-line" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                {typedText}
                <span className="inline-block w-[2px] h-[1.2em] bg-neon-cyan ml-1 animate-pulse" />
              </p>
            </div>

            {/* Secret Gallery */}
            {content.secretChapter.images && content.secretChapter.images.length > 0 && (
              <div 
                className="flex gap-4 overflow-x-auto max-w-full pb-4 mb-8 px-4"
                style={{ animation: 'fadeIn 1s ease-out 0.6s both' }}
              >
                {content.secretChapter.images.map((img, i) => (
                  <img 
                    key={i}
                    src={img}
                    alt=""
                    className="h-64 rounded-xl object-cover flex-shrink-0"
                    style={{ maxWidth: '400px' }}
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            {/* Secret Video */}
            {content.secretChapter.video && (
              <div 
                className="w-full max-w-2xl mb-8"
                style={{ animation: 'fadeIn 1s ease-out 0.9s both' }}
              >
                <video 
                  src={content.secretChapter.video}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full rounded-2xl"
                />
              </div>
            )}

            {/* Back button */}
            <button
              onClick={handleClose}
              className="btn-pill"
              style={{ animation: 'fadeIn 1s ease-out 1.2s both' }}
            >
              Back to Journey
            </button>
          </div>

          <style>{`
            @keyframes heartFloat {
              0% { transform: translateY(0) scale(0.5); opacity: 0; }
              20% { opacity: 0.6; }
              80% { opacity: 0.2; }
              100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
