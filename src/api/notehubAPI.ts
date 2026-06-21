import axios from "axios";

import type { Note, NoteFormValues } from "../types/types";

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
        perPage: 12,
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

export async function deleteNote(noteId: string): Promise<Note> {
  if (!TOKEN) {
    throw new Error("VITE_NOTEHUB_TOKEN is not defined");
  }

  const { data } = await axios.delete<Note>(
    `${NOTEHUB_API_URL}/notes/${encodeURIComponent(noteId)}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );

  return data;
}

export async function createNote(noteData: NoteFormValues): Promise<Note> {
  if (!TOKEN) {
    throw new Error("VITE_NOTEHUB_TOKEN is not defined");
  }

  const { data } = await axios.post<Note>(`${NOTEHUB_API_URL}/notes`, noteData, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
}
