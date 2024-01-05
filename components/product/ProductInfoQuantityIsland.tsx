import { useState } from "preact/hooks";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import FabricQuantitySelector from "$store/components/ui/FabricQuantitySelector.tsx";
import FabricSizeTableModal from "$store/islands/FabricSizeTableModal.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import BenefitsBarPdp from "$store/islands/BenefitsBarPdp.tsx";
import { useShippingQuantity } from "$store/sdk/useShippingQuantity.ts";

export interface Props {
  isFabric: any;
  availability: any;
  fabricSizeTable: any;
  platform: any;
  name: any;
  productID: any;
  productGroupID: any;
  price: any;
  discount: any;
  seller: any;
}

const ProductInfoQuantityIsland = (props: Props) => {
  const {
    isFabric,
    availability,
    fabricSizeTable,
    platform,
    name,
    productID,
    productGroupID,
    price,
    discount,
    seller,
  } = props;
  const [quantity, setQuantity] = useState(1);

  const { shippingQuantity } = useShippingQuantity(); 

  return (
    <div class="mt-4 sm:mt-10 flex flex-row flex-wrap gap-2 justify-between sm:max-w-none">
      <div class={`w-[48%]`}>
        {isFabric
          ? (
            <FabricQuantitySelector
              quantity={quantity}
              widthFull={true}
              coloredButtons={true}
              onChange={(q) => { setQuantity(q); shippingQuantity.value = q; }}
            />
          )
          : (
            <QuantitySelector
              quantity={quantity}
              widthFull={true}
              coloredButtons={true}
              onChange={(q) => {setQuantity(q); shippingQuantity.value = q; }}
            />
          )}
      </div>

      {isFabric && <FabricSizeTableModal table={fabricSizeTable} />}

      <div class={`${isFabric ? "w-full" : "w-[48%]"}`}>
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
                    quantity={quantity}
                  />
                  <div class="text-[#818181] items-center flex gap-2 w-full mt-1">
                    <Icon id="secureIcon" height={15} width={13} />
                    <span class={`text-xs sm:text-sm `}>Compra 100% Segura</span>
                  </div>
                </>
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      <div class="lg:hidden flex">
        <BenefitsBarPdp />
      </div>

      {/* Shipping Simulation */}
      <div class="mt-4 border border-[#cecece] p-6 w-full">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(productID),
              quantity,
              seller,
            }]}
          />
        )}
      </div>
    </div>
  );
};

export default ProductInfoQuantityIsland;
