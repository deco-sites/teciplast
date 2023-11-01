function SearchTerm() {
  const query = window.location.search;
  const pathName = window.location.pathname;
  const urlParams = new URLSearchParams(query);
  const searchTerm = urlParams.get("q");
  const pageTitle = pathName ? pathName.replace("/", "") : "";

  return (
    <div>
      <span class={`text-2xl ${!searchTerm && "capitalize"}`}>
        {searchTerm ? `Busca: "${searchTerm}"` : pageTitle}
      </span>
    </div>
  );
}

export default SearchTerm;
