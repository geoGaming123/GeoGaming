<template>
  <section class="footer">
    <button @click="activateTab('past')" :class="{ footer_activebtn: activeTab === 'past' }">Finies</button>
    <button @click="activateTab('present')" :class="{ footer_activebtn: activeTab === 'present' }">En cours</button>
    <button @click="activateTab('futur')" :class="{ footer_activebtn: activeTab === 'futur' }">Futures</button>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['activateMenu'])

const activeTab = ref('present');

const activateTab = (tab) => {
  activeTab.value = tab;
  emit('activateMenu', tab)
};
</script>

<style scoped>

</style>