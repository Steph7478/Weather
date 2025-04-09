/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        "sm": "480px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px"
      },
      backgroundImage: {
        bluesky: "url(/src/assets/images/Background/blue_sky.jpg)"
      }
    }

  },

  plugins: [], // Plugins do Tailwind
}