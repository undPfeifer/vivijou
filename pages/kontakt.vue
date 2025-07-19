<template>
    <body>
        <section>
      <h1>Kontakt</h1>
      <div>
        <p>Email</p>
        <p class="geist" v-html="emailHtml"></p>
      </div>
      <div>
        <p>Telefon</p>
        <p class="geist" v-html="phoneHtml"></p>
      </div>
    </section>
    </body>
   
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Base64-encoded email and phone
  const encodedEmail = 'dml2aWFuZS5hbW1hbm5AZ214LmNo' // your email here
  const encodedPhone = 'MDc2NDE1ODA5Ng==' // ""
  
  // reactive HTML holders
  const emailHtml = ref('')
  const phoneHtml = ref('')
  
  // decode and create clickable links
  function decodeIt(encoded, type) {
    const decoded = atob(encoded)
    if (type === 'email') {
      emailHtml.value = `<a class="kontakt-link" href="mailto:${decoded}">${decoded}</a>`
    } else if (type === 'phone') {
      phoneHtml.value = `<a class="kontakt-link" href="tel:${decoded}">${decoded}</a>`
    }
  }
  
  // decode both
  decodeIt(encodedEmail, 'email')
  decodeIt(encodedPhone, 'phone')
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
  