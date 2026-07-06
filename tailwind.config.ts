import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        foreground: "#ffffff",
        "surface-1": "#1a1a1a",
        "surface-2": "#222222",
        "surface-3": "#2a2a2a",
        accent: "#3b82f6",
        "accent-glow": "rgba(59, 130, 246, 0.15)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-bg": "rgba(255, 255, 255, 0.03)",
        muted: "#888888",
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "wide-custom": "0.04em",
        "wider-custom": "0.08em",
        "widest-custom": "0.16em",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "noise": "noise 0.5s steps(10) infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "aurora": "aurora 8s ease-in-out infinite",
        "cursor-glow": "cursorGlow 2s ease-in-out infinite",
        "progress": "progress 2s ease-in-out",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        noise: {
          "0%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "20%": { transform: "translate(-10%, 5%)" },
          "30%": { transform: "translate(5%, -10%)" },
          "40%": { transform: "translate(-5%, 15%)" },
          "50%": { transform: "translate(-10%, 5%)" },
          "60%": { transform: "translate(15%, 0)" },
          "70%": { transform: "translate(0, 10%)" },
          "80%": { transform: "translate(-15%, 0)" },
          "90%": { transform: "translate(10%, 5%)" },
          "100%": { transform: "translate(5%, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(30px, -50px) rotate(120deg)" },
          "66%": { transform: "translate(-20px, 20px) rotate(240deg)" },
        },
        cursorGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
export default config;
