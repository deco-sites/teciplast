import { useMemo } from "preact/hooks";
import type { JSX } from "preact";
import type { ProductListingPage } from "apps/commerce/types.ts";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "discount:desc": "Maior desconto",
};
type SortOption = {
  value: string;
  label: string;
};
const getOptions = (
  sortOptions: SortOption[],
  sort: string,
  mappings: { [key: string]: string },
) =>
  sortOptions.map(({ value, label }) => ({
    value,
    label: mappings[label as keyof typeof mappings] ?? label,
  })).filter(({ label }) => label).map(({ value, label }) => (
    <option key={value} value={value} selected={value === sort}>
      {label}
    </option>
  ));

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  const options = useMemo(
    () => getOptions(sortOptions, sort, portugueseMappings),
    [sortOptions, sort],
  );

  return (
    <div class="">
      <div class="flex items-center py-2">
        <span class="text-[#898989] font-normal text-[14px]">Ordenar por</span>
        <select
          id="sort"
          name="sort"
          onInput={applySort}
          class="flex w-min h-[36px] px-1 m-2 cursor-pointer outline-none lowercase font-bold border-b border-[#999999] text-[#898989] bg-transparent text-[14px]"
        >
          {options}
        </select>
      </div>
    </div>
  );
}

export default Sort;
