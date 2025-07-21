<template>
  <body>
    
    <div class="container">
      <section class="header--img_container">
        <!--    
          <img src="/storch_small.webp" alt="description" width="400" height="400" class="head-img" />
          --> 
          
          <img src="/vivi-alex-illu h800.webp" alt="description" width="400" height="600" class="head-img" />

        
        <h1 class="title">
          Vivi Ammann <br />
          Journalismus <br> Portfolio
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
import { ref, watchEffect, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
// 🆕 Moved outside onMounted for reuse
function postScrollAnimation() {
  // Only run on client side
  if (!process.client) return
  
  // 🧹 Clean up old triggers for posts
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger?.classList.contains('post')) {
      trigger.kill()
    }
  })

  // Add animations for visible posts
  document.querySelectorAll('.post').forEach((post) => {
    // Ensure posts are visible by default
    gsap.set(post, { y: 0, opacity: 1 })
    
    gsap.from(post, {
      scrollTrigger: {
        trigger: post,         // each post triggers its own animation
        start: 'top 96%',      // animate when top of post hits 96% viewport
        end: 'top bottom-=110px',
        scrub: true,
        markers: false         // set to true if you want to debug
      },
      y: 25,
      opacity: 0,
    });
    console.log('z')
  });
}

onMounted(() => {
  // Only run on client side
  if (!process.client) return
  
  const tl = gsap.timeline()

  tl.set(['.title', '.head-img'], { scale: 1, y: 50, opacity: 0 }) // instant set
    .to('.head-img', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5
    })
    .to('.title', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.4
    }, "-=0.25") // starts 0.25s before .head-img finishes

  gsap.fromTo('.title', 
    { y: 0, opacity: 1 }, // from values
    {
      scrollTrigger: {
        trigger: 'body',
        start: 'top',
        end: 'bottom',
        scrub: true,
        markers: false
      },
      y: 400,
      opacity: 0
    }
  )

  gsap.fromTo('.head-img',
    { y: 0, opacity: 1 }, // from values  
    {
      scrollTrigger: {
        trigger: 'body',
        start: 'top',
        end: 'bottom',
        scrub: true,
        markers: false
      },
      y: 140,
      opacity: 0.6
    }
  )

  postScrollAnimation() // Run animations for initial posts
})

// 🆕 Watch posts and run animations *after DOM updates*
watchEffect(() => {
  if (posts.value && process.client) {
    nextTick(() => {
      // Add a small delay to ensure DOM is fully rendered
      setTimeout(() => {
        postScrollAnimation() // Run animations for new/filtered posts
        console.log('x')
      }, 50)
    })
  }
})

</script>


  
<style scoped>





  .eyebrow {
    font-size: 13px;
    margin-bottom: 4px;
  }

  body {
    padding: 0px 0px 0px 0px;
  }
</style>

<style>



.header--img_container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  padding: 100px 0px 10px 0px;
  z-index: 99;
}

.head-img {
  padding: 20px 0px 40px 0px;
  position: relative;
  z-index: 99;
  background-color: transparent;

}

.head-img_div{
  background-color: rgba(234, 245, 248, 0);
  width: 400px;
  height: 200px;

  border-radius: 100%;
}

.tag.active {
  color: var(--green);
  transition: 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  opacity: 1;

  border-bottom: 2px solid;

}

.tag--container {
  margin-top: -20px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 0px;
  border-bottom: 0px solid var(--green);
  position: relative;
  width: 300px;
  z-index: 999;
  
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
    font-family: 'geist-medium' , Arial, Helvetica, sans-serif;
  }

  h1.title {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 98;
    font-size: 70px;
    font-family: 'geist-semibold'  , Arial, Helvetica, sans-serif;
    text-align: left;
    line-height: 0.9;
    background-color: transparent;
    max-width: 100%;
    width: 30ch;

  }

  h2 {
    font-family: 'geist-medium' , Arial, Helvetica, sans-serif;
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

h1.title {
    position: absolute;
    left: 0px;
    top: 20px;
    z-index: 98;
    font-size: 12vw !important;

    


  }

  .header--img_container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 140px 0px 0px 0px;
  z-index: 99;
}

.head-img {
  padding: 0px 0px 40px 0px;
  position: relative;
  z-index: 99;
  background-color: transparent;

}

  }
</style>
  