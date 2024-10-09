<template>
  <section class="py-8 sm:py-12 bg-bg-site overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="relative">
        <div class="scroll-container flex items-center">
          <div class="flex animate-scroll">
            <div 
              v-for="(partner, index) in partners" 
              :key="index" 
              class="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8"
            >
              <div class="partner-logo-wrapper rounded-full overflow-hidden bg-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl group">
                <img
                  :src="partner.logo"
                  :alt="partner.name"
                  class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover transition-transform duration-300 group-hover:scale-110"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>
          <div class="flex animate-scroll" aria-hidden="true">
            <div 
              v-for="(partner, index) in partners" 
              :key="`copy-${index}`" 
              class="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8"
            >
              <div class="partner-logo-wrapper rounded-full overflow-hidden bg-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl group">
                <img
                  :src="partner.logo"
                  :alt="partner.name"
                  class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover transition-transform duration-300 group-hover:scale-110"
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
      // Ajoutez plus de partenaires ici pour un défilement plus fluide
    ]);

    const handleImageError = (event) => {
      event.target.src = '/images/default-partner.png';
    };

    return {
      partners,
      handleImageError
    };
  }
};
</script>

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

  .partner-logo-wrapper img {
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .animate-scroll {
    animation-duration: 25s;
  }

  .partner-logo-wrapper img {
    width: 90px;
    height: 90px;
  }
}

@media (min-width: 1025px) {
  .partner-logo-wrapper img {
    width: 120px;
    height: 120px;
  }
}
</style>
