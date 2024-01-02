import { useId } from "$store/sdk/useId.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  data?: number;
  /**
   * @title Text
   * @default Time left for a campaign to end wth a link
   */
  text?: HTMLWidget;
  textMobile?: HTMLWidget;
  textLink?: HTMLWidget;
  /**
   * @title Expires at date
   * @format datetime
   */
  expiresAt?: string;

  labels?: {
    /**
     * @title Text to show when expired
     */
    expired?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
}

interface TextLink {
  href: string;
  text: string;
  bold: boolean;
  underline: boolean;
}

interface Text {
  text: string;
  bold: boolean;
  underline: boolean;
}

function Alert(
  {
    interval = 5,
    textLink,
    data,
    textMobile,
    expiresAt = `${new Date()}`,
    labels,
    text,
  }: Props,
) {
  const id = useId();

  const snippet = (expiresAt: string, rootId: string) => {
    const expirationDate = new Date(expiresAt).getTime();

    const getDelta = () => {
      const delta = expirationDate - new Date().getTime();

      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((delta % (1000 * 60)) / 1000);
      const totalHours = (days * 24) + hours;
      1;
      return {
        hours: Math.min(totalHours, 99),
        minutes,
        seconds,
      };
    };

    const setValue = (id: string, value: number) => {
      const elem = document.getElementById(id);

      if (!elem) return;

      elem.style.setProperty("--value", value.toString());
    };

    const start = () =>
      setInterval(() => {
        const { hours, minutes, seconds } = getDelta();
        const isExpired = hours + minutes + seconds < 0;

        if (isExpired) {
          const expired = document.getElementById(`${rootId}::expired`);
          const counter = document.getElementById(`${rootId}::counter`);

          expired && expired.classList.remove("hidden");
          counter && counter.classList.add("hidden");
        } else {
          setValue(`${rootId}::hours`, hours);
          setValue(`${rootId}::minutes`, minutes);
          setValue(`${rootId}::seconds`, seconds);
        }
      }, 1_000);

    document.readyState === "complete"
      ? start()
      : addEventListener("load", start);
  };

  return (
    <>
      <div class={` bg-[#DA892B]  flex justify-center items-center`}>
        <div
          id={id}
          class={`container bg-secondary  text-xs text-secondary-content flex justify-between items-center  px-2 lg:px-0`}
        >
          {text && (
            <div
              class="hidden lg:flex w-full max-w-[500px]"
              dangerouslySetInnerHTML={{ __html: text }}
            >
            </div>
          )}
          {textMobile &&
            (
              <div
                class="lg:hidden flex  w-full max-w-[500px] justify-center items-center text-center pt-1"
                dangerouslySetInnerHTML={{ __html: textMobile }}
              >
              </div>
            )}
          {textLink && (
            <div
              class={`hidden lg:flex text-xs lg:text-lg  w-full  `}
              dangerouslySetInnerHTML={{ __html: textLink }}
            >
            </div>
          )}

          <div class=" mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-16   gap-4 ">
            <div
              id={`${id}::expired`}
              class="hidden text-sm text-center lg:text-xl lg:text-left lg:max-w-lg"
            >
              {labels?.expired || ""}
            </div>
            <div class="flex gap-8 lg:gap-16 items-center justify-center lg:justify-normal py-2 ">
              <div id={`${id}::counter`}>
                <div class="grid grid-flow-col lg:gap-3 text-center auto-cols-max items-center">
                  <span class="hidden lg:flex">Acaba em:</span>
                  <div class="flex flex-row lg:flex-col text-xs lg:text-XS text-center items-center justify-center ">
                    <span class="countdown text-xl lg:text-xl font-bold mr-1  lg:mr-0 ">
                      <span id={`${id}::hours`} />
                    </span>
                    <span class="hidden lg:flex">{labels?.hours || ""}</span>
                  </div>
                  <div class="flex px-1">
                    :
                  </div>
                  <div class="flex flex-row lg:flex-col text-xs lg:text-XS text-center items-center justify-center ">
                    <span class="countdown text-xl lg:text-xl font-bold mr-1  lg:mr-0 ">
                      <span id={`${id}::minutes`} />
                    </span>
                    <span class="hidden lg:flex">{labels?.minutes || ""}</span>
                  </div>
                  <div class="flex px-1">
                    :
                  </div>
                  <div class="flex flex-row lg:flex-col text-xs lg:text-XS text-center items-center justify-center ">
                    <span class="countdown text-xl lg:text-xl font-bold mr-1  lg:mr-0 ">
                      <span id={`${id}::seconds`} />
                    </span>
                    <span class="hidden lg:flex">{labels?.seconds || ""}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `(${snippet})("${expiresAt}", "${id}");`,
        }}
      />
    </>
  );
}

export default Alert;
