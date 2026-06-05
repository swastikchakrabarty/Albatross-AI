import { useState, useRef, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useChatStore } from '@/lib/store';

export function UserMenu() {
    const { user, logoutManual } = useChatStore();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    const initial = user.email.charAt(0).toUpperCase();

    const handleLogout = () => {
        logoutManual();
        window.location.hash = '#/signin';
    };

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-sm font-medium hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
                {initial}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 py-1 bg-card border border-border/50 rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-200 z-50 overflow-hidden">
                    <div className="px-4 py-2 border-b border-border/50 bg-muted/20">
                        <p className="text-xs font-medium text-foreground truncate">{user.email}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors mt-1"
                    >
                        <FiLogOut className="w-4 h-4" />
                        <span>Log out</span>
                    </button>
                </div>
            )}
        </div>
    );
}
