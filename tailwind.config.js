/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      640: '640px',  //sm
      768: '768px',
      960: '960px',
      1024: '1024px',  //lg
      1280: '1280px',
      1440: '1440px',
      1600: '1600px',
      1440: '1440px',
      1920: '1920px',
      2160: '2160px'
    },
    extend: {
      colors: {
        'brand': '#0052d9',
        'brand-active': '#003cab',
        'body-light': '#F8F8F8',
        'body-dark': '#111111',
        'black-2': 'rgba(0, 0, 0, 0.02)',
        'black-10': 'rgba(0, 0, 0, 0.1)',
        'black-20': 'rgba(0, 0, 0, 0.2)',
        'black-30': 'rgba(0, 0, 0, 0.3)',
        'black-40': 'rgba(0, 0, 0, 0.4)',
        'black-50': 'rgba(0, 0, 0, 0.5)',
        'black-60': 'rgba(0, 0, 0, 0.6)',
        'black-70': 'rgba(0, 0, 0, 0.7)',
        'black-80': 'rgba(0, 0, 0, 0.8)',
        'black-90': 'rgba(0, 0, 0, 0.9)',
        'white-2': 'rgba(255, 255, 255, 0.02)',
        'white-10': 'rgba(255, 255, 255, 0.1)',
        'white-20': 'rgba(255, 255, 255, 0.2)',
        'white-30': 'rgba(255, 255, 255, 0.3)',
        'white-40': 'rgba(255, 255, 255, 0.4)',
        'white-50': 'rgba(255, 255, 255, 0.5)',
        'white-60': 'rgba(255, 255, 255, 0.6)',
        'white-70': 'rgba(255, 255, 255, 0.7)',
        'white-80': 'rgba(255, 255, 255, 0.8)',
        'white-90': 'rgba(255, 255, 255, 0.9)',
        'hd-light': 'rgba(250, 250, 252, 0.8)',
        'hd-dark': 'rgba(22, 22, 23, 0.8)',
      },
      backgroundImage: {
        'navbar': 'linear-gradient(0deg,rgba(20,20,20,0) 1%,rgba(20,20,20,.7) 99%)'
      },
      zIndex: Array.from({ length: 2000 }).reduce((map, _, index) => {
        map[index] = `${index}`
        return map
      }, {}),
      backdropBlur: Array.from({ length: 1000 }).reduce((map, _, index) => {
        map[index] = `${index}px`
        return map
      }, {}),
      backdropSaturate: Array.from({ length: 500 }).reduce((map, _, index) => {
        map[index] = `${index}%`
        return map
      }, {}),
    },
  },
  plugins: [],
}

