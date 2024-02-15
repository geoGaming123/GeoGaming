<template>
  <section class="gamelist-content">
  <section class="nav">
    <div class="nav-btns">
      <button @click="activateTab('created')" :class="{ activebtn: activeTab === 'created' }">Créées</button>
      <button @click="activateTab('joined')" :class="{ activebtn: activeTab === 'joined' }">Rejointes</button>
      <button @click="activateTab('available')" :class="{ activebtn: activeTab === 'available' , hidden: activeMenu != 'futur' }">Disponibles</button>
    </div>
    <SearchBar></SearchBar>
  </section>
  <section class="gamelist">
    <table>
      <thead>
        <tr class="gamelist-title">
          <th>#</th>
          <th>Lieu</th>
          <th>Joueurs</th>
          <th>Date</th>
        </tr>
      </thead>
      <GameListItem data="créées" v-show="activeTab === 'created'"></GameListItem>
      <GameListItem data="rejointes" v-show="activeTab === 'joined'"></GameListItem>
      <GameListItem data="dispos" v-show="activeTab === 'available'"></GameListItem>
    </table>
  </section>
  <button @click="addGame()" class="addgame">+</button>
</section>
</template>

<script setup>
import GameListItem from '@/components/GameListItem.vue';
import SearchBar from './SearchBar.vue';
import { ref, defineProps, onMounted, watch } from 'vue';

const props = defineProps({
  menu: String
});

const activeTab = ref('created');
const activeMenu = ref(null);

const activateTab = (tab) => {
  activeTab.value = tab;
};

const addGame = () => {
  console.log('Add a Game');
};

watch(() => props.menu, (newMenu) => {
  activeMenu.value = newMenu;
});
</script>

<style scoped>
.gamelist-content {
  padding-inline: 2rem;
}
  .nav {
    display: flex;
    padding-block-start: 1rem;
    padding-block-end: .2rem;
    justify-content: space-between;
  }
  .nav-btns button {
    padding: .2rem;
    margin-inline-end: .2rem;
    border: 1px solid #f1f1f190;
    background-color: #f1f1f1;
    font-weight: bold;
  }
  .activebtn {
    background-color: orange !important;
    border: none !important;
    color: white;
    position: relative;
    top: .3rem;
  }
  .gamelist-title {
    border-top: 1px solid orange;
    border-bottom: 1px solid black;
    font-size: 1.5rem;
  }
  .gamelist-title th {
    padding-inline: 1rem;
    padding-block: .2rem;
  }
  table {
    border-collapse: collapse;
  }
  .gamelist-item th {
    padding: .4rem;
  }
  .addgame {
    width: 3rem;
    height: 3rem;
    background-color: orange;
    border: 1px solid orange;
    border-radius: 50%;
    font-size: 1.5rem;
    position: absolute;
    bottom: 5rem;
    right: 1rem;
  }
  .hidden {
    display: none;
  }
</style>