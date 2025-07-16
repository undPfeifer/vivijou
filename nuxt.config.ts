// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/devtools' ,
    '@nuxt/image' 

  ] ,

  css: ['~/assets/css/global.css'] ,

  ssr: true,
  target: 'static',

  app: {
    baseURL: '/vivijou/' // repo name
  },
  nitro: {
    preset: 'static'
  },
  image: {
    // Use static images instead of runtime optimizer
    provider: 'static'
  }

})