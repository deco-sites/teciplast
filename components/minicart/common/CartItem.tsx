import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import FabricQuantitySelector from "$store/components/ui/FabricQuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
  measurementUnit: string;
  unitMultiplier: number;
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const {
    image,
    name,
    price: { sale, list },
    quantity,
    measurementUnit,
    unitMultiplier,
  } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);
  const { alt, src } = image;
  const srcNew = src.replace("-55-55", "");

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div class="flex flex-row justify-start items-center gap-2 bg-[#EEEEEE] max-h-[120px] p-3">
      <Image
        alt={image.src}
        src={srcNew}
        class="w-full h-full max-w-[120px] max-h-[100px] object-cover"
        sizes="(max-width: 640px) 100vw, 40vw"
        width={770}
        height={950}
      />

      <div class="flex flex-col justify-start items-start gap-2 ">
        <div class="flex justify-between items-center w-full">
          <span class="text-xs font-bold">{name}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square text-secondary flex justify-end items-start"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <Icon id="Trash" size={18} />
          </Button>
        </div>
        <div class="flex justify-between items-center gap-2 w-full">
          <span class="text-[15px] font-bold ">
            {isGift ? "Grátis" : (
              <>
                {formatPrice(sale, currency, locale)}
                <span class="text-xs font-normal">
                  /{unitMultiplier != 1 && unitMultiplier}
                  {measurementUnit}
                </span>
              </>
            )}
          </span>
          {measurementUnit === "m"
            ? (
              <FabricQuantitySelector
                disabled={loading || isGift}
                quantity={quantity}
                onChange={withLoading(async (quantity) => {
                  const analyticsItem = itemToAnalyticsItem(index);
                  const diff = quantity - item.quantity;

                  await onUpdateQuantity(quantity, index);

                  if (analyticsItem) {
                    analyticsItem.quantity = diff;

                    sendEvent({
                      name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                      params: { items: [analyticsItem] },
                    });
                  }
                })}
              />
            )
            : (
              <QuantitySelector
                disabled={loading || isGift}
                quantity={quantity}
                onChange={withLoading(async (quantity) => {
                  const analyticsItem = itemToAnalyticsItem(index);
                  const diff = quantity - item.quantity;

                  await onUpdateQuantity(quantity, index);

                  if (analyticsItem) {
                    analyticsItem.quantity = diff;

                    sendEvent({
                      name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                      params: { items: [analyticsItem] },
                    });
                  }
                })}
              />
            )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
