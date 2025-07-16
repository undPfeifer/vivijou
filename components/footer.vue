<template>
    <div class="footer--container">
        <div
          v-for="post in posts"
          :key="post.id"
          
        >
          <NuxtLink :to="`/posts/${post.id}`">
            <h1 v-html="post.title.rendered" class="bottom-link"></h1>

          </NuxtLink>
        </div>
</div>
</template>