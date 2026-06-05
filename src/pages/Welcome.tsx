import { FiSearch, FiArrowRight, FiSun, FiMoon, FiZap, FiBookOpen, FiShield } from 'react-icons/fi';
import { useChatStore } from '@/lib/store';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { PerplexityLogo } from '@/components/PerplexityLogo';
import { Footer } from '@/components/Footer';
import { UserMenu } from '@/components/UserMenu';

export function Welcome() {
    const { createConversation } = useChatStore();
    const { theme, toggleTheme } = useTheme();

    const handleStartChat = () => {
        createConversation();
        window.location.hash = '#/chat';
    };

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
            {/* Minimal Navbar */}
            {/* Minimal Navbar */}
            <header className="absolute top-0 w-full z-10 p-4 sm:p-6 flex justify-between items-center bg-background/50 backdrop-blur-sm border-b border-border/50">
                <PerplexityLogo size="lg" showText />
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="h-9 w-9 text-muted-foreground hover:text-foreground"
                    >
                        {theme === 'dark' ? (
                            <FiSun className="w-5 h-5" />
                        ) : (
                            <FiMoon className="w-5 h-5" />
                        )}
                    </Button>
                    <div className="scale-100 flex items-center justify-center">
                        <UserMenu />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 pt-24 sm:p-8 animate-in fade-in duration-700">
                <div className="w-full max-w-2xl space-y-8 text-center flex flex-col items-center">

                    {/* Animated Central Icon */}
                    <div className="mb-4 relative group cursor-default">
                        <div className="absolute inset-0 bg-foreground/5 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <PerplexityLogo size="xl" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl text-foreground font-light tracking-widest uppercase mb-12">
                        Where knowledge begins
                    </h1>

                    {/* Fake Search Input (Click to Start) */}
                    <div
                        onClick={handleStartChat}
                        className="group relative w-full cursor-text"
                    >
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
                            <FiSearch className="h-5 w-5 text-muted-foreground/60" />
                        </div>

                        <div className="w-full h-16 sm:h-20 bg-card hover:bg-card/80 border border-border/50 hover:border-foreground/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center px-14 text-lg text-muted-foreground/80 relative overflow-hidden glass-panel">
                            Ask anything...
                        </div>

                        <div className="absolute inset-y-0 right-4 flex items-center z-10">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted/50 rounded-md flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <FiArrowRight className="text-muted-foreground group-hover:text-foreground transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Suggestions / Pill Links */}
                    <div className="flex flex-wrap justify-center gap-3 pt-2 opacity-80">
                        {['DeepSeek vs OpenAI', 'History of Rome', 'Python Asyncio', 'Best sci-fi movies'].map((topic) => (
                            <button
                                key={topic}
                                onClick={handleStartChat}
                                className="text-xs sm:text-sm px-4 py-2 rounded-md border border-border/50 hover:border-foreground/30 bg-card/20 hover:bg-card/60 transition-all font-light tracking-wide"
                            >
                                {topic}
                            </button>
                        ))}
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-12 pt-8 border-t border-border/40">
                        <div className="p-5 rounded-lg bg-card/20 border border-border/40 hover:border-foreground/20 hover:bg-card/40 transition-all duration-300 group text-left">
                            <div className="w-10 h-10 rounded-md bg-foreground/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <FiZap className="w-5 h-5 text-foreground/80" />
                            </div>
                            <h3 className="font-medium text-foreground tracking-wide mb-1">Fast & Accurate</h3>
                            <p className="text-xs text-muted-foreground/80 leading-relaxed">Real-time answers from the web.</p>
                        </div>
                        <div className="p-5 rounded-lg bg-card/20 border border-border/40 hover:border-foreground/20 hover:bg-card/40 transition-all duration-300 group text-left">
                            <div className="w-10 h-10 rounded-md bg-foreground/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <FiBookOpen className="w-5 h-5 text-foreground/80" />
                            </div>
                            <h3 className="font-medium text-foreground tracking-wide mb-1">Citations Included</h3>
                            <p className="text-xs text-muted-foreground/80 leading-relaxed">Trustworthy sources for every claim.</p>
                        </div>
                        <div className="p-5 rounded-lg bg-card/20 border border-border/40 hover:border-foreground/20 hover:bg-card/40 transition-all duration-300 group text-left">
                            <div className="w-10 h-10 rounded-md bg-foreground/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <FiShield className="w-5 h-5 text-foreground/80" />
                            </div>
                            <h3 className="font-medium text-foreground tracking-wide mb-1">Private & Secure</h3>
                            <p className="text-xs text-muted-foreground/80 leading-relaxed">Your data stays with you.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
