import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: {
          DEFAULT: "rgb(var(--color-ground) / <alpha-value>)",
          muted: "rgb(var(--color-ground-muted) / <alpha-value>)",
          elevated: "rgb(var(--color-ground-elevated) / <alpha-value>)",
          card: "rgb(var(--color-ground-card) / <alpha-value>)",
        },
        charcoal: {
          DEFAULT: "rgb(var(--color-charcoal) / <alpha-value>)",
          muted: "rgb(var(--color-charcoal-muted) / <alpha-value>)",
          subtle: "rgb(var(--color-charcoal-subtle) / <alpha-value>)",
          dim: "rgb(var(--color-charcoal-dim) / <alpha-value>)",
        },
        rule: {
          DEFAULT: "rgb(var(--color-rule) / <alpha-value>)",
          subtle: "rgb(var(--color-rule-subtle) / <alpha-value>)",
          gold: "rgba(212, 175, 55, 0.25)",
        },
        gold: {
          DEFAULT: "rgb(var(--color-gold) / <alpha-value>)",
          bright: "rgb(var(--color-gold-bright) / <alpha-value>)",
          light: "rgb(var(--color-gold-light) / <alpha-value>)",
          50: "#FFFDF0",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#F5C518", // Vibrant athletic gold
          500: "#D4AF37", // Metallic gold
          600: "#C59B27", // Rich burnished gold
          700: "#A17A16", // Deep gold accent
          800: "#854D0E",
          900: "#713F12",
        },
        flame: {
          blue: {
            DEFAULT: "#00A3E0", // Electric Cyan / Light Blue ("Longer lasting pleasure")
            light: "#38BDF8",
            subtle: "rgba(0, 163, 224, 0.15)",
            glow: "rgba(0, 163, 224, 0.35)",
          },
          green: {
            DEFAULT: "#9CD619", // Neon Lime / Green ("Greater stimulation")
            light: "#BEF264",
            subtle: "rgba(156, 214, 25, 0.15)",
            glow: "rgba(156, 214, 25, 0.35)",
          },
          pink: {
            DEFAULT: "#E60067", // Electric Hot Pink / Magenta ("More intensity")
            light: "#FB7185",
            subtle: "rgba(230, 0, 103, 0.15)",
            glow: "rgba(230, 0, 103, 0.35)",
          },
        },
        gss: {
          cream: "#FAF7F2",
          ivory: "#FFFDF9",
          sand: "#F4EFEA",
          berry: "#8E244D",
          berryDark: "#611432",
          rose: "#D94B6D",
          roseLight: "#FCECEE",
          blush: "#FDF2F4",
          coral: "#E05A47",
          sage: "#3F6E54",
          sageLight: "#EBF3EE",
          dark: "#1A1416",
          charcoal: "#292426",
          muted: "#7A7074",
        },
      },
      fontFamily: {
        athletic: [
          "'Barlow Condensed'",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        sans: [
          "'Barlow'",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        editorial: [
          "'Fraunces'",
          "Georgia",
          "serif",
        ],
        gssSans: [
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
