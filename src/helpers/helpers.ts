import type { TmdbMovie } from '../api/moviesAPI'
import type { Movie } from '../types/types'

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

export function mapMovieToUiMovie(movie: TmdbMovie): Movie {
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

export function formatNoteDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}