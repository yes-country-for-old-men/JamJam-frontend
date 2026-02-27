import styled from '@emotion/styled';

export const QuantityControllerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 4px;
`;

export const QuantityButton = styled.button`
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

export const QuantityInput = styled.input`
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
