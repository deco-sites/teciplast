import type { Product } from "apps/commerce/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
}

const animal = "/animal.png"
const estampado = "/estampado.png"
const etinico = "/etinico.png"

const CORES: { [cor: string]: string} = {
  "Amarelo": "bg-[#FFFF00]",
  "Azul": "bg-[#0000FF]",
  "Azul Bebê": "bg-[#89CFF0]",
  "Azul Celeste": "bg-[#7EC0EE]",
  "Azul Royal": "bg-[#4169E1]",
  "Bege": "bg-[#F5F5DC]",
  "Branco": "bg-[#FFFFFF]",
  "Cinza": "bg-[#808080]",
  "Laranja": "bg-[#FFA500]",
  "Lilás": "bg-[#C8A2C8]",
  "Marrom": "bg-[#A52A2A]",
  "Ouro": "bg-[#FFD700]",
  "Pink": "bg-[#FF0084]",
  "Prata": "bg-[#C0C0C0]",
  "Preto": "bg-[#000000]",
  "Rosa": "bg-[#FFC0CB]",
  "Rosa Bebê": "bg-[#F4C2C2]",
  "Roxo": "bg-[#800080]",
  "Terracota": "bg-[#E2725B]",
  "Verde": "bg-[#008000]",
  "Verde Bandeira": "bg-[#006400]",
  "Vermelho": "bg-[#FF0000]",
  "Vinho": "bg-[#722F37]",
  "Animal Print":"bg-[url('/animal.png')]",
  "Estampado":"bg-[url('/estampado.png')]",
  "Étnico":"bg-[url('/etinico.png')]", 
  "Floral":"bg-[url('/etinico.png')]",
  "Mescla":"bg-[url('/estampado.png')]",
  "Transparente":"bg-[#FFFFFF]", 
};

function ColorSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  if (Object.keys(possibilities).includes("Cor Principal")) {
  return (
    <div class="border border-[#cecece] py-2 px-4 max-w-[360px] sm:max-w-[650px] ">
      <div class="mb-1">
        <span class="text-xs text-[#9b9b9b]">Selecione a cor</span>
      </div>
      <div>
        <ul class="flex gap-2  justify-between py-2 overflow-x-scroll sm:overflow-x-hidden">
        {Object.entries(possibilities["Cor Principal"]).map(([value, link]) => {
          const partial = usePartialSection({ href: link });
            if(value == 'Animal Print'){
              return( <li>
                <a href={link}>
                  <img class={` h-8 w-8 rounded-full  border-2 border-white shadow-md shadow-[#737373]`} src={animal}></img>
                </a>
              </li>)
          
            }else if (value == 'Estampado' || value == 'Mescla'){
              return( <li>
                  <a href={link}>
                    <img class={` h-8 w-8 rounded-full  border-2 border-white shadow-md shadow-[#737373]`} src={estampado}></img>
                  </a>
                </li>
              )
            }else if (value == 'Étnico' || value == 'Floral' ){
              return( <li>
                  <a href={link}>
                    <img class={` h-8 w-8 rounded-full  border-2 border-white shadow-md shadow-[#737373] `} src={etinico}></img>
                  </a>
                </li>
              )
            }else{
            return(<li>
                <a href={link} >
                  <div class={`h-8 w-8 ${CORES[value]} rounded-full p-[2px] border-2 border-white shadow-md shadow-[#737373]`}></div>
                </a>
              </li>
            );
          }
        })}deno
        </ul>
      </div>
    </div>
  );
  } else {
    return null;
  }
}

export default ColorSelector;
