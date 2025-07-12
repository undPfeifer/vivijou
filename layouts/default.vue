<template>
    <header> 
  <nav>
      <ul>
          <li> <NuxtLink to="/"> home </NuxtLink></li>
          <li> <NuxtLink to="/articles"> articles </NuxtLink></li>
          <li> <NuxtLink to="/about"> about </NuxtLink></li>
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