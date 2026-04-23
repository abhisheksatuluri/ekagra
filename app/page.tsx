"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Mail, Instagram, Send, ArrowUpRight } from "lucide-react"
import Lenis from "lenis"

// ═══════════════════════════════════════════════════════════════════════════
// Ekāgra earth palette — Sharath's reference
// ink / cream / olive / rust / sage / taupe
// Each offering maps to one accent — a psychological journey through fire,
// axis, arc, and one-pointedness.
// ═══════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────
// Scroll progress bar
// ───────────────────────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-rust"
    />
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Floating nav (appears after hero)
// ───────────────────────────────────────────────────────────────────────────
function FloatingNav() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed left-0 right-0 top-0 z-40 border-b border-cream/10 bg-ink/85 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
            <a href="#top" className="font-display text-xl tracking-tight text-cream">
              ekāgra<span className="text-rust">.</span>
            </a>
            <div className="hidden items-center gap-8 font-sans text-xs font-medium uppercase tracking-[0.18em] text-cream/65 md:flex">
              <a href="#offerings" className="transition-colors hover:text-rust">Offerings</a>
              <a href="#about" className="transition-colors hover:text-rust">About</a>
              <a href="#connect" className="transition-colors hover:text-rust">Connect</a>
            </div>
            <a
              href="https://instagram.com/ekagra_now"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 font-mono text-xs tracking-tight text-cream/65 transition-colors hover:text-rust"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">@ekagra_now</span>
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Kinetic text
// ───────────────────────────────────────────────────────────────────────────
function KineticText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
}: {
  text: string
  as?: "span" | "h1" | "h2" | "h3" | "p"
  className?: string
  delay?: number
}) {
  const words = text.split(" ")
  const Component = motion[Tag] as typeof motion.span
  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
            },
          }}
        >
          {w}
        </motion.span>
      ))}
    </Component>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Reveal on scroll
// ───────────────────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 32,
  className = "",
  once = true,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Parallax image
// ───────────────────────────────────────────────────────────────────────────
function ParallaxImage({
  src,
  alt,
  className = "",
  intensity = 80,
  priority = false,
  objectPosition = "center",
}: {
  src: string
  alt: string
  className?: string
  intensity?: number
  priority?: boolean
  objectPosition?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.15]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          style={{ objectPosition }}
        />
      </motion.div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Magnetic CTA
// ───────────────────────────────────────────────────────────────────────────
function MagneticCTA({
  children,
  href,
  variant = "rust",
  target,
}: {
  children: React.ReactNode
  href: string
  variant?: "rust" | "cream" | "outline-cream" | "outline-ink"
  target?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25
    setCoords({ x, y })
  }
  const onMouseLeave = () => setCoords({ x: 0, y: 0 })

  const palette = {
    rust: "border-rust bg-rust text-cream hover:bg-rust-deep hover:border-rust-deep",
    cream: "border-cream bg-cream text-ink hover:bg-cream-2",
    "outline-cream":
      "border-cream/40 text-cream hover:bg-cream hover:text-ink hover:border-cream",
    "outline-ink":
      "border-ink/30 text-ink hover:bg-ink hover:text-cream hover:border-ink",
  }[variant]

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: coords.x, y: coords.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.3 }}
      className={`group inline-flex items-center gap-2 border px-7 py-4 font-sans text-sm font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${palette}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Eyebrow
// ───────────────────────────────────────────────────────────────────────────
function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[0.68rem] font-medium tracking-[0.22em] uppercase ${className}`}>
      {children}
    </span>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// ChangesList
