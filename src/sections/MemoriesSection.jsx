import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '@/components/Modal';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function MemoriesSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedMemory, setSelectedMemory] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.memory-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="memories"
      className="relative w-full min-h-[100dvh] py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0A0908' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Memories</span>
          <h2 
            className="font-display text-champagne"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            Moments I <em className="italic">Treasure</em>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div 
          ref={gridRef}
          className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 md:gap-6 space-y-4 md:space-y-6"
        >
          {content.memories.map((memory, index) => (
            <div
              key={index}
              className="memory-card group relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer opacity-0"
              onClick={() => setSelectedMemory(memory)}
            >
              {/* Image/Video */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {memory.video ? (
                  <video
                    src={memory.video}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Gradient mesh on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 30% 30%, rgba(212,187,252,0.3) 0%, transparent 50%)',
                  }} />
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 70% 70%, rgba(64,252,224,0.2) 0%, transparent 50%)',
                  }} />
                </div>
                
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-neon-cyan text-xs font-body uppercase tracking-[0.15em] mb-2 block">
                    {memory.date}
                  </span>
                  <h3 className="font-display text-champagne text-xl mb-2">
                    {memory.title}
                  </h3>
                  <p className="text-champagne/70 font-body text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {memory.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Modal */}
      <Modal 
        isOpen={!!selectedMemory} 
        onClose={() => setSelectedMemory(null)}
        maxWidth="900px"
      >
        {selectedMemory && (
          <div className="glass-card overflow-hidden">
            <div className="aspect-[16/10] overflow-hidden">
              {selectedMemory.video ? (
                <video
                  src={selectedMemory.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-8">
              <span className="section-label text-xs mb-3 block">{selectedMemory.date}</span>
              <h3 className="font-display text-champagne text-3xl mb-4">
                {selectedMemory.title}
              </h3>
              <p className="text-champagne/85 font-body leading-relaxed">
                {selectedMemory.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}