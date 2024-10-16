/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',//All files in the src folder with these extensions
    './public/index.html', //html file in the public folder
    './components/**/*.{html,js}', //files in specific components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

