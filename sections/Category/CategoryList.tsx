import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Category {
  label: string;
  href?: string;
  image?: ImageWidget;
}

export interface Props {
  /**
   * @label Lista de Categorias
   */
  list?: Category[];
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
  } = props;

  return (
    <div
      id={id}
      class="mt-6 flex justify-around container flex-col text-base-content shadow-[#c7c7c7] shadow-md p-4 grid sm:grid-cols-[48px_1fr_48px] bg-white"
    >
      <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5">
        {list.map((
          { label, href, image },
          index,
        ) => (
          <Slider.Item
            index={index}
            class="flex flex-col gap-4 carousel-item first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
          >
            <a
              href={href}
              class="flex flex-col gap-4 lg:w-[150px] sm:w-40 w-24 lg:h-auto"
            >
              {image &&
                (
                  <figure class="relative">
                    <div class="absolute bg-white z-10 top-2/3 w-full">
                      <h3 class="uppercase text-center text-xs sm:text-base">
                        {label}
                      </h3>
                    </div>
                    <Image
                      class="card w-full rounded-full"
                      src={image}
                      alt={label}
                      width={121}
                      height={121}
                      loading="lazy"
                    />
                  </figure>
                )}
            </a>
          </Slider.Item>
        ))}
      </Slider>
      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3 mt-[-21px]">
          <Slider.PrevButton class="btn btn-circle  absolute right-[17%] bg-base-100">
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3 mt-[-21px]">
          <Slider.NextButton class="btn btn-circle  absolute left-[17%] bg-base-100">
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
      </>
      <SliderJS rootId={id} />
    </div>
  );
}

export default CategoryList;
