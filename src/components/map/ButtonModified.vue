<template>
    <div>
      <button @click="redirectToGameFormModif">Modifier</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';
    
  const props = defineProps(['id']);
  const router = useRouter();
    
  const redirectToGameFormModif = () => {
    router.push({ name: 'GameFormModif', params: { id: props.id } });
  };
  </script>
  