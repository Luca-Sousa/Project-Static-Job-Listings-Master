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
        bgDesktop: "url('./src/assets/images/bg-header-desktop.svg')",
        bgMobile: "url('./src/assets/images/bg-header-mobile.svg')",
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xs': {'max': '469px'},
    },
  },
  plugins: [],
}
