import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export interface Video {
  title: string;
  url: string;
}

interface Props {
  videos?: Video[];
}

function VideoTutorials(
  { videos }: Props,
) {
  return (
    <div>
      {videos && videos.length
        ? (
          <div class="min-h-[370px] pt-10">
            {videos.map((v, i) => (
              <div class="collapse collapse-arrow rounded-none border-b border-black">
                <input type="radio" name="my-accordion-2" checked={i === 0} />
                <div class="collapse-title text-base font-bold uppercase">
                  {v.title}
                </div>
                <div class="collapse-content">
                  <iframe
                    class="w-full"
                    width="560"
                    height="315"
                    src={v.url}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  >
                  </iframe>
                </div>
              </div>
            ))}
          </div>
        )
        : <span>Não há vídeos</span>}
    </div>
  );
}

export default VideoTutorials;
