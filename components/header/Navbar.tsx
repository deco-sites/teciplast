import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import Searchbar from "$store/islands/Header/Searchbarfixa.tsx";
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
  const help  = "/help.png";
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={126} height={16} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col justify-between items-center w-full container py-1">
        <div class='flex flex-row justify-around items-center w-full  border-b-2 py-2 shrink-0'>

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
          
          <Searchbar searchbar={searchbar} />
          
          <div class="flex-none flex items-center justify-center gap-14">
             
            <div class='uppercase flex flex-row text-base items-center gap-2'>
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/login"
              aria-label="Log in"
              >
              <Icon id="User-Circle" size={24} strokeWidth={0.4} />
            </a> Entrar
            </div>
            <div class='uppercase flex flex-row text-base gap-2 items-center'>
                {platform === "vtex" && <CartButtonVTEX />}
                {platform === "vnda" && <CartButtonVDNA />}
                {platform === "wake" && <CartButtonWake />}
                {platform === "linx" && <CartButtonLinx />}
                {platform === "shopify" && <CartButtonShopify />}
                Carrinho
            </div>
            <div class='uppercase flex flex-row text-base items-center gap-2'>
              <a
                class="btn btn-circle btn-sm btn-ghost"
                href="/wishlist"
                aria-label="Wishlist"
                >
                <Icon
                  id="Heart"
                  size={24}
                  strokeWidth={2}
                  fill="none"
                  /> 
              </a> Lista de desejos
            </div>
            <div class='uppercase flex flex-row text-base gap-2 items-center'>
              <a
                class="btn btn-circle btn-sm btn-ghost"
                href="/help"
                aria-label="help"
                >
                <img
                  src={help}
                  id="Help-Contact"
                  width={24}
                  height={24}
                  loading={"lazy"}/> 
              </a> Ajuda
            </div>
            
          </div>
        </div>
        <ul class="flex items-center justify-between w-full h-full shrink-0 py-1">
          {items.map((item) => <NavItem item={item} />)}
        </ul>
      </div>
    </>

  );
}

export default Navbar;
