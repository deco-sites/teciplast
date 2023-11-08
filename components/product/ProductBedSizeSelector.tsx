import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { usePartial } from "apps/website/hooks/usePartial.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  product: Product;
}

function BedSizeSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <div class="border border-[#cecece] pt-1 pb-4 px-4">
      <div class="mb-1">
        <span class="text-xs text-[#9b9b9b]">
          Selecione o tamanho da sua cama
        </span>
      </div>
      <div>
        <ul class="flex gap-2 justify-around">
          <li>
            <button>
              <div class="text-[#70A4E0] h-[110px] w-24 flex items-center justify-center rounded-md border border-[#dadada] bg-[#fafafa]">
                <div class="flex flex-col items-center">
                  <Icon id="singleBed" height={45} width={27} />
                  <span class="uppercase text-[9px] font-bold mt-2">
                    solteiro
                  </span>
                  <span class="uppercase text-[9px]">1,60 X 2,40</span>
                </div>
              </div>
            </button>
          </li>
          <li>
            <button>
              <div class="text-[#818181] h-[110px] w-24 flex items-center justify-center rounded-md hover:border hover:border-[#dadada] hover:bg-[#fafafa] hover:text-[#686868]">
                <div class="flex flex-col items-center">
                  <Icon id="doubleBed" height={45} width={32} />
                  <span class="uppercase text-[9px] font-bold mt-2">
                    casal
                  </span>
                  <span class="uppercase text-[9px]">2,20 X 2,40</span>
                </div>
              </div>
            </button>
          </li>
          <li>
            <button>
              <div class="text-[#818181] h-[110px] w-24 flex items-center justify-center rounded-md hover:border hover:border-[#dadada] hover:bg-[#fafafa] hover:text-[#686868]">
                <div class="flex flex-col items-center">
                  <Icon id="queenBed" height={45} width={37} />
                  <span class="uppercase text-[9px] font-bold mt-2">
                    queen
                  </span>
                  <span class="uppercase text-[9px]">2,40 X 2,60</span>
                </div>
              </div>
            </button>
          </li>
          <li>
            <button>
              <div class="text-[#818181] h-[110px] w-24 flex items-center justify-center rounded-md hover:border hover:border-[#dadada] hover:bg-[#fafafa] hover:text-[#686868]">
                <div class="flex flex-col items-center">
                  <Icon id="kingBed" height={45} width={41} />
                  <span class="uppercase text-[9px] font-bold mt-2">
                    king
                  </span>
                  <span class="uppercase text-[9px]">2,60 X 2,80</span>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BedSizeSelector;
