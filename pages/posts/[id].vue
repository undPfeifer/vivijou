<script setup lang="ts">
import { useRoute } from 'vue-router'
import LeadSection from '~/components/LeadSection.vue'

// Get the post ID from the URL
const route = useRoute()

// Fetch the post data from WP REST API
const { data: post, pending, error } = await useAsyncData(
  `post-${route.params.id}`,
  () =>
  $fetch(
  `https://acidehov.myhostpoint.ch/wp-json/wp/v2/posts/${route.params.id}?_embed`
)
)


// Get the title, featured image, and custom fields
const title = computed(() => post.value?.title.rendered ?? 'No Title')
const featuredImage = computed(() =>
  post.value?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? ''
)
const leadMain = computed(() => post.value?.acf?.lead_main ?? 'Default lead main')
const leadSub = computed(() => post.value?.acf?.lead_sub ?? 'Default lead sub')
const leadImage = computed(() => post.value?.acf?.lead_image?.url ?? featuredImage.value) // use ACF or fallback
</script>

<template>
  <section class="main-padding papa">
    <div class="content--container">
      <div v-if="error" class="error">Failed to load post.</div>
      <div v-else-if="pending" class="loading">Loading post...</div>
      <div v-else>
        <!-- Post Title -->
        <h1 v-html="title"></h1>

        <!-- replace mit metadata -->
        <img v-if="featuredImage" :src="featuredImage" alt="Featured Image" />

        <!-- Lead Section -->
        <LeadSection
          :text="leadMain"
          :sub="leadSub"
          :img="leadImage"
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

* {
}



    img {
        margin-bottom: 36px;
        max-width: 100%;
    }

    .post-content {
        margin-top: 2rem;
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
    }

    .main-text {
        columns: 2;
    }


    @media (max-width: 700px) {
        .main-text {
            columns: 1;
        }   
    }
</style>