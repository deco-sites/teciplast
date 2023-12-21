import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  seller: string;
  quantity?: number;
  extraClasses?: string;
  isFabric?: unknown;
}

function AddToCartButton(props: Props) {
  const { isFabric } = props;
  const { quantity = isFabric ? 10 : 1, extraClasses } = props;
  const { addItems } = useCart();

  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: props.productID,
        seller: props.seller,
        quantity: quantity,
      }],
    });

  return (
    <Button
      extraClasses={extraClasses}
      onAddItem={onAddItem}
      {...props}
    />
  );
}

export default AddToCartButton;
