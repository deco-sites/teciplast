import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
};

function ProductGallery({ products, layout }: Props) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  return (
    <div
      class={`grid ${mobile} gap-2 items-center ${desktop} md:gap-4 lg:gap-10 min-h-[430px]`}
    >
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          layout={layout?.card}
          platform={platform}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
