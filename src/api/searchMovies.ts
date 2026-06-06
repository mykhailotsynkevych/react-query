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

export default async function searchMovies(
  query: string,
  page = 1,
): Promise<SearchMoviesResponse> {


  if (!TOKEN) {
    throw new Error('VITE_TMDB_TOKEN is not defined')
  }

  const { data } = await axios.get<SearchMoviesResponse>(`${TMDB_API_URL}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: TMDB_LANGUAGE,
      page,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  })

  return data;
}