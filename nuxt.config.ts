// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/devtools', '@nuxt/image', 'v-gsap-nuxt'],

  css: [
    '~/assets/css/global.css',
    '@/assets/css/main.css'
  ] ,

  ssr: true,

  // target: 'static',  // remove this line

  app: {
    baseURL: '/vivijou/' , // repo name
   
      //pageTransition: {
        //name: 'slide',
        //mode: 'out-in' // wait for old page to leave
      //}
  },

  nitro: {
    preset: 'vercel'  // changed to 'vercel'
  },

  image: {
    // Use static images instead of runtime optimizer
    provider: 'static'
  }
})