import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

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
  const { content } = props;

  return (
    <div class="grid grid-cols-1 grid-rows-1">
      <div class="container flex flex-col items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full">
        {content}
      </div>
    </div>
  );
}

export interface Props {
  texts?: ICategoryText[];
}

export const loader = (props: Props, req: Request) => {
  const { texts } = { ...DEFAULT_PROPS, ...props };

  const content = texts.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { content };
};

export default CategoryText;
