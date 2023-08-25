export interface Movie {
  Title: string,
  Poster: string,
  Year: string,
  Type: string,
  imdbID: string,
}

export interface MovieResponse {
  Search?: Movie[],
  Response: string,
  Error?: string,
}