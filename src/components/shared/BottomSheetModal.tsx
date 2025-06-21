import React, { useEffect } from 'react';

interface BottomSheetModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: string; // e.g. '70vh'
  desktopMode?: boolean; // Nuevo: para modal centrado en escritorio
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({ open, onClose, title, children, height = '70vh', desktopMode = false }) => {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex ${desktopMode ? 'items-center justify-center' : 'items-end justify-center'} bg-black/40 backdrop-blur-sm transition-all`}>
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Cerrar comentarios"
      />
      <div
        className={`relative bg-white dark:bg-gray-900 shadow-lg animate-slideUp ${desktopMode ? 'rounded-2xl w-full max-w-lg mx-auto' : 'rounded-t-2xl w-full max-w-md mx-auto'}`}
        style={desktopMode ? { height: '70vh', maxHeight: '90vh', overflow: 'hidden' } : { height, maxHeight: '90vh', overflow: 'hidden' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <div className={`w-8 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto absolute left-0 right-0 ${desktopMode ? 'top-3' : 'top-2'}`} />
            <span className="font-semibold text-base text-gray-900 dark:text-gray-100 mx-auto">{title}</span>
            <button
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl"
              onClick={onClose}
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-4">{children}</div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.25s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
};

export default BottomSheetModal;
