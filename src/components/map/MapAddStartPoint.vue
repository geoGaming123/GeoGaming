<template>
  <button class="btn" @click.prevent="addNewStartPoint" :class="{ 'hidden': startPointsExist }">Point de départ/arrivée</button>
</template>

<script setup>
import { ref, reactive, watch, defineProps, toRefs, computed } from 'vue'
import * as L from 'leaflet'
import { useGamesStore } from '@/stores/games'

const props = defineProps(['map'])
const { map } = toRefs(props)
const gamesStore = useGamesStore()

const startPoint = ref(null)
let weaponIndex = 1
const switcher = ref(true)
const messageDisplayed = ref(false) // Ajout de la variable pour suivre si le message a été affiché

const customIconStartPoint = L.icon({
  iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30]
})

const startPointsExist = computed(() => {
  return gamesStore.startPoint !== null
})

const showPopup = (message) => {
  startPoint.value.marker.bindPopup(message).openPopup();
}

const showDeletePopup = () => {
  const deleteButton = document.createElement('button')
  deleteButton.innerHTML = 'supprimé'

  startPoint.value.marker.bindPopup(deleteButton)

  deleteButton.addEventListener('click', (e) => {
    e.preventDefault()
    map.value.removeLayer(startPoint.value.marker)
    gamesStore.deleteStartPoint(startPoint.value)
    switcher.value = false
  })
}

// Fonction pour afficher la popup avec un message et délai
const showPopupWithMessage = (message) => {
  showPopup(message);

  setTimeout(() => {
    startPoint.value.marker.closePopup();
    switcher.value = false;
    console.log(switcher.value);
  }, 2000);
};

const addNewStartPoint = () => {
  if (!startPointsExist.value) {
    const center = map.value.getCenter()
    const newStartPoint = L.marker([center.lat, center.lng], {
      draggable: true,
      opacity: 1,
      icon: customIconStartPoint
    })

    newStartPoint.addTo(map.value)

    const startPointData = reactive({
      name: `Point de départ ${weaponIndex}`,
      marker: newStartPoint,
      position: { latitude: center.lat, longitude: center.lng }
    })

    newStartPoint.on('dragend', () => {
      const newStartPointLatLng = newStartPoint.getLatLng()
      console.log(
        `Coordonnées du point de départ ${weaponIndex - 1}:`,
        newStartPointLatLng.lat,
        newStartPointLatLng.lng
      )
      startPointData.position = {
        latitude: newStartPointLatLng.lat,
        longitude: newStartPointLatLng.lng
      }
    })

    startPoint.value = startPointData
    weaponIndex++

    gamesStore.updateStartPoint(startPointData)

    // Utilisation de la fonction pour afficher la popup avec le message
    if (switcher.value && !messageDisplayed.value) {
      showPopupWithMessage('Point de départ/arrivé créer, vous pouvez le déplacer');
      messageDisplayed.value = true; // Marquer que le message a été affiché
    } else {
      // Afficher le bouton Delete pour chaque nouvelle balise
      showDeletePopup();
    }
  } else {
    alert("Vous ne pouvez ajouter qu'un seul point de départ.")
  }
}

// Watcher pour switcher
watch(() => switcher.value, (newValue, oldValue) => {
  if (!newValue) {
    console.log('switcher is now false');
    // Affichez la popup avec le bouton Delete
    showDeletePopup();
  }
})
</script>

<style>
:disabled {
  background-color: grey;
}
</style>

