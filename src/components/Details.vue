<!-- Fichier Details.vue -->

<script setup>
const props = defineProps({
  productInfo: {
    type: Object,
    required: true,
  },
  selectedVariant: {
    type: Object,
    required: true,
  },
})

const isVariantSoldOut = (sizes) => {
  //  La boucle 'for in' permet de boucler sur un objet et d'avoir accés aux noms des clés et aux valeurs de celui-ci
  for (const key in sizes) {
    if (sizes[key] > 0) {
      return false
    }
  }

  return true
}

// On déclare les évènement
const emit = defineEmits({
  changeSelectedVariant: null,
  addProductToCart: (product) => {
    // Si le payload existe et que c'est un objet
    if (product && typeof product === 'object') {
      // L'événement est validé
      return true
    } else {
      // Ajout d'un warning (en plus de celui automatiquement déclenché par Vue.js) pour fournir un complément d'information sur la raison pour laquelle l'événement n'est pas valide
      console.warn('Payload is required and must be an object')
      // L'événement n'est pas validé
      return false
    }
  },
})

// On emet l'évènement
const handleEmitNewVariant = (variant) => {
  // Réutilisation de la fonction 'isVariantSoldOut' pour savoir si la version du produit est en rupture de stock
  const isSoldOut = isVariantSoldOut(variant.sizes)

  // Si la version n'est pas en rupture de stock l'événement est émis, sinon rien
  if (!isSoldOut) {
    emit('changeSelectedVariant', variant)
  }
}

// On emet l'évènement
const handleSelectSize = (size, quantity) => {
  // Copie de l'objet 'selectedVariant'
  const newObj = { ...props.selectedVariant }
  //                👆 Pour rappel, voici la syntaxe pour accéder aux props dans la balise '<script>'
  if (quantity !== 0) {
    // Ajout de la clé
    newObj.selectedSize = size

    // Emission de l'événement
    emit('changeSelectedVariant', newObj)
  }
}

// On emet l'évènement
const handleAddToCart = () => {
  if (!props.selectedVariant.selectedSize) {
    // Aucune taille n'est sélectionnée donc l'utilisateur est alerté
    alert('Veuillez sélectionner une taille !')
  } else {
    // Une taille est sélectionnée donc l'événement est émit
    emit('addProductToCart', props.selectedVariant)
  }
}
</script>

<template>
  <!-- Deuxième colonne -->
  <div>
    <h2>{{ productInfo.brand }}</h2>

    <h1>{{ productInfo.name }}</h1>

    <p>{{ productInfo.price }} € <span>TVA incluse</span></p>

    <div class="rate">
      <font-awesome-icon :icon="['fas', 'star']" size="lg" />
      <font-awesome-icon :icon="['fas', 'star']" size="lg" />
      <font-awesome-icon :icon="['fas', 'star']" size="lg" />
      <font-awesome-icon :icon="['fas', 'star']" size="lg" />
      <font-awesome-icon :icon="['fas', 'star-half-alt']" size="lg" />

      <span>{{ productInfo.rate }}</span>
    </div>

    <p>
      Couleur : <span class="selectedColor">{{ selectedVariant.color }}</span>
    </p>

    <div class="img-bloc">
      <img
        v-for="variant in productInfo.variants"
        :key="variant.id"
        :src="variant.image.url"
        :alt="variant.image.alt"
        :class="{
          selectedImg: selectedVariant.id === variant.id,
          outOfStock: isVariantSoldOut(variant.sizes),
        }"
        @click="handleEmitNewVariant(variant)"
      />
    </div>

    <p class="advise">
      Nous vous recommandons de choisir une taille au-dessus de celle habituelle.
    </p>

    <div class="sizes-bloc">
      <div
        v-for="(quantity, size) in selectedVariant.sizes"
        :key="size"
        :class="{ outOfStock: quantity === 0, selectedSize: size === selectedVariant.selectedSize }"
        @click="handleSelectSize(size, quantity)"
      >
        {{ size }}
      </div>
    </div>

    <div class="cart-bloc">
      <button @click="handleAddToCart">Ajouter au panier</button>

      <div>
        <font-awesome-icon :icon="['far', 'heart']" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* La balise 'p' se trouvant immediatement après la balise 'h1' */
h1 + p {
  font-size: 22px;
}

h1 + p span {
  color: #66676e;
  font-size: 14px;
  font-weight: lighter;
}

p {
  margin-bottom: 25px;
}

.rate {
  margin-bottom: 40px;
}
.rate svg {
  margin-right: 3px;
}
.advise {
  background-color: #efeff0;
  padding: 20px;
  font-size: 14px;
  line-height: 20px;
  font-weight: lighter;
  margin-bottom: 10px;
}
.cart-bloc {
  display: flex;
  gap: 10px;
}

.cart-bloc button {
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  background-color: var(--main-black);
  color: white;
  flex: 1;
  border: none;
  cursor: pointer;
}

.cart-bloc button:hover {
  opacity: 0.7;
}

.cart-bloc div {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--main-black);
  color: var(--main-black);
}

.cart-bloc div:hover {
  border-width: 3px;
}

.cart-bloc svg {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.sizes-bloc {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.sizes-bloc > div {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 40px;
  height: 40px;

  cursor: pointer;
}

.sizes-bloc .selectedSize {
  /* On écrase la propriété définie initialement */
  border-width: 2px;
}

:is(.sizes-bloc, .img-bloc) .outOfStock {
  opacity: 0.3;
  cursor: auto;
}

.img-bloc {
  margin: 10px 0;
  display: flex;
  gap: 10px;
}

img {
  width: 120px;
  height: auto;
  object-fit: cover;
  cursor: pointer;
}

.selectedImg {
  /* 👈 Classe définie ici */
  border: 4px solid black;
}
</style>
