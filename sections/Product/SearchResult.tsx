import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import FeaturedFilters from "$store/components/search/FeaturedFilters.tsx";
import PriceFilter from "$store/components/search/PriceFilter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import PageTitle from "$store/islands/PageTitle.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, {
  Columns,
} from "$store/components/product/ProductGallery.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import type { SectionProps } from "deco/types.ts";
import type {
  ProductGroup,
  ProductLeaf,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface FeaturedFiltersInfo {
  key: string;
  image?: ImageWidget;
  icon?: AvailableIcons;
  title: string;
}
export interface AllowedFilters {
  key: string;
  title: string;
  pageName: string;
  type: "range" | "carousel" | "icons" | "dropdown" | "img-dropdown";
  values: FeaturedFiltersInfo[];
}

/**
 * @titleBy matcher
 */
export interface CategoryTitle {
  /** @description RegExp to enable this title on the current URL. Use /feminino/* to display this title on feminino category  */
  matcher: string;
  /** @description Title to be rendered in the page */
  title: string;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  titles: CategoryTitle[];
  layout?: Layout;
  cardLayout?: CardLayout;
  featuredFilters: AllowedFilters[];
}

export const loader = ({
  page,
  titles,
  layout,
  cardLayout,
  featuredFilters,
}: Props, req: Request) => {
  let matchingTitle: string | undefined;

  if (titles) {
    const title = titles.find(({ matcher }) =>
      new URLPattern({ pathname: matcher }).test(req.url)
    );

    if (title) {
      matchingTitle = title.title;
    }
  }
  delete page?.seo;

  if (page?.products) {
    const bestInstallment = (
      acc: UnitPriceSpecification | null,
      curr: UnitPriceSpecification,
    ) => {
      if (curr.priceComponentType !== "https://schema.org/Installment") {
        return acc;
      }

      if (!acc) {
        return curr;
      }

      if (acc.price > curr.price) {
        return curr;
      }

      if (acc.price < curr.price) {
        return acc;
      }

      if (
        acc.billingDuration && curr.billingDuration &&
        acc.billingDuration < curr.billingDuration
      ) {
        return curr;
      }

      return acc;
    };

    const installment = (specs: UnitPriceSpecification[]) =>
      specs.reduce(bestInstallment, null);

    const isVariantOfMap = (isVariantOf: ProductGroup) => {
      const hasVariant = isVariantOf.hasVariant.map((variant: ProductLeaf) => {
        const { offers, url, productID, additionalProperty } = variant;

        return {
          offers: {
            ...offers,
            offers: offers?.offers.filter((offer) => offer.seller === "1").map(
              (offer) => {
                const best = installment(offer.priceSpecification);
                const specs = offer.priceSpecification.filter((spec) =>
                  ["https://schema.org/ListPrice"].includes(spec.priceType)
                );

                if (best) {
                  specs.push(best);
                }
                return ({
                  seller: offer.seller,
                  priceSpecification: specs.map((spec) => {
                    return {
                      ...spec,
                      price: spec.price,
                      priceComponentType: spec.priceComponentType,
                      priceType: spec.priceType,
                      billingIncrement: spec.billingIncrement,
                      billingDuration: spec.billingDuration,
                    };
                  }),
                  price: offer.price,
                  availability: offer.availability,
                  inventoryLevel: offer.inventoryLevel,
                });
              },
            ),
          },
          url,
          productID,
          additionalProperty,
        };
      });
      return {
        productGroupID: isVariantOf.productGroupID,
        name: isVariantOf.name,
        hasVariant,
      };
    };

    page.products?.map((product) => {
      return {
        isVariantOf: isVariantOfMap(product.isVariantOf!),
        isSimilarTo: product.isSimilarTo?.map((similar) => {
          const { image, offers, productID, url } = similar;
          const isVariantOf = isVariantOfMap(similar.isVariantOf!);
          return {
            image,
            offers: {
              ...offers,
              offers: offers?.offers.filter((offer) => offer.seller === "1")
                .map(
                  (offer) => {
                    const best = installment(offer.priceSpecification);
                    const specs = offer.priceSpecification.filter((spec) =>
                      ["https://schema.org/ListPrice"].includes(spec.priceType)
                    );

                    if (best) {
                      specs.push(best);
                    }
                    return ({
                      seller: offer.seller,
                      priceSpecification: specs.map((spec) => {
                        return {
                          ...spec,
                          price: spec.price,
                          priceComponentType: spec.priceComponentType,
                          priceType: spec.priceType,
                          billingIncrement: spec.billingIncrement,
                          billingDuration: spec.billingDuration,
                        };
                      }),
                      price: offer.price,
                      availability: offer.availability,
                      inventoryLevel: offer.inventoryLevel,
                    });
                  },
                ),
            },
            productID,
            url,
            isVariantOf,
          };
        }),
        additionalProperty: product.additionalProperty!,
        url: product.url,
        name: product.name,
        offers: {
          ...product.offers,
          offers: product.offers?.offers.filter((offer) => offer.seller === "1")
            .map((offer) => {
              const best = installment(offer.priceSpecification);
              const specs = offer.priceSpecification.filter((spec) =>
                ["https://schema.org/ListPrice"].includes(spec.priceType)
              );

              if (best) {
                specs.push(best);
              }
              return ({
                seller: offer.seller,
                priceSpecification: specs.map((spec) => {
                  return {
                    ...spec,
                    price: spec.price,
                    priceComponentType: spec.priceComponentType,
                    priceType: spec.priceType,
                    billingIncrement: spec.billingIncrement,
                    billingDuration: spec.billingDuration,
                  };
                }),
                price: offer.price,
                availability: offer.availability,
                inventoryLevel: offer.inventoryLevel,
              });
            }),
        },
        image: product.image,
      };
    });
  }

  return { page, matchingTitle, layout, cardLayout, featuredFilters };
};

function NotFound() {
  return (
    <div class="w-full flex flex-col justify-start items-center py-10 h-[400px] gap-8">
      <span class="text-2xl font-bold">Ops! Página não encontrada!</span>
      <div class="flex flex-col gap-4">
        <span class="text-lg">
          Tente navegar para a{" "}
          <a class="text-[#0000ff] underline font-semibold" href="/">
            Página Inicial
          </a>{" "}
          ou explore nossos departamentos:
        </span>
        <div class="flex w-full justify-center gap-3">
          <a class="text-[#0000ff] underline font-semibold" href="/tecidos">
            Tecidos
          </a>
          <span>|</span>
          <a class="text-[#0000ff] underline font-semibold" href="/cama">
            Cama
          </a>
          <span>|</span>
          <a class="text-[#0000ff] underline font-semibold" href="/mesa">
            Mesa
          </a>
          <span>|</span>
          <a class="text-[#0000ff] underline font-semibold" href="/banho">
            Banho
          </a>
          <span>|</span>
          <a
            class="text-[#0000ff] underline font-semibold"
            href="/decoracao/cortinas-e-persianas"
          >
            Cortinas
          </a>
          <span>|</span>
          <a class="text-[#0000ff] underline font-semibold" href="/armarinho">
            Armarinho
          </a>
          <span>|</span>
          <a class="text-[#0000ff] underline font-semibold" href="/decoracao">
            Decoração
          </a>
        </div>
      </div>
    </div>
  );
}

function Result(
  { page, matchingTitle, layout, cardLayout, featuredFilters }:
    & Omit<SectionProps<ReturnType<typeof loader>>, "page">
    & { page: ProductListingPage },
) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const totalPages = pageInfo.records && pageInfo.recordPerPage
    ? Math.ceil(pageInfo.records / pageInfo.recordPerPage)
    : 1;

  const { numberOfItems } = breadcrumb;

  const hiddenDepartament = numberOfItems > 0;
  const hiddenCategory = numberOfItems > 1;

  const bList = breadcrumb?.itemListElement;

  return (
    <>
      <div class="container hidden sm:flex w-full border-y border-[#DCDCDC]">
        <div class="container  flex-row items-center sm:p-0  ">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>
      </div>
      <div class="container  sm:py-5 px-2 sm:px-0">
        <div class="flex flex-row gap-5 lg:mb-[-20px]">
          <div id="title" class="hidden sm:flex flex-col w-full max-w-[250px]">
            <PageTitle breadCrumbs={breadcrumb?.itemListElement} />
            <span class="text-sm text-[#646464]">
              {pageInfo.records} resultados
            </span>
          </div>

          <FeaturedFilters
            filters={filters}
            allowedFilters={featuredFilters}
            url={breadcrumb?.itemListElement}
            hiddenCategory={hiddenCategory}
          />
        </div>

        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />

        <div
          id="title"
          class="flex sm:hidden w-full items-center flex-col mb-5"
        >
          <PageTitle />
          <span class="text-sm text-[#646464]">
            {pageInfo.records} resultados
          </span>
        </div>

        <div class="flex flex-row sm:gap-5 mt-4">
          <div class="flex flex-col">
            {layout?.variant === "aside" && filters.length > 0 && (
              <>
                <aside class="hidden sm:block w-min min-w-[250px] mb-[8px]">
                  <Filters
                    filters={filters}
                    hiddenCategory={hiddenCategory}
                    hiddenDepartament={hiddenDepartament}
                  />
                </aside>
                <aside class="hidden sm:block w-min min-w-[250px] ">
                  <PriceFilter filters={filters} />
                </aside>
              </>
            )}
          </div>
          <div class="flex-grow">
            <ProductGallery
              products={products}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join bg-white shadow-sm shadow-[#c7c7c7]">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronLeft" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item">
              Página {pageInfo.currentPage} de {totalPages}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: bList
              ? bList[bList.length - 1]?.name
              : "Search Result",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  { page, ...props }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
