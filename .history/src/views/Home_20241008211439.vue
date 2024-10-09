<template>
  <div class="home">
    <Loader :isLoading="isLoading" />
    <Separator />
    <br />
    <HeroBanner />
    <br />
    <Separator />
    <div class="bg-[#458018] p-4 rounded-full text-white text-center mt-8 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto flex items-center justify-center text-lg font-bold">
  Blog 
</div>

    <News />
    <Separator />
    <div class="bg-[#458018] p-4 rounded-full text-white text-center mt-8 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto flex items-center justify-center text-lg font-bold">
      Nos Partenaires
</div>

   
    <br />
    <Partners /><br />
    <Separator /><br />
    <div class="bg-[#458018] p-4 rounded-full text-white text-center mt-8 w-1/3 mx-auto flex items-center justify-center text-lg font-bold">
      TEMOIGNAGES
    </div>
    <TempsFort /> 
  </div>
</template>

<script>
import Loader from '@/components/frontend/loader/Loader.vue'; // Assurez-vous que le chemin est correct
import HeroBanner from '@/components/frontend/heroBanner/HeroBanner.vue'
import News from '@/components/frontend/new/News.vue'
import Partners from '@/components/frontend/partner/Partners.vue'
import TempsFort from '@/components/frontend/tempsFort/TempsFort.vue'
import Separator from '@/components/frontend/separator/Separator.vue'

export default {
  name: 'Home',
  components: {
    Loader,
    HeroBanner,
    News,
    Partners,
    TempsFort,
    Separator
  },
 
}
</script>
