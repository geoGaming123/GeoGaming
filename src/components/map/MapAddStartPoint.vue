<template>
  <button class="btn" @click.prevent="addNewStartPoint" :disabled="startPointsExist">Point de départ</button>
</template>

<script setup>
import { ref, reactive, toRefs, defineProps, computed } from 'vue';
import * as L from 'leaflet';
import { useGamesStore } from '@/stores/games';

const props = defineProps(['map']);
const { map } = toRefs(props);
const gamesStore = useGamesStore(); // Importer le store

const startPoint = ref(null);
let weaponIndex = 1;

const customIconStartPoint = L.icon({
  iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

const startPointsExist = computed(() => {
  return gamesStore.startPoint !== null;
});

const addNewStartPoint = () => {
  if (!startPointsExist.value) {
    const center = map.value.getCenter();
    const newStartPoint = L.marker([center.lat, center.lng], {
      draggable: true,
      opacity: 1,
      icon: customIconStartPoint,
    });

    newStartPoint.addTo(map.value);

    const startPointData = reactive({
      name: `Point de départ ${weaponIndex}`,
      marker: newStartPoint,
      position: { latitude: center.lat, longitude: center.lng },
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';

    newStartPoint.bindPopup(deleteButton);
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      map.value.removeLayer(newStartPoint);
      gamesStore.deleteStartPoint(startPointData);
    });

    newStartPoint.on('dragend', () => {
      const newStartPointLatLng = newStartPoint.getLatLng();
      console.log(`Coordonnées du point de départ ${weaponIndex - 1}:`, newStartPointLatLng.lat, newStartPointLatLng.lng);
      startPointData.position = { latitude: newStartPointLatLng.lat, longitude: newStartPointLatLng.lng };
    });

    startPoint.value = startPointData;
    weaponIndex++;

    // Mettre à jour le point de départ dans le store
    gamesStore.updateStartPoint(startPointData);
  } else {
    alert('Vous ne pouvez ajouter qu\'un seul point de départ.');
  }
};

</script>
<style>:disabled{
  background-color: grey;
}</style>
