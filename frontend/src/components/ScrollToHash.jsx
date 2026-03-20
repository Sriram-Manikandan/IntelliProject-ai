import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      // Find the element with the ID matching the hash
      const id = hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        // Small timeout to allow for animations/rendering to settle
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // If no hash, scroll to top on page change
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return null;
}
