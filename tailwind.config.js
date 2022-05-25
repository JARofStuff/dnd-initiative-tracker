module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace'],
    },
    extend: {
      fontSize: {
        tiny: '.6875rem',
      },
      zIndex: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
        1000: '1000',
      },
      backgroundImage: {
        checkmark: "url('public/checkmark.svg')",
        gradient: 'linear-gradient(130deg, #ef34ae 0%, #213885 70%, #4ebaf7 120%)',
        'gradient-dark': 'linear-gradient(130deg, #fe40bb 0%, #febcf7 50%, #73ddf8 70%)',
      },
      fill: {
        gradient: 'url(#mainGradient)',
        'gradient-dark': 'url(#darkGradient)',
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
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('daisyui'),
  ],
  darkMode: 'class',
};
