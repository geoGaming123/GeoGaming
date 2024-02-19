<template>
    <div>
      <button @click="startTimer" :disabled="timerRunning">Start</button>
      <button @click="endTimer" :disabled="!timerRunning">End</button>
      <p v-if="timerRunning">Temps écoulé: {{ minutes }} minutes {{ secondes }} secondes</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  let timerRunning = ref(false)
  let intervalId = null
  
  let minutes = ref(0)
  let secondes = ref(0)
  
  function startTimer() {
    timerRunning.value = true
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
  }
  
  function endTimer() {
    if (timerRunning.value) {
      timerRunning.value = false
      // Nettoyer l'intervalle
      clearInterval(intervalId)
      // Vous pouvez également déclencher des actions supplémentaires à la fin du timer
      console.log(`Le temps total écoulé est de ${minutes.value} minutes ${secondes.value} secondes.`)
    }
  }
  </script>
  
  
  
  
  
  
  
  