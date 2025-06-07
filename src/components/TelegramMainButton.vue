<template>
  <!-- Этот компонент не рендерит визуальные элементы, 
       а управляет MainButton через Telegram WebApp API -->
  <div></div>
</template>

<script>
import { onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'TelegramMainButton',
  props: {
    // Текст кнопки
    text: {
      type: String,
      default: 'Продолжить'
    },
    // Цвет кнопки
    color: {
      type: String,
      default: null
    },
    // Цвет текста
    textColor: {
      type: String,
      default: null
    },
    // Показывать ли кнопку
    show: {
      type: Boolean,
      default: true
    },
    // Активна ли кнопка
    enabled: {
      type: Boolean,
      default: true
    },
    // Показывать ли индикатор загрузки
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    let mainButton = null

    // Инициализация MainButton
    const initMainButton = () => {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.MainButton) {
        mainButton = window.Telegram.WebApp.MainButton
        
        // Настраиваем кнопку
        updateButton()
        
        // Добавляем обработчик клика
        mainButton.onClick(handleClick)
        
        // Показываем кнопку
        if (props.show) {
          mainButton.show()
        }
      }
    }

    // Обновление настроек кнопки
    const updateButton = () => {
      if (!mainButton) return

      // Устанавливаем текст
      mainButton.setText(props.text)
      
      // Устанавливаем цвета (если указаны)
      if (props.color) {
        mainButton.setParams({ color: props.color })
      }
      
      if (props.textColor) {
        mainButton.setParams({ text_color: props.textColor })
      }
      
      // Управляем состоянием кнопки
      if (props.enabled && !props.loading) {
        mainButton.enable()
      } else {
        mainButton.disable()
      }
      
      // Показываем/скрываем прогресс
      if (props.loading) {
        mainButton.showProgress(false) // false = не скрывать текст
      } else {
        mainButton.hideProgress()
      }
    }

    // Обработчик клика
    const handleClick = () => {
      emit('click')
    }

    // Скрытие кнопки
    const hideButton = () => {
      if (mainButton) {
        mainButton.hide()
        mainButton.offClick(handleClick)
      }
    }

    // Watchers для реактивности
    watch(() => props.text, updateButton)
    watch(() => props.color, updateButton)
    watch(() => props.textColor, updateButton)
    watch(() => props.enabled, updateButton)
    watch(() => props.loading, updateButton)
    
    watch(() => props.show, (newValue) => {
      if (!mainButton) return
      
      if (newValue) {
        mainButton.show()
      } else {
        mainButton.hide()
      }
    })

    // Lifecycle hooks
    onMounted(() => {
      // Небольшая задержка для гарантии загрузки Telegram WebApp
      setTimeout(initMainButton, 100)
    })

    onUnmounted(() => {
      hideButton()
    })

    return {}
  }
}
</script>

<style scoped>
/* Этот компонент не имеет визуального представления */
</style> 