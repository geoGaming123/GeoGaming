<template>
  <section class="footer">
    <button @click="activateTab('past')" :class="{ activebtn: activeTab === 'past' }">Finies</button>
    <button @click="activateTab('present')" :class="{ activebtn: activeTab === 'present' }">En cours</button>
    <button @click="activateTab('futur')" :class="{ activebtn: activeTab === 'futur' }">Futures</button>
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
.footer {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  justify-content: space-evenly;
  background-color: #f1f1f1;
}
button {
  width: 33%;
  border: 1px solid #f1f1f1;
  background-color: #f1f1f1;
  color: black;
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
}
.activebtn {
  background-color: orange;
  color: white;
  border: 1px solid orange;
}


</style>