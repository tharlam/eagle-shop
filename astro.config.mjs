export default defineConfig({
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never', // Add this line
});