import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
  data?: number;
  
  /**
   * @title Text
   * @default Time left for a campaign to end wth a link
   */
  text?: HTMLWidget;
  textMobile?: HTMLWidget;
  textLink?: HTMLWidget;
  
  /**
   * @title Expires at date
   * @format datetime
   */
  expiresAt?: string;

  labels?: {
    /**
     * @title Text to show when expired
     */
    expired?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
}

interface TextLink {
  href: string;
  text: string;
  bold: boolean;
  underline: boolean;
}

interface Text {
  text: string;
  bold: boolean;
  underline: boolean;
}

function Header({
  expiresAt,
  labels,
  text,
  textLink,
  data,
  textMobile,
  searchbar,
  navItems,
  logo,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header>
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
          imgMenu={logo}
        >
          <div class="bg-base-100 bg-opacity-0  w-full z-50">
            <Alert
              data={data}
              expiresAt={expiresAt}
              labels={labels}
              text={text}
              textLink={textLink}
              textMobile={textMobile}
            />
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
