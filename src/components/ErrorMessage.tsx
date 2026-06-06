import type { ErrorMessageProps } from '../types/types'

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error" role="alert">
      {message}
    </div>
  )
}