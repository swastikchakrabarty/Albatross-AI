import { SignIn, SignUp } from '@clerk/clerk-react';
import { useState } from 'react';


export function Auth() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');

    // Listen for hash changes to switch between signin/signup
    if (window.location.hash === '#/signup' && mode !== 'signup') {
        setMode('signup');
    } else if (window.location.hash === '#/signin' && mode !== 'signin') {
        setMode('signin');
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 animate-in fade-in duration-500">


            {mode === 'signin' ? (
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto w-full max-w-md',
                            card: 'shadow-sm border border-border/40 bg-card rounded-md',
                            headerTitle: 'text-foreground font-light tracking-wide',
                            headerSubtitle: 'text-muted-foreground font-light',
                            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground rounded-md',
                            formFieldInput: 'rounded-md border-border/40',
                        },
                    }}
                    routing="hash"
                    signUpUrl="#/signup"
                />
            ) : (
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto w-full max-w-md',
                            card: 'shadow-sm border border-border/40 bg-card rounded-md',
                            headerTitle: 'text-foreground font-light tracking-wide',
                            headerSubtitle: 'text-muted-foreground font-light',
                            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground rounded-md',
                            formFieldInput: 'rounded-md border-border/40',
                        },
                    }}
                    routing="hash"
                    signInUrl="#/signin"
                />
            )}
        </div>
    );
}
