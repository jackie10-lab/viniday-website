import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useEffect, useState } from 'react';

const sections = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'first-impression', label: 'First Impression' },
  { id: 'memories', label: 'Memories' },
  { id: 'admiration', label: 'Admire' },
  { id: 'videos', label: 'Videos' },
  { id: 'playlist', label: 'Music' },
  { id: 'open-when', label: 'Open When' },
  { id: 'surprise', label: 'Surprise' },
  { id: 'letter', label: 'Letter' },
];

export default function Navigation() {
  const progress = useScrollProgress();
  const [activeSection, setActiveSection] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] z-[1000] transition-none"
        style={{ 
          width: `${progress}%`,
          backgroundColor: '#40FCE0',
          boxShadow: '0 0 10px rgba(64, 252, 224, 0.8), 0 0 20px rgba(253, 74, 229, 0.4)'
        }}
      />

      {/* Desktop Dot Navigation */}
      <nav 
        className={`fixed right-4 top-1/2 -translate-y-1/2 z-[1000] hidden lg:flex flex-col items-center gap-4 p-4 rounded-full transition-all duration-500 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
        style={{
          background: 'rgba(10, 9, 8, 0.4)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(216, 207, 208, 0.1)'
        }}
      >
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to ${label}`}
          >
            <div 
              className={`rounded-full transition-all duration-300 ${
                activeSection === id 
                  ? 'w-[10px] h-[10px] bg-neon-cyan' 
                  : 'w-[8px] h-[8px] bg-champagne/30 hover:bg-champagne/50'
              }`}
              style={activeSection === id ? {
                boxShadow: '0 0 10px rgba(64, 252, 224, 0.6)'
              } : {}}
            />
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-2 py-1 text-[0.625rem] font-body uppercase tracking-wider text-champagne/80 bg-obsidian/80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav 
        className={`fixed bottom-0 left-0 right-0 z-[1000] lg:hidden transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
        style={{
          background: 'rgba(10, 9, 8, 0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(216, 207, 208, 0.1)'
        }}
      >
        <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto">
          {[
            { id: 'welcome', icon: 'Home' },
            { id: 'memories', icon: 'Image' },
            { id: 'videos', icon: 'Play' },
            { id: 'playlist', icon: 'Music' },
            { id: 'letter', icon: 'Mail' },
          ].map(({ id, icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`p-2 transition-colors duration-200 ${
                activeSection === id ? 'text-neon-cyan' : 'text-champagne/40'
              }`}
              aria-label={`Go to ${id}`}
            >
              <Icon name={icon} size={20} />
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

// Simple inline icon component
function Icon({ name, size = 20 }) {
  const icons = {
    Home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    Image: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
    ),
    Play: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="6 3 20 12 6 21 6 3"/>
      </svg>
    ),
    Music: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    Mail: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  };
  return icons[name] || null;
}
