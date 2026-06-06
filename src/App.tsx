import { useState } from 'react'
import "modern-normalize";
import toast from 'react-hot-toast'
import './index.css'
import searchMovies from './api/searchMovies'
import ErrorMessage from './components/ErrorMessage'
import Loader from './components/Loader'
import MovieGrid from './components/MovieGrid'
import MovieModal from './components/MovieModal'
import SearchBar from './components/SearchBar'
import type { Movie } from './types/types'

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

function mapMovieToUiMovie(movie: Awaited<ReturnType<typeof searchMovies>>['results'][number]): Movie {
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

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [requestErrorMessage, setRequestErrorMessage] = useState('')

  const handleSearchSubmit = async (query: string) => {
    setMovies([])
    setSelectedMovie(null)
    setRequestErrorMessage('')
    setIsLoading(true)

    try {
      const response = await searchMovies(query)
      if (response.results.length === 0) {
        setMovies([])
        toast('No movies found for your request.')
        return
      }

      setMovies(response.results.map(mapMovieToUiMovie))
    } catch (error) {
      setMovies([])
      setRequestErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app">
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading ? <Loader /> : requestErrorMessage ? <ErrorMessage message={requestErrorMessage} /> : <MovieGrid movies={movies} onSelect={setSelectedMovie} />}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </main>
  )
}

export default App
