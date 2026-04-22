"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown, Mail, Instagram, Send } from "lucide-react"

export default function EkagraNow() {
  const heroRef = useRef<HTMLElement>(null)
  const offeringsRef = useRef<HTMLElement>(null)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".fade-in-element")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToOfferings = () => {
    offeringsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-image.jpg"
            alt="Yoga practice by the river at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-8 text-4xl font-sans font-light tracking-[0.2em] text-shadow md:text-6xl lg:text-7xl">
              START WITH YOUR SPINE.
              <br />
              NOT WITH MEDITATION.
            </h1>
            <button
              onClick={scrollToOfferings}
              className="mt-16 font-sans text-sm font-medium tracking-widest opacity-70 transition-opacity hover:opacity-100 md:text-base"
            >
              Scroll down if you're called to.
            </button>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section ref={offeringsRef} className="bg-off-white py-16 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          {/* Root (One-on-One) */}
          <div className="fade-in-element mb-20 md:mb-40">
            <div className="grid gap-8 md:gap-16 lg:grid-cols-2 lg:gap-20">
              <div className="relative h-64 overflow-hidden md:h-96 lg:h-[500px]">
                <Image
                  src="/images/one-on-one-root.jpg"
                  alt="Seated spinal twist yoga pose by the Ganges river"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-sans font-light tracking-[0.2em] text-deep-brown md:text-3xl">
                    ROOT (ONE-ON-ONE)
                  </h2>
                  <div className="border-t border-deep-brown/10 pt-3">
                    <p className="font-sans text-lg font-semibold text-deep-brown md:text-xl">
                      $30 <span className="text-base font-normal text-deep-brown/70">(approx. ₹2,500)</span>
                    </p>
                    <p className="mt-2 font-serif text-base italic text-deep-brown/70 md:text-lg">
                      Primarily online. In-person available by request.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-base leading-relaxed text-deep-brown/80 md:text-lg md:leading-relaxed">
                  <p>
                    This session helps shift you out of mental overdrive and bring you back into the body. Through
                    breath, posture, and intentional movement, we support the parasympathetic system, the part of your
                    system responsible for recovery and calm.
                  </p>
                  <p>
                    The work affects vagal tone and reduces accumulated sympathetic charge, bringing the system into
                    clarity. Each session meets you exactly where you are. It may include movement, breathwork, or
                    sitting still, depending on what your body actually needs that day.
                  </p>
                  <p>
                    The session supports neurophysiological regulation and helps bring attention back to its rightful
                    center.
                  </p>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base mb-3">
                    WHAT CHANGES
                  </h3>
                  <div className="space-y-2 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                    <p>• Your exact escape points become obvious</p>
                    <p>• You can't hide inside the practice</p>
                    <p>• Corrections happen immediately, not over weeks</p>
                    <p>• Progress compresses — what takes time alone speeds up</p>
                  </div>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <button
                    onClick={() => toggleSection("root")}
                    className="flex w-full items-center justify-between text-left focus:outline-none"
                  >
                    <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base">
                      WHO IS IT FOR?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-deep-brown/60 transition-transform duration-300 ${
                        expandedSections["root"] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      expandedSections["root"] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mt-3 space-y-2 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                      <p>• For those feeling overstimulated or scattered</p>
                      <p>• For those needing recalibration at a physiological level</p>
                      <p>• For those ready to reset their energy system from within</p>
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:ekagranow@proton.me"
                  className="inline-block w-fit rounded-lg border border-ember bg-transparent px-6 py-3 font-sans text-base font-medium text-ember transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-ember hover:text-off-white"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Spine First Mornings */}
          <div className="fade-in-element mb-20 md:mb-40">
            <div className="grid gap-8 md:gap-16 lg:grid-cols-2 lg:gap-20">
              <div className="order-2 flex flex-col justify-center space-y-6 md:space-y-8 lg:order-1">
                <div className="space-y-3">
                  <h2 className="text-2xl font-sans font-light tracking-[0.2em] text-deep-brown md:text-3xl">
                    SPINE FIRST MORNINGS
                  </h2>
                  <div className="border-t border-deep-brown/10 pt-3">
                    <p className="font-sans text-lg font-semibold text-deep-brown md:text-xl">
                      $14–$15 <span className="text-base font-normal text-deep-brown/70">(approx. ₹1000–₹1200)</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-base leading-relaxed text-deep-brown/80 md:text-lg md:leading-relaxed">
                  <p>
                    A live, small-group session to begin the day with spinal clarity. We move through a concise,
                    high-precision sequence where breath and posture come into alignment.
                  </p>
                  <p>
                    Each cue is deliberate. Each breath is placed. The result is a system that holds steadiness
                    before the day even begins.
                  </p>
                  <p>Conducted online. In-person availability based on location.</p>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base mb-3">
                    WHAT CHANGES
                  </h3>
                  <div className="space-y-2 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                    <p>• You stop rushing through effort</p>
                    <p>• The body becomes less reactive under load</p>
                    <p>• Attention doesn't drop the moment it gets uncomfortable</p>
                    <p>• You experience staying, not just moving</p>
                  </div>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <button
                    onClick={() => toggleSection("spine-first-mornings")}
                    className="flex w-full items-center justify-between text-left focus:outline-none"
                  >
                    <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base">
                      WHO IS IT FOR?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-deep-brown/60 transition-transform duration-300 ${
                        expandedSections["spine-first-mornings"] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      expandedSections["spine-first-mornings"] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mt-3 space-y-2 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                      <p>• For those who feel scattered when they wake</p>
                      <p>• For those who want to enter the day with intent</p>
                      <p>• For those ready to build their base in the right place</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://t.me/ekagra_now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-fit rounded-lg border border-ember bg-transparent px-6 py-3 font-sans text-base font-medium text-ember transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-ember hover:text-off-white"
                >
                  Join
                </a>
              </div>
              <div className="order-1 relative h-64 overflow-hidden md:h-96 lg:order-2 lg:h-[500px]">
                <Image
                  src="/images/final/spine-first-ganga.jpg"
                  alt="Person standing in Ganga river at sunrise"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Micro Practice Drops */}
          <div className="fade-in-element mb-20 md:mb-40">
            <div className="grid gap-8 md:gap-16 lg:grid-cols-2 lg:gap-20">
              <div className="relative h-64 overflow-hidden md:h-96 lg:h-[500px]">
                <Image
                  src="/images/final/vrikshasana.jpg"
                  alt="Person in tree pose by the river at sunrise"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-sans font-light tracking-[0.2em] text-deep-brown md:text-3xl">
                    MICRO PRACTICE DROPS
                  </h2>
                  <div className="border-t border-deep-brown/10 pt-3">
                    <p className="font-sans text-lg font-semibold text-deep-brown md:text-xl">
                      $4.44 <span className="text-base font-normal text-deep-brown/70">(approx. ₹350–₹400)</span>
                    </p>
                    <p className="mt-2 font-serif text-base italic text-deep-brown/70 md:text-lg">
                      12 to 18 minute voice and video led resets for your day.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-base leading-relaxed text-deep-brown/80 md:text-lg md:leading-relaxed">
                  <p>
                    These are short, targeted practices that quickly bring you back into a grounded state. We use
                    focused breathwork, simple movement, and still awareness to help shift your body out of stress mode.
                    The system responds fast to certain cues like held breath, slow controlled motion, or steady
                    sound, and that's what these practices deliver.
                  </p>
                  <p>
                    These sessions fit into real life. Use them in the morning to start clear, mid day to recenter, or
                    before bed to unwind. Over time, they help your system stay more stable and less reactive.
                  </p>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base mb-3">
                    WHAT CHANGES
                  </h3>
                  <div className="space-y-2 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                    <p>• Quick return to the body when the day fragments</p>
                    <p>• Short enough to actually do, consistently</p>
                    <p>• Resets that shift the tone without taking the day over</p>
                    <p>• Builds the habit of returning, not the burden of practice</p>
                  </div>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <button
                    onClick={() => toggleSection("micro-practice")}
                    className="flex w-full items-center justify-between text-left focus:outline-none"
                  >
                    <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base">
                      WHO IS IT FOR?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-deep-brown/60 transition-transform duration-300 ${
                        expandedSections["micro-practice"] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      expandedSections["micro-practice"] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="mt-3 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                      Perfect if you're too busy for long sessions, but still want real support. If your mind loops
                      often, or your energy feels scattered, or you're in emotional turbulence, these short resets can
                      shift the whole tone of your day.
                    </p>
                  </div>
                </div>

                <a
                  href="https://t.me/ekagra_now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-fit rounded-lg border border-ember bg-transparent px-6 py-3 font-sans text-base font-medium text-ember transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-ember hover:text-off-white"
                >
                  Join
                </a>
              </div>
            </div>
          </div>

          {/* The Fire Room */}
          <div className="fade-in-element mb-20 md:mb-40">
            <div className="grid gap-8 md:gap-16 lg:grid-cols-2 lg:gap-20">
              <div className="order-2 flex flex-col justify-center space-y-6 md:space-y-8 lg:order-1">
                <div className="space-y-3">
                  <h2 className="text-2xl font-sans font-light tracking-[0.2em] text-deep-brown md:text-3xl">
                    THE FIRE ROOM (21 DAYS)
                  </h2>
                  <div className="border-t border-deep-brown/10 pt-3">
                    <p className="font-sans text-lg font-semibold text-deep-brown md:text-xl">
                      $333 <span className="text-base font-normal text-deep-brown/70">(approx. ₹27,750)</span>
                    </p>
                    <p className="mt-2 font-serif text-base italic text-deep-brown/70 md:text-lg">
                      A closed 21 day protocol to build internal strength and clarity.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-base leading-relaxed text-deep-brown/80 md:text-lg md:leading-relaxed">
                  <p>
                    This container helps you hold your energy, sharpen your focus, and refine how you move through the
                    day. Through posture, daily rhythm, breath awareness, and precise instructions, we train the system
                    to stop leaking energy and start holding charge.
                  </p>
                  <p>
                    Scientifically, it brings stability to parts of the system responsible for rhythm and
                    alertness. It balances sleep patterns, builds focus, and helps reduce emotional volatility. Over
                    time, it builds what yoga calls ojas: a steady, grounded vitality you can feel in your spine.
                  </p>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base mb-3">
                    WHAT CHANGES
                  </h3>
                  <div className="space-y-2 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                    <p>• Sleep drops deeper — the body actually lets go</p>
                    <p>• Energy stabilizes — fewer crashes, less dependence on stimulation</p>
                    <p>• Internal noise reduces — less looping, less constant thinking pressure</p>
                    <p>• Clarity sharpens — decisions feel simpler, cleaner</p>
                    <p>• Body feels contained — less scattered, more precise movement and action</p>
                    <p>• Discomfort is no longer avoided immediately — you can stay through it</p>
                    <p>• Emotional swings flatten — less reactive, more grounded responses</p>
                    <p>• A daily rhythm forms — not forced, but carried by repetition</p>
                  </div>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <button
                    onClick={() => toggleSection("fire-room")}
                    className="flex w-full items-center justify-between text-left focus:outline-none"
                  >
                    <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base">
                      WHO IS IT FOR?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-deep-brown/60 transition-transform duration-300 ${
                        expandedSections["fire-room"] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      expandedSections["fire-room"] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="mt-3 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                      If you feel your energy is easily drained, your mood shifts quickly, or your rhythm is unstable,
                      this is for you. Especially powerful for those ready to commit to something real, not just another
                      habit hack.
                    </p>
                  </div>
                </div>

                <a
                  href="mailto:ekagranow@proton.me"
                  className="inline-block w-fit rounded-lg border border-ember bg-transparent px-6 py-3 font-sans text-base font-medium text-ember transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-ember hover:text-off-white"
                >
                  Contact
                </a>
              </div>
              <div className="order-1 relative h-64 overflow-hidden md:h-96 lg:order-2 lg:h-[500px]">
                <Image
                  src="/images/final/vatayanasana-full.jpg"
                  alt="Person performing Vatayanasana (Horse Face Pose) by the Ganga with full body visible"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Collaborations */}
          <div className="fade-in-element">
            <div className="grid gap-8 md:gap-16 lg:grid-cols-2 lg:gap-20">
              <div className="relative h-64 overflow-hidden md:h-96 lg:h-[500px]">
                <Image
                  src="/images/meditation-collaboration.jpg"
                  alt="Person in meditation pose by the Ganga river"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-sans font-light tracking-[0.2em] text-deep-brown md:text-3xl">
                    COLLABORATIONS & PRESENCE INVITATIONS
                  </h2>
                  <div className="border-t border-deep-brown/10 pt-3">
                    <p className="font-serif text-base italic text-deep-brown/70 md:text-lg">
                      For retreats, artists, or spaces that need real stillness.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-base leading-relaxed text-deep-brown/80 md:text-lg md:leading-relaxed">
                  <p>
                    When I'm present in a space, I don't entertain or perform. I regulate the environment. A grounded
                    system can shift a room. That's real biology. Bodies pick up on each other's signals, and
                    when mine is anchored, others feel it.
                  </p>
                  <p>
                    This offering isn't about spotlight. It's about being in the room with full stillness, subtle power,
                    and no leakage. Through breath, silence, or voice, I bring the voltage that resets the space from
                    within.
                  </p>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base mb-3">
                    WHAT CHANGES
                  </h3>
                  <div className="space-y-2 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                    <p>• The space becomes more coherent — measurable in how people settle</p>
                    <p>• Faster drop-in for participants — less warm-up, more depth</p>
                    <p>• Presence that regulates without performing</p>
                    <p>• A grounded reference in the room for the work you're hosting</p>
                  </div>
                </div>

                <div className="border-t border-deep-brown/10 pt-4">
                  <button
                    onClick={() => toggleSection("collaborations")}
                    className="flex w-full items-center justify-between text-left focus:outline-none"
                  >
                    <h3 className="font-sans text-sm font-medium tracking-wider text-deep-brown md:text-base">
                      WHO IS IT FOR?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-deep-brown/60 transition-transform duration-300 ${
                        expandedSections["collaborations"] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      expandedSections["collaborations"] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="mt-3 font-sans text-base leading-relaxed text-deep-brown/70 md:text-lg">
                      Retreat organizers, creative leaders, or facilitators who want something deeper in the room:
                      someone who brings coherence, not distraction. If your work is already rooted in honesty and
                      depth, we'll be aligned.
                    </p>
                  </div>
                </div>

                <a
                  href="mailto:ekagranow@proton.me"
                  className="inline-block w-fit rounded-lg border border-ember bg-transparent px-6 py-3 font-sans text-base font-medium text-ember transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-ember hover:text-off-white"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-sand py-16 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="fade-in-element space-y-8 text-center">
            <div className="mx-auto max-w-3xl space-y-6 font-sans text-base leading-relaxed text-deep-brown/80 md:text-lg md:leading-relaxed">
              <p>
                I don't come from a lineage, but from the Ganga.
                <br />
                Not from technique, but from immersion.
              </p>
              <p>
                I walked the fire, studied with teachers, unlearned most of it,
                <br />
                and let silence become the real guru.
              </p>
              <p>
                This path isn't about flexibility or posture.
                <br />
                It's about electricity. About breath. About removing what's false.
              </p>
              <p>
                If it resonates, welcome.
                <br />
                You're not late. You're right on time.
              </p>
              <p>
                What I offer isn't yoga as physical discipline or aesthetic display.
                <br />
                It's yoga as system regulation.
                <br />A return to the body's innate intelligence.
                <br />A way to stop the constant leakage of energy and build something real from within.
                <br />
                This is embodied work that changes how you move through the world.
              </p>
              <p>
                Think of the body as a vessel with bandwidth.
                <br />
                Higher states of being are real for you
                <br />
                only because you have a body.
                <br />
                Increase the bandwidth. The rest lands on its own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Isn't */}
      <section className="bg-deep-brown py-16 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="fade-in-element space-y-8 text-center">
            <h2 className="font-sans text-2xl font-light tracking-[0.2em] text-off-white md:text-3xl">
              WHAT THIS ISN'T
            </h2>
            <div className="mx-auto max-w-3xl space-y-6 font-sans text-base leading-relaxed text-off-white/80 md:text-lg md:leading-relaxed">
              <p>
                Not more advanced postures.
                <br />
                Not tantra, not kundalini, not mantras to chant.
                <br />
                Not 30-second Instagram tricks.
                <br />
                Not a lineage to follow or a guru to obey.
                <br />
                Not meditation first &mdash; the body hasn't settled yet.
              </p>
              <p className="border-t border-off-white/10 pt-6">
                The body is the only path you can't make excuses out of.
                <br />
                Once you start focusing on it,
                <br />
                you can't literally come up with an excuse now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <div className="fade-in-element space-y-6 text-center">
            <h2 className="font-sans text-2xl font-light tracking-[0.2em] text-deep-brown md:text-3xl">CONNECT</h2>
            <div className="space-y-4 font-serif text-lg text-deep-brown">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:ekagranow@proton.me" className="hover:text-ember transition-colors">
                  ekagranow@proton.me
                </a>
              </div>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://t.me/ekagra_now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ember transition-opacity hover:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  @ekagra_now
                </a>
                <a
                  href="https://instagram.com/ekagra_now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ember transition-opacity hover:opacity-70"
                >
                  <Instagram className="h-4 w-4" />
                  @ekagra_now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-sand py-16 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="fade-in-element space-y-6 md:space-y-8">
            <p className="font-serif text-lg text-deep-brown md:text-xl lg:text-2xl">
              Most of this unfolds quietly.
              <br />
              Curiosity brought me here.
              <br />
              Practice keeps me alive.
            </p>
            <a
              href="https://t.me/ekagra_now"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-serif text-base text-ember transition-opacity hover:opacity-70 md:text-lg lg:text-xl"
            >
              → @ekagra_now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
