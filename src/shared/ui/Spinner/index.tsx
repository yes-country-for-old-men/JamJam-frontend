import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div<{ size?: number }>`
  position: relative;
  display: block;
  height: 56px;
  width: 56px;
  background: conic-gradient(
    from 90deg at 50% 50%,
    transparent 0deg,
    ${(props) => props.theme.COLORS.MAIN.PRIMARY} 360deg
  );
  border-radius: 50%;
  animation: ${rotateAnimation} 1s infinite linear;
  mask: radial-gradient(circle at center, transparent 20px, black 20px);

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    border-radius: 8px;
  }
`;

export default Spinner;
