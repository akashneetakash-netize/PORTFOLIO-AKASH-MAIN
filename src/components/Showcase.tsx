import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const techStack = [
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6", color: "#1572B6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", color: "#3178C6" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF", color: "#FFFFFF" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", color: "#339933" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28", color: "#FFCA28" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", color: "#F05032" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF", color: "#FFFFFF" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/FFFFFF", color: "#FFFFFF" },
  { name: "Netlify", icon: "https://cdn.simpleicons.org/netlify/00C7B7", color: "#00C7B7" },
  { name: "Terminal", icon: "https://cdn.simpleicons.org/gnometerminal/4EAA25", color: "#4EAA25" },
];

const projects = [
  {
    tech: "typescript + Tailwind",
    thumbnail: "/assets/proj-1.png",
    github: "https://github.com/akashneetakash-netize/Haven-Restaurent.git",
  },
  {
    tech: "Typescript + Tailwind",
    thumbnail: "/assets/project-2.png",
    github: "https://github.com/akashneetakash-netize/Real-Estate-website.git",
  },
  {
    tech: "Typescript",
    thumbnail: "/assets/hpXPF.jpg",
    github: "https://github.com/akashneetakash-netize/portfolio-akash.git",
  },
];

const certificates = [
  { title: "VIBEATHON 6.0", tech: "Hackathon", thumbnail: "/assets/vibe.jpg" },
  { title: "MURF AI", tech: "Hackathon", thumbnail: "/assets/murf.jpg" },
  { title: "INFOSYS", tech: "course", thumbnail: "/assets/info.jpg" },
  { title: "WADHWANI FOUNDATION", tech: "Course", thumbnail: "/assets/ent.jpg" },
  { title: "IBM", tech: "Course", thumbnail: "/assets/ibm.jpg" },
  { title: "HP", tech: "Course", thumbnail: "/assets/HP.jpg" },
  { title: "DELOITTE", tech: "Course", thumbnail: "/assets/DELO.png" }
];

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-8 4h16v-2H4v2z" />
  </svg>
);

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <path
      d="M12 2v4m0 12v4m10-10h-4M6 12H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ─── 3D tilt hook ─────────────────────────────────────────────────────────────
function use3DTilt(intensity = 22) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | undefined>(undefined);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * intensity;
    const rotateX = (0.5 - py) * intensity;
    cancelAnimationFrame(frame.current!);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale3d(1.05,1.05,1.05)`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 40%, transparent 65%)`;
        glareRef.current.style.opacity = "1";
      }
    });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current!);
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1,1,1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return { ref, glareRef, onMouseMove, onMouseLeave };
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ item, index }: { item: (typeof projects)[0]; index: number }) {
  const { ref, glareRef, onMouseMove, onMouseLeave } = use3DTilt(26);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 15, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : { opacity: 0, y: 60, rotateX: 15, filter: "blur(12px)" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06]
                   hover:border-white/35 will-change-transform cursor-pointer
                   hover:shadow-[0_30px_60px_-12px_rgba(255,255,255,0.15)] backdrop-blur-md"
        style={{
          backdropFilter: "blur(20px)",
          transition: "transform 0.18s cubic-bezier(0.23,1,0.32,1), border-color 0.35s, box-shadow 0.35s",
        }}
      >
        <div ref={glareRef} className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: 0 }} />
        <div className="relative h-48 overflow-hidden bg-white/5">
          <img
            src={item.thumbnail}
            alt={item.tech}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
        </div>
        <div className="p-5 flex items-center justify-between relative z-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">{item.tech}</span>
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full
                       bg-white/5 border border-white/15 text-white/60
                       hover:bg-white/12 hover:text-white hover:border-white/35
                       transition-all duration-200 active:scale-90"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Cert Card ────────────────────────────────────────────────────────────────
