import { useState, useEffect } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    movie1280: width >= 1280,
    movie990: width >= 990 && width < 1280,
    movie768: width >= 768 && width < 990,
    movie320: width < 768,
  };
};