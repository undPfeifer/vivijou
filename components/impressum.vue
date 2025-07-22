<template>
  <section>
    <div>
      <!--  <p class="bold">impressum</p>  --> 
      <p>inhalte <span>✑</span> viviane ammann</p>
      <p>  ✶   </p>
      <p>webdesign <span>☞</span> <a href="https://www.undpfeifer.ch"> &pfeifer</a></p>
    </div>

  </section>
  
</template>

<style scoped>

* {
  transform: scale(1);
}

section {
  padding: 20px;
}

span {
  font-size: 24px;
  vertical-align: middle; /* aligns symbol with text */

}

p {
    font-size: 12px;
    font-family: 'geist-regular';
}

div {
  position: relative;
  bottom: 0px;
  padding: 100px 0px 0px 0px;

  display: flex;
  gap: 12px;

  justify-content: center;
  align-items: center;

  
}

.bold {
  font-family: 'geist-medium';
  font-size: 24px;
}

a {
  
  font-style: italic;
  font-size: 14px;
  font-weight: bold;
}

</style>