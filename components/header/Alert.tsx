import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Timer from "deco-sites/teciplast/components/ui/Timer.tsx";

export interface Props {
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  data?: number;
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


function Alert({  interval = 5, text,textLink,data }: Props) {
  const id = useId();

  return (
  <div class={`w-screen bg-secondary  flex justify-center items-center`}>
    <div id={id} class={`container bg-secondary  text-sm text-secondary-content flex justify-between items-center`}>
      

      <SliderJS rootId={id} interval={interval && interval * 1e3} /> 
      
      {text &&<div class="w-full">{text.map((text) => (<span class={`lg: text-lg  uppercase ${text.bold && "font-bold"} ${text.underline && "underline"} mr-2 `} >{text.text}</span>))}</div>}
      
      {textLink && <div class={`lg: text-lg  w-full ${textLink.bold && "font-bold"} ${textLink.underline && "underline"} `}>{textLink.text}</div>}

      {data && <Timer data={data}/>}
      

    </div>
  </div>
  );
}

export default Alert;
