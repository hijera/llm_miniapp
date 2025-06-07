<template>
  <!-- Основная карточка визитки -->
  <v-card 
    class="business-card mx-auto"
    :style="{ 
      background: cardGradient,
      border: `2px solid ${settings.cardColor}20`
    }"
    elevation="8"
    rounded="xl"
  >
    <!-- Заголовок карточки -->
    <v-card-title class="text-center pa-4">
      <div class="d-flex align-center justify-center">
        <v-icon 
          icon="mdi-card-account-details" 
          color="white"
          class="me-2"
        />
        <span class="text-white font-weight-bold text-h6">
          Моя визитка
        </span>
      </div>
    </v-card-title>

    <v-card-text class="pa-6">
      <!-- Аватар пользователя -->
      <UserAvatar 
        :photo-url="user.photo_url"
        :name="user.first_name"
        class="mb-4"
      />

      <!-- Информация о пользователе -->
      <UserInfo 
        :user="user"
        :settings="settings"
      />

      <!-- Дополнительная информация -->
      <AdditionalInfo 
        v-if="settings.description || settings.website"
        :description="settings.description"
        :website="settings.website"
        class="mt-4"
      />
    </v-card-text>

    <!-- Декоративные элементы -->
    <div class="decorative-elements">
      <div class="floating-circle circle-1"></div>
      <div class="floating-circle circle-2"></div>
      <div class="floating-circle circle-3"></div>
    </div>
  </v-card>
</template>

<script>
import { computed } from 'vue'
import UserAvatar from './UserAvatar.vue'
import UserInfo from './UserInfo.vue'
import AdditionalInfo from './AdditionalInfo.vue'

export default {
  name: 'BusinessCardView',
  components: {
    UserAvatar,
    UserInfo,
    AdditionalInfo
  },
  props: {
    // Данные пользователя
    user: {
      type: Object,
      required: true
    },
    // Настройки визитки
    settings: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // Создаем градиент для фона карточки
    const cardGradient = computed(() => {
      const color = props.settings.cardColor
      return `linear-gradient(135deg, ${color} 0%, ${color}CC 50%, ${color}99 100%)`
    })

    return {
      cardGradient
    }
  }
}
</script>

<style scoped>
.business-card {
  position: relative;
  overflow: hidden;
  max-width: 400px;
  min-height: 500px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1) inset;
}

/* Декоративные элементы */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  right: -40px;
  animation-delay: 0s;
}

.circle-2 {
  width: 120px;
  height: 120px;
  bottom: 20%;
  left: -60px;
  animation-delay: 2s;
}

.circle-3 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.3;
  }
}

/* Анимация появления карточки */
.business-card {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 