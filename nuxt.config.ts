// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  css: [
    '~/assets/style/reset.scss',
    '~/assets/style/general.scss',
    '~/assets/style/header.scss',
    '~/assets/style/footer.scss'
  ],
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
  ],
})
