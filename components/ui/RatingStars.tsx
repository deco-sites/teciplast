import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export type Props = {
  count?: number;
  stars?: number;
  average?: number;
  size?: string;
  extraClasses?: string;
  productId: string;
  display: "productCard" | "detailsPage";
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

  // Create an array of 10 elements (5 stars, each divided into half)
  const stars = new Array(10).fill(null);

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
        {stars.map((_, index) => (
          <input
            key={index}
            type="radio"
            name={productId}
            className={`mask mask-star mask-half-${
              index % 2 === 0 ? "1" : "2"
            } bg-yellow-400`}
            disabled
            checked={index < halfStars || (index === halfStars && hasHalfStar)}
          />
        ))}
      </div>
      <div>({count}{display === "detailsPage" && " avaliações"})</div>
    </div>
  );
};

export default RatingStars;
