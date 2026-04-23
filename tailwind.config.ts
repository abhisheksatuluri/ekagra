import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ── Ekāgra earth palette ─────────────────────────────────────────
        ink: "#0B0906",            // near-black canvas (primary background)
        "ink-2": "#14100B",        // slightly lifted dark for layered surfaces
        "ink-3": "#1C1711",        // third dark tone for cards on dark
        cream: "#E8DFC9",          // warm off-white — text on dark
        "cream-2": "#F2EBDD",      // slightly brighter cream — alt surfaces
        "cream-mute": "#B8AE96",   // muted cream for secondary text on dark

        // four earth accents — one per offering
        olive: "#7F7524",          // Join-In · entry · Spine First
        "olive-deep": "#605817",
        "olive-soft": "rgba(127,117,36,0.15)",

        rust: "#C94E2A",           // First Spark · ignition · Fire Room
        "rust-deep": "#A13D1E",
        "rust-soft": "rgba(201,78,42,0.15)",

        sage: "#5F6857",           // Axis First · presence · Collaborations (more earthy, less WhatsApp-green)
        "sage-deep": "#4A5144",
        "sage-soft": "rgba(95,104,87,0.15)",

        taupe: "#6C574A",          // The Arc · journey · Root/Stay Sessions
        "taupe-deep": "#544237",
        "taupe-soft": "rgba(108,87,74,0.18)",

        // ── Legacy aliases (keep so old classes don't break) ───────────
        sand: "#F2EBDD",
        "sand-deep": "#E8DFC9",
        "off-white": "#FAF9F6",
        "off-white-2": "#F4F1E9",
        "deep-brown": "#4A3F35",
        "deep-brown-darker": "#0B0906",  // now ink
        "brown-mid": "#6E5E50",
        "brown-soft": "#8C7D70",
        ember: "#C94E2A",               // now rust
        "ember-deep": "#A13D1E",

        // ── shadcn tokens ───────────────────────────────────────────────
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 1s ease-in-out",
        "fade-in-up": "fadeInUp 1s ease-in-out",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif-text)", "Georgia", "serif"],
        display: ["var(--font-dm-serif-display)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
