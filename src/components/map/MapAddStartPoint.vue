<template>
    <button class="btn" @click.prevent="addNewStartPoint">Add Start Point</button>
</template>
 

  <script setup>
  import { ref, reactive, toRefs, defineProps } from 'vue';
  import * as L from 'leaflet';
  import { useGamesStore } from '@/stores/games';
  
  const props = defineProps(['map']);
  const { map } = toRefs(props);
  const gamesStore = useGamesStore(); // Import the store
  
  const startPoints = ref([]);
  let weaponIndex = 1;
  
  const customIconStartPoint = L.icon({
    iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
  });
  
  const addNewStartPoint = () => {
    if (startPoints.value.length === 0) {
      const center = map.value.getCenter();
      const newStartPoint = L.marker([center.lat, center.lng], {
        draggable: true,
        opacity: 1,
        icon: customIconStartPoint,
      });
  
      newStartPoint.addTo(map.value);
  
      const startPointData = reactive({
        name: `StartPoint ${weaponIndex}`,
        marker: newStartPoint,
        position: { latitude: center.lat, longitude: center.lng },
      });
  
      newStartPoint.on('dragend', () => {
        const newStartPointLatLng = newStartPoint.getLatLng();
        console.log(`StartPoint ${weaponIndex - 1} coordinates:`, newStartPointLatLng.lat, newStartPointLatLng.lng);
        startPointData.position = { latitude: newStartPointLatLng.lat, longitude: newStartPointLatLng.lng };
      });
  
      startPoints.value.push(startPointData);
      weaponIndex++;
  
      // Mettre à jour le startPoint dans le store
      gamesStore.updateStartPoint(startPointData);
    } else {
      alert('You can only add one StartPoint.');
    }
  };
  </script>
  