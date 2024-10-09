<template>
    <div v-if="isLoading" class="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loader',
    props: {
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
  }
  </script>
  
  <style scoped>
  .loader {
    display: flex;
    justify-content: space-between; /* Espacement entre les points */
    width: 80px; /* Largeur totale des points */
  }
  
  .dot {
    width: 10px; /* Taille des points */
    height: 10px; /* Taille des points */
    border-radius: 50%; /* Forme ronde */
    background-color: #458018; /* Couleur des points */
    animation: bounce 0.6s infinite alternate; /* Animation de rebond */
  }
  
  /* Animation pour chaque point */
  .dot:nth-child(1) {
    animation-delay: 0s; /* Pas de délai */
  }
  
  .dot:nth-child(2) {
    animation-delay: 0.1s; /* Délai de 0.1 seconde */
  }
  
  .dot:nth-child(3) {
    animation-delay: 0.2s; /* Délai de 0.2 secondes */
  }
  
  .dot:nth-child(4) {
    animation-delay: 0.3s; /* Délai de 0.3 secondes */
  }
  
  @keyframes bounce {
    0% {
      transform: translateY(0); /* Position de départ */
    }
    100% {
      transform: translateY(-20px); /* Position de fin du rebond */
    }
  }
  </style>
  