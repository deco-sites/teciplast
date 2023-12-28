import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Props {
  benefits?: Benefit[];
}

/* @titleBy text */
interface Benefit {
  id: string;
  text: string;
  textGreen: string;
  icon: AvailableIcons;
}

export default function BenefitsBar(props: Props) {
  const { benefits = [] } = props;
  return (
    <section class="container w-full h-20 my-6">
      <div class="flex flex-row h-full">
        {benefits.map((benefit, index) => {
          return (
            <div
              class={` ${
                index === 0
                  ? "benefits-bg-first w-1/2 sm:w-1/4 grid grid-cols-3"
                  : index === benefits.length - 1
                  ? "benefits-bg-last w-1/2 sm:w-1/4 grid grid-cols-3"
                  : "benefits-bg-middle hidden benefits-bg-middle w-1/4 sm:grid sm:grid-cols-3"
              } `}
            >
              <div class="col-span-1 flex items-center">
                {index === 0
                  ? (
                    <div class="bg-[#007C2C] w-[3px] h-[65px] flex-shrink-0 ml-3">
                    </div>
                  )
                  : null}
                <Icon height={35} id={benefit.icon} />
              </div>
              <div class="col-span-2 flex flex-col justify-center">
                <h3 class="text-[#403F3F]">
                  {benefit.text}
                </h3>
                <h3 class="text-[#007C2C]">
                  {benefit.textGreen}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
