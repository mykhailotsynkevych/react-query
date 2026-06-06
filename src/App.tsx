import { useEffect, useRef, useState } from 'react'
import "modern-normalize";
import toast from 'react-hot-toast'
import './index.css'
import searchMovies, { fetchNewMovies } from './api/moviesAPI'
import ErrorMessage from './components/ErrorMessage'
import Loader from './components/Loader'
import MovieGrid from './components/MovieGrid'
import MovieModal from './components/MovieModal'
import SearchBar from './components/SearchBar'
import mapMovieToUiMovie from './helpers/mapMovieToUiMovie'
import type { Movie } from './types/types'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [requestErrorMessage, setRequestErrorMessage] = useState('')
  const activeRequestId = useRef(0)

  useEffect(() => {
    const requestId = ++activeRequestId.current

    const loadNewMovies = async () => {
      setRequestErrorMessage('')
      setIsLoading(true)

      try {
        const response = await fetchNewMovies()
        if (requestId !== activeRequestId.current) {
          return
        }

        setMovies(response.results.map(mapMovieToUiMovie))
      } catch (error) {
        if (requestId !== activeRequestId.current) {
          return
        }

        setMovies([])
        setRequestErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
      } finally {
        if (requestId === activeRequestId.current) {
          setIsLoading(false)
        }
      }
    }

    void loadNewMovies()
  }, [])

  const handleSearchSubmit = async (query: string) => {
    const requestId = ++activeRequestId.current

    setMovies([])
    setSelectedMovie(null)
    setRequestErrorMessage('')
    setIsLoading(true)

    try {
      const response = await searchMovies(query)
      if (requestId !== activeRequestId.current) {
        return
      }

      if (response.results.length === 0) {
        setMovies([])
        toast('No movies found for your request.')
        return
      }

      setMovies(response.results.map(mapMovieToUiMovie))
    } catch (error) {
      if (requestId !== activeRequestId.current) {
        return
      }

      setMovies([])
      setRequestErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      if (requestId === activeRequestId.current) {
        setIsLoading(false)
      }
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
