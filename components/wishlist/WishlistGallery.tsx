import SearchResult, {
  Props as SearchResultProps,
} from "$store/components/search/SearchResult.tsx";
import productList from "apps/vtex/loaders/intelligentSearch/productList.ts";
import { AppContext } from "deco-sites/teciplast/apps/site.ts";

export type Props = SearchResultProps;

function WishlistGallery(props: Props) {
  const isEmpty = !props.page || props.page.products.length === 0;

  if (isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">
            Your wishlist is empty
          </span>
          <span>
            Log in and add items to your wishlist for later. They will show up
            here
          </span>
        </div>
      </div>
    );
  }

  return <SearchResult {...props} />;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const productIds = props.page?.products.map((product) => product.sku);

  if (!productIds) {
    return props;
  }

  const response = await ctx.invoke.vtex.loaders.intelligentSearch.productList({
    props: {
      ids: productIds,
    },
  });

  if (!props.page || !response) {
    return props;
  }

  props.page.products = response;
  props.pageTitle="Lista de Desejos"

  return props;
};

export default WishlistGallery;
