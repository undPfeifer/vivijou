<template>
    <div class="container"> 
        <section class="about--header">
        
            <h1>

about <br> 
mü

</h1>
        
        
            <img    
        src="/vivi-about-01_w800.webp" 
        alt="" 
        width="400" height="400" 
        class="head-img" 
        v-gsap.entrance.scale
        />

        



      </section>

      <p v-gsap.entrance.slide-bottom>Grüeziwohl! Mein Name ist Viviane (aber lieber Vivi) Ammann, ich bin Grafikerin aus Zürich und wandle seit 1998 auf dieser Welt. Meine dreht sich um Gestalten, Kaffeetrinken und die Suche nach dem Sinn des Lebens – Grafik kommt da schon nahe ran, sie fordert mich, macht mir den Alltag spannend und erfüllt mich mit Zufriedenheit. 
Meine Kompetenzen liegen im grafischen, digitalen, sowie im illustrativen und fotografischen Bereich und ich bin stets damit beschäftigt, meine Fähigkeiten zu erweitern. Als Grafikerin gross geworden bin ich in einem kleinen Atelier, dabei lernte ich gutes Teamwork schätzen aber auch eigenständig zu arbeiten und Verantwortung zu übernehmen. Projekte kann ich von der Ideenfindung bis hin zum Druckauftrag begleiten.
Ich freue mich über jegliche Nachrichten oder Aufträge und sämtliche Hallos! Lg, Vivi</p>

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
        margin-bottom: 0px;
        position: absolute;
        z-index: 10000;
        left: -40px;
        top: 40px;
    }
</style>
