function SearchTerm() {
  const location = window.location.search;
  const urlParams = new URLSearchParams(location);
  const searchTerm = urlParams.get("q");
  if(!searchTerm) return null;
  return (
    <div>
      <span class="text-2xl">"{searchTerm}"</span>
    </div>
  );
}

export default SearchTerm;
