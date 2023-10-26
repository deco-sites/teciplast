import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import Icon from "deco-sites/teciplast/components/ui/Icon.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden px-5"
      style={{ minWidth: "calc(min(100vw, 450px))", maxWidth: "450px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-2xl">Sua sacola está vazia</span>
            <Button
              class="btn-outline"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class=" py-4 w-full pb-5">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="py-5  max-h-[360px] flex-grow overflow-y-auto flex flex-col gap-3 w-full border-t border-[#D3D3D3] "
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full">
              {/* Subtotal */}
              <div class=" border-[#D3D3D3] px-4 py-2 flex flex-col">
                <div class="w-full border-y min-h-[50px] flex justify-between items-center text-sm font-bold">
                  <span>Subtotal</span>
                  <span class="px-4 font-bold text-[15px]">
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>

                <div class="flex w-full justify-start items-center py-5 ">
                  <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                  {discounts > 0 && (
                    <div class="flex w-full">
                      <span class="text-sm">Descontos</span>
                      <span class="text-sm">
                        {formatPrice(discounts, currency, locale)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total */}
              <div class="border-t border-base-200 py-4 flex flex-col justify-end items-end gap-2 mx-4">
                <div class="flex justify-between items-center w-full">
                  <span class={`px-4 font-bold text-[15px]`}>Total</span>
                  <span class="font-medium text-xl">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                <span class="text-xs text-base-300 flex flex-row gap-2">
                  <Icon
                    width={17}
                    height={14}
                    strokeWidth={1}
                    id="Visas"
                  />
                  <Icon
                    width={17}
                    height={14}
                    strokeWidth={1}
                    id="Mastercards"
                  />{" "}
                  Parcele em até 12x dependendo do cartão
                </span>
              </div>

              <div class="">
                <a class="inline-block w-full py-5" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="btn-primary btn-block h-[40px] uppercase text-[15px font-bold]"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Finalizar compra
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
