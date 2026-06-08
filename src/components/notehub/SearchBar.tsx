import type { NotehubSearchBarProps } from "../../types/types";

export default function SearchBar({ value, onChange }: NotehubSearchBarProps) {
  return (
    <input
      className="notehub-searchInput"
      type="text"
      name="query"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
      placeholder="Search movies..."
      autoFocus
    />
  );
}
