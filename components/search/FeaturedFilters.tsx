import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { useId } from "$store/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";

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
      <a href={url} class="flex items-center gap-2 hover:underline lg:px-5">
        <span class="text-sm mr-auto">{label}</span>
        {quantity > 0 && (
          <span class="text-sm  ml-auto text-base-300">({quantity})</span>
        )}
      </a>
    </li>
  );
}

function TypeValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
      <a href={url} class="flex flex-col items-center text-center gap-2 hover:underline lg:px-5">
        <img src={label} class="w-[58px] h-[48px] border-4 border-white shadow-lg rounded-md block" />
        <span class="text-sm">{label}</span>
      </a>
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

function TypeFilterValues({ key, values }: FilterToggle) {
  const id = useId();
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] px-0  flex-grow  h-[80px] max-w-[500px]"
      >
    <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5  justify-start  sm:h-[450px]">
      {values.map((item, index) => {
        return (<Slider.Item
                  index={index}
                  class="w-[220px] sm:w-[240px] min-h-[320px] first:ml-6 sm:first:pl-0 last:mr-6 sm:last:pr-0"
                >
                  <TypeValueItem {...item} />
                </Slider.Item>);
      })}
    </Slider>
    <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-1">
            <Slider.PrevButton class="btn btn-circle btn-outline absolute top-1/2 right-1/2 bg-[#ffffff9f] border-none text-black hover:bg-[#fff] hover:text-black">
              <Icon size={24} id="ChevronLeft" strokeWidth={1} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-1">
            <Slider.NextButton class="btn btn-circle btn-outline absolute top-1/2 left-1/2 bg-[#ffffff9f] border-none text-black hover:bg-[#fff] hover:text-black">
              <Icon size={24} id="ChevronRight" strokeWidth={1} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} />
    </div>
  );
}

function isAllowedFilter(filter: FilterToggle) {
  /** Utilização de tecidos, Tipo do tecido, Cor do tecido */
  const allowedFilters = ["cores", "brand", "price", "category-2"];
  return allowedFilters.includes(filter.key);
}

function UsageFilter(filter: FilterToggle) {
  return (
    <div class="collapse collapse-arrow bg-base-100 rounded-none mb-1 text-base-300 border-b border-[#C3C3C3] lg:border-none ">
      <input type="checkbox" class="min-h-[0px]" />
      <div class="collapse-title min-h-[0px] rounded-none flex gap-2 px-0 lg:px-5">
        <span>Utilização do tecido</span>
      </div>

      <div class="collapse-content">
        <ul class={`flex flex-col `}>
          <FilterValues {...filter} />
        </ul>
      </div>
    </div>
  );
}

function TypeFilter(filter: FilterToggle) {
  return (
    <div class="bg-base-100 rounded-none mb-1 text-base-300 border-b border-[#C3C3C3] lg:border-none ">
      <div class="min-h-[0px] rounded-none flex gap-2 px-0 lg:px-5">
        <span>Tipo de tecido</span>
      </div>
      <div class="flex">
        <ul class={`flex`}>
          <TypeFilterValues {...filter} />
        </ul>
      </div>
    </div>
  );
}

function FeaturedFilters({ filters }: Props) {
  return (
    <ul class="flex gap-2">
      {filters
        .filter(isToggle)
        .map((filter) => (
          isAllowedFilter(filter) &&
          (
            <li class="flex flex-col">

              {
                filter.key === "category-2" &&
                <TypeFilter {...filter} />
              }
              {
                filter.key === "usage" &&
                <UsageFilter {...filter} />
              }
              {/* <div class="collapse collapse-arrow bg-base-100 rounded-none mb-1 text-base-300 border-b border-[#C3C3C3] lg:border-none ">
                <input type="checkbox" class="min-h-[0px]" />
                <div class="collapse-title min-h-[0px] rounded-none flex gap-2 px-0 lg:px-5">
                  <span>{filter.label}</span>
                </div>

                <div class="collapse-content">
                  <ul class={`flex flex-col `}>
                    <FilterValues {...filter} />
                  </ul>
                </div>
              </div> */}
            </li>
          )
        ))}
    </ul>
  );
}

export default FeaturedFilters;
