import { useUser } from 'apps/vtex/hooks/useUser.ts';

export interface PropsLoad {
  productId: string;
}

export interface ResponseReviews {
  data?: Reviews[];
  range: {
    total: number;
    from: number;
    to: number;
  };
  userHasReviewed?: boolean;
  averageRating?: AverageResponse;
}

export interface AverageResponse {
  average: number;
  totalCount: number;
}

export interface Reviews {
  id: string;
  productId: string;
  rating: number;
  title: string;
  text: string;
  reviewerName: string;
  shopperId: string;
  reviewDateTime: string;
  searchDate: string;
  verifiedPurchaser: boolean;
  sku: string | null;
  locale: string | null;
  pastReviews: string | null;
}

const url = 'https://tecilar.myvtex.com/reviews-and-ratings/api';

// mocking specific product to test with reviews
// /sweatshirt-logo-azul-0070430005/p
// let productId = "1944875713";

const loader = async (props: PropsLoad): Promise<ResponseReviews | null> => {
  const { user } = useUser();
  const shopperId = user.value?.email;
  let userHasReviewed = false;
  let averageRating: AverageResponse;

  let productId = '';

  if (props.productId) {
    productId = props.productId;
  }

  if (shopperId) {
    try {
      const r = (await fetch(
        url +
          '/reviews?product_id=' +
          productId +
          '&search_term=' +
          shopperId +
          '&status=false'
      ).then((r) => r.json())) as ResponseReviews;

      if (r.data && r.data.length > 0) {
        userHasReviewed = true;
      }
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  try {
    const resp = (await fetch(url + '/rating/' + productId).then((r) =>
      r.json()
    )) as AverageResponse;

    averageRating = resp;
  } catch (e) {
    console.log({ e });
    return null;
  }

  try {
    const response = (await fetch(
      url + '/reviews?product_id=' + productId
    ).then((r) => r.json())) as ResponseReviews;

    return { ...response, userHasReviewed, averageRating };
  } catch (e) {
    console.log({ e });
    return null;
  }
};

export const ratingLoader = async (
  props: PropsLoad
): Promise<AverageResponse | null> => {
  let averageRating: AverageResponse;

  let productId = '';

  if (props.productId) {
    productId = props.productId;
  }

  try {
    const resp = (await fetch(url + '/rating/' + productId).then((r) =>
      r.json()
    )) as AverageResponse;

    averageRating = resp;

    return averageRating;
  } catch (e) {
    console.log({ e });
    return null;
  }
};

export default loader;
