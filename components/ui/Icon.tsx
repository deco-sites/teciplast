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
  | "max-lav-95"
  | "max-lav-95-suave"
  | "max-lav-70"
  | "max-lav-60"
  | "max-lav-60-suave"
  | "max-lav-50"
  | "max-lav-50-suave"
  | "max-lav-40"
  | "max-lav-40-suave"
  | "max-lav-40-m-suave"
  | "max-lav-30"
  | "max-lav-30-suave"
  | "max-lav-30-m-suave"
  | "lav-mao-40"
  | "nao-lavar"
  | "alv-sim"
  | "alv-ox"
  | "nao-alv"
  | "sec-tambor"
  | "sec-tambor-baixa"
  | "nao-secar-tambor"
  | "temp-max-200"
  | "temp-max-150"
  | "temp-max-110-n-vap"
  | "nao-passar"
  | "seco-pro"
  | "seco-pro-suave"
  | "seco-pro-150"
  | "seco-pro-150-suave"
  | "nao-seco"
  | "umido-pro"
  | "umido-pro-suave"
  | "umido-pro-m-suave"
  | "squareTable"
  | "roundedTable"
  | "rectangularTable"
  | "ruler";

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
