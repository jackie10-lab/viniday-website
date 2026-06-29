import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import MouseGlow from '@/components/MouseGlow';
import HeroSection from '@/sections/HeroSection';
import WelcomeSection from '@/sections/WelcomeSection';
import FirstImpressionSection from '@/sections/FirstImpressionSection';
import MemoriesSection from '@/sections/MemoriesSection';
import GallerySection from '@/sections/GallerySection';
import AdmirationSection from '@/sections/AdmirationSection';
import VideoSection from '@/sections/VideoSection';
import PlaylistSection from '@/sections/PlaylistSection';
import OpenWhenSection from '@/sections/OpenWhenSection';
import SecretChapter from '@/sections/SecretChapter';
import FinalSurpriseSection from '@/sections/FinalSurpriseSection';
import LetterSection from '@/sections/LetterSection';
import content from '@/data/content';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-[100dvh] bg-obsidian text-champagne overflow-x-hidden film-grain">
      {/* Vercel Analytics */}
      <Analytics />
      
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Mouse glow effect */}
      <MouseGlow />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main 
        className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Hero Section - Full viewport */}
        <HeroSection />
        
        {/* Content Sections with scroll snap */}
        <div className="relative">
          <WelcomeSection />
          <FirstImpressionSection />
          <MemoriesSection />
          <GallerySection />
          <AdmirationSection />
          <VideoSection />
          <PlaylistSection />
          <OpenWhenSection />
          <FinalSurpriseSection />
          <LetterSection />
          
          {/* Secret Chapter - Hidden trigger overlay */}
          <SecretChapter />
        </div>
        
        {/* Footer */}
        <footer className="py-12 px-4 text-center" style={{ backgroundColor: '#0A0908' }}>
          <div className="max-w-md mx-auto">
            <p className="font-display text-champagne/60 text-sm italic mb-4">
              Made with love for {content.name}
            </p>
            <div 
              className="w-16 h-[1px] mx-auto mb-4"
              style={{ background: 'linear-gradient(90deg, transparent, #40FCE0, transparent)' }}
            />
            <p className="text-champagne/30 font-body text-xs uppercase tracking-[0.2em]">
              Happy Birthday
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
