import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export type Props = {
  count?: number;
  stars?: number;
  average?: number;
  size?: string;
  extraClasses?: string;
  productId: string;
  display: "productCard" | "detailsPage" | "reviews";
};

const RatingStars = (
  {
    productId,
    average = 4.8,
    count = 25,
    size = "sm",
    extraClasses = "",
    display = "productCard",
  }: Props,
) => {
  // Calculate the number of half stars
  const halfStars = Math.floor(average) * 2;
  const hasHalfStar = average % 1 !== 0;

  const starFilled = hasHalfStar ? halfStars + 1 : halfStars;

  console.log({ average, count, starFilled });

  // Create an array of 10 elements (5 stars, each divided into half)
  // const stars = new Array(10).fill(null);
  // stars[2] = "filled";
  // console.log({ stars });

  return (
    <div className={`flex text-[#3a3a3a] items-center ${extraClasses}`}>
      {display === "detailsPage" && (
        <div class="mt-1">
          <span class="font-bold text-base mr-1">{average}</span>
        </div>
      )}
      <div
        className={`rating rating-${size} mr-1 rating-half flex items-center`}
      >
        {
          /* <input type="radio" name={productId} class="rating-hidden" />
        {stars.map((star, index) => (
          <input
            key={index}
            type="radio"
            name={productId}
            className={`mask mask-star mask-half-${
              index % 2 === 0 ? "1" : "2"
            } bg-yellow-400`}
            disabled
            checked={star === "filled"}
          />
        ))} */
        }
        <input type="radio" name={productId} class="rating-hidden" />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-1"
          checked={starFilled === 1}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-2"
          checked={starFilled === 2}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-1"
          checked={starFilled === 3}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-2"
          checked={starFilled === 4}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-1"
          checked={starFilled === 5}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-2"
          checked={starFilled === 6}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-1"
          checked={starFilled === 7}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-2"
          checked={starFilled === 8}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-1"
          checked={starFilled === 9}
        />
        <input
          type="radio"
          name={productId}
          class="bg-yellow-400 mask mask-star mask-half-2"
          checked={starFilled === 10}
        />
      </div>
      {display !== "reviews" && (
        <div>
          ({count}
          {display === "detailsPage" &&
            (count > 1 ? " avaliações" : " avaliação")})
        </div>
      )}
    </div>
  );
};

export default RatingStars;
