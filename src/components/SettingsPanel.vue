<template>
  <v-expansion-panels 
    v-model="panel"
    variant="accordion"
    class="mb-4"
  >
    <v-expansion-panel>
      <v-expansion-panel-title>
        <div class="d-flex align-center">
          <v-icon 
            icon="mdi-cog" 
            class="me-2" 
          />
          <span class="font-weight-bold">
            Настройки визитки
          </span>
        </div>
      </v-expansion-panel-title>
      
      <v-expansion-panel-text>
        <div class="settings-content">
          <!-- Переключатель показа ID -->
          <v-switch
            v-model="localShowId"
            label="Показывать мой ID"
            color="primary"
            hide-details
            class="mb-4"
          />

          <!-- Выбор цвета визитки -->
          <div class="mb-4">
            <v-label class="mb-2 d-block font-weight-bold">
              Цвет визитки
            </v-label>
            <div class="color-picker-grid">
              <v-btn
                v-for="color in colorOptions"
                :key="color.value"
                :color="color.value"
                :variant="localCardColor === color.value ? 'flat' : 'outlined'"
                size="small"
                class="ma-1 color-btn"
                @click="localCardColor = color.value"
              >
                <v-icon 
                  v-if="localCardColor === color.value"
                  icon="mdi-check"
                  color="white"
                />
              </v-btn>
            </div>
          </div>

          <!-- Описание -->
          <v-textarea
            v-model="localDescription"
            label="Описание о себе"
            placeholder="Расскажите немного о себе..."
            rows="3"
            counter="150"
            maxlength="150"
            variant="outlined"
            class="mb-4"
          />

          <!-- Веб-сайт -->
          <v-text-field
            v-model="localWebsite"
            label="Веб-сайт"
            placeholder="example.com"
            prepend-inner-icon="mdi-web"
            variant="outlined"
            class="mb-4"
            @blur="formatWebsite"
          />

          <!-- Сброс настроек -->
          <v-btn
            variant="outlined"
            color="warning"
            prepend-icon="mdi-restore"
            block
            @click="resetSettings"
          >
            Сбросить настройки
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'SettingsPanel',
  props: {
    // Показывать ли ID
    showId: {
      type: Boolean,
      default: true
    },
    // Цвет визитки
    cardColor: {
      type: String,
      default: '#2AABEE'
    },
    // Описание
    description: {
      type: String,
      default: ''
    },
    // Веб-сайт
    website: {
      type: String,
      default: ''
    }
  },
  emits: [
    'update:showId',
    'update:cardColor', 
    'update:description',
    'update:website'
  ],
  setup(props, { emit }) {
    const panel = ref([])

    // Локальные значения для v-model
    const localShowId = ref(props.showId)
    const localCardColor = ref(props.cardColor)
    const localDescription = ref(props.description)
    const localWebsite = ref(props.website)

    // Цветовые опции
    const colorOptions = [
      { name: 'Telegram Blue', value: '#2AABEE' },
      { name: 'Purple', value: '#9C88FF' },
      { name: 'Pink', value: '#FF6B9D' },
      { name: 'Orange', value: '#FF8C42' },
      { name: 'Green', value: '#4CAF50' },
      { name: 'Red', value: '#F44336' },
      { name: 'Teal', value: '#009688' },
      { name: 'Deep Purple', value: '#673AB7' }
    ]

    // Форматирование веб-сайта
    const formatWebsite = () => {
      if (localWebsite.value) {
        // Убираем протокол для отображения
        localWebsite.value = localWebsite.value.replace(/^https?:\/\//i, '')
        // Убираем завершающий слеш
        localWebsite.value = localWebsite.value.replace(/\/$/, '')
      }
    }

    // Сброс настроек
    const resetSettings = () => {
      localShowId.value = true
      localCardColor.value = '#2AABEE'
      localDescription.value = ''
      localWebsite.value = ''
    }

    // Watchers для синхронизации с родительским компонентом
    watch(localShowId, (newValue) => {
      emit('update:showId', newValue)
    })

    watch(localCardColor, (newValue) => {
      emit('update:cardColor', newValue)
    })

    watch(localDescription, (newValue) => {
      emit('update:description', newValue)
    })

    watch(localWebsite, (newValue) => {
      emit('update:website', newValue)
    })

    // Обновляем локальные значения при изменении props
    watch(() => props.showId, (newValue) => {
      localShowId.value = newValue
    })

    watch(() => props.cardColor, (newValue) => {
      localCardColor.value = newValue
    })

    watch(() => props.description, (newValue) => {
      localDescription.value = newValue
    })

    watch(() => props.website, (newValue) => {
      localWebsite.value = newValue
    })

    return {
      panel,
      localShowId,
      localCardColor,
      localDescription,
      localWebsite,
      colorOptions,
      formatWebsite,
      resetSettings
    }
  }
}
</script>

<style scoped>
.settings-content {
  padding: 8px 0;
}

.color-picker-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-btn {
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 12px;
}

.v-expansion-panel {
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  overflow: hidden;
}

.v-expansion-panel-title {
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
}
</style> 