import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { MouseEvent } from 'react'
import type { MovieModalProps } from '../../types/types'

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    if (!movie) {
      return
    }

    const { overflow } = document.body.style

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [movie, onClose])

  if (!movie) {
    return null
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div className="backdrop" role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div
        className="modal"
        aria-labelledby="movie-modal-title"
      >
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <img className="image" src={movie.backdrop || movie.poster} alt={movie.title} loading="lazy"/>
        <div className="content">
          <h2 id="movie-modal-title">{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}