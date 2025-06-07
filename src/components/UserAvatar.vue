<template>
  <div class="text-center">
    <!-- Аватар с фото или инициалами -->
    <v-avatar 
      size="120"
      class="user-avatar elevation-6"
      :style="avatarStyle"
    >
      <!-- Если есть фото, показываем его -->
      <v-img 
        v-if="photoUrl" 
        :src="photoUrl" 
        :alt="`Аватар ${name}`"
        cover
        @error="onImageError"
      />
      
      <!-- Если нет фото, показываем инициалы -->
      <div 
        v-else 
        class="avatar-initials text-h3 font-weight-bold"
      >
        {{ initials }}
      </div>
    </v-avatar>
    
    <!-- Декоративное кольцо вокруг аватара -->
    <div class="avatar-ring"></div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'UserAvatar',
  props: {
    // URL фотографии пользователя
    photoUrl: {
      type: String,
      default: null
    },
    // Имя пользователя для инициалов
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const imageError = ref(false)

    // Вычисляем инициалы из имени
    const initials = computed(() => {
      if (!props.name) return '?'
      
      const words = props.name.trim().split(' ')
      if (words.length >= 2) {
        // Берем первые буквы имени и фамилии
        return (words[0][0] + words[1][0]).toUpperCase()
      } else {
        // Берем первые две буквы имени
        return words[0].substring(0, 2).toUpperCase()
      }
    })

    // Стили для аватара без фото
    const avatarStyle = computed(() => {
      if (props.photoUrl && !imageError.value) return {}
      
      // Генерируем цвет на основе имени
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
        '#FFEAA7', '#DDA0DD', '#98D8E8', '#F7DC6F'
      ]
      const colorIndex = (props.name?.charCodeAt(0) || 0) % colors.length
      
      return {
        backgroundColor: colors[colorIndex],
        color: 'white'
      }
    })

    // Обработка ошибки загрузки изображения
    const onImageError = () => {
      imageError.value = true
    }

    return {
      initials,
      avatarStyle,
      onImageError
    }
  }
}
</script>

<style scoped>
.user-avatar {
  position: relative;
  border: 3px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  z-index: 2;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.avatar-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

/* Декоративное кольцо */
.avatar-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: pulse 2s infinite;
  z-index: 1;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
</style> 