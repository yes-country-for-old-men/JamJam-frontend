import React from 'react';
import MinusIcon from '@/shared/assets/icons/minus.svg?react';
import PlusIcon from '@/shared/assets/icons/plus.svg?react';
import * as S from './QuantityController.styles';

interface QuantityControllerProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantityController: React.FC<QuantityControllerProps> = ({
  quantity,
  onDecrease,
  onIncrease,
  onChange,
  min = 1,
  max = 99,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!Number.isNaN(value)) {
      onChange(value);
    }
  };

  return (
    <S.QuantityControllerWrapper>
      <S.QuantityButton onClick={onDecrease} disabled={quantity <= min}>
        <MinusIcon />
      </S.QuantityButton>
      <S.QuantityInput
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <S.QuantityButton
        onClick={onIncrease}
        disabled={max ? quantity >= max : false}
      >
        <PlusIcon />
      </S.QuantityButton>
    </S.QuantityControllerWrapper>
  );
};

export default QuantityController;
