import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight, marginTopDrop } from "./constants.ts";
import Icon from "$store/components/ui/Icon.tsx";

function NavItem(
  { item, index,ultItem }: { item: SiteNavigationElement; index: number ,ultItem : number},
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

      <div
        class={` absolute hidden hover:flex group-hover:flex   bg-gray-100 z-50 items-center justify-center  max-w-[400px] ${index == ultItem ? " right-0":" "} `}
        style={{ top: "0px", marginTop: "45px" }}
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
        <ul class="flex flex-row items-center justify-start  flex-wrap  "
        >
          {children?.map((node) => (
            <li class=" text-start min-w-[200px] max-w-[200px] p-[7.5px] ">
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
    </li>
  );
}
export default NavItem;
