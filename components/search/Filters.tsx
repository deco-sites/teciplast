import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
  hiddenCategory: boolean;
  hiddenDepartament: boolean;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle" ;

const isPrice = (filter: Filter) =>
  !["price"].includes(filter.key)

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <li>
      <a href={url} class={`flex items-center gap-2 hover:underline lg:px-5  ${selected ? "font-extrabold text-black" : ""}`}>
        <span class="text-sm mr-auto">{label}</span>
        {quantity > 0 && <span class={`text-sm  ml-auto text-base-300 ${selected ? "font-extrabold text-black" : ""}`}>({quantity})</span>}
      </a>
    </li>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-col gap-2  ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {

          return null;
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, hiddenCategory,hiddenDepartament }: Props) {
  

  return (
    <ul class="flex flex-col lg:gap-[6px]  ">
      {filters
        .filter(isToggle)
        .filter(isPrice)
        .filter((filter: Filter) => hiddenDepartament ? ( filter.key !== "category-1" ):( true ))
        .filter((filter: Filter) => hiddenCategory ? ( filter.key !== "category-2" ):( true ))
        .map((filter) => (
            <li>
              <div class="collapse collapse-arrow bg-base-100 rounded-none mb-1 text-base-300 border-b border-[#C3C3C3] lg:border-none ">
                <input type="checkbox" class="min-h-[0px]" />
                <div class="collapse-title min-h-[0px] rounded-none flex gap-2 px-0 lg:px-5">
                  <span>{filter.label} </span>
                </div>
              
                <div class="collapse-content">
                  <ul  class={`flex flex-col `}>
                    <FilterValues {...filter} />
                  </ul>
                </div>
              </div>
            </li>
        ))}
    </ul>
  );
}


export default Filters;
