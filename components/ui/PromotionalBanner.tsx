import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Banner } from "./BannerGrid.tsx";

export interface Props {
  banner: Banner;
}

const DEFAULT_PROPS: Props = {
  banner: {
    alt: "a",
    href: "a",
    srcMobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/82727553-f670-4e7c-b9c2-9452aed1955f",
    srcDesktop:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7b3a9d75-57a5-43cf-a3c5-f689a997f24e",
  },
};

export default function BannnerGrid(props: Props) {
  const {
    banner,
  } = { ...DEFAULT_PROPS, ...props };

  const { href, srcMobile, srcDesktop, alt } = banner;

  return (
    <section class="container w-full my-6">
      <a
        href={banner.href}
        class={`overflow-hidden`}
      >
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={srcMobile}
            width={640}
            height={90}
          />
          <Source
            media="(min-width: 768px)"
            src={srcDesktop ? srcDesktop : srcMobile}
            width={1536}
            height={136}
          />
          <img
            class="w-full"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={srcMobile}
            alt={alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </a>
    </section>
  );
}
