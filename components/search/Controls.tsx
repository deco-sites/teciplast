import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import PriceFilter from "$store/components/search/PriceFilter.tsx";

import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <div class="w-full  flex justify-center items-center ">
          <div class="left-auto  absolute top-5  rounded-none  bg-base-100 w-10/12  ">
            <div class="flex flex-col w-full  items-center justify-center">
              <div class="flex justify-between  w-full  border-b border-[#C3C3C3] lg:border-none   px-5  py-5">
                <h1 class="">
                  <span class="font-medium text-[18px]">Filtrar Produtos</span>
                </h1>
                <Button
                  class="btn btn-ghost text-[##6A6A6A]"
                  onClick={() => open.value = false}
                >
                  <Icon id="XMark" size={24} strokeWidth={2} />
                </Button>
              </div>

              <div class="flex-grow overflow-auto  w-full pb-10  px-5">
              {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}

                <Filters filters={filters} />
                <PriceFilter filters={filters} />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div class="flex flex-col mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] justify-end">
        <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none flex-wrap ">
          <div class="flex flex-row sm:hidden items-center sm:p-0 mb-2">
            <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          </div>
          <Button
            class={displayFilter
              ? "btn-ghost "
              : "btn-ghost  flex flex-row border border-[#CBCBCB] text-xs justify-center items-center gap-3 px-3 text-[#818181] sm:hidden"}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar produtos
            <Icon
              id="FilterList"
              width={24}
              height={24}
              class="text-[#818181] "
            />
          </Button>
          <div class="hidden lg:flex">
            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
