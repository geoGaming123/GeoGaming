<template>
  <section class="nav">
    <button @click="activateNav('present')" :class="{ nav_activebtn: activeNav === 'present' }">
      Partie<br />En cours
    </button>
    <button class="nav-center" @click="activateNav('futur')" :class="{ nav_activebtn: activeNav === 'futur' }">
      Partie<br />Futures
    </button>
    <button @click="activateNav('past')" :class="{ nav_activebtn: activeNav === 'past' }">
      Partie<br />Finies
    </button>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['activateNav']) //Définis l'évènement à émettre
const activeNav = ref('present')
const activateNav = (tab) => {
  activeNav.value = tab // Valeur à émettre selon menu actif
  emit('activateNav', tab)
}
</script>

<style scoped></style>
