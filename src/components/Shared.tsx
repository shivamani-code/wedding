import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';

export function Cursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const cur2Ref = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const rafRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    let mx = 0, my = 0, cx = 0, cy = 0;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = `${mx}px`;
        curRef.current.style.top = `${my}px`;
      }

      const target = e.target as HTMLElement;
      isHovering = !!target.closest('a, button, [onClick], span, img');
    };

    const onVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };

    const loop = (time: number) => {
      // Throttle to 30fps and skip when tab hidden
      if (!isVisibleRef.current || time - lastUpdateRef.current < 33) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      lastUpdateRef.current = time;

      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (cur2Ref.current) {
        cur2Ref.current.style.left = `${cx}px`;
        cur2Ref.current.style.top = `${cy}px`;
        cur2Ref.current.style.transform = `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`;
        cur2Ref.current.style.background = isHovering ? 'rgba(212,175,55,0.1)' : 'transparent';
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={curRef} id="cur" className="fixed w-2 h-2 bg-gold-1 rounded-full pointer-events-none z-[99995] -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
      <div ref={cur2Ref} id="cur2" className="fixed w-7 h-7 border border-gold-1/40 rounded-full pointer-events-none z-[99994] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out hidden md:block"></div>
    </>
  );
}

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteracted = useRef(false);

  const toggleMusic = () => {
    if (hasError || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Audio play error:", error);
          // Don't set error state here, it might just be autoplay blocked
          setIsPlaying(false);
        });
      } else {
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;

      // Attempt to autoplay on mount
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          hasInteracted.current = true;
        }).catch(() => {
          // Autoplay was blocked, wait for user interaction
          setIsPlaying(false);
        });
      }
    }

    // Add event listeners to play on first user interaction if autoplay was blocked
    const handleFirstInteraction = () => {
      if (!hasInteracted.current && audioRef.current && !isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
          }).catch(() => {
            // Still blocked or error
          });
        }
      }

      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction, { passive: true });
    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  return (
    <>
      <button
        onClick={toggleMusic}
        disabled={hasError}
        className={`fixed bottom-7 right-7 w-11 h-11 bg-ivory/90 backdrop-blur-md border rounded-full flex items-center justify-center z-[8000] shadow-lg transition-all duration-300 ${!hasError ? 'cursor-pointer hover:scale-110 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'} ${isPlaying ? 'text-gold-2 border-gold-2' : 'text-ink-3 border-gold-1/40'}`}
        title={hasError ? "Music unavailable" : isPlaying ? "Pause music" : "Play music"}
      >
        {hasError ? '!' : isPlaying ? '♬' : '♪'}
      </button>
      <audio
        ref={audioRef}
        src="/wedding-song.mp3.mp3"
        loop
        preload="auto"
        autoPlay
        onError={(e) => {
          console.error("Audio error:", e);
          setHasError(true);
          setIsPlaying(false);
        }}
      />
    </>
  );
}

export function ProgressBar() {
  const [width, setWidth] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setWidth((scrollY / docHeight) * 100);
        }
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial calculation
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[1.5px] bg-gradient-to-r from-rust-1 via-gold-1 to-gold-2 z-[9000] shadow-[0_0_8px_rgba(212,175,106,0.6)] transition-all duration-75"
      style={{ width: `${width}%` }}
    />
  );
}

export function Loader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-ivory z-[99998] flex flex-col items-center justify-center gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel-dec text-gold-2 tracking-[0.18em] text-lg md:text-2xl"
          >
            Deverakonda · Mandanna
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-[120px] h-[1px] bg-warm relative overflow-hidden"
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-1 to-transparent"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="font-cinzel text-[0.58rem] tracking-[0.55em] uppercase text-ink-4"
            >
              Preparing Your Invitation
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar({ show }: { show: boolean }) {
  const [activeId, setActiveId] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const tickingRef = useRef(false);

  useEffect(() => {
    const sids = ['hero', 'ev', 'tl', 'fam', 'gal', 'bless', 'rsvp'];

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        for (let i = 0; i < sids.length; i++) {
          const el = document.getElementById(sids[i]);
          if (el) {
            const r = el.getBoundingClientRect();
            if (r.top <= window.innerHeight * 0.5 && r.bottom >= window.innerHeight * 0.5) {
              setActiveId(sids[i]);
              break;
            }
          }
        }
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'ev', label: 'Events' },
    { id: 'tl', label: 'Schedule' },
    { id: 'fam', label: 'Family' },
    { id: 'gal', label: 'Gallery' },
    { id: 'rsvp', label: 'RSVP' }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-[80px] flex items-center justify-between md:justify-center px-6 md:px-0 gap-[clamp(20px,5vw,64px)] bg-ivory/80 backdrop-blur-xl border-b border-gold-1/20 z-[8000] transition-all"
      style={{
        opacity: show ? 1 : 0,
        transitionDuration: '0.6s',
        transitionDelay: show ? '0.2s' : '0s',
        transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        transform: show ? 'translateZ(0) translateY(0)' : 'translateZ(0) translateY(-20px)'
      }}
    >
      {/* Mobile Logo centered absolute */}
      <div className="md:hidden absolute left-1/2 -translate-x-1/2 font-im-fell text-[clamp(1.5rem,4vw,2rem)] text-ink-1 font-bold tracking-wider">V & R</div>

      {/* Hamburger Icon */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-[8001] ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-ink-1 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-ink-1 transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-ink-1 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Nav Links */}
      <div className={`absolute md:relative top-[80px] md:top-0 left-0 right-0 bg-ivory/95 md:bg-transparent flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[clamp(20px,5vw,64px)] py-6 md:py-0 transition-all duration-300 md:opacity-100 md:translate-y-0 md:h-auto overflow-hidden ${menuOpen ? 'opacity-100 translate-y-0 h-auto border-b border-gold-1/20' : 'opacity-0 -translate-y-[150%] h-0 md:h-auto border-none'}`}>
        {navItems.map(item => (
          <span
            key={item.id}
            onClick={() => goTo(item.id)}
            className={`font-cormorant italic text-[clamp(1.5rem,2vw,1.4rem)] md:text-[clamp(1.1rem,2vw,1.4rem)] tracking-wide cursor-pointer transition-all duration-300 whitespace-nowrap py-2 px-3 relative group ${activeId === item.id ? 'text-gold-3 drop-shadow-[0_0_8px_rgba(184,146,60,0.5)]' : 'text-ink-3 hover:text-gold-2 hover:drop-shadow-[0_0_8px_rgba(184,146,60,0.4)]'}`}
          >
            {item.label}
            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold-2 to-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeId === item.id ? 'w-[80%] opacity-100' : 'w-0 opacity-0 group-hover:w-[80%] group-hover:opacity-100'}`}></span>
          </span>
        ))}
      </div>
    </nav>
  );
}
