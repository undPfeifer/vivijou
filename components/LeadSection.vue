<script setup lang="ts">
defineProps<{
  text: string
  sub: string
  img: string
  credits: string
}>()
</script>

<template>
  <section>
    <div>
      <p>{{  text }}</p>
      <div class="row-two">
        <p class="small">{{ sub }}</p>
        <p class="small"> {{ credits }}</p>
        <!--    <img :src="img" alt="" />     --> 
      </div>
    </div>
  </section>
</template>


<style scoped>
    div {
        display: grid;
        grid-template-columns: 6fr 6fr;
        gap: 20px;
        margin-bottom: 00px;
        padding-bottom: 40px;
    }

    p {
        font-size: 24px;
        line-height: 1.1;
    }

    .small {
        font-family: 'geist-medium';
        font-size: 12px;
        line-height: 1.2;
        white-space: pre-line;

        
        
    }

    .row-two {
        display: grid;
        grid-template-columns: 8fr 4fr;
    }

    
    @media (max-width: 700px) {
  div {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .row-two {
    display: grid;
    grid-template-columns: 8fr 4fr;
    gap: 40px;
  }
}

</style>