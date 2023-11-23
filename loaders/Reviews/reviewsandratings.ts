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
  // const { user } = useUser();
  // const shopperId = user.value?.email;
  // let userHasReviewed = false;
  // let averageRating: AverageResponse;

  let productId = '';

  // console.log({ propsProductId: props.productId });

  if (props.productId) {
    productId = props.productId;
  }

  // if (shopperId) {
  //   try {
  //     const r = await fetchAPI<ResponseReviews>(
  //       url + "/reviews?product_id=" + productId + "&search_term=" +
  //         shopperId + "&status=false",
  //       {
  //         method: "GET",
  //         headers: {
  //           "content-type": "application/json",
  //           accept: "application/json",
  //         },
  //       },
  //     );

  //     if (r.data && r.data.length > 0) {
  //       userHasReviewed = true;
  //     }
  //   } catch (e) {
  //     console.log({ e });
  //     return null;
  //   }
  // }

  // try {
  //   const resp = await fetchAPI<AverageResponse>(
  //     url + "/rating/" + productId,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //         accept: "application/json",
  //       },
  //     },
  //   );
  //   averageRating = resp;
  // } catch (e) {
  //   console.log({ e });
  //   return null;
  // }

  try {
    const response = (await fetch(
      url + '/reviews?product_id=' + productId
    ).then((r) => r.json())) as ResponseReviews;

    // const response = await fetchAPI<ResponseReviews>(
    //   url + "/reviews?product_id=" + productId,
    //   {
    //     method: "GET",
    //     headers: {
    //       "content-type": "application/json",
    //       accept: "application/json",
    //     },
    //   },
    // );

    // console.log({ resposta: { ...response, userHasReviewed, averageRating } });

    // return { ...response, userHasReviewed, averageRating };
    return response;
  } catch (e) {
    console.log({ e });
    return null;
  }
};

export default loader;
