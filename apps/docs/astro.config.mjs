import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import daisyui from 'daisyui';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), react()],
  site: 'https://yanickrochon.github.io',
  base: process.env.BASE_PATH,
});
