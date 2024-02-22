<template>
  <section class="gamelist-content">
    <section class="gamelist">
      <table>
        <thead v-if="title === 'past'">
          <tr class="gamelist-title">
            <th>Lieu</th>
            <th>Joueurs</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <thead v-if="title === 'present'">
          <tr class="gamelist-title">
            <th>Lieu</th>
            <th>Joueurs</th>
            <th>Temps restant</th>
          </tr>
        </thead>
        <thead v-if="title === 'futur'">
          <tr class="gamelist-title">
            <th>Lieu</th>
            <th>Joueurs</th>
            <th>Date - Heure de début</th>
          </tr>
        </thead>
        <GameListID :Matches="myMatches" :title="title" v-show="activeTab === 'created'"></GameListID>
        <GameListID :Matches="otherMatches" :title="title" v-show="activeTab === 'available'"></GameListID>
        <GameListID :Matches="joinedMatches" :title="title" v-show="activeTab === 'joined'"></GameListID>
      </table>
    </section>
    <section class="onglets">
      <div class="onglets-btns"> 
        <button @click="activateTab('created')" :class="{ activebtn: activeTab === 'created' }">Créées</button>
        <button @click="activateTab('available')" :class="{ activebtn: activeTab === 'available' , hidden: activeMenu != 'futur' }">Disponibles</button>
        <button @click="activateTab('joined')" :class="{ activebtn: activeTab === 'joined' }">Rejointes</button>
      </div>
    </section>
    <button @click="addGame()" class="addgame" :class="{hidden: activeMenu == 'past'}" >+</button>
  </section>
</template>

<script setup>
import GameListID from '@/components/GameListID.vue';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  menu: String,
  MatchesData: Array, // Tableau différent selon GameList actif
  title: String
});

const activeTab = ref('created');
const activateTab = (tab) => { // Check l'onglet actif pour afficher liste de partie qui correspond
  activeTab.value = tab;
};

const activeMenu = ref(null);
watch(() => props.menu, (newMenu) => { // Récupère le menu actif pour l'affichage de l'onglet disponbible
  activeMenu.value = newMenu;
});

const myID = 9
const myMatches = computed(()=>(props.MatchesData.filter(match => match.acf.masteruid == myID)))
const joinedMatches = computed(()=>(props.MatchesData.filter(match => match.acf.players.some(player => player.userId == myID))))
const otherMatches = computed(()=>(props.MatchesData.filter(match => {return match.acf.masteruid != myID && !match.acf.players.some(player => player.userId == myID)})))

const addGame = () => { // Fonction du bouton "+"
  console.log('Add a Game');
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
  .onglets {
    width: 100%;
    justify-content: space-between;
  }
  .onglets-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .onglets-btns button {
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
  .gamelist-title {
    border-bottom: 1px solid #00D1C5;
    width: 100%;
    font-size: .8rem;
  }
  .gamelist-title th {
    padding-block: .5rem;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  .gamelist {
    display: flex;
    width: 100%;
    border: 1px solid #00D1C5;
    height: calc(100vh - 120px - 59px);
    align-items: start;
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