import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import type { NoteFormProps, NoteFormValues } from "../../types/types";

const noteTags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const noteSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string()
    .trim()
    .max(500, "Content must be at most 500 characters"),
  tag: Yup.mixed<NoteFormValues["tag"]>()
    .oneOf(noteTags, "Tag must be one of: Todo, Work, Personal, Meeting, Shopping")
    .required("Tag is required"),
});

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={noteSchema}
      onSubmit={async (values, actions) => {
        await onSubmit({
          title: values.title.trim(),
          content: values.content.trim(),
          tag: values.tag,
        });
        actions.resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="notehub-form">
          <div className="notehub-formGroup">
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              type="text"
              name="title"
              className="notehub-input"
            />
            <ErrorMessage
              name="title"
              component="span"
              className="notehub-error"
            />
          </div>

          <div className="notehub-formGroup">
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className="notehub-textarea"
            />
            <ErrorMessage
              name="content"
              component="span"
              className="notehub-error"
            />
          </div>

          <div className="notehub-formGroup">
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className="notehub-select">
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage
              name="tag"
              component="span"
              className="notehub-error"
            />
          </div>

          <div className="notehub-actions">
            <button
              type="button"
              className="notehub-cancelButton"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="notehub-submitButton"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
