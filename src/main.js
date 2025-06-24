import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Import de FontAwesome Core
import { library } from '@fortawesome/fontawesome-svg-core'

// Import du composant vue-fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* Import de l'icône sac de shopping, coeur, sac de shopping, étoile pleine et étoile à moitié pleine */
import { faShoppingBag, faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons'

/* Import des icônes coeur et user */
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'

// Ajout des icônes à la bibliothèque
library.add(faUser, faHeart, faShoppingBag, faStarHalfAlt, faStar)

// Prévient l'instance Vue.js quelle va utiliser le composant vue-fontawesome
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
