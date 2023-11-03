import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <>
      <div class="flex items-center">
        <span class="text-[#999999] font-normal text-[14px]">Ordenar por</span>
        <select
          id="sort"
          name="sort"
          onInput={applySort}
          class="hidden sm:flex w-min h-[36px] px-1 m-2 cursor-pointer outline-none lowercase font-bold border-b border-[#999999] text-[#999999] bg-transparent text-[14px]"
        >
          {sortOptions.map(({ value, label }) => ({
            value,
            label:
              portugueseMappings[label as keyof typeof portugueseMappings] ??
                label,
          })).filter(({ label }) => label).map(({ value, label }) => (
            <option key={value} value={value} selected={value === sort}>
              <span class="text-sm">{label}</span>
            </option>
          ))}
        </select>
      </div>

      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class=" flex sm:hidden select text-base-300 w-full max-w-xs px-0 border-none focus:outline-none"
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <option key={value} value={value} selected={value === sort}>
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select>
    </>
  );
}

export default Sort;
