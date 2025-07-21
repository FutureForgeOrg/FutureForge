import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a23'
      },
      backgroundImage: {
        'grid': 'linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        serif: ['DM Serif Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        clean: ['Roboto', 'sans-serif'],
        rounded: ['Nunito', 'sans-serif'],
        elegant: ['Lora', 'serif'],
        tech: ['IBM Plex Sans', 'sans-serif'],
        bold: ['Montserrat', 'sans-serif'],
        futuristic: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

