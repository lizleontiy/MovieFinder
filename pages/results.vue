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
        v-slot="{item}"
        :data="movies"
        :breakpoints="breakpoints"
      >
        <ResultsCard
          :movie="item"
          @click="goToMoviePage(item.imdbID)"
        />
      </ResultsCarousel>
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

  const route = useRoute()
  const movieStore = useMoviesStore()
  const { movies, isLoadingMovies } = storeToRefs(movieStore)
  const { updateIsLoadingMovies, updateMovies } = movieStore
  const loading = ref(true)
  const isNoResults = ref(false)

  onMounted(() => {
    updateIsLoadingMovies(true)
    useMovieSearch<MovieResponse>({s: route.query.search}).then((data: MovieResponse) => {
      const response: MovieResponse = data
      updateIsLoadingMovies(false)
      if (response.Response === 'True') {
        updateMovies(response.Search as Movie[])
      } else {
        isNoResults.value = true
        updateMovies([])
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
