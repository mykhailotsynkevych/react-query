import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import "modern-normalize";

import { searchNotes, fetchAllNotes } from "../api/notehubAPI";

import SearchBar from "../components/notehub/SearchBar";
import Pagination from "../components/movies/Pagination";
import NoteList from "../components/notehub/NoteList";

function NotehubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const normalizedQuery = searchQuery.trim();

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", normalizedQuery, currentPage],
    queryFn: () =>
      normalizedQuery
        ? searchNotes(normalizedQuery, currentPage)
        : fetchAllNotes(currentPage),
    placeholderData: keepPreviousData,
  });

  const onChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  

  return (
    <section>
      <div className="notehub-toolbar">
        <SearchBar value={searchQuery} onChange={onChange} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className="notehub-createButton">Create note +</button>
      </div>
      {isLoading ? (
        <p>Loading notes...</p>
      ) : isError ? (
        <p>{error?.message}</p>
      ) : (
        <div>
          <NoteList notes={data?.notes || []} />
        </div>
      )}
    </section>
  );
}

export default NotehubPage;
