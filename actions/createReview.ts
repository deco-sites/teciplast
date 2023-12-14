import { parseCookie } from "apps/vtex/utils/vtexId.ts";

export interface PropsCreate {
  productId: string;
  rating: number;
  title: string;
  text: string;
  reviewerName: string;
}

export interface CreateResponse {
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
  approved: boolean;
  location: string | null;
  locale: string | null;
  pastReviews: string | null;
}

const url = "https://tecilar.myvtex.com/reviews-and-ratings/api";

const parseCookies = (str: string): { [key: string]: string } => {
  return str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      const [key, value] = v.map(decodeURIComponent);
      acc[key.trim()] = value.trim();
      return acc;
    }, {} as { [key: string]: string });
};

export const create = async (
  props: PropsCreate,
  req: Request,
): Promise<CreateResponse | null> => {
  const { productId, rating, title, text, reviewerName } = props;
  // const url = new URL(req.url);
  // const page = Number(url.searchParams.get("page")) || 0;
  const { cookie, payload } = parseCookie(req.headers, "tecilar");
  const user = payload?.sub;

  if (!user) {
    return null;
  }

  try {
    const response = await fetch(url + "/review", {
      method: "POST",
      body: JSON.stringify({
        rating,
        title,
        text,
        reviewerName,
        productId,
        variables: {
          shopperId: user,
        },
        approved: false,
      }),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        cookie,
        VtexIdclientAutCookie:
          parseCookies(cookie).VtexIdclientAutCookie_tecilar,
      },
    });

    return response.json();
  } catch (e) {
    // console.log({ e });
    return e;
  }
};

export default create;
