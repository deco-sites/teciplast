import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-28 ${
              justify && "lg:justify-around"
            }`}
          >
            {sections.map((section, i) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-semibold text-base uppercase">
                    {section.label}
                  </span>
                  <ul
                    class={`${
                      i === 0 && "columns-2 inline gap-x-8"
                    }  flex-col flex-wrap text-sm leading-7`}
                  >
                    {section.items?.map((item) => (
                      <li>
                        {item.label.includes("@") && (
                          <div class={"inline-flex gap-2 items-center"}>
                            <Icon id="Email" width={20} height={20} />
                            <span>
                              {item.label}
                            </span>
                          </div>
                        )}
                        {item.label.includes("(21)") && (
                          <div class={"inline-flex gap-2 items-center"}>
                            <Icon id="WhatsApp2" width={20} height={20} />
                            <span>
                              {item.label}
                            </span>
                          </div>
                        )}
                        {!item.label.includes("@") &&
                          !item.label.includes("(21)") && (
                          <a
                            href={item.href}
                            class="block py-1 link link-hover"
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-4">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow ">
                  <input type="checkbox" class="min-h-[0]" />
                  <div class="collapse-title min-h-[0] !p-0 flex gap-2">
                    <span>{section.label}</span>
                  </div>
                  <div class="collapse-content">
                    <ul
                      class={`flex flex-col gap-1 pl-5 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
