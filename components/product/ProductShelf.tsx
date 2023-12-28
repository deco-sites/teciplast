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
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type {
  Product,
  ProductGroup,
  ProductLeaf,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container  py-4 flex flex-col gap-5 lg:py-5">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />
      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0  flex-grow  sm:h-[450px] "
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
  );
}


export const loader = (props: Props) => {
  const bestInstallment = (
    acc: UnitPriceSpecification | null,
    curr: UnitPriceSpecification,
  ) => {
    if (curr.priceComponentType !== "https://schema.org/Installment") {
      return acc;
    }

    if (!acc) {
      return curr;
    }

    if (acc.price > curr.price) {
      return curr;
    }

    if (acc.price < curr.price) {
      return acc;
    }

    if (
      acc.billingDuration && curr.billingDuration &&
      acc.billingDuration < curr.billingDuration
    ) {
      return curr;
    }

    return acc;
  };

  const installment = (specs: UnitPriceSpecification[]) =>
    specs.reduce(bestInstallment, null);

  const isVariantOfMap = (isVariantOf: ProductGroup) => {
    const hasVariant = isVariantOf.hasVariant.map((variant: ProductLeaf) => {
      const { offers, url, productID, additionalProperty } = variant;

      return {
        offers: {
          ...offers,
          offers: offers?.offers.filter((offer) => offer.seller === "1").map(
            (offer) => {
              const best = installment(offer.priceSpecification);
              const specs = offer.priceSpecification.filter((spec) =>
                ["https://schema.org/ListPrice"].includes(spec.priceType)
              );

              if (best) {
                specs.push(best);
              }
              return ({
                seller: offer.seller,
                priceSpecification: specs.map((spec) => {
                  return {
                    ...spec,
                    price: spec.price,
                    priceComponentType: spec.priceComponentType,
                    priceType: spec.priceType,
                    billingIncrement: spec.billingIncrement,
                    billingDuration: spec.billingDuration,
                  };
                }),
                price: offer.price,
                availability: offer.availability,
                inventoryLevel: offer.inventoryLevel,
              });
            },
          ),
        },
        url,
        productID,
        additionalProperty,
      };
    });
    return {
      productGroupID: isVariantOf.productGroupID,
      name: isVariantOf.name,
      hasVariant,
    };
  };

  const products = props.products?.map((product) => {
    return {
      isVariantOf: isVariantOfMap(product.isVariantOf!),
      isSimilarTo: product.isSimilarTo?.map((similar) => {
        const { image, offers, productID, url } = similar;
        const isVariantOf = isVariantOfMap(similar.isVariantOf!);
        return {
          image,
          offers: {
            ...offers,
            offers: offers?.offers.filter((offer) => offer.seller === "1").map(
              (offer) => {
                const best = installment(offer.priceSpecification);
                const specs = offer.priceSpecification.filter((spec) =>
                  ["https://schema.org/ListPrice"].includes(spec.priceType)
                );

                if (best) {
                  specs.push(best);
                }
                return ({
                  seller: offer.seller,
                  priceSpecification: specs.map((spec) => {
                    return {
                      ...spec,
                      price: spec.price,
                      priceComponentType: spec.priceComponentType,
                      priceType: spec.priceType,
                      billingIncrement: spec.billingIncrement,
                      billingDuration: spec.billingDuration,
                    };
                  }),
                  price: offer.price,
                  availability: offer.availability,
                  inventoryLevel: offer.inventoryLevel,
                });
              },
            ),
          },
          productID,
          url,
          isVariantOf,
        };
      }),
      additionalProperty: product.additionalProperty!,
      url: product.url,
      name:product.name,
      offers: {
        ...product.offers,
        offers: product.offers?.offers.filter((offer) => offer.seller === "1")
          .map((offer) => {
            const best = installment(offer.priceSpecification);
            const specs = offer.priceSpecification.filter((spec) =>
              ["https://schema.org/ListPrice"].includes(spec.priceType)
            );

            if (best) {
              specs.push(best);
            }
            return ({
              seller: offer.seller,
              priceSpecification: specs.map((spec) => {
                return {
                  ...spec,
                  price: spec.price,
                  priceComponentType: spec.priceComponentType,
                  priceType: spec.priceType,
                  billingIncrement: spec.billingIncrement,
                  billingDuration: spec.billingDuration,
                };
              }),
              price: offer.price,
              availability: offer.availability,
              inventoryLevel: offer.inventoryLevel,
            });
          }),
      },
      image: product.image,
    };
  });

  

  return { ...props, products };
};

export default ProductShelf;
