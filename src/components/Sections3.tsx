import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

const PhotoCard: React.FC<{ initialImgUrl: string; index: number }> = ({ initialImgUrl, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-[clamp(145px,27vw,188px)] h-[clamp(180px,34vw,238px)] shrink-0 border border-gold-1/20 flex items-center justify-center text-[2.8rem] relative overflow-hidden shadow-[0_6px_22px_rgba(28,16,4,0.1)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.08] hover:-rotate-2 hover:shadow-[0_20px_40px_rgba(212,175,106,0.2)] hover:border-gold-1/50 hover:z-10 group"
      style={{
        background: 'linear-gradient(148deg, var(--wm), var(--cr), var(--wm))'
      }}
    >
      <div className="absolute inset-1.5 border border-gold-1/20 z-[1] pointer-events-none transition-all duration-700 group-hover:inset-2 group-hover:border-gold-1/40"></div>

      <div className="absolute inset-2.5 z-0 overflow-hidden rounded-sm shadow-inner transition-all duration-700 group-hover:inset-3">
        {isInView && (
          <img
            src={initialImgUrl}
            alt="Gallery Photo"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-[1000ms] ease-out group-hover:scale-[1.05] ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            referrerPolicy="no-referrer"
            style={{ willChange: 'transform, opacity' }}
          />
        )}
        {!isLoaded && (
          <div className="w-full h-full bg-gradient-to-br from-gold-1/20 to-gold-2/20 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export function Gallery() {
  const row1 = [
    '/images/LmpwZw.jpg',
    '/images/LnBuZw.jpg',
    '/images/MTg1NDYuanBn.jpg',
    '/images/MjMwODA3LmpwZw.jpg',
    '/images/MjQ2NTEuanBn.jpg',
    '/images/MzIuSlBHLmpwZWc.jpg',
    '/images/MzcyMjk1MS5qcGc.jpg',
    '/images/NDQ4MDAwLndlYnA.jpg',
    '/images/NDQuanBn.jpg',
    '/images/Njc1.jpg',
    '/images/NzQwODYuanBn.jpg',
    '/images/NzQyLndlYnA.jpg'
  ];
  const row2 = [
    '/images/OTA0MS5qcGc.jpg',
    '/images/V09UOC5qcGc.jpg',
    '/images/YS5qcGc.jpg',
    '/images/YXRlZi5qcGc.jpg',
    '/images/ZGU9NA.jpg',
    '/images/aWduLTkyLndlYnA.jpg',
    '/images/amF5LS5qcGc.jpg',
    '/images/b2RlPTQ.jpg',
    '/images/bWlrYS5qcGc.jpg',
    '/images/cA.jpg',
    '/images/cGc.jpg',
    '/images/MzMuSlBHLmpwZWc.jpg'
  ];

  useEffect(() => {
    let t: number | undefined;
    const onScroll = () => {
      document.body.classList.add('is-scrolling');
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        document.body.classList.remove('is-scrolling');
        t = undefined;
      }, 140);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (t) window.clearTimeout(t);
      document.body.classList.remove('is-scrolling');
    };
  }, []);

  return (
    <section className="py-[clamp(5rem,11vw,9rem)] relative overflow-hidden bg-ivory" id="gal">
      <div className="text-center mb-[clamp(3rem,8vw,5.5rem)] px-8">
        <motion.span initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9 }} className="font-cinzel text-[clamp(0.48rem,1.2vw,0.6rem)] tracking-[0.65em] uppercase text-gold-2 block mb-3">Memories in the Making</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.1 }} className="font-im-fell text-[clamp(2rem,6vw,4rem)] text-ink-1 leading-[1.1] mb-2">Our <em className="italic text-gold-2">Moments</em></motion.h2>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.3 }} className="flex items-center gap-3 justify-center mt-6">
          <div className="w-[70px] h-[1px] bg-gradient-to-r from-transparent to-gold-1/45"></div>
          <div className="w-[7px] h-[7px] bg-gold-1 rotate-45"></div>
          <div className="w-[70px] h-[1px] bg-gradient-to-l from-transparent to-gold-1/45"></div>
        </motion.div>
      </div>
      <div className="overflow-hidden mb-3.5 py-6 -my-6">
        <div className="gal-strip">
          {row1.map((url, i) => (
            <PhotoCard key={i} initialImgUrl={url} index={i} />
          ))}
        </div>
      </div>
      <div className="overflow-hidden py-6 -my-6">
        <div className="gal-strip rev">
          {row2.map((url, i) => (
            <PhotoCard key={i} initialImgUrl={url} index={i + 12} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blessing() {
  return (
    <section className="p-[clamp(5rem,11vw,9rem)_clamp(1.5rem,5.5vw,5rem)] relative overflow-hidden bg-[linear-gradient(158deg,#F8F1E0_0%,#F2E8CF_50%,#ECDFBE_100%)] text-center bless-sec" id="bless">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9 }}
        className="max-w-[700px] mx-auto relative z-10"
      >
        <p className="font-im-fell italic text-[clamp(1.2rem,3.5vw,1.85rem)] text-ink-1 leading-[1.82] mb-[1.8rem]">"With the blessings of our beloved families, two hearts unite in love and joy."</p>
        <div className="w-11 h-[1px] bg-gradient-to-r from-transparent via-gold-1 to-transparent mx-auto mb-6"></div>
        <p className="font-cormorant italic text-[clamp(0.88rem,2.2vw,1.05rem)] text-ink-3">— With love &amp; blessings, Deverakonda &amp; Mandanna Families</p>
      </motion.div>
    </section>
  );
}

export function RSVP() {
  return (
    <section className="p-[clamp(5rem,11vw,9rem)_clamp(1.5rem,5.5vw,5rem)] relative overflow-hidden bg-ivory" id="rsvp">
      <div className="text-center mb-[clamp(3rem,8vw,5.5rem)]">
        <motion.span initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9 }} className="font-cinzel text-[clamp(0.48rem,1.2vw,0.6rem)] tracking-[0.65em] uppercase text-gold-2 block mb-3">Your Presence Is Our Greatest Gift</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.1 }} className="font-im-fell text-[clamp(2rem,6vw,4rem)] text-ink-1 leading-[1.1] mb-2">RSVP &amp; <em className="italic text-gold-2">Contact</em></motion.h2>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.2 }} className="flex items-center gap-3 justify-center">
          <div className="w-[70px] h-[1px] bg-gradient-to-r from-transparent to-gold-1/45"></div>
          <div className="w-[7px] h-[7px] bg-gold-1 rotate-45"></div>
          <div className="w-[70px] h-[1px] bg-gradient-to-l from-transparent to-gold-1/45"></div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9 }}
        className="max-w-[640px] mx-auto bg-white/40 backdrop-blur-md border border-white/20 p-[clamp(2.5rem,7vw,4.8rem)] shadow-lg relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-1 via-25% via-gold-2 via-50% via-gold-1 via-75% to-transparent"></div>
        <div className="rcc tl"></div><div className="rcc tr"></div>
        <div className="rcc bl"></div><div className="rcc br"></div>
        <p className="text-center mb-[2.2rem] font-cormorant italic text-[clamp(0.92rem,2.4vw,1.1rem)] text-ink-3 leading-[1.85]">We request the honor of your presence to celebrate love, laughter, and the beginning of our forever.<br />Your presence will make our celebration complete.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] mb-[2.2rem]">
          <div className="p-[1rem_1.1rem] bg-cream border border-gold-1/15 text-center">
            <div className="font-cinzel text-[0.55rem] tracking-[0.35em] uppercase text-gold-2 mb-1.5">Phone</div>
            <div className="font-cormorant italic text-[clamp(0.9rem,2.3vw,1.02rem)] text-ink-1 leading-[1.5]">+91 9491283538</div>
          </div>
          <div className="p-[1rem_1.1rem] bg-cream border border-gold-1/15 text-center">
            <div className="font-cinzel text-[0.55rem] tracking-[0.35em] uppercase text-gold-2 mb-1.5">Email</div>
            <div className="font-cormorant italic text-[clamp(0.9rem,2.3vw,1.02rem)] text-ink-1 leading-[1.5]">weddinginvite<br />@example.com</div>
          </div>
          <div className="p-[1rem_1.1rem] bg-cream border border-gold-1/15 text-center sm:col-span-2">
            <div className="font-cinzel text-[0.55rem] tracking-[0.35em] uppercase text-gold-2 mb-1.5">Dress Code</div>
            <div className="font-cormorant italic text-[clamp(0.9rem,2.3vw,1.02rem)] text-ink-1 leading-[1.5]">Traditional / Festive Indian</div>
          </div>
        </div>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="block text-center no-underline p-[16px_28px] bg-gradient-to-br from-rust-1 to-rust-2 text-white font-cinzel text-[0.62rem] tracking-[0.42em] uppercase shadow-[0_6px_28px_rgba(110,36,24,0.32)] transition-all duration-300 relative overflow-hidden shimmer-btn hover:-translate-y-[3px] hover:shadow-[0_12px_38px_rgba(110,36,24,0.4)]">
          Get Directions · Hyderabad, Telangana
        </a>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[linear-gradient(158deg,#F2E8CF_0%,#ECDFBC_50%,#E5D4A6_100%)] p-[clamp(5rem,12vw,8rem)_2rem_clamp(3rem,6vw,5rem)] text-center relative overflow-hidden border-t border-gold-1/20">
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(560px,92vw)] opacity-[0.06] animate-[spinSlow_90s_linear_infinite] pointer-events-none" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(220,220)" stroke="#B8923C" fill="none">
          <circle r="200" strokeWidth=".5" /><circle r="170" strokeWidth=".3" /><circle r="140" strokeWidth=".8" /><circle r="110" strokeWidth=".4" /><circle r="80" strokeWidth="1" /><circle r="50" strokeWidth=".5" /><circle r="20" strokeWidth=".5" />
          <line x1="-200" y1="0" x2="200" y2="0" strokeWidth=".3" /><line x1="0" y1="-200" x2="0" y2="200" strokeWidth=".3" />
          <line x1="-141" y1="-141" x2="141" y2="141" strokeWidth=".3" /><line x1="141" y1="-141" x2="-141" y2="141" strokeWidth=".3" />
          <polygon points="0,-200 5,-192 0,-184 -5,-192" fill="#B8923C" /><polygon points="0,200 5,192 0,184 -5,192" fill="#B8923C" />
          <polygon points="200,0 192,5 184,0 192,-5" fill="#B8923C" /><polygon points="-200,0 -192,5 -184,0 -192,-5" fill="#B8923C" />
          <polygon points="0,-80 4,-74 0,-68 -4,-74" fill="#B8923C" /><polygon points="80,0 74,4 68,0 74,-4" fill="#B8923C" />
          <polygon points="0,80 4,74 0,68 -4,74" fill="#B8923C" /><polygon points="-80,0 -74,4 -68,0 -74,-4" fill="#B8923C" />
        </g>
      </svg>
      <p className="font-im-fell italic text-[clamp(3rem,10vw,7.5rem)] text-ink-1 mb-1.5 relative z-10 leading-[1.05]">Vijay &amp; Rashmika</p>
      <p className="font-cinzel text-[clamp(0.52rem,1.3vw,0.66rem)] tracking-[0.6em] uppercase text-ink-4 mb-8 relative z-10">15 · December · 2026 · Hyderabad, India</p>
      <div className="flex items-center gap-3.5 justify-center mb-7 relative z-10">
        <div className="w-[70px] h-[1px] bg-gradient-to-r from-transparent to-gold-1/40"></div>
        <div className="w-[7px] h-[7px] bg-gold-1 rotate-45"></div>
        <div className="w-[70px] h-[1px] bg-gradient-to-l from-transparent to-gold-1/40"></div>
      </div>
      <span className="font-cormorant italic text-[clamp(0.9rem,2.3vw,1.15rem)] text-gold-3 block mb-10 relative z-10">#VijayWedsRashmika</span>
      <p className="font-cinzel text-[0.47rem] tracking-[0.5em] uppercase text-ink-3/30 relative z-10">Crafted with love · Deverakonda &amp; Mandanna Families · 2026</p>
    </footer>
  );
}
