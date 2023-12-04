import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import LaundryInstructions from "$store/components/product/LaundryInstructions.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";

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
  borderRoundedBot?: boolean;
}

function ProductInfo({ page, layout, borderRoundedBot = false }: Props) {
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

  return (
    <div
      class={`container bg-white p-5 lg:p-12  w-full border-x border-[#cecece] ${
        borderRoundedBot && "rounded-b  border-b  rounded-md"
      } `}
    >
      <div class="flex flex-col w-full items-center justify-between border-t border-[#cecece}  mt-4 sm:mt-6 ">
        {/* Description card */}
        <div class="pt-5 ">
          <div class="py-0 lg:py-5">
            {description && (
              <div class="flex flex-col lg:flex-row justify-start items-start">
                <span class="flex justify-start items-start sm:min-w-[300px] uppercase text-base">
                  <a name="more">Descrição do Produto</a>
                </span>
                {description &&
                  (
                    <div
                      class={`py-2 flex-row flex-wrap flex-grow w-full lg:min-w-[900px] lg:max-w-[900px] gap-5`}
                      dangerouslySetInnerHTML={{
                        __html: description.replaceAll("_x000D_", ""),
                      }}
                    >
                    </div>
                  )}
              </div>
            )}
          </div>

          <div class="py-5">
            {description && (
              <div class="flex flex-col lg:flex-row justify-start items-start">
                <span class="flex justify-start items-start sm:min-w-[300px] uppercase text-base">
                  INFORMAÇÕES DO PRODUTO
                </span>
                <div class="flex flex-row  flex-wrap  flex-grow  w-full lg:min-w-[900px] lg:max-w-[900px] gap-5 ">
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
                  {
                    /*
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                      Linha
                    </span>
                    <span class="text-sm uppercase underline">
                      Flannel
                    </span>
                  </div>
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                      Coleção
                    </span>
                    <span class="text-sm uppercase underline">
                      Plush
                    </span>
                  </div>
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                      Tecido
                    </span>
                    <span class="text-sm uppercase underline">
                      Microfibra
                    </span>
                  </div>
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                      Composição
                    </span>
                    <span class="text-sm uppercase underline">
                      100% Poliéster
                    </span>
                  </div>
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                      Acabamento
                    </span>
                    <span class="text-sm uppercase font-normal">
                      ALTO BRILHO
                    </span>
                  </div>
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                      GARANTIA
                    </span>
                    <span class="text-sm uppercase font-normal">
                      30 DIAS
                    </span>
                  </div>
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                      DETALHE
                    </span>
                    <span class="text-sm uppercase font-normal">
                      TOQUE MACIO E CONFORTÁVEL MUITO ACONCHEGANTE
                    </span>
                  </div>
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                      OBSERVAÇÕES
                    </span>
                    <span class="text-sm uppercase font-normal">
                      DEVIDO A VARIAÇÕES DE MODELOS DE MONITORES DE COMPUTADOR,
                      AS CORES QUE VOCÊ VÊ NESTA PÁGINA PODEM VARIAR COM A COR
                      REAL DO PRODUTO
                    </span>
                  </div> */

                    instructions.length && (
                      <div class="flex flex-col sm:min-w-[200px] mb-5">
                        <span class="text-base  uppercase font-bold">
                          INSTRUÇÕES
                        </span>
                        <span class="text-sm uppercase font-normal">
                          <LaundryInstructions instructions={instructions} />
                        </span>
                      </div>
                    )
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
