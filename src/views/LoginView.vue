<script setup>
import LoginComponent from '@/components/LoginComponent.vue'
import SignupComponent from '@/components/SignupComponent.vue'
import { ref } from 'vue'

let loggedin = ref(false)
</script>

<template>
  <main>
    <button @click="loggedin = !loggedin">Logged in</button>
    <LoginComponent v-if="loggedin == false" />
    <SignupComponent v-if="loggedin == true" />
  </main>
</template>
