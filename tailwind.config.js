module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      fontSize: {
        tiny: '.6875rem',
      },
    },
  },
  safelist: [
    {
      pattern: /./,
    },
  ],
  plugins: [
    require('postcss-import'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // require('daisyui'),
  ],
  darkMode: 'class',
};
