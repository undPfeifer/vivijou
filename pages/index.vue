<template>
  <body>
    
    <div class="container">
      <section class="header--img_container">
        <img src="/_XT40162.JPG" alt="description" width="400" height="400" class="head-img" />

        
        <h1 class="title">
          Vivi Ammann <br />
          Journalismus Portfolio
        </h1>

      </section>
    





    <!-- Tags Filter -->


    <!-- Posts -->

    <div class="tag--container">
      <p
        class="tag"
        :class="{ active: selectedTag === null }"
        @click="filterPosts(null)"
      >
        alle
      </p>
      <p
        v-for="tag in tags"
        :key="tag.id"
        :class="['tag', { active: selectedTag === tag.id }]"
        @click="filterPosts(tag.id)"
      >
        {{ tag.name }}
      </p>

    </div>


    <div v-if="error" class="error">Failed to load posts.</div>

    <div v-else-if="pending" class="loading"></div>

    <div v-else class="all-posts">





      <div
        v-for="post in posts"
        :key="post.id"
        class="post"
      >
      <p class="eyebrow">
  {{ post.categories.map(id => categories.find(c => c.id === id)?.name).join(', ') }}
</p>

        <h2 v-html="post.title.rendered"></h2>
        
        <div v-html="post.acf?.lead_main"></div>
      <!--   <div v-html="post.excerpt.rendered"></div>     -->  

        <NuxtLink
          :to="`/posts/${post.id}`"
          class="no-button-link"
        >
          mehr lesen
        </NuxtLink>
      </div>
    </div>
  </div>
  
  </body>


  
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
import { ref, watchEffect } from 'vue'

const { data: categories, error: catError } = await useAsyncData('categories', () =>
  $fetch('https://acidehov.myhostpoint.ch/wp-json/wp/v2/categories?per_page=100')
)


const selectedTag = ref<null | number>(null) // null = all posts

// Fetch tags for filter buttons
const { data: tags, error: tagError } = await useAsyncData('tags', () =>
  $fetch('https://acidehov.myhostpoint.ch/wp-json/wp/v2/tags')
)

// Reactive fetch for posts
const { data: posts, pending, error } = await useAsyncData(
  () => `posts-${selectedTag.value ?? 'all'}`, // key depends on selectedTag
  () => {
    const baseUrl = 'https://acidehov.myhostpoint.ch/wp-json/wp/v2/posts?_embed&per_page=100'
    return selectedTag.value
      ? $fetch(`${baseUrl}&tags=${selectedTag.value}`)
      : $fetch(baseUrl)
  },
  { watch: [selectedTag] } // re-run when selectedTag changes
)

// Function to update selected tag
function filterPosts(tagId: number | null) {
  selectedTag.value = tagId
}

</script>
  
<style scoped>
  .eyebrow {
    font-size: 13px;
    margin-bottom: 4px;
  }

  body {
    padding: 0px 0px 80px 0px;
  }
</style>

<style>



.header--img_container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
  padding: 120px 0px 30px 0px;
}

.head-img {
  padding: 0px 0px 40px 0px;
}

.tag.active {
  color: var(--green);
  transition: 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  opacity: 1;

  border-bottom: 2px solid;

}

.tag--container {
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 0px solid var(--green);
}

.tag {

  padding-bottom: 0px;

  width: fit-content;

  font-size: 15px;
  letter-spacing: 0px;
  font-family: 'geist-regular';

  cursor: pointer;

  opacity: 0.5;

  transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.tag:hover{
  opacity: 75%;
}

.header--img{
    height: 60vh;
    width: 100%;
    object-fit: cover;
    margin-bottom: 20px;
}

.all-posts {
    columns: 2;
    min-height: 800px;
}

.loading {
    text-align: left;
    color: var(--green);
    min-height: 800px;

  }
  
  .error {
    text-align: center;
    color: red;
  }


    .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0px 20px;

  }
  
  h1 {
    font-size: 80px;
    font-family: 'geist-medium';
  }

  h1.title {
    position: absolute;
    left: 20px;
    top: 50px;
    z-index: 99;
    font-size: 60px;
    font-family: 'geist-medium';
    text-align: left;
    background-color: transparent;
    max-width: 10ch;
  }

  h2 {
    font-family: 'geist-medium';
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


  @media (max-width: 600px) {
    .all-posts {
    columns: 1;
}
  }
</style>
  