<script setup>
import LoginComponent from '@/components/LoginComponent.vue';
import SignupComponent from '@/components/SignupComponent.vue';
import { useUserStore } from '@/stores/user';
import { onMounted, computed } from 'vue';
import { switchInstallBtn } from '@/register-sw';
import LoadingComp from '@/components/LoadingComp.vue'

const userStore = useUserStore()

const isLoading = computed(()=>userStore.isItLoading)
onMounted(() => {
  switchInstallBtn();
});
</script>

<template>
  <header>
    <div class="install">
      <button class="install-btn">Install</button>
    </div>
  </header>
  <main class="login">
    <LoginComponent v-if="userStore.pageBool == false"/>
    <SignupComponent v-if="userStore.pageBool == true"/>
  </main>
  <LoadingComp v-if="isLoading === 1"></LoadingComp>
</template>


