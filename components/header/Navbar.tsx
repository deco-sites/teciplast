import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import SearchbarFixed from "$store/islands/Header/Searchbarfixa.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import SearchButton from "deco-sites/teciplast/components/header/Buttons/Search.tsx";

function Navbar({ items, searchbar, logo }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();
  const help = "/help.png";
  return (
    <>
      {/* Mobile Version */}
      <div
        class="md:hidden flex flex-col justify-center items-center  border-base-200 w-full mb-3"
        style={{ minHeight: navbarHeight }}
      >
        <div class="md:hidden flex flex-row justify-between items-center  w-full  gap-2 mb-3">
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
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButtonShopify />}
          </div>
        </div>

        <SearchbarFixed searchbar={searchbar} />
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col justify-between items-center w-full container py-1 max-h-[170px] ">
        <div class="flex flex-row justify-around items-center w-full  border-b-2 py-2 shrink-0">
          <div class="flex-none w-44 mr-auto">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="blocK w-[180px]"
              >
                <Image src={logo.src} alt={logo.alt} width={180} height={40} />
              </a>
            )}
          </div>

          <SearchbarFixed searchbar={searchbar} />

          <div class="flex-none flex items-center justify-center gap-14">
            <div class="uppercase flex flex-row text-base justify-center items-center gap-2">
              <a
                class="flex flex-row  justify-center items-center "
                href="/login"
                aria-label="Log in"
              >
                <Icon
                  id="User-Circle2"
                  class={`w-full  justify-center items-center  object-cover mr-2`}
                  size={24}
                  strokeWidth={0.4}
                />
                Entrar
              </a>
            </div>
            <div class="uppercase flex flex-row text-base gap-2 justify-center items-center">
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              Carrinho
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
          </div>
        </div>
        <ul class="flex items-center justify-between w-full h-full shrink-0 ">
          {items.map((item) => <NavItem item={item} />)}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
