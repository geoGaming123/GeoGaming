<template>
    <div>
      <button @click="redirectToModified">Modifier</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';
    
  const props = defineProps(['id']);
  const router = useRouter();
    
  const redirectToModified = () => {
    router.push({ name: 'modified', params: { id: props.id } });
  };
  </script>
  