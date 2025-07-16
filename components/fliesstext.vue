<script setup lang="ts">
defineProps<{
  main: string
  sub: string
}>()
</script>

<template>
  <section>
    <p>
      <span class="bold times">{{ main }}</span> {{ sub }}
    </p>
  </section>
</template>


<style scoped> 
    p {
        columns: 2;
    }


    @media (max-width: 700px) {
        p {
            columns: 1;
        }   
    }
</style>