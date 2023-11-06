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
import ColorSelector from "./ProductColorSelector.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
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

  return (
    <div class="flex flex-col">
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
        <div className="flex text-[#3a3a3a] items-center">
          <div class="mt-1">
            <span class="font-bold text-base mr-1">4.8</span>
          </div>
          <div className="rating rating-sm mr-1 rating-half flex items-center">
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-1 bg-yellow-400"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-2 bg-yellow-400"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-1 bg-yellow-400"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-2 bg-yellow-400"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-1 bg-yellow-400"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-2 bg-yellow-400"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-1 bg-yellow-400"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-2 bg-yellow-400"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-1 bg-yellow-400"
              disabled
              checked
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star mask-half-2 bg-yellow-400"
              disabled
            />
          </div>
          <div>(25 avaliações)</div>
        </div>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-col">
          {
            /* {(listPrice ?? 0) > price && (
            <span class="line-through text-base-300 text-xs">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )} */
          }
          <span class="line-through text-base-300 text-xs">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
          <div class="flex items-center">
            <span class="text-2xl text-[#403F3F] font-bold">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
            <div class="bg-[#008000] text-white rounded py-[2px] px-2 ml-3">
              <span class="text-sm font-semibold">25% OFF</span>
            </div>
          </div>
        </div>
        <span class="text-base text-base-300">
          até {installments}
        </span>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ColorSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                    seller={seller}
                  />
                  <WishlistButton
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "wake" && (
                <AddToCartButtonWake
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
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
      {/* Description card */}
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
