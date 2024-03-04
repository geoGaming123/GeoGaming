<template>
  <button class="btn" @click.prevent="addNewMarker">Balises</button>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'
import * as L from 'leaflet'
import { useGamesStore } from '@/stores/games'

const props = defineProps(['map'])
const { map } = toRefs(props)
const gamesStore = useGamesStore()

let weaponIndex = 1
const switcher = ref(true)
const messageDisplayed = ref(false)
const markerRef = ref(null)

const customIconMarkers = L.icon({
  iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [10, -30]
})

const showPopup = (marker, message) => {
  marker.bindPopup(message).openPopup();
}

const showDeletePopup = (marker, markerData) => {
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';

  marker.bindPopup(deleteButton);

  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    map.value.removeLayer(marker);
    gamesStore.deleteMarker(markerData);
    switcher.value = false;
  });
}

const showPopupWithMessage = (marker, markerData, message) => {
  showPopup(marker, message);

  setTimeout(() => {
    marker.closePopup();
    messageDisplayed.value = true; // Marquer que le message a été affiché
    // Afficher le bouton Delete pour chaque nouvelle balise après les 2 secondes
    showDeletePopup(marker, markerData);
  }, 2000);
};

const addNewMarker = () => {
  const center = map.value.getCenter();
  const newMarker = L.marker([center.lat, center.lng], {
    draggable: true,
    opacity: 1,
    icon: customIconMarkers
  });

  newMarker.addTo(map.value);

  const markerData = {
    name: `Marker ${weaponIndex}`,
    marker: newMarker,
    position: { latitude: center.lat, longitude: center.lng }
  };

  newMarker.on('dragend', () => {
    const newMarkerLatLng = newMarker.getLatLng();
    console.log(markerData.name + ' coordinates:', newMarkerLatLng.lat, newMarkerLatLng.lng);
    markerData.position = { latitude: newMarkerLatLng.lat, longitude: newMarkerLatLng.lng };
  });

  gamesStore.markers = [...gamesStore.markers, markerData];
  weaponIndex++;

  markerRef.value = newMarker;

  if (switcher.value && !messageDisplayed.value) {
    // Afficher le message pendant 2 secondes
    showPopupWithMessage(newMarker, markerData, 'Balise créée, vous pouvez la déplacer');
  }
}

// Watcher pour switcher
watch(() => switcher.value, (newValue, oldValue) => {
  if (!newValue && markerRef.value) {
    console.log('switcher is now false');
    // Affichez la popup avec le bouton Delete
    showDeletePopup(markerRef.value);

  }
})
</script>

