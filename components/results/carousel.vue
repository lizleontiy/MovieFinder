<template>
  <Swiper
    :breakpoints="breakpoints"
    :navigation="true"
    :modules="[SwiperNavigation]"
  >
    <SwiperSlide v-for="(movie, i) in movies" :key="i">
      <ResultsCard
        :movie="movie"
        @click="goToMoviePage(movie.Title)"
      />
    </SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
  import { Movie } from '@/types/Movie'
  import { PAGE } from '@/utils/const'

  const breakpoints = {
    '640': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '1024': {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  }

  const { movies } = defineProps<{
    movies: Movie[],
  }>()

  function goToMoviePage(title: string) {
    localStorage.setItem('title', title)
    return navigateTo({
      path: PAGE.DETAILS,
    })
  }
</script>