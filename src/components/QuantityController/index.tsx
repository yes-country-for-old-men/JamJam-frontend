import React from 'react';
import MinusIcon from '@assets/icons/minus.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';
import styled from '@emotion/styled';

const QuantityControllerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 4px;
`;

const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 18px;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 48px;
  height: 32px;
  text-align: center;
  font-size: 14px;
  background: none;
  border: none;

  &:focus {
    outline: none;
  }
`;

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
    <QuantityControllerWrapper>
      <QuantityButton onClick={onDecrease} disabled={quantity <= min}>
        <MinusIcon />
      </QuantityButton>
      <QuantityInput
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <QuantityButton
        onClick={onIncrease}
        disabled={max ? quantity >= max : false}
      >
        <PlusIcon />
      </QuantityButton>
    </QuantityControllerWrapper>
  );
};

export default QuantityController;
