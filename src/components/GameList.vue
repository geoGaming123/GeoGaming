<template>
  <section class="gamelist-content">
  <section class="nav">
    <div class="nav-btns">
      <button @click="activateTab('created')" :class="{ activebtn: activeTab === 'created' }">Créées</button>
      <button @click="activateTab('available')" :class="{ activebtn: activeTab === 'available' , hidden: activeMenu != 'futur' }">Disponibles</button>
      <button @click="activateTab('joined')" :class="{ activebtn: activeTab === 'joined' }">Rejointes</button>
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
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: start;
  }
  .nav {
    width: 100%;
    justify-content: space-between;
  }
  .nav-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .nav-btns button {
    width: 30%;
    height: 25px;
    padding-block: .2rem;
    margin-inline-end: .2rem;
    margin-block-start: .2rem;
    margin-block-end: .2rem;
    border: 1px solid #f1f1f190;
    background-color: #f1f1f1;
    font-weight: bold;
  }
  .activebtn {
    background-color: orange !important;
    border: orange !important;
    margin-block-end: 0 !important;
    color: white;
    position: relative;
    height: 32px !important;
    
  }
  .gamelist {
    display: flex;
    width: 100%;
    background-color: rgba(255, 166, 0, 0.333);
    border: 1px solid orange;
    height: calc(100vh - 120px - 59px);
    align-items: start;
  }
  .gamelist-title {
    border-bottom: 1px solid orange;
    font-size: 1.5rem;
    width: 100%;
  }
  .gamelist-title th {
    padding-block: .5rem;
  }
  table {
    border-collapse: collapse;
    width: 100%;
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