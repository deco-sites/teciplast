/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCardSearchBar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "ENCONTRAR PRODUTOS",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <>
      <div class="w-full grid overflow-y-hidden max-w-[500px] bg-base-100">
        <form id={id} action={action} class="join">
          <input
            ref={searchInputRef}
            id="search-input"
            class="input input-bordered join-item flex-grow bg-base-100 border-r-0 focus:outline-none"
            name={name}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setQuery(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          <Button
            type="submit"
            class="join-item   bg-base-100 border-l-0 input input-bordered "
            aria-label="Search"
            for={id}
            tabIndex={-1}
          >
            {loading.value
              ? <span class="loading loading-spinner loading-xs bg-black" />
              : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
          </Button>
        </form>
      </div>

      {hasProducts &&
        (
          <div
            class={`absolute  w-full overflow-y-scroll z-50 ${
              !hasProducts && !hasTerms ? "hidden" : ""
            } max-w-[500px] mt-[50px]`}
          >
            <div class="gap-4 grid grid-cols-1  bg-base-100  py-5 px-5">
              {hasTerms && (
                <div class="flex flex-col gap-3 ">
                  <span
                    class="font-medium text-base"
                    role="heading"
                    aria-level={3}
                  >
                    Sugestões
                  </span>
                  <ul
                    id="search-suggestion"
                    class="flex flex-col gap-4 text-sm"
                  >
                    {searches.map(({ term }) => (
                      <li>
                        <a
                          href={`/s?q=${term}`}
                          class="flex gap-4 items-center"
                        >
                          <span>
                            <Icon
                              id="MagnifyingGlass"
                              size={16}
                              strokeWidth={0.01}
                            />
                          </span>
                          <span dangerouslySetInnerHTML={{ __html: term }} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div class="flex flex-col pt-2 gap-1 overflow-y-hidden  ">
                <span
                  class="font-medium text-base"
                  role="heading"
                  aria-level={3}
                >
                  Produtos sugeridos
                </span>
                <Slider class="carousel flex-col gap-5 max-h-[380px]">
                  {products.map((product, index) => (
                    <Slider.Item
                      index={index}
                      class="carousel-item   min-w-[200px] max-w-[440px]"
                    >
                      <ProductCard product={product} platform={platform} />
                    </Slider.Item>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default Searchbar;
