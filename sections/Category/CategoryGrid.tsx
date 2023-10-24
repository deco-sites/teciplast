import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
@titleBy title
*/
export interface SubCategory {
  /**
   * @title Título da subcategoria
  */
  title: string;
  image: ImageWidget;
  /**
   * @title Link da subcategoria
  */
  href: string;
}

/**
@titleBy title
*/
export interface Category {
  /**
   * @title Título da Categoria
  */
  title: string;
  /**
   * @title Tipo de exibição
  */
  showItems: 3 | 5;
  /**
   * @title Link da Categoria
  */
  href?: string;
  /**
   * @title Subcategorias
  */
  subcategories?: SubCategory[];
}

export interface Props {
  /**
   * @title Categorias
  */
  list?: Category[];
}

function CategoryGrid(props: Props) {
  const id = useId();
  const {
    list = [{
      title: "10% off",
      href: "/feminino",
      showItems: 3,
    }],
  } = props;

  return (
    <div
      id={id}
      class="mt-6 container"
    >
      <div class="grid gap-4 grid-cols-9">
        {list.map((
          { title, href, showItems, subcategories },
          index,
        ) => (
          <div class={index > 0 ? "col-span-2 h-full" : "col-span-3 h-full"}>
            <div class="shadow-[#c7c7c7] shadow-md p-4 h-full relative pb-7">
              <h3 class="text-xl">{title}</h3>
              <div
                class={showItems === 3
                  ? "grid grid-cols-2 gap-2"
                  : "grid grid-cols-3 gap-2"}
              >
                {subcategories?.map(({ title, image, href }, index) => (
                  index < showItems
                    ? (
                      <a
                        href={href}
                        class={index > 0
                          ? "col-span-1 w-full"
                          : "col-span-2 w-full"}
                      >
                        {image &&
                          (
                            <figure class={"relative h-full"}>
                              <Image
                                class="w-full h-full border-white border-2"
                                src={image}
                                alt={title}
                                width={250}
                                loading="lazy"
                              />
                              <h3 class="absolute w-full bg-white bottom-0 text-left py-1 px-1 text-xs">
                                {title}
                              </h3>
                            </figure>
                          )}
                      </a>
                    )
                    : null
                ))}
              </div>
              <a
                href={href}
                class="absolute bottom-0 right-0 text-right inline-block p-3 text-[#8B8B8B] text-xs hover:underline"
              >
                {`Ver todos >`}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
