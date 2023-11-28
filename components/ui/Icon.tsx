import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "Bars3"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "WhatsApp2"
  | "XMark"
  | "Email"
  | "Zoom"
  | "User-Circle"
  | "User-Circle2"
  | "Help-Contact"
  | "CartShopping"
  | "PresentBox"
  | "ReturnBox"
  | "FastTruck"
  | "GreenShield"
  | "Layer_1"
  | "Filter"
  | "TwitterLogo"
  | "WhatsApp"
  | "pinterest"
  | "singleBed"
  | "doubleBed"
  | "queenBed"
  | "kingBed"
  | "secureIcon"
  | "secureCircle"
  | "logOut"
  | "beachTowel"
  | "bathAccessories"
  | "share"
  | "ruler"
  | 'toalha-de-banho'
  | 'toalha-de-rosto'
  | 'toalha-de-mao'
  | 'roupao-de-banho'
  | 'jogo-de-toalha'
  | 'tapete-para-banheiro' 
   ;

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
