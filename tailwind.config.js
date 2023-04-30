/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Path to the tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    colours: {
      'white': '#f8fafc',
      'grey': '#e5e7eb',
      'dark-grey': '#9ca3af',
      'zinc': '#d4d4d8',
      'slate': '#94a3b8'
    }
  },
  plugins: [],
}
