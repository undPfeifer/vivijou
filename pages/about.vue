<template>
    <div class="container"> 
        <section class="about--header">
        
            <h1>

über <br> 
mich

</h1>
        
        
            <img    
        src="/vivi-about-01_w800.webp" 
        alt="" 
        width="400" height="400" 
        class="head-img" 
        v-gsap.entrance.scale
        />

        



      </section>

      <p v-gsap.entrance.slide-bottom>
        Du seist gegrüsst! Ich bin Viviane (aber lieber Vivi) Ammann und studiere Kommunikation an der Zürcher Hochschule für angewandte Wissenschaften (ZHAW) mit der Vertiefung Journalismus. Meine neugier und unermüdliche Lust zum Schreiben liess mich 2023 meine Arbeit als Grafikerin niederlegen und in die Welt der geschriebenen Medien abtauchen. Besonders interessieren mich die kleinen, vermeintlich unwichtigen Geschichten, die Grosses über uns als Gesellschaft aussagen. Diese erzähle ich am liebsten in Form von Reportagen oder Porträts.
      </p>

    </div>

   
</template>

<script setup>


useHead({
  title: 'über mich' ,
  meta: [
    {name: 'description' , content: 'Alle relevanten Information über mich und meine Ausbildungen, Studium und Lebenslauf'}
  ]
})



    import gsap from 'gsap'
    import ScrollTrigger from 'gsap/ScrollTrigger'


    import {onMounted} from 'vue'

    
onMounted( () => {
    gsap.set('.title' , { opacity: 0 , y: 30} )
    gsap.to('.title' , {
        opacity: 1,
        y: -20,
        duration: 1,
    } 
        
    )
})


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
        width: 300px;
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
    font-family: 'geist-medium'  , Arial, Helvetica, sans-serif;;
    font-size: 16px;
  }
</style>
