<template>
  <ElHeader class="header">
    <ElRow align="middle">
      <ElCol>
        <p
          v-if="isRoot"
          class="header__bg header__title"
        >
          MovieFinder
        </p>
        <NuxtLink
          v-else
          to="/"
          class="header__link"
        >
          <p class="header__bg header__title">
            MovieFinder
          </p>
        </NuxtLink>
      </ElCol>
    </ElRow>
  </ElHeader>
</template>

<script setup lang="ts">
  import { PAGE } from '@/utils/const'

  const route = useRoute()
  const isRoot = ref(true)

  watch(() => route.fullPath, (value) => {
    isRoot.value = value === PAGE.INDEX
  }, {
    deep: true,
    immediate: true
  })
</script>