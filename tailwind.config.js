/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        middle: '0 auto',
      },
      width: {
        half: '50%',
      },
      minWidth: {
        half: '50%',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        hideCursor: {
          '100%': { borderColor: 'transparent' },
        },
        zoomInOut: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        floatingArrow: {
          '0%, 100%': { transform: 'translateY(-50%) scale(1)' },
          '50%': { transform: 'translateY(-55%) scale(1.2)' },
        },
      },
      animation: {
        'zoom-in-out': 'zoomInOut 3s ease-in-out infinite',
        'slide-out-left': 'slideOutLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'typing': 'typing 1s steps(40) 0s 1 normal forwards, hideCursor 2s forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.4s ease-out forwards',
        'floatingArrow': 'floatingArrow 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
