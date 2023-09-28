<template>
  <Swiper
    :breakpoints="breakpoints"
    :navigation="true"
    :modules="[SwiperNavigation]"
    @swiper="onInit"
  >
    <SwiperSlide
      v-for="(item, i) in data"
      :key="i"
    >
      <slot
        :item="item"
        index="i"
        :inited="inited"
      />
    </SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
  let inited = ref(false)
  /* eslint-disable @typescript-eslint/no-explicit-any */
  defineProps<{
    data: any,
    breakpoints: any,
  }>()
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const onInit = () => {
    inited.value = true
  }
</script>