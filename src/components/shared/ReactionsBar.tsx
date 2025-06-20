import React from 'react';

export interface ReactionOption {
  emoji: string;
  label: string;
}

export interface ReactionData {
  emoji: string;
  count: number;
  reacted: boolean;
}

interface ReactionsBarProps {
  reactions: ReactionData[];
  options?: ReactionOption[];
  onReact: (emoji: string) => void;
}

const defaultOptions: ReactionOption[] = [
  { emoji: '❤️', label: 'Me gusta' },
  { emoji: '👍', label: 'Like' },
  { emoji: '😂', label: 'Divertido' },
  { emoji: '😮', label: 'Sorprende' },
  { emoji: '😢', label: 'Triste' },
];

const ReactionsBar: React.FC<ReactionsBarProps> = ({ reactions, options = defaultOptions, onReact }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  // El corazón siempre es el primero
  const main = options[0];
  const mainData = reactions.find(r => r.emoji === main.emoji);
  const rest = options.slice(1);

  // Cerrar el menú al hacer clic fuera
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-full border text-base transition-all min-w-[44px] min-h-[40px] sm:text-sm sm:px-2 sm:py-1 ${mainData?.reacted ? 'bg-primary-100 border-primary-400' : 'bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700'}`}
        onClick={() => setOpen(v => !v)}
        aria-label={main.label}
        type="button"
        style={{ touchAction: 'manipulation' }}
      >
        <span className="text-xl sm:text-base">{main.emoji}</span>
        <span className="font-medium">{mainData?.count || 0}</span>
      </button>
      {/* Reacciones desplegables */}
      {open && (
        <div className="absolute left-0 top-full mt-2 z-20 flex gap-2 bg-white dark:bg-gray-900 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
          {rest.map(opt => {
            const data = reactions.find(r => r.emoji === opt.emoji);
            return (
              <button
                key={opt.emoji}
                className={`flex items-center gap-1 px-3 py-2 rounded-full border text-base transition-all min-w-[44px] min-h-[40px] sm:text-sm sm:px-2 sm:py-1 ${data?.reacted ? 'bg-primary-100 border-primary-400' : 'bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700'}`}
                onClick={() => { onReact(opt.emoji); setOpen(false); }}
                aria-label={opt.label}
                type="button"
                style={{ touchAction: 'manipulation' }}
              >
                <span className="text-xl sm:text-base">{opt.emoji}</span>
                <span className="font-medium">{data?.count || 0}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReactionsBar;
