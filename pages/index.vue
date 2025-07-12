<template>
    <div class="container">
        <img src="public/ammann_viviane_auftrag2_ps_bild05_150ppi-1.jpg" alt="" class="header--img">
        <h1>Vivi Ammann <br>
        Journalismus Portfolio
        </h1>
  
      <div v-if="error" class="error">
        Failed to load posts.
      </div>
  
      <div v-else-if="pending" class="loading">
        Loading posts...
      </div>
  
      <div v-else class="all-posts">
        <div
          v-for="post in posts"
          :key="post.id"
          class="post"
        >
          <h2 v-html="post.title.rendered"></h2>
          <div v-html="post.excerpt.rendered"></div>
          <NuxtLink :to="`/posts/${post.id}`" class="no-button-link">mehr lesen</NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

import { NuxtLink } from '#components'
const { data: posts, pending, error } = await useAsyncData('posts', () => usePosts())


  </script>
  
<style>

.header--img{
    height: 60vh;
    width: 100%;
    object-fit: cover;
    margin-bottom: 20px;
}

.all-posts {
    columns: 2;
}
    .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0px 20px;

  }
  
  h1 {
    font-size: 40px;
    font-family: 'geist-medium';
  }

  h2 {
    font-family: 'Times New Roman', Times, serif;
    font-weight: 600;
  }
  
  .post {
    border-bottom: 1px solid var(--green);
    height: fit-content;
    break-inside: avoid-column;
    
    padding: 20px 0px 16px 0px;
  }
  
  .post h2 {
    font-size: 1.1rem;
    margin: 0 0 0.5rem;
  }
  
  .post a {
    display: inline-block;
    margin-top: 0.5rem;
    color: var(--green);
    text-decoration: none;
  }
  

  
  .loading {
    text-align: center;
    color: gray;
  }
  
  .error {
    text-align: center;
    color: red;
  }

  .mehr-lesen{
    font-size: 13px;
    text-decoration: 2px solid black;
    background-color: rgb(216, 236, 214);
    padding: 6px 10px;
    transition: 0.9s cubic-bezier(0.075, 0.82, 0.165, 1);
    border-radius: 3px;
  }

  .mehr-lesen:hover {
    opacity: 70%;
    text-decoration: 0px;
    border-radius: 8px;

  }

  .no-button-link {
    font-size: 13px;
    border-bottom: 1px solid var(--green);

  }

  .no-button-link:hover{
    border-bottom: 2px solid var(--green);
    margin-bottom: -1PX;
  }
</style>
  