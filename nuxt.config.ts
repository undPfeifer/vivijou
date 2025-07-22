// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/devtools', '@nuxt/image', 'v-gsap-nuxt' , '@nuxtjs/google-fonts'] ,
  googleFonts: {
    families: {
      'Geist': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    } ,
  },


  css: [
    '~/assets/css/global.css',
    '@/assets/css/main.css'
  ] ,

  ssr: true,

  // target: 'static',  // remove this line

  app: {
    baseURL: '/vivijou/' , // repo name
    head : {
      
        title: 'Vivi Ammann Portfolio', // default fallback title
        htmlAttrs: {
          lang: 'de',
        }, 
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
    }
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