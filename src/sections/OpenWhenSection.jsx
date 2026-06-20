import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smile, Heart, Zap, Users, Laugh } from 'lucide-react';
import Modal from '@/components/Modal';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  smile: Smile,
  heart: Heart,
  zap: Zap,
  users: Users,
  laugh: Laugh,
};

const cardGlowColors = [
  'rgba(64, 252, 224, 0.15)',
  'rgba(212, 187, 252, 0.15)',
  'rgba(253, 74, 229, 0.15)',
  'rgba(247, 37, 133, 0.15)',
  'linear-gradient(135deg, rgba(64,252,224,0.15) 0%, rgba(253,74,229,0.15) 50%, rgba(212,187,252,0.15) 100%)'
];

export default function OpenWhenSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.querySelectorAll('.openwhen-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = (card) => {
    setSelectedCard(card);
    setShowContent(false);
    // Show quote first, then content
    setTimeout(() => setShowContent(true), 2500);
  };

  const handleClose = () => {
    setSelectedCard(null);
    setShowContent(false);
  };

  return (
    <section 
      ref={sectionRef}
      id="open-when"
      className="relative w-full min-h-[100dvh] py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Organic background */}
      <div className="absolute inset-0 organic-bg opacity-50" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Open When</span>
          <h2 
            className="font-display text-champagne"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            For <em className="italic">Every</em> Moment
          </h2>
        </div>

        {/* Cards Row */}
        <div 
          ref={cardsRef}
          className="flex flex-wrap justify-center gap-5"
        >
          {content.openWhenCards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Smile;
            
            return (
              <div
                key={card.id}
                className="openwhen-card group cursor-pointer opacity-0"
                onClick={() => handleOpen(card)}
                style={{ flex: '0 0 200px', maxWidth: '200px' }}
              >
                <div 
                  className="glass-card p-6 h-[260px] flex flex-col items-center justify-center text-center transition-all duration-400 group-hover:-translate-y-2 group-hover:scale-105"
                  style={{
                    background: 'rgba(10, 9, 8, 0.7)',
                    borderColor: 'rgba(216, 207, 208, 0.15)'
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `0 0 40px ${cardGlowColors[index]}`
                    }}
                  />
                  
                  <IconComponent 
                    size={40} 
                    className="text-neon-cyan mb-4 transition-transform duration-300 group-hover:scale-110" 
                    strokeWidth={1.5} 
                  />
                  <h3 className="font-display text-champagne text-base leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-champagne/50 font-body text-xs uppercase tracking-wider mt-2">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Open When Modal */}
      <Modal 
        isOpen={!!selectedCard} 
        onClose={handleClose}
        maxWidth="800px"
      >
        {selectedCard && (
          <div className="glass-card overflow-hidden">
            {/* Quote Phase */}
            {!showContent ? (
              <div className="min-h-[300px] flex items-center justify-center p-12">
                <p 
                  className="font-display italic text-champagne text-center"
                  style={{ 
                    fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                    lineHeight: 1.6,
                    animation: 'fadeIn 0.6s ease-out'
                  }}
                >
                  "{selectedCard.quote}"
                </p>
              </div>
            ) : (
              /* Content Phase */
              <div 
                className="p-8 md:p-12"
                style={{ animation: 'fadeIn 0.5s ease-out' }}
              >
                {/* Message */}
                <div className="mb-8">
                  <h3 className="font-display text-champagne text-2xl mb-4">
                    {selectedCard.title}
                  </h3>
                  <div className="text-champagne/85 font-body leading-relaxed whitespace-pre-line">
                    {selectedCard.message}
                  </div>
                </div>

                {/* Images */}
                {selectedCard.images && selectedCard.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {selectedCard.images.map((img, i) => (
                      <img 
                        key={i}
                        src={img}
                        alt=""
                        className="rounded-lg w-full object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                {/* Video */}
                {selectedCard.video && (
                  <div className="mb-8">
                    <video 
                      src={selectedCard.video}
                      controls
                      className="w-full rounded-lg"
                    />
                  </div>
                )}

                {/* YouTube */}
                {selectedCard.youtubeUrl && (
                  <div className="mb-8 aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={selectedCard.youtubeUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Voice Note */}
                {selectedCard.voiceNote && (
                  <div className="mb-8 p-4 rounded-xl" style={{ background: 'rgba(64, 252, 224, 0.05)', border: '1px solid rgba(64, 252, 224, 0.1)' }}>
                    <p className="text-neon-cyan text-xs uppercase tracking-wider mb-2">Voice Note</p>
                    <audio src={selectedCard.voiceNote} controls className="w-full" />
                  </div>
                )}

                {/* Back Button */}
                <div className="text-center">
                  <button
                    onClick={handleClose}
                    className="btn-pill"
                  >
                    Back to Journey
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
