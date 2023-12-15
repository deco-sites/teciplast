import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function PDPBreadcrumb({ page }: Props) {
  const {
    breadcrumbList,
  } = page;

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  return (
    <div class="container border-t border-b border-[#cecece] mb-6">
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      />
    </div>
  );
}
