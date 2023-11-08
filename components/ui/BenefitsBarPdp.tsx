import Icon from "$store/components/ui/Icon.tsx";


export interface Props {
    valor? : number;
}
export default function BenefitsBarPdp(props: Props) {
  return (
    <section class="w-full max-w-[700px] h-20 my-3 bg-transparent">
      <div class="flex flex-row h-full w-full justify-between items-center">
        <div class="benefits-bg-first-gray w-1/2 grid grid-cols-3 h-full ">
          <div class="col-span-1 flex items-center">
            <div class="bg-[#007C2C] w-[3px] h-[65px] flex-shrink-0 ml-1 lg:ml-3"></div>
            <Icon height={25} id="GreenShield" />
          </div>
          <div class="col-span-2 flex flex-col justify-center">
            <h3 class="text-[#403F3F] text-xs lg:text-[15px] ">
              Compra Segura
            </h3>
            <h3 class="text-[#007C2C] text-xs lg:text-[15px]">
              Loja 100% confiável
            </h3>
          </div>
        </div>
        <div class="benefits-bg-last-gray w-1/2 grid grid-cols-3 h-full">
          <div class="col-span-1 flex items-center pl-4">
            <Icon height={25} id="ReturnBox" />
          </div>
          <div class="col-span-2 flex flex-col justify-center pl-3">
            <h3 class="text-[#403F3F] text-xs lg:text-[15px]">
              É Grátis
            </h3>
            <h3 class="text-[#007C2C] text-xs lg:text-[15px]">
              a primeira troca
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
