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
      v-show="showResults"
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
    useMovieSearch(route.query.search).then((data: MovieResponse) => {
      const response: MovieResponse = data
      if (response.Response === 'True') {
        updateIsLoadingMovies(false)
        updateMovies(response.Search as Movie[])
      } else {
        updateIsLoadingMovies(false)
        isNoResults.value = true
        updateMovies([])
      }
    })
  })

  watch(movies, (newVal) => {
    if (Array.isArray(newVal) && newVal.length > 0) {
      loading.value = false
    }
  })

  const goToMoviePage = (id: string) =>  {
    return navigateTo({
      path: `/movie/details`,
      query: {
        id,
      }
    })
  }

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

  const showResults = computed(() => {
    return movies.value.length > 0 && !isNoResults.value && !isLoadingMovies.value
  })
</script>
