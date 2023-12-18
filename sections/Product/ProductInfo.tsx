import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "$store/components/product/ProductVariantSelector.tsx";
import BenefitsBarPdp from "$store/islands/BenefitsBarPdp.tsx";
import ColorSelector from "$store/components/product/ProductColorSelector.tsx";
import BedSizeSelector from "$store/components/product/ProductBedSizeSelector.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import RatingStars from "$store/components/ui/RatingStars.tsx";
import {
  AverageResponse,
  ratingLoader,
} from "$store/loaders/Reviews/reviewsandratings.ts";
import type { SectionProps } from "deco/mod.ts";
import FabricSizeTableModal from "$store/islands/FabricSizeTableModal.tsx";

import ProductInfoQuantityIsland from "$store/islands/ProductInfoQuantityIsland.tsx"
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";

export interface RecordItem {
  name: string;
  pSize: number;
  mSize: number;
  gSize: number;
}

export interface TableItem {
  title: string;
  /** @format textarea */
  records: RecordItem[];
}

interface Props {
  page: ProductDetailsPage | null;
  fabricSizeTable: TableItem[];
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

export async function loader(
  { page, layout, fabricSizeTable }: Props,
  _req: Request,
) {
  let rating = { average: 4, totalCount: 3 } as AverageResponse;
  let debug = {};

  try {
    rating = (await ratingLoader({
      productId: page!.product!.productID,
    })) as AverageResponse;
    // console.log({ ratinggg: rating });
  } catch (e) {
    debug = { ...debug, reviewsError: e };
    console.log({ e });
  }
  return {
    page,
    layout,
    fabricSizeTable,
    rating,
    debug,
  };
}

function ProductInfo(
  { page, layout, fabricSizeTable, debug, rating }: SectionProps<typeof loader>,
) {
  const platform = usePlatform();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
    category,
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;
  const percentageDiscount = listPrice
    ? Math.round((discount / listPrice) * 100)
    : 0;

  const isFabric = product.additionalProperty!.find((p) =>
    p.value === "Tecidos"
  );
  const hasVariant = isVariantOf?.hasVariant ?? [];

  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <div class="flex flex-col max-w-[100vw]">
      {/* Code and name */}
      <div>
        <h1>
          <span class="font-semibold text-2xl capitalize text-[#403F3F]">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>
      </div>
      {/* Rating */}
      <div class="flex py-2 text-xs ">
        <RatingStars
          productId={"productInfo-" + productID}
          display="detailsPage"
          size="sm"
          average={rating.average}
          count={rating.totalCount}
        />
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-col">
          {listPrice !== price && (
            <span class="line-through text-base-300 text-xs">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <div class="flex items-center">
            <span class="text-2xl text-[#403F3F] font-bold">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
            {discount > 0 && (
              <div class="bg-[#008000] text-white rounded py-[2px] px-2 ml-3">
                <span class="text-sm font-semibold">
                  {percentageDiscount}% OFF
                </span>
              </div>
            )}
          </div>
        </div>
        <span class="text-base text-[#007C2C]">
          até {installments}
        </span>
      </div>
      {/* Sku Selectors */}
      {description &&
        (
          <div
            class={`py-2 w-full `}
            dangerouslySetInnerHTML={{
              __html: description.replaceAll("_x000D_", ""),
            }}
          >
          </div>
        )}
      {additionalProperty &&
        (
          <div class="flex flex-row justify-start w-full  gap-5 py-3">
            {additionalProperty.map((item) => {
              if (
                item.name && item.value !== undefined &&
                item.name !== "category" && item.name !== "RefId"
              ) {
                return (
                  <div class={`flex flex-col `}>
                    <span class="font-bold text-lg">{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                );
              }
            })}
          </div>
        )}
      {/* More Details link */}
      <a href="#more" class="mt-5 flex items-center text-[#403F3F]">
        <span class="uppercase underline text-[#403F3F] text-xs">
          Mais detalhes sobre o produto
        </span>
        <Icon id="ChevronRight" height={20} width={15} />
      </a>

      {category?.includes("Cama") &&
        (
          <div class="mt-4 sm:mt-6">
            <BedSizeSelector product={product} />
          </div>
        )
      }
      {Object.keys(possibilities).includes("Cor Principal") &&
        (
          <div class="mt-4 px-2  sm:px-0 sm:mt-6">
            <ColorSelector product={product}/>
          </div>
        )
      }
     

      {/* Add to Cart and quantity */}
      <ProductInfoQuantityIsland
        isFabric={isFabric}
        availability={availability}
        platform={platform}
        fabricSizeTable={fabricSizeTable}
        name={name}
        productID={productID}
        productGroupID={productGroupID}
        price={price}
        discount={discount}
        seller={seller}
      />

      <div class="lg:hidden flex">
        <BenefitsBarPdp />
      </div>
      {
        /* Description card
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div> */
      }

      {/* Shipping Simulation */}
      <div class="mt-4 border border-[#cecece] p-6">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            }]}
          />
        )}
      </div>

      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
