import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      width: {
        available: [
          '100%',
          '-moz-available' /* WebKit-based browsers will ignore this. */,
          '-webkit-fill-available' /* Mozilla-based browsers will ignore this. */,
          'stretch',
        ],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    darkTheme: 'forest',
    themes: ['forest'],
  },
};
