import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

export function Hero({ show = true }: { show?: boolean }) {
  const name = "Vijay & Rashmika";
  const { ref: heroRef, isInView } = useInView(0.1);

  const groomImg = "/bride/vijay-deverakonda-at-keeda-cola-eventthumb.webp";
  const brideImg = "/bride/HD-wallpaper-rashmika-mandanna-actress-angel-cute-rashmikha-rashmikha-mandanna-thumbnail.webp";
  const coupleImg = "/both/rashmika-mandanna-and-vijay-devarakonda-marriage-2025-11-06-12-39-52-2025-12-30-11-26-26.webp";

  const container = {
    hidden: { opacity: 0, scale: 0.95, z: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      z: 0,
      transition: { duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section ref={heroRef} id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#FDFAF3] via-[#F6EDD8] to-[#EDD9B4] pt-[58px]">

      {/* Background Pattern & Vignette */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral-pattern.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)] pointer-events-none" />

      {/* Floating Particles - reduced count and only animate when visible */}
      {isInView && [...Array(8)].map((_, i) => {
        const r1 = Math.random();
        const r2 = Math.random();
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-gold-1 rounded-full z-0 pointer-events-none"
            style={{ filter: 'blur(1px)' }}
            initial={{
              opacity: 0,
              x: `${r1 * 100}vw`,
              y: `${r2 * 100}vh`,
              scale: 0
            }}
            animate={show ? {
              opacity: [0, 0.4, 0],
              y: `${r2 * 100 - 10}vh`,
              scale: [0, Math.random() * 1.5 + 0.5, 0]
            } : { opacity: 0 }}
            transition={{
              duration: 4 + Math.random() * 4,
              delay: Math.random() * 2,
              repeat: 2,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Floating Petals - reduced count and only animate when visible */}
      {isInView && [...Array(4)].map((_, i) => {
        const r1 = Math.random();
        return (
          <motion.div
            key={`petal-${i}`}
            className="absolute w-3 h-3 md:w-4 md:h-4 bg-white/40 rounded-tl-full rounded-br-full z-0 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ filter: 'blur(1px)', transformOrigin: 'center' }}
            initial={{
              opacity: 0,
              x: `${r1 * 100}vw`,
              y: `-10vh`,
              rotate: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={show ? {
              opacity: [0, 0.6, 0],
              y: `110vh`,
              x: `${r1 * 100 + (Math.random() * 20 - 10)}vw`,
              rotate: 360
            } : { opacity: 0 }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: Math.random() * 5,
              repeat: 1,
              ease: "linear"
            }}
          />
        );
      })}

      {/* Cinematic Couple Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 pointer-events-none"
        initial={{ opacity: 0, scale: 1, z: 0 }}
        animate={show ? { opacity: 0.15, scale: 1.05, z: 0 } : { opacity: 0, scale: 1, z: 0 }}
        transition={{ duration: 4, delay: 0, ease: "easeOut" }}
        style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
      >
        <img
          src={coupleImg}
          alt="Couple"
          className="w-full h-full object-cover blur-[2px]"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Floating Sparkles near couple - reduced and conditional */}
      {isInView && show && [...Array(3)].map((_, i) => {
        const r1 = Math.random();
        return (
          <motion.div
            key={`sparkle-l-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full z-20 pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.8)] hidden md:block"
            initial={{ opacity: 0, x: `${15 + r1 * 10}vw`, y: `${40 + i * 10}vh`, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: `${30 + i * 10}vh`, scale: [0, 1.5, 0] }}
            transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 3, repeat: 2, ease: "easeInOut" }}
          />
        );
      })}
      {isInView && show && [...Array(3)].map((_, i) => {
        const r1 = Math.random();
        return (
          <motion.div
            key={`sparkle-r-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full z-20 pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.8)] hidden md:block"
            initial={{ opacity: 0, x: `${75 + r1 * 10}vw`, y: `${40 + i * 10}vh`, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: `${30 + i * 10}vh`, scale: [0, 1.5, 0] }}
            transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 3, repeat: 2, ease: "easeInOut" }}
          />
        );
      })}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-[1200px] px-4 md:px-12 h-full">

        {/* Groom Character */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotate: 4, z: 0 }}
          animate={show ? { opacity: 1, x: 0, rotate: 4, z: 0 } : { opacity: 0, x: -80, rotate: 4, z: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute left-4 md:left-0 w-[28vw] md:w-[22vw] max-w-[280px] aspect-[3/4] rounded-t-full overflow-hidden border-2 md:border-4 border-white/60 shadow-2xl origin-bottom-right z-0 md:z-10"
          style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full opacity-40 md:opacity-100">
            <img
              src={groomImg}
              alt="Groom"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-1/50 to-transparent"></div>
          </div>
        </motion.div>

        {/* Center Text Area */}
        <div className="flex flex-col items-center justify-center text-center z-20 relative px-4 md:px-8 max-w-lg mx-auto">
          {/* Soft Golden Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,106,0.25)_0%,transparent_60%)] blur-2xl pointer-events-none"
          />

          <motion.p
            initial={{ opacity: 0, y: 10, z: 0 }}
            animate={show ? { opacity: 1, y: 0, z: 0 } : { opacity: 0, y: 10, z: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-cinzel text-xs md:text-sm tracking-[0.5em] uppercase text-gold-3 mb-6 relative whitespace-nowrap"
            style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
          >
            The Wedding Of
          </motion.p>

          <motion.h1
            className="font-im-fell text-4xl md:text-6xl lg:text-8xl text-ink-1 mb-6 text-center relative leading-[1.1]"
            variants={container}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden', textShadow: '0 0 12px rgba(212,175,106,0.4)' }}
          >
            {name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10, z: 0 }}
            animate={show ? { opacity: 1, y: 0, z: 0 } : { opacity: 0, y: 10, z: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 relative"
            style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
          >
            <div className="w-8 md:w-16 h-[1px] bg-gold-1/60"></div>
            <span className="font-cormorant italic text-xl md:text-2xl text-ink-2 whitespace-nowrap">15 December 2026</span>
            <div className="w-8 md:w-16 h-[1px] bg-gold-1/60"></div>
          </motion.div>
        </div>

        {/* Bride Character */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotate: -4, z: 0 }}
          animate={show ? { opacity: 1, x: 0, rotate: -4, z: 0 } : { opacity: 0, x: 80, rotate: -4, z: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute right-4 md:right-0 w-[28vw] md:w-[22vw] max-w-[280px] aspect-[3/4] rounded-t-full overflow-hidden border-2 md:border-4 border-white/60 shadow-2xl origin-bottom-left z-0 md:z-10"
          style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full opacity-40 md:opacity-100">
            <img
              src={brideImg}
              alt="Bride"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-1/50 to-transparent"></div>
          </div>
        </motion.div>

      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10, z: 0 }}
        animate={show ? { opacity: 1, y: 0, z: 0 } : { opacity: 0, y: -10, z: 0 }}
        transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
        style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
      >
        <span className="font-cormorant italic text-lg text-ink-3 tracking-wide">Scroll to Begin the Celebration</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-gold-1/40 rounded-full flex justify-center p-1.5 shadow-[0_0_15px_rgba(212,175,106,0.15)] bg-white/10 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 bg-gold-2 rounded-full shadow-[0_0_8px_rgba(184,146,60,0.8)]" />
        </motion.div>
      </motion.div>

    </section>
  );
}
