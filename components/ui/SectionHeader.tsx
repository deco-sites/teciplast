interface ColorBG {
  /**
   * @format color
   * @title BackGround Color
   * @default #FFFFFF
   */
  "backGroundShelf": string;
}
interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
  text: ColorBG;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 px-4 lg:px-0 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={`text-2xl leading-8 lg:leading-10 
                  ${
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-3xl" : "lg:text-4xl"}

                  `}
                  style={{ color: props.text.backGroundShelf }}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <h2
                  class={`
                  leading-6 lg:leading-8
                  ${
                    props.colorReverse ? "text-primary-content" : "text-neutral"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-xl" : "lg:text-2xl"}

                

                `}
                  style={{ color: props.text.backGroundShelf }}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
