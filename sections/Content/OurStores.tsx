import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Store {
  label: string;
  href?: string;
  image?: ImageWidget;
}

export interface Props {
  /**
   * @label Lista de Categorias
   */
  list?: Store[];
}

function OurStores(props: Props) {
  const id = useId();
  const {
    list = [
      {
        label: "Nova Iguaçu",
        href: "/store",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
  } = props;

  return (
    <div class="container">
      <h3 class="uppercase text-xl text-[#403F3F] font-medium">Nossas Lojas</h3>
      <div
        id={id}
        class="flex justify-around flex-col text-base-content p-4 grid sm:grid-cols-[48px_1fr_48px]"
      >
        <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5">
          {list.map((
            { label, href, image },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-4 carousel-item sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <a
                href={href}
                class="flex flex-col gap-4 lg:w-[150px] sm:w-40 w-24 lg:h-auto"
                target="_blank"
              >
                {image &&
                  (
                    <div>
                      <figure class="relative p-[6px] bg-white">
                        <Image
                          class="card w-full rounded-none shadow-[#c7c7c7] shadow-sm"
                          src={image}
                          alt={label}
                          width={121}
                          height={121}
                          loading="lazy"
                        />
                      </figure>
                      <div class="mt-2">
                        <h3 class="text-center text-xs sm:text-base text-[#403F3F font-medium">
                          {label}
                        </h3>
                      </div>
                    </div>
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
    </div>
  );
}

export default OurStores;
