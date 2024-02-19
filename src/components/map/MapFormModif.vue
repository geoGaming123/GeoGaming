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
  
        <div>
      <div class="map-container" id="map"></div>
      <div v-if="markersVisible">
        <MapAddMarkers :map="map"></MapAddMarkers>
      </div>
      <div v-if="startPointVisible">
        <MapAddStartPoint :map="map"></MapAddStartPoint>
      </div>
    </div>
        <button type="submit">Submit</button>
      </form>  
    </div>


  </template>
  
  <script setup>
  import { onMounted, ref, computed } from 'vue';
  import * as L from 'leaflet';
  import { useGeoSearchControl } from './MapSearchControl.vue';
  import MapAddMarkers from './MapAddMarkers.vue';
  import MapAddStartPoint from './MapAddStartPoint.vue';
  import { useGamesStore } from '@/stores/games';

  
  
  const gamesStore = useGamesStore()
const matchId = 325


gamesStore.getMatch(matchId)

const info = computed(() => {
  return gamesStore.oneMatch
})
console.log(info)
  const submitForm = () => {
    // Afficher une alerte
    alert('Données modifié');
  
    // Réinitialiser le formulaire
    gamesStore.formData = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startPoint: gamesStore.formData.startPoint,
    };
  };
  
  onMounted(() => {
    const startPoint = JSON.parse(info.value.acf.start_point);
    console.log("test")
  console.log(info)





    const map = L.map('map', {
    center: [latitude, longitude],
    zoom: 15,
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
  })
  


      // ADD SEARCH BAR
      const { searchControl } = useGeoSearchControl(map.value);

  });
  </script>
  
  <style>
  #map {
    width: 100vw;
    height: 45vh;
  }
  </style>



