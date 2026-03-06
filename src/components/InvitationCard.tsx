import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import ReactPlayer from 'react-player';

const EnvelopeContent = ({ isOpening }: { isOpening: boolean }) => (
  <div className="relative w-[100vw] max-w-[600px] h-[90svh] min-h-[600px] max-h-[800px] mx-auto">
    {/* Envelope Back (Inside) */}
    <div className="absolute inset-0 bg-[#E6E1D6] rounded-lg shadow-inner overflow-hidden z-0">
      <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]"></div>
    </div>

    {/* Top Flap */}
    <div className="absolute inset-0 z-40" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))' }}>
      <div className="w-full h-full bg-gradient-to-b from-[#F4F1EA] to-[#E6E1D6] rounded-t-lg" style={{ clipPath: 'polygon(0 0, 50% 54%, 100% 0)' }}></div>
    </div>

    {/* Left Flap */}
    <div className="absolute inset-0 z-20" style={{ filter: 'drop-shadow(3px 0 8px rgba(0,0,0,0.05))' }}>
      <div className="w-full h-full bg-gradient-to-r from-[#EFEBE1] to-[#E6E1D6] rounded-l-lg" style={{ clipPath: 'polygon(0 0, 48% 50%, 0 100%)' }}></div>
    </div>

    {/* Right Flap */}
    <div className="absolute inset-0 z-20" style={{ filter: 'drop-shadow(-3px 0 8px rgba(0,0,0,0.05))' }}>
      <div className="w-full h-full bg-gradient-to-l from-[#EFEBE1] to-[#E6E1D6] rounded-r-lg" style={{ clipPath: 'polygon(100% 0, 52% 50%, 100% 100%)' }}></div>
    </div>

    {/* Bottom Flap */}
    <div className="absolute inset-0 z-30" style={{ filter: 'drop-shadow(0 -3px 10px rgba(0,0,0,0.06))' }}>
      <div className="w-full h-full bg-gradient-to-t from-[#EFEBE1] to-[#E4DFD4] rounded-b-lg" style={{ clipPath: 'polygon(0 100%, 50% 46%, 100% 100%)' }}></div>
    </div>

    {/* Wax Seal */}
    <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50">
      <div className="w-[100px] h-[100px] md:w-[84px] md:h-[84px] rounded-full bg-[#EBE6DC] flex items-center justify-center relative overflow-hidden"
        style={{
          boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -2px 5px rgba(0,0,0,0.06), 0 6px 14px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)'
        }}>

        {/* Shimmer Sweep Effect */}
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/60 to-transparent transition-transform duration-500 ease-linear ${isOpening ? 'translate-x-full translate-y-full' : '-translate-x-full -translate-y-full'}`}
        />

        {/* Seal Inner Area */}
        <div className="w-[80px] h-[80px] md:w-[70px] md:h-[70px] rounded-full bg-[#E6E1D6] border border-[#DFD9CD] flex items-center justify-center relative z-20"
          style={{ boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.05), 0 1px 2px rgba(255,255,255,0.8)' }}>
          <span className="font-im-fell italic text-3xl md:text-3xl text-[#968E7D] tracking-wider pr-1" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.7), -1px -1px 0px rgba(0,0,0,0.06)' }}>V&R</span>
        </div>
      </div>
    </div>

    {/* Golden Glow Sweep */}
    <div className="absolute inset-0 z-40 pointer-events-none rounded-lg overflow-hidden">
      <div className={`absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-gold-1/30 to-transparent transition-all duration-1000 ease-in-out ${isOpening ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}`} style={{ transform: isOpening ? 'translateX(100%) skewX(-20deg)' : 'translateX(-100%) skewX(-20deg)' }} />
    </div>
  </div>
);

export function InvitationCard({ isOpen, onOpen }: { isOpen: boolean, onOpen: () => void }) {
  const [step, setStep] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    if (step > 0) return;
    setStep(1);

    // Envelope fades out after 1.2s, start video
    setTimeout(() => {
      setStep(2);
    }, 1200);

    // Video plays for 6s, then fades out and homepage emerges
    setTimeout(() => {
      setStep(3);
      onOpen();
    }, 7200);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9900] flex items-center justify-center overflow-hidden bg-[#E8E4DB]"
          style={{ perspective: 1000, width: '100vw', height: '100vh' }}
        >
          {/* Envelope Phase */}
          {step < 2 && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className="relative"
                initial={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                animate={step >= 1 ? {
                  scale: 1.08,
                  opacity: 0,
                  filter: 'blur(4px)'
                } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  willChange: 'transform, opacity, filter',
                  backfaceVisibility: 'hidden',
                  rotateX: step === 0 ? rotateX : 0,
                  rotateY: step === 0 ? rotateY : 0
                }}
              >
                {/* Golden Glow that appears on click */}
                <motion.div
                  className="absolute inset-[-20px] bg-gold-1/40 rounded-xl blur-xl z-[-1]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step >= 1 ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />

                <EnvelopeContent isOpening={step >= 1} />

                {/* Dissolving Particles Effect */}
                {step >= 1 && [...Array(30)].map((_, i) => {
                  const angle = (i / 30) * Math.PI * 2;
                  const dist = 50 + Math.random() * 100;
                  return (
                    <motion.div
                      key={`env-particle-${i}`}
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-gold-2 rounded-full z-50 pointer-events-none"
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist - 50,
                        scale: 0,
                        opacity: 0
                      }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  );
                })}
              </motion.div>

              {/* Text below seal */}
              <div
                className={`absolute top-[60%] left-1/2 -translate-x-1/2 text-center z-50 pointer-events-none w-full max-w-md mx-auto px-4 ${step >= 1 ? 'hidden' : 'block'}`}
              >
                <p
                  className="font-cormorant italic text-[1.35rem] text-[#968E7D] tracking-wide leading-snug"
                  style={{
                    textShadow: '1px 1px 0px rgba(255,255,255,0.6)',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'geometricPrecision'
                  }}
                >
                  This invitation is<br />exclusively for you
                </p>
              </div>

              {/* Tap to open hint */}
              <div
                className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center z-50 pointer-events-none w-full max-w-xs mx-auto px-4 ${step >= 1 ? 'hidden' : 'block'}`}
              >
                <span
                  className="font-cinzel text-[0.6rem] tracking-[0.4em] uppercase text-[#968E7D] animate-pulse"
                  style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'geometricPrecision'
                  }}
                >
                  Tap to open
                </span>
              </div>
            </div>
          )}

          {/* Video Phase (Always rendered for preloading) */}
          <motion.div
            className="absolute inset-0 z-[9950] bg-black pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? (step === 3 ? 0 : 1) : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: step >= 1 ? 1.05 : 1 }}
                transition={{ duration: 8, ease: "linear" }}
                className="absolute inset-0 w-full h-full"
                style={{ willChange: 'transform' }}
              >
                <div className="absolute inset-0 w-full h-full bg-black">
                  <ReactPlayer
                    src="https://youtu.be/xJKwD24GJtw"
                    playing={step >= 1}
                    muted={true}
                    loop={true}
                    width="100%"
                    height="100%"
                    style={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '177.78vh',
                      height: '100vh',
                      minWidth: '100vw',
                      minHeight: '56.25vw'
                    }}
                    config={{
                    youtube: {
                      controls: 0,
                      disablekb: 1,
                      fs: 0,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      iv_load_policy: 3,
                      playsinline: 1,
                      autoplay: 1,
                      mute: 1
                    } as any
                  }}
                  />
                </div>
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-black/40" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10 px-4">
              <div className="max-w-4xl w-full mx-auto">
                <motion.p
                  className="font-cinzel tracking-[0.2em] uppercase text-sm md:text-base mb-6 text-white/80 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : -20 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                  Together With Their Families
                </motion.p>

                <motion.h2
                  className="font-im-fell text-5xl md:text-7xl mb-6 tracking-wide text-center leading-[1.1]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step === 2 ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
                >
                  <div className="flex flex-wrap justify-center gap-x-[0.2em]">
                    {"Vijay ❤️ Rashmika".split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                        animate={step === 2 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.8, delay: 1.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block relative"
                      >
                        {letter === " " ? "\u00A0" : letter}
                        <span className="absolute inset-0 text-gold-1 blur-[6px] opacity-50 -z-10">{letter === " " ? "\u00A0" : letter}</span>
                      </motion.span>
                    ))}
                  </div>
                </motion.h2>

                <motion.p
                  className="font-cormorant italic text-2xl md:text-3xl text-white/90 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : -20 }}
                  transition={{ duration: 1.5, delay: 1.7, ease: "easeOut" }}
                  style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                >
                  Invite You To Celebrate Their Wedding
                </motion.p>
              </div>
            </div>

            {/* Glowing Particles */}
            {step >= 1 && [...Array(10)].map((_, i) => {
              const r1 = (Math.sin(i * 12.345) * 0.5);
              const r2 = (Math.cos(i * 67.890) * 0.5);
              const r3 = Math.abs(Math.sin(i * 42.1));
              const r4 = Math.abs(Math.cos(i * 19.4));

              return (
                <motion.div
                  key={`vid-particle-${i}`}
                  className="absolute w-1.5 h-1.5 bg-gold-1 rounded-full z-20 pointer-events-none shadow-[0_0_8px_rgba(212,175,106,0.8)]"
                  style={{ willChange: 'transform, opacity' }}
                  initial={{
                    opacity: 0,
                    x: `calc(50vw + ${r1 * 80}vw)`,
                    y: `calc(50vh + ${r2 * 80}vh)`,
                    scale: 0
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    y: `calc(50vh + ${r2 * 80 - 20}vh)`,
                    scale: [0, r3 * 2 + 0.5, 0]
                  }}
                  transition={{
                    duration: 3 + r4 * 2,
                    delay: r3 * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}

            {/* Drifting Petals */}
            {step >= 1 && [...Array(4)].map((_, i) => {
              const r1 = Math.random();
              return (
                <motion.div
                  key={`vid-petal-${i}`}
                  className="absolute w-3 h-3 bg-white/30 rounded-tl-full rounded-br-full z-20 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  style={{ transformOrigin: 'center', willChange: 'transform, opacity' }}
                  initial={{
                    opacity: 0,
                    x: `${r1 * 100}vw`,
                    y: `-10vh`,
                    rotate: 0,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    y: `110vh`,
                    x: `${r1 * 100 + (Math.random() * 20 - 10)}vw`,
                    rotate: 360
                  }}
                  transition={{
                    duration: 8 + Math.random() * 6,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
