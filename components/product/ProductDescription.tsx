import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import LaundryInstructions from "$store/components/product/LaundryInstructions.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";
import VideoTutorials, { Video } from "$store/components/ui/VideoTutorials.tsx";

interface Props {
  page: ProductDetailsPage | null;
  videoTutorials: Video[];
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
  borderRoundedBot?: boolean;
}

function ProductInfo(
  { page, videoTutorials, layout, borderRoundedBot = false }: Props,
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
    offers,
    isVariantOf,
    additionalProperty = [],
    brand,
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";

  const instructions = isVariantOf?.additionalProperty.filter((p) =>
    p.name === "Instruções de Lavagem"
  ).map((item) => item.value) as AvailableIcons[];

  const curtainCategory = product.additionalProperty?.filter((p) =>
    p.value?.toLocaleLowerCase().includes("cortina") ||
    p.value?.toLocaleLowerCase().includes("persiana")
  );

  const isCurtain = curtainCategory && curtainCategory.length;
  console.log(product)

  return (
    <div
      class={`container bg-white p-5 lg:p-12  w-full border-x border-[#cecece] ${
        borderRoundedBot && "rounded-b  border-b  rounded-md"
      } `}
    >
      <div class="w-full justify-between border-t border-[#cecece}  mt-4 sm:mt-6 grid grid-cols-5">
        {/* Description card */}
        <div
          class={`pt-5 ${
            isCurtain ? "col-span-5 md:col-span-3" : "col-span-5"
          }`}
        >
          <div class="py-0 lg:py-5">
            {description && (
              <div class="flex-col">
                <div
                  class={`flex flex-col ${
                    !isCurtain && "lg:grid-cols-5 lg:flex-row"
                  } justify-start items-start`}
                >
                  <span
                    class={`flex justify-start items-start sm:min-w-[300px] uppercase text-base ${
                      !isCurtain && "lg:col-span-1"
                    } pt-2 mb-11 font-bold`}
                  >
                    INFORMAÇÕES DO PRODUTO
                  </span>
                  <div
                    class={`flex flex-row  flex-wrap  flex-grow  w-full ${
                      !isCurtain && "lg:min-w-[900px] lg:col-span-4"
                    } lg:max-w-full gap-5 `}
                  >
                    {brand && (
                      <div class={`flex flex-col sm:min-w-[200px] mb-5 `}>
                        <span class="text-base uppercase font-bold">Marca</span>
                        <span class="text-sm uppercase ">{brand.name}</span>
                      </div>
                    )}

                    {isVariantOf?.additionalProperty.map((item) => {
                      if (
                        item.name && item.value !== undefined &&
                        item.name !== "category" && item.name !== "RefId" &&
                        item.name !== "sellerId" &&
                        item.name !== "Instruções de Lavagem"
                      ) {
                        return (
                          <div class={`flex flex-col sm:min-w-[200px] mb-5 `}>
                            <span class="text-base uppercase font-bold">
                              {item.name}
                            </span>
                            <span class="text-sm uppercase ">{item.value}</span>
                          </div>
                        );
                      }
                    })}
                    {instructions.length && (
                      <div class="flex flex-col sm:min-w-[200px] mb-5">
                        <span class="text-base  uppercase font-bold">
                          INSTRUÇÕES
                        </span>
                        <span class="text-sm uppercase font-normal">
                          <LaundryInstructions instructions={instructions} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div class={`${isCurtain ? "col-span-5 md:col-span-2" : "hidden"}`}>
          <VideoTutorials videos={videoTutorials} />
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
