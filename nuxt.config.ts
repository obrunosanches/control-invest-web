// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/styles/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@formkit/nuxt',
    '@pinia/nuxt',
  ],
  formkit: {
    autoImport: true,
    configFile: './formkit.config.ts'
  }
});
