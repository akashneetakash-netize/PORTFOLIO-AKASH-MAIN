import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BandCard = lazy(() => import("./BandCard"));

// ─── Single word that rises from bottom on every scroll into view ─────────────
function AnimatedWord({
  word,
  index,
  inView,
  className = "",
}: {
  word: string;
  index: number;
  inView: boolean;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "110%", opacity: 0, rotateX: 45, filter: "blur(14px)" }}
        animate={
          inView
            ? { y: "0%", opacity: 1, rotateX: 0, filter: "blur(0px)" }
            : { y: "110%", opacity: 0, rotateX: 45, filter: "blur(14px)" }
        }
        transition={{ duration: 0.9, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    </div>
  );
}

export default function FrontendDeveloperSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const pillsRef = useRef(null);
  const btnsRef = useRef(null);

  // each re-triggers every scroll
  const headingInView = useInView(headingRef, { once: false, amount: 0.5 });
  const subInView = useInView(subRef, { once: false, amount: 0.4 });
  const pillsInView = useInView(pillsRef, { once: false, amount: 0.4 });
  const btnsInView = useInView(btnsRef, { once: false, amount: 0.4 });

  const [showCard, setShowCard] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [goAbout, setGoAbout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (goAbout) {
      const t = setTimeout(() => navigate("/about"), 1800);
      return () => clearTimeout(t);
    }
  }, [goAbout, navigate]);

  return (
    <motion.section
      ref={sectionRef}
      id="frontend"
      initial={{ x: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
      animate={
        goAbout
          ? { x: "-40vw", scale: 0.92, opacity: 0, filter: "blur(8px)" }
          : { x: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-start px-6 md:px-20 pt-16 md:pt-28 select-none"
    >
      <div className="relative z-10 max-w-2xl">

        {/* available for work ticker */}
        <motion.div className="flex items-center mb-6">
          <motion.span
            animate={{ width: ["0ch", "32ch", "32ch", "0ch"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.8, 1] }}
            className="inline-block overflow-hidden whitespace-nowrap text-[11px] tracking-[0.3em] uppercase text-white/60 font-mono"
          >
            ✦ Available for work
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-white/60 font-mono ml-[2px]"
          >
            |
          </motion.span>
        </motion.div>

        {/* heading — words rise one by one on every scroll */}
        <div
          ref={headingRef}
          className="flex flex-col"
          style={{ perspective: "1000px" }}
        >
          <AnimatedWord
            word="Frontend"
            index={0}
            inView={headingInView}
            className="font-extrabold leading-[1.05] tracking-tight text-white text-[clamp(56px,9vw,120px)]"
          />
          <AnimatedWord
            word="Developer"
            index={1}
            inView={headingInView}
            className="font-extrabold leading-[1.05] tracking-tight text-white/70 text-[clamp(56px,9vw,120px)] mb-6"
          />
        </div>

        {/* subtitle */}
        <div ref={subRef} className="overflow-hidden">
          <motion.p
            initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
            animate={subInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : { y: 40, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base lg:text-xl leading-relaxed max-w-md font-medium tracking-wide text-white/70"
          >
            Building modern websites with clean, responsive, elegant interfaces.
            Turning ideas and designs into engaging digital experiences.
          </motion.p>
        </div>

        {/* tech pills with 3D hover */}
        <motion.div
          ref={pillsRef}
          className="mt-6 flex flex-wrap gap-4"
        >
          {["Next.js", "React.js", "TypeScript", "Tailwind CSS"].map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={pillsInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(6px)" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.08, rotateX: -6, rotateY: 6, z: 20 }}
              style={{ perspective: "600px", transformStyle: "preserve-3d" }}
              className="relative group px-5 py-2.5 rounded-2xl text-sm font-medium text-white/90 bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-colors duration-300 cursor-default"
            >
              <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
              <span className="absolute inset-0 rounded-2xl border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">{tech}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* buttons */}
        <motion.div
          ref={btnsRef}
          className="mt-8 flex flex-col [@media(min-width:540px)]:flex-row items-start md:items-center gap-4"
        >
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={btnsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, rotateX: -4 }}
            style={{ perspective: "600px" }}
            onClick={() => setShowCard((s) => !s)}
            className="inline-flex items-center gap-2 border border-white/40 text-white/90 px-6 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-black transition-all duration-200 rounded-full relative z-20"
          >
            {showCard ? "Hide Card" : "Show Card"}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 60 }}
            animate={btnsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, rotateX: -4 }}
            style={{ perspective: "600px" }}
            onClick={() => setGoAbout(true)}
            className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-xs uppercase font-bold hover:bg-white hover:text-black rounded-full transition"
          >
            About Me
          </motion.button>
        </motion.div>
      </div>

      {/* 3D ID CARD */}
      <AnimatePresence>
        {showCard && mounted && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-[5] pointer-events-none"
          >
            <Suspense fallback={null}>
              <BandCard />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </motion.section>
  );
}
