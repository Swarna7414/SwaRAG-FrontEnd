import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import DataBase from "../src/Pages/DataBase";
import cursorImage from "./assets/cursor.png";

const App: React.FC = () => {
  useEffect(() => {
    
    document.body.style.cursor = `url(${cursorImage}), auto`;
    
    
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      * {
        cursor: url(${cursorImage}), auto !important;
      }
    `;
    document.head.appendChild(style);

    
    const applyPointerCursor = () => {
      
      const navLinks = document.querySelectorAll('a[href="/"], a[href="/about"], a[href*="db-console"]');
      navLinks.forEach(link => {
        if (link instanceof HTMLElement) {
          link.style.cursor = 'pointer';
          
          link.querySelectorAll('*').forEach(child => {
            if (child instanceof HTMLElement) {
              child.style.cursor = 'pointer';
            }
          });
        }
      });

      
      const allButtons = document.querySelectorAll('button');
      allButtons.forEach(btn => {
        const text = btn.textContent?.trim();
        
        // Search and RAG buttons - find by text content
        if (text === 'Search' || text === 'RAG') {
          btn.style.cursor = 'pointer';
        }
        

        if (btn.querySelector('svg')) {
          btn.style.cursor = 'pointer';
        }
      });
    };

 
    applyPointerCursor();


    const observer = new MutationObserver(() => {
      applyPointerCursor();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });


    const timeoutId = setTimeout(applyPointerCursor, 100);

    return () => {
      
      const styleElement = document.getElementById('custom-cursor-style');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
      observer.disconnect();
      clearTimeout(timeoutId);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/database" element={<DataBase />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;