<template>
    <MapRender :id="id" ></MapRender>
</template>

<script setup>
import MapRender from '@/components/map/MapRender.vue';

import { useRoute } from 'vue-router';



const route = useRoute();
const id = route.params.id;
console.log(id)
</script>


