<template>
  <MapRender
    :id="id"
    :delete="btndelete"
    :join="btnjoin"
    :modified="btnmodified"
    :startpoint="startpoint"
    :markers="markers"
    :timer="timer"
    :position="position"
    :leave="btnleave"
  ></MapRender>
</template>

<script setup>
import MapRender from '@/components/map/MapRender.vue'
import { useGamesStore } from '@/stores/games'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const id = route.params.id

const gamesStore = useGamesStore()
const matchId = id
gamesStore.getMatch(matchId)

const match = computed(() => {
  return gamesStore.oneMatch
})

const userId = computed(() => {
  return gamesStore.sendUserId
})

const btndelete = ref(false)
const btnleave = ref(false)
const btnjoin = ref(true)
const btnmodified = ref(false)
const startpoint = ref(true)
const markers = ref(false)
const timer = ref(false)
const position = ref(false)


if (String(match.value.acf.masteruid) === String(userId.value)) {
  startpoint.value = true
  markers.value = true
  position.value = false
  btnjoin.value = false
  btnleave.value = false
  timer.value = false

}

if (match.value.acf.players.some((player) => player.userId === String(userId.value))) {
  position.value = true
  timer.value=true
  btnjoin.value = false
  btnleave.value = true
}
</script>

