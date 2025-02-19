// @ts-check
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import awsAmplify from 'astro-aws-amplify';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()]
  },
  integrations: [react()],
  adapter: awsAmplify(),
  output: 'server',
});