<!-- Votre composant Vue -->
<template>
    <button class="btn" @click.prevent="addNewMarker">Balises</button>  
</template>

<script setup>
import {  toRefs } from 'vue';
import * as L from 'leaflet';
import { useGamesStore } from '@/stores/games';

const props = defineProps(['map']);
const { map } = toRefs(props);
const gamesStore = useGamesStore();

let weaponIndex = 1;

const customIconMarkers = L.icon({
  iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [10, -30],
});

const addNewMarker = () => {
  const center = map.value.getCenter();
  const newMarker = L.marker([center.lat, center.lng], {
    draggable: true,
    opacity: 1,
    icon: customIconMarkers,
  });

  newMarker.addTo(map.value);

  const markerData = {
    name: `Marker ${weaponIndex}`,
    marker: newMarker,
    position: { latitude: center.lat, longitude: center.lng },
  };

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';

  newMarker.bindPopup(deleteButton);

  deleteButton.addEventListener('click', (e) => {
  e.preventDefault();
  gamesStore.deleteMarker(markerData); // Utilisez markerData au lieu de newMarker
  map.value.removeLayer(newMarker);
});

  newMarker.on('dragend', () => {
    const newMarkerLatLng = newMarker.getLatLng();
    console.log(markerData.name + ' coordinates:', newMarkerLatLng.lat, newMarkerLatLng.lng);
    markerData.position = { latitude: newMarkerLatLng.lat, longitude: newMarkerLatLng.lng };
  });

  gamesStore.markers = [...gamesStore.markers, markerData];

  weaponIndex++;
};
</script>