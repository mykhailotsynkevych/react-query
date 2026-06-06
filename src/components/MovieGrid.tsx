import type { MovieGridProps } from '../types/types'

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (movies.length === 0) {
    return null
  }

  return (
    <section className="grid" aria-label="Movie results">
      {movies.map((movie) => (
        <article
          key={movie.id}
          className="card"
          role="button"
          tabIndex={0}
          onClick={() => onSelect(movie)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onSelect(movie)
            }
          }}
        >
          <img className="image" src={movie.poster} alt={movie.title} loading="lazy"/>
          <h2 className="title">
            {movie.title} ({movie.year})
          </h2>
        </article>
      ))}
    </section>
  )
}