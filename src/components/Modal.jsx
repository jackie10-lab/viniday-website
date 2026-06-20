import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, children, maxWidth = '900px' }) {
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />
      
      {/* Content */}
      <div 
        className="relative w-full overflow-auto"
        style={{ 
          maxWidth,
          maxHeight: '90vh',
          animation: 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: 'rgba(216, 207, 208, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
          aria-label="Close"
        >
          <X size={18} className="text-champagne" />
        </button>
        
        {children}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
