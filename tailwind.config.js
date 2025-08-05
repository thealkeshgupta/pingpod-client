/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        PlaywritePl: ["Playwrite PL", "cursive"],
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        /* === Backgrounds === */
        bg: {
          primary: "#1F2937",
          secondary: "#00346E",
          tertiary: "#1F1F1F",
          inverted: "#E5EBFF",
          soft: "#EDEDED",
          subtle: "#9CB3D6",
          deep: "#5277B3",
          overlay: "rgba(0, 0, 0, 0.5)",
        },

        /* === Surfaces / Panels === */
        surface: {
          base: "#ffffff",
          muted: "#f7f7f7",
          raised: "#ebebeb",
          hover: "#e5e5e5",
          active: "#dcdcdc",
          inverted: "#1f1f1f",
        },

        /* === Text === */
        text: {
          primary: "#1e1e1e",
          secondary: "#444444",
          tertiary: "#666666",
          muted: "#A1A1A1",
          subtle: "#DBDBDB",
          inverted: "#F0F0F0",
          link: "#2563eb",
        },

        /* === Borders === */
        border: {
          light: "#e0e0e0",
          default: "#d1d5db",
          dark: "#9ca3af",
          strong: "#6b7280",
        },

        /* === Accents === */
        accent: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          muted: "#dcdafe",
          subtle: "#eef2ff",
        },

        /* === Buttons === */
        button: {
          primary: "#2563eb",
          hover: "#1d4ed8",
          secondary: "#6b7280",
          secondaryHover: "#4b5563",
          danger: "#dc2626",
          success: "#16a34a",
        },

        /* === Status === */
        status: {
          success: "#22c55e",
          error: "#ef4444",
          warning: "#f59e0b",
          info: "#3b82f6",
        },

        /* === Misc === */
        highlight: {
          yellow: "#fef08a",
          green: "#bbf7d0",
          blue: "#bfdbfe",
        },
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #111827, #1f2937)",
        "button-gradient": "linear-gradient(to right, #7e22ce, #ef4444)",
        "dark-gray-gradient": "linear-gradient(to right, #1f1f1f, #3a3a3a)",
      },
      keyframes: {
        "wave-pause": {
          "0%": { transform: "translateY(0) scale(1)", opacity: 0.4 },
          "30%": { transform: "translateY(-6px) scale(1.2)", opacity: 1 },
          "60%": { transform: "translateY(0) scale(1)", opacity: 0.4 },
          "100%": { transform: "translateY(0) scale(1)", opacity: 0.4 }, // pause effect
        },
      },
      animation: {
        "wave-pause": "wave-pause 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
