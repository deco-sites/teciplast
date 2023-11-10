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
    offers,
    isVariantOf,
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
 
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  console.log(description)

  return (
    <div class="container bg-white p-5 lg:p-12  w-full border-x border-[#cecece]  ">
      <div class="flex flex-col w-full items-center border-t border-[#cecece}  mt-4 sm:mt-6 ">
       
          {/* Description card */}
        <div class="pt-5 ">
          <div class="py-0 lg:py-5" >
            {description && (
              <div class="flex flex-col lg:flex-row justify-start items-start" >
                <span class="flex justify-start items-start sm:min-w-[300px] uppercase text-base">Descrição do Produto</span>
                {/* <div
                  class="ml-2 mt-2"
                  dangerouslySetInnerHTML={{ __html: description }}
                /> */}

                <span class="text-sm max-w-[900px]">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nibh dui, tempor vel elementum at, suscipit quis tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris pulvinar commodo dictum. In accumsan vitae velit sit amet consequat. Nullam pellentesque malesuada erat nec rutrum. 
                </span>
              </div>
            )}
          </div>

          <div class="py-5" >
            {description && (
              <div class="flex flex-col lg:flex-row justify-start items-start" >

                <span class="flex justify-start items-start sm:min-w-[300px] uppercase text-base">
                  INFORMAÇÕES DO PRODUTO 
                </span>
                <div class="flex flex-row  flex-wrap  flex-grow  w-full max-w-[900px] gap-5 lg:gap-0">
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
                    DEVIDO A VARIAÇÕES DE MODELOS DE MONITORES DE COMPUTADOR, AS CORES QUE VOCÊ VÊ NESTA PÁGINA PODEM VARIAR COM A COR REAL DO PRODUTO
                    </span>

                  </div>
                  <div class="flex flex-col sm:min-w-[200px] mb-5">
                    <span class="text-base  uppercase font-bold">
                    INSTRUÇÕES
                    </span>
                    <span class="text-sm uppercase font-normal">
                    Coisas
                    </span>
                    
                  </div>
                  
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
