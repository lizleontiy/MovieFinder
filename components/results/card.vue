<template>
  <ElCard
    class="movie-card"
    :body-style="{ padding: '0px' }"
  >
    <img
      :src="posterPath"
      class="movie-card__image"
    />
    <div class="movie-card__info">
      <p>{{ movie.Title }} ({{ movie.Year }})</p>
    </div>
  </ElCard>
</template>

<script setup lang="ts">
  import { Movie } from '@/types/Movie'

  const props = defineProps<{
    movie: Movie
  }>()
  const poster = isEmptyField(props.movie.Poster) ? undefined : props.movie.Poster
  const posterPath = usePoster(poster)
</script>

<style lang="scss">
@import "~/assets/style/components/movie-card.scss"
</style>