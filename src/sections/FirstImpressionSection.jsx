import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function FirstImpressionSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const storyRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      // Story entrance
      gsap.fromTo(storyRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 80%' }
        }
      );

      // Timeline line draw
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.5, ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 70%' }
        }
      );

      // Timeline items
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' }
          }
        );
        
        // Node scale
        const node = item.querySelector('.timeline-node');
        gsap.fromTo(node,
          { scale: 0 },
          {
            scale: 1, duration: 0.5, delay: i * 0.2 + 0.1, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: item, start: 'top 85%' }
          }
        );

        // Image/Video entrance
        const image = item.querySelector('.timeline-image');
        if (image) {
          gsap.fromTo(image,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1, scale: 1, duration: 0.7, delay: i * 0.2 + 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 85%' }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const storyParagraphs = content.firstImpression.story.split('\n\n').filter(Boolean);

  return (
    <section 
      ref={sectionRef}
      id="first-impression"
      className="relative w-full min-h-[100dvh] py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(180deg, #0A0908 0%, rgba(114,9,183,0.08) 50%, #0A0908 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 
          ref={titleRef}
          className="font-display text-champagne text-center mb-16 opacity-0"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
        >
          The <em className="italic">First</em> Time I Saw You
        </h2>

        {/* Story */}
        <div 
          ref={storyRef}
          className="max-w-3xl mx-auto mb-20 glass-card p-8 md:p-12 opacity-0"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={content.firstImpression.image}
                alt="First Impression"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 space-y-4">
              {storyParagraphs.map((p, i) => (
                <p key={i} className="text-champagne/85 font-body leading-relaxed" style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top"
            style={{ backgroundColor: 'rgba(216, 207, 208, 0.2)' }}
          >
            {/* Progress fill */}
            <div 
              className="absolute top-0 left-0 w-full bg-neon-cyan"
              style={{ 
                height: '100%',
                boxShadow: '0 0 12px rgba(64, 252, 224, 0.6)'
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {content.firstImpression.timeline.map((item, index) => (
              <div 
                key={index}
                className={`timeline-item relative flex items-start gap-8 opacity-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="timeline-node absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-cyan z-10" 
                  style={{ boxShadow: '0 0 12px rgba(64, 252, 224, 0.6)', top: '24px' }}
                />
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  {/* Image/Video - mobile only, sits above the card */}
                  {(item.image || item.video) && (
                    <div className="md:hidden mb-4 aspect-[4/3] rounded-xl overflow-hidden glass-card p-1">
                      {item.video ? (
                        <video
                          src={item.video}
                          className="w-full h-full object-cover rounded-lg"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                  <div className="glass-card p-6">
                    <span className="section-label text-[0.65rem] mb-2 block">{item.date}</span>
                    <h3 className="font-display text-champagne text-xl mb-2">{item.title}</h3>
                    <p className="text-champagne/70 font-body text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
                
                {/* Image/Video - opposite side on desktop */}
                <div className={`hidden md:flex md:w-[45%] items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {(item.image || item.video) && (
                    <div 
                      className="timeline-image w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden glass-card p-1.5"
                      style={{ boxShadow: '0 0 24px rgba(64, 252, 224, 0.12)' }}
                    >
                      {item.video ? (
                        <video
                          src={item.video}
                          className="w-full h-full object-cover rounded-lg"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}