// @ts-check
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';
import awsAmplify from 'astro-aws-amplify';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: awsAmplify(),
  output: 'server'
});