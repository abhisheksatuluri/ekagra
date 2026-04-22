"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Mail, Instagram, Send, ArrowUpRight, ChevronDown } from "lucide-react"
import Lenis from "lenis"

// ───────────────────────────────────────────────────────────────────────────
// Scroll progress bar (top of viewport, ember line growing L→R)
// ───────────────────────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-ember"
    />
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Minimal floating nav (appears after scrolling past hero)
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
          className="fixed left-0 right-0 top-0 z-40 border-b border-deep-brown/10 bg-off-white/80 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
            <a href="#top" className="font-display text-xl tracking-tight text-deep-brown">
              ekāgra<span className="text-ember">.</span>
            </a>
            <div className="hidden items-center gap-8 font-sans text-xs font-medium uppercase tracking-[0.18em] text-brown-mid md:flex">
              <a href="#offerings" className="transition-colors hover:text-ember">Offerings</a>
              <a href="#about" className="transition-colors hover:text-ember">About</a>
              <a href="#connect" className="transition-colors hover:text-ember">Connect</a>
            </div>
            <a
              href="https://instagram.com/ekagra_now"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 font-mono text-xs tracking-tight text-brown-mid transition-colors hover:text-ember"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">@ekagra_now</span>
              <ArrowUpRight className="h-3 w-3 -translate-y-0 translate-x-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Kinetic text — reveals word by word with stagger
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
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </Component>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Reveal on scroll — standard fade + translate, viewport triggered
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
// Parallax image — image moves at a different scroll rate than surrounding
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
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
// Magnetic CTA button
// ───────────────────────────────────────────────────────────────────────────
function MagneticCTA({
  children,
  href,
  variant = "light",
  target,
}: {
  children: React.ReactNode
  href: string
  variant?: "light" | "dark" | "ember"
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

  const palette =
    variant === "dark"
      ? "border-off-white/30 text-off-white hover:bg-off-white hover:text-deep-brown"
      : variant === "ember"
      ? "border-ember bg-ember text-off-white hover:bg-ember-deep hover:border-ember-deep"
      : "border-deep-brown/20 text-deep-brown hover:border-deep-brown hover:bg-deep-brown hover:text-off-white"

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
// Eyebrow label — monospace tiny all-caps
// ───────────────────────────────────────────────────────────────────────────
function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-[0.68rem] font-medium tracking-[0.22em] uppercase ${className}`}
    >
      {children}
    </span>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// What-changes list
// ───────────────────────────────────────────────────────────────────────────
function ChangesList({
  items,
  dark = false,
}: {
  items: string[]
  dark?: boolean
}) {
  const color = dark ? "text-off-white/85" : "text-deep-brown/80"
  const line = dark ? "border-off-white/10" : "border-deep-brown/10"
  return (
    <ul className={`divide-y ${line}`}>
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
          className={`flex items-baseline gap-3 py-3 font-serif text-base leading-relaxed ${color} md:text-[1.05rem]`}
        >
          <span className="font-mono text-[0.65rem] text-ember">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Offerings content
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
    image: "/images/one-on-one-root.jpg",
    imageAlt: "Seated spinal twist by the Ganges",
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
    imageAlt: "Vatayanasana — a grounding posture by the Ganga",
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

// ───────────────────────────────────────────────────────────────────────────
// Main page
// ───────────────────────────────────────────────────────────────────────────
export default function EkagraNow() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroImageY = useTransform(heroScroll, [0, 1], [0, 160])
  const heroTextY = useTransform(heroScroll, [0, 1], [0, -80])
  const heroOverlay = useTransform(heroScroll, [0, 1], [0.3, 0.6])

  // Smooth scroll
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
    <div id="top" className="min-h-screen overflow-x-hidden bg-sand text-deep-brown">
      <ScrollProgress />
      <FloatingNav />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[680px] w-full overflow-hidden"
      >
        <motion.div style={{ y: heroImageY }} className="absolute inset-0 -bottom-[160px]">
          <Image
            src="/images/hero-image.jpg"
            alt="Yoga practice by the Ganga at sunrise"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        <motion.div
          style={{ opacity: heroOverlay }}
          className="absolute inset-0 bg-gradient-to-b from-deep-brown/50 via-deep-brown/30 to-deep-brown/70"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-sand to-transparent" />

        {/* top-left mark */}
        <div className="absolute left-6 top-6 z-10 md:left-10 md:top-8">
          <motion.a
            href="#top"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display text-xl tracking-tight text-off-white md:text-2xl"
          >
            ekāgra<span className="text-ember">.</span>
          </motion.a>
        </div>

        {/* top-right IG */}
        <motion.a
          href="https://instagram.com/ekagra_now"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="group absolute right-6 top-6 z-10 flex items-center gap-1.5 font-mono text-xs tracking-tight text-off-white md:right-10 md:top-8"
        >
          <Instagram className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">@ekagra_now</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.a>

        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-off-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="mb-8"
          >
            <Eyebrow className="text-off-white/70">One-pointedness · through the body</Eyebrow>
          </motion.div>

          <h1 className="mx-auto max-w-[20ch] font-display text-[clamp(2.5rem,8vw,6.5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-off-white [text-shadow:0_2px_40px_rgba(0,0,0,0.3)]">
            <KineticText text="Start with your spine." as="span" className="block" />
            <KineticText
              text="Not with meditation."
              as="span"
              className="block text-ember/90"
              delay={0.5}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-10 max-w-[38ch] font-serif text-lg italic leading-relaxed text-off-white/80 md:text-xl"
          >
            Yoga as system regulation. Not lineage. Not mantras. The body is the only path you can&apos;t
            make excuses out of.
          </motion.p>

          <motion.a
            href="#thesis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="group absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.28em] uppercase text-off-white/70 transition-colors hover:text-off-white"
          >
            <span>Scroll if you're called to</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="mt-3 mx-auto block h-8 w-[1px] bg-gradient-to-b from-off-white/60 to-transparent"
            />
          </motion.a>
        </motion.div>
      </section>

      {/* ═══ THESIS MOMENT ═══ */}
      <section
        id="thesis"
        className="relative flex min-h-[80svh] items-center bg-deep-brown px-6 py-32 md:py-48"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(233,107,44,0.08)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(233,107,44,0.06)_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-[1100px]">
          <Reveal>
            <Eyebrow className="text-ember">The thesis</Eyebrow>
          </Reveal>
          <div className="mt-8 md:mt-10">
            <h2 className="font-display text-[clamp(1.75rem,5.5vw,4.8rem)] font-normal leading-[1.1] tracking-[-0.01em] text-off-white">
              <Reveal delay={0}>
                <span className="block">The body is the only path</span>
              </Reveal>
              <Reveal delay={0.2}>
                <span className="block">you can't make <em className="font-serif italic text-ember/90 not-italic">excuses</em> out of.</span>
              </Reveal>
            </h2>
          </div>
          <Reveal delay={0.4}>
            <p className="mt-12 max-w-[56ch] font-serif text-lg italic leading-relaxed text-off-white/65 md:mt-16 md:text-xl">
              Regulation happens when the sequence is right. Body, breath, attention,
              stillness. In that order. Not otherwise.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="mt-8 h-px w-24 bg-ember/50" />
            <p className="mt-3 font-mono text-xs tracking-[0.14em] text-off-white/40">
              Sharath · from a reel, 2025
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ REJECTIONS ═══ */}
      <section className="relative bg-sand px-6 py-24 md:py-40">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-20">
            <Reveal>
              <Eyebrow className="sticky top-32 text-ember">What this isn't</Eyebrow>
            </Reveal>
            <div>
              <div className="space-y-6 font-display text-[clamp(1.4rem,3vw,2.4rem)] font-normal leading-[1.25] text-deep-brown">
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
                    <span className="text-ember">{prefix}</span>
                    <span className="text-deep-brown/85">{text}</span>
                  </motion.div>
                ))}
              </div>
              <Reveal delay={0.3}>
                <div className="mt-14 border-l-2 border-ember pl-6 md:mt-20 md:pl-10">
                  <p className="font-serif text-lg italic leading-relaxed text-deep-brown/80 md:text-2xl md:leading-[1.45]">
                    The body is the only path you can't make excuses out of. Once you start
                    focusing on it, you can't literally come up with an excuse now.
                  </p>
                  <p className="mt-4 font-mono text-xs tracking-[0.14em] text-brown-soft">
                    — Sharath
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OFFERINGS — SECTION ANCHOR ═══ */}
      <div id="offerings" />

      {/* ═══ 01 SPINE FIRST ═══ */}
      <OfferingLight data={OFFERINGS.spineFirst} imageSide="left" bg="off-white" />

      {/* ═══ 02 ROOT ═══ */}
      <OfferingLight data={OFFERINGS.root} imageSide="right" bg="sand" />

      {/* ═══ 03 MICRO DROPS ═══ */}
      <OfferingLight data={OFFERINGS.microDrops} imageSide="left" bg="off-white" compact />

      {/* ═══ 04 FIRE ROOM — DRAMATIC PREMIUM ═══ */}
      <OfferingDark data={OFFERINGS.fireRoom} />

      {/* ═══ 05 COLLABORATIONS ═══ */}
      <OfferingLight data={OFFERINGS.collaborations} imageSide="right" bg="sand" compact />

      {/* ═══ ABOUT — VISUAL ESSAY ═══ */}
      <section id="about" className="relative bg-off-white px-6 py-24 md:py-40">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <Eyebrow className="text-ember">About</Eyebrow>
          </Reveal>

          <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-[1fr_1.2fr] md:gap-20">
            <div className="md:sticky md:top-28 md:self-start">
              <ParallaxImage
                src="/images/practice-1.jpg"
                alt="Practice by the river"
                className="aspect-[3/4] w-full"
                intensity={40}
              />
            </div>
            <div className="space-y-10 md:space-y-14">
              <Reveal>
                <h3 className="font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.15] text-deep-brown">
                  I don't come from a lineage,
                  <br />
                  <span className="text-ember">but from the Ganga.</span>
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-serif text-lg leading-[1.7] text-deep-brown/80 md:text-xl">
                  Not from technique, but from immersion. I walked the fire, studied with teachers,
                  unlearned most of it, and let silence become the real guru.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="border-l-2 border-ember pl-6 md:pl-10">
                  <p className="font-display text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.3] text-deep-brown">
                    This path isn't about flexibility or posture. It's about{" "}
                    <em className="not-italic text-ember">electricity.</em> About breath. About
                    removing what's false.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-serif text-base leading-[1.7] text-deep-brown/75 md:text-lg">
                  What I offer isn't yoga as physical discipline or aesthetic display. It's yoga as
                  system regulation. A return to the body's innate intelligence. A way to stop the
                  constant leakage of energy and build something real from within.
                </p>
              </Reveal>
            </div>
          </div>

          {/* second pair — bandwidth moment */}
          <div className="mt-24 grid gap-14 md:mt-36 md:grid-cols-[1.2fr_1fr] md:gap-20">
            <div className="order-2 space-y-10 md:order-1 md:space-y-14">
              <Reveal>
                <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[1.2] text-deep-brown">
                  Think of the body as a vessel with bandwidth.
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-serif text-lg leading-[1.7] text-deep-brown/80 md:text-xl">
                  Higher states of being are real for you only because you have a body.
                  Otherwise you have nothing else to talk about. Increase the bandwidth. The rest
                  lands on its own.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-serif text-base italic leading-[1.7] text-brown-mid md:text-lg">
                  If it resonates, welcome. You're not late. You're right on time.
                </p>
              </Reveal>
            </div>
            <div className="order-1 md:order-2 md:sticky md:top-28 md:self-start">
              <ParallaxImage
                src="/images/practice-2.jpg"
                alt="Practice in silence"
                className="aspect-[3/4] w-full"
                intensity={40}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING LINE ═══ */}
      <section className="relative bg-sand px-6 py-28 md:py-40">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-[1.25] text-deep-brown">
              Most of this unfolds quietly.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-serif text-xl italic leading-relaxed text-brown-mid md:text-2xl md:leading-[1.45]">
              Curiosity brought me here. Practice keeps me alive.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <MagneticCTA href="https://t.me/ekagra_now" target="_blank" variant="ember">
                Join the morning room
              </MagneticCTA>
              <MagneticCTA href="https://instagram.com/ekagra_now" target="_blank" variant="light">
                @ekagra_now
              </MagneticCTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONNECT ═══ */}
      <section id="connect" className="relative bg-deep-brown px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <Reveal>
                <Eyebrow className="text-ember">Connect</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.15] text-off-white">
                  Open the door, and
                  <br />
                  <span className="text-ember">walk in quietly.</span>
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-[42ch] font-serif text-lg leading-relaxed text-off-white/65">
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
      <footer className="bg-deep-brown-darker border-t border-off-white/5 px-6 py-14 text-off-white/60">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-16">
            <div>
              <a href="#top" className="font-display text-2xl text-off-white">
                ekāgra<span className="text-ember">.</span>
              </a>
              <p className="mt-4 max-w-[32ch] font-serif text-sm leading-relaxed text-off-white/55">
                One-pointedness, trained through the body. Rishikesh, on the Ganga.
              </p>
            </div>
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-off-white/45">
                Offerings
              </div>
              <ul className="mt-4 space-y-2.5 font-serif text-sm text-off-white/75">
                <li>
                  <a href="#offerings" className="transition-colors hover:text-ember">
                    Spine First Mornings
                  </a>
                </li>
                <li>
                  <a href="#offerings" className="transition-colors hover:text-ember">
                    Root (1:1)
                  </a>
                </li>
                <li>
                  <a href="#offerings" className="transition-colors hover:text-ember">
                    Micro Practice Drops
                  </a>
                </li>
                <li>
                  <a href="#offerings" className="transition-colors hover:text-ember">
                    The Fire Room
                  </a>
                </li>
                <li>
                  <a href="#offerings" className="transition-colors hover:text-ember">
                    Collaborations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-off-white/45">
                Elsewhere
              </div>
              <ul className="mt-4 space-y-2.5 font-serif text-sm text-off-white/75">
                <li>
                  <a
                    href="mailto:ekagranow@proton.me"
                    className="transition-colors hover:text-ember"
                  >
                    ekagranow@proton.me
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/ekagra_now"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ember"
                  >
                    Telegram → @ekagra_now
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/ekagra_now"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ember"
                  >
                    Instagram → @ekagra_now
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-4 border-t border-off-white/10 pt-8 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-off-white/40">
            <span>© 2026 · Ekāgra</span>
            <span className="font-serif italic normal-case tracking-normal text-off-white/55">
              Built from the Ganga · शिवमार्गे स्थिरो भव
            </span>
            <a href="#top" className="transition-colors hover:text-ember">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// OfferingLight — standard light-bg offering (01, 02, 03, 05)
// ───────────────────────────────────────────────────────────────────────────
function OfferingLight({
  data,
  imageSide,
  bg,
  compact = false,
}: {
  data: any
  imageSide: "left" | "right"
  bg: "sand" | "off-white" | "off-white-2"
  compact?: boolean
}) {
  const bgClass = bg === "sand" ? "bg-sand" : bg === "off-white" ? "bg-off-white" : "bg-off-white-2"
  const padding = compact ? "py-20 md:py-28" : "py-24 md:py-40"

  return (
    <section className={`relative overflow-hidden px-6 ${bgClass} ${padding}`}>
      <div className="mx-auto max-w-[1240px]">
        <div
          className={`grid items-start gap-10 md:gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24 ${
            imageSide === "right" ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ParallaxImage
              src={data.image}
              alt={data.imageAlt}
              className={`${compact ? "aspect-[4/5]" : "aspect-[4/5]"} w-full`}
              intensity={compact ? 30 : 60}
            />
          </div>

          <div className="flex flex-col gap-10 md:gap-12">
            <Reveal>
              <Eyebrow className="text-ember">{data.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.01em] text-deep-brown">
                {data.title}
                {data.subtitle && (
                  <span className="block font-serif text-[0.5em] italic font-normal text-brown-mid">
                    {data.subtitle}
                  </span>
                )}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-baseline gap-4 border-t border-deep-brown/10 pt-5">
                <span className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none text-ember">
                  {data.priceDisplay}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-brown-mid">
                    {data.priceSub}
                  </span>
                  {data.priceINR && (
                    <span className="font-mono text-[0.7rem] text-brown-soft">
                      {data.priceINR}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-serif text-lg italic leading-[1.5] text-deep-brown/80 md:text-xl">
                {data.subline}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-5 font-serif text-base leading-[1.7] text-deep-brown/75 md:text-[1.05rem]">
                {data.description.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <Eyebrow className="mb-5 block text-deep-brown">What changes</Eyebrow>
                <ChangesList items={data.changes} />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="pt-2">
                <MagneticCTA
                  href={data.href}
                  target={data.ctaTarget}
                  variant="light"
                >
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

// ───────────────────────────────────────────────────────────────────────────
// OfferingDark — premium dramatic treatment for Fire Room
// ───────────────────────────────────────────────────────────────────────────
function OfferingDark({ data }: { data: any }) {
  return (
    <section className="relative overflow-hidden bg-deep-brown px-6 py-28 text-off-white md:py-48">
      {/* ambient warm glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(233,107,44,0.12)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(233,107,44,0.08)_0%,transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[1240px]">
        {/* top row — title + pricing */}
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <div>
            <Reveal>
              <Eyebrow className="text-ember">{data.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,7.5vw,6.4rem)] leading-[0.98] tracking-[-0.015em] text-off-white">
                <span className="block">The</span>
                <span className="block text-ember">Fire Room.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[42ch] font-serif text-xl italic leading-[1.45] text-off-white/80 md:text-2xl">
                {data.subline}
              </p>
            </Reveal>
          </div>

          <div className="md:pt-10">
            <Reveal delay={0.15}>
              <div className="border-l-2 border-ember pl-6">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-ember">
                  Price
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-display text-[clamp(3rem,6vw,4.4rem)] leading-none text-off-white">
                    $333
                  </span>
                  <span className="font-mono text-xs text-off-white/50">~₹27,750</span>
                </div>
                <div className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-off-white/55">
                  {data.priceSub}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* middle — full-bleed image with parallax */}
        <Reveal delay={0.2}>
          <div className="mt-16 md:mt-24">
            <ParallaxImage
              src={data.image}
              alt={data.imageAlt}
              className="aspect-[16/9] w-full md:aspect-[21/9]"
              intensity={80}
              objectPosition="center 30%"
            />
          </div>
        </Reveal>

        {/* bottom row — description + changes */}
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div className="space-y-6">
            <Reveal>
              <Eyebrow className="text-ember">The container</Eyebrow>
            </Reveal>
            <div className="space-y-6 font-serif text-lg leading-[1.7] text-off-white/75 md:text-xl">
              {data.description.map((p: string, i: number) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <Eyebrow className="mb-6 block text-ember">What changes</Eyebrow>
            </Reveal>
            <ChangesList items={data.changes} dark />
            <Reveal delay={0.4}>
              <div className="mt-12">
                <MagneticCTA href={data.href} variant="ember">
                  Apply to the Fire Room
                </MagneticCTA>
                <p className="mt-4 font-serif text-sm italic text-off-white/50">
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

// ───────────────────────────────────────────────────────────────────────────
// ChannelLink — a contact row (email / telegram / instagram)
// ───────────────────────────────────────────────────────────────────────────
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
      className="group flex items-center gap-5 border-b border-off-white/10 pb-5 transition-colors hover:border-ember"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-off-white/15 text-off-white/70 transition-all group-hover:border-ember group-hover:text-ember">
        {icon}
      </span>
      <div className="flex-1">
        <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-off-white/45">
          {label}
        </div>
        <div className="mt-0.5 font-serif text-lg text-off-white transition-colors group-hover:text-ember md:text-xl">
          {value}
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-off-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
    </a>
  )
}
