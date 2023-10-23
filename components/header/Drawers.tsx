import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  imgMenu: { src: ImageWidget; alt: string };
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

function Central(
  { onClose, children, imgMenu }: {
    imgMenu: { src: ImageWidget | undefined; alt: string | undefined };
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) {
  return (
    <div class="w-full flex px-5 justify-center items-center ">
      <div class="left-auto  absolute top-5  rounded-none w-11/12 bg-base-200 py-[30px] px-[15px]">
        <div class="flex justify-start items-start w-full">
          {imgMenu.src && (
            <div
              class="flex-grow inline-flex items-start justify-start w-full pl-3"
              aria-label="Store logo"
            >
              <Image src={imgMenu.src} alt={"Logo"} width={140} height={30} class={`grayscale`} />
            </div>
          )}

          {onClose && (
            <Button class="" onClick={onClose}>
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
    </div>
  );
}

function Drawers({ menu, searchbar, children, platform, imgMenu }: Props) {
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
          imgMenu={imgMenu}
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
      <Drawer // right drawer cart
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            title="Minha sacola"
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
