<template>
    <body>
      <div class="container"> 

        <section>
      <h1 class="kontakttitle">Kontakt</h1>

        <img src="/kontakt.webp" alt="">

      <div>
        <p>Email</p>
        <p class="geist" v-html="emailHtml"></p>
      </div>
      <div>
        <p>Telefon</p>
        <p class="geist" v-html="phoneHtml"></p>
      </div>
    </section>
    </div>
    </body>
   
  </template>
  
  <script setup>


useHead({
  title: 'kontakt' ,
  meta: [
    {name: 'description' , content: 'Kontaktseite mit Telefonnummer und Email , Viviane Ammann , Journalismus Studentin ZHAW Zürich'}
  ]
})



  import { ref } from 'vue'


  // --------------------------HIDE FROM BOTS--------------------------

          const encodedEmail = 'dml2aWFuZS5hbW1hbm5AZ214LmNo' // your email here
          const encodedPhone = 'MDc2NDE1ODA5Ng==' // ""
          
          // reactive HTML holders
          const emailHtml = ref('')
          const phoneHtml = ref('')
          
          // decode and create clickable links
          function decodeIt(encoded, type) {
            const decoded = atob(encoded)
            if (type === 'email') {
              emailHtml.value = `<a class="kontakt-link" href="mailto:${decoded}"> ${decoded}</a>`
            } else if (type === 'phone') {
              phoneHtml.value = `<a class="kontakt-link" href="tel:${decoded}"> ${decoded}</a>`
            }
          }
          
          // decode both
          decodeIt(encodedEmail, 'email')
          decodeIt(encodedPhone, 'phone')





  // --------------------------GSAP--------------------------

  import gsap from 'gsap'
    import ScrollTrigger from 'gsap/ScrollTrigger'


    import {onMounted} from 'vue'

    
onMounted( () => {
    gsap.set('.kontakttitle' , { opacity: 0 , y: 30} )
    gsap.to('.kontakttitle' , {
        opacity: 1,
        y: -20,
        duration: 1,
    } 
        
    )
})




  </script>
  
  <style>
  .kontakt-link {
    font-family: 'geist-medium' ,  Arial, Helvetica, sans-serif;;
    font-size: 16px;
    border-bottom: 2px solid var(--green);
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
  .kontakt-link:hover {
    border-bottom: 3px solid black;
    color: black;
  }
  </style>
  
  <style scoped>
  section {
    padding: 20px;
  }
  
  .geist {
    font-family: 'geist-medium'  , Arial, Helvetica, sans-serif;;
    font-size: 16px;
  }
  
  div {
    margin-bottom: 6px;
  }

  body {
    min-height: 100vh;
  }
  </style>
  