<template>
  <div class="container">
    <h2>{{ gamesStore.formData.title }}</h2>
    <p>{{ gamesStore.formData.description }}</p>
    <p>Start Date: {{ gamesStore.formData.startDate }}</p>
    <p>End Date: {{ gamesStore.formData.endDate }}</p>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as L from 'leaflet';
import { useGamesStore } from '@/stores/games';

const gamesStore = useGamesStore();

onMounted(() => {
  // Charger les données depuis le localStorage de manière asynchrone
  gamesStore.loadFromLocalStorage();

  // Utiliser les coordonnées du startPoint comme centre initial de la carte
  if (gamesStore.startPoint) {
    const { latitude, longitude } = gamesStore.startPoint.position;

    // Initialiser une nouvelle carte sans utiliser les props
    const map = L.map('map', {
      center: [latitude, longitude],
      zoom: 15,
      layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
    });

    // Ajouter des marqueurs pour les données stockées une fois que la carte est prête
    map.whenReady(() => {
      gamesStore.markers.forEach(marker => {
        const { latitude, longitude } = marker.position;
        const markerIcon = L.icon({
          iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
          iconSize: [50, 50],
          iconAnchor: [12, 41],
          popupAnchor: [0, -30],
        });
        L.marker([latitude, longitude], { icon: markerIcon }).addTo(map).bindPopup(`<b>${marker.name}</b>`);
      });

      // Ajouter un marqueur pour le startPoint
      const startPointIcon = L.icon({
        iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -30],
      });
      L.marker([latitude, longitude], { icon: startPointIcon }).addTo(map).bindPopup('<b>Start Point</b>');

      // Ajouter la géolocalisation
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Mettre à jour la position du joueur dans le store
            gamesStore.updateUserPosition({ latitude, longitude });
          },
          (error) => {
            console.error('Erreur de géolocalisation :', error.message);
          },
          {
            enableHighAccuracy: true, // Activer une haute précision de la géolocalisation
            maximumAge: 0, // Ne pas utiliser de position mise en cache
          }
        );
      } else {
        console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      }
    });
  }
});
</script>

