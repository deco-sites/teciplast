import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  widthFull?: boolean;
  coloredButtons?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector(
  { onChange, quantity, disabled, loading, widthFull, coloredButtons }: Props,
) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div
      class={`join border border-[#DADADA] rounded-none ${
        !widthFull && "max-w-[140px]"
      } ${widthFull && "justify-between"} w-full`}
    >
      <Button
        class={`btn-square btn-ghost join-item ${
          widthFull ? "h-[40px]" : "max-h-8"
        } ${coloredButtons && "bg-[#ebebeb]"}`}
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        -
      </Button>
      <input
        class={`input text-center join-item [appearance:textfield] ${
          widthFull ? "h-[40px]" : "max-h-8"
        }`}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class={`btn-square btn-ghost join-item ${
          widthFull ? "h-[40px]" : "max-h-8"
        } ${coloredButtons && "bg-[#ebebeb]"}`}
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
