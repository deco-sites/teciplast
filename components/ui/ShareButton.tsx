import { useComputed, useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  url: string;
}

function ShareButton({
  variant = "icon",
  productGroupID,
  productID,
  url,
}: Props) {
  const { user } = useUser();
  const item = { sku: productID, productId: productGroupID };
  const { buttonShare } = useUI();

  return (
    <>
      <Button
       class={variant === "icon"
       ? "btn-circle btn-ghost gap-2 hover:bg-transparent text-[#403F3F]"
       : "btn-primary btn-outline gap-2 text-center"}
        loading={false}
        aria-label="Share Button"
        onClick={(e) => {
          buttonShare.value = !buttonShare.value;
        }}
      >
        <Icon
          id="share"
          width={30}
          height={30}
          strokeWidth={2}
        />
      </Button>
      {buttonShare.value === true
        ? (
          <div
            class={`flex flex-col bg-white justify-center items-center p-5 z-1 top-0 right-0 rounded-lg font-bold `}
          >
            <span class="uppercase text-sm mb-3">Compartilhar</span>
            <div class="flex flex-row gap-5 justify-center items-center">
              <a
                href={"https://wa.me/?text=" + url}
                target="_blank"
              >
                <Icon
                  class="text-green-500"
                  id="WhatsApp"
                  size={20}
                  strokeWidth={1}
                />
              </a>

              <a
                href={"https://www.facebook.com/sharer/sharer.php?u=" + url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  class="text-blue-800"
                  id="Facebook"
                  size={20}
                  strokeWidth={2}
                />
              </a>
              <a
                href={"https://br.pinterest.com/pin/create/button/?media=" +
                  url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  class="text-red-700"
                  id="pinterest"
                  size={20}
                  strokeWidth={1}
                />
              </a>
              <a
                href={"https://twitter.com/intent/tweet?url=" + url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  class="text-blue-500"
                  id="Twitter"
                  size={20}
                  strokeWidth={1}
                />
              </a>
            </div>
          </div>
        )
        : ("")}
    </>
  );
}

export default ShareButton;
