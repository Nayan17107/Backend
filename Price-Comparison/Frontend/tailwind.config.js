/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Fredoka", "Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"]
      },
      colors: {
        ink: "#07070f",
        accent: "#6366f1",
        violet: "#a78bfa",
        pink: "#ec4899",
        success: "#4ade80",
        danger: "#f87171",
        warning: "#fbbf24"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99,102,241,0.35), 0 0 42px rgba(99,102,241,0.28)"
      }
    }
  },
  plugins: []
};
