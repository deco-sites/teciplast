import RatingStars from "$store/components/ui/RatingStars.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Review {
  reviewerName: string;
  verifiedPurchase: boolean;
  reviewTitle: string;
  reviewText: string;
  reviewDate: Date;
  rating: number;
}

type Reviews = Review[];

const formatDate = (date: Date) => {
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};

const ReviewsList = (
  { productId, reviews }: { productId: string; reviews: Reviews },
) => {
  return (
    <div>
      {reviews.map((r, i) => (
        <div class="grid grid-cols-5 border-t border-[#dadada] py-8">
          <div class="flex flex-col col-span-1 mt-1">
            <span class="font-semibold">{r.reviewerName}</span>
            {r.verifiedPurchase && (
              <div class="text-blue-500 flex items-center gap-1">
                <Icon id="secureCircle" height={12} width={12} />
                <span class="text-xs">Compra Verificada</span>
              </div>
            )}
          </div>
          <div class="col-span-4 flex flex-col">
            <div class="flex justify-between mb-3">
              <div class="flex items-center gap-3">
                <span class="font-bold italic">"{r.reviewTitle}"</span>
                <RatingStars
                  productId={`${i}-${productId}`}
                  average={r.rating}
                  display="reviews"
                />
              </div>
              <span class="text-[#828282] text-xs">
                {formatDate(r.reviewDate)}
              </span>
            </div>
            <span class="text-[#828282] italic">{r.reviewText}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

function ProductReviews() {
  const productId = "asd11324";
  const averageReview = 4.8;
  const reviews: Reviews = [
    {
      reviewerName: "Sônia Soares",
      verifiedPurchase: true,
      reviewTitle: "Satisfeira com a compra!",
      reviewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nibh dui, tempor vel elementum at, suscipit quis tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris pulvinar commodo dictum. In accumsan vitae velit sit amet consequat. Nullam pellentesque malesuada erat nec rutrum.",
      reviewDate: new Date(),
      rating: 4,
    },
    {
      reviewerName: "Sônia Soares",
      verifiedPurchase: true,
      reviewTitle: "Satisfeira com a compra!",
      reviewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nibh dui, tempor vel elementum at, suscipit quis tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris pulvinar commodo dictum. In accumsan vitae velit sit amet consequat. Nullam pellentesque malesuada erat nec rutrum.",
      reviewDate: new Date(),
      rating: 4,
    },
  ];
  return (
    <div class="w-full max-w-[1300px] border-t border-[#dedede] pt-4 mx-auto mt-10">
      <h3 class="uppercase my-5">Avaliações do produto</h3>
      <div class="flex justify-between mb-6">
        <RatingStars
          productId={productId}
          display="detailsPage"
          average={averageReview}
        />
        <div class="flex gap-2">
          <select class="select select-bordered w-full max-w-xs">
            <option disabled selected>Ordenar</option>
            <option>Mais Recente</option>
            <option>Mais Antiga</option>
            <option>Mais Estrelas</option>
            <option>Menos Estrelas</option>
          </select>
          <select class="select select-bordered w-full max-w-xs">
            <option disabled selected>Qualificação</option>
            <option>1 estrela</option>
            <option>2 estrelas</option>
            <option>3 estrelas</option>
            <option>4 estrelas</option>
            <option>5 estrelas</option>
          </select>
        </div>
      </div>
      <div>
        <ReviewsList productId={productId} reviews={reviews} />
      </div>
    </div>
  );
}

export default ProductReviews;
