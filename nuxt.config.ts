import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  css: [
    '~/assets/css/main.css',
  ],
  plugins: [
    '~/plugins/axios'
  ]
});
