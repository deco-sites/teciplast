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
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { Color } from "https://deno.land/x/color@v0.3.0/mod.ts";


/** @titleBy title */
interface Tab {
  title: string;
  products: Product[] | null;
}

interface ColorBG {
   /**
   * @format color
   * @title BackGround Color
   * @default #FFFFFF
   */
  "backGroundShelf": string;
}


export interface Props {
  tabs: Tab[];
  title?: string;

  /**
   * @format color
   * @title Font Color
   * @default #000
   */
  text : ColorBG
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  /**
   * @format color
   * @title BackGround Color
   * @default #FFFFFF
   */
  backGround:ColorBG
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
  backGround,
  text
  }: Props) {
  const id = useId();
  const platform = usePlatform();
  const ti = typeof tabIndex === "number"
    ? Math.min(Math.max(tabIndex, 0), tabs.length)
    : 0;
  const { products, } = tabs[ti];


  if (!products || products.length === 0) {
    return null;
  }

    return (
    <div class="w-full"  style={ {background:backGround.backGroundShelf}}>      
      <div class="w-full container py-3 flex flex-col gap-4 lg:gap-6 lg:py-5 bg-transparent"
                          style={ {color:text.backGroundShelf}}
                          >
          <Header
            title={title || ""}
            description={description || ""}
            fontSize={layout?.headerfontSize || "Large"}
            alignment={layout?.headerAlignment || "left"}
            text={text}
          />

          <div class="flex justify-start px-4">
            <div class="tabs gap-5">
              {tabs.map((tab, index) => (
                <button
                  class={`tab tab-lg gap-2 p-0  uppercase text-base ${index=== 0 ? "pl-0" : ""} ${index === ti ? "tab-active bg-transparent underline" : ""}`}
                  style={ {color:text.backGroundShelf}}
                  {...usePartialSection({ props: { tabIndex: index } })}
                >
                  {tab.title}
                </button>
              ))}

            </div>
          </div>

          <div
            id={id}
            class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5  flex-grow  sm:h-[450px] "
          >
            <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5  justify-start  sm:h-[450px]">
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
          </div>


          <div class={`container flex flex-row justify-start lg:justify-end  py-5 cursor-pointer px-5 `}> 
            <a href={`/${tabs[ti].title}`}> 
              Ver mais {`${tabs[ti].title} `}
            </a> 
          </div>

        </div>
      </div>
    );
}


export default TabbedProductShelf;
