import { signal } from "@preact/signals";


const shippingQuantity = signal(<number | null> 1);

const state = {
    shippingQuantity,
};

export const useShippingQuantity = () => state;
