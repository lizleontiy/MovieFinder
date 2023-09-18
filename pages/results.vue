<template>
  <Head>
    <Title>Results</Title>
  </Head>
  <ElRow
    justify="center"
  >
    <ElCol>
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
        v-slot="{item, inited}"
        :data="movies"
        :breakpoints="breakpoints"
        >
        <ResultsCard
          v-if="inited"
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
  const { movies } = storeToRefs(movieStore)
  const { updateMovies } = movieStore
  const isNoResults = ref(false)

  useMovieSearch<MovieResponse>({s: route.query.search}).then(({data}) => {
    if (data?.value?.Response === 'True') {
      updateMovies(data.value.Search as Movie[])
    } else {
      isNoResults.value = true
      updateMovies([])
    }
  })
  .catch(({error}) => {
    console.warn(error)
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
    return movies.value.length > 0 && !isNoResults.value
  })
</script>
