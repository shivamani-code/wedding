/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Cursor, MusicPlayer, ProgressBar, Loader, Navbar } from './components/Shared';
import { InvitationCard } from './components/InvitationCard';
import { Hero } from './components/Sections1';
import { Events, Timeline, Family } from './components/Sections2';
import { Gallery, Blessing, RSVP, Footer } from './components/Sections3';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    const imageUrls = [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546073340-7e3f81881516?q=80&w=1000&auto=format&fit=crop"
    ];

    let loadedCount = 0;
    let isMounted = true;
    const startTime = Date.now();

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length && isMounted) {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 1500 - elapsed); // Reduced loading time
        setTimeout(() => {
          if (isMounted) setIsLoading(false);
        }, remaining);
      }
    };

    // Preload images with error handling
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = handleLoad;
      img.onerror = handleLoad; // Count errors as loaded to prevent infinite loading
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenCard = () => {
    if (isCardOpen) return;
    setIsCardOpen(true);
  };

  return (
    <>
      <div className="noise-overlay" />
      <Cursor />
      <ProgressBar />
      <MusicPlayer />
      <Loader isLoading={isLoading} />

      {!isLoading && (
        <>
          <InvitationCard isOpen={isCardOpen} onOpen={handleOpenCard} />

          <div
            className="bg-ivory transition-opacity"
            style={{
              opacity: isCardOpen ? 1 : 0,
              transitionDuration: '0.6s',
              transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
              willChange: 'opacity',
              pointerEvents: isCardOpen ? 'auto' : 'none'
            }}
          >
            <Navbar show={isCardOpen} />
            <Hero show={isCardOpen} />
            <Events />
            <Timeline />
            <Family />
            <Gallery />
            <Blessing />
            <RSVP />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
