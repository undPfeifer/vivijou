<template>
  <div class="body">
    <div class="loading--container"></div>

    <div class="container">
      <section class="header--img_container">
        <!--    
          <img src="/storch_small.webp" alt="description" width="400" height="400" class="head-img" />
          -->

        <img
          src="/landing-w700.webp"
          alt="description"
          width="400"
          class="head-img"
        />

        <h1 class="title">
          Vivi Ammann <br />
          Journalismus <br />
          Portfolio
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
        <div v-for="post in posts" :key="post.id" class="post">
          <p class="eyebrow">
            {{
              post.categories
                .map((id) => categories.find((c) => c.id === id)?.name)
                .join(", ")
            }}
          </p>

          <NuxtLink :to="`/posts/${post.id}`">
            <h2 v-html="post.title.rendered"></h2>
          </NuxtLink>

          <div v-html="post.acf?.lead_main"></div>
          <!--   <div v-html="post.excerpt.rendered"></div>     -->

          <NuxtLink :to="`/posts/${post.id}`" class="no-button-link">
            mehr lesen
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "Vivi Ammann Portfolio",
  meta: [
    {
      name: "description",
      content: "Viviane Ammann Journalismus Portfolio , Zürich Schweiz",
    },
  ],
});

import { NuxtImg } from "#components";
import { ref, watchEffect, nextTick, onMounted } from "vue";

// Reactive states
const selectedTag = ref<null | number>(null); // null = all posts

// Fetch categories
const { data: categories, error: catError } = await useAsyncData(
  "categories",
  () =>
    $fetch(
      "https://vuguxadu.myhostpoint.ch/wp-json/wp/v2/categories?per_page=100",
    ),
);

// Fetch tags for filter buttons
const { data: tags, error: tagError } = await useAsyncData("tags", () =>
  $fetch("https://vuguxadu.myhostpoint.ch/wp-json/wp/v2/tags"),
);

// Reactive fetch for posts
const {
  data: posts,
  pending,
  error,
} = await useAsyncData(
  () => `posts-${selectedTag.value ?? "all"}`, // key depends on selectedTag
  () => {
    const baseUrl =
      "https://vuguxadu.myhostpoint.ch//wp-json/wp/v2/posts?per_page=100&_fields=id,title,acf,excerpt,tags,categories";
    return selectedTag.value
      ? $fetch(`${baseUrl}&tags=${selectedTag.value}`)
      : $fetch(baseUrl);
  },
  { watch: [selectedTag] }, // re-run when selectedTag changes
);

// Function to update selected tag
function filterPosts(tagId: number | null) {
  selectedTag.value = tagId;
}

// Function to animate posts
function postScrollAnimation(gsap: any, ScrollTrigger: any) {
  // 🧹 Clean up old triggers for posts
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger?.classList.contains("post")) {
      trigger.kill();
    }
  });

  // Add animations for visible posts
  document.querySelectorAll(".post").forEach((post) => {
    gsap.set(post, { y: 0, opacity: 1 });

    gsap.from(post, {
      scrollTrigger: {
        trigger: post,
        start: "top 96%",
        end: "top bottom-=110px",
        scrub: true,
        markers: false,
      },
      y: 25,
      opacity: 0,
    });
  });
}

onMounted(async () => {
  // Dynamically import GSAP & ScrollTrigger on client
  const { default: gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  // Animate header image & title
  const tl = gsap.timeline();

  tl.set([".title", ".head-img"], {
    visibility: "visible",
    scale: 1,
    y: 50,
    opacity: 0,
  })
    .to(".head-img", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
    })
    .to(
      ".title",
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
      },
      "-=0.25",
    ); // overlap animations slightly

  // Animate title & image on scroll
  gsap.fromTo(
    ".title",
    { y: 0, opacity: 1 },
    {
      scrollTrigger: {
        trigger: ".body",
        start: "top",
        end: "bottom",
        scrub: true,
        markers: false,
      },
      y: 600,
      opacity: 0,
    },
  );

  gsap.fromTo(
    ".head-img",
    { y: 0, opacity: 1 },
    {
      scrollTrigger: {
        trigger: ".body",
        start: "top",
        end: "bottom",
        scrub: true,
        markers: false,
      },
      y: 190,
      opacity: 1,
    },
  );

  postScrollAnimation(gsap, ScrollTrigger); // Run animations for initial posts

  // Watch posts and re-run animations on filter change
  watchEffect(() => {
    if (posts.value) {
      nextTick(() => {
        setTimeout(() => {
          postScrollAnimation(gsap, ScrollTrigger);
        }, 50);
      });
    }
  });
});
</script>

<style scoped>
.head-img,
.title {
  visibility: hidden;
}

.eyebrow {
  text-transform: lowercase;
  font-size: 13px;
  margin-bottom: -1px;
}

body {
  padding: 0px 0px 0px 0px;
}
</style>

<style>
.vivi--gif {
  position: fixed;
  z-index: 999999000;
  background: transparent;
  width: 200px;
}

h1.title {
  position: absolute;
  left: 0px;
  top: 20px;
  z-index: 98;
  font-size: clamp(30px, 12vw, 80px);
  font-family: "Geist", sans-serif;
  font-weight: 600;
  text-align: left;
  line-height: 0.9;
  background-color: transparent;
  max-width: 100%;
  width: 30ch;
  letter-spacing: -1px;
}

.header--img_container {
  position: relative;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px 0px 0px 0px;
  z-index: 99;
  height: 70vh;
  background-color: rgba(250, 235, 215, 0);
}

.head-img {
  padding: 0px 0px 0px 0px;
  position: absolute;
  bottom: 80px;

  z-index: 99;
  background-color: transparent;
}

.tag.active {
  color: var(--green);
  transition: 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 1;

  border-bottom: 2px solid;
}

.tag--container {
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 0px;
  border-bottom: 0px solid var(--green);
  position: relative;
  width: 300px;
  z-index: 999;
  text-transform: lowercase;
}

.tag {
  padding-bottom: 0px;

  width: fit-content;

  font-size: 15px;
  letter-spacing: 0px;
  font-family: "geist-regular";

  cursor: pointer;

  opacity: 0.5;

  transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.tag:hover {
  opacity: 75%;
}

.header--img {
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
  font-family: "Geist", sans-serif;

  letter-spacing: -1px;
}

h2 {
  font-family: "Geist", sans-serif;
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

.mehr-lesen {
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

.no-button-link:hover {
  border-bottom: 2px solid var(--green);
  margin-bottom: -1px;
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
    font-size: 14vw !important;
  }

  .header--img_container {
    margin-top: 0px;
    position: relative;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 60px 0px 0px 0px;
    z-index: 99;
    height: 60vh;
    background-color: rgba(250, 235, 215, 0);
  }

  .head-img {
    padding: 0px 0px 0px 0px;
    position: absolute;
    bottom: 60px;

    z-index: 99;
    background-color: transparent;
  }
}

@media (min-width: 1000px) and (max-height: 800px) {
  .header--img_container {
    margin-top: -30px;
    position: relative;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0px 0px 0px 0px;
    z-index: 99;
    height: 86vh;
    background-color: rgba(250, 235, 215, 0);
  }
  .head-img {
    padding: 0px 0px 40px 0px;
    position: absolute;
    bottom: 20px;

    z-index: 99;
    background-color: transparent;
  }
}
</style>
