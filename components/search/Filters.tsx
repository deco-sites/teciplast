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
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <li>
      <a href={url} class="flex items-center gap-2">
        <div aria-checked={selected} class="checkbox" />
        <span class="text-sm">{label}</span>
        {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
      </a>
    </li>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-col gap-1 pl-5 pt-2 ${flexDirection}`}>
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
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 p-4 ">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li >
            <div class="collapse collapse-arrow ">
              <input type="checkbox" class="min-h-[0]" />
                <div class="collapse-title min-h-[0] !p-0 flex gap-2">
                  <span>{filter.label} </span>
                </div>
               
                <div class="collapse-content">
                  <ul  class={`flex flex-col gap-1 pl-5 pt-2`}>
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
