<template>
  <nav class="bg-site-bg text-white py-2">
    <div class="container px-4 mx-auto">
      <div class="flex items-center justify-between md:justify-center space-x-4">
        <!-- Éléments toujours visibles -->
        <div @click="toggleSubmenu('accueil')" class="nav-item cursor-pointer hover:bg-[#8b6b10] rounded-lg px-2 py-1 transition-all duration-300 flex items-center">
          <div class="icon-circle bg-[#0056ff]">
            <img src="/images/menu/accueil.svg" alt="Accueil" class="w-6 h-6" />
          </div>
          <span class="mt-1 text-xs">Accueil</span>
          <img src="/images/menu/dropdown-arrow.svg" 
               alt="Dropdown" 
               class="w-4 h-4 ml-1 text-white" 
               :class="{ 'rotate-180': openSubmenu === 'accueil' }" />
        </div>

        <!-- Menu Le Congrès -->
        <div @click="toggleSubmenu('congres')" class="nav-item cursor-pointer hover:bg-[#8b6b10] rounded-lg px-2 py-1 transition-all duration-300 flex items-center">
          <div class="icon-circle bg-[#856230]">
            <img src="/images/menu/congres.svg" alt="Congrès" class="w-6 h-6" />
          </div>
          <span class="mt-1 text-xs">Congrès</span>
          <img src="/images/menu/dropdown-arrow.svg" 
               alt="Dropdown" 
               class="w-4 h-4 ml-1 text-white" 
               :class="{ 'rotate-180': openSubmenu === 'congres' }" />
        </div>

        <!-- Menu Participer -->
        <div @click="toggleSubmenu('participer')" class="nav-item cursor-pointer hover:bg-[#8b6b10] rounded-lg px-2 py-1 transition-all duration-300 flex items-center">
          <div class="icon-circle bg-[#32CD32]">
            <img src="/images/menu/participer.svg" alt="Participer" class="w-6 h-6" />
          </div>
          <span class="mt-1 text-xs">Participer</span>
          <img src="/images/menu/dropdown-arrow.svg" 
               alt="Dropdown" 
               class="w-4 h-4 ml-1 text-white" 
               :class="{ 'rotate-180': openSubmenu === 'participer' }" />
        </div>

        <!-- Éléments de menu pour ordinateur de bureau -->
        <div class="hidden md:flex items-center space-x-4">
          <div @click="toggleSubmenu('mediatheque')" class="cursor-pointer flex flex-col items-center hover:bg-[#8b6b10] rounded-lg px-2 py-1 transition-all duration-300">
            <div class="icon-circle bg-[#DAA520]">
              <img src="/images/menu/Médiathèque.svg" alt="Médiathèque" class="w-6 h-6" />
            </div>
            <span class="mt-1 text-xs">Médiathèque</span>
          </div>
          <router-link to="/hynme" class="cursor-pointer flex flex-col items-center hover:bg-[#8b6b10] rounded-lg px-2 py-1 transition-all duration-300">
            <div class="icon-circle bg-[#FF6347]">
              <img src="/images/menu/hymne.svg" alt="Hymne" class="w-6 h-6" />
            </div>
            <span class="mt-1 text-xs">Hymne</span>
          </router-link>
          <div class="relative flex flex-col items-center hover:bg-[#8b6b10] rounded-lg px-2 py-1 transition-all duration-300">
            <div class="icon-circle bg-[#FF6347]">
              <img src="/images/menu/langue.svg" alt="Langue" class="w-6 h-6" />
            </div>
            <div class="flex items-center mt-1">
              <span class="text-xs">Traduction</span>
              <select v-model="selectedLanguage" @change="handleLanguageChange" class="ml-1 text-white bg-transparent bg-site-bg nav-select hover:bg-gray-600">
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Menu hamburger pour mobile -->
        <button @click="toggleMenu" class="text-white md:hidden focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      <!-- Sous-menu pour l'accueil (desktop) -->
      <transition name="slide-fade">
        <div v-if="openSubmenu === 'accueil'" class="absolute bg-site-bg mt-2 py-2 px-4 rounded-lg shadow-lg z-10">
          <ul>
            <li v-for="(item, index) in accueilItems" :key="index" class="py-1 hover:bg-[#8b6b10] cursor-pointer">
              {{ item }}
            </li>
          </ul>
        </div>
      </transition>

      <!-- Sous-menu pour le congrès (desktop) -->
      <transition name="slide-fade">
        <div v-if="openSubmenu === 'congres'" class="absolute bg-site-bg mt-2 py-2 px-4 rounded-lg shadow-lg z-10">
          <ul>
            <li v-for="(item, index) in congresItems" :key="index" class="py-1 hover:bg-[#8b6b10] cursor-pointer">
              {{ item }}
            </li>
          </ul>
        </div>
      </transition>

      <!-- Sous-menu pour participer (desktop) -->
      <transition name="slide-fade">
        <div v-if="openSubmenu === 'participer'" class="absolute bg-site-bg mt-2 py-2 px-4 rounded-lg shadow-lg z-10">
          <ul>
            <li v-for="(item, index) in participerItems" :key="index" class="py-1 hover:bg-[#8b6b10] cursor-pointer">
              {{ item }}
            </li>
          </ul>
        </div>
      </transition>

      <!-- Menu mobile -->
      <transition name="slide-fade">
        <div v-if="isMenuOpen" class="mt-4 md:hidden">
          <div class="mb-4 nav-item" @click="toggleSubmenu('mediatheque')">
            <div class="cursor-pointer flex flex-col items-center hover:bg-[#8b6b10] rounded-lg px-2 py-1 transition-all duration-300">
              <div class="icon-circle bg-[#DAA520]">
                <img src="/images/menu/Médiathèque.svg" alt="Médiathèque" class="w-6 h-6" />
              </div>
              <span class="mt-1 text-xs">Médiathèque</span>
            </div>
          </div>
          <router-link to="/hynme" class="mb-4 nav-item">
            <div class="cursor-pointer flex flex-col items-center hover:bg-[#8b6b10] rounded-lg px-2 py-1 transition-all duration-300">
              <div class="icon-circle bg-[#FF6347]">
                <img src="/images/menu/hymne.svg" alt="Hymne" class="w-6 h-6" />
              </div>
              <span class="mt-1 text-xs">Hymne</span>
            </div>
          </router-link>
          <div class="mb-4 nav-item">
            <div class="flex flex-col items-center">
              <div class="icon-circle bg-[#FF6347]">
                <img src="/images/menu/langue.svg" alt="Langue" class="w-6 h-6" />
              </div>
              <div class="flex items-center">
                <span class="text-xs">Traduction</span>
                <select v-model="selectedLanguage" @change="handleLanguageChange" class="ml-1 text-white bg-transparent bg-site-bg nav-select hover:bg-gray-600">
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Sous-menu pour l'accueil (mobile) -->
          <transition name="slide-fade">
            <div v-if="openSubmenu === 'accueil'" class="mt-4">
              <ul>
                <li v-for="(item, index) in accueilItems" :key="index" class="nav-item py-1 hover:bg-[#8b6b10] cursor-pointer">
                  {{ item }}
                </li>
              </ul>
            </div>
          </transition>

          <!-- Sous-menu pour le congrès (mobile) -->
          <transition name="slide-fade">
            <div v-if="openSubmenu === 'congres'" class="mt-4">
              <ul>
                <li v-for="(item, index) in congresItems" :key="index" class="nav-item py-1 hover:bg-[#8b6b10] cursor-pointer">
                  {{ item }}
                </li>
              </ul>
            </div>
          </transition>

          <!-- Sous-menu pour participer (mobile) -->
          <transition name="slide-fade">
            <div v-if="openSubmenu === 'participer'" class="mt-4">
              <ul>
                <li v-for="(item, index) in participerItems" :key="index" class="nav-item py-1 hover:bg-[#8b6b10] cursor-pointer">
                  {{ item }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      openSubmenu: null,
      selectedLanguage: 'fr',
      accueilItems: [
        'Mot du Chef Canton NDOGBATJECK',
        'Mot du Président ADNA NDOGBATJECK',
        'Présentation du Canton NDOGBATJECK',
        'Listes des villages NDOGBATJECK',
        'Listes des Associations NDOGBATJECK',
        "L'Hôte du congrès NDOGBATJECK"
      ],
      congresItems: [
        "Organigramme du comité d’organisation du congrès",
        "Organigramme du bureau du congrès",
        "Les Activités au Congrès",
        "Programme détaillé du congrès",
        "Boutique congrès",
        "Evènements",
        "Nous contacter"
      ],
      participerItems: [
        "S’inscrire au Congrès",
        "Devenir Sponsor et ou Partenaire du Congrès",
        "Liste des Sponsors et Partenaire du Congrès"
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleSubmenu(menu) {
      if (this.openSubmenu === menu) {
        this.openSubmenu = null;
      } else {
        this.openSubmenu = menu;
      }
    },
    handleLanguageChange() {
      // Gérer la logique du changement de langue ici
    }
  }
};
</script>





<style scoped>
.nav-item {
  @apply flex flex-col items-center justify-center w-auto;
  margin-left: 10px;
}

.icon-circle {
  @apply flex items-center justify-center bg-white rounded-full w-10 h-10;
}

.nav-select {
  @apply bg-site-bg bg-transparent text-white py-1 px-2 rounded appearance-none w-full text-center text-xs sm:text-sm;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1.5em;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
