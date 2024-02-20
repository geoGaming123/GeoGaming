<template>
  <div class="container">

    <form @submit.prevent="submitForm">
        <label for="title">Title:</label>

        <input type="text" id="title" v-model=" match.acf.title " >

  
        <label for="description">Description:</label>
        <textarea id="description" v-model="match.acf.description"> </textarea>
  
        <label>Date de début:</label>
        <input type="datetime-local" v-model="match.acf.start_date">
  
        <label>Date de fin:</label>
        <input type="datetime-local" v-model="match.acf.end_date">
  
        <label>Location:</label>
        <div id="map"></div>
        <MapAddMarkers :map="map"></MapAddMarkers>
        <MapAddStartPoint :map="map"></MapAddStartPoint>

        <button type="submit">Submit</button>
      </form>  




  </div>
</template>

<script setup>
import { useGamesStore } from '@/stores/games'
import { onMounted, computed, ref } from 'vue'
import * as L from 'leaflet'

import { useGeoSearchControl } from './MapSearchControl.vue';
  import MapAddMarkers from './MapAddMarkers.vue';
  import MapAddStartPoint from './MapAddStartPoint.vue'


const gamesStore = useGamesStore()
const matchId = 335

const map = ref(null);

gamesStore.getMatch(matchId)

const match = computed(() => {
  return gamesStore.oneMatch
})


const submitForm = () => {
    console.log("test");
  
    // Sauvegarder les données dans le localStorage
    gamesStore.patchMatchData();
  
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


onMounted(()=>{

  const startPoint = (match.value.acf.start_point);
  const markers = (match.value.acf.markers)
  console.log(match.value.acf.start_date)

const latitude = startPoint.position.latitude
const longitude = startPoint.position.longitude

  const map = L.map('map', {
    center: [latitude, longitude],
    zoom: 15,
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
  })

  map.whenReady(() => {

    markers.forEach((marker) => {
          const { latitude, longitude } = marker.position
          const markerIcon = L.icon({
            iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
            iconSize: [50, 50],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30]
          })
          L.marker([latitude, longitude], { icon: markerIcon })
            .addTo(map)
            .bindPopup(`<b>${marker.name}</b>`)
        })
       
        const startPointIcon = L.icon({
          iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
          iconSize: [50, 50],
          iconAnchor: [12, 41],
          popupAnchor: [0, -30]
        })
        L.marker([latitude, longitude], { icon: startPointIcon })
          .addTo(map)
          .bindPopup('<b>Start Point</b>')
      })


      const { searchControl } = useGeoSearchControl(map);
})
  

</script>

