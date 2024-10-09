<template>
  <Layout>
    <Loader :isLoading="isLoading" />
    <router-view v-if="!isLoading" /> <!-- Affiche le contenu des routes uniquement si le loader est caché -->
  </Layout>
</template>

<script>
import Layout from './components/frontend/layout/Layout.vue'
import Loader from './components/frontend/loader/Loader.vue'; // Importation du loader

export default {
  name: 'App',
  components: {
    Layout,
    Loader
  },
  data() {
    return {
      isLoading: true, // État initial de chargement
    }
  },
  mounted() {
    // Simuler un délai de chargement (remplacez cela par vos appels API réels)
    this.simulateLoading();
  },
  methods: {
    simulateLoading() {
      setTimeout(() => {
        this.isLoading = false; // Cache le loader après 2 secondes
      }, 2000); // Remplacez 2000 par le temps réel de chargement de vos données
    }
  }
}
</script>

<style>
/* Ajoutez votre style global ici */
</style>
