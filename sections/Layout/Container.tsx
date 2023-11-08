import { Section } from "deco/blocks/section.ts";

interface Props {
  children: Section;
}

function Container({ children }: Props) {
  return (
    <div class="container bg-white sm:p-4 rounded-md mt-5 border border-[#cecece]">
      <children.Component {...children.props} />
    </div>
  );
}

export default Container;
