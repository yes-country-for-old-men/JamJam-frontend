import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  position: relative;
  flex: 1;
  width: 560px;
  aspect-ratio: 7/4;
  touch-action: pan-x;
`;

export const SlideStack = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const SlideItem = styled(motion.div)`
  position: absolute;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  width: 80%;
  height: 100%;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
