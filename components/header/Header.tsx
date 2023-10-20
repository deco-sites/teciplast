import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface Props {
  
  data?: number;
  text?: Text[];
  textLink?: TextLink;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

interface TextLink{
  href: string;
  text: string;
  bold: boolean;
  underline: boolean;
  
}

interface Text{
  text: string;
  bold: boolean;
  underline: boolean;
  
}

function Header({
  text,textLink,data,
  searchbar,
  navItems,
  logo,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100  w-full z-50">
            <Alert data={data} text={text} textLink={textLink} />
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
