import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useMemo, useState } from 'react';

export function Events() {
  const events = [
    {
      num: '01 · 06',
      icon: '💍',
      name: 'Engagement Ceremony',
      date: 'Saturday, 12 December 2026',
      time: '6:00 PM onwards',
      venueName: 'Taj Falaknuma Palace',
      venueAddress: 'Hyderabad',
      es: 'linear-gradient(to right,#F4CF50,#D4A010,#F4CF50)',
      ei: 'linear-gradient(135deg,#FEF9C3,#FDE678)',
      delay: 0.1
    },
    {
      num: '02 · 06',
      icon: '🪔',
      name: 'Haldi Ceremony',
      date: 'Sunday, 13 December 2026',
      time: '10:00 AM',
      venueName: 'The Park Hyderabad',
      venueAddress: 'Hyderabad',
      es: 'linear-gradient(to right,#F0A0BE,#C85888,#F0A0BE)',
      ei: 'linear-gradient(135deg,#FCE7F3,#FBCFE8)',
      delay: 0.2
    },
    {
      num: '03 · 06',
      icon: '🌿',
      name: 'Mehendi Ceremony',
      date: 'Sunday, 13 December 2026',
      time: '5:00 PM',
      venueName: 'ITC Kohenur',
      venueAddress: 'Hyderabad',
      es: 'linear-gradient(to right,#7EC898,#2E8050,#7EC898)',
      ei: 'linear-gradient(135deg,#DCFCE7,#A8F0C0)',
      delay: 0.3
    },
    {
      num: '04 · 06',
      icon: '💃',
      name: 'Sangeet Night',
      date: 'Monday, 14 December 2026',
      time: '7:00 PM onwards',
      venueName: 'Novotel Convention Centre',
      venueAddress: 'Hyderabad',
      es: 'linear-gradient(to right,#D4AF6A,#B8923C,#D4AF6A)',
      ei: 'linear-gradient(135deg,#F3EAD4,#E8D5A8)',
      delay: 0.4
    },
    {
      num: '05 · 06',
      icon: '🌸',
      name: 'Wedding Ceremony',
      date: 'Tuesday, 15 December 2026',
      time: 'Muhurtham – 10:48 AM',
      venueName: 'Shilpakala Vedika Convention Hall',
      venueAddress: 'Hyderabad',
      es: 'linear-gradient(to right,#F4CF50,#D4A010,#F4CF50)',
      ei: 'linear-gradient(135deg,#FEF9C3,#FDE678)',
      delay: 0.5
    },
    {
      num: '06 · 06',
      icon: '🥂',
      name: 'Reception',
      date: 'Wednesday, 16 December 2026',
      time: '7:30 PM onwards',
      venueName: 'Taj Krishna',
      venueAddress: 'Hyderabad',
      es: 'linear-gradient(to right,#F0A0BE,#C85888,#F0A0BE)',
      ei: 'linear-gradient(135deg,#FCE7F3,#FBCFE8)',
      delay: 0.6
    }
  ];

  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const prev = useCallback(() => {
    setDir(-1);
    setActive((i) => (i - 1 + events.length) % events.length);
  }, [events.length]);

  const next = useCallback(() => {
    setDir(1);
    setActive((i) => (i + 1) % events.length);
  }, [events.length]);

  const stack = useMemo(() => {
    const i0 = active;
    const i1 = (active + 1) % events.length;
    const i2 = (active + 2) % events.length;
    const i3 = (active + 3) % events.length;
    return [
      { idx: i0, ev: events[i0], scale: 1, y: 0, opacity: 1, zIndex: 40 },
      { idx: i1, ev: events[i1], scale: 0.95, y: 25, opacity: 0.85, zIndex: 30 },
      { idx: i2, ev: events[i2], scale: 0.90, y: 50, opacity: 0.7, zIndex: 20 },
      { idx: i3, ev: events[i3], scale: 0.85, y: 75, opacity: 0.55, zIndex: 10 }
    ];
  }, [active, events]);

  return (
    <section className="p-[clamp(5rem,11vw,9rem)_clamp(1.5rem,5.5vw,5rem)] relative overflow-hidden bg-[#EFE6D6]" id="ev">
      <div className="text-center mb-[clamp(3rem,8vw,5.5rem)]">
        <motion.span initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9 }} className="font-cinzel text-[clamp(0.48rem,1.2vw,0.6rem)] tracking-[0.65em] uppercase text-gold-2 block mb-3">Join the Celebrations</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.1 }} className="font-im-fell text-[clamp(2rem,6vw,4rem)] text-ink-1 leading-[1.1] mb-2">Wedding <em className="italic text-gold-2">Events</em></motion.h2>
        <motion.p initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.2 }} className="font-cormorant italic text-[clamp(0.85rem,2vw,1.05rem)] text-ink-4 mb-[1.1rem]">Four Days of Joy &amp; Tradition</motion.p>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.3 }} className="flex items-center gap-3 justify-center">
          <div className="w-[70px] h-[1px] bg-gradient-to-r from-transparent to-gold-1/45"></div>
          <div className="w-[7px] h-[7px] bg-gold-1 rotate-45"></div>
          <div className="w-[70px] h-[1px] bg-gradient-to-l from-transparent to-gold-1/45"></div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1100px] mx-auto"
      >
        <div className="relative flex items-center justify-center" style={{ minHeight: '580px' }}>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous event"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F3EA] border border-[#C9A46C]/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-[#3A2F2A] transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
          >
            <span className="text-lg leading-none">‹</span>
          </button>

          <div className="relative w-[420px] h-[540px] mx-8 sm:mx-12" style={{ perspective: '1200px' }}>
            <AnimatePresence initial={false} custom={{ dir }}>
              {stack.map(({ idx, ev, scale, y, opacity, zIndex }) => {
                const isTop = zIndex === 40;
                return (
                  <motion.div
                    key={idx}
                    className="absolute inset-0"
                    style={{ zIndex, transformStyle: 'preserve-3d' }}
                    initial={{ opacity: 0, y: y + 18, rotateZ: -1 }}
                    animate={{ opacity, y, scale }}
                    exit={{
                      opacity: 0,
                      x: dir > 0 ? -220 : 220,
                      rotateZ: dir > 0 ? -9 : 9,
                      scale: 0.98
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    drag={isTop ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (!isTop) return;
                      if (info.offset.x < -70) next();
                      else if (info.offset.x > 70) prev();
                    }}
                  >
                    <div
                      className="h-full w-full rounded-[28px] bg-[#F8F3EA] border shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden"
                      style={{
                        borderColor: 'rgba(201,164,108,0.55)',
                        transform: isTop ? 'translateZ(26px)' : 'translateZ(0px)'
                      }}
                    >
                      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: isTop ? 'inset 0 0 0 1px rgba(201,164,108,0.34), inset 0 0 36px rgba(201,164,108,0.14)' : 'inset 0 0 0 1px rgba(201,164,108,0.18)' }} />
                      <div className="absolute left-0 right-0 top-0 h-[2px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,164,108,0.75), transparent)' }} />

                      <div className="h-full w-full p-[clamp(1.7rem,3.6vw,2.3rem)] text-center flex flex-col">
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-[62px] h-[62px] rounded-full flex items-center justify-center text-[1.65rem]" style={{ border: '1px solid rgba(201,164,108,0.55)', background: 'linear-gradient(180deg, rgba(201,164,108,0.14), rgba(201,164,108,0.04))', boxShadow: '0 10px 26px rgba(58,47,42,0.10)' }}>
                            {ev.icon}
                          </div>
                        </div>

                        <div className="font-im-fell text-[clamp(1.55rem,3.2vw,2.05rem)] leading-[1.12] mb-5" style={{ color: '#3A2F2A' }}>
                          {ev.name}
                        </div>

                        <div className="font-cinzel text-[0.74rem] tracking-[0.18em] uppercase" style={{ color: '#7A6A5A' }}>
                          {ev.date}
                        </div>
                        <div className="font-cormorant italic text-[1.05rem] mt-1" style={{ color: '#7A6A5A' }}>
                          {ev.time}
                        </div>

                        <div className="w-14 h-[1px] mx-auto my-7" style={{ background: 'rgba(201,164,108,0.55)' }} />

                        <div className="mt-auto">
                          <div className="font-cormorant italic text-[1.2rem]" style={{ color: '#3A2F2A' }}>
                            {ev.venueName}
                          </div>
                          <div className="font-cinzel text-[0.7rem] tracking-[0.22em] uppercase mt-2" style={{ color: '#7A6A5A' }}>
                            {ev.venueAddress}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next event"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F3EA] border border-[#C9A46C]/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-[#3A2F2A] transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
          >
            <span className="text-lg leading-none">›</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export function Timeline() {
  const schedule = [
    { time: '9:00 AM', ev: 'Guest Arrival & Welcome', desc: 'Floral welcome & traditional music', icon: '🌸' },
    { time: '9:30 AM', ev: 'Baraat Procession', desc: 'Grand arrival of the groom', icon: '🎺' },
    { time: '10:48 AM', ev: 'Muhurtham', desc: 'Sacred Pheras & Wedding Rituals', icon: '🪔' },
    { time: '12:30 PM', ev: 'Grand Lunch', desc: 'Traditional South Indian Feast', icon: '🍽️' },
    { time: '2:00 PM', ev: 'Bidaai', desc: 'A bittersweet, beautiful new beginning', icon: '🌙' },
  ];

  return (
    <section className="p-[clamp(5rem,11vw,9rem)_clamp(1.5rem,5.5vw,5rem)] relative overflow-hidden bg-ivory" id="tl">
      <div className="text-center mb-[clamp(3rem,8vw,5.5rem)]">
        <motion.span initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9 }} className="font-cinzel text-[clamp(0.48rem,1.2vw,0.6rem)] tracking-[0.65em] uppercase text-gold-2 block mb-3">The Grand Wedding Day</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.1 }} className="font-im-fell text-[clamp(2rem,6vw,4rem)] text-ink-1 leading-[1.1] mb-2">Tuesday, <em className="italic text-gold-2">15th December</em></motion.h2>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.2 }} className="flex items-center gap-3 justify-center">
          <div className="w-[70px] h-[1px] bg-gradient-to-r from-transparent to-gold-1/45"></div>
          <div className="w-[7px] h-[7px] bg-gold-1 rotate-45"></div>
          <div className="w-[70px] h-[1px] bg-gradient-to-l from-transparent to-gold-1/45"></div>
        </motion.div>
      </div>

      <div className="max-w-[980px] mx-auto relative">
        {/* Center line: desktop centered, mobile aligned with nodes */}
        <div className="absolute left-[26px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-1 to-gold-2 md:-translate-x-1/2" />

        {schedule.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className="relative grid grid-cols-[52px_1fr] md:grid-cols-[1fr_72px_1fr] gap-4 md:gap-10 items-center mb-10 last:mb-0"
            >
              {/* Left card (desktop) / main card (mobile) */}
              <div className={isLeft ? 'md:col-start-1' : 'md:col-start-1 md:opacity-0 md:pointer-events-none'}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="bg-white/40 backdrop-blur-md border border-white/20 p-4 md:p-5 rounded-lg shadow-lg"
                >
                  <div className="font-cinzel text-[0.56rem] tracking-[0.3em] uppercase text-gold-2 mb-1">{item.time}</div>
                  <div className="font-im-fell text-[clamp(1rem,2.4vw,1.2rem)] text-ink-1">{item.ev}</div>
                  <div className="font-cormorant italic text-[clamp(0.8rem,1.9vw,0.95rem)] text-ink-4 mt-1">{item.desc}</div>
                </motion.div>
              </div>

              {/* Node */}
              <div className="relative z-10 md:col-start-2 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="w-[52px] h-[52px] rounded-full bg-white border-[1.5px] border-gold-1/40 flex items-center justify-center text-[1.2rem] shadow-[0_4px_18px_rgba(180,146,60,0.22),0_0_0_5px_rgba(212,175,106,0.08)]"
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* Right card (desktop) */}
              <div className={!isLeft ? 'hidden md:block md:col-start-3' : 'hidden md:block md:col-start-3 md:opacity-0 md:pointer-events-none'}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="bg-white/40 backdrop-blur-md border border-white/20 p-5 rounded-lg shadow-lg"
                >
                  <div className="font-cinzel text-[0.56rem] tracking-[0.3em] uppercase text-gold-2 mb-1">{item.time}</div>
                  <div className="font-im-fell text-[clamp(1rem,2.4vw,1.2rem)] text-ink-1">{item.ev}</div>
                  <div className="font-cormorant italic text-[clamp(0.8rem,1.9vw,0.95rem)] text-ink-4 mt-1">{item.desc}</div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Family() {
  return (
    <section className="p-[clamp(5rem,11vw,9rem)_clamp(1.5rem,5.5vw,5rem)] relative overflow-hidden bg-[linear-gradient(158deg,#F8F1E0_0%,#F2E8CF_50%,#ECDFBE_100%)]" id="fam">
      <div className="text-center mb-[clamp(3rem,8vw,5.5rem)]">
        <motion.span initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9 }} className="font-cinzel text-[clamp(0.48rem,1.2vw,0.6rem)] tracking-[0.65em] uppercase text-gold-2 block mb-3">With Their Blessings</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.1 }} className="font-im-fell text-[clamp(2rem,6vw,4rem)] text-ink-1 leading-[1.1] mb-2">Our <em className="italic text-gold-2">Families</em></motion.h2>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.2 }} className="flex items-center gap-3 justify-center">
          <div className="w-[70px] h-[1px] bg-gradient-to-r from-transparent to-gold-1/45"></div>
          <div className="w-[7px] h-[7px] bg-gold-1 rotate-45"></div>
          <div className="w-[70px] h-[1px] bg-gradient-to-l from-transparent to-gold-1/45"></div>
        </motion.div>
      </div>
      <div className="flex gap-[clamp(16px,4vw,52px)] justify-center flex-wrap max-w-[880px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9 }}
          className="flex-1 min-w-[min(260px,85vw)] bg-white/40 backdrop-blur-md border border-white/20 p-[clamp(2rem,5vw,3rem)] shadow-lg relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[7px] hover:shadow-[0_22px_60px_rgba(140,106,30,0.14)]"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-1 to-transparent"></div>
          <div className="font-im-fell text-[clamp(1.3rem,3.5vw,1.85rem)] text-ink-1 text-center mb-[3px]">Deverakonda Family</div>
          <div className="font-cinzel text-[clamp(0.47rem,1.1vw,0.56rem)] tracking-[0.3em] uppercase text-ink-4 text-center mb-6 pb-5 border-b border-gold-1/10">Hyderabad, India</div>

          <div className="flex items-center gap-3 py-3 border-b border-gold-1/5 last:border-b-0">
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-warm to-cream border border-gold-1/25 flex items-center justify-center text-[0.9rem] shrink-0">👨</div>
            <div><div className="font-cormorant text-[clamp(0.92rem,2.3vw,1.06rem)] font-medium text-ink-1">Mr. Govardhan Rao Deverakonda</div><div className="font-cinzel text-[clamp(0.43rem,1.1vw,0.54rem)] tracking-[0.24em] uppercase text-ink-4">Father of the Groom</div></div>
          </div>
          <div className="flex items-center gap-3 py-3 border-b border-gold-1/5 last:border-b-0">
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-warm to-cream border border-gold-1/25 flex items-center justify-center text-[0.9rem] shrink-0">👩</div>
            <div><div className="font-cormorant text-[clamp(0.92rem,2.3vw,1.06rem)] font-medium text-ink-1">Mrs. Madhavi Deverakonda</div><div className="font-cinzel text-[clamp(0.43rem,1.1vw,0.54rem)] tracking-[0.24em] uppercase text-ink-4">Mother of the Groom</div></div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-2.5 self-center p-2">
          <div className="w-[1px] h-[48px] bg-gradient-to-b from-transparent via-gold-1/30 to-transparent"></div>
          <div className="w-3 h-3 bg-gold-1 rotate-45 shadow-[0_0_12px_rgba(212,175,106,0.45)]"></div>
          <div className="w-[1px] h-[48px] bg-gradient-to-b from-transparent via-gold-1/30 to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9 }}
          className="flex-1 min-w-[min(260px,85vw)] bg-white/40 backdrop-blur-md border border-white/20 p-[clamp(2rem,5vw,3rem)] shadow-lg relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[7px] hover:shadow-[0_22px_60px_rgba(140,106,30,0.14)]"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-1 to-transparent"></div>
          <div className="font-im-fell text-[clamp(1.3rem,3.5vw,1.85rem)] text-ink-1 text-center mb-[3px]">Mandanna Family</div>
          <div className="font-cinzel text-[clamp(0.47rem,1.1vw,0.56rem)] tracking-[0.3em] uppercase text-ink-4 text-center mb-6 pb-5 border-b border-gold-1/10">Hyderabad, India</div>

          <div className="flex items-center gap-3 py-3 border-b border-gold-1/5 last:border-b-0">
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-warm to-cream border border-gold-1/25 flex items-center justify-center text-[0.9rem] shrink-0">👨</div>
            <div><div className="font-cormorant text-[clamp(0.92rem,2.3vw,1.06rem)] font-medium text-ink-1">Mr. Madan Mandanna</div><div className="font-cinzel text-[clamp(0.43rem,1.1vw,0.54rem)] tracking-[0.24em] uppercase text-ink-4">Father of the Bride</div></div>
          </div>
          <div className="flex items-center gap-3 py-3 border-b border-gold-1/5 last:border-b-0">
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-warm to-cream border border-gold-1/25 flex items-center justify-center text-[0.9rem] shrink-0">👩</div>
            <div><div className="font-cormorant text-[clamp(0.92rem,2.3vw,1.06rem)] font-medium text-ink-1">Mrs. Suman Mandanna</div><div className="font-cinzel text-[clamp(0.43rem,1.1vw,0.54rem)] tracking-[0.24em] uppercase text-ink-4">Mother of the Bride</div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
