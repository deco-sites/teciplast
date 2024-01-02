import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Drawer2 from "$store/components/ui/Drawer2.tsx";

import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import SearchbarFixed from "$store/islands/Header/SearchbarMobileMenu.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  freeShippingTarget: number;
  searchbar?: SearchbarProps;
  imgMenu?: { src: ImageWidget; alt: string };
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw]">
    <div class="flex justify-between items-center">
      <h1 class="px-4 py-3">
        <span class="font-medium text-2xl">{title}</span>
      </h1>
      {onClose && (
        <Button class="btn btn-ghost" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);
function ModalCart(
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) {
  const { displayCart } = useUI();
  return (
    <div
      class={`${
        displayCart.value === true ? "grid" : "hidden"
      } bg-base-100  grid-rows-[auto_1fr]    lg:max-w-[100vw] max-h-[900px]  mt-5  lg:mr-10`}
    >
      <div class="flex justify-center items-center text-center bg-[#606060] text-base-100 px-5 ">
        {onClose && (
          <Button class="btn btn-ghost left-0" onClick={onClose}>
            <Icon id="XMark" size={24} strokeWidth={2} />
          </Button>
        )}

        <h1 class="m-auto">
          <span class="font-medium text-xl ml-[-24px]">{title}</span>
        </h1>
      </div>
      <Suspense
        fallback={
          <div class="w-screen flex items-center justify-center p-5">
            <span class="loading loading-ring" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}

function Central(
  { onClose, children, imgMenu, searchbar, platform }: {
    imgMenu?: { src: ImageWidget; alt: string };
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
    searchbar?: SearchbarProps;
    platform?: ReturnType<typeof usePlatform>;
  },
) {
  const { user } = useUser();
  const isLogged = Boolean(user.value?.email);

  return (
    <div class="w-full flex px-5 justify-center items-center ">
      <div class="left-auto absolute top-2 rounded-none w-11/12 bg-base-100 py-[15px] px-[15px] ">
        <div class="flex justify-start items-start w-full mb-[15px]">
          {imgMenu && (
            <div
              class="flex-grow inline-flex items-start justify-start w-full pl-3"
              aria-label="Store logo"
            >
              <Image
                src={imgMenu.src}
                alt={"Logo"}
                width={140}
                height={30}
              />
            </div>
          )}

          {onClose && (
            <Button class="" onClick={onClose}>
              <Icon id="XMark" size={24} strokeWidth={2} />
            </Button>
          )}
        </div>

        <SearchbarFixed searchbar={searchbar} />

        <div class="flex justify-around items-center w-full my-[15px] h-11">
          {isLogged && (
            <div class="uppercase flex flex-col text-[9px] justify-end items-center  gap-2">
              <a
                class="flex items-center flex-col justify-center"
                href="/account"
                aria-label="Account"
              >
                <Icon
                  id="User-Circle2"
                  class={`w-full  justify-center items-center  object-cover mb-2`}
                  size={24}
                  strokeWidth={0.4}
                />
                Conta
              </a>
            </div>
          )}
          {!isLogged && (
            <div class="uppercase flex flex-col text-[9px] justify-end items-center  gap-2">
              <a
                class="flex items-center flex-col justify-center"
                href="/login"
                aria-label="Log in"
              >
                <Icon
                  id="User-Circle2"
                  class={`w-full  justify-center items-center  object-cover mb-2`}
                  size={24}
                  strokeWidth={0.4}
                />
                Entrar
              </a>
            </div>
          )}
          <div class="uppercase flex flex-col  gap-2 text-[9px] justify-end items-center">
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButtonShopify />}
          </div>
          <div class="uppercase flex flex-col text-[9px] justify-end items-center gap-2">
            <a
              class="flex items-center flex-col justify-center"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon
                id="Heart"
                class={`mb-2 `}
                size={25}
                strokeWidth={2}
                fill="none"
              />Lista de desejos
            </a>
          </div>
          <div class="uppercase flex flex-col text-[9px] gap-2 items-center justify-end">
            <a
              class=" flex items-center flex-col justify-center"
              href="http://wa.link/lf93ro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="help"
            >
              <Icon
                id="Layer_1"
                class={`w-full  justify-center items-center  object-cover mb-2 `}
                size={24}
                strokeWidth={1}
              />Ajuda
            </a>
          </div>
          {isLogged && (
            <div class="uppercase flex flex-col text-[9px] justify-end items-center  gap-2">
              <a
                class="flex items-center flex-col justify-center"
                href="/api/vtexid/pub/logout?scope=tecilar&returnUrl=/"
                aria-label="Log out"
              >
                <Icon
                  id="logOut"
                  class={`w-full  justify-center items-center  object-cover mb-2`}
                  size={24}
                  strokeWidth={0.4}
                />
                Sair
              </a>
            </div>
          )}
        </div>

        <Suspense
          fallback={
            <div class="w-screen flex items-center justify-center">
              <span class="loading loading-ring" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}

function Drawers(
  { menu, searchbar, children, platform, imgMenu, freeShippingTarget }: Props,
) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <Drawer // left drawer menu
      open={displayMenu.value || displaySearchDrawer.value}
      onClose={() => {
        displayMenu.value = false;
        displaySearchDrawer.value = false;
      }}
      aside={
        <Central
          platform={platform}
          imgMenu={imgMenu}
          searchbar={searchbar}
          onClose={() => {
            displayMenu.value = false;
            displaySearchDrawer.value = false;
          }}
          title={displayMenu.value ? "Menu" : "Buscar"}
        >
          {displayMenu.value && <Menu {...menu} />}
          {searchbar && displaySearchDrawer.value && (
            <div class="w-screen">
              <Searchbar {...searchbar} />
            </div>
          )}
        </Central>
      }
    >
      <Drawer2 // right drawer cart
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <ModalCart
            title="Carrinho de Compras"
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} freeShippingTarget={freeShippingTarget} />
          </ModalCart>
        }
      >
        {children}
      </Drawer2>
    </Drawer>
  );
}

export default Drawers;
