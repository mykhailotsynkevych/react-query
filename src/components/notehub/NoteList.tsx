import type { NoteListProps } from "../../types/types";
import { formatNoteDate } from "../../helpers/helpers";

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className="notehub-list">
      {notes.map((note) => (
        <li key={note.id} className="notehub-listItem">
          <div>
            <p className="notehub-createdTime">
              {formatNoteDate(note.createdAt)}
            </p>
            <h2 className="notehub-title">{note.title}</h2>
          </div>
          <p className="notehub-content">{note.content}</p>
          <div className="notehub-footer">
            <span className="notehub-tag">{note.tag}</span>
            <button
              className="notehub-button"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
