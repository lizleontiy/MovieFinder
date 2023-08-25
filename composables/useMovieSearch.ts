import { LocationQueryValue } from '.nuxt/vue-router'
import { MovieResponse } from '@/types/Movie'

export const useMovieSearch = async (search: LocationQueryValue | LocationQueryValue[]) => {

  const runtimeConfig = useRuntimeConfig()
  const apiKey = runtimeConfig.public.OMDB_API_KEY
  const pathOrigin = runtimeConfig.public.OMDB_PATH

  return await $fetch<MovieResponse>(pathOrigin, {
    query: {
      apikey: apiKey,
      s: search
    },
  })
  
}