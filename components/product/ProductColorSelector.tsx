import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";


interface Props {
  product: Product;
}

function ColorSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <div class="border border-[#cecece] py-1 px-4">
      <div class="mb-1">
        <span class="text-xs text-[#9b9b9b]">Selecione a cor</span>
      </div>
      <div>
        <ul class="flex gap-2">
          <li>
            <button>
              <div class="h-8 w-8 bg-red-800 rounded-full p-[2px] border-2 border-white shadow-md shadow-[#737373]">
              </div>
            </button>
          </li>
          <li>
            <button>
              <div class="h-8 w-8 bg-green-500 rounded-full p-[2px] border-2 border-white hover:shadow-md hover:shadow-[#737373]">
              </div>
            </button>
          </li>
          <li>
            <button>
              <div class="h-8 w-8 bg-blue-600 rounded-full p-[2px] border-2 border-white hover:shadow-md hover:shadow-[#737373]">
              </div>
            </button>
          </li>
          <li>
            <button>
              <div class="h-8 w-8 bg-yellow-600 rounded-full p-[2px] border-2 border-white hover:shadow-md hover:shadow-[#737373]">
              </div>
            </button>
          </li>
          <li>
            <button>
              <div class="h-8 w-8 bg-purple-800 rounded-full p-[2px] border-2 border-white hover:shadow-md hover:shadow-[#737373]">
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ColorSelector;
