import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Lock, Unlock } from 'lucide-react';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const Balloons = () => {
  const balloonColors = [
    '#F72585', // Hot pink
    '#FD4AE5', // Bright pink
    '#D4BBFC', // Light purple-pink
    '#F72585', // Hot pink (repeat for more pink)
    '#FD4AE5', // Bright pink (repeat)
    '#40FCE0', // Cyan accent
    '#D4BBFC', // Light purple-pink
    '#F72585', // Hot pink
    '#FD4AE5', // Bright pink
    '#D4BBFC', // Light purple-pink
    '#F72585', // Hot pink
    '#FD4AE5', // Bright pink
    '#D4BBFC', // Light purple-pink
    '#40FCE0', // Cyan accent
    '#F72585', // Hot pink
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {balloonColors.map((color, i) => {
        const fromLeft = i % 2 === 0; // Alternate left and right
        const position = fromLeft 
          ? `${Math.random() * 20}%` // Left side (0-20%)
          : `${80 + Math.random() * 20}%`; // Right side (80-100%)

        return (
          <div
            key={i}
            className="balloon absolute rounded-full"
            style={{
              width: `${10 + Math.random() * 15}px`,
              height: `${15 + Math.random() * 20}px`,
              backgroundColor: color,
              left: position,
              bottom: `-80px`,
              opacity: 0.8,
              boxShadow: `0 0 20px ${color}40, inset -2px -2px 5px rgba(0,0,0,0.2)`,
              animation: `float-up ${8 + Math.random() * 4}s ease-in infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {/* Balloon string */}
            <div
              className="absolute w-[1px] h-16"
              style={{
                backgroundColor: 'rgba(216, 207, 208, 0.3)',
                left: '50%',
                top: '100%',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        );
      })}

      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default function FinalSurpriseSection() {
  const sectionRef = useRef(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Confetti on unlock
  useEffect(() => {
    if (isUnlocked) {
      const end = Date.now() + 5000;
      const colors = ['#40FCE0', '#FD4AE5', '#D4BBFC', '#F72585', '#D8CFD0'];

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors,
          disableForReducedMotion: true,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isUnlocked]);

  // Typewriter effect for unlocked message
  useEffect(() => {
    if (!isUnlocked) return;

    const text = content.finalSurprise.message;
    let index = 0;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setTypedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [isUnlocked]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.surprise-content'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <section 
      ref={sectionRef}
      id="surprise"
      className="relative w-full min-h-[100dvh] py-20 md:py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(114,9,183,0.2) 0%, rgba(253,74,229,0.1) 30%, #0A0908 70%)'
      }}
    >
      {/* Floating Balloons */}
      <Balloons />

      <div className="surprise-content max-w-3xl mx-auto text-center opacity-0 relative z-10">
        {!isUnlocked ? (
          /* Locked State - Click to Unlock */
          <div 
            onClick={handleUnlock}
            className="cursor-pointer group"
          >
            {/* Lock Icon */}
            <div className="mb-8 flex justify-center">
              <Lock 
                size={80} 
                className="text-neon-cyan group-hover:scale-110 transition-transform duration-300" 
                strokeWidth={1}
                style={{ filter: 'drop-shadow(0 0 20px rgba(64, 252, 224, 0.5))' }}
              />
            </div>

            {/* Title */}
            <h2 
              className="font-display text-champagne mb-6"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              {content.finalSurprise.lockedMessage}
            </h2>

            {/* Click to Reveal Button */}
            <button
              className="btn-pill mb-8 group-hover:scale-105 transition-transform duration-300"
            >
              {content.finalSurprise.clickMessage}
            </button>

            <p className="text-champagne/50 font-body text-sm">
              ✨ A special message is waiting for you
            </p>
          </div>
        ) : (
          /* Unlocked State */
          <>
            {/* Unlocked Icon */}
            <div className="mb-8 flex justify-center">
              <Unlock 
                size={80} 
                className="text-neon-cyan" 
                strokeWidth={1}
                style={{ filter: 'drop-shadow(0 0 30px rgba(64, 252, 224, 0.6))' }}
              />
            </div>

            {/* Title */}
            <h2 
              className="font-display gradient-text mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              {content.finalSurprise.unlockedTitle}
            </h2>

            {/* Message */}
            <div className="mb-12 max-w-2xl mx-auto">
              <p className="font-display text-champagne/90 leading-relaxed whitespace-pre-line" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                {typedText}
                {typedText.length < content.finalSurprise.message.length && (
                  <span className="inline-block w-[2px] h-[1.2em] bg-neon-cyan ml-1 animate-pulse" />
                )}
              </p>
            </div>

            {/* Surprise Video */}
            {content.finalSurprise.video && (
              <div className="max-w-3xl mx-auto">
                <video 
                  src={content.finalSurprise.video}
                  controls
                  autoPlay
                  loop
                  className="w-full rounded-2xl"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}