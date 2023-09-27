import { defineStore } from 'pinia'
import { Movie } from '@/types/Movie'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const isLoadingMovies = ref(true)
  const isLoadingMovieDetails = ref(true)

  function updateMovies(moviesList: Movie[]) {
    movies.value = moviesList
  }

  function updateIsLoadingMovies(value: boolean) {
    isLoadingMovies.value = value
  }

  function updateIsLoadingMovieDetails(value: boolean) {
    isLoadingMovieDetails.value = value
  }

  return {
    movies,
    isLoadingMovies,
    isLoadingMovieDetails,
    updateMovies,
    updateIsLoadingMovies,
    updateIsLoadingMovieDetails,
  }
})