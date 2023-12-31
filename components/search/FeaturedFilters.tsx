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
import { AllowedFilters } from "./SearchResult.tsx";
import SizeFilter from "$store/components/search/SizeFilter.tsx";
import type { BreadcrumbList } from "apps/commerce/types.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  allowedFilters: AllowedFilters[];
  url: BreadcrumbList["itemListElement"];
  hiddenCategory: boolean;
}

const CORES: { [cor: string]: string } = {
  "Amarelo": "bg-[#FFFF00]",
  "Azul": "bg-[#0000FF]",
  "Azul Bebê": "bg-[#89CFF0]",
  "Azul Celeste": "bg-[#7EC0EE]",
  "Azul Royal": "bg-[#4169E1]",
  "Bege": "bg-[#F5F5DC]",
  "Branco": "bg-[#FFFFFF]",
  "Cinza": "bg-[#808080]",
  "Laranja": "bg-[#FFA500]",
  "Lilás": "bg-[#C8A2C8]",
  "Marrom": "bg-[#A52A2A]",
  "Ouro": "bg-[#FFD700]",
  "Pink": "bg-[#FF0084]",
  "Prata": "bg-[#C0C0C0]",
  "Preto": "bg-[#000000]",
  "Rosa": "bg-[#FFC0CB]",
  "Rosa Bebê": "bg-[#F4C2C2]",
  "Roxo": "bg-[#800080]",
  "Terracota": "bg-[#E2725B]",
  "Verde": "bg-[#008000]",
  "Verde Bandeira": "bg-[#006400]",
  "Vermelho": "bg-[#FF0000]",
  "Vinho": "bg-[#722F37]",
  "Animal Print": "bg-gradient-to-r from-teal-200 to-lime-200",
  "Estampado": "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
  "Étnico": "bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400",
  "Floral": "bg-gradient-to-r from-yellow-400 via-gray-50 to-teal-300",
  "Mescla":
    "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-sky-500 to-sky-500",
  "Transparente": "bg-[#FFFFFF]",
};

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <li>
      <a
        rel="nofollow"
        href={url}
        class="flex items-center hover:underline lg:px-5 min-w-[250px] max-w-[250px]"
      >
        <span class="text-sm ml-2 mr-auto truncate w-full bg-[#fff]">
          {label}
        </span>
        {quantity > 0 && (
          <span class="text-sm  ml-auto text-base-300">({quantity})</span>
        )}
      </a>
    </li>
  );
}

