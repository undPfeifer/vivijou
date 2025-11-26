<script setup lang="ts">
import { useRoute } from 'vue-router'
import LeadSection from '~/components/LeadSection.vue'
import { onMounted, nextTick, computed } from 'vue'




//---------PW PROTECTION//---------

                // Get the post ID from the URL
                const route = useRoute()

                // Fetch all tags so we can find the one with slug "pw"
                const { data: tags } = await useAsyncData('tags', () =>
                  $fetch('https://vuguxadu.myhostpoint.ch/wp-json/wp/v2/tags?per_page=100')
                )

                // Find the "pw" tag object
                const pwTag = computed(() => tags.value?.find(t => t.slug === 'pw'))

                // Determine if this post is protected (post.tags contains pwTag.id)
                const isProtected = computed(() =>
                  pwTag.value ? post.value?.tags?.includes(pwTag.value.id) : false
                )

                // Client-side password gate state
                const userPW = ref('')
                const isUnlocked = ref(false)
                const pwError = ref(false)

                // Set your desired password here (or fetch from ACF if you want)
                const correctPW = 'scheibenkleister'  // ← you can change this
                const handlePWSubmit = () => {
                  if (userPW.value === correctPW) {
                    isUnlocked.value = true
                    pwError.value = false
                  } else {
                    pwError.value = true
                  }
                }
//---------PW PROTECTION//---------








// Fetch post data from WordPress
const { data: post, pending, error } = await useAsyncData(
  `post-${route.params.id}`,
  () =>
    $fetch(
      `https://vuguxadu.myhostpoint.ch/wp-json/wp/v2/posts/${route.params.id}?_embed`
    )
)

// Fetch categories
const { data: categories, error: catError } = await useAsyncData('categories', () =>
  $fetch('https://vuguxadu.myhostpoint.ch/wp-json/wp/v2/categories?per_page=100')
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

<!-- Password Gate -->
<div v-if="isProtected && !isUnlocked" class="pw-gate">
  <h2>This post is protected</h2>
  <input
    v-model="userPW"
    type="password"
    placeholder="Enter password"
    class="pw-input"
  />
  <button @click="handlePWSubmit" class="pw-btn">Unlock</button>

  <p v-if="pwError" class="pw-error">Wrong password</p>
</div>

<!-- Real content (visible only when unlocked OR not protected) -->
<div v-else>
  <p>{{ post.categories.map(id => categories.find(c => c.id === id)?.name).join(', ') }}</p>
  <h1 v-html="title"></h1>

  <img v-if="featuredImage" :src="featuredImage" alt="Featured Image" />

  <LeadSection
    :text="leadMain"
    :sub="leadSub"
    :img="leadImage"
    :credits="creditsSub"
  />

  <div v-html="post.content.rendered" class="post-content main-text"></div>

  <NuxtLink to="/" class="back-link">← Back to posts</NuxtLink>
</div>

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


.pw-gate {
  max-width: 400px;
  padding: 20px;
  margin: 40px auto;
  text-align: center;
}

.pw-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}

.pw-btn {
  padding: 10px 20px;
  cursor: pointer;
}

.pw-error {
  margin-top: 10px;
  color: red;
}



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