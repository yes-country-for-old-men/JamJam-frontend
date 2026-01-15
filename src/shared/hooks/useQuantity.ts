import { useState } from 'react';

interface UseQuantityOptions {
  initialQuantity?: number;
  min?: number;
  max?: number;
}

const useQuantity = (options: UseQuantityOptions = {}) => {
  const { initialQuantity = 1, min = 1, max } = options;
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= min && (!max || newQuantity <= max)) {
      setQuantity(newQuantity);
    }
  };

  const increment = () => {
    if (!max || quantity < max) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      setQuantity((prev) => prev - 1);
    }
  };

  const reset = () => {
    setQuantity(initialQuantity);
  };

  return {
    quantity,
    handleQuantityChange,
    increment,
    decrement,
    reset,
  };
};

export default useQuantity;
