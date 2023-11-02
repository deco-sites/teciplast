import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useEffect, useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import MultiRangeSlider from "$store/components/ui/PriceSlider.tsx";

import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";



function FilterValues(props: { filter: FilterToggle;}) {
  const { key, values } = props.filter;
  const flexDirection = key === "avatar" ? "flex-row" : "flex-col";

  if (key === "price") {
    //parsing range values for price filter
    const valuesArray = Object.entries(values);

    const url = valuesArray[0][1].url;

    const urlPrice = url.split("&").slice(0, -1).filter((r) =>
      r.includes("filter.price")
    )[0]?.split("=")[1]?.split("%3A");
    const urlBrowser = url.split("&").slice(0, -1).filter((r) =>
      !r.includes("filter.price")
    ).join("&");
    const rangeArray: number[] = [];

    valuesArray.map((value) => {
      const aux = value[1].value.split(":");
      const auxArr = aux.map((r) => parseInt(r));
      rangeArray.push(...auxArr);
    });
    rangeArray.sort((a, b) => a - b);
    const minRange = rangeArray[0];
    const maxRange = rangeArray[rangeArray.length - 1];

    const [currentMaxMin, setCurrentMaxMin] = useState({
      max: urlPrice ? parseInt(urlPrice[1]) : maxRange,
      min: urlPrice ? parseInt(urlPrice[0]) : minRange,
    });

    let timeOutId = 0;
    let firstTime = 0;

    return (
      <div class={` h-16 mt-4`}>
        <MultiRangeSlider
          min={minRange}
          max={maxRange}
          currentMin={currentMaxMin.min}
          currentMax={currentMaxMin.max}
          onChange={(query: { min: number; max: number }) => {
            if (
              currentMaxMin.max != query.max || currentMaxMin.min != query.min
            ) {
              if (firstTime > 0) {
                clearTimeout(timeOutId);
                timeOutId = setTimeout(() => {
                  setCurrentMaxMin({ max: query.max, min: query.min });
                  window.location.href = urlBrowser + "&filter.price=" +
                    query.min + "%3A" + query.max;
                }, 500);
              }
              firstTime++;
            }
          }}
        />
      </div>
    );
  }

  return null;
}




function Filter(filter: FilterToggle) {
  const [isOpen, setIsOpen] = useState(true);
  const { key, quantity } = filter;

  if (key === "price") {
    setIsOpen(true);
  }

  function toggle() {
    setIsOpen(!isOpen);
  }

  const unused_categories = ["category-1", "category-2", "brand"];
  if (
    unused_categories.includes(key) || (key == "category-3" && quantity == 1)
  ) {
    return null;
  }
  if ( key !== "price"){
    return null;
  }
  return (
    <li class="flex flex-col gap-4">
      <div
        class="flex justify-between relative cursor-pointer items-center pt-2 pr-5"
        onClick={() => toggle()}
      >
      
        {key !== "price" && (
          <Icon
            class="flex items-center"
            size={15}
            id={isOpen ? "ChevronUp" : "ChevronDown"}
            strokeWidth={3}
          />
        )}
      </div>
      <div
        class={`grid border-solid ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } transition-[grid-template-rows] duration-600 ease-in-out`}
      >
        <div class={`overflow-y-auto overflow-x-hidden max-h-[400px]`}>
          <FilterValues filter={{ ...filter }}/> 
        </div>
      </div>
    </li>
  );
}

function PriceFilter({ filters }: Props) {

  return (
      <ul class="flex flex-col gap-[6px]  ">
      {filters
        .filter(isToggle)
        .map((filter) => (
          filter.key == "price" && 
            <li>
              <div class="collapse collapse-arrow bg-base-100 rounded-none mb-1 text-base-300">
                <input type="checkbox" class="min-h-[0px]" />
                  <div class="collapse-title min-h-[0px] rounded-none flex gap-2  px-0 lg:px-5">
                    <span>{filter.label} </span>
                  </div>
                
                  <div class="collapse-content">
                    <ul  class={`flex flex-col `}>
                      <Filter {...filter} />
                    </ul>
                  </div>
              </div>
            </li>
            )
          )
        }
      </ul>
  );
}

export default PriceFilter;
