<template>
  <ElHeader class="header">
    <ElRow align="middle">
      <ElCol>
        <p class="header__bg header__title" v-if="isRoot">
          MovieFinder
        </p>
        <NuxtLink to="/" class="header__link" v-else>
          <p class="header__bg header__title">
            MovieFinder
          </p>
        </NuxtLink>
      </ElCol>
    </ElRow>
  </ElHeader>
</template>

<script setup lang="ts">
  const route = useRoute()
  const isRoot = ref(true)

  watch(() => route.fullPath, (value) => {
    isRoot.value = value === '/'
  }, {deep: true, immediate: true})
</script>