import axios from "axios";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const NOTEHUB_API_URL = import.meta.env.VITE_NOTEHUB_URL;

export interface Note {
  id: number;
  title: string | null;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface SearchMoviesResponse {
  notes: Note[];
  totalPages: number;
}

async function fetchNotes(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
): Promise<SearchMoviesResponse> {
  if (!TOKEN) {
    throw new Error("VITE_NOTEHUB_TOKEN is not defined");
  }

  const { data } = await axios.get<SearchMoviesResponse>(
    `${NOTEHUB_API_URL}${endpoint}`,
    {
      params: {
        ...params,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );

  return data;
}

export const fetchNewNotes = async () => {
  return fetchNotes("/notes");
};

// export async function searchNotes(
//   query: string,
//   page = 1,
// ): Promise<SearchMoviesResponse> {
//   return fetchNotes("/search/notes", {
//     query,
//     include_adult: false,
//     page,
//   });
// }
