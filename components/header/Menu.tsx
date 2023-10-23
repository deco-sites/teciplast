import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {

  return (
    <div
      class={`collapse ${
        item.children && item.children.length > 0 && ("collapse-arrow")
      }`}
    >
      <input type="checkbox" aria-label={item.name} />
      <label class="collapse-title  text-base">
        {item.name}  
      </label>
      <div class="collapse-content">
        <ul class="text-sm border-none ">
          {item.children?.map((node) => (
            <li class="gap-2">
              <a class=" text-sm border-none" href={node.url}>
                {node.name}
                
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 mt-10">
      {items.map((item) => (
        <li>
          <MenuItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default Menu;