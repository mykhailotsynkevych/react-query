import type { NoteListProps } from "../../types/types";

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className="notehub-list">
      {notes.map((note) => (
        <li key={note.id} className="notehub-listItem">
          <h2 className="notehub-title">{note.title}</h2>
          <p className="notehub-content">{note.content}</p>
          <div className="notehub-footer">
            <span className="notehub-tag">{note.tag}</span>
            <button className="notehub-button">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
