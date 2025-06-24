<script setup>
// Import de la fonction reactive
import { reactive, ref } from 'vue'

// Import des components
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Details from './components/Details.vue'

// Import du fichier JSON contenant les informations relatives au produit
import data from './assets/data.json'

// Création de l'objet réactif
const productInfo = reactive(data)

// Création de l'objet réactif de la première variante
const selectedVariant = ref(data.variants[2]) // 👈 Nouvelle valeur réactive

// On ajoute l'écouteur d'événement

// Fontion déclenchée lorsque l'événement est entendu. Elle permet de changer la valeur de la ref 'selectedVariant'
const changeVariant = (variant) => {
  selectedVariant.value = variant
}

const cart = reactive([])
const addToCart = (product) => {
  cart.push(product)
  // console.log(product)
}
</script>

<template>
  <Header :cart="cart" />
  <main>
    <!-- Wrapper -->
    <div class="container">
      <!-- Première colonne -->
      <div>
        <img :src="selectedVariant.image.url" :alt="selectedVariant.image.alt" />
      </div>

      <Details
        :productInfo="productInfo"
        :selectedVariant="selectedVariant"
        @changeSelectedVariant="changeVariant"
        @addProductToCart="addToCart"
      />
    </div>
  </main>
  <Footer />
</template>

<style scoped>
.container {
  display: flex;
  height: calc(
    100vh - var(--header-top-height) - var(--header-bottom-height) - var(--footer-height)
  );
}

.container > div {
  width: 50%;
  /* Bordure temporaire pour visualiser le bloc */
  /* border: 1px solid green; */
}

.container > div:last-child {
  padding: 25px 0 25px 100px;
}
.container > div:first-child {
  padding: 25px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
