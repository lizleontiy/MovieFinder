// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  css: [
    '~/assets/style/reset.scss',
    '~/assets/style/general.scss',
    '~/assets/style/layout/header.scss',
    '~/assets/style/layout/footer.scss'
  ],
  modules: [
    ['@pinia/nuxt', { disableVuex: true }],
    '@nuxtjs/eslint-module',
    '@element-plus/nuxt',
    'nuxt-swiper',
  ],
  runtimeConfig: {
    public: {
      OMDB_API_KEY: '30468e4f',
      OMDB_PATH: 'http://www.omdbapi.com/'
    }
  },
  swiper: {
    modules: ['navigation']
  },
})
