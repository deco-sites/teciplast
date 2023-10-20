import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col gap-3">
          <div>
            <img
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              class={"w-44 mb-5"}
            />
          </div>
        </div>
      )}
    </>
  );
}
