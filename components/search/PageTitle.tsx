import type { BreadcrumbList } from "apps/commerce/types.ts";

export interface Props {
  matchingTitle?: string;
  breadCrumbs?: BreadcrumbList["itemListElement"];
}

function PageTitle({ matchingTitle, breadCrumbs }: Props) {
  const query = window.location.search;
  const pathName = window.location.pathname;
  const urlParams = new URLSearchParams(query);
  const searchTerm = urlParams.get("q");
  const pageTitle = breadCrumbs ? breadCrumbs[breadCrumbs.length - 1].name : "";

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
