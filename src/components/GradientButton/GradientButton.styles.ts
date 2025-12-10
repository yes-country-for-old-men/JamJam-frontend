import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ButtonContainer = styled(motion.button)`
  position: relative;
  border-radius: 30px;
  padding: 12px 24px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const BackgroundLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f765ff 0%, #6500ff 50%, #77d0ff 100%);
  border-radius: 30px;
`;

export const InnerLayer = styled(motion.div)`
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: linear-gradient(135deg, #77d0ff 0%, #812fff 48%, #f765ff 100%);
  border-radius: 28px;

  box-shadow:
    inset -10px -10px 20px rgba(67, 0, 177, 0.2),
    inset 10px 10px 20px rgba(255, 255, 255, 0.3),
    inset 0 0 2px rgba(255, 255, 255, 1);
`;

export const ContentLayer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 16px;
  font-weight: 600;
  gap: 4px;
`;
