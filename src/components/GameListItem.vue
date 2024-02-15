<template>
  <tbody>
    <tr class="gamelist-item">
        <router-link to="/rank"><th>{{ props.data }}</th></router-link>
        <th>{{ props.data }}</th>
        <th>{{ props.data }}</th>
        <th>{{ props.data }}</th>
      </tr>
    <tr class="gamelist-item">
      <th>1</th>
      <th>Charleroi</th>
      <th>9</th>
      <th>10/03/24</th>
    </tr>
    <tr class="gamelist-item">
      <th>2</th>
      <th>Bruxelles</th>
      <th>33</th>
      <th>15/03/24</th>
    </tr>
    <tr class="gamelist-item">
      <th>3</th>
      <th>Paris</th>
      <th>3</th>
      <th>22/03/24</th>
    </tr>
  </tbody>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

 const props = defineProps({
    data : String
  })



</script>

<style scoped>
  .gamelist-item th {
    padding: .4rem;
  }
</style>