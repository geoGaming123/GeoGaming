<template>
  <HeaderComp></HeaderComp>
  <div class="game">
  <h2 class="roboto-title">{{ match.acf.title }}</h2>
  <div class="game-info">
    <p class="game-info-desc">{{ match.acf.description }}</p>
    <div v-if="master" class="game-info-master">
    <p class="game-info-start">Début :<br><span class="game-info-date"></span>{{ startDate }}<br>{{ startTime }}</p>
    <p class="game-info-end">Fin :<br><span class="game-info-date">{{ endDate }}<br>{{ endTime }}</span></p>
    </div>
    <p class="game-info-players">
      <span v-if="match.acf.players.length > 0">{{ match.acf.players.length }}</span>
      <span v-else>0</span>
       joueur(s)</p>
    <p class="game-info-balises">{{ match.acf.markers.length }} balise(s)</p>
  </div>
  
  <div class="game-map" id="map"></div>
  
  <div class="game-btns">
    <TimerGame v-if="props.timer" :updateShowMarkers="updateShowMarkers"></TimerGame>
    <ButtonJoin v-if="props.join" class="green" :id="matchId"></ButtonJoin>
    <ButtonLeaveGame v-if="props.leave" class="red"  :id="matchId"></ButtonLeaveGame>
    <ButtonModified v-if="props.modified" class="orange" :id="matchId"></ButtonModified>
    <ButtonDelete  v-if="props.delete" class="red" :id="matchId"></ButtonDelete>
  </div>
</div>
  
</template>

<script setup>
import { useGamesStore } from '@/stores/games'
import { onMounted, computed, ref, watch } from 'vue'
import * as L from 'leaflet'
import ButtonDelete from '@/components/map/ButtonDelete.vue'
import ButtonJoin from './ButtonJoin.vue'
import ButtonModified from './ButtonModified.vue'
import ButtonLeaveGame from './ButtonLeaveGame.vue'
import { userposition } from './UserPosition.vue'
import HeaderComp from '../HeaderComp.vue'
import TimerGame from './TimerGame.vue'

const gamesStore = useGamesStore()
const props = defineProps([
  'id',
  'delete',
  'join',
  'leave',
  'startpoint',
  'position',
  'markers',
  'timer',
  'modified',
  'master',
])

const showMarkers = ref(false)
const matchId = props.id
function updateShowMarkers(value) {
  showMarkers.value = value
}

gamesStore.getMatch(matchId)

const match = computed(() => {
    return gamesStore.oneMatch
  })


onMounted(() => {
  const startPoint = match.value.acf.start_point
  const markers = match.value.acf.markers

  const latitude = startPoint.position.latitude
  const longitude = startPoint.position.longitude

  const map = L.map('map', {
    center: [latitude, longitude],
    zoom: 15,
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
  })

  map.whenReady(() => {
    if(props.markers){
  
        // Afficher les marqueurs sur la carte
        markers.forEach((marker) => {
          const { latitude, longitude } = marker.position
          const markerIcon = L.icon({
            iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
            iconSize: [50, 50],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30]
          })
          const leafletMarker = L.marker([latitude, longitude], { icon: markerIcon }).bindPopup(
            `<b>${marker.name}</b>`
          )

          marker.leafletMarker = leafletMarker.addTo(map)
        })
        
      } 

    
      watch(showMarkers, (newValue) => {
    if (newValue) {
        // Afficher les marqueurs sur la carte
        const currentPlayer = gamesStore.oneMatch.acf.players.find(
            (player) => player.userId === String(gamesStore.userId)
        );
        const playerMarkers = currentPlayer?.marker || [];

        playerMarkers.forEach((playerMarker) => {
    const { latitude, longitude } = playerMarker.position;
    const markerIcon = L.icon({
        iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -30]
    });

    // Créer un marqueur avec l'opacité initiale basée sur l'état capturé
    const opacity = playerMarker.isCaptured ? 0.4 : 1.0;
    const leafletMarker = L.marker([latitude, longitude], {
        icon: markerIcon,
        opacity: opacity // Définissez l'opacité du marqueur
    }).bindPopup(`<b>${playerMarker.name}</b>`);

    playerMarker.leafletMarker = leafletMarker.addTo(map);

    // Surveiller les changements d'état capturé et mettre à jour l'opacité
    watch(() => playerMarker.isCaptured, (newValue) => {
        leafletMarker.setOpacity(newValue ? 0.4 : 1.0);
    });
});
    } else {
        // Masquer les marqueurs de la carte
        const currentPlayer = gamesStore.oneMatch.acf.players.find(
            (player) => player.userId === String(gamesStore.userId)
        );
        const playerMarkers = currentPlayer?.marker || [];

        playerMarkers.forEach((playerMarker) => {
            if (playerMarker.leafletMarker) {
                map.removeLayer(playerMarker.leafletMarker); // Retirer le marqueur de la carte
                playerMarker.leafletMarker.off(); // Désactiver les événements du marqueur
                playerMarker.leafletMarker = null; // Marquer le marqueur comme retiré
            }
        });
    }
});





    if (props.startpoint) {
      const startPointIcon = L.icon({
        iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -30]
      })
      L.marker([latitude, longitude], { icon: startPointIcon })
        .addTo(map)
        .bindPopup('<b>Start Point</b>')
    }

    if (props.position) {
      userposition(map, showMarkers)
    }
  })
})
</script>
<style>
.game-info-master{
  display: flex;
  width: 100%;
}

</style>