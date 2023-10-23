import { useEffect } from "https://esm.sh/v128/preact@10.15.1/hooks/src/index.js";
import { useState } from "preact/compat";


export interface Props {
  data:   number;
}



function Timer({ data }: Props) {
  {/**
  const [totalTime, SetTotalTime] =useState(15*60)

  const minutes = Math.floor(totalTime / 60)

  const seconds = totalTime % 60
  
  useEffect(()=>{
      SetTotalTime(totalTime -  1)

  },[totalTime])*/}

  return (
    <div class="gap-1 lg:gap-5 py-[2px] flex flex-row items-center justify-end lg:w-full"  >
      <span class="hidden lg:flex"> Acaba em :</span>
      <div class="flex lg:flex-col text-end justify-end items-center"> 
        <span class="text-sm lg:text-2xl font-bold mr-1 lg:mr-0">14</span>
        <span class="text-sm lg:text-xs" >Dias</span> 
      </div>
    
      <div class="flex lg:flex-col text-end justify-end items-center">
        <span class="text-sm lg:text-2xl font-bold mr-1 lg:mr-0">14</span>
        <span class="text-sm lg:text-xs">horas</span>
      </div>

    
      <div class="flex  lg:flex-col text-end justify-end items-center">
        <span class="text-sm lg:text-2xl font-bold mr-1 lg:mr-0">14</span>
        <span class="text-sm lg:text-xs">segundos</span>
      </div>
    </div>
  );
}

export default Timer;
