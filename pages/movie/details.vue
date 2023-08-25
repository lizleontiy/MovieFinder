<template>
  <Head>
    <Title>Details</Title>
  </Head>
  <ElRow
    v-loading="isLoadingMovieDetails"
    justify="center"
  >
    <ElCol
      v-if="!isLoadingMovieDetails"
      :xs="24"
      :md="20"
      :lg="14"
      :xl="8"
    >
      <h1 
        v-if="!isNoResults"
        class="page-title"
      >
        Details
      </h1>
      <template v-else>
        <NoResults/>
      </template>
      <ElCard class="box-card" v-if="!isNoResults">
        <ElRow
          justify="space-between"
        >
          <ElCol :sm="10" :md="8">
            <el-image
              style="width: 100%; height: 100%"
              :src="poster"
              fit="contain"
            />
          </ElCol>
          <ElCol :sm="13" :md="15">
            <h2 class="details__title">
              {{ movieDetails.Title }}
            </h2>
            <ElText tag="p" v-if="movieDetails.Director">
              Director: {{ movieDetails.Director }}
            </ElText>
            <br/>
            <ElText tag="p" v-if="movieDetails.Year">
              Year: {{ movieDetails.Year }}
            </ElText>
          </ElCol>
        </ElRow>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'default'
  })
  import { storeToRefs } from 'pinia'
  import { MovieDetails } from '@/types/MovieDetails'
  import { useMoviesStore } from '@/stores/movies'

  const movieTitle = ref<string | null>('')
  const movieDetails = ref<MovieDetails>({} as MovieDetails)
  const movieStore = useMoviesStore()
  const { updateIsLoadingMovieDetails } = movieStore
  const { isLoadingMovieDetails } = storeToRefs(movieStore)
  const isNoResults = ref(false)
  const poster = ref('')

  onMounted(() => {
    movieTitle.value = localStorage.getItem('title') || ''
    updateIsLoadingMovieDetails(true)
    useMovieSearch<MovieDetails>({t: movieTitle.value}).then(({Title, Year, Director, Poster, Response}) => {
      if (Response === 'True') {
        isNoResults.value = false
        updateIsLoadingMovieDetails(false)
        movieDetails.value.Title = Title
        movieDetails.value.Year = isEmptyField(Year) ? undefined : Year
        movieDetails.value.Director = isEmptyField(Director) ? undefined : Director
        movieDetails.value.Poster = isEmptyField(Poster) ? undefined : Poster
        poster.value = usePoster(movieDetails.value.Poster)
      } else {
        isNoResults.value = true
        updateIsLoadingMovieDetails(false)
      }
    }).catch((err) => {
      console.warn(err)
    })
  })
</script>

<style lang="scss">
  @import "~/assets/style/details.scss"
</style>