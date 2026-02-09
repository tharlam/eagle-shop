import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // Removed /serverless

export default defineConfig({
  output: 'server', // This enables Server-Side Rendering (SSR)
  adapter: vercel(), // This connects your project to Vercel's brain
});