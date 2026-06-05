import { useEffect, useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Chat } from './pages/Chat';
import { Auth } from './pages/Auth';
import { Welcome } from './pages/Welcome';
import { NotImplemented } from './pages/NotImplemented';
import { useChatStore } from './lib/store';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const { isAuthenticated } = useChatStore();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirect to welcome if signed in and on auth pages
  useEffect(() => {
    if (isAuthenticated && (currentPath === '#/signin' || currentPath === '#/signup')) {
      window.location.hash = '#/welcome';
    }
  }, [isAuthenticated, currentPath]);

  // Handle routes
  if (currentPath === '#/not-implemented') {
    return (
      <ThemeProvider>
        <NotImplemented />
      </ThemeProvider>
    );
  }

  if (currentPath === '#/chat') {
    return (
      <ThemeProvider>
        {isAuthenticated ? <Chat /> : <Auth />}
      </ThemeProvider>
    );
  }

  // Default to welcome page for signed-in users
  return (
    <ThemeProvider>
      {isAuthenticated ? <Welcome /> : <Auth />}
    </ThemeProvider>
  );
}

export default App;
