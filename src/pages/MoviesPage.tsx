import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import "modern-normalize";
import toast from "react-hot-toast";
import { searchMovies, fetchNewMovies } from "../api/moviesAPI";
import ErrorMessage from "../components/movies/ErrorMessage";
import Loader from "../components/movies/Loader";
import MovieGrid from "../components/movies/MovieGrid";
import MovieModal from "../components/movies/MovieModal";
import SearchBar from "../components/movies/SearchBar";
import Pagination from "../components/movies/Pagination";
import {mapMovieToUiMovie} from "../helpers/helpers";
import type { Movie } from "../types/types";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", searchQuery, currentPage],
    queryFn: () =>
      searchQuery.trim()
        ? searchMovies(searchQuery, currentPage)
        : fetchNewMovies(currentPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast("No movies found for your request.");
    }
  }, [data]);

  const handleSearchSubmit = (query: string) => {
    setSelectedMovie(null);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const movies = data?.results.map(mapMovieToUiMovie) ?? [];

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage
          message={
            error instanceof Error ? error.message : "Something went wrong."
          }
        />
      ) : (
        <div>
          {isSuccess && data.total_pages > 1 && (
            <Pagination
              totalPages={data.total_pages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        </div>
      )}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default MoviesPage;
