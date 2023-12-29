import { useComputed, useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useWishlist } from "apps/vtex/hooks/useWishlist.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { sendEvent } from "deco-sites/teciplast/sdk/analytics.tsx";

export interface Props {
  productID: string;
  productGroupID: string;
  price: number;
  variant?: "icon" | "full";
  pagePDP?: boolean;
}

function WishlistButton({
  variant = "icon",
  productGroupID,
  productID,
  pagePDP = false,
  price,
}: Props) {
  const { user } = useUser();
  const item = { sku: productID, productId: productGroupID };
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const listItem = useComputed(() => getItem(item));
  const fetching = useSignal(false);

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);
  

  const addToWishlist = async (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isUserLoggedIn) {
      window.alert("Please log in before adding to your wishlist");
      return;
    }
    if (loading.value) {
      return;
    }

    if(!inWishlist) {
      sendEvent({
        name: "add_to_wishlist",
        params: {
          shopper: user.value?.email
            ? {
              email: user.value?.email,
              // id: user.value?.id,
            }
            : undefined,
          value: price,
          currency: "BRL",
          items: [{
            item_id: productGroupID || "",
            item_variant: productID,
            quantity: 1,
          }],
        },
      });
    }
    
    try {
      fetching.value = true;
      inWishlist
        ? await removeItem({ id: listItem.value!.id }!)
        : await addItem(item);
        
    } finally {
      fetching.value = false;
    }
  }
  return (
    <>
      {pagePDP
        ? (
          <Button
            class={variant === "icon"
              ? "btn-circle btn-ghost gap-2 hover:bg-transparent text-[#403F3F]"
              : "btn-primary btn-outline gap-2 text-center"}
            loading={fetching.value}
            aria-label="Add to wishlist"
            onClick={addToWishlist}
          >
            <Icon
              id="Heart"
              size={30}
              strokeWidth={1}
              fill={inWishlist ? "black" : "none"}
              class="my-0 mx-auto"
            />
            {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
          </Button>
        )
        : (
          <Button
            class={variant === "icon"
              ? "btn-circle btn-ghost gap-2 hover:bg-transparent text-base-200"
              : "btn-primary btn-outline gap-2 text-center"}
            loading={fetching.value}
            aria-label="Add to wishlist"
            onClick={addToWishlist}
          >
            <Icon
              id="Heart"
              size={24}
              strokeWidth={2}
              fill={inWishlist ? "red" : "none"}
              class="my-0 mx-auto"
            />
            {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
          </Button>
        )}
    </>
  );
}

export default WishlistButton;
