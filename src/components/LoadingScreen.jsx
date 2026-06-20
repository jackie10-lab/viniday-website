import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'message' | 'done'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Progress bar (0-2s)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const phaseTimer = setTimeout(() => {
      setPhase('message');
    }, 2000);

    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-500 ${
        phase === 'message' ? 'opacity-100' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#0A0908' }}
    >
      {/* Organic background at low intensity */}
      <div className="absolute inset-0 organic-bg opacity-30" />
      
      <div className="relative z-10 flex flex-col items-center">
        {phase === 'loading' && (
          <>
            {/* Progress bar */}
            <div className="w-[200px] h-[2px] bg-[rgba(216,207,208,0.2)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-neon-cyan transition-all duration-100 ease-out"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 20px rgba(64, 252, 224, 0.8)'
                }}
              />
            </div>
            <p className="mt-4 text-xs font-body uppercase tracking-[0.2em] text-champagne/50">
              Loading your journey...
            </p>
          </>
        )}
        
        {phase === 'message' && (
          <p 
            className="text-center font-display italic text-xl md:text-2xl text-champagne px-8"
            style={{
              animation: 'fadeIn 1.2s ease-out forwards'
            }}
          >
            Something beautiful is waiting for you
          </p>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); letter-spacing: 0.5em; }
          to { opacity: 1; transform: translateY(0); letter-spacing: 0.02em; }
        }
      `}</style>
    </div>
  );
}
