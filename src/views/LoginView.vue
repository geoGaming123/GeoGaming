<script setup>
import LoginComponent from '@/components/LoginComponent.vue';
import SignupComponent from '@/components/SignupComponent.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
</script>

<template>
  <main>
    <LoginComponent v-if="userStore.pageBool == false"/>
    <SignupComponent v-if="userStore.pageBool == true"/>
  </main>
</template>
