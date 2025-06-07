# 🚀 Инструкция по деплою на GitHub Pages

## Шаг 1: Подготовка репозитория

1. Создайте репозиторий на GitHub или используйте существующий
2. Загрузите все файлы проекта в репозиторий

## Шаг 2: Настройка базового пути

⚠️ **ВАЖНО:** Измените название репозитория в файле `vite.config.js`

```javascript
// В строке 6 замените 'llm_miniapp' на название вашего репозитория
base: process.env.NODE_ENV === 'production' ? '/ВАШ-РЕПОЗИТОРИЙ/' : '/',
```

Например, если ваш репозиторий называется `telegram-business-card`:
```javascript
base: process.env.NODE_ENV === 'production' ? '/telegram-business-card/' : '/',
```

## Шаг 3: Включение GitHub Pages

1. Перейдите в **Settings** вашего репозитория
2. Найдите раздел **Pages** в боковом меню
3. В разделе **Source** выберите **"GitHub Actions"**
4. Сохраните настройки

## Шаг 4: Деплой

1. **Пушьте код** в ветку `main`:
   ```bash
   git add .
   git commit -m "Deploy Telegram Mini App"
   git push origin main
   ```

2. **Автоматически запустится** GitHub Action из файла `.github/workflows/deploy.yml`

3. **Проверьте статус** деплоя:
   - Перейдите во вкладку **Actions** в репозитории
   - Дождитесь завершения workflow (зеленая галочка)

4. **Приложение будет доступно** по адресу:
   ```
   https://ВАШ-USERNAME.github.io/ВАШ-РЕПОЗИТОРИЙ/
   ```

## Шаг 5: Настройка Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Используйте команду `/newapp`
3. Укажите URL: `https://ВАШ-USERNAME.github.io/ВАШ-РЕПОЗИТОРИЙ/`
4. Настройте меню бота: `/setmenubutton`

## Локальное тестирование

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev

# Сборка
npm run build

# Превью сборки
npm run preview
```

## Структура файлов

```
dist/                     # Папка со сборкой (автогенерируется)
├── assets/              # CSS, JS файлы
├── index.html          # Главная страница
└── .nojekyll           # Отключение Jekyll

.github/workflows/       # GitHub Actions
└── deploy.yml          # Автоматический деплой

src/                     # Исходный код
├── App.vue             # Главный компонент
├── main.js             # Точка входа
└── components/         # Vue компоненты
```

## Устранение проблем

### Проблема: Белый экран после деплоя
**Решение:** Проверьте правильность базового пути в `vite.config.js`

### Проблема: Ресурсы не загружаются
**Решение:** Убедитесь, что название репозитория в `base` совпадает с реальным

### Проблема: GitHub Actions не запускается
**Решение:** Проверьте, что в Settings → Pages выбран источник "GitHub Actions"

## Дополнительные команды

```bash
# Принудительная сборка для GitHub
npm run build:github

# Локальный превью + сборка
npm run deploy:preview
```

🎉 **Готово!** Ваше Telegram Mini App доступно в интернете! 