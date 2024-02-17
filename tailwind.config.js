/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        Quicksand:['Quicksand','sans-serif'],
      },
      colors: {
        customColor: '#F85C2C',
        darkWhite:'#7F7F7F',
        customBlue: '#4299e1',
      },
      width: {
        '68': '17rem', // Custom width with class name w-68
      },
    },
  },
  plugins: [],
}
