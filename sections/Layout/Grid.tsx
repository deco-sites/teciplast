import { Section } from "deco/blocks/section.ts";
import { grid, VNode } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import type { Product } from "apps/commerce/types.ts";
import ProductShelfPdp from "$store/sections/Product/ProductShelfPdp.tsx"
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";

interface Props {
  children: VNode[] | null;
  layout?: {
    gap?: {
      /** @default 2 */
      mobile?: "1" | "2" | "4" | "8" | "12" | "16";
      /** @default 4 */
      desktop?: "1" | "2" | "4" | "8" | "12" | "16";
    };
    cols?: {
      mobile?:
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "11"
        | "12"
        | "none";
      desktop?:
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "11"
        | "12"
        | "none";
    };
    rows?: {
      mobile?: "1" | "2" | "3" | "4" | "5" | "6" | "none";
      desktop?: "1" | "2" | "3" | "4" | "5" | "6" | "none";
    };
    flow?: {
      /** @default row */
      mobile?: "col" | "row" | "dense" | "col-dense" | "row-dense";
      /** @default row */
      desktop?: "col" | "row" | "dense" | "col-dense" | "row-dense";
    };
    placeItems?: {
      /** @default center */
      mobile?: "center" | "start" | "end" | "baseline" | "stretch";
      /** @default center */
      desktop?: "center" | "start" | "end" | "baseline" | "stretch";
    };
  };
  product?: Product[] | null;
  title?: string;
  description?: string;
  layout2?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Small"|"Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function Section({ layout, children,product,title,
  description,
  layout2,
  cardLayout  }: Props) {
  return (
    <>
    <div
      class={clx(
        "grid",
        layout?.gap?.mobile && grid.gap.mobile[layout.gap.mobile],
        layout?.gap?.desktop && grid.gap.desktop[layout.gap.desktop],
        layout?.cols?.mobile && grid.cols.mobile[layout.cols.mobile],
        layout?.cols?.desktop && grid.cols.desktop[layout.cols.desktop],
        layout?.flow?.mobile && grid.flow.mobile[layout.flow.mobile],
        layout?.flow?.desktop && grid.flow.desktop[layout.flow.desktop],
        layout?.placeItems?.mobile &&
          grid.placeItems.mobile[layout.placeItems.mobile],
        layout?.placeItems?.desktop &&
          grid.placeItems.desktop[layout.placeItems.desktop],
      )}
    >
      {children}
    </div>

    {product && <ProductShelfPdp products={product}  title={title} description={description} layout={layout2} cardLayout={cardLayout} /> }
     
    </>
  );
}

export default Section;
