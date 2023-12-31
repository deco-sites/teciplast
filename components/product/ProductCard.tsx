import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import RatingStars from "$store/components/ui/RatingStars.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    showFavoriteIcon?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    showCardShadow?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image" | "OutZoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  layout?: Layout;

  platform?: Platform;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 384;
const HEIGHT = 332;

function ProductCard(
  { product, preload, itemListName, layout, platform }: Props,
) {
  const {
    url,
    productID,
    name = '',
    image: images,
    offers,
    isVariantOf,
    additionalProperty    
  } = product;

  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf!.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price = 0, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const isFabric = additionalProperty!.find((p) =>
     p.value === "Tecidos"
   );
  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, link]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : link ? "default" : "disabled"}
          content={value}
        />
      </a>
    </li>
  ));
  const cta = (
    <AddToCartButtonVTEX
      name={name}
      productID={productID}
      productGroupID={productGroupID}
      price={price}
      seller={"1"}
      quantity={1}
      extraClasses="text-xs rounded"
    />
  );



  return (
    <div
      id={id}
      class={`group flex flex-col justify-between  w-full min-w-[160px]  h-full  lg:min-h-[400px]  bg-white border-b-[#002A70] border-b-4 rounded-none text-[#303030] ${
        align === "center" ? "text-center" : "text-start"
      } ${
        l?.onMouseOver?.showCardShadow
          ? "lg:hover:border-b-4 lg:hover:shadow-md lg:hover:shadow-[#00000061] transition-shadow duration-150"
          : ""
      }
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      ${l?.hide?.showCardShadow ? "border-b-4 shadowCard " : ""}
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden  lg:h-[200px]"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div
          class={`absolute top-1 z-10
          ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-1"
              : "right-1"
          }
          ${
            l?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : ""
          }
          ${l?.hide?.showFavoriteIcon ? "lg:block " : ""}
        `}
        >
          {platform === "vtex" && (
            <WishlistButton
              productGroupID={productGroupID}
              productID={productID}
              price={price}
            />
          )}
        </div>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full h-[200px]"
        >
          <Image
            src={front?.url!}
            alt={front?.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full  w-full ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }
            ${
              l?.onMouseOver?.image == "OutZoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-90"
                : ""
            }
            `}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="bg-base-100 col-span-full row-span-full transition-opacity  w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-2  p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-1 w-full">
              {skuSelector}
            </ul>
          )}
          {/* {l?.onMouseOver?.showCta && cta} */}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-2" href={url && relative(url)}>
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-1 w-full overflow-auto p-2 ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {l?.hide?.productName && l?.hide?.productDescription
          ? ""
          : (
            <a href={url && relative(url)} class="flex flex-col h-[50px]">
              {l?.hide?.productName ? "" : (

                <h2
                  class="text-[12px]  h-full  text-[#303030] font-bold"
                  
                >{ name.replace(/<[^>]*>/g, '') ?? "" }</h2>

              )}
              {
                /* {l?.hide?.productDescription ? "" : (
                <div
                  class="truncate text-sm lg:text-sm text-neutral"
                  dangerouslySetInnerHTML={{ __html: description ?? "" }}
                />
              )} */
              }
            </a>
          )}
        {
          /* <div class="flex py-2 text-xs ">
          <RatingStars
            productId={productID}
            size="xs"
            extraClasses="hidden lg:group-hover:flex"
            display="productCard"
          />
          <RatingStars
            productId={`mobile-${productID}`}
            size="xs"
            extraClasses="lg:hidden mr-2 "
            display="productCard"
          />
        </div> */
        }
        {l?.hide?.allPrices
          ? ""
          : (
            <div class="flex flex-col gap-5 group-hover:gap-1  py-1 mt-4">
              <div
                class={`flex flex-col gap-0 ${
                  l?.basics?.oldPriceSize === "Normal"
                    ? "lg:flex-row lg:gap-2"
                    : ""
                } ${align === "center" ? "justify-center" : "justify-start"}`}
              >
                {listPrice !== price && (
                  <div
                    class={`line-through text-base-300 text-xs ${
                      l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                    }`}
                  >
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </div>
                )}
                {isFabric
                  ? (
                    <div class="text-[#3e3e3e]  font-bold text-base lg:text-[15px]">
                      {formatPrice(price, offers?.priceCurrency)}{" "}
                      <span class="text-xs">/metro</span>
                    </div>
                  )
                  : (
                    <div class="text-[#3e3e3e]  font-bold text-base lg:text-[15px]">
                      {formatPrice(price, offers?.priceCurrency)}
                    </div>
                  )}

                {l?.hide?.installments
                  ? ""
                  : (
                    <div class="text-base-300 lg:text-[15px] text-xs ">
                      até <span class="text-[#007C2C] ">{installments}</span>
                    </div>
                  )}
              </div>
            </div>
          )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-1 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        <div
          class={l?.onMouseOver?.showCta
            ? "hidden lg:group-hover:flex mt-auto"
            : "lg:hidden"}
        >
          {l?.onMouseOver?.showCta && cta}
        </div>

        {!l?.hide?.cta
          ? (
            <div
              class={`flex-auto flex items-end  ${
                l?.onMouseOver?.showCta ? "lg:hidden" : ""
              }`}
            >
              {cta}
            </div>
          )
          : ""}
      </div>
    </div>
  );
}

export default ProductCard;
