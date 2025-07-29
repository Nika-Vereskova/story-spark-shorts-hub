import { useEffect } from 'react';

const ScrollBorder = () => {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.scroll-border');
      if (nav) {
        if (window.scrollY > 0) {
          nav.classList.add('border-b');
          nav.classList.remove('border-b-0');
        } else {
          nav.classList.add('border-b-0');
          nav.classList.remove('border-b');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

export default ScrollBorder;