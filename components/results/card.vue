<template>
  <ElCard
    class="movie-card"
    :body-style="{ padding: '0px' }"
  >
    <img
      :src="poster"
      class="movie-card__image"
    />
    <div class="movie-card__info">
      <p>{{ movie.Title }}</p>
      <p>{{ movie.Year }}</p>
    </div>
  </ElCard>
</template>

<script setup lang="ts">
  import { Movie } from '@/types/Movie'

  const props = defineProps<{
    movie: Movie
  }>()
  const placeholder = '/img/placeholder.png'

  const isPosterAvailable = computed(() => {
    return props.movie.Poster !== 'N/A'
  })
  const poster = computed(() => {
    return isPosterAvailable.value ? props.movie.Poster : placeholder
  })
</script>

<style lang="scss">
@import "~/assets/style/movie-card.scss";
</style>