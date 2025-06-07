<template>
  <div class="user-info text-center">
    <!-- Имя пользователя -->
    <h2 class="user-name text-white mb-2 text-h4 font-weight-bold">
      {{ fullName }}
    </h2>

    <!-- Username если есть -->
    <div 
      v-if="user.username" 
      class="username-container mb-3"
    >
      <v-chip
        color="rgba(255,255,255,0.2)"
        text-color="white"
        size="small"
        prepend-icon="mdi-at"
        variant="flat"
      >
        {{ user.username }}
      </v-chip>
    </div>

    <!-- ID пользователя если включен в настройках -->
    <div 
      v-if="settings.showId && user.id" 
      class="user-id-container mb-3"
    >
      <v-chip
        color="rgba(255,255,255,0.15)"
        text-color="white"
        size="small"
        prepend-icon="mdi-identifier"
        variant="flat"
      >
        ID: {{ formattedId }}
      </v-chip>
    </div>

    <!-- Дата присоединения к Telegram (если доступна) -->
    <div 
      v-if="joinDate" 
      class="join-date mt-2"
    >
      <v-chip
        color="rgba(255,255,255,0.1)"
        text-color="white"
        size="x-small"
        prepend-icon="mdi-calendar"
        variant="flat"
      >
        В Telegram с {{ joinDate }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'UserInfo',
  props: {
    // Данные пользователя
    user: {
      type: Object,
      required: true
    },
    // Настройки отображения
    settings: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // Полное имя пользователя
    const fullName = computed(() => {
      const firstName = props.user.first_name || ''
      const lastName = props.user.last_name || ''
      return `${firstName} ${lastName}`.trim() || 'Пользователь'
    })

    // Форматированный ID (разделяем разряды)
    const formattedId = computed(() => {
      if (!props.user.id) return ''
      return props.user.id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    })

    // Примерная дата присоединения к Telegram на основе ID
    // (ID в Telegram выдаются последовательно, первые пользователи получили ID в 2013 году)
    const joinDate = computed(() => {
      if (!props.user.id) return null
      
      // Примерный расчет: первые ID выдавались в 2013, каждый день ~ 100k новых пользователей
      const baseDate = new Date('2013-08-14') // Примерная дата запуска Telegram
      const approximateDaysOffset = Math.floor(props.user.id / 100000)
      const estimatedDate = new Date(baseDate.getTime() + (approximateDaysOffset * 24 * 60 * 60 * 1000))
      
      // Если дата слишком в будущем, не показываем
      if (estimatedDate > new Date()) return null
      
      return estimatedDate.getFullYear()
    })

    return {
      fullName,
      formattedId,
      joinDate
    }
  }
}
</script>

<style scoped>
.user-info {
  position: relative;
  z-index: 2;
}

.user-name {
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  letter-spacing: 0.5px;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.username-container,
.user-id-container {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.join-date {
  animation: fadeInUp 0.6s ease-out 0.6s both;
}

.v-chip {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.v-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
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