// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      }, {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      }, {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap'
      }]
    }
  },
  css: ['~/assets/styles/main.css'],
  formkit: {
    autoImport: true,
    configFile: './formkit.config.ts'
  },
  modules: [
    '@formkit/nuxt',
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
});
