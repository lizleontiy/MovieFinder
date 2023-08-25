import { defineStore } from 'pinia'
import { Movie } from '@/types/Movie'

export const useMoviesStore = defineStore('movies', () => {
  let movies = ref<Movie[]>([])
  let isLoadingMovies = ref(true)
  let isLoadingMovieDetails = ref(true)
  
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