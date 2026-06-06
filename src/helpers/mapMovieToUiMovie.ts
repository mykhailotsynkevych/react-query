import type { TmdbMovie } from '../api/moviesAPI'
import type { Movie } from '../types/types'

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

export default function mapMovieToUiMovie(movie: TmdbMovie): Movie {
  const posterPath = movie.poster_path ?? movie.backdrop_path ?? ''
  const backdropPath = movie.backdrop_path ?? movie.poster_path ?? ''

  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown',
    poster: posterPath ? `${TMDB_IMAGE_BASE_URL}${posterPath}` : '',
    backdrop: backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : '',
    overview: movie.overview || 'No overview available.',
    releaseDate: movie.release_date || 'Unknown',
    vote: movie.vote_average ? `${movie.vote_average}/10` : 'No rating',
  }
}