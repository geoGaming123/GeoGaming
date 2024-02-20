<template>
  <section class="gamelist-content">
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
          <GameListID :Matches="myMatches" v-show="activeTab === 'created'"></GameListID>
          <GameListID :Matches="otherMatches" v-show="activeTab === 'available'"></GameListID>
          <GameListID :Matches="joinedMatches" v-show="activeTab === 'joined'"></GameListID>
      </table>
    </section>
    <button @click="addGame()" class="addgame" :class="{hidden: activeMenu == 'past'}" >+</button>
    <section class="nav">
      <div class="nav-btns"> 
        <button @click="activateTab('created')" :class="{ activebtn: activeTab === 'created' }">Créées</button>
        <button @click="activateTab('available')" :class="{ activebtn: activeTab === 'available' , hidden: activeMenu != 'futur' }">Disponibles</button>
        <button @click="activateTab('joined')" :class="{ activebtn: activeTab === 'joined' }">Rejointes</button>
      </div>
    </section>
  </section>
</template>

<script setup>
import GameListID from '@/components/GameListID.vue';
import { computed, ref, watch } from 'vue';
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

const myID = 1
const myMatches = computed(()=>(props.MatchesData.filter(match => match.acf.masteruid == myID)))
const joinedMatches = computed(()=>(props.MatchesData.filter(match => match.acf.players.some(player => player.userId == myID))))
const otherMatches = computed(()=>(props.MatchesData.filter(match => {return match.acf.masteruid != myID && !match.acf.players.some(player => player.userId == myID)})))

const addGame = () => { // Fonction du bouton "+"
/*
  console.log('Add a Game');
  router.push('/gameform')
*/
  console.log("all : " + props.MatchesData)
  console.log("mine : " + myMatches)
  console.log("notMine : " + joinedMatches)
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
    background-color: #00D1C5 !important;
    border: #00D1C5 !important;
    margin-block-end: 0 !important;
    color: white;
    position: relative;
    height: 32px !important;
    
  }
  .gamelist {
    display: flex;
    width: 100%;
    border: 1px solid #00D1C5;
    height: calc(100vh - 120px - 59px);
    align-items: start;
  }
  .gamelist-title {
    border-bottom: 1px solid #00D1C5;
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
    background-color: #00D1C5;
    border: 1px solid #00D1C5;
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