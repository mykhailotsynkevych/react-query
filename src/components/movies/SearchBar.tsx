import { useState } from "react";
import toast from "react-hot-toast";
import type { SearchBarProps } from "../../types/types";

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const submitAction = (formData: FormData) => {
    const submittedQuery = String(formData.get("query") ?? "").trim();

    if (!submittedQuery) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(submittedQuery);
  };

  return (
    <div className="header">
      <div className="container">
        <a
          className="link"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className="form" action={submitAction}>
          <input
            className="input"
            type="text"
            name="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
