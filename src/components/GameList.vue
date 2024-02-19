<template>
  <section class="gamelist-content">
  <section class="nav">
    <div class="nav-btns">
      <button @click="activateTab('created')" :class="{ activebtn: activeTab === 'created' }">Créées</button>
      <button @click="activateTab('joined')" :class="{ activebtn: activeTab === 'joined' }">Rejointes</button>
      <button @click="activateTab('available')" :class="{ activebtn: activeTab === 'available' , hidden: activeMenu != 'futur' }">Disponibles</button>
    </div>
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
      <tbody>
        <GameListItem v-for="(match, index) in MatchesData" :key="index" :index="index" :aMatch="match" v-show="activeTab === 'created'"></GameListItem>
        <GameListItem v-for="(match, index) in MatchesData" :key="index" :index="index" :aMatch="match" v-show="activeTab === 'joined'"></GameListItem>
        <GameListItem v-for="(match, index) in MatchesData" :key="index" :index="index" :aMatch="match" v-show="activeTab === 'available'"></GameListItem>
      </tbody>
    </table>
  </section>
  <button @click="addGame()" class="addgame" :class="{hidden: activeMenu == 'past'}" >+</button>
</section>
</template>

<script setup>
import GameListItem from '@/components/GameListItem.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  menu: String,
  MatchesData: Array // Tableau différent selon GameList actif
});

const activeTab = ref('created');
const activateTab = (tab) => { // Check l'onglet actif pour afficher liste de partie qui correspond
  activeTab.value = tab;
};

const activeMenu = ref(null);
watch(() => props.menu, (newMenu) => { // Récupère le menu actif pour l'affichage de l'onglet disponbible
  activeMenu.value = newMenu;
});

const addGame = () => {
  console.log('Add a Game');
  console.log("Tableau reçu : " + props.menu + " --- " + props.MatchesData)
  router.push('/gameform')
};
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