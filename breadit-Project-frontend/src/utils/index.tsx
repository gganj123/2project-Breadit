import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const sliceDate = (date: string) => {
  return date.slice(0, 10);
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
