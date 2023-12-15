import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useEffect, useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import MultiRangeSliderSize from "$store/components/ui/SizeSlider.tsx";

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

function FilterValues(props: { filter: FilterToggle }) {
  const { key, values } = props.filter;
  const flexDirection = key === "avatar" ? "flex-row" : "flex-col";

  // Tem que trocar a parte logica, pois esta com a do price. Não mexi pois não tem retorno ainda da api para isso.
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
      <div class={` h-12 mt-4`}>
        <MultiRangeSliderSize
          min={1}
          max={1000}
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
  const { key, quantity } = filter;

  const unused_categories = ["category-1", "category-2", "brand"];
  if (
    unused_categories.includes(key) || (key == "category-3" && quantity == 1)
  ) {
    return null;
  }

  return (
    <li class="flex flex-col">
      <div
        class={`grid border-solid "grid-rows-[1fr]" transition-[grid-template-rows] duration-600 ease-in-out`}
      >
        <div class={`overflow-y-auto overflow-x-hidden`}>
          <FilterValues filter={{ ...filter }} />
        </div>
      </div>
    </li>
  );
}

function PriceFilter({ filters }: Props) {
  return (
    <ul class="flex flex-col   ">
      {filters
        .filter(isToggle)
        .map((filter) => (
          filter.key == "price" &&
          (
            <div class="text-base-300 w-[350px] h-full flex flex-col justify-between py-1  ">
              <div class="rounded-none flex gap-2  px-5 text-sm text-[#999999] w-full">
                <span>Tamanho (Largura)</span>
              </div>

              <div class=" w-full bg-base-100 border-[#C3C3C3] rounded-md  ">
                <Filter {...filter} />
              </div>
            </div>
          )
        ))}
    </ul>
  );
}

export default PriceFilter;
