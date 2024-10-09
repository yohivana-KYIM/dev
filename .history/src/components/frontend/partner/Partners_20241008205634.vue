<template>
  <section class="py-8 sm:py-12 bg-bg-site overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Défilement automatique -->
      <div class="scroll-container flex items-center">
        <div class="flex animate-scroll">
          <!-- Affichage des logos des partenaires -->
          <div 
            v-for="(partner, index) in partners" 
            :key="index" 
            class="flex-shrink-0 mx-4"
          >
            <div class="partner-logo-wrapper w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl group">
              <img
                :src="partner.logo"
                :alt="partner.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>
        <!-- Copie pour un défilement infini -->
        <div class="flex animate-scroll" aria-hidden="true">
          <div 
            v-for="(partner, index) in partners" 
            :key="`copy-${index}`" 
            class="flex-shrink-0 mx-4"
          >
            <div class="partner-logo-wrapper w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl group">
              <img
                :src="partner.logo"
                :alt="partner.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
      event.target.src = '/images/default-partner.png';
    };

    return {
      partners,
      handleImageError,
    };
  },
};
</script>

<style scoped>
/* Conteneur de défilement */
.scroll-container {
  overflow: hidden;
  white-space: nowrap;
}

/* Animation de défilement */
.animate-scroll {
  display: inline-flex;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Pause animation lors du survol */
.scroll-container:hover .animate-scroll {
  animation-play-state: paused;
}

/* Style des conteneurs de logos */
.partner-logo-wrapper {
  position: relative;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  border-radius: 50%; /* Forme circulaire */
}

/* Ombre et effet lumineux lors du survol */
.partner-logo-wrapper:hover {
  border-color: #FFD700; /* Couleur or autour du logo */
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.7); /* Effet lumineux */
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

@media (max-width: 640px) {
  .animate-scroll {
    animation-duration: 15s;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .animate-scroll {
    animation-duration: 18s;
  }
}
</style>
