import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import favicon from "/favicon.ico";
import heroEye from "@/assets/ak.png";

import WelcomeScreen from "@/components/WelcomeScreen";
import FrontendDeveloperSection from "@/components/FrontendDeveloperSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";

const logos = ["AKASH", "CIPHERWORKS", "FRONTEND", "DEVELOPER"];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [time, setTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [pageReady, setPageReady] = useState(false); // ← new state

  const text = "AKASH";
  const [displayed, setDisplayed] = useState("");
  const [colorMode, setColorMode] = useState(0);

  const heroRef = useRef(null);

  // Re-triggers on every scroll
  const isInView = useInView(heroRef, {
    once: false,
    amount: 0.35,
    margin: "-5% 0px",
  });

  // Combined condition → plays after welcome + on every scroll
  const shouldAnimate = isInView && pageReady;

  // 3D mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 160 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const sideWords = ["Creating", "Websites", "That Feel", "Alive."];

  const colors = [
    "bg-gradient-to-b from-white via-gray-200 via-gray-500 to-black text-transparent bg-clip-text",
    "text-white",
    "bg-gradient-to-b from-black via-gray-500 via-gray-200 to-white text-transparent bg-clip-text",
  ];

  // Welcome screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // After welcome finishes → enable animations
  useEffect(() => {
    if (!showWelcome) {
      // small delay so the DOM is fully ready
      const t = setTimeout(() => {
        setPageReady(true);
      }, 120);
      return () => clearTimeout(t);
    } else {
      setPageReady(false);
    }
  }, [showWelcome]);

  // Lock body scroll
  useEffect(() => {
    if (showWelcome || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showWelcome, mobileMenu]);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) setTimeout(type, 160);
    }
    type();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <AnimatePresence>{showWelcome && <WelcomeScreen />}</AnimatePresence>

            {/* ================= NAV ================= */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-xl bg-black/20 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={favicon}
                  alt="Logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/70 uppercase font-medium">
                  AKASH . PORTFOLIO
                </span>
              </div>

              <ul className="hidden md:flex items-center gap-10 text-xs tracking-widest text-white/70 uppercase">
                {["Home", "About", "Showcase", "Contact"].map((item) => (
                  <li
                    key={item}
                    onClick={() =>
                      document
                        .getElementById(item === "Home" ? "Home" : item.toLowerCase())
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="hidden md:block text-[10px] tracking-[0.3em] text-white/70 uppercase">
                {time}
              </div>

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden text-white z-50"
              >
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </nav>

            {/* ================= MOBILE MENU ================= */}
            {mobileMenu && (
              <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-white uppercase tracking-[0.3em] text-sm md:hidden">
                <div className="absolute top-28 text-center">
                  <p className="text-[10px] text-white/40 tracking-[0.3em] mb-2">TIME</p>
                  <h2 className="text-2xl tracking-widest font-semibold">{time}</h2>
                </div>

                {["Home", "About", "Showcase", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      document
                        .getElementById(item === "Home" ? "Home" : item.toLowerCase())
                        ?.scrollIntoView({ behavior: "smooth" });
                      setMobileMenu(false);
                    }}
                    className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {/* ================= HERO ================= */}
            <section
              id="Home"
              ref={heroRef}
              className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black"
              onMouseMove={handleMouseMove}
            >
              {/* Background Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img
                  src={heroEye}
                  alt="Hero"
                  className="h-[90%] w-[90%] object-contain object-center"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={
                    shouldAnimate
                      ? { scale: 1, opacity: 1 }
                      : { scale: 1.08, opacity: 0.45 }
                  }
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformPerspective: 1200,
                }}
                className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-10"
              >
                {/* AKASH Letters */}
                <div className="flex">
                  {(displayed || "\u00A0").split("").map((char, i) => (
                    <div key={i} className="overflow-hidden" style={{ perspective: "1000px" }}>
                      <motion.span
                        initial={{
                          y: "120%",
                          opacity: 0,
                          rotateX: 70,
                          filter: "blur(18px)",
                        }}
                        animate={
                          shouldAnimate
                            ? {
                                y: "0%",
                                opacity: 1,
                                rotateX: 0,
                                filter: "blur(0px)",
                              }
                            : {
                                y: "120%",
                                opacity: 0,
                                rotateX: 70,
                                filter: "blur(18px)",
                              }
                        }
                        transition={{
                          duration: 0.9,
                          delay: i * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onClick={() => setColorMode((prev) => (prev + 1) % colors.length)}
                        className={`inline-block font-display uppercase leading-[0.85] tracking-[-0.03em] text-[22vw] md:text-[14vw] lg:text-[13rem] cursor-pointer transition-colors duration-500 ${colors[colorMode]}`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {char}
                      </motion.span>
                    </div>
                  ))}
                </div>

                {/* Side Words */}
                <div className="md:absolute md:top-28 md:right-12 mt-4 md:mt-0 text-right flex flex-col items-end gap-1">
                  {sideWords.map((word, i) => (
                    <div key={word} className="overflow-hidden" style={{ perspective: "900px" }}>
                      <motion.span
                        initial={{
                          y: "130%",
                          opacity: 0,
                          rotateX: 55,
                          filter: "blur(12px)",
                        }}
                        animate={
                          shouldAnimate
                            ? {
                                y: "0%",
                                opacity: 1,
                                rotateX: 0,
                                filter: "blur(0px)",
                              }
                            : {
                                y: "130%",
                                opacity: 0,
                                rotateX: 55,
                                filter: "blur(12px)",
                              }
                        }
                        transition={{
                          duration: 0.95,
                          delay: 0.3 + i * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-[Poppins] font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-white/70 to-white/40"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {word}
                      </motion.span>
                    </div>
                  ))}
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                  <div className="flex flex-col gap-1 text-sm sm:text-base lg:text-xl font-[Poppins] font-medium tracking-wide max-w-md">
                    {[
                      "Turning creative ideas into interactive and",
                      "high-quality web experiences.",
                    ].map((line, i) => (
                      <div key={line} className="overflow-hidden" style={{ perspective: "800px" }}>
                        <motion.span
                          initial={{
                            y: "120%",
                            opacity: 0,
                            rotateX: 40,
                            filter: "blur(8px)",
                          }}
                          animate={
                            shouldAnimate
                              ? {
                                  y: "0%",
                                  opacity: 1,
                                  rotateX: 0,
                                  filter: "blur(0px)",
                                }
                              : {
                                  y: "120%",
                                  opacity: 0,
                                  rotateX: 40,
                                  filter: "blur(8px)",
                                }
                          }
                          transition={{
                            duration: 0.9,
                            delay: 0.7 + i * 0.13,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="inline-block text-white/80"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {line}
                        </motion.span>
                      </div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href="https://www.cipherworks.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        whileHover={{
                          scale: 1.08,
                          rotateX: -6,
                          rotateY: 6,
                          boxShadow: "0 20px 40px rgba(255,255,255,0.12)",
                        }}
                        whileTap={{ scale: 0.96 }}
                        style={{ perspective: "800px", transformStyle: "preserve-3d" }}
                        className="inline-flex items-center gap-3 border border-white/25 text-white px-7 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-black transition-colors duration-300 rounded-full"
                      >
                        CIPHERWORKS
                        <ArrowUpRight size={16} />
                      </motion.button>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* Marquee */}
            <div className="bg-black border-t border-white/10 py-5 overflow-hidden">
              <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
                {[...logos, ...logos, ...logos].map((logo, i) => (
                  <span
                    key={i}
                    className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.333%); }
              }
              .animate-marquee {
                animation: marquee 12s linear infinite;
              }
            `}</style>

            <section id="about">
              <FrontendDeveloperSection />
            </section>
            <section id="showcase">
              <Showcase />
            </section>
            <section id="contact">
              <ContactSection />
            </section>
          </div>
        }
      />

      <Route path="/about" element={<About />} />
    </Routes>
  );
}