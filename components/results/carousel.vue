<template>
  <Swiper
    :breakpoints="breakpoints"
    :navigation="true"
    :modules="[SwiperNavigation]"
  >
    <SwiperSlide v-for="(item, i) in data" :key="i">
      <slot :item="item" index="i"/>
    </SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
  const props = defineProps<{
    data: any,
    breakpoints: any,
  }>()
</script>