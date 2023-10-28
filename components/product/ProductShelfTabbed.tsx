import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { usePartial } from "apps/website/hooks/usePartial.ts";

/** @titleBy title */
interface Tab {
  title: string;
  products: Product[] | null;
}

export interface Props {
  tabs: Tab[];
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
  tabIndex?: number;
  id?: string;
}

function TabbedProductShelf({
  tabs,
  title,
  description,
  layout,
  cardLayout,
  tabIndex,
  id: sectionId,
}: Props) {
  const id = useId();
  const platform = usePlatform();
  const ti = typeof tabIndex === "number"
    ? Math.min(Math.max(tabIndex, 0), tabs.length)
    : 0;
  const { products } = tabs[ti];

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container py-3 flex flex-col gap-4 lg:gap-6 lg:py-5">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "left"}
      />

      <div class="flex justify-start">
        <div class="tabs">
          {tabs.map((tab, index) => (
            <button
              class={`tab tab-lg uppercase text-base ${index=== 0 ? "pl-0" : ""} ${index === ti ? "tab-active bg-transparent underline" : ""}`}
              {...usePartial({ id: sectionId, props: { tabIndex: index } })}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div
        id={id}
        class="flex-grow"
      >
        {/* class="grid grid-cols-2 gap-2 items-center sm:grid-cols-5 sm:gap-[30px]  " */}
        <div class="flex flex-row  justify-evenly items-start h-[400px] ">
          {products?.map((product, index) => (
            <div
              class="w-[170px] sm:w-[220px]"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                
              />
            </div>
          ))}
        </div>

        {/* <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </> */}
        {/* <SliderJS rootId={id} />
        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        /> */}
      </div>
    </div>
  );
}

export default TabbedProductShelf;
