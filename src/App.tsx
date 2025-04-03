import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';

// Sections
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import AuthorSection from './sections/AuthorSection';
import PurchaseSection from './sections/PurchaseSection';

// For loading particles.js
interface Script {
  id: string;
  src: string;
  loaded: boolean;
}

const App: React.FC = () => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  
  // Load external scripts (particles.js)
  useEffect(() => {
    const scripts: Script[] = [
      {
        id: 'particles-js-script',
        src: 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js',
        loaded: false
      }
    ];
    
    const loadScripts = async () => {
      const scriptPromises = scripts.map((script) => {
        return new Promise<void>((resolve) => {
          // Check if script is already loaded
          if (document.getElementById(script.id)) {
            script.loaded = true;
            resolve();
            return;
          }
          
          // Create script element
          const scriptElement = document.createElement('script');
          scriptElement.id = script.id;
          scriptElement.src = script.src;
          scriptElement.async = true;
          
          // Script loaded handler
          scriptElement.onload = () => {
            script.loaded = true;
            resolve();
          };
          
          // Script error handler
          scriptElement.onerror = () => {
            console.error(`Failed to load script: ${script.src}`);
            resolve(); // Resolve anyway to not block other scripts
          };
          
          // Add script to document
          document.body.appendChild(scriptElement);
        });
      });
      
      await Promise.all(scriptPromises);
      setScriptsLoaded(true);
    };
    
    loadScripts();
    
    // Cleanup function
    return () => {
      scripts.forEach((script) => {
        const scriptElement = document.getElementById(script.id);
        if (scriptElement) {
          document.body.removeChild(scriptElement);
        }
      });
    };
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <main>
        <HeroSection />
        {scriptsLoaded && <ParticlesBackground />}
        <AboutSection />
        <AuthorSection />
        <PurchaseSection />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
