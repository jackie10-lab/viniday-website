import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Pause, Play } from 'lucide-react';
import content from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function PlaylistSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.song-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = (index) => {
    if (playingIndex === index) {
      audioRef.current?.pause();
      setPlayingIndex(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const song = content.playlist.songs[index];
      if (song.audio) {
        audioRef.current = new Audio(song.audio);
        audioRef.current.play().catch(() => {});
        setPlayingIndex(index);
        audioRef.current.onended = () => setPlayingIndex(null);
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="playlist"
      className="relative w-full min-h-[100dvh] py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(114,9,183,0.12) 0%, #0A0908 50%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Soundtrack</span>
          <h2 
            className="font-display text-champagne"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            Songs That <em className="italic">Remind</em> Me Of You
          </h2>
        </div>

        {/* Vinyl Record Decoration */}
        <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 hidden xl:block opacity-10 pointer-events-none">
          <div 
            className="w-[300px] h-[300px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #1a1a1a, #2a2a2a, #1a1a1a, #2a2a2a, #1a1a1a)',
              animation: 'spin-slow 4s linear infinite',
              boxShadow: 'inset 0 0 0 2px rgba(64, 252, 224, 0.1), inset 0 0 0 4px rgba(216, 207, 208, 0.05)'
            }}
          >
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #F72585 0%, #FD4AE5 100%)' }}
              >
                <div className="w-3 h-3 rounded-full bg-obsidian" />
              </div>
            </div>
            {/* Grooves */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute inset-0 rounded-full border border-champagne/5"
                style={{ margin: `${40 + i * 15}px` }}
              />
            ))}
          </div>
        </div>

        {/* Song Cards Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {content.playlist.songs.map((song, index) => (
            <div
              key={index}
              className={`song-card glass-card p-6 cursor-pointer transition-all duration-300 opacity-0 ${
                playingIndex === index ? 'border-neon-cyan/50' : ''
              }`}
              onClick={() => togglePlay(index)}
            >
              <div className="flex items-center gap-4">
                {/* Cover */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 group">
                  {song.coverVideo ? (
                    <video
                      src={song.coverVideo}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {playingIndex === index ? (
                      <Pause size={20} className="text-neon-cyan" />
                    ) : (
                      <Play size={20} className="text-neon-cyan" />
                    )}
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-champagne text-base truncate">
                    {song.title}
                  </h3>
                  <p className="text-champagne/60 font-body text-sm mt-1 line-clamp-2">
                    {song.description}
                  </p>
                </div>
                
                {/* Music bars animation when playing */}
                {playingIndex === index && (
                  <div className="flex items-end gap-[3px] h-4">
                    <div className="music-bar" />
                    <div className="music-bar" />
                    <div className="music-bar" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Spotify Embed */}
        {content.playlist.spotifyUrl && (
          <div className="mt-12 rounded-xl overflow-hidden">
            <iframe
              src={content.playlist.spotifyUrl}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
              style={{ border: '1px solid rgba(216, 207, 208, 0.1)' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}