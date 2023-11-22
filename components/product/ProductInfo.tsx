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
import ProductSelector from "./ProductVariantSelector.tsx";
import BenefitsBarPdp from "$store/islands/BenefitsBarPdp.tsx";
import ColorSelector from "./ProductColorSelector.tsx";
import BedSizeSelector from "./ProductBedSizeSelector.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import RatingStars from "$store/components/ui/RatingStars.tsx";

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
          productId={productID}
          display="detailsPage"
          size="sm"
          average={4.8}
        />
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-col">
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
      {/* Sku Selectors */}
      {description &&
        (
          <div 
            class={`py-2 w-full `}
            dangerouslySetInnerHTML={{ __html: description }}
          >
          </div>
        )}

      {additionalProperty &&
        (
          <div class="flex flex-row justify-start w-full  gap-5 py-3">
            {additionalProperty.map((item) => {
            if(item.name  && item.value !== undefined && item.name !== 'category')
            {return   <div class={`flex flex-col `}>
                      <span class="font-bold text-lg">{item.name}</span>
                      <span>{item.value}</span>
                    </div>}
            })}
          </div>
        )}

      {category?.includes("Cama") &&
        (
          <div class="mt-4 sm:mt-6">
            <BedSizeSelector product={product} />
          </div>
        )}

      {/* More Details link */}
      <a href={"#"} class="mt-5 flex items-center text-[#403F3F]">
        <span class="uppercase underline text-[#403F3F] text-xs">
          Mais detalhes sobre o produto
        </span>
        <Icon id="ChevronRight" height={20} width={15} />
      </a>

      <div class="mt-4 sm:mt-6">
        <ColorSelector product={product} />
      </div>

      {/* Add to Cart and quantity */}
      <div class="mt-4 sm:mt-10 grid grid-cols-5 gap-4">
        <div class="col-span-2">
          <QuantitySelector
            quantity={1}
            widthFull={true}
            coloredButtons={true}
          />
        </div>
        <div class="col-span-3">
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
                    <div class="text-[#818181] items-center flex gap-2 mt-1">
                      <Icon id="secureIcon" height={15} width={13} />
                      <span>Compra 100% Segura</span>
                    </div>
                  </>
                )}
              </>
            )
            : <OutOfStock productID={productID} />}
        </div>
      </div>

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
