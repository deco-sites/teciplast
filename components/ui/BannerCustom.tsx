import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  columns: 1 | 2 | 3 | 4 | 5 | 6;
  rows: 1 | 2 | 3 | 4 | 5;
  heightProportion?: number;
  widthProportion?: number;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  preload: boolean;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  gridColumns: 1 | 2 | 3 | 4 | 5 | 6;
  gridRows: 1 | 2 | 3 | 4 | 5;
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const MOBILE_ROWSPAN = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
};

const MOBILE_COLSPAN = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
};

const DESKTOP_ROWSPAN = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
};

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};

const MOBILE_ROWS = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
};

const DESKTOP_ROWS = {
  1: "sm:grid-rows-1",
  2: "sm:grid-rows-2",
  3: "sm:grid-rows-3",
  4: "sm:grid-rows-4",
  5: "sm:grid-rows-5",
  6: "sm:grid-rows-6",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

const DEFAULT_PROPS: Props = {
  title: "Summer bags",
  banners: [
    {
      alt: "a",
      href: "a",
      columns: 1,
      rows: 1,
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/82727553-f670-4e7c-b9c2-9452aed1955f",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7b3a9d75-57a5-43cf-a3c5-f689a997f24e",
      heightProportion: 120,
      widthProportion: 320,
      preload: false,
    },
    {
      alt: "a",
      href: "a",
      columns: 1,
      rows: 1,
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/c5c6bdf6-5555-488c-8b14-719e4158dea6",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3e2b7824-d75c-4704-8d32-621bfc9b20cf",
      heightProportion: 120,
      widthProportion: 320,
      preload: false,
    },
  ],
  gridColumns: 2,
  gridRows: 2,
  borderRadius: {
    mobile: "3xl",
    desktop: "3xl",
  },
};

export default function BannerCustom(props: Props) {
  const {
    title,
    gridColumns,
    gridRows,
    borderRadius,
    banners = [],
  } = { ...DEFAULT_PROPS, ...props };

  const firstBanner = banners[0];
  return (
    <section class="md:container w-full md:px-0 mx-auto mb-8">
      <div
        class={`hidden md:grid gap-1 md:gap-2 ${MOBILE_COLUMNS[gridColumns]} ${
          DESKTOP_COLUMNS[gridColumns]
        } ${DESKTOP_ROWS[gridRows]} ${DESKTOP_ROWS[gridRows]} `}
      >
        {banners.map((
          {
            href,
            srcMobile,
            srcDesktop,
            alt,
            columns,
            rows,
            heightProportion,
            widthProportion = 200,
            preload,
          },
        ) => (
          <a
            href={href}
            class={`overflow-hidden ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} ${
              MOBILE_ROWSPAN[rows]
            } ${
              MOBILE_COLSPAN[columns]
            } hover:shadow-xl hover:shadow-[#00000061] transition-shadow duration-150`}
          >
            <Picture class="h-full">
              <Source
                media="(max-width: 845px)"
                src={srcMobile}
                width={widthProportion}
                height={heightProportion}
              />
              <Source
                media="(min-width: 845px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={widthProportion}
                height={heightProportion}
              />
              <img
                class="w-full h-full object-cover"
                sizes="(max-width: 845px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading={preload ? "eager" : "lazy"}
              />
            </Picture>
          </a>
        ))}
      </div>
      <div class="md:hidden grid gap-1 grid-cols-1">
        <a
          href={firstBanner.href}
          class={`overflow-hidden ${
            RADIUS_MOBILE[borderRadius.mobile ?? "none"]
          } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]}
           col-span-1 hover:shadow-xl hover:shadow-[#00000061] transition-shadow duration-150`}
        >
          <Picture class="h-full">
            <Source
              media="(max-width: 845px)"
              src={firstBanner.srcMobile}
              width={firstBanner.widthProportion!}
              height={firstBanner.heightProportion}
            />
            <Source
              media="(min-width: 845px)"
              src={firstBanner.srcDesktop
                ? firstBanner.srcDesktop
                : firstBanner.srcMobile}
              width={firstBanner.widthProportion!}
              height={firstBanner.heightProportion}
            />
            <img
              class="w-full h-full object-cover"
              sizes="(max-width: 845px) 100vw, 30vw"
              src={firstBanner.srcMobile}
              alt={firstBanner.alt}
              decoding="async"
              loading={firstBanner.preload ? "eager" : "lazy"}
            />
          </Picture>
        </a>
      </div>
    </section>
  );
}