// ───────────────────────────────────────────────────────────────────────────
function ChangesList({
  items,
  tone = "dark",
}: {
  items: string[]
  tone?: "dark" | "light"
}) {
  // "dark" = items on dark/accent bg (use cream text)
  // "light" = items on cream bg (use ink text)
  const text = tone === "dark" ? "text-cream/85" : "text-ink/80"
  const line = tone === "dark" ? "border-cream/12" : "border-ink/10"
  const num = tone === "dark" ? "text-rust" : "text-rust"

  return (
    <ul className={`divide-y ${line}`}>
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
          className={`flex items-baseline gap-3 py-3 font-serif text-base leading-relaxed ${text} md:text-[1.05rem]`}
        >
          <span className={`font-mono text-[0.65rem] ${num}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Offerings data
// ───────────────────────────────────────────────────────────────────────────
const OFFERINGS = {
  spineFirst: {
    eyebrow: "01 · Entry",
    title: "Spine First Mornings",
    priceDisplay: "$14",
    priceSub: "per session · or $150 / month",
    priceINR: "~₹1,000 / session · ~₹10,500 / month",
    subline: "A live, small-group session to begin the day with spinal clarity.",
    description: [
      "We move through a concise, high-precision sequence where breath and posture come into alignment. Each cue is deliberate. Each breath is placed.",
      "The result is a system that holds steadiness before the day even begins. Conducted online, 3× weekly. In-person availability based on location.",
    ],
    changes: [
      "You stop rushing through effort",
      "The body becomes less reactive under load",
      "Attention doesn't drop the moment it gets uncomfortable",
      "You experience staying, not just moving",
    ],
    image: "/images/final/spine-first-ganga.jpg",
    imageAlt: "Person standing in the Ganga at sunrise",
    cta: "Join",
    href: "https://t.me/ekagra_now",
    ctaTarget: "_blank",
  },
  root: {
    eyebrow: "02 · Correction",
    title: "Root",
    subtitle: "(One-on-One)",
    priceDisplay: "$30",
    priceSub: "per session · $150 for a 5-session block",
    priceINR: "~₹2,500 per session",
    subline: "Direct one-on-one work where your patterns are seen and corrected in real time.",
    description: [
      "This session helps shift you out of mental overdrive and bring you back into the body. Through breath, posture, and intentional movement, we support the parasympathetic system, the part of your system responsible for recovery and calm.",
      "The work affects vagal tone and reduces accumulated sympathetic charge, bringing the system into clarity. Each session meets you exactly where you are.",
    ],
    changes: [
      "Your exact escape points become obvious",
      "You can't hide inside the practice",
      "Corrections happen immediately, not over weeks",
      "Progress compresses — what takes time alone speeds up",
    ],
    image: "/images/practice-concrete-fold.jpg",
    imageAlt: "Forward fold practice against a raw concrete wall",
    cta: "Enquire",
    href: "mailto:ekagranow@proton.me",
  },
  microDrops: {
    eyebrow: "03 · Daily reset",
    title: "Micro Practice Drops",
    priceDisplay: "$4.44",
    priceSub: "per drop · 12–18 min",
    priceINR: "~₹370 per drop",
    subline: "Short, targeted practices that quickly bring you back into a grounded state.",
    description: [
      "Focused breathwork, simple movement, and still awareness to help shift your body out of stress mode. The system responds fast to certain cues like held breath, slow controlled motion, or steady sound — and that's what these practices deliver.",
      "Use them in the morning to start clear, mid-day to recenter, or before bed to unwind. Over time, they help your system stay more stable and less reactive.",
    ],
    changes: [
      "Quick return to the body when the day fragments",
      "Short enough to actually do, consistently",
      "Resets that shift the tone without taking the day over",
      "Builds the habit of returning, not the burden of practice",
    ],
    image: "/images/final/vrikshasana.jpg",
    imageAlt: "Tree pose by the river at sunrise",
    cta: "Join",
    href: "https://t.me/ekagra_now",
    ctaTarget: "_blank",
  },
  fireRoom: {
    eyebrow: "04 · Flagship · 21-day container",
    title: "The Fire Room",
    priceDisplay: "$333",
    priceSub: "21 days · daily live · Mon–Sat · Sunday off",
    priceINR: "~₹27,750",
    subline:
      "A daily live container that removes inconsistency and builds a stable internal baseline.",
    description: [
      "Through posture, daily rhythm, breath awareness, and precise instructions, we train the system to stop leaking energy and start holding charge.",
      "It brings stability to parts of the system responsible for rhythm and alertness. It balances sleep patterns, builds focus, and helps reduce emotional volatility. Over time, it builds what yoga calls ojas: a steady, grounded vitality you can feel in your spine.",
    ],
    changes: [
      "Sleep drops deeper — the body actually lets go",
      "Energy stabilizes — fewer crashes, less dependence on stimulation",
      "Internal noise reduces — less looping, less constant thinking pressure",
      "Clarity sharpens — decisions feel simpler, cleaner",
      "Body feels contained — less scattered, more precise movement and action",
      "Discomfort is no longer avoided immediately — you can stay through it",
      "Emotional swings flatten — less reactive, more grounded responses",
      "A daily rhythm forms — not forced, but carried by repetition",
    ],
    image: "/images/final/vatayanasana-full.jpg",
    imageAlt: "A grounding posture by the Ganga",
    cta: "Apply",
    href: "mailto:ekagranow@proton.me",
  },
  collaborations: {
    eyebrow: "05 · Presence",
    title: "Collaborations & Presence Invitations",
    priceDisplay: "By request",
    priceSub: "For retreats, artists, spaces that need real stillness",
    subline:
      "When I'm present in a space, I don't entertain or perform. I regulate the environment.",
    description: [
      "A grounded system can shift a room. That's real biology. Bodies pick up on each other's signals, and when mine is anchored, others feel it.",
      "This offering isn't about spotlight. It's about being in the room with full stillness, subtle power, and no leakage. Through breath, silence, or voice, I bring the voltage that resets the space from within.",
    ],
    changes: [
      "The space becomes more coherent — measurable in how people settle",
      "Faster drop-in for participants — less warm-up, more depth",
      "Presence that regulates without performing",
      "A grounded reference in the room for the work you're hosting",
    ],
    image: "/images/meditation-collaboration.jpg",
    imageAlt: "Meditation by the Ganga",
    cta: "Enquire",
    href: "mailto:ekagranow@proton.me",
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function EkagraNow() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroImageY = useTransform(heroScroll, [0, 1], [0, 160])
  const heroTextY = useTransform(heroScroll, [0, 1], [0, -80])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-ink text-cream">
      <ScrollProgress />
      <FloatingNav />

      {/* ═══ HERO — ink canvas, sun-vrikshasana image, rust accent ═══ */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink"
      >
        {/* Desktop: landscape-cropped image, full-bleed cover. Full asana visible. */}
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 -bottom-[160px] hidden md:block"
        >
          <Image
            src="/images/hero-vriksha-landscape.jpg"
            alt="Tree pose with the sun between prayer hands on the Ganga at sunset"
            fill
            priority
            className="object-cover saturate-[1.05] contrast-[1.05]"
            style={{ objectPosition: "center center" }}
          />
        </motion.div>

        {/* Mobile: original portrait image, full-bleed cover */}
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 -bottom-[160px] md:hidden"
        >
          <Image
            src="/images/hero-vriksha-sun.jpg"
            alt="Tree pose with the sun between prayer hands on the Ganga at sunset"
            fill
            priority
            className="object-cover saturate-[1.05] contrast-[1.05]"
            style={{ objectPosition: "center 55%" }}
          />
        </motion.div>

        {/* top wash for mark legibility */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28vh] bg-gradient-to-b from-ink/60 via-ink/20 to-transparent" />

        {/* bottom vignette for text */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[88vh] bg-[linear-gradient(to_top,rgba(11,9,6,0.92)_0%,rgba(11,9,6,0.55)_35%,rgba(11,9,6,0.2)_65%,transparent_100%)]" />

        {/* seamless join with next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6vh] bg-gradient-to-t from-ink to-transparent" />

        <div className="absolute left-6 top-6 z-10 md:left-10 md:top-8">
          <motion.a
            href="#top"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display text-xl tracking-tight text-cream drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] md:text-2xl"
          >
            ekāgra<span className="text-rust">.</span>
          </motion.a>
        </div>

        <motion.a
          href="https://instagram.com/ekagra_now"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="group absolute right-6 top-6 z-10 flex items-center gap-1.5 font-mono text-xs tracking-tight text-cream drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] md:right-10 md:top-8"
        >
          <Instagram className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">@ekagra_now</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.a>

        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-32 text-center text-cream md:pb-40"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="mb-7"
          >
            <Eyebrow className="text-rust/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              One-pointedness · through the body
            </Eyebrow>
          </motion.div>

          <h1 className="mx-auto max-w-[18ch] font-display text-[clamp(2.5rem,8vw,6.5rem)] font-normal leading-[1.02] tracking-[-0.015em] text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.55)]">
            <KineticText text="Start with your spine." as="span" className="block" />
            <KineticText
              text="Not with meditation"
              as="span"
              className="block text-rust"
              delay={0.5}
            />
          </h1>

          <motion.a
            href="#thesis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[0.66rem] tracking-[0.28em] uppercase text-cream/65 transition-colors hover:text-rust md:bottom-10"
          >
            <span>Scroll if you're called to</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="block h-8 w-[1px] bg-gradient-to-b from-cream/60 to-transparent"
            />
          </motion.a>
        </motion.div>
      </section>

      {/* ═══ THESIS — ink, rust accent on "excuses" ═══ */}
      <section
        id="thesis"
        className="relative flex min-h-[80svh] items-center bg-ink px-6 py-32 md:py-48"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,78,42,0.09)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(201,78,42,0.06)_0%,transparent_55%)]" />
        </div>
        <div className="relative mx-auto max-w-[1100px]">
          <Reveal>
            <Eyebrow className="text-rust">The thesis</Eyebrow>
          </Reveal>
          <div className="mt-8 md:mt-10">
            <h2 className="font-display text-[clamp(1.75rem,5.5vw,4.8rem)] font-normal leading-[1.1] tracking-[-0.01em] text-cream">
              <Reveal delay={0}>
                <span className="block">The body is the only path</span>
              </Reveal>
              <Reveal delay={0.2}>
                <span className="block">
                  you can't make{" "}
                  <em className="font-serif italic text-rust">excuses</em> out of.
                </span>
              </Reveal>
            </h2>
          </div>
          <Reveal delay={0.4}>
            <p className="mt-12 max-w-[56ch] font-serif text-lg italic leading-relaxed text-cream/65 md:mt-16 md:text-xl">
              Regulation happens when the sequence is right. Body, breath, attention, stillness.
              In that order. Not otherwise.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="mt-8 h-px w-24 bg-rust/60" />
            <p className="mt-3 font-mono text-xs tracking-[0.14em] text-cream/45">
              Ekāgra · from a reel
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ REJECTIONS — ink-2 (slightly lifted dark) ═══ */}
      <section className="relative bg-ink-2 px-6 py-24 md:py-40">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-20">
            <Reveal>
              <Eyebrow className="sticky top-32 text-rust">What this isn't</Eyebrow>
            </Reveal>
            <div>
              <div className="space-y-6 font-display text-[clamp(1.4rem,3vw,2.4rem)] font-normal leading-[1.25] text-cream">
                {[
                  ["Not", "more advanced postures."],
                  ["Not", "tantra, not kundalini, not mantras to chant."],
                  ["Not", "30-second Instagram tricks."],
                  ["Not", "a lineage to follow or a guru to obey."],
                  ["Not", "meditation first — the body hasn't settled yet."],
                ].map(([prefix, text], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
                    className="flex items-baseline gap-4"
                  >
                    <span className="text-rust">{prefix}</span>
                    <span className="text-cream/85">{text}</span>
                  </motion.div>
                ))}
              </div>
              <Reveal delay={0.3}>
                <div className="mt-14 border-l-2 border-rust pl-6 md:mt-20 md:pl-10">
                  <p className="font-serif text-lg italic leading-relaxed text-cream/80 md:text-2xl md:leading-[1.45]">
                    The body is the only path you can't make excuses out of. Once you start
                    focusing on it, you can't literally come up with an excuse now.
                  </p>
                  <p className="mt-4 font-mono text-xs tracking-[0.14em] text-cream/50">
                    — Ekāgra
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div id="offerings" />

      {/* ═══ 01 SPINE FIRST — OLIVE (Join-In · Entry) ═══ */}
      <OfferingEarth data={OFFERINGS.spineFirst} bg="olive" imageSide="left" />

      {/* ═══ 02 ROOT — TAUPE (The Arc · Journey) ═══ */}
      <OfferingEarth data={OFFERINGS.root} bg="taupe" imageSide="right" />

      {/* ═══ 03 MICRO DROPS — CREAM (visual breath, neutral tier) ═══ */}
      <OfferingEarth data={OFFERINGS.microDrops} bg="cream" imageSide="left" compact />

      {/* ═══ 04 FIRE ROOM — INK with RUST accents (First Spark · flagship) ═══ */}
      <OfferingFire data={OFFERINGS.fireRoom} />

      {/* ═══ 05 COLLABORATIONS — SAGE (Axis First · presence) ═══ */}
      <OfferingEarth data={OFFERINGS.collaborations} bg="sage" imageSide="right" compact />

      {/* ═══ ABOUT — ink with editorial pulls ═══ */}
      <section id="about" className="relative bg-ink px-6 py-24 text-cream md:py-40">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <Eyebrow className="text-rust">About</Eyebrow>
          </Reveal>

          <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-[1fr_1.2fr] md:gap-20">
            <div className="md:sticky md:top-28 md:self-start">
              <ParallaxImage
                src="/images/practice-concrete-side.jpg"
                alt="Side stretch posture against a concrete wall"
                className="aspect-[3/4] w-full"
                intensity={40}
              />
            </div>
            <div className="space-y-10 md:space-y-14">
              <Reveal>
                <h3 className="font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.15] text-cream">
                  I don't come from a lineage,
                  <br />
                  <span className="text-rust">but from the Ganga.</span>
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-serif text-lg leading-[1.7] text-cream/75 md:text-xl">
                  Not from technique, but from immersion. I walked the fire, studied with teachers,
                  unlearned most of it, and let silence become the real guru.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="border-l-2 border-rust pl-6 md:pl-10">
                  <p className="font-display text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.3] text-cream">
                    This path isn't about flexibility or posture. It's about{" "}
                    <em className="not-italic text-rust">electricity.</em> About breath. About
                    removing what's false.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-serif text-base leading-[1.7] text-cream/70 md:text-lg">
                  What I offer isn't yoga as physical discipline or aesthetic display. It's yoga as
                  system regulation. A return to the body's innate intelligence. A way to stop the
                  constant leakage of energy and build something real from within.
                </p>
              </Reveal>
            </div>
          </div>

          {/* second pair — bandwidth, Halasana sunset */}
          <div className="mt-24 grid gap-14 md:mt-36 md:grid-cols-[1.2fr_1fr] md:gap-20">
            <div className="order-2 space-y-10 md:order-1 md:space-y-14">
              <Reveal>
                <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[1.2] text-cream">
                  Think of the body as a vessel with bandwidth.
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-serif text-lg leading-[1.7] text-cream/75 md:text-xl">
                  Higher states of being are real for you only because you have a body. Otherwise
                  you have nothing else to talk about. Increase the bandwidth. The rest lands on
                  its own.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-serif text-base italic leading-[1.7] text-cream/60 md:text-lg">
                  If it resonates, welcome. You're not late. You're right on time.
                </p>
              </Reveal>
            </div>
            <div className="order-1 md:order-2 md:sticky md:top-28 md:self-start">
              <ParallaxImage
                src="/images/ganga-halasana-sunset.jpg"
                alt="Halasana at sunset by the Ganga"
                className="aspect-[3/4] w-full"
                intensity={40}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING LINE — CREAM (visual breath before Connect) ═══ */}
      <section className="relative bg-cream px-6 py-28 text-ink md:py-40">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-[1.25] text-ink">
              Most of this unfolds quietly.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-serif text-xl italic leading-relaxed text-ink/70 md:text-2xl md:leading-[1.45]">
              Curiosity brought me here. Practice keeps me alive.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <MagneticCTA href="https://t.me/ekagra_now" target="_blank" variant="rust">
                Join the morning room
              </MagneticCTA>
              <MagneticCTA href="https://instagram.com/ekagra_now" target="_blank" variant="outline-ink">
                @ekagra_now
              </MagneticCTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONNECT — ink ═══ */}
      <section id="connect" className="relative bg-ink px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <Reveal>
                <Eyebrow className="text-rust">Connect</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.15] text-cream">
                  Open the door, and
                  <br />
                  <span className="text-rust">walk in quietly.</span>
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-[42ch] font-serif text-lg leading-relaxed text-cream/65">
                  No sales calls, no funnels, no chase. Write when something has landed. I reply
                  when I'm not in practice or teaching.
                </p>
              </Reveal>
            </div>

            <div className="space-y-6">
              <Reveal>
                <ChannelLink
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value="ekagranow@proton.me"
                  href="mailto:ekagranow@proton.me"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <ChannelLink
                  icon={<Send className="h-5 w-5" />}
                  label="Telegram"
                  value="@ekagra_now"
                  href="https://t.me/ekagra_now"
                  target="_blank"
                />
              </Reveal>
              <Reveal delay={0.2}>
                <ChannelLink
                  icon={<Instagram className="h-5 w-5" />}
                  label="Instagram"
                  value="@ekagra_now"
                  href="https://instagram.com/ekagra_now"
                  target="_blank"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-ink border-t border-cream/10 px-6 py-14 text-cream/60">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-16">
            <div>
              <a href="#top" className="font-display text-2xl text-cream">
                ekāgra<span className="text-rust">.</span>
              </a>
              <p className="mt-4 max-w-[32ch] font-serif text-sm leading-relaxed text-cream/55">
                One-pointedness, trained through the body.
              </p>
            </div>
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cream/45">
                Offerings
              </div>
              <ul className="mt-4 space-y-2.5 font-serif text-sm text-cream/75">
                <li><a href="#offerings" className="transition-colors hover:text-rust">Spine First Mornings</a></li>
                <li><a href="#offerings" className="transition-colors hover:text-rust">Root (1:1)</a></li>
                <li><a href="#offerings" className="transition-colors hover:text-rust">Micro Practice Drops</a></li>
                <li><a href="#offerings" className="transition-colors hover:text-rust">The Fire Room</a></li>
                <li><a href="#offerings" className="transition-colors hover:text-rust">Collaborations</a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cream/45">
                Elsewhere
              </div>
              <ul className="mt-4 space-y-2.5 font-serif text-sm text-cream/75">
                <li><a href="mailto:ekagranow@proton.me" className="transition-colors hover:text-rust">ekagranow@proton.me</a></li>
                <li><a href="https://t.me/ekagra_now" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-rust">Telegram → @ekagra_now</a></li>
                <li><a href="https://instagram.com/ekagra_now" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-rust">Instagram → @ekagra_now</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-cream/40">
            <span>© 2026 · Ekāgra</span>
            <span className="font-serif italic normal-case tracking-normal text-cream/55">
              शिवमार्गे स्थिरो भव
            </span>
            <a href="#top" className="transition-colors hover:text-rust">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// OfferingEarth — colored-background offering treatment (olive, taupe, sage, cream)
// Cream body stays legible against all 4 earth tones + cream variant inverts
// ═══════════════════════════════════════════════════════════════════════════
type EarthBg = "olive" | "taupe" | "sage" | "cream"

function OfferingEarth({
  data,
  bg,
  imageSide,
  compact = false,
}: {
  data: any
  bg: EarthBg
  imageSide: "left" | "right"
  compact?: boolean
}) {
  const padding = compact ? "py-20 md:py-28" : "py-24 md:py-40"

  // Color tokens per earth variant — includes hex for the camouflage edge-blend
  const tone = {
    olive: {
      section: "bg-olive",
      hex: "#7F7524",
      text: "text-cream",
      textMuted: "text-cream/80",
      textSoft: "text-cream/65",
      line: "border-cream/15",
      price: "text-cream",
      eyebrow: "text-cream/75",
      ctaVariant: "cream" as const,
    },
    taupe: {
      section: "bg-taupe",
      hex: "#6C574A",
      text: "text-cream",
      textMuted: "text-cream/82",
      textSoft: "text-cream/65",
      line: "border-cream/15",
      price: "text-cream",
      eyebrow: "text-cream/75",
      ctaVariant: "cream" as const,
    },
    sage: {
      section: "bg-sage",
      hex: "#6E786A",
      text: "text-cream",
      textMuted: "text-cream/85",
      textSoft: "text-cream/70",
      line: "border-cream/15",
      price: "text-cream",
      eyebrow: "text-cream/75",
      ctaVariant: "cream" as const,
    },
    cream: {
      section: "bg-cream-2",
      hex: "#F2EBDD",
      text: "text-ink",
      textMuted: "text-ink/78",
      textSoft: "text-ink/60",
      line: "border-ink/10",
      price: "text-rust",
      eyebrow: "text-rust",
      ctaVariant: "rust" as const,
    },
  }[bg]

  const listTone = bg === "cream" ? "light" : "dark"

  return (
    <section className={`relative overflow-hidden px-6 ${tone.section} ${padding}`}>
      <div className="mx-auto max-w-[1240px]">
        <div
          className={`grid items-start gap-10 md:gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24 ${
            imageSide === "right" ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Camouflage: 4-edge gradient fades image into section bg color,
                so the image dissolves into the page — no hard photo border. */}
            <div className="relative aspect-[4/5] w-full">
              <ParallaxImage
                src={data.image}
                alt={data.imageAlt}
                className="aspect-[4/5] w-full"
                intensity={compact ? 30 : 60}
              />
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background: `
                    linear-gradient(to top, ${tone.hex} 0%, transparent 18%),
                    linear-gradient(to bottom, ${tone.hex} 0%, transparent 18%),
                    linear-gradient(to left, ${tone.hex} 0%, transparent 14%),
                    linear-gradient(to right, ${tone.hex} 0%, transparent 14%)
                  `,
                }}
              />
            </div>
          </div>

          <div className={`flex flex-col gap-10 md:gap-12 ${tone.text}`}>
            <Reveal>
              <Eyebrow className={tone.eyebrow}>{data.eyebrow}</Eyebrow>
              <h2 className={`mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.01em] ${tone.text}`}>
                {data.title}
                {data.subtitle && (
                  <span className={`block font-serif text-[0.5em] italic font-normal ${tone.textSoft}`}>
                    {data.subtitle}
                  </span>
                )}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={`flex items-baseline gap-4 border-t pt-5 ${tone.line}`}>
                <span
                  className={`font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none ${tone.price}`}
                >
                  {data.priceDisplay}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className={`font-mono text-[0.72rem] uppercase tracking-[0.12em] ${tone.textMuted}`}>
                    {data.priceSub}
                  </span>
                  {data.priceINR && (
                    <span className={`font-mono text-[0.7rem] ${tone.textSoft}`}>
                      {data.priceINR}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className={`font-serif text-lg italic leading-[1.5] ${tone.textMuted} md:text-xl`}>
                {data.subline}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className={`space-y-5 font-serif text-base leading-[1.7] ${tone.textMuted} md:text-[1.05rem]`}>
                {data.description.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <Eyebrow className={`mb-5 block ${tone.text}`}>What changes</Eyebrow>
                <ChangesList items={data.changes} tone={listTone} />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="pt-2">
                <MagneticCTA href={data.href} target={data.ctaTarget} variant={tone.ctaVariant}>
                  {data.cta}
                </MagneticCTA>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// OfferingFire — dramatic premium treatment for Fire Room
// ═══════════════════════════════════════════════════════════════════════════
function OfferingFire({ data }: { data: any }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 text-cream md:py-48">
      {/* rust ember glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,78,42,0.16)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(201,78,42,0.10)_0%,transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <div>
            <Reveal>
              <Eyebrow className="text-rust">{data.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,7.5vw,6.4rem)] leading-[0.98] tracking-[-0.015em] text-cream">
                <span className="block">The</span>
                <span className="block text-rust">Fire Room.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[42ch] font-serif text-xl italic leading-[1.45] text-cream/80 md:text-2xl">
                {data.subline}
              </p>
            </Reveal>
          </div>

          <div className="md:pt-10">
            <Reveal delay={0.15}>
              <div className="border-l-2 border-rust pl-6">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-rust">
                  Price
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-display text-[clamp(3rem,6vw,4.4rem)] leading-none text-cream">
                    $333
                  </span>
                  <span className="font-mono text-xs text-cream/50">~₹27,750</span>
                </div>
                <div className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-cream/55">
                  {data.priceSub}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 md:mt-24">
            <div className="relative mx-auto max-w-[720px]">
              {/* Camouflage: image edges fade into the ink canvas */}
              <div className="relative aspect-[3/4] w-full">
                <ParallaxImage
                  src={data.image}
                  alt={data.imageAlt}
                  className="aspect-[3/4] w-full"
                  intensity={50}
                  objectPosition="center"
                />
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    background: `
                      linear-gradient(to top, #0B0906 0%, transparent 18%),
                      linear-gradient(to bottom, #0B0906 0%, transparent 18%),
                      linear-gradient(to left, #0B0906 0%, transparent 14%),
                      linear-gradient(to right, #0B0906 0%, transparent 14%)
                    `,
                  }}
                />
              </div>
              {/* Ember corner brackets */}
              <div className="pointer-events-none absolute -left-3 -top-3 z-20 h-12 w-12 border-l-2 border-t-2 border-rust/70 md:-left-5 md:-top-5 md:h-20 md:w-20" />
              <div className="pointer-events-none absolute -bottom-3 -right-3 z-20 h-12 w-12 border-b-2 border-r-2 border-rust/70 md:-bottom-5 md:-right-5 md:h-20 md:w-20" />
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div className="space-y-6">
            <Reveal>
              <Eyebrow className="text-rust">The container</Eyebrow>
            </Reveal>
            <div className="space-y-6 font-serif text-lg leading-[1.7] text-cream/75 md:text-xl">
              {data.description.map((p: string, i: number) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <Eyebrow className="mb-6 block text-rust">What changes</Eyebrow>
            </Reveal>
            <ChangesList items={data.changes} tone="dark" />
            <Reveal delay={0.4}>
              <div className="mt-12">
                <MagneticCTA href={data.href} variant="rust">
                  Apply to the Fire Room
                </MagneticCTA>
                <p className="mt-4 font-serif text-sm italic text-cream/50">
                  Invitation-based. Fire Room opens when the first circle is ready.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ChannelLink
// ═══════════════════════════════════════════════════════════════════════════
function ChannelLink({
  icon,
  label,
  value,
  href,
  target,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  target?: string
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-5 border-b border-cream/10 pb-5 transition-colors hover:border-rust"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all group-hover:border-rust group-hover:text-rust">
        {icon}
      </span>
      <div className="flex-1">
        <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cream/45">
          {label}
        </div>
        <div className="mt-0.5 font-serif text-lg text-cream transition-colors group-hover:text-rust md:text-xl">
          {value}
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-cream/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rust" />
    </a>
  )
}
