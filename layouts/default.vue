<template>
    <header> 
  <nav>
      <ul>
          <li> <NuxtLink to="/"> artikel </NuxtLink></li>
          <li> <NuxtLink to="/about"> über mich </NuxtLink></li>
          <li> <NuxtLink to="/articles"> kontakt </NuxtLink></li>
      </ul>
  </nav>
</header>
    <slot />
</template>

<style scoped>
* {
    font-family: 'geist-medium';

    font-size: 13px;

}
    nav {
        position: relative;
        top: 20px;
        left: 20px;
        margin-bottom: 20px;
        width: fit-content;
    }

    li {
        cursor: pointer;
        font-weight: 300;
        color: var(--green);

    }

    ul {
        font-size: 20px;

    }

    li:hover {
        font-weight: 900;
        color: black;
        opacity: 70%;
    }

    ul {
        font-family: 'Times New Roman', Times, serif;

    }
</style>