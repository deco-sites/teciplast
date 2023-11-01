function SearchTerm() {
  const location = window.location.search;
  const urlParams = new URLSearchParams(location);
  const searchTerm = urlParams.get("q");

  return (
    <div>
      <span class="text-2xl">"{searchTerm}"</span>
    </div>
  );
}

export default SearchTerm;
