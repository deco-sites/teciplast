import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeaderColor.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Small" | "Normal" | "Large";
  };
  borderRoundedBot?: boolean;
  cardLayout?: cardLayout;
}

function PdpProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
  borderRoundedBot = false,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      class={`container bg-white p-5 lg:p-12  w-full border-x border-[#cecece] ${
        borderRoundedBot && "rounded-b border-b rounded-md"
      } `}
    >
      <div class="w-full flex flex-col justify-center items-center  py-4 gap-5 lg:py-5 border-t-2 border-[#DEDEDE] mt-5">
        <div class="w-full max-w-[1300px]">
          <Header
            title={title || ""}
            description={description || ""}
            fontSize={layout?.headerfontSize || "Large"}
            alignment={layout?.headerAlignment || "center"}
          />
        </div>

        <div
          id={id}
          class="grid grid-cols-[36px_1fr_36px] px-0 flex-grow sm:h-[450px]"
        >
          <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5  justify-start  sm:h-[400px]">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class="w-[220px] sm:w-[240px] min-h-[320px] first:ml-6 sm:first:pl-0 last:mr-6 sm:last:pr-0"
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  layout={cardLayout}
                  platform={platform}
                />
              </Slider.Item>
            ))}
          </Slider>
          <>
            <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-[#ffffff9f] border-none text-black hover:bg-[#fff] hover:text-black">
                <Icon size={24} id="ChevronLeft" strokeWidth={1} />
              </Slider.PrevButton>
            </div>
            <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-[#ffffff9f] border-none text-black hover:bg-[#fff] hover:text-black">
                <Icon size={24} id="ChevronRight" strokeWidth={1} />
              </Slider.NextButton>
            </div>
          </>
          <SliderJS rootId={id} />
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
          />
        </div>
      </div>
    </div>
  );
}

export default PdpProductShelf;
