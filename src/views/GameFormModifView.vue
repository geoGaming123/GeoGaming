<template>
    <HeaderComp profile="profile" ></HeaderComp>
    <MapFormModif :id="id"></MapFormModif>
</template>

<script setup>
import MapFormModif from '@/components/map/MapFormModif.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import { useRoute } from 'vue-router'
import {ref } from 'vue'

const route = useRoute()
const id = ref(route.params.id)

</script>