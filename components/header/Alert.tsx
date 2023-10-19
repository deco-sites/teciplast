import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  timer?: number;
  text?: Text[];
  textLink?: TextLink;

}
interface TextLink{
  href: string;
  text: string;
  bold: boolean;
  underline: boolean;
  
}

interface Text{
  text: string;
  bold: boolean;
  underline: boolean;
  
}


function Alert({  interval = 5, text,textLink,timer }: Props) {
  const id = useId();

  return (
    <div id={id} class={`w-screen bg-secondary gap-6 text-sm text-secondary-content flex justify-between items-center  h-[40px]`}>
      

      <SliderJS rootId={id} interval={interval && interval * 1e3} /> 
      {text &&<div>{text.map((text) => (<span class={`lg: text-lg  uppercase ${text.bold && "font-bold"} ${text.underline && "underline"} mr-2 `} >{text.text}</span>))}</div>}
      {textLink && <div class={`lg: text-lg  ${textLink.bold && "font-bold"} ${textLink.underline && "underline"} `}>{textLink.text}</div>}
      <div></div>

    </div>
  );
}

export default Alert;
