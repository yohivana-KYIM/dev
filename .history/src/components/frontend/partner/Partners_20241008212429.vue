<template>
  <section class="py-8 sm:py-12 bg-bg-site overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="relative">
        <div class="scroll-container flex items-center">
          <div class="flex animate-scroll">
            <div
              v-for="(partner, index) in partners"
              :key="index"
              class="flex-shrink-0 mx-2 sm:mx-4 md:mx-6"
            >
              <div class="partner-logo-wrapper rounded-full overflow-hidden bg-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                <img
                  :src="partner.logo"
                  :alt="partner.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>
          <div class="flex animate-scroll" aria-hidden="true">
            <div
              v-for="(partner, index) in partners"
              :key="`copy-${index}`"
              class="flex-shrink-0 mx-2 sm:mx-4 md:mx-6"
            >
              <div class="partner-logo-wrapper rounded-full overflow-hidden bg-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                <img
                  :src="partner.logo"
                  :alt="partner.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll-container {
  overflow: hidden;
  white-space: nowrap;
}

.animate-scroll {
  display: inline-flex;
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.scroll-container:hover .animate-scroll {
  animation-play-state: paused;
}

.partner-logo-wrapper {
  position: relative;
  width: 80px; /* Ajustez la taille selon vos besoins */
  height: 80px; /* Ajustez la taille selon vos besoins */
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.partner-logo-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.partner-logo-wrapper:hover::after {
  opacity: 1;
}

.partner-logo-wrapper:hover {
  border-color: #FFD700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

@media (max-width: 640px) {
  .animate-scroll {
    animation-duration: 20s;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .animate-scroll {
    animation-duration: 25s;
  }
}
</style>


<script>
import { ref } from 'vue';
import partner1 from '@/assets/partner1.png';
import partner2 from '@/assets/partner2.png';
import partner3 from '@/assets/partner3.png';


export default {
  name: 'Partners',
  setup() {
    const partners = ref([
     
      { name: 'Partner 1', logo: partner1 },
      { name: 'Partner 2', logo: partner2 },
      { name: 'Partner 3', logo: partner3 },
      // Ajoutez plus de partenaires ici
    ]);

    const handleImageError = (event) => {
      event.target.src = '/images/default-partner.png'; // Image par défaut en cas d'erreur
    };

    return {
      partners,
      handleImageError,
    };
  },
};
</script>

