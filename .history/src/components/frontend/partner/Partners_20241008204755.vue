<template>
  <section class="py-8 sm:py-12 bg-bg-site">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div 
          v-for="(partner, index) in partners" 
          :key="index" 
          class="flex justify-center"
        >
          <div class="partner-logo-wrapper w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              @error="handleImageError"
            />
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
      // Ajoutez plus de partenaires ici si nécessaire
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

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
s
