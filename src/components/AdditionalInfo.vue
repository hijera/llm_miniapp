<template>
  <div class="additional-info">
    <!-- Описание пользователя -->
    <div 
      v-if="description" 
      class="description-section mb-3"
    >
      <v-card
        color="rgba(255,255,255,0.1)"
        variant="flat"
        rounded="lg"
        class="pa-3"
      >
        <div class="d-flex align-center mb-2">
          <v-icon 
            icon="mdi-text" 
            color="white" 
            size="small"
            class="me-2"
          />
          <span class="text-white text-caption font-weight-bold">
            О себе
          </span>
        </div>
        <p class="text-white text-body-2 mb-0">
          {{ description }}
        </p>
      </v-card>
    </div>

    <!-- Веб-сайт -->
    <div 
      v-if="website" 
      class="website-section"
    >
      <v-card
        color="rgba(255,255,255,0.1)"
        variant="flat"
        rounded="lg"
        class="pa-3"
        :href="websiteUrl"
        target="_blank"
        :ripple="true"
        hover
        @click="openWebsite"
      >
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon 
              icon="mdi-web" 
              color="white" 
              size="small"
              class="me-2"
            />
            <div>
              <div class="text-white text-caption font-weight-bold mb-1">
                Мой сайт
              </div>
              <div class="text-white text-body-2">
                {{ displayWebsite }}
              </div>
            </div>
          </div>
          <v-icon 
            icon="mdi-open-in-new" 
            color="white" 
            size="small"
          />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'AdditionalInfo',
  props: {
    // Описание пользователя
    description: {
      type: String,
      default: ''
    },
    // Веб-сайт пользователя
    website: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // Правильный URL для сайта
    const websiteUrl = computed(() => {
      if (!props.website) return ''
      
      // Добавляем https:// если протокол не указан
      if (!/^https?:\/\//i.test(props.website)) {
        return `https://${props.website}`
      }
      return props.website
    })

    // Отображаемый текст сайта (без протокола)
    const displayWebsite = computed(() => {
      if (!props.website) return ''
      return props.website.replace(/^https?:\/\//i, '')
    })

    // Открыть сайт
    const openWebsite = () => {
      if (websiteUrl.value) {
        // В Telegram WebApp используем специальный метод
        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.openLink(websiteUrl.value)
        } else {
          window.open(websiteUrl.value, '_blank')
        }
      }
    }

    return {
      websiteUrl,
      displayWebsite,
      openWebsite
    }
  }
}
</script>

<style scoped>
.additional-info {
  animation: fadeInUp 0.6s ease-out 0.8s both;
}

.v-card {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.1);
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  background: rgba(255,255,255,0.15) !important;
}

.website-section .v-card {
  cursor: pointer;
}

.description-section .v-card {
  cursor: default;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 