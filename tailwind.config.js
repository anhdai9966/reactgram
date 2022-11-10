/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        visual: 'RefreshedLoadingBarProgress 2s linear infinite,LoadingBarEnter .5s ease-out forwards',
        spinner8Spins: 'SpinnerSpin .8s steps(8) infinite;',
        spinner12Spins: 'SpinnerSpin 1.2s steps(12) infinite;',
      },
      keyframes: {
        RefreshedLoadingBarProgress: {
          '0%': { backgroundPosition: '125% 0' },
          '100%': { backgroundPosition: '0% 0' },
        },
        LoadingBarEnter: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        SpinnerSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        visual: 'linear-gradient(to right, #ffd600, #ff7a00, #ff0169, #d300c5, #7638fa, #ffd600)',
      },
    },
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss.com/blob/ceb07ba4d7694ef48e108e66598a20ae31cced19/tailwind.config.js#L280-L284
    function ({ addVariant }) {
      addVariant(
        'supports-backdrop-blur',
        '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))',
      );
      addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)');
      addVariant('children', '& > *');
      addVariant('scrollbar', '&::-webkit-scrollbar');
      addVariant('scrollbar-track', '&::-webkit-scrollbar-track');
      addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb');
    },
  ],
}
