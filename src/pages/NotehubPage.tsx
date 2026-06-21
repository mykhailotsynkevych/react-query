import { useState } from "react";
import {
  useMutation,
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import "modern-normalize";
import toast from "react-hot-toast";

import {
  searchNotes,
  fetchAllNotes,
  deleteNote,
  createNote,
} from "../api/notehubAPI";
import type { NoteFormValues } from "../types/types";

import SearchBar from "../components/notehub/SearchBar";
import Pagination from "../components/movies/Pagination";
import NoteList from "../components/notehub/NoteList";
import NoteModal from "../components/notehub/NoteModal";
import NoteForm from "../components/notehub/NoteForm";

function NotehubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const normalizedQuery = searchQuery.trim();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted");
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
  });

  const onDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created");
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  const handleCreateNote = async (values: NoteFormValues) => {
    await createMutation.mutateAsync(values);
  };

  return (
    <>
      <header className="notehub-toolbar">
        <SearchBar value={searchQuery} onChange={onChange} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className="notehub-createButton"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>
      {isLoading ? (
        <p>Loading notes...</p>
      ) : isError ? (
        <p>{error?.message}</p>
      ) : (
        <div>
          {isSuccess && data.notes.length === 0 ? (
            <p>No notes found.</p>
          ) : (
            <NoteList notes={data?.notes || []} onDelete={onDelete} />
          )}
        </div>
      )}
      {isModalOpen && (
        <NoteModal
          children={
            <NoteForm
              onCancel={() => setIsModalOpen(false)}
              onSubmit={handleCreateNote}
            />
          }
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default NotehubPage;
