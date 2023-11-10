import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { useId } from "$store/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { AllowedFilters } from "./SearchResult.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  allowedFilters: AllowedFilters[];
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

function isAllowedFilter(
  allowedFilter: AllowedFilters[],
  filter: FilterToggle,
) {
  const allowedFilters = allowedFilter.map((item) => item.key);
  return allowedFilters.includes(filter.key);
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

interface CarouselAllowedOption {
  image: string;
  title: string;
  item: FilterToggleValue;
}

function CarouselValueItem(
  { image, title, item }: CarouselAllowedOption,
) {
  const { url, selected, label, quantity } = item;
  return (
    <a
      href={url}
      class="flex flex-col items-center text-center gap-1 hover:underline lg:px-2"
    >
      <div class="w-[48px] h-[48px]">
        <img
          src={image}
          class={`w-full h-full border-4 shadow-lg rounded-md block ${
            selected ? "border-[#70A4E0]" : "border-white"
          }`}
        />
      </div>
      <span class="text-sm">{title}</span>
    </a>
  );
}

interface CarouselFilterProps {
  filter: FilterToggle;
  allowedFilters: AllowedFilters[];
}

function CarouselFilterValues({ filter, allowedFilters }: CarouselFilterProps) {
  const id = useId();
  const { key, values } = filter;

  const isAllowedOption = (value: FilterToggleValue) => {
    const allowedFilter = allowedFilters.find((item) => item.key == key);
    const allowedOption = allowedFilter?.values.find((item) =>
      item.key == value.value
    );
    return Boolean(allowedOption);
  };
  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] px-0  flex-grow  h-[80px] max-w-[500px]"
    >
      <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5  justify-start  sm:h-[450px]">
        {values.filter(isAllowedOption).map((item, index) => {
          let allowedOption = allowedFilters.find((filter) => filter.key == key)
            ?.values.find((option) => option.key == item.value);
          const { title, image } = allowedOption || { title: "", image: "" };
          return (
            <Slider.Item
              index={index}
              class="w-[220px] sm:w-[240px] min-h-[320px] first:ml-6 sm:first:pl-0 last:mr-6 sm:last:pr-0"
            >
              <CarouselValueItem {...{ item, title, image }} />
            </Slider.Item>
          );
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

function CarouselFilter({ filter, allowedFilters }: CarouselFilterProps) {
  return (
    <div class="bg-base-100 rounded-none mb-1 text-base-300 border-b border-[#C3C3C3] lg:border-none py-4">
      <div class="flex">
        <ul class={`flex`}>
          <CarouselFilterValues
            filter={filter}
            allowedFilters={allowedFilters}
          />
        </ul>
      </div>
    </div>
  );
}

interface DropdownFilterProps {
  filter: FilterToggle;
  label: string;
}

function DropdownFilter({ filter, label }: DropdownFilterProps) {
  return (
    <div class="collapse collapse-arrow bg-base-100 rounded-none mb-1 text-base-300 border-b border-[#C3C3C3] lg:border-none ">
      <input type="checkbox" class="min-h-[0px]" />
      <div class="collapse-title min-h-[0px] rounded-none flex gap-2 px-0 lg:px-5">
        <span>{label || filter.label}</span>
      </div>

      <div class="collapse-content">
        <ul class={`flex flex-col `}>
          <FilterValues {...filter} />
        </ul>
      </div>
    </div>
  );
}

function FeaturedFilters({ filters, allowedFilters }: Props) {
  const getAllowedFromFilter = (filter: FilterToggle) => {
    console.log({ allowedFilters });
    const allowedFilter = allowedFilters.find((item) => item.key == filter.key);
    return allowedFilter;
  };

  const isAllowed = (filter: Filter): filter is FilterToggle =>
    Boolean(allowedFilters.find((item) => item.key == filter.key));

  return (
    <div class="relative min-h-[90px] py-2">
      <div class="absolute z-50">
        <ul class="flex gap-2 z-50">
          {filters
            .filter(isToggle)
            .filter(isAllowed)
            .map((filter) => {
              const allowed = getAllowedFromFilter(filter);
              if (allowed?.type == "carousel") {
                return (
                  <CarouselFilter
                    filter={filter}
                    allowedFilters={allowedFilters}
                  />
                );
              }

              if (allowed?.type == "dropdown") {
                return <DropdownFilter filter={filter} label={allowed.title} />;
              }
            })}
        </ul>
      </div>
    </div>
  );
}

export default FeaturedFilters;
