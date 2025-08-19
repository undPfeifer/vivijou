<template>    
  <NuxtLink href="/"> <img src="/vivi-alex-illu-cutout.webp" alt="" class="logo"> </NuxtLink> 



  <NuxtLayout>
    <NuxtPage />
    <impressum />
  </NuxtLayout>

  <Analytics />

</template>

<script setup>

import { Analytics } from '@vercel/analytics/nuxt'


import { NuxtLink } from '#components'
const { data: posts, pending, error } = await useAsyncData('posts', () => usePosts())





  </script>

<style scoped>

li {
    width: fit-content;
}


  .footer--container{
    padding: 60px 10px;
    columns: 3;
  }

  .footer--container h1 {
    line-height: 1;
    margin-bottom: 12px;

    font-size: 24px;
    letter-spacing: 0px;
    
    
    
  }

  .logo {
    font-size: 40px;
    margin-top: 0px;
    width: 70px;
    background-color: transparent;
    transition: width 0.2s ease-out;
  }

  .logo:hover{
    width: 71px;
  }
</style>

<style>

.bottom-link {
  cursor: pointer;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.bottom-link:hover{
  opacity: 70%;
  transform: translateY(-2px);
}

.logo{
  position: fixed;
  right: 20px;
  top: 8px;
  z-index: 999;
  background-color: #ffffff;
  padding: 6px 6px;
}


ul {
  margin: 0px;
  padding: 0px;
  width: fit-content;

}

li {
  list-style:none;
  margin: 0px;
  padding: 0px;
  width: fit-content;
}
  p {
    max-width: 70ch;
    }

  a {
    text-decoration: none;
    color: black;
  }

  .router-link-active{
    color: green;
  }
</style>

<style>




:root {
  --green: #079210;
  --black: #ffffff;
  --bg: rgb(255, 255, 255);
}

a {
  text-decoration: none;
}

figcaption {
    display: block;
    unicode-bidi: isolate;
    font-family: 'geist-medium' , Arial, Helvetica, sans-serif !important; 
    font-weight: 500;
    font-size: 12px;
    margin-bottom: 30px;
    margin-top: -16px;
    line-height: 1.2;

}

  * {
    
    margin: 0px;
    padding: 0px;

    background-color: var(--bg);
    
    
    
    font-family: 'Times New Roman', Times, serif;
    font-weight: 500;
    letter-spacing: -0.3px;
    color: var(--green);

    cursor: url('/favicon.ico');
    
  }

  p {
    font-family: 'Times New Roman', Times, serif;
    font-size: 18px;
    line-height: 1.22;
    margin-bottom: 16px;
    break-inside: avoid;

  }

  .bold {
    font-weight: 600;
  }

  .times {
    font-family: 'Times New Roman', Times, serif;
  }


  img {
    max-width: 100%;
    object-fit: cover;
    border-radius: 3px;
  }

  .main-padding{
    padding: 20px;
  }

  .papa {
    display: flex;
    flex-direction: row;
    justify-content: center;
    
  }

  .content--container{
    max-width: 1100px;
  }



  h1 {
    font-size: 50px;
    line-height: 1;
    letter-spacing: -2px;

    margin-bottom: 20px;

  }

  h2 {
    font-size: 50px;
  }

  h3 {
    font-size: 32px;
  }

  h4.wp-block-heading {
    color: #000 !important;
  }

  .post-content.main-text img {
    margin: 20px 0px 20px 0px;
  }


  .wp-block-file{
    font-family: 'geist-medium' , Arial, Helvetica, sans-serif !important;
    width: fit-content;
    color: #079210 !important;

    padding-bottom: 1px;
    border-bottom: 2px solid var(--green);

    opacity: .75;


    display: flex;
    gap: 10px;

    box-sizing: content-box;
  }

  .wp-block-file a {
    color: #079210;
    font-family: 'geist-regular' , Arial, Helvetica, sans-serif; 

    font-size: 20px;

    line-height: 1.2;
    text-transform: lowercase;
  }



  .wp-block-file:hover{
    border-bottom: #079210 solid 2px;
padding-bottom: 1px;
    opacity: 1;
  }

  .wp-block-file__button.wp-element-button {
  }

  @media (max-width: 600px) {
    h1 {
    font-size: 40px !important;
    margin-bottom: 16px;
    } 
    
    .bottom-link {
      font-size: 20px !important;
    }
    
    .footer--container {
      columns: 1 !important;
      ;
    }
  }
  
  </style>
  
  