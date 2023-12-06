import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Props {
  product: Product;
}

const BedAvatar = (
  { bedSize, variant }: { bedSize: string; variant: string },
) => {
  const activeClass =
    "text-[#70A4E0] h-[110px] w-24 flex items-center justify-center rounded-md border border-[#dadada] bg-[#fafafa]";
  const defaultClass =
    "text-[#818181] h-[110px] w-24 flex items-center justify-center rounded-md hover:border hover:border-[#dadada] hover:bg-[#fafafa] hover:text-[#686868]";

  return (
    <div class={`${variant === "active" ? activeClass : defaultClass}`}>
      <div class="flex flex-col items-center">
        {bedSize === "Berço" && (
          <>
            <Icon id="singleBed" height={45} width={27} />
            <span class="uppercase text-[9px] font-bold mt-2">
              berço
            </span>
            <span class="uppercase text-[9px]">0,70 X 1,30</span>
          </>
        )}
        {bedSize === "Infantil" && (
          <>
            <Icon id="singleBed" height={45} width={27} />
            <span class="uppercase text-[9px] font-bold mt-2">
              infantil
            </span>
            <span class="uppercase text-[9px]">1,60 X 2,30</span>
          </>
        )}
        {bedSize === "Solteiro" && (
          <>
            <Icon id="singleBed" height={45} width={27} />
            <span class="uppercase text-[9px] font-bold mt-2">
              solteiro
            </span>
            <span class="uppercase text-[9px]">1,60 X 2,40</span>
          </>
        )}
        {bedSize === "Casal" && (
          <>
            <Icon id="doubleBed" height={45} width={32} />
            <span class="uppercase text-[9px] font-bold mt-2">
              casal
            </span>
            <span class="uppercase text-[9px]">2,20 X 2,40</span>
          </>
        )}
        {bedSize === "Queen Size" && (
          <>
            <Icon id="queenBed" height={45} width={37} />
            <span class="uppercase text-[9px] font-bold mt-2">
              queen
            </span>
            <span class="uppercase text-[9px]">2,40 X 2,60</span>
          </>
        )}
        {bedSize === "King Size" && (
          <>
            <Icon id="kingBed" height={45} width={41} />
            <span class="uppercase text-[9px] font-bold mt-2">
              king
            </span>
            <span class="uppercase text-[9px]">2,60 X 2,80</span>
          </>
        )}
      </div>
    </div>
  );
};

function BedSizeSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  console.log({ keys: Object.keys(possibilities) });

  if (Object.keys(possibilities).includes("Tamanho")) {
    console.log({ tamanhos: Object.entries(possibilities["Tamanho"]) });
    Object.entries(possibilities["Tamanho"]).map((entry) =>
      console.log({ entry })
    );
    return (
      <div class="border border-[#cecece] pt-1 pb-4 px-4">
        <div class="mb-1">
          <span class="text-xs text-[#9b9b9b]">
            Selecione o tamanho da sua cama
          </span>
        </div>
        <div>
          <ul class="flex gap-2 justify-start">
            {Object.entries(possibilities["Tamanho"]).map(([value, link]) => {
              const partial = usePartialSection({ href: link });

              return (
                <li>
                  <button {...partial}>
                    <BedAvatar
                      bedSize={value}
                      variant={link === url
                        ? "active"
                        : link
                        ? "default"
                        : "disabled"}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default BedSizeSelector;
