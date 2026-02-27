import styled from '@emotion/styled';

export const Section = styled.div`
  position: relative;
  width: 1360px;
  margin: 0 auto;
  overflow: hidden;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
`;

export const Track = styled.div`
  display: flex;
  gap: 12px;
  will-change: transform;
`;

export const Slide = styled.div`
  flex-shrink: 0;
  width: 480px;
  aspect-ratio: 4/3;
  position: relative;
`;

export const SlideInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  &:hover {
    scale: 1.05;
    transform: translate(-47.5%, -47.5%);
  }
`;

export const GradientLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.COLORS.BACKGROUND} 30%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
`;

export const GradientRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(
    to left,
    ${(props) => props.theme.COLORS.BACKGROUND} 30%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
`;
