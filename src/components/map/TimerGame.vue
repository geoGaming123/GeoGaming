<template>
  <div>
    <button @click="startTimer" v-show="showStartButton && !gameEnded" :disabled="timerRunning || !showStartButton || gameEnded" :class="{ 'disabled': timerRunning || !showStartButton || gameEnded }">Start</button>
    <button @click="endTimer" v-show="showStartButton && timerRunning">End</button>
    <p v-if="timerRunning">Temps écoulé: {{ minutes }} minutes {{ secondes }} secondes</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userposition } from './UserPosition.vue'
const { showStartButton } = userposition()
let timerRunning = ref(false)
let intervalId = null
let startButtonClicked = ref(false)
let minutes = ref(0)
let secondes = ref(0)
let gameEnded = ref(false)
const props = defineProps({
  updateShowMarkers: Function
})
function startTimer() {
  if (showStartButton.value) {
    startButtonClicked.value = true
    // Vérifiez si le bouton Start peut être activé
    timerRunning.value = true
    props.updateShowMarkers(true)
    minutes.value = 0
    secondes.value = 0
    // Mettre à jour les valeurs de minutes et secondes chaque seconde
    intervalId = setInterval(() => {
      if (secondes.value < 59) {
        secondes.value++
      } else {
        secondes.value = 0
        minutes.value++
      }
    }, 1000)
  } else {
    // Affichez un message ou effectuez une action si le bouton Start ne peut pas être activé
    alert('Vous ne pouvez pas démarrer le timer pour le moment.')
  }
}

function endTimer() {
  if (timerRunning.value) {
    timerRunning.value = false
    // Nettoyer l'intervalle
    clearInterval(intervalId)
    // Vous pouvez également déclencher des actions supplémentaires à la fin du timer
    alert(`Le temps total écoulé est de ${minutes.value} minutes ${secondes.value} secondes.`)
    gameEnded.value = true // La partie est terminée
  }
}


</script>
<style>
  .disabled {
    opacity: 0.6;  /* Vous pouvez ajuster le style comme vous le souhaitez pour indiquer qu'il est désactivé */
    cursor: not-allowed;
  }
</style>