function ValueItemColor(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <li>
      <a
        href={url}
        rel="nofollow"
        class="flex items-center hover:underline lg:px-5 min-w-[250px] max-w-[250px]"
      >
        <div
          class={`h-[13px] w-[13px] ${
            CORES[label]
          } rounded-full border-2 border-[#C0C0C0] shadow-md `}
        >
        </div>

        <span class="text-sm ml-2 mr-auto truncate w-full bg-[#fff]">
          {label}
        </span>
        {quantity > 0 && (
          <span class="text-sm  ml-auto text-base-300">({quantity})</span>
        )}
      </a>
    </li>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul
      class={`flex  justify-between  bg-[#fff] ${flexDirection} max-w-[249px] min-w-[249px] border border-[#DEDEDE] border-t-[0px] py-2 `}
    >
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
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
        if (key === "cor-principal") {
          return <ValueItemColor {...item} />;
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
  url?: BreadcrumbList["itemListElement"];
}

function CarouselValueItem(
  { image, title, item }: CarouselAllowedOption,
) {
  return (
    <a
      href={item.url}
      rel="nofollow"
      class="flex flex-col items-center text-center gap-1 hover:underline lg:px-2"
    >
      <div class="w-[70px] h-[60px]">
        <img
          src={image}
          class={`w-full h-full border-4 shadow-lg rounded-md block ${
            item.selected ? "border-[#70A4E0]" : "border-white"
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
  url: BreadcrumbList["itemListElement"];
}

function CarouselFilterValues(
  { filter, allowedFilters, url }: CarouselFilterProps,
) {
  const id = useId();
  const { key, values } = filter;

  const isAllowedOption = (value: FilterToggleValue) => {
    const allowedFilter = allowedFilters.find((item) =>
      item.key == key && item?.pageName == url[url.length - 1].name
    );
    const allowedOption = allowedFilter?.values.find((item) =>
      item.key == value.value
    );
    return Boolean(allowedOption);
  };
  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:px-0 flex-grow h-[110px] pt-3 sm:pt-0 sm:h-[80px]  max-w-[350px]  lg:max-w-[600px] lg:min-w-[400px] w-full mx-1 lg:mx-10"
    >
      <Slider class="carousel carousel-center sm:carousel-end gap-3 sm:gap-6 col-span-full row-start-2 row-end-5  justify-start  sm:max-h-[450px] min-w-[350px]">
        {values.filter(isAllowedOption).map((item, index) => {
          const allowedOption = allowedFilters.find((filter) =>
            filter.key == key
          )
            ?.values.find((option) => option.key == item.value);
          if (!allowedOption) return null;
          const { title = "", image = "" } = allowedOption;

          return (
            <Slider.Item
              index={index}
              class="w-[220px] sm:w-[240px] lg:first:ml-1 sm:first:pl-0 last:mr-6 sm:last:pr-0"
            >
              <CarouselValueItem {...{ item, title, image }} />
            </Slider.Item>
          );
        })}
      </Slider>
      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-1">
          <Slider.PrevButton class="btn btn-circle btn-outline absolute top-1/2 right-1/2 mr-4 bg-none border-none text-black hover:bg-white hover:text-black mt-4">
            <Icon size={24} id="ChevronLeft" strokeWidth={1} />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-1">
          <Slider.NextButton class="btn btn-circle btn-outline absolute top-1/2 left-1/2 ml-4 bg-none border-none text-black hover:bg-[#fff] hover:text-black mt-4">
            <Icon size={24} id="ChevronRight" strokeWidth={1} />
          </Slider.NextButton>
        </div>
      </>
      <SliderJS rootId={id} />
    </div>
  );
}

function CarouselFilter({ filter, allowedFilters, url }: CarouselFilterProps) {
  return (
    <div class="bg-base-100 mb-1 text-base-300 border border-[#dedede] lg:py-4 rounded">
      <div class="flex">
        <ul class={`flex`}>
          <CarouselFilterValues
            filter={filter}
            allowedFilters={allowedFilters}
            url={url}
          />
        </ul>
      </div>
    </div>
  );
}
// interface IconsAllowedOption {
//   icon: AvailableIcons ;
//   title: string;
//   item: FilterToggleValue;
// }

function IconsValueItem({ title, item, icon }: IconsAllowedOption) {
  return (
    <a
      href={item.url}
      rel="nofollow"
      class={`${
        item.selected
          ? "text-[#70A4E0] border-[#DADADA] bg-base-100 border-2"
          : "text-[#838383] border-none"
      } flex flex-col items-center text-center rounded-md text-[9px] justify-center w-[100px] gap-2 h-[110px] py-2`}
    >
      <div class="w-full flex justify-center items-center">
        {icon === "rectangularTable"
          ? (
            <Icon
              id={icon}
              height={51}
              width={65}
              strokeWidth={2}
              class=""
            />
          )
          : (
            <Icon
              id={icon}
              size={45}
              strokeWidth={2}
              class=""
            />
          )}
      </div>
      <span class="text-[9px] w-full uppercase font-bold mt-1">
        {title}
      </span>
    </a>
  );
}

function IconsFilterValues(
  { filter, allowedFilters, url }: CarouselFilterProps,
) {
  const { key, values } = filter;
  const allowedFilter = allowedFilters.find((item) =>
    item.key == key && item?.pageName == url[url.length - 1].name
  );

  const isAllowedOption = (value: FilterToggleValue) => {
    const allowedOption = allowedFilter?.values.find((item) =>
      item.key == value.value
    );
    return Boolean(allowedOption);
  };

  return (
    <div>
      <p class="text-xs pl-1 mb-3">{allowedFilter?.title}</p>

      <div class="carousel carousel-start sm:carousel-end  justify-start min-w-[300px] max-w-[350px]  h-[110px] gap-10 lg:max-w-[900px] ">
        {values.filter(isAllowedOption).map((item, index) => {
          const allowedOption = allowedFilters.find((filter) =>
            filter.key == key && filter?.pageName == url[url.length - 1].name
          )
            ?.values.find((option) => option.key == item.value);
          if (!allowedOption) return null;
          const { title = "", image = "", icon = "" } = allowedOption;
          return <IconsValueItem {...{ item, title, image, icon }} />;
        })}
      </div>
    </div>
  );
}

function IconsFilter({ filter, allowedFilters, url }: CarouselFilterProps) {
  return (
    <div class="rounded-none text-base-300 lg:border-none h-[120px]">
      <div class="flex">
        <ul class={`flex`}>
          <IconsFilterValues
            filter={filter}
            allowedFilters={allowedFilters}
            url={url}
          />
        </ul>
      </div>
    </div>
  );
}

interface DropdownFilterProps {
  filter: FilterToggle;
  label: string;
  url: BreadcrumbList["itemListElement"];
}

function DropdownFilter({ filter, label, url }: DropdownFilterProps) {
  return (
    <div class="flex items-end  w-full group min-w-[250px] max-w-[250px]">
      <div class="hidden lg:flex   group-hover:flex rounded-md mb-1 text-base-300 border border-[#DEDEDE] w-full relative min-w-[250px] max-w-[250px]  pl-[5px] max-h-[40px] bg-[#fff]">
        <div class=" group-hover:flex w-full flex h-[40px] pl-5  items-center  min-w-[250px] max-w-[250px]">
          <span>
            {filter.label === "Dimensão (Diâmetro ou Maior Lado)"
              ? "Diâmetro ou Maior Lado"
              : filter.label}
          </span>
        </div>

        <ul class=" hidden group-hover:flex flex-col items-center w-full h-full shrink-0 absolute top-[28px] left-0 border border-[#DEDEDE] border-t-0 min-w-[250px] max-w-[250px] z-50 ">
          <FilterValues {...filter} />
        </ul>
      </div>

      <div class="lg:hidden collapse collapse-arrow bg-base-100 rounded-md mb-1 text-base-300 border-[#DEDEDE]   max-w-[250px]">
        <input type="checkbox" class="min-h-[0px]" />
        <div class="collapse-title min-h-[0px] flex gap-2 px-5">
          <span>{filter.label}</span>
        </div>

        <div class="collapse-content ">
          <ul class={`flex flex-col max-w-[250px] min-w-[250px] `}>
            <FilterValues {...filter} />
          </ul>
        </div>
      </div>
    </div>
  );
}

function RangeFilter({ filter, label, url }: DropdownFilterProps) {
  // console.log({ filter });
  return (
    <div class="w-full">
      <span>{filter.label}</span>
      <input
        type="range"
        min={filter.values[0].value}
        max={filter.values[filter.values.length - 1].value}
        value={filter.values[0].value}
        class="range range-xs w-full"
        step="10"
      />
      <div class="w-full flex justify-between text-xs px-2">
        {filter.values.map((f) => (
          <span class="text-[9px]">{Number(f.value)}</span>
        ))}
        {
          /* <span>0</span>
        <span>200</span>
        <span>350</span>
        <span>400</span>
        <span>420</span> */
        }
      </div>
    </div>
  );
}

function FeaturedFilters(
  { filters, allowedFilters, url, hiddenCategory }: Props,
) {
  // console.log({ urlName: url[url.length - 1].name, filters });
  const ordenarListaComCorPrimeiro = (lista: Filter[]) => {
    const filtroCor = lista.find((item, index) => item.key == "cor-principal");

    const indexCor = lista.findIndex((item, index) =>
      item.key == "cor-principal"
    );

    if (filtroCor) {
      lista.splice(indexCor, 1);
      lista.unshift(filtroCor);
    }

    const filtroLavagem = lista.find((item, index) =>
      item.key == "instrucoes-de-lavagem"
    );

    const lavagem = lista.findIndex((item, index) =>
      item.key == "instrucoes-de-lavagem"
    );

    if (filtroLavagem) {
      lista.splice(lavagem, 1);
    }
  };

  ordenarListaComCorPrimeiro(filters);
  const getAllowedFromFilter = (filter: FilterToggle) => {
    const allowedFilter = allowedFilters.find((item) =>
      item.key == filter.key && item.pageName == url[url.length - 1].name
    );

    return allowedFilter;
  };
  const isAllowed = (filter: Filter): filter is FilterToggle =>
    Boolean(
      allowedFilters.find((item) =>
        item.key == filter.key && item.pageName == url[url.length - 1].name
      ),
    );
  return (
    <div class="flex relative w-full justify-center min-h-[110px] py-2 ">
      <div class=" ">
        <ul class="flex flex-col  lg:flex-row gap-2 ">
          {filters
            .filter(isToggle)
            .filter(isAllowed)
            .filter((filter: Filter) =>
              hiddenCategory ? (filter.key !== "category-2") : (true)
            )
            .map((filter) => {
              const allowed = getAllowedFromFilter(filter);

              if (
                allowed?.type == "carousel" &&
                allowed?.pageName == url[url.length - 1].name
              ) {
                return (
                  <CarouselFilter
                    filter={filter}
                    allowedFilters={allowedFilters}
                    url={url}
                  />
                );
              }

              if (
                allowed?.type == "dropdown" &&
                allowed?.pageName == url[url.length - 1].name
              ) {
                return (
                  <DropdownFilter
                    filter={filter}
                    label={allowed.title}
                    url={url}
                  />
                );
              }

              if (
                allowed?.type == "range" &&
                allowed?.pageName == url[url.length - 1].name
              ) {
                return (
                  <RangeFilter
                    filter={filter}
                    label={allowed.title}
                    url={url}
                  />
                );
              }

              if (
                allowed?.type == "icons" &&
                allowed?.pageName == url[url.length - 1].name
              ) {
                return (
                  <IconsFilter
                    filter={filter}
                    allowedFilters={allowedFilters}
                    url={url}
                  />
                );
              }
            })}
          {/* <SizeFilter  filters={filters} /> */}
        </ul>
      </div>
    </div>
  );
}

export default FeaturedFilters;
