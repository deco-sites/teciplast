import Icon from "$store/components/ui/Icon.tsx";

export default function BenefitsBar(props: Props) {
  return (
    <section class="container w-full h-20 my-6">
      <div class="flex flex-row h-full">
        <div class="benefits-bg-first w-1/2 sm:w-1/4 grid grid-cols-3">
          <div class="col-span-1 flex items-center">
            <div class="bg-[#007C2C] w-[3px] h-[65px] flex-shrink-0 ml-3"></div>
            <Icon height={35} id="GreenShield" />
          </div>
          <div class="col-span-2 flex flex-col justify-center">
            <h3 class="text-[#403F3F]">
              Compra Segura
            </h3>
            <h3 class="text-[#007C2C]">
              Loja 100% confiável
            </h3>
          </div>
          {/* <Icon id="BenefitBgFirst"></Icon> */}
        </div>
        <div class="hidden benefits-bg-middle w-1/4 sm:grid sm:grid-cols-3">
          <div class="col-span-1 flex items-center pl-3">
            <Icon height={29} id="FastTruck" />
          </div>
          <div class="col-span-2 flex flex-col justify-center">
            <h3 class="text-[#403F3F]">
              Frete Grátis
            </h3>
            <h3 class="text-[#007C2C]">
              a partir de R$ 450,00
            </h3>
          </div>
        </div>
        <div class="hidden benefits-bg-middle w-1/4 sm:grid sm:grid-cols-3">
          <div class="col-span-1 flex items-center pl-3">
            <Icon height={35} id="PresentBox" />
          </div>
          <div class="col-span-2 flex flex-col justify-center">
            <h3 class="text-[#403F3F]">
              15% OFF
            </h3>
            <h3 class="text-[#007C2C]">
              na primeira compra
            </h3>
          </div>
        </div>
        <div class="benefits-bg-last w-1/2 sm:w-1/4 grid grid-cols-3">
          <div class="col-span-1 flex items-center pl-4">
            <Icon height={37} id="ReturnBox" />
          </div>
          <div class="col-span-2 flex flex-col justify-center pl-3">
            <h3 class="text-[#403F3F]">
              É Grátis
            </h3>
            <h3 class="text-[#007C2C]">
              a primeira troca
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
