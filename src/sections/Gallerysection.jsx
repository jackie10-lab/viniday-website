import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '@/components/Modal';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.gallery-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Group gallery items by 5 for row display
  const rows = [];
  for (let i = 0; i < content.gallery.length; i += 5) {
    rows.push(content.gallery.slice(i, i + 5));
  }

  return (
    <section 
      ref={sectionRef}
      id="gallery"
      className="relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0A0908' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Gallery</span>
          <h2 
            className="font-display text-champagne"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            More <em className="italic">Moments</em>
          </h2>
        </div>

        {/* Rows with labels */}
        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              {/* Row Label */}
              <h3 className="text-champagne/60 font-body text-sm uppercase tracking-[0.15em] mb-4">
                {content.galleryRowLabels[rowIndex]}
              </h3>

              {/* Row Grid - 5 columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {row.map((item, index) => (
                  <div
                    key={index}
                    className="gallery-card group relative rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedGallery(item)}
                  >
                    {/* Image/Video - Square 1:1 */}
                    <div className="relative aspect-square overflow-hidden">
                      {item.video ? (
                        <video
                          src={item.video}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
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
                      
                      {/* Info - appears on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-neon-cyan text-xs font-body uppercase tracking-[0.15em] mb-1 block">
                          {item.date}
                        </span>
                        <h3 className="font-display text-champagne text-sm">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <Modal 
        isOpen={!!selectedGallery} 
        onClose={() => setSelectedGallery(null)}
        maxWidth="900px"
      >
        {selectedGallery && (
          <div className="glass-card overflow-hidden">
            <div className="aspect-square overflow-hidden">
              {selectedGallery.video ? (
                <video
                  src={selectedGallery.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                <img
                  src={selectedGallery.image}
                  alt={selectedGallery.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-8">
              <span className="section-label text-xs mb-3 block">{selectedGallery.date}</span>
              <h3 className="font-display text-champagne text-3xl mb-4">
                {selectedGallery.title}
              </h3>
              <p className="text-champagne/85 font-body leading-relaxed">
                {selectedGallery.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}