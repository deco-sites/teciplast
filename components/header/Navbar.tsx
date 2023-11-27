import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonVTEXMobile from "$store/islands/Header/Cart/vtexMobile.tsx";

import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import SearchbarFixed from "$store/components/header/SearchbarFixa.tsx";
import SearchbarMObile from "$store/islands/Header/SearchbarMobileMenuWhite.tsx";

import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";

import { navbarHeight } from "./constants.ts";
import NavLogin from "$store/islands/NavLogin.tsx";
import NavLogout from "$store/islands/NavLogout.tsx";

import SearchButton from "deco-sites/teciplast/components/header/Buttons/Search.tsx";

export interface Props {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}

function Navbar({ items, searchbar, logo }: Props) {
  const platform = usePlatform();
  const help = "/help.png";

  return (
    <>
      {/* Mobile Version */}
      <div
        class="lg:hidden flex flex-col justify-center items-center  border-base-200 w-full py-2"
        style={{ minHeight: navbarHeight }}
      >
        <div class="lg:hidden flex flex-row justify-between items-center  w-full  gap-2 mb-3 px-2">
          <MenuButton />

          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center w-full"
              aria-label="Store logo"
            >
              <Image src={logo.src} alt={logo.alt} width={140} height={30} />
            </a>
          )}

          <div class="flex gap-1">
            {platform === "vtex" && <CartButtonVTEXMobile />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButtonShopify />}
          </div>
        </div>
        <SearchbarMObile searchbar={searchbar} />
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex flex-col justify-between items-center w-full container py-1 max-h-[170px] ">
        <div class="flex flex-row justify-around items-center w-full  border-b border-[#cecece] py-2 shrink-0">
          <div class="flex-none w-44 mr-auto">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block w-[180px]"
              >
                <Image
                  class={`object-cover`}
                  src={logo.src}
                  alt={logo.alt}
                  width={1920}
                  height={427}
                />
              </a>
            )}
          </div>

          <SearchbarFixed searchbar={searchbar} />

          <div class="flex-none flex items-center justify-center gap-14">
            <NavLogin />
            <div class="uppercase flex flex-row text-base gap-2 justify-center items-center">
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
            </div>
            <div class="uppercase flex flex-row text-base justify-center items-center gap-2">
              <a
                class="  flex flex-row justify-center items-center"
                href="/wishlist"
                aria-label="Wishlist"
              >
                <Icon
                  id="Heart"
                  class={` mr-2`}
                  size={25}
                  strokeWidth={2}
                  fill="none"
                />
                Lista de desejos
              </a>
            </div>
            <div class="uppercase flex flex-row text-base gap-2 items-center justify-center">
              <a
                class="  flex flex-row  items-center justify-center "
                href="/help"
                aria-label="help"
              >
                <Icon
                  id="Layer_1"
                  class={`w-full  justify-center items-center  object-cover mr-2`}
                  size={24}
                  strokeWidth={1}
                />
                Ajuda
              </a>
            </div>
            <NavLogout />
          </div>
        </div>
        <ul class="flex flex-row items-center justify-between w-full h-full shrink-0 ">
          {items.map((item, index) => <NavItem item={item} index={index} />)}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
