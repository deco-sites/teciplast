import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="join border border-[#DADADA] rounded-none max-w-[140px] w-full ">
      <Button
        class="btn-square btn-ghost join-item max-h-8 border-[#DADADA]"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        -
      </Button>
      <input
        class="input text-center join-item [appearance:textfield] max-h-8"
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
        class="btn-square btn-ghost join-item  max-h-8 border-[#DADADA]"
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
