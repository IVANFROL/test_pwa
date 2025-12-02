# Инструкция по деплою на Vercel

## Подготовка к деплою

Все файлы готовы для деплоя на Vercel.

## Git команды для первого коммита

```bash
# Инициализация репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "first commit"

# Переименование ветки в main
git branch -M main

# Добавление remote репозитория
git remote add origin https://github.com/IVANFROL/test_pwa.git

# Push в GitHub
git push -u origin main
```

## Деплой на Vercel

### Вариант 1: Через веб-интерфейс Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "Add New Project"
4. Выберите репозиторий `IVANFROL/test_pwa`
5. Vercel автоматически определит настройки из `vercel.json`
6. Нажмите "Deploy"

### Вариант 2: Через Vercel CLI

```bash
# Установка Vercel CLI (если еще не установлен)
npm i -g vercel

# Деплой
vercel

# Для production
vercel --prod
```

## Настройки проекта на Vercel

Vercel автоматически определит:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Все настройки уже в `vercel.json`.

## После деплоя

1. Приложение будет доступно по адресу: `https://your-project.vercel.app`
2. PWA будет работать автоматически
3. Service Worker зарегистрируется автоматически
4. Можно установить как PWA на мобильных устройствах

## Проверка PWA

После деплоя проверьте:
- ✅ Манифест доступен: `https://your-project.vercel.app/manifest.webmanifest`
- ✅ Service Worker работает: `https://your-project.vercel.app/sw.js`
- ✅ Иконки загружаются корректно
- ✅ Safe-area работает на мобильных устройствах

## Обновление

При каждом push в main ветку Vercel автоматически пересоберет и задеплоит проект.

