export default function NoteForm() {
  return (
    <form className="notehub-form">
      <div className="notehub-formGroup">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" className="notehub-input" />
        <span name="title" className="notehub-error" />
      </div>

      <div className="notehub-formGroup">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className="notehub-textarea"
        />
        <span name="content" className="notehub-error" />
      </div>

      <div className="notehub-formGroup">
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className="notehub-select">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span name="tag" className="notehub-error" />
      </div>

      <div className="notehub-actions">
        <button type="button" className="notehub-cancelButton">
          Cancel
        </button>
        <button type="submit" className="notehub-submitButton" disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
