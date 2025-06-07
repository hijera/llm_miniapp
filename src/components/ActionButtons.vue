<template>
  <div class="action-buttons">
    <!-- Основная кнопка копирования -->
    <v-btn
      color="primary"
      size="large"
      block
      class="mb-3 copy-btn"
      :loading="loading"
      prepend-icon="mdi-content-copy"
      variant="flat"
      rounded="xl"
      @click="$emit('copy')"
    >
      <span class="font-weight-bold">
        Скопировать визитку
      </span>
    </v-btn>

    <!-- Дополнительные действия -->
    <div class="d-flex gap-3">
      <!-- Сохранить как изображение -->
      <v-btn
        color="secondary"
        variant="outlined"
        :loading="loading"
        prepend-icon="mdi-download"
        class="flex-1 save-btn"
        rounded="xl"
        @click="$emit('save-image')"
      >
        <span class="d-none d-sm-inline">Сохранить PNG</span>
        <span class="d-sm-none">PNG</span>
      </v-btn>

      <!-- Поделиться (только в Telegram) -->
      <v-btn
        v-if="isTelegramWebApp"
        color="accent"
        variant="outlined"
        prepend-icon="mdi-share"
        class="flex-1 share-btn"
        rounded="xl"
        @click="shareBusinessCard"
      >
        <span class="d-none d-sm-inline">Поделиться</span>
        <span class="d-sm-none">Share</span>
      </v-btn>

      <!-- Закрыть приложение -->
      <v-btn
        color="warning"
        variant="outlined"
        prepend-icon="mdi-close"
        class="flex-1 close-btn"
        rounded="xl"
        @click="$emit('close')"
      >
        <span class="d-none d-sm-inline">Закрыть</span>
        <span class="d-sm-none">✕</span>
      </v-btn>
    </div>

    <!-- Telegram MainButton (альтернатива) -->
    <TelegramMainButton
      v-if="isTelegramWebApp && showMainButton"
      text="Скопировать визитку"
      @click="$emit('copy')"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import TelegramMainButton from './TelegramMainButton.vue'

export default {
  name: 'ActionButtons',
  components: {
    TelegramMainButton
  },
  props: {
    // Состояние загрузки
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['copy', 'save-image', 'close'],
  setup() {
    const showMainButton = ref(false) // Можно включить по желанию

    // Проверяем, работаем ли мы в Telegram WebApp
    const isTelegramWebApp = computed(() => {
      return !!(window.Telegram && window.Telegram.WebApp)
    })

    // Поделиться визиткой через Telegram
    const shareBusinessCard = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        // Используем Telegram WebApp API для шаринга
        const shareText = "Посмотри мою визитку! 🎯"
        
        // Можно использовать HapticFeedback
        if (window.Telegram.WebApp.HapticFeedback) {
          window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
        }

        // Telegram WebApp не имеет прямого API для шаринга, 
        // но можно попросить пользователя переслать
        alert('Скопируйте визитку и поделитесь ей в любом чате!')
      }
    }

    return {
      isTelegramWebApp,
      showMainButton,
      shareBusinessCard
    }
  }
}
</script>

<style scoped>
.action-buttons {
  max-width: 400px;
  margin: 0 auto;
}

.copy-btn {
  background: linear-gradient(135deg, #2AABEE 0%, #54C7EC 100%);
  box-shadow: 0 8px 25px rgba(42, 171, 238, 0.3);
  transition: all 0.3s ease;
  animation: pulseButton 2s infinite;
}

.copy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(42, 171, 238, 0.4);
}

.save-btn,
.share-btn,
.close-btn {
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(156, 136, 255, 0.3);
}

.close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 193, 7, 0.3);
}

/* Анимация пульсации для главной кнопки */
@keyframes pulseButton {
  0% {
    box-shadow: 0 8px 25px rgba(42, 171, 238, 0.3);
  }
  50% {
    box-shadow: 0 8px 25px rgba(42, 171, 238, 0.5);
  }
  100% {
    box-shadow: 0 8px 25px rgba(42, 171, 238, 0.3);
  }
}

/* Адаптивные gap'ы */
.gap-3 {
  gap: 12px;
}

@media (max-width: 600px) {
  .gap-3 {
    gap: 8px;
  }
}

/* Анимация появления кнопок */
.action-buttons > * {
  animation: slideUpStagger 0.6s ease-out both;
}

.copy-btn {
  animation-delay: 0.1s;
}

.action-buttons > div:last-child {
  animation-delay: 0.3s;
}

@keyframes slideUpStagger {
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