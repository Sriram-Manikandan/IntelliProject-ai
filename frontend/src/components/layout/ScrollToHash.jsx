// components/layout/ScrollToHash.jsx
// ─────────────────────────────────────────────
// PURPOSE: A utility component that listens for URL hash changes
//          (e.g. /#about, /#faq) and smoothly scrolls to the
//          matching element on the page. Also scrolls to the top
//          on any page navigation that has no hash.
//
// Renders nothing — it is a behaviour-only component.
// Used by: App.jsx (placed once, inside BrowserRouter)
// ─────────────────────────────────────────────

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      // Find the element with the ID matching the hash (e.g. #about → id="about")
      const id = hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        // Small timeout to allow animations/rendering to settle before scrolling
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // No hash → scroll to top on page change
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return null; // This component renders nothing to the DOM
}
