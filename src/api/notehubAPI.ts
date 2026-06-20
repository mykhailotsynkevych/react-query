import axios from "axios";

import type { Note } from "../types/types";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const NOTEHUB_API_URL = import.meta.env.VITE_NOTEHUB_URL;

export interface SearchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function fetchNotes(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
): Promise<SearchNotesResponse> {
  if (!TOKEN) {
    throw new Error("VITE_NOTEHUB_TOKEN is not defined");
  }

  const { data } = await axios.get<SearchNotesResponse>(
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

export const fetchAllNotes = async (page = 1) => {
  return fetchNotes("/notes", { page });
};

export async function searchNotes(
  query: string,
  page = 1,
): Promise<SearchNotesResponse> {
  return fetchNotes("/notes", {
    search: query,
    page,
  });
}
