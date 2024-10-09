<template>
  <br />
  <Separator />
  <br />

  <div class="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-900 to-yellow-700 animate-gradient-bg">
    <div class="w-full max-w-md overflow-hidden transition-all duration-500 transform bg-black bg-opacity-50 shadow-2xl rounded-2xl hover:bg-opacity-60 hover:shadow-yellow-400/50 hover:scale-105">
      <div class="p-6 space-y-4">
        <h1 class="text-3xl font-extrabold text-center text-white md:text-4xl drop-shadow-lg animate-title">
          Hymne Ndogbatjeck
        </h1>

        <!-- Contrôles audio -->
        <div class="flex items-center justify-around">
          <button @click="skipBackward" class="transition-transform duration-300 transform focus:outline-none hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-yellow-400 transition-colors duration-300 hover:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </button>
          <button @click="togglePlayPause" class="transition-transform duration-300 transform focus:outline-none hover:scale-110 animate-pulse-slow">
            <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-yellow-400 transition-colors duration-300 hover:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-yellow-400 transition-colors duration-300 hover:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button @click="skipForward" class="transition-transform duration-300 transform focus:outline-none hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-yellow-400 transition-colors duration-300 hover:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </button>
        </div>

        <div class="text-sm text-center text-white animate-fade-in">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>

        <!-- Barre de progression -->
        <div class="w-full h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            class="h-2 transition-all duration-300 ease-out bg-yellow-600 rounded-full animate-pulse-slow"
            :style="{ width: `${(currentTime / duration) * 100}%` }"
          ></div>
        </div>

        <!-- Paroles de l'hymne -->
        <div class="h-64 pr-2 space-y-2 overflow-y-auto custom-scrollbar">
          <p
            v-for="(line, index) in hymnLyrics"
            :key="index"
            class="text-lg leading-relaxed text-white animate-fadeIn"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
            {{ line }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Separator from '@/components/frontend/separator/Separator.vue';

const audio = ref(new Audio('/audio/hymne.mp3'));
const isPlaying = ref(true);
const currentTime = ref(0);
const duration = ref(0);

const hymnLyrics = [
  "Ô Cameroun berceau de nos ancêtres,",
  "Va debout et jaloux de ta liberté.",
  "Comme un soleil ton drapeau fier doit être,",
  "Un symbole ardent de foi et d'unité.",
  "Que tous tes enfants du Nord au Sud,",
  "De l'Est à l'Ouest soient tout amour !",
  "Te servir que ce soit leur seul but,",
  "Pour remplir leur devoir toujours.",
];

const togglePlayPause = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const skipForward = () => {
  audio.value.currentTime = Math.min(audio.value.currentTime + 10, audio.value.duration);
};

const skipBackward = () => {
  audio.value.currentTime = Math.max(audio.value.currentTime - 10, 0);
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const updateTime = () => {
  currentTime.value = audio.value.currentTime;
  duration.value = audio.value.duration;
};

watch(isPlaying, (newValue) => {
  if (newValue) {
    audio.value.play();
  } else {
    audio.value.pause();
  }
});

onMounted(() => {
  audio.value.addEventListener('timeupdate', updateTime);
  audio.value.addEventListener('loadedmetadata', () => {
    duration.value = audio.value.duration;
    audio.value.play(); // Auto-play on mount
  });
  audio.value.addEventListener('ended', () => {
    isPlaying.value = false;
  });
  audio.value.addEventListener('play', () => {
    isPlaying.value = true;
  });
  audio.value.addEventListener('pause', () => {
    isPlaying.value = false;
  });
});

onUnmounted(() => {
  audio.value.removeEventListener('timeupdate', updateTime);
  audio.value.removeEventListener('ended', () => {
    isPlaying.value = false;
  });
  audio.value.removeEventListener('play', () => {
    isPlaying.value = true;
  });
  audio.value.removeEventListener('pause', () => {
    isPlaying.value = false;
  });
  audio.value.pause();
});
</script>

<style scoped>
@keyframes title {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-title {
  animation: title 1s ease-in-out;
}

@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 1s ease-in;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.animate-pulse-slow {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
</style>

