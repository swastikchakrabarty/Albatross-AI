import { useState } from 'react';
import type { FormEvent } from 'react';
import { useChatStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { PerplexityLogo } from '@/components/PerplexityLogo';

export function Auth() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const { loginManual, signUpManual } = useChatStore();

    // Listen for hash changes to switch between signin/signup
    if (window.location.hash === '#/signup' && mode !== 'signup') {
        setMode('signup');
        setError('');
    } else if (window.location.hash === '#/signin' && mode !== 'signin') {
        setMode('signin');
        setError('');
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Simple hash simulation for local storage
        const passwordHash = btoa(password).split('').reverse().join('');

        if (mode === 'signin') {
            const success = loginManual(email, passwordHash);
            if (!success) {
                setError('Invalid email or password');
            } else {
                window.location.hash = '#/chat';
            }
        } else {
            const success = signUpManual(email, passwordHash);
            if (!success) {
                setError('Email already exists');
            } else {
                window.location.hash = '#/chat';
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 animate-in fade-in duration-500">
            <div className="w-full max-w-md bg-card/30 backdrop-blur-md border border-border/40 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-foreground/5 blur-3xl rounded-full scale-150 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-8 scale-110">
                        <PerplexityLogo size="md" showText={false} />
                    </div>
                    
                    <h1 className="text-2xl font-light tracking-wide text-foreground mb-2">
                        {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-sm text-muted-foreground font-light mb-8 text-center">
                        {mode === 'signin' 
                            ? 'Enter your details to access your account' 
                            : 'Sign up to start exploring knowledge'}
                    </p>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/50 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 transition-all outline-none text-foreground text-sm font-light placeholder:text-muted-foreground/50"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/50 focus:border-foreground/30 focus:ring-1 focus:ring-foreground/30 transition-all outline-none text-foreground text-sm font-light placeholder:text-muted-foreground/50"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-xs text-center py-1 bg-red-500/10 rounded-md border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-12 mt-4 text-sm font-medium tracking-wide">
                            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="mt-6 text-sm text-muted-foreground font-light">
                        {mode === 'signin' ? (
                            <p>
                                Don't have an account?{' '}
                                <a href="#/signup" className="text-foreground hover:underline transition-all">Sign up</a>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <a href="#/signin" className="text-foreground hover:underline transition-all">Sign in</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
