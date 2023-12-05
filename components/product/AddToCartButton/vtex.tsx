import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  seller: string;
  quantity?: number;
}

function AddToCartButton(props: Props) {
  const {quantity=1} = props;
  const { addItems } = useCart();

  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: props.productID,
        seller: props.seller,
        quantity: quantity,
      }],
    });

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
