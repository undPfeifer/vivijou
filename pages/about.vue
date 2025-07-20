<template>
    <div class="container"> 
        <section class="header--img_container">
        <img    
        src="/_XT40162.JPG" 
        alt="description" 
        width="400" height="400" 
        class="head-img" 
        v-gsap.entrance.scale
        />

        
        <h1 class="title">
           <br />
          <span>Grüezi</span>  Hallo Salut <br>
          ich bin vivi <span> <br> Grafikerin</span> <br>
          <span v-gsap.entrance.slide-left >journalistin</span>
          
        </h1>


      </section>

      <p v-gsap.entrance.slide-bottom>Grüeziwohl! Mein Name ist Viviane (aber lieber Vivi) Ammann, ich bin Grafikerin aus Zürich und wandle seit 1998 auf dieser Welt. Meine dreht sich um Gestalten, Kaffeetrinken und die Suche nach dem Sinn des Lebens – Grafik kommt da schon nahe ran, sie fordert mich, macht mir den Alltag spannend und erfüllt mich mit Zufriedenheit. 
Meine Kompetenzen liegen im grafischen, digitalen, sowie im illustrativen und fotografischen Bereich und ich bin stets damit beschäftigt, meine Fähigkeiten zu erweitern. Als Grafikerin gross geworden bin ich in einem kleinen Atelier, dabei lernte ich gutes Teamwork schätzen aber auch eigenständig zu arbeiten und Verantwortung zu übernehmen. Projekte kann ich von der Ideenfindung bis hin zum Druckauftrag begleiten.
Ich freue mich über jegliche Nachrichten oder Aufträge und sämtliche Hallos! Lg, Vivi</p>

    </div>

   
</template>

<script setup>
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
        font-size: 40px !important;
        margin-bottom: 0px;
        position: relative;
        z-index: 10000;
    }
</style>
