export interface Props {
  matchingTitle?: string;
}

function PageTitle({ matchingTitle }: Props) {
  const query = window.location.search;
  const pathName = window.location.pathname;
  const urlParams = new URLSearchParams(query);
  const searchTerm = urlParams.get("q");
  const pageTitle = pathName ? pathName.replace("/", "") : "";

  return (
    <div>
      {matchingTitle
        ? (
          <span class={`text-lg sm:text-2xl ${!searchTerm && "capitalize"}`}>
            {matchingTitle}
          </span>
        )
        : (
          <span class={`text-lg sm:text-2xl ${!searchTerm && "capitalize"}`}>
            {searchTerm ? `Busca: "${searchTerm}"` : pageTitle}
          </span>
        )}
    </div>
  );
}

export default PageTitle;