function CertCard({ item, index }: { item: (typeof certificates)[0]; index: number }) {
  const [downloading, setDownloading] = useState(false);
  const { ref, glareRef, onMouseMove, onMouseLeave } = use3DTilt(26);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: false, amount: 0.3 });

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(item.thumbnail, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
    setTimeout(() => setDownloading(false), 500);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 15, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : { opacity: 0, y: 60, rotateX: 15, filter: "blur(12px)" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06]
                   hover:border-white/35 will-change-transform cursor-pointer
                   hover:shadow-[0_30px_60px_-12px_rgba(255,255,255,0.15)] backdrop-blur-md"
        style={{
          backdropFilter: "blur(20px)",
          transition: "transform 0.18s cubic-bezier(0.23,1,0.32,1), border-color 0.35s, box-shadow 0.35s",
        }}
      >
        <div ref={glareRef} className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: 0 }} />
        <div className="relative h-48 overflow-hidden bg-white/5">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-semibold text-sm leading-snug line-clamp-2">{item.title}</p>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between relative z-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">{item.tech}</span>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center w-8 h-8 rounded-full
                       bg-white/5 border border-white/15 text-white/60
                       hover:bg-white/12 hover:text-white hover:border-white/35
                       transition-all duration-200 active:scale-90"
          >
            {downloading ? <Spinner /> : <DownloadIcon />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tech Sphere ──────────────────────────────────────────────────────────────
function TechGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rotX = useRef(0.28);
  const rotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0.0038);
  const isDragging = useRef(false);
  const lastMX = useRef(0);
  const lastMY = useRef(0);
  const dragVX = useRef(0);
  const dragVY = useRef(0);
  const rafId = useRef<number | undefined>(undefined);
  const itemEls = useRef<HTMLDivElement[]>([]);
  const RADIUS = 168;
  const n = techStack.length;
  const positions = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    positions.current = Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, []);

  function project(pos: { x: number; y: number; z: number }, rx: number, ry: number) {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = pos.x * cosY - pos.z * sinY;
    const z1 = pos.x * sinY + pos.z * cosY;
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = pos.y * cosX - z1 * sinX;
    const z2 = pos.y * sinX + z1 * cosX;
    return { x: x1, y: y2, z: z2 };
  }

  useEffect(() => {
    const els = itemEls.current;
    function render() {
      if (!isDragging.current) {
        rotY.current += velY.current;
        rotX.current += velX.current;
        velX.current *= 0.96;
        velY.current = velY.current * 0.985 + 0.0038 * 0.015;
        if (rotX.current > 0.55) velX.current -= 0.0006;
        if (rotX.current < -0.08) velX.current += 0.0006;
      }
      const projected = positions.current.map((pos, i) => ({ el: els[i], p: project(pos, rotX.current, rotY.current) }));
      projected.slice().sort((a, b) => a.p.z - b.p.z).forEach(({ el, p }, idx) => {
        if (!el) return;
        const x = p.x * RADIUS + 210 - 36;
        const y = p.y * RADIUS + 210 - 36;
        const depth = (p.z + 1) / 2;
        const opacity = 0.22 + depth * 0.78;
        const scale = 0.52 + depth * 0.58;
        el.style.cssText = `position:absolute;left:${x}px;top:${y}px;opacity:${opacity};transform:scale(${scale});z-index:${idx};width:72px;height:72px;`;
      });
      rafId.current = requestAnimationFrame(render);
    }
    rafId.current = requestAnimationFrame(render);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMX.current = e.clientX;
    lastMY.current = e.clientY;
    dragVX.current = 0;
    dragVY.current = 0;
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMX.current;
      const dy = e.clientY - lastMY.current;
      dragVX.current = dy * 0.006;
      dragVY.current = dx * 0.006;
      rotX.current += dragVX.current;
      rotY.current += dragVY.current;
      lastMX.current = e.clientX;
      lastMY.current = e.clientY;
    };
    const onMouseUp = () => {
      if (isDragging.current) {
        velX.current = dragVX.current;
        velY.current = dragVY.current || 0.0038;
        isDragging.current = false;
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => { window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("mouseup", onMouseUp); };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => { isDragging.current = true; lastMX.current = e.touches[0].clientX; lastMY.current = e.touches[0].clientY; dragVX.current = 0; dragVY.current = 0; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastMX.current;
    const dy = e.touches[0].clientY - lastMY.current;
    dragVX.current = dy * 0.006; dragVY.current = dx * 0.006;
    rotX.current += dragVX.current; rotY.current += dragVY.current;
    lastMX.current = e.touches[0].clientX; lastMY.current = e.touches[0].clientY;
  };
  const onTouchEnd = () => { velX.current = dragVX.current; velY.current = dragVY.current || 0.0038; isDragging.current = false; };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3 text-white/40">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/30" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-mono">{techStack.length} technologies · daily stack</span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-white/30" />
      </div>
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center select-none"
        style={{ height: "460px", cursor: "grab" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
        <div ref={sceneRef} className="relative" style={{ width: "420px", height: "420px" }}>
          {techStack.map((tech, i) => (
            <div key={tech.name} ref={(el) => { if (el) itemEls.current[i] = el; }} style={{ position: "absolute", width: 72, height: 72 }}>
              <div
                className="w-full h-full rounded-[18px] flex flex-col items-center justify-center gap-[5px] transition-all duration-200 hover:scale-110"
                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.62)", backdropFilter: "blur(12px)", boxShadow: `0 0 22px -6px ${tech.color}66` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.45)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                <img src={tech.icon} alt={tech.name} loading="lazy" style={{ width: 30, height: 30, objectFit: "contain" }} />
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", lineHeight: 1.2 }}>{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-full" style={{ boxShadow: "inset 0 0 90px 45px rgba(0,0,0,0.72)" }} />
      </div>
    </div>
  );
}

// ─── Animated heading word ────────────────────────────────────────────────────
function AnimatedWord({ word, index, inView }: { word: string; index: number; inView: boolean }) {
  return (
    <div className="overflow-hidden">
      <motion.span
        className="inline-block font-black tracking-tight leading-none"
        style={{ fontSize: "clamp(32px,6vw,80px)" }}
        initial={{ y: "110%", opacity: 0, rotateX: 40, filter: "blur(10px)" }}
        animate={
          inView
            ? { y: "0%", opacity: 1, rotateX: 0, filter: "blur(0px)" }
            : { y: "110%", opacity: 0, rotateX: 40, filter: "blur(10px)" }
        }
        transition={{ duration: 0.85, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.18)]">
          {word}
        </span>
      </motion.span>
    </div>
  );
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type TabId = "projects" | "certificates" | "tech";

const tabs: { id: TabId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "tech", label: "Tech Stack" },
];

const HEADING_WORDS = ["Portfolio", "Showcase"];

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ShowcaseSection() {
  const [active, setActive] = useState<TabId>("projects");
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Heading re-animates every time it scrolls into view
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: false, amount: 0.6 });

  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: false, amount: 0.6 });

  const tabRef = useRef(null);
  const tabInView = useInView(tabRef, { once: false, amount: 0.5 });

  const switchTab = useCallback(
    (id: TabId) => {
      if (id === active) return;
      setActive(id);
      setAnimKey((k) => k + 1);
    },
    [active]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    const order = tabs.map((t) => t.id);
    const idx = order.indexOf(active);
    if (dx < 0 && idx < order.length - 1) switchTab(order[idx + 1]);
    if (dx > 0 && idx > 0) switchTab(order[idx - 1]);
    touchStartX.current = null;
  };

  const activePillLeft =
    active === "projects" ? "8px" : active === "certificates" ? "calc(33.333% + 4px)" : "calc(66.666% + 0px)";

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen bg-black overflow-hidden text-white px-4 sm:px-8 md:px-16 lg:px-24 py-0 md:py-12 -mt-16 sm:mt-0 md:mt-12">
      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">

        {/* Label */}
        <motion.div
          ref={labelRef}
          initial={{ opacity: 0, y: -20 }}
          animate={labelInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center gap-4 mb-5"
        >
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono">Showcase</span>
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
        </motion.div>

        {/* Heading — each word rises from bottom on every scroll into view */}
        <div
          ref={headingRef}
          className="relative mb-12 flex flex-wrap items-baseline justify-center gap-x-5"
          style={{ perspective: "1000px" }}
        >
          {HEADING_WORDS.map((word, i) => (
            <AnimatedWord key={word} word={word} index={i} inView={headingInView} />
          ))}
        </div>

        {/* Tab Switcher */}
        <motion.div
          ref={tabRef}
          initial={{ opacity: 0, y: 28 }}
          animate={tabInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative flex items-center p-1.5 rounded-full border border-white/20 bg-white/[0.08] mb-14 w-full max-w-md shadow-2xl shadow-black/40"
          style={{ backdropFilter: "blur(30px)" }}
        >
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white/20 border border-white/40 shadow-xl shadow-white/10"
            style={{
              width: "calc(33.333% - 4px)",
              left: activePillLeft,
              transition: "left 0.35s cubic-bezier(0.23,1,0.32,1)",
              backdropFilter: "blur(15px)",
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className="relative z-10 flex-1 h-12 rounded-full text-xs font-medium tracking-wide transition-colors duration-200"
            >
              <span className={active === tab.id ? "text-white font-semibold" : "text-white/35 hover:text-white/60"}>
                {tab.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={animKey}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {active === "projects" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {projects.map((item, i) => (
                  <ProjectCard key={i} item={item} index={i} />
                ))}
              </div>
            )}
            {active === "certificates" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {certificates.map((item, i) => (
                  <CertCard key={i} item={item} index={i} />
                ))}
              </div>
            )}
            {active === "tech" && <TechGrid />}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes lineMove {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
