<template>
  <footer class="py-8 bg-footer-bg">
    <div class="container mx-auto">
      <div class="grid grid-cols-4 gap-8">
        <div>
          <h3 class="mb-4 font-bold">Pages</h3>
          <ul>
            <li><a href="#" class="text-gray-700 hover:text-button-green">Accueil</a></li>
            <li><a href="#" class="text-gray-700 hover:text-button-green">Congrès</a></li>
            <li><a href="#" class="text-gray-700 hover:text-button-green">Participer</a></li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 font-bold">Support</h3>
          <ul>
            <li><a href="#" class="text-gray-700 hover:text-button-green">FAQ</a></li>
            <li><a href="#" class="text-gray-700 hover:text-button-green">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 font-bold">Légal</h3>
          <ul>
            <li><a href="#" class="text-gray-700 hover:text-button-green">Conditions d'utilisation</a></li>
            <li><a href="#" class="text-gray-700 hover:text-button-green">Politique de confidentialité</a></li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 font-bold">Newsletter</h3>
          <form @submit.prevent="submitNewsletter" class="flex">
            <input type="email" placeholder="Votre email" class="flex-grow p-2 border rounded-l" required>
            <button type="submit" class="px-4 py-2 text-white rounded-r bg-button-dark-green">S'abonner</button>
          </form>
        </div>
      </div>
      <div class="mt-8 text-center text-gray-600">
        <p>&copy; 2024 Congrès Ndogbatjeck. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    submitNewsletter() {
      // Logique pour traiter l'abonnement à la newsletter
      console.log('Abonnement à la newsletter soumis');
    }
  }
}
</script>