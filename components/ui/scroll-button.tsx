'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './button';

export function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando hemos scrolleado un poco
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToBottom}
      className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 shadow-lg flex items-center justify-center z-50"
      size="icon"
    >
      <ChevronDown className="h-6 w-6" />
    </Button>
  );
}
