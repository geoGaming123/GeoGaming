<template>
      <HeaderComp  profile="profile"></HeaderComp>
  <div class='gameform'>
    <h1>Créer une partie</h1>
    <form @submit.prevent="submitForm">
      <label for="title">Titre :</label>
      <input type="text" id="title" v-model="gamesStore.formData.title" required />

      <label for="description">Description :</label>
      <textarea id="description" v-model="gamesStore.formData.description" required></textarea>

      <label>Date de début :</label>
      <input type="datetime-local" v-model="gamesStore.formData.startDate" required />

      <label>Date de fin :</label>
      <input type="datetime-local" v-model="gamesStore.formData.endDate" required />

      <label>Location :</label>
      <MapForm :searchBarVisible="true" :startPointVisible="true" :markersVisible="true"></MapForm>

      <button type="submit" class="green">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { useGamesStore } from '@/stores/games';
import MapForm from '@/components/map/MapForm.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gamesStore = useGamesStore();

const submitForm = () => {
  // Vérifier si une balise et un startPoint sont présents
  if (!gamesStore.startPoint || !gamesStore.markers) {
    alert('Veuillez sélectionner une balise et un startPoint.');
    return;
  }

  // Vérifier si la date de début est avant la date de fin
  const startDate = new Date(gamesStore.formData.startDate);
  const endDate = new Date(gamesStore.formData.endDate);

  if (startDate >= endDate) {
    alert('La date de début doit être avant la date de fin.');
    return;
  }

  // Sauvegarder les données dans le localStorage
  gamesStore.postMatchData();

  // Afficher une alerte
  alert('Votre partie a été enregistrée.');
  router.go(-1);

  // Réinitialiser le formulaire
  gamesStore.formData = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startPoint: gamesStore.formData.startPoint
  };
};
</script>