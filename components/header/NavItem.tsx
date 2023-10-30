import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight, marginTopDrop } from "./constants.ts";
import Icon from "$store/components/ui/Icon.tsx";

function NavItem(
  { item, index }: { item: SiteNavigationElement; index: number }
) {
  const { url, name, children } = item;
  const image = item?.image?.[0];
  return (
    <li
      class={` group grid overflow-y-hidden items-center  ease-out duration-300 py-2 `}
    >
      <a href={url}>
        <div class="flex flex-row items-center gap-2 border-b-[3px] border-b-transparent group-hover:border-b-[#626262]   px-1 py-2">
          <span>
            {name}
          </span>
          <Icon
            id="ChevronDown"
            size={15}
            strokeWidth={2}
            fill="none"
          />
        </div>
      </a>

      {children && children.length > 0 && index == 0
        ? (
          <div
            class={` absolute hidden hover:flex group-hover:flex z-50 items-center justify-center  max-w-[350px] bg-gray-100 `}
            style={{ top: "0px", marginTop: marginTopDrop }}
          >
            <ul class="flex flex-col items-center justify-start  flex-wrap gaṕ-3  ">
              {children.map((node) => (
                <li class="group/item text-start  text-[#626262] min-w-[175px] max-w-[175px] px-[15px] hover:font-bold hover:bg-[#d9d9d9] py-2 h-full  ">
                  <a
                    class="flex flex-row h-full justify-between items-center "
                    href={node.url}
                  >
                    <span>{node.name}</span>
                    <Icon
                      id="ChevronRight"
                      size={15}
                      strokeWidth={2}
                      fill="none"
                    />
                  </a>
                  <div
                    class={`group-hover/item:flex absolute hidden hover:flex  z-50 items-center justify-center border-l-2 border-[#d6d6d6] max-w-[350px] bg-[#EDEDED] `}
                    style={{ top: "0px", marginLeft: "160px" }}
                  >
                    <ul class="flex flex-col items-center justify-start    min-w-[175px]">
                      {node.children?.map((leaf) => (
                        <li class="py-2" >
                          <a
                            class="flex flex-row h-full justify-start items-center "
                            href={leaf.url}
                          >
                            <span class="font-normal">{leaf.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
        : (
          <div
            class={` absolute hidden hover:flex group-hover:flex   bg-gray-100 z-50 items-center justify-center max-w-[350px] `}
            style={{ top: "0px", marginTop: marginTopDrop }}
          >
            {image?.url && (
              <Image
                class="p-6"
                src={image.url}
                alt={image.alternateName}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex flex-row items-center justify-start  flex-wrap ">
              {children?.map((node) => (
                <li class=" text-start min-w-[175px] p-[15px] ">
                  <a class="" href={node.url}>
                    <span>{node.name}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="" href={leaf.url}>
                          <span class="text-xs">{leaf.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
