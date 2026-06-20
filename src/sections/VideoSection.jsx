import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import Modal from '@/components/Modal';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.video-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
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
      id="videos"
      className="relative w-full min-h-[100dvh] py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(180deg, #0A0908 0%, rgba(10,9,8,0.95) 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Videos</span>
          <h2 
            className="font-display text-champagne"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            Our Story <em className="italic">In Motion</em>
          </h2>
        </div>

        {/* Video Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {content.videos.map((video, index) => (
            <div
              key={index}
              className="video-card group cursor-pointer opacity-0"
              onClick={() => setActiveVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/60 transition-colors duration-300" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(10, 9, 8, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(216, 207, 208, 0.2)'
                    }}
                  >
                    <Play size={24} className="text-neon-cyan ml-1" fill="#40FCE0" />
                  </div>
                </div>
                
                {/* Gradient mesh on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(64,252,224,0.15) 0%, transparent 60%)',
                  }} />
                </div>
              </div>
              
              {/* Info */}
              <h3 className="font-display text-champagne text-lg mb-1 group-hover:text-neon-cyan transition-colors duration-300">
                {video.title}
              </h3>
              <p className="text-champagne/60 font-body text-sm">
                {video.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Modal 
        isOpen={!!activeVideo} 
        onClose={() => setActiveVideo(null)}
        maxWidth="1100px"
      >
        {activeVideo && (
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-obsidian">
            <video
              src={activeVideo.video}
              controls
              autoPlay
              loop
              className="w-full h-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="absolute inset-0 hidden items-center justify-center bg-obsidian/90"
            >
              <div className="text-center p-8">
                <p className="text-champagne/70 font-body mb-2">
                  Video placeholder
                </p>
                <p className="text-neon-cyan text-sm font-body">
                  Add your video to: {activeVideo.video}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
