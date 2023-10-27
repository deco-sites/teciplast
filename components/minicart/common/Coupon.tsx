import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  return (
    <div class="flex justify-between items-center  w-full">
      
     
          <form
            class="join  bg-[#EDEDED] justify-center items-center border border-[#dadada] rounded-md w-full px-5" 
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

              const input = elements.namedItem("coupon") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                await onAddCoupon(text);
                setDisplay(false);
              } finally {
                setLoading(false);
              }
            }}
          >
            <input
              name="coupon"
              class="input focus:border-none focus:outline-none  bg-[#EDEDED]"
              type="text"
              value={coupon ?? ""}
              placeholder={"Cupom de desconto"}
            />
            <Button
              class="  bg-[#A6A6A6] px-2 lg:px-0  w-[120px] h-[25px] text-white rounded-md uppercase text-xs font-bold"
              type="submit"
              htmlFor="coupon"
              loading={loading}
            >
              Aplicar
            </Button>
          </form>
      
     
       
    </div>
  );
}

export default Coupon;
