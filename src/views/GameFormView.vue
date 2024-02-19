<template>
    <div>
      <form @submit.prevent="submitForm">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="gamesStore.formData.title">
  
        <label for="description">Description:</label>
        <textarea id="description" v-model="gamesStore.formData.description"></textarea>
  
        <label>Date de début:</label>
        <input type="datetime-local" v-model="gamesStore.formData.startDate">
  
        <label>Date de fin:</label>
        <input type="datetime-local" v-model="gamesStore.formData.endDate">
  
        <label>Location:</label>
        <MapForm :searchBarVisible="true" :startPointVisible="true" :markersVisible="true"></MapForm>
  
        <button type="submit">Submit</button>
      </form>  
    </div>
  
  </template>
  
  <script setup>
  import { useGamesStore } from '@/stores/games';
import MapForm from '@/components/map/MapForm.vue';
  
  
  const gamesStore = useGamesStore();
  
  const submitForm = () => {
    console.log("test");
  
    // Sauvegarder les données dans le localStorage
    gamesStore.postMatchData();
  
    // Afficher une alerte
    alert('Données sauvegardées dans le localStorage.');
  
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
  form {
    display: flex;
    flex-direction: column;
  }
  </style>