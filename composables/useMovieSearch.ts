
export const useMovieSearch = <T>(query: object) => {

  const runtimeConfig = useRuntimeConfig()
  const apiKey = runtimeConfig.public.OMDB_API_KEY
  const pathOrigin = runtimeConfig.public.OMDB_PATH

  return useFetch<T>(pathOrigin, {
    query: {
      apikey: apiKey,
      ...query,
    },
  })
}