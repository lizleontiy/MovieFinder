<template>
  <Head>
    <Title>Results</Title>
  </Head>
  <ElRow
    v-loading="isLoadingMovies"
    justify="center"
  >
    <ElCol v-if="!isLoadingMovies">
      <h1 class="page-title" v-if="!isNoResults">
        Results
      </h1>
      <template v-else>
        <NoResults/>
      </template>
    </ElCol>
    <ElCol
      v-show="movies.length > 0"
      :lg="18"
      :xl="14"
    >
      <ResultsCarousel
        :movies="movies"/>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'default'
  })
  import { MovieResponse, Movie } from '@/types/Movie'
  import { storeToRefs } from 'pinia'
  import { useMoviesStore } from '@/stores/movies'
  const loading = ref(true)
  const isNoResults = ref(false)
  const movieStore = useMoviesStore()
  const { movies, isLoadingMovies } = storeToRefs(movieStore)
  const { updateIsLoadingMovies, updateMovies } = movieStore

  const route = useRoute()

  onMounted(() => {
    updateIsLoadingMovies(true)
    useMovieSearch<MovieResponse>({s: route.query.search}).then((data: MovieResponse) => {
      const response: MovieResponse = data
      updateIsLoadingMovies(false)
      if (response.Response === 'True') {
        updateMovies(response.Search as Movie[])
      } else {
        isNoResults.value = true
      }
    }).catch((err) => {
      console.warn(err)
    })
  })

  watch(movies, (newVal) => {
    if (Array.isArray(newVal) && newVal.length > 0) {
      loading.value = false
    }
  })
</script>
