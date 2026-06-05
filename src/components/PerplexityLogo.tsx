import { cn } from '@/lib/utils';

interface PerplexityLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    showText?: boolean;
}

function AlbatrossBirdWandIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Elegant, minimal albatross bird in flight (wings outspread) */}
            <path
                d="M12 11.5C9 9.5 5.5 9 2.5 10C5 11.5 8.5 12.5 12 11.5C15.5 12.5 19 11.5 21.5 10C18.5 9 15 9.5 12 11.5Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Wand (the bird's body/backbone) */}
            <line
                x1="12"
                y1="19.5"
                x2="12"
                y2="7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            {/* Wand Tip Sparkle (Diamond shape) */}
            <path
                d="M12 5.5L11 7L12 8.5L13 7Z"
                fill="currentColor"
            />
            {/* Spell: Sparkling dust and trails */}
            <path
                d="M12 7C9.5 5 8.5 7 6.5 6.5"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="1 1"
                opacity="0.6"
            />
            <path
                d="M12 7C14.5 5 15.5 7 17.5 6.5"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="1 1"
                opacity="0.6"
            />
            <circle cx="12" cy="3.5" r="0.8" fill="currentColor" opacity="0.9" />
            <circle cx="9.5" cy="4" r="0.6" fill="currentColor" opacity="0.75" />
            <circle cx="14.5" cy="4.5" r="0.6" fill="currentColor" opacity="0.75" />
            <circle cx="11" cy="2" r="0.4" fill="currentColor" opacity="0.9" />
            <circle cx="13" cy="2" r="0.4" fill="currentColor" opacity="0.9" />
        </svg>
    );
}

// Albatross AI's signature minimal geometric emblem
export function PerplexityLogo({ size = 'md', className, showText = false }: PerplexityLogoProps) {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
    };

    const textSizes = {
        sm: 'text-base tracking-widest uppercase font-light',
        md: 'text-lg tracking-widest uppercase font-light',
        lg: 'text-xl tracking-widest uppercase font-light',
        xl: 'text-2xl tracking-widest uppercase font-light',
    };

    return (
        <div className={cn('flex items-center gap-2.5', className)}>
            {/* Minimalist A / Wing emblem */}
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className={cn(sizeClasses[size], 'text-foreground')}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 3L4 21M12 3L20 21M7 15H17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {showText && (
                <span className={cn(
                    'font-medium tracking-widest text-foreground flex items-center gap-[0.15em] whitespace-nowrap',
                    textSizes[size]
                )}>
                    <AlbatrossBirdWandIcon className="w-[1.2em] h-[1.2em] self-center -mt-1 shrink-0" />
                    <span>LBATROSS AI</span>
                </span>
            )}
        </div>
    );
}

// Alternative: Simple circular A icon
export function PerplexityIcon({ size = 'md', className }: Omit<PerplexityLogoProps, 'showText'>) {
    const sizeClasses = {
        sm: 'w-5 h-5 text-xs',
        md: 'w-6 h-6 text-sm',
        lg: 'w-8 h-8 text-base',
        xl: 'w-10 h-10 text-lg',
    };

    return (
        <div className={cn(
            'rounded-md border border-foreground/20 bg-foreground/5 flex items-center justify-center font-light text-foreground',
            sizeClasses[size],
            className
        )}>
            A
        </div>
    );
}
