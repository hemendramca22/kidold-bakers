import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          chocolate: {
            DEFAULT: "#2C1810",
            light: "#4A2E1B",
            dark: "#1A0D08",
          },
          crimson: {
            DEFAULT: "#8B1528",
            light: "#A82035",
            hover: "#700F1E",
            dark: "#590916",
          },
          gold: {
            DEFAULT: "#C89D3C",
            light: "#E5B958",
            sparkle: "#F5C542",
            muted: "#DFD3B6",
          },
          cream: {
            DEFAULT: "#FFFDF7",
            warm: "#FBF5EB",
            biscuit: "#F3E9DC",
          },
          apricot: {
            DEFAULT: "#E67E22",
            light: "#F39C12",
          },
          surface: {
            DEFAULT: "#FFFFFF",
            warm: "#FAF7F2",
          },
          border: {
            DEFAULT: "#EADBCC",
            subtle: "#F5ECE2",
          },
          dark: {
            bg: "#120905",
            surface: "#1D0F0A",
            elevated: "#27150E",
            card: "rgba(29, 15, 10, 0.78)",
            border: "rgba(200, 157, 60, 0.22)",
            borderSubtle: "rgba(200, 157, 60, 0.12)",
            text: "#FFFDF7",
            muted: "#DFD3B6",
          },
          metallic: {
            gold: "#D4AF37",
            goldLight: "#FAF0D7",
            goldDark: "#9E7422",
            bronze: "#C97D60",
            bronzeDark: "#5E261B",
            silver: "#E2E8F0",
            dark: "#26150D",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        bakery: "0 4px 20px -2px rgba(44, 24, 16, 0.08)",
        "bakery-md": "0 8px 24px -3px rgba(44, 24, 16, 0.10)",
        "bakery-lg": "0 16px 36px -4px rgba(44, 24, 16, 0.14)",
        crimson: "0 4px 18px -2px rgba(139, 21, 40, 0.28)",
        gold: "0 4px 18px -2px rgba(200, 157, 60, 0.30)",
        // Tactile & Dimensional Skeuomorphic Shadows
        "tactile-sm": "inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 2px 8px -1px rgba(44, 24, 16, 0.06)",
        tactile: "inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 6px 20px -2px rgba(44, 24, 16, 0.08), 0 2px 4px rgba(44, 24, 16, 0.04)",
        "tactile-hover": "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 16px 36px -4px rgba(44, 24, 16, 0.14), 0 4px 8px rgba(44, 24, 16, 0.06)",
        "tactile-pressed": "inset 0 3px 6px rgba(44, 24, 16, 0.2), 0 1px 2px rgba(44, 24, 16, 0.08)",
        "crimson-tactile": "inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 6px 20px -2px rgba(139, 21, 40, 0.45), inset 0 -2px 0 rgba(80, 10, 22, 0.4)",
        "gold-tactile": "inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 6px 20px -2px rgba(200, 157, 60, 0.45), inset 0 -2px 0 rgba(140, 95, 20, 0.4)",
        "chocolate-tactile": "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 6px 20px -2px rgba(44, 24, 16, 0.35), inset 0 -2px 0 rgba(18, 9, 5, 0.5)",
        // Metallic Skeuomorphic Shadows & Bezels
        "metallic-gold": "inset 0 1px 1px rgba(255, 255, 255, 0.85), inset 0 -2px 3px rgba(140, 95, 20, 0.45), 0 4px 14px rgba(200, 157, 60, 0.35)",
        "metallic-bezel": "inset 0 2px 4px rgba(255, 255, 255, 0.75), inset 0 -2px 4px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(44, 24, 16, 0.25)",
        "metallic-domed": "inset 0 3px 5px rgba(255, 255, 255, 0.85), inset 0 -3px 6px rgba(0, 0, 0, 0.65), 0 6px 16px rgba(44, 24, 16, 0.35)",
        // Glassmorphism Specular Rims
        "glass-light": "0 12px 36px -4px rgba(72, 43, 21, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(200, 157, 60, 0.15)",
        "glass-dark": "0 14px 40px -4px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(229, 185, 88, 0.35), inset 0 -1px 0 rgba(139, 21, 40, 0.25)",
        "skeuo-inset": "inset 0 2px 5px rgba(44, 24, 16, 0.18), 0 1px 0 rgba(255, 255, 255, 0.8)",
        "skeuo-inset-dark": "inset 0 3px 8px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(200, 157, 60, 0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
