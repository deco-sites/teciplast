import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useState } from "preact/hooks";


/**
 * @titleBy matcher
 */
export interface ICategoryText {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  /** @format html */
  content: string;
}

const DEFAULT_PROPS = { 
  texts: [
    {
      content: "<h3>Hello</h3><p>Default Text</p>",
      matcher: "/*",
    },
  ],
};

function CategoryText(props: SectionProps<ReturnType<typeof loader>>) {
  const [isShowing, setIsShowing] = useState(false);
  const toggleShow = () => setIsShowing(!isShowing);
  const { content } = props;
  
  if(!content) return null;
  return (
    <section class="w-full px-auto flex justify-center my-[70px]">
      <div class="container px-4 lg:px-0">
        <div
          class={`${
            isShowing ? "max-h-fit" : "max-h-[140px]"
          } overflow-hidden text-gray-500 `}
        >
          {content && (
          <div
            class="text-sm lg:text-sm text-[#646464] leading-5 [&_ul]:pl-4 [&_ul]:mx-3 [&_ul]:list-disc [&_p]:mt-3 [&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-3 [&_h4]:mt-3 [&_h5]:mt-3 [&_a]:text-blue-600 [&_a]:underline [&_a]:font-medium"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        </div>
        <div class="border-t pt-4 flex justify-center border-gray-300">
          <button
            class="bg-white rounded-none px-[15px] py-[6px] text-sm border border-[#C0C0C0] text-[#787878]"
            onClick={() => toggleShow()}
          >
            {!isShowing ? "Ler Mais" : "Ler Menos"}
          </button>
        </div>
      </div>
    </section>
  );
}

export interface Props {
  texts?: ICategoryText[];
}

export const loader = (props: Props, req: Request) => {
  const { texts } = { ...DEFAULT_PROPS, ...props };

  const text = texts.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { content: text?.content };
};

export default CategoryText;
