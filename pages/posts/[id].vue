<script setup lang="ts">
import { useRoute } from 'vue-router'
import LeadSection from '~/components/LeadSection.vue'
import { onMounted, nextTick, computed } from 'vue'



// Get the post ID from the URL
const route = useRoute()

// Fetch post data from WordPress
const { data: post, pending, error } = await useAsyncData(
  `post-${route.params.id}`,
  () =>
    $fetch(
      `https://federilo.myhostpoint.ch/wp-json/wp/v2/posts/${route.params.id}?_embed`
    )
)

// Fetch categories
const { data: categories, error: catError } = await useAsyncData('categories', () =>
  $fetch('https://federilo.myhostpoint.ch/wp-json/wp/v2/categories?per_page=100')
)

// Computed fields from ACF and post
const title = computed(() => post.value?.title.rendered ?? 'No Title')
const featuredImage = computed(() =>
  post.value?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? ''
)
const leadMain = computed(() => post.value?.acf?.lead_main ?? 'Default lead main')
const leadSub = computed(() => post.value?.acf?.lead_sub ?? 'Default lead sub')
const leadImage = computed(() => post.value?.acf?.lead_image?.url ?? featuredImage.value)
const creditsSub = computed(() => post.value?.acf?.credits ?? 'vivi ammann')


// SEO
useSeoMeta({
  title: () => `${title.value} | vivijou`,
  ogTitle: () => `${title.value} | vivijou`,
  description: () => `${leadMain.value} | vivijou`,
  ogDescription: () => `${leadMain.value} | vivijou`,
  ogImage: () => `${featuredImage.value}`,
  twitterCard: 'summary_large_image',
})


// Animate images on scroll using GSAP (client only)
onMounted(async () => {
  if (process.client) {
    const gsapModule = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    const gsap = gsapModule.default
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    document.querySelectorAll('img').forEach((img) => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'top 92%',
          toggleActions: 'play none none reverse',
          scrub: false,
          markers: false
        },
        opacity: 0,
        duration: 0.2,
        y: 50,
      })
    })
  }
})
</script>


<template>

  <section class="main-padding papa">
    <div class="content--container">
      <div v-if="error" class="error">Failed to load post.</div>
      <div v-else-if="pending" class="loading">Loading post...</div>
      <div v-else>
        <!-- Post Title -->
         <p> {{ post.categories.map(id => categories.find(c => c.id === id)?.name).join(', ') }} </p>
        <h1 v-html="title"></h1>

        <!-- metadata -->
        <img v-if="featuredImage" :src="featuredImage" alt="Featured Image" />

        <!-- Lead Section -->
        <LeadSection
          :text="leadMain"
          :sub="leadSub"
          :img="leadImage"
          :credits="creditsSub"
        />

        <!-- Main Post Content -->
        <div v-html="post.content.rendered" class="post-content main-text"></div>

        <!-- Back link -->
        <NuxtLink to="/" class="back-link">← Back to posts</NuxtLink>
      </div>
    </div>
  </section>
</template>



<style scoped>

figure.wp-element-caption{
  font-family: Arial, Helvetica, sans-serif;
  color: blue;
}



* {
}

p {
  margin-bottom: 20px;
}

    img {
        margin-bottom: 36px;
        max-width: 100%;
    }

    .post-content p {
  margin-bottom: 0px; /* sorgt für klaren Abstand */

}

    .post-content {
        margin-top: 0rem;
        line-height: 1.6;
        font-size: 1rem;


      }

    .back-link {
        display: inline-block;
        margin-top: 2rem;
        color: var(--green);
        text-decoration: none;

    }

    .back-link:hover {
    text-decoration: underline;
    }

    .loading {
        text-align: center;
        color: rgb(150, 150, 150);
    }

    .error {
    text-align: center;
    color: red;
    }





</style>

<style scoped> 

h4.wp-block-heading{
    color: blue;
}

h1 {
    font-size: 80px;
    text-align: left;
    max-width: 800px;
}
    p {
        columns: 2;
        break-inside: avoid;

    }

    .main-text {
        columns: 2;
        break-inside: avoid;


    }




    @media (max-width: 700px) {
        .main-text {
            columns: 1;
        }   
    }
</style>