export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': '#1b4332',
        'natural': '#4a7c59',
        'accent': '#d4c896',
        'light-bg': '#f8f9f6',
        'dark-text': '#2c3e2f',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
