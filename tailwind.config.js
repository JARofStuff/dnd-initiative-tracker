module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /./,
    },
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // require('daisyui'),
  ],
  // daisyui: {
  //   themes: ['fantasy', 'night'],
  // },
  darkMode: 'class',
};
