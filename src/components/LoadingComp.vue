<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true // Initialiser à true pour afficher l'écran de chargement au début
    };
  },
  methods: {
    // Méthode pour masquer l'écran de chargement
    hideLoadingScreen() {
      this.isLoading = false;
    }
  }
};
</script>

<style>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
