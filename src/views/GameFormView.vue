<template>
  <div class='gameform'>
    <h1>Créer une partie</h1>
    <form @submit.prevent="submitForm">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="gamesStore.formData.title" required>

      <label for="description">Description:</label>
      <textarea id="description" v-model="gamesStore.formData.description" required></textarea>

      <label>Date de début:</label>
      <input type="datetime-local" v-model="gamesStore.formData.startDate" required>

      <label>Date de fin:</label>
      <input type="datetime-local" v-model="gamesStore.formData.endDate" required>

      <label>Location:</label>
      <MapForm :searchBarVisible="true" :startPointVisible="true" :markersVisible="true"></MapForm>

      <button type="submit" class="btn submit">Submit</button>
    </form>  
  </div>
</template>

<script setup>
import { useGamesStore } from '@/stores/games';
import MapForm from '@/components/map/MapForm.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const gamesStore = useGamesStore();
const submitForm = () => {
  // Vérifier si une balise et un startPoint sont présents
  if (!gamesStore.startPoint || !gamesStore.markers) {
    alert('Veuillez sélectionner une balise et un startPoint.');
    return;
  }

  // Sauvegarder les données dans le localStorage
  gamesStore.postMatchData();

  // Afficher une alerte
  alert('votre partie à été enregistré');
  router.go(-1);

  // Réinitialiser le formulaire
  gamesStore.formData = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startPoint: gamesStore.formData.startPoint,
  };
};
</script>
  
  <style>

.gameform{
  margin: 20px;
}
form {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0.4em;
}

 .btn{
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  background-color: #00D1C5;
  color: white;
  cursor: pointer;
}
.btn:hover{
  opacity: 0.7;
}

input , textarea{
  background-color: #FAFAFA; 
  border: #EEEEEE solid 1px;
  border-radius: 8px;
  padding: 0.4em 1.2em;
}

#map{
  width: 100%;
}
.submit{
  background-color: #43BE6E;
}
</style>
