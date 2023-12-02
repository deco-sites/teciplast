import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

interface Props {
  instructions?: AvailableIcons[];
}

const LaundryInstructions = (
  {
    instructions = [
      "max-lav-40",
      "alv-sim",
      "nao-secar-tambor",
      "temp-max-150",
      "umido-pro-m-suave",
    ],
  }: Props,
) => {
  return (
    <div class="flex items-center justify-start gap-1">
      {instructions.map((i) => <Icon id={i} size={24} />)}
    </div>
  );
};

export default LaundryInstructions;
