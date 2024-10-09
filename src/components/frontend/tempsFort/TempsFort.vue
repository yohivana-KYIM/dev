<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="relative">
      <div class="flex justify-center gap-4 overflow-hidden">
        <!-- Afficher une seule carte sur mobile, plusieurs sur écrans plus larges -->
        <div
          v-for="(testimonial, index) in visibleTestimonials"
          :key="testimonial.id"
          class="w-full sm:w-1/3 p-4 transition-all duration-500 ease-in-out"
          :class="{ 
            'scale-105 z-10 shadow-xl': currentIndex === index, 
            'scale-95 opacity-75': currentIndex !== index 
          }"
        >
          <div
            class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <div class="flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-indigo-600">
              <img
                :src="testimonial.image"
                :alt="testimonial.name"
                class="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div class="p-6 flex-grow flex flex-col">
              <h3 class="font-semibold text-xl mb-2 text-gray-800">{{ testimonial.name }}</h3>
              <div class="flex items-center mb-4">
                <span 
                  v-for="star in 5" 
                  :key="star" 
                  :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
                  class="text-xl"
                >
                  &#9733;
                </span>
                <span class="ml-2 text-sm text-gray-600">({{ testimonial.rating }}/5)</span>
              </div>
              <p class="text-gray-700 flex-grow">{{ testimonial.message }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton "prev" -->
      <button 
        @click="prev" 
        class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 focus:outline-none"
        aria-label="Témoignage précédent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Bouton "next" -->
      <button 
        @click="next" 
        class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 focus:outline-none"
        aria-label="Témoignage suivant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Indicateurs de navigation -->
      <div class="flex justify-center mt-8">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          @click="goToIndex(index)"
          :class="{ 'bg-purple-600 w-4 h-4': currentIndex === index, 'bg-gray-300': currentIndex !== index }"
          class="w-3 h-3 rounded-full mx-2 focus:outline-none transition-all duration-300 ease-in-out"
          :aria-label="`Aller au témoignage ${index + 1}`"
        ></button>
      </div>
    </div>
  </div>
</template>

    <script>
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    
    export default {
      setup() {
        const currentIndex = ref(0);
       
    const testimonials = [
      {
        id: 1,
        name: 'BEKELLE Lionelle Olivia',
        image: '/images/testimonial1.jpg',
        rating: 5,
        message: 'Lorsque nous avons découvert Faroty, la visibilité de notre association a augmenté car la plateforme de collecte nous a permis de collecter plus rapidement et de façon considérable lors de nos activités.',
      },
      {
        id: 2,
        name: 'Humour Ciné',
        image: '/images/testimonial2.jpg',
        rating: 4,
        message: 'Grâce à Faroty pour la journée mondiale de lutte contre la drépanocytose le Mouvement Relève Toi et Avance dont nous faisons partie a pu faire une campagne de sensibilisation avec des influenceurs.',
      },
      {
        id: 3,
        name: 'Potelé Magazine',
        image: '/images/testimonial3.jpg',
        rating: 5,
        message: 'Avant de découvrir ePass, c\'était compliqué de gérer mes recouvrements. Avec ePass, je peux gérer mes événements de manière efficace.',
      },
    ];

        const visibleTestimonials = computed(() => {
          const start = currentIndex.value;
          return [
            testimonials[start % testimonials.length],
            testimonials[(start + 1) % testimonials.length],
            testimonials[(start + 2) % testimonials.length],
          ];
        });
    
        const goToIndex = (index) => {
          currentIndex.value = index;
        };
    
        const next = () => {
          currentIndex.value = (currentIndex.value + 1) % testimonials.length;
        };
    
        const prev = () => {
          currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length;
        };
    
        let intervalId;
        const startAutoSlide = () => {
          intervalId = setInterval(next, 5000);
        };
    
        onMounted(() => {
          startAutoSlide();
        });
    
        onUnmounted(() => {
          clearInterval(intervalId);
        });
    
        return {
          currentIndex,
          testimonials,
          visibleTestimonials,
          goToIndex,
          next,
          prev,
        };
      },
    };
    </script>
    
    <style scoped>
    .testimonial-enter-active,
    .testimonial-leave-active {
      transition: all 0.5s ease;
    }
    
    .testimonial-enter-from,
    .testimonial-leave-to {
      opacity: 0;
      transform: scale(0.9);
    }

    /* Mobile styling: Ensure one card is displayed at a time */
    @media (max-width: 640px) {
      /* Force each card to take up full width on small screens */
      .w-full.sm\:w-1\/3 {
        width: 100%;
      }

      /* Add horizontal scrolling for mobile */
      .flex {
        overflow-x: auto;
        scroll-snap-type: x mandatory;
      }

      /* Ensures each card snaps to the center */
      .flex > div {
        scroll-snap-align: center;
      }

      /* Optional: Hide the navigation dots and arrows on mobile for a cleaner experience */
      .hidden-on-mobile {
        display: none;
      }
    }
</style>

    