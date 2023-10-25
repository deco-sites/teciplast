import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2 bg-base-300 text-base-100 px-5 min-h-[70px] justify-center items-center">
      <div class="flex justify-center items-center gap-2 text-xs">
        <Icon id="Truck" size={24} strokeWidth={1} />
        {remaining > 0
          ? (
            <span>
              Adicione mais ${formatPrice(remaining, currency, locale)}{" "}
              para ganhar <strong>frete grátis!</strong>
            </span>
          )
          : <span class="font-bold">Você ganhou frete grátis!</span>}
      </div>
      <div class="bg-white w-full p-0 m-none rounded-2xl ">
        <progress
          class="progress progress-primary progress-[#59c94f] w-full p-0"
          value={percent}
          max={100}
        />
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
