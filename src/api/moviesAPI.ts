import axios from 'axios'

const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const TMDB_API_URL = import.meta.env.VITE_BASE_URL
const TMDB_LANGUAGE = 'en-US'

export interface TmdbMovie {
  id: number
  poster_path: string | null
  backdrop_path: string | null
  title: string
  overview: string
  release_date: string
  vote_average: number
}

export interface SearchMoviesResponse {
  page: number
  results: TmdbMovie[]
  total_pages: number
  total_results: number
}

async function fetchMovies(endpoint: string, params?: Record<string, string | number | boolean>): Promise<SearchMoviesResponse> {
  if (!TOKEN) {
    throw new Error('VITE_TMDB_TOKEN is not defined')
  }

  const { data } = await axios.get<SearchMoviesResponse>(`${TMDB_API_URL}${endpoint}`, {
    params: {
      language: TMDB_LANGUAGE,
      ...params,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  })

  return data
}

export async function fetchNewMovies(page = 1): Promise<SearchMoviesResponse> {
  return fetchMovies('/movie/now_playing', { page })
}

export default async function searchMovies(
  query: string,
  page = 1,
): Promise<SearchMoviesResponse> {
  return fetchMovies('/search/movie', {
    query,
    include_adult: false,
    page,
  })
}