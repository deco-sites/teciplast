import RatingStars from "$store/components/ui/RatingStars.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  borderRoundedBot?: boolean;
}

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

const NewRatingForm = (
  { productId }: {
    productId: string;
  },
) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [reviewerName, setReviewerName] = useState<string | undefined>(
    undefined,
  );
  const [text, setText] = useState<string | undefined>(undefined);
  const [rating, setRating] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);

  return (
    <form
      className="form-control w-full  mt-8"
      onSubmit={() => alert("submitted!!")}
    >
      <h2 class="font-bold uppercase">Adicionar avaliação</h2>
      <label className="label mt-4">
        <span className="text-xl font-normal">
          Título
        </span>
      </label>
      <input
        type="text"
        value={title}
        className="input input-bordered w-full font-normal border-[#808080]"
        onClick={() => {
          if (!title) setTitle("");
        }}
        onChange={(e) => e.target && setTitle(e.currentTarget.value)}
        required
      />
      {title?.length == 0 && (
        <p class="text-red-500 text-sm">
          Escreva um título para a sua avaliação
        </p>
      )}
      <div class="mt-4">
        <label className="label mt-4">
          <span className="font-normal pb-0">
            Avalie o produto de 1 a 5 estrelas
          </span>
        </label>
        <div className="rating mt-2">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(1)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(2)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(3)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(4)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(5)}
          />
        </div>

        <label className="label mt-4">
          <span className="font-normal">Seu nome</span>
        </label>
        <input
          type="text"
          value={reviewerName}
          className="input input-bordered w-full font-normal text-lg border-[#808080]"
          onClick={() => {
            if (!reviewerName) setReviewerName("");
          }}
          onChange={(e) => e.target && setReviewerName(e.currentTarget.value)}
          required
        />
        {reviewerName?.length == 0 && (
          <p class="text-red-500 text-sm">Informe seu nome</p>
        )}
        <label className="label mt-4">
          <span className="font-normal">Escreva uma avaliação</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full font-normal text-lg border-[#808080] h-36"
          value={text}
          onClick={() => {
            if (!text) setText("");
          }}
          onChange={(e) => e.target && setText(e.currentTarget.value)}
          required
        >
        </textarea>
        {text?.length == 0 && (
          <p class="text-red-500 text-sm">
            Escreva um comentário para a sua avaliação
          </p>
        )}
      </div>
      <div class="text-left">
        {formSent
          ? <span class="text-green-600">Sua avaliação foi enviada!</span>
          : (
            <Button
              class="btn btn-primary bg-[#1e5b90] w-fit mt-6"
              type={"submit"}
              aria-label={"Enviar avaliação"}
            >
              {isLoading
                ? <span class="loading loading-spinner loading-sm"></span>
                : ("Enviar avaliação")}
            </Button>
          )}
      </div>
    </form>
  );
};

const ReviewsList = (
  { productId, reviews }: {
    productId: string;
    reviews: Reviews;
  },
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

const NoReviews = () => {
  return (
    <div class="flex justify-center items-center bg-[#e5e5e5] mb-4 h-28">
      <h3>Este produto ainda não possui avaliações.</h3>
    </div>
  );
};

function ProductReviews(props: Props) {
  const { borderRoundedBot } = props;

  const productId = "asd11324";
  const userHasReviewed = false;
  const averageReview = 4.8;
  const reviews2: Reviews = [];
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

  const { user } = useUser();
  const isLogged = true;
  // const isLogged = Boolean(user.value?.email);

  return (
    <div
      class={`container bg-white px-5 pb-5 pt-[2px] lg:p-12  w-full border-x border-[#cecece] ${
        borderRoundedBot && "rounded-b border-b"
      } `}
    >
      <h3 class="uppercase my-5 pt-10 border-t border-[#cecece]">
        Avaliações do produto
      </h3>
      {Boolean(reviews.length) && (
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
      )}
      <div>
        {reviews.length
          ? <ReviewsList productId={productId} reviews={reviews} />
          : <NoReviews />}
      </div>
      <div class="flex flex-col gap-2">
        {
          /* <span class="text-[#006299] cursor-pointer">
          Mostrar todas avaliações
        </span> */
        }
        {isLogged && (
          <div class="text-left mt-4">
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-white rounded-none shadow-none font-semibold text-base p-0 text-black"
            >
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-medium w-60 bg-black text-white peer-checked:bg-white peer-checked:text-black peer-checked:border peer-checked:border-black">
                Escreva uma avaliação
              </div>
              <div className="collapse-content transition duration-[800ms]">
                {userHasReviewed
                  ? (
                    <div>
                      <span>
                        Você já enviou uma avaliação para este produto
                      </span>
                    </div>
                  )
                  : <NewRatingForm productId={productId} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
