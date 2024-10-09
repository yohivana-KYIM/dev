<template>
  <header class="py-4 shadow-md bg-site-bg">
    <div class="container px-4 mx-auto">
      <div class="flex flex-col items-center justify-between p-4 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg md:flex-row hover:shadow-xl">
        
        <!-- Logo et titre -->
        <div class="flex items-center mb-4 transition-transform duration-300 ease-in-out md:mb-0 hover:scale-105">
          <router-link to="/" class="flex-shrink-0">
            <img src="/images/logo/logo-adna.png" alt="Logo ADNA" class="max-w-full h-auto w-16 mr-3">
          </router-link>
          <h1 class="text-base font-bold text-yellow-700 transition-colors duration-300 ease-in-out hover:text-yellow-600 md:text-xl whitespace-nowrap">
            CONGRÈS NDOGBATJECK
          </h1>
        </div>

        <!-- Informations du congrès avec défilement centré -->
        <div class="relative flex items-center justify-center w-full h-10 mb-4 overflow-hidden md:w-auto md:mb-0">
          <div class="text-center animate-scroll whitespace-nowrap" style="animation-duration: 20s;">
            <p class="inline-block text-sm font-semibold text-gray-700">📅 23 au 26 Janvier 2025</p>
            <span class="mx-4">|</span>
            <p class="inline-block text-xs text-gray-600">EKOANGOMBE SUD - MANGOG</p>
          </div>
        </div>

        <!-- Compte à rebours -->
        <div class="flex flex-col items-center">
          <div :class="{'mb-2 text-xl font-bold flex space-x-2 animate-pulse text-green-500': isEventStarted, 'mb-2 text-xl font-bold text-red-600 flex space-x-2': !isEventStarted}">
            <!-- Affichage du temps restant ou message de début -->
            <template v-if="!isEventStarted">
              <div class="flex flex-col items-center">
                <span>{{ timeLeft.days }}</span>
                <span class="text-xs text-gray-500">Jours</span>
              </div>
              <div class="flex flex-col items-center">
                <span>{{ timeLeft.hours }}</span>
                <span class="text-xs text-gray-500">Heures</span>
              </div>
              <div class="flex flex-col items-center">
                <span>{{ timeLeft.minutes }}</span>
                <span class="text-xs text-gray-500">Minutes</span>
              </div>
              <div class="flex flex-col items-center">
                <span>{{ timeLeft.seconds }}</span>
                <span class="text-xs text-gray-500">Secondes</span>
              </div>
            </template>
            <template v-else>
              <span class="text-3xl font-bold">🎉 Le congrès a commencé ! 🎉</span>
            </template>
          </div>
        </div>
      </div>

      <!-- Effet de confettis quand l'événement commence -->
      <div v-if="isEventStarted" class="confetti-container"></div>
    </div>
  </header>
</template>


<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'AdvancedCountdownHeader',
  setup() {
    const targetDate = ref(new Date('2025-01-23T00:00:00').getTime());
    const now = ref(Date.now());
    let timer;

    // Calcul du temps restant
    const timeLeft = computed(() => {
      const difference = targetDate.value - now.value;
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    });

    // Vérifie si l'événement a commencé
    const isEventStarted = computed(() => {
      return timeLeft.value.days + timeLeft.value.hours + timeLeft.value.minutes + timeLeft.value.seconds <= 0;
    });

    const updateCountdown = () => {
      now.value = Date.now();
    };

    onMounted(() => {
      timer = setInterval(updateCountdown, 1000);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      timeLeft,
      isEventStarted
    };
  }
};
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
.animate-scroll {
  display: inline-block;
  animation: scroll linear infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Confetti effect */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url('/images/confetti.gif'); /* Replace with your confetti image or effect */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>

