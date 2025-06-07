<template>
  <v-app>
    <!-- Основная визитка пользователя -->
    <BusinessCard />
  </v-app>
</template>

<script>
import BusinessCard from './components/BusinessCard.vue'

export default {
  name: 'App',
  components: {
    BusinessCard
  }
}
</script>

<style>
/* Глобальные стили для Telegram Mini App */
html, body {
  margin: 0;
  padding: 0;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#app {
  min-height: 100vh;
}
</style> 