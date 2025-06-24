<!-- Fichier Footer.vue -->

<!-- Aucun JavaScript n'est nécessaire donc la balise '<script>' peut être retirée -->

<template>
  <footer>
    <p>Made by <a href="https://www.lereacteur.io/" target="_blank">Le Reacteur</a></p>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--footer-height);
}
a {
  text-decoration: none;
  font-weight: bold;
  color: var(--main-orange);
}
</style>
