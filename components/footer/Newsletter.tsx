import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    /**
     * @label Primary text (html)
     */
    title?: string;
    /** @format textarea */
    /**
     * @label Secondary text (html)
     */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={`flex flex-row justify-around`}
    >
      <div class="flex flex-col gap-4">
        {content?.title
          ? (
            <h3 class={tiled ? "text-2xl lg:text-3xl" : "text-lg"}>
              {content?.title}
            </h3>
          )
          : (
            <span class={"text-lg"}>
              Quer mais <b>descontos</b> e{" "}
              <b>oportunidades</b>? Informe seu email
            </span>
          )}
        {content?.description && <div>{content?.description}</div>}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3">
            <input
              name="email"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="btn disabled:loading"
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
        {content?.form?.helpText && (
          <div
            class="text-[9px]"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;
