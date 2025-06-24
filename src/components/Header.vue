<!-- Fichier Header.vue -->

<script setup>
const props = defineProps({
  cart: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <header>
    <div class="headerTop">
      <div class="container">
        <p>Essayez d'abord, <span>payez après</span></p>
        <p>Livraison & retour <span>gratuit</span></p>
        <p>Retour et <span>remboursement</span></p>
      </div>
    </div>

    <div class="headerBottom">
      <div class="container">
        <nav class="navMain">
          <a href="">Femme</a>
          <a href="">Homme</a>
          <a href="">Enfant</a>
        </nav>

        <img src="../assets/zalando.svg" alt="Logo Zalando" />

        <nav class="navIcon">
          <font-awesome-icon :icon="['far', 'user']" />
          <font-awesome-icon :icon="['far', 'heart']" />
          <font-awesome-icon :icon="['fas', 'shopping-bag']" />

          <!-- Pastille affichant le nombre d'article dans le panier -->
          <p class="num-of-product" v-if="cart.length > 0">{{ cart.length }}</p>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.headerTop {
  background-color: var(--light-grey);
}
.headerBottom {
  border-bottom: 1px solid #d0d1d3;
  height: var(--header-bottom-height);
}
.headerTop .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-top-height);
  color: var(--dark-grey);
  font-size: 12px;
}

.headerBottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-bottom-height);
}

nav {
  display: flex;
  gap: 10px;
  flex: 1;
  /* Bordure temporaire pour visualiser le bloc */
  /* border: 1px solid green; */
  justify-content: center;
}

nav.navMain {
  justify-content: flex-start;
}
nav.navIcon {
  justify-content: flex-end;
}

nav:last-of-type {
  justify-content: flex-end;
  position: relative; /* <==== 👈 ICI complément de style existant */
}

span {
  color: var(--main-orange);
}

img {
  width: 155px;
  cursor: pointer;
  /* border: solid 1px green; */
}

nav a {
  cursor: pointer;
  text-decoration: none;
  color: var(--main-black);
}
nav.navMain a {
  font-weight: bold;
  padding: 10px 15px;
}
nav.navMain a:first-child {
  background-color: var(--main-black);
  color: white;
}
svg {
  color: var(--main-black);
  padding: 10px;
  /* Pour éviter le décalage de l'icône au moment du survol de la souris, on définit une bordure
     de base. N'hésitez pas à commenter la propriété pour constater la différence */
  border: 2px solid white;
  /* Pour éviter que le padding décale l'icône dans une partie non visible, on doit exclure
     la marge interne et les bordures de la taille du SVG */
  box-sizing: content-box;
  cursor: pointer;
}

svg:hover {
  border: 2px solid var(--main-black);
}

.num-of-product {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: var(--main-orange);
  padding-top: 1px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
