import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import ShareButton from "$store/islands/ShareButton.tsx";
import BenefitsBarPdp from "$store/islands/BenefitsBarPdp.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
  } = props;

  const aspectRatio = `${width} / ${height}`;
  const { page } = props;
  const { product } = page;

  const {
    isVariantOf,
  } = product;
  const description = product.description || isVariantOf?.description;

  return (
    <>
      <div id={id} class=" grid grid-flow-row sm:grid-flow-col lg:gap-5">
        {/* Image Slider */}

        <div class="relative order-1 sm:order-2 ">
          <Slider class="carousel carousel-center gap-6 w-screen h-[220px]  sm:w-[700px]   sm:h-[700px]">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <Image
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={width}
                  height={height}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <div class="absolute top-2 right-2 flex flex-col items-end">
            <WishlistButton
              productGroupID={product.isVariantOf?.productGroupID}
              productID={product.productID}
              pagePDP={true}
            />

            <ShareButton
              productGroupID={product.isVariantOf?.productGroupID}
              productID={product.productID}
              url={product.url!}
            />
          </div>

          <div class="hidden lg:flex">
            <BenefitsBarPdp />
          </div>
        </div>

        {/* Dots */}
        <ul class="flex flex-row justify-center items-center  sm:carousel sm:carousel-center sm:justify-start sm:items-start gap-2  sm:px-0 sm:flex-col order-2 sm:order-1 sm:min-w-[90px] ">
          {images.map((img, index) => (
            <li class="lg:carousel-item  sm:min-w-[76px] max-h-[76px] gap-2 ">
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio }}
                  class="hidden lg:flex  group-disabled:border-[#7EABEE] border group-disabled:border-4    max-h-[76px]"
                  width={76}
                  height={76}
                  src={img.url!}
                  alt={img.alternateName}
                />
                <div>
                  <div class=" lg:hidden first-line:flex w-[10px] h-[10px]  rounded border border-[#7EABEE]  group-disabled:bg-[#7EABEE] " />
                </div>
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <SliderJS rootId={id} />
      </div>
    </>
  );
}
