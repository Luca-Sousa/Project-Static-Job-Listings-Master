/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorDesaturatedDarkCyan: 'hsl(180, 29%, 50%)',
        // Background
        colorLightGrayishCyanB: 'hsl(180, 52%, 96%)',
        // Filter Tablets
        colorLightGrayishCyanFT: 'hsl(180, 31%, 95%)',
        colorDarkGrayishCyan: 'hsl(180, 8%, 52%)',
        colorVeryDarkGrayishCyan: 'hsl(180, 14%, 20%)',
      },
      fontFamily: {
        LeagueSpartan: 'League Spartan',
      },
      backgroundImage: {
        teste: "url('./src/assets/images/bg-header-desktop.svg')"
      }
    },
  },
  plugins: [],
}

