import { useCallback, useEffect, useRef, useState } from "preact/hooks";

const MultiRangeSlider = (
  { min, max, onChange, currentMin = min, currentMax = max }: {
    min: number;
    max: number;
    onChange: (props: { min: number; max: number }) => void;
    currentMin: number;
    currentMax: number;
  },
) => {
  const [minVal, setMinVal] = useState(currentMin);
  const [maxVal, setMaxVal] = useState(currentMax);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div class="container-slideri">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.currentTarget.value, maxVal - 1);
          setMinVal(value);
          event.currentTarget.value = value.toString();
        }}
        class={`thumb_ thumb--zindex-3 ${
          (minVal > max - 100) && "thumb--zindex-5"
        }`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.currentTarget.value, minVal + 1);
          setMaxVal(value);
          event.currentTarget.value = value.toString();
        }}
        class="thumb_ thumb--zindex-4"
      />

      <div class="slider_">
        <div class="slider__track" />
        <div ref={range} class="slider__range" />
        <div class="slider__left-value">{"R$ " + minVal + ",00"}</div>
        <div class="slider__right-value">{"R$ " + maxVal + ",00"}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
