import type { LoaderProps } from './types'

export default function Loader({ message = 'Loading movies...' }: LoaderProps) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span>{message}</span>
    </div>
  )
}