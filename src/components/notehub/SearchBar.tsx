import { useDebouncedCallback } from 'use-debounce';
import type { NotehubSearchBarProps } from "../../types/types";

export default function SearchBar({ value, onChange }: NotehubSearchBarProps) {
  const debouncedOnChange = useDebouncedCallback(onChange, 100);

  return (
    <input
      className="notehub-searchInput"
      type="text"
      name="query"
      value={value}
      onChange={(e) => debouncedOnChange(e.target.value)}
      autoComplete="off"
      placeholder="Search notes..."
      autoFocus
    />
  );
}
