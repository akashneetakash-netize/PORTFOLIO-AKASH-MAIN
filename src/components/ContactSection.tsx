import { useState, useRef } from "react";
import { FaWhatsapp, FaEnvelope, FaInstagram, FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

// ─── Word that rises from bottom on every scroll into view ────────────────────
function AnimatedWord({ word, index, inView }: { word: string; index: number; inView: boolean }) {
  return (
    <div className="overflow-hidden">
      <motion.span
        className="inline-block font-black tracking-tight leading-none"
        style={{ fontSize: "clamp(36px,6vw,92px)" }}
        initial={{ y: "110%", opacity: 0, rotateX: 40, filter: "blur(12px)" }}
        animate={
          inView
            ? { y: "0%", opacity: 1, rotateX: 0, filter: "blur(0px)" }
            : { y: "110%", opacity: 0, rotateX: 40, filter: "blur(12px)" }
        }
        transition={{ duration: 0.85, delay: index * 0.16, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-block bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
          {word}
        </span>
      </motion.span>
    </div>
  );
}

const HEADING_WORDS = ["Let's", "Build", "Together"];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // scroll refs — re-trigger every time
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: false, amount: 0.5 });

  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: false, amount: 0.5 });

  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: false, amount: 0.3 });

  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: false, amount: 0.25 });

  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = () => {
    if (!form.name || !form.message) return;
    const text = `Hello, my name is ${form.name}%0A%0A${form.message}`;
    window.open(`https://wa.me/8148092163?text=${text}`, "_blank");
  };

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 py-24 text-white">

      {/* grid bg */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-white/10 blur-[140px] opacity-20" />
        <div className="absolute bottom-[-220px] right-[-120px] w-[350px] h-[350px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute top-[30%] left-[-120px] w-[300px] h-[300px] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* heading section */}
        <div className="text-center space-y-5 mb-16">

          {/* label */}
          <motion.div
            ref={labelRef}
            initial={{ opacity: 0, y: -18 }}
            animate={labelInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center gap-4"
          >
            <div className="relative overflow-hidden">
              <div className="w-10 h-px bg-white/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono">Contact</span>
            <div className="relative overflow-hidden">
              <div className="w-10 h-px bg-white/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
            </div>
          </motion.div>

          {/* words rise one by one on every scroll */}
          <div
            ref={headingRef}
            className="flex flex-wrap items-baseline justify-center gap-x-4"
            style={{ perspective: "1000px" }}
          >
            {HEADING_WORDS.map((word, i) => (
              <AnimatedWord key={word} word={word} index={i} inView={headingInView} />
            ))}
          </div>
        </div>

        {/* layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* left */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
            animate={leftInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -50, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center gap-8"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="text-sm sm:text-base lg:text-xl leading-relaxed max-w-md font-medium tracking-wide text-white/70"
              >
                Have an idea, project, or collaboration in mind? Send me a message and let's create something clean, modern, and impactful together.
              </motion.p>
            </div>

            {/* social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
              className="flex items-center justify-center lg:justify-start gap-5 mt-2"
            >
              <a
                href="mailto:sprince05873@gmail.com"
                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]"
              >
                <FaEnvelope className="text-white/80 group-hover:text-white text-[18px] sm:text-[20px] transition-all duration-300" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), transparent)" }} />
              </a>
              <a
                href="https://wa.me/918148092163"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-green-400/40 hover:bg-green-500/10 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]"
              >
                <FaWhatsapp className="text-white/80 group-hover:text-green-400 text-[20px] sm:text-[24px] transition-all duration-300" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.08), transparent)" }} />
                <div className="absolute inset-0 rounded-2xl border border-green-400/30 animate-ping" />
              </a>
            </motion.div>
          </motion.div>

          {/* contact card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60, rotateX: 12, filter: "blur(14px)" }}
            animate={cardInView ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : { opacity: 0, y: 60, rotateX: 12, filter: "blur(14px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: "1200px" }}
            className="relative rounded-[32px] overflow-hidden"
          >
            <motion.div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="relative bg-black border border-white/15 rounded-[32px] backdrop-blur-xl shadow-[0_20px_80px_rgba(255,255,255,0.06)] overflow-hidden group"
            >
              {/* spinning border glow */}
              <div className="absolute inset-0 rounded-[32px] overflow-hidden">
                <div
                  className="absolute inset-[-200%] animate-[spinGlow_10s_linear_infinite]"
                  style={{ background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.18), transparent 30%)" }}
                />
              </div>

              {/* cursor glow */}
              <div
                className="absolute w-72 h-72 rounded-full pointer-events-none blur-[90px] opacity-20 transition-all duration-200"
                style={{ left: position.x - 140, top: position.y - 140, background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)" }}
              />

              <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 70%)" }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/5 blur-[100px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

              <div className="relative z-10 p-6 sm:p-7 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">Send Message</h2>
                    <span className="text-xs uppercase tracking-widest text-white/25 font-mono">Direct</span>
                  </div>
                  <p className="text-sm text-white/35 leading-relaxed">Your message opens directly in WhatsApp—no spam, just real connection.</p>
                </div>

                <div className="space-y-4">
                  <div className="relative group/input">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full h-14 px-6 rounded-[16px] bg-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] border border-white/10 group-hover/input:border-white/20 text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] font-medium"
                    />
                  </div>

                  <div className="relative group/textarea">
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      className="w-full p-5 rounded-[16px] resize-none bg-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] border border-white/10 group-hover/textarea:border-white/20 text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] font-medium leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!form.name || !form.message}
                    className="group/btn relative overflow-hidden w-full h-12 rounded-[16px] mt-6 bg-gradient-to-b from-white to-zinc-300 text-black font-bold tracking-wide text-sm uppercase transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16126562 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99621575 L3.03521743,10.4371852 C3.03521743,10.5942826 3.19218622,10.75138 3.50612381,10.75138 L16.6915026,11.5368670 C16.6915026,11.5368670 17.1624089,11.5368670 17.1624089,12.0081591 C17.1624089,12.4794512 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                      </svg>
                      Send Message
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)", animation: "premiumShine 2s linear infinite" }}
                    />
                  </button>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-xs text-white/30 font-mono">Usually replies within a few hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* footer */}
      <motion.div
        ref={footerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-24 border-t border-white/10 pt-12 pb-8"
      >
        <div className="flex flex-col items-center gap-7">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center font-black tracking-[0.25em] uppercase"
            style={{ fontSize: "clamp(14px,2vw,18px)" }}
          >
            <span className="inline-block bg-gradient-to-b from-white via-white/70 to-white/30 bg-clip-text text-transparent">
              Follow Me
            </span>
          </motion.h2>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {[
              { href: "https://www.instagram.com/akashhhhhh__05?igsh=Y2FmNjA0ajBtNmMx", icon: <FaInstagram className="relative z-10 text-[30px] text-white transition-all duration-500 group-hover:scale-110" />, hover: "hover:border-white/30", bg: "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)", glow: "group-hover:bg-white/10" },
              { href: "https://github.com/akashneetakash-netize", icon: <FaGithub className="relative z-10 text-[30px] text-white transition-all duration-500 group-hover:scale-110" />, hover: "hover:border-white/40", bg: "from-white/16 via-slate-300/8 to-transparent", glow: "group-hover:bg-white/12" },
              { href: "#", icon: <FaYoutube className="relative z-10 text-[30px] text-white transition-all duration-500 group-hover:scale-110 group-hover:text-red-400" />, hover: "hover:border-red-400/50", bg: "from-red-500/18 via-rose-500/10 to-transparent", glow: "group-hover:bg-red-500/20" },
              { href: "https://www.linkedin.com/in/akash-m-543745371", icon: <FaLinkedin className="relative z-10 text-[30px] text-white transition-all duration-500 group-hover:scale-110 group-hover:text-blue-400" />, hover: "hover:border-blue-400/50", bg: "from-blue-500/18 via-blue-400/10 to-transparent", glow: "group-hover:bg-blue-500/20" },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -6, scale: 1.08 }}
                className={`group relative grid h-14 w-14 place-items-center overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-all duration-500 ease-out ${s.hover}`}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={s.bg.startsWith("linear") ? { background: s.bg } : undefined} />
                {!s.bg.startsWith("linear") && <div className={`absolute inset-0 bg-gradient-to-br ${s.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />}
                <div className="absolute inset-[1px] rounded-[19px] bg-[#0b0b12]/80" />
                <div className={`absolute -inset-6 bg-transparent blur-2xl transition-all duration-500 ${s.glow}`} />
                {s.icon}
              </motion.a>
            ))}
          </div>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <p className="text-center text-sm tracking-[0.22em] text-white/35">
            Copyright © {new Date().getFullYear()} All Rights Reserved | Created by{" "}
            <span className="relative inline-block text-white/70">
              Akash
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-2">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </span>
            </span>
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes lineMove { from { transform: translateX(-120%); } to { transform: translateX(120%); } }
        @keyframes premiumShine { from { transform: translateX(-200%); } to { transform: translateX(200%); } }
        @keyframes spinGlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
