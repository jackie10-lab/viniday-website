import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Smile, Laugh, Star, Palette, Zap, Sun, User } from 'lucide-react';
import content from '@/data/content';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  heart: Heart,
  smile: Smile,
  laugh: Laugh,
  star: Star,
  palette: Palette,
  zap: Zap,
  sun: Sun,
  user: User,
};

const cardGradients = [
  'linear-gradient(135deg, rgba(114, 9, 183, 0.4) 0%, rgba(247, 37, 133, 0.3) 100%)',
  'linear-gradient(135deg, rgba(64, 252, 224, 0.3) 0%, rgba(212, 187, 252, 0.3) 100%)',
  'linear-gradient(135deg, rgba(253, 74, 229, 0.3) 0%, rgba(114, 9, 183, 0.4) 100%)',
  'linear-gradient(135deg, rgba(247, 37, 133, 0.3) 0%, rgba(64, 252, 224, 0.3) 100%)',
  'linear-gradient(135deg, rgba(212, 187, 252, 0.3) 0%, rgba(253, 74, 229, 0.3) 100%)',
  'linear-gradient(135deg, rgba(64, 252, 224, 0.3) 0%, rgba(114, 9, 183, 0.4) 100%)',
  'linear-gradient(135deg, rgba(253, 74, 229, 0.3) 0%, rgba(247, 37, 133, 0.3) 100%)',
  'linear-gradient(135deg, rgba(114, 9, 183, 0.4) 0%, rgba(64, 252, 224, 0.3) 100%)',
];

export default function AdmirationSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    const triggerConfetti = () => {
      const colors = ['#40FCE0', '#FD4AE5', '#D4BBFC', '#F72585', '#D8CFD0'];
      const end = Date.now() + 2000;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 },
          colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    };

    const ctx = gsap.context(() => {
      // Card entrance animations
      const cards = gridRef.current.querySelectorAll('.admiration-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, rotateY: -15 },
          {
            opacity: 1, y: 0, rotateY: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' }
          }
        );
      });
    }, sectionRef);

    // Confetti trigger (separate from context)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      onLeave: () => triggerConfetti(),
      once: true,
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="admiration"
      className="relative w-full min-h-[100dvh] py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'radial-gradient(ellipse at 80% 50%, rgba(114,9,183,0.1) 0%, #0A0908 50%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Admiration</span>
          <h2 
            className="font-display text-champagne"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            What Makes <em className="italic">You</em> Special
          </h2>
        </div>

        {/* Card Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {content.admirationCards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Heart;
            const isFlipped = flippedCard === index;
            
            return (
              <div
                key={index}
                className="admiration-card flip-card aspect-[3/4] cursor-pointer opacity-0"
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
                onClick={() => setFlippedCard(isFlipped ? null : index)}
              >
                <div 
                  className="flip-card-inner relative w-full h-full"
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front */}
                  <div 
                    className="flip-card-front absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                    style={{
                      background: cardGradients[index % cardGradients.length],
                      border: '1px solid rgba(216, 207, 208, 0.15)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 0 30px rgba(64, 252, 224, 0.1)'
                    }}
                  >
                    <IconComponent size={48} className="text-neon-cyan mb-6" strokeWidth={1.5} />
                    <h3 className="font-display text-champagne text-xl">
                      {card.title}
                    </h3>
                  </div>
                  
                  {/* Back */}
                  <div 
                    className="flip-card-back absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                      border: '1px solid rgba(64, 252, 224, 0.2)',
                      boxShadow: '0 0 40px rgba(64, 252, 224, 0.15)'
                    }}
                  >
                    {card.video ? (
                      <video
                        src={card.video}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : card.image ? (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(10, 9, 8, 0.95)' }}>
                        <p className="text-champagne/40 font-body text-xs">No media added</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}