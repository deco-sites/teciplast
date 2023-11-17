export interface Props {
  title: string;
  /** @description text to be rendered on top of the image */
  /** @format html */
  text: string;
}

function TextPage({
  title,
  text,
}: Props) {
  return (
    <div class="container bg-white px-5 pb-5 pt-[2px] lg:p-12  w-full border border-[#cecece] rounded min-h-8 mb-20">
      <div class="flex justify-center mb-10">
        <h3 class="text-xl">{title}</h3>
      </div>
      <div
        class="text-sm lg:text-sm text-[#646464] leading-5 [&_ul]:pl-4 [&_ul]:mx-3 [&_ul]:list-disc [&_p]:mt-3 [&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-3 [&_h4]:mt-3 [&_h5]:mt-3 [&_a]:text-blue-600 [&_a]:underline [&_a]:font-medium"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

export default TextPage;
