<template>
  <div class="container">
    <section class="about--header">
      <h1>
        über <br />
        mich
      </h1>

      <img
        :src="imgSrc"
        alt=""
        width="400px"
        class="head-img"
        v-gsap.entrance.scale
        @mousemove="updateImage"
        @mouseleave="resetImage"
      />
    </section>

    <p v-gsap.entrance.slide-bottom>
      Mein Name ist Vivi Ammann, ich bin Grafikerin und angehende Journalistin
      aus Zürich. Das Schreiben sehe ich als natürliche Progression meiner
      Tätigkeit als Gestalterin und hoffe, diese beiden Bereiche in Zukunft
      beruflich verbinden zu können. Als frischgebackene Absolventin des
      Bachelorstudiengangs Kommunikation mit Vertiefung Journalismus an der ZHAW
      bin ich auf der Suche nach einer Möglichkeit, mir im Rahmen einer
      Festanstellung oder eines Praktikums die Seele aus dem Leib zu schreiben
      oder mich im Video- oder Audiobereich journalistisch zu verwirklichen. Ich
      interessiere mich für praktisch alles auf dem Antlitz der Erde, oft sind
      es die vermeintlich kleinen Geschichten, die Grosses über uns als
      Gesellschaft erzählen und die mich wirklich packen. Ich freue mich über
      jedes Hallo!
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

useHead({
  title: "über mich",
  meta: [
    {
      name: "description",
      content:
        "Alle relevanten Information über mich und meine Ausbildungen, Studium und Lebenslauf. Viviane Ammann Grafikerin und Journalistin Zürich",
    },
  ],
});

// Array of images for hover-scrub effect
const images = [
  "/portrait-600px.webp",
  "/vivi-about-01_w800.webp",
  "/google.png",
  "/storch_small.webp",
  "/vivi-about-800-2.webp",
]; // add as many as you like

const imgSrc = ref(images[0]);

// Update image based on mouse X position
const updateImage = (event) => {
  const img = event.currentTarget;
  const rect = img.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const index = Math.floor((x / rect.width) * images.length);
  imgSrc.value = images[Math.min(index, images.length - 1)];
};

// Reset to first image on mouse leave
const resetImage = () => {
  imgSrc.value = images[0];
};

onMounted(() => {
  gsap.set(".title", { opacity: 0, y: 30 });
  gsap.to(".title", {
    opacity: 1,
    y: -20,
    duration: 1,
  });
});
</script>

<style scoped>
.about--header {
  position: relative;
  width: 100%;
  padding: 30px 0px 0px 0px;
  height: 440px;

  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  padding: 30px 20px;
}

p {
  columns: 2;
  width: 100% !important;
  max-width: 100%;
}

img {
  margin-top: 20px;
  max-width: 400px;
  z-index: 1;
}

h1 {
  background-color: transparent;

  position: absolute;
  left: 10px;
  margin-bottom: 0px;
  z-index: 10000;
  top: 40px;
}

.geist {
  font-family: "geist-medium", Arial, Helvetica, sans-serif;
  font-size: 16px;
}

@media (max-width: 600px) {
  p {
    columns: 1;
  }
}
</style>
