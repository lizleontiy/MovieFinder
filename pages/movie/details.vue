<template>
  <Head>
    <Title>Details</Title>
  </Head>
  <ElRow
    justify="center"
  >
    <ElCol
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
      <ElCard
        v-if="!isNoResults"
        class="box-card"
      >
        <ElRow
          justify="space-between"
        >
          <ElCol
            :sm="10"
            :md="8"
          >
            <el-image
              style="width: 100%; height: 100%"
              :src="poster"
              fit="contain"
            />
          </ElCol>
          <ElCol
            :sm="13"
            :md="15"
          >
            <h2 class="details__title">
              {{ movieDetails.Title }}
            </h2>
            <ElText
              v-if="movieDetails.Director"
              tag="p"
            >
              Director: {{ movieDetails.Director }}
            </ElText>
            <br>
            <ElText
              v-if="movieDetails.Year"
              tag="p"
            >
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
  import { MovieDetails } from '@/types/MovieDetails'
  import { LocationQueryValue } from '#vue-router'

  const route = useRoute()
  const movieTitle = ref<string | LocationQueryValue[]>('')
  const movieDetails = ref<MovieDetails>({} as MovieDetails)
  const isNoResults = ref(false)
  const poster = ref('')
  movieTitle.value = route.query.id || ''

  useMovieSearch<MovieDetails>({i: movieTitle.value}).then(({ data }) => {
    if (data?.value?.Response === 'True') {
      isNoResults.value = false
      movieDetails.value.Title = data.value.Title
      movieDetails.value.Year = isEmptyField(data.value.Year) ? undefined : data.value.Year
      movieDetails.value.Director = isEmptyField(data.value.Director) ? undefined : data.value.Director
      movieDetails.value.Poster = isEmptyField(data.value.Poster) ? undefined : data.value.Poster
      poster.value = usePoster(movieDetails.value.Poster)
    } else {
      isNoResults.value = true
    }
  })
  .catch(({error}) => {
    console.warn(error)
  })
</script>

<style lang="scss">
  @import "~/assets/style/components/details.scss"
</style>