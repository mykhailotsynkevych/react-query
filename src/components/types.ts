export type Movie = {
  id: number
  title: string
  year: string
  poster: string
  backdrop: string
  overview: string
  releaseDate: string
  vote: string
}

export interface SearchBarProps {
  onSubmit: (query: string) => void | Promise<void>
}

export interface MovieGridProps {
  movies: Movie[]
  onSelect: (movie: Movie) => void
}

export interface LoaderProps {
  message?: string
}

export interface ErrorMessageProps {
  message: string
}

export interface MovieModalProps {
  movie: Movie | null
  onClose: () => void
}