<template>
  <v-container fluid class="pa-4">
    <!-- Настройки визитки -->
    <SettingsPanel 
      v-model:showId="settings.showId"
      v-model:cardColor="settings.cardColor"
      v-model:description="settings.description"
      v-model:website="settings.website"
    />

    <!-- Сама визитка -->
    <BusinessCardView 
      ref="businessCardRef"
      :user="user"
      :settings="settings"
      class="my-4"
    />

    <!-- Кнопки действий -->
    <ActionButtons
      :loading="loading"
      @copy="copyBusinessCard"
      @save-image="saveAsImage"
      @close="closeApp"
    />

    <!-- Уведомления -->
    <v-snackbar 
      v-model="snackbar.show" 
      :color="snackbar.color" 
      :timeout="3000"
      location="top"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import html2canvas from 'html2canvas'
import BusinessCardView from './BusinessCardView.vue'
import SettingsPanel from './SettingsPanel.vue'
import ActionButtons from './ActionButtons.vue'

export default {
  name: 'BusinessCard',
  components: {
    BusinessCardView,
    SettingsPanel,
    ActionButtons
  },
  setup() {
    // Реактивные данные
    const user = ref({
      id: null,
      first_name: 'Пользователь',
      last_name: '',
      username: '',
      photo_url: null
    })

    const settings = reactive({
      showId: true,
      cardColor: '#2AABEE',
      description: '',
      website: ''
    })

    const loading = ref(false)
    const businessCardRef = ref(null)

    const snackbar = reactive({
      show: false,
      text: '',
      color: 'success'
    })

    // Показать уведомление
    const showSnackbar = (text, color = 'success') => {
      snackbar.text = text
      snackbar.color = color
      snackbar.show = true
    }

    // Инициализация Telegram WebApp
    const initTelegramWebApp = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp
        
        // Расширяем WebApp на весь экран
        tg.expand()
        
        // Получаем данные пользователя
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
          const tgUser = tg.initDataUnsafe.user
          user.value = {
            id: tgUser.id,
            first_name: tgUser.first_name || 'Пользователь',
            last_name: tgUser.last_name || '',
            username: tgUser.username || '',
            photo_url: tgUser.photo_url || null
          }
        }

        // Применяем тему Telegram
        if (tg.themeParams) {
          document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff')
          document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000')
        }

        console.log('Telegram WebApp инициализирован:', tg)
      } else {
        console.warn('Telegram WebApp недоступен, используем тестовые данные')
        // Тестовые данные для разработки
        user.value = {
          id: 123456789,
          first_name: 'Иван',
          last_name: 'Петров',
          username: 'ivan_petrov',
          photo_url: null
        }
      }
    }

    // Копировать визитку в буфер
    const copyBusinessCard = async () => {
      try {
        loading.value = true
        
        const cardText = `🎯 Моя визитка
👤 ${user.value.first_name} ${user.value.last_name}
${user.value.username ? `📱 @${user.value.username}` : ''}
${settings.showId ? `🆔 ID: ${user.value.id}` : ''}
${settings.description ? `📝 ${settings.description}` : ''}
${settings.website ? `🌐 ${settings.website}` : ''}`

        await navigator.clipboard.writeText(cardText)
        
        // Вибрация если доступна
        if (window.Telegram && window.Telegram.WebApp.HapticFeedback) {
          window.Telegram.WebApp.HapticFeedback.impactOccurred('medium')
        }
        
        showSnackbar('Визитка скопирована в буфер! 📋')
      } catch (error) {
        console.error('Ошибка копирования:', error)
        showSnackbar('Не удалось скопировать визитку', 'error')
      } finally {
        loading.value = false
      }
    }

    // Сохранить как изображение
    const saveAsImage = async () => {
      try {
        loading.value = true
        
        if (!businessCardRef.value) {
          throw new Error('Не найден элемент карточки')
        }

        const canvas = await html2canvas(businessCardRef.value.$el, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false
        })

        // Создаем ссылку для скачивания
        const link = document.createElement('a')
        link.download = `визитка_${user.value.first_name}_${Date.now()}.png`
        link.href = canvas.toDataURL()
        link.click()

        showSnackbar('Визитка сохранена как изображение! 🖼️')
      } catch (error) {
        console.error('Ошибка сохранения:', error)
        showSnackbar('Не удалось сохранить изображение', 'error')
      } finally {
        loading.value = false
      }
    }

    // Закрыть приложение
    const closeApp = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.close()
      } else {
        showSnackbar('Приложение может быть закрыто только в Telegram')
      }
    }

    // Инициализация при монтировании
    onMounted(() => {
      initTelegramWebApp()
    })

    return {
      user,
      settings,
      loading,
      businessCardRef,
      snackbar,
      copyBusinessCard,
      saveAsImage,
      closeApp
    }
  }
}
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 0 auto;
}
</style> 