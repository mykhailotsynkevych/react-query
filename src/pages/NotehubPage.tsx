import SearchBar from "../components/notehub/SearchBar";

function NotehubPage() {
  const onChange = (query: string) => {
    console.log("Search query submitted:", query);
  };
  return (
    <section>
      <div className="notehub-toolbar">
        <SearchBar value="" onChange={onChange} />
      </div>
    </section>
  );
}

export default NotehubPage;
