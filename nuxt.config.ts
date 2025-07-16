// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content' ,
    '@nuxt/devtools' ,
    '@nuxt/image' 

  ] ,

  css: ['~/assets/css/global.css'] ,

  ssr: true,
  target: 'static',
  app: {
    baseURL: '/vivijou/', // 👈 Add this line
  },

})