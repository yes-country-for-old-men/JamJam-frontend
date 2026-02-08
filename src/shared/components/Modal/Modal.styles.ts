import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Backdrop = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;
`;

export const ModalContainer = styled(motion.div)`
  position: relative;
  width: 80dvw;
  max-width: 360px;
  background-color: white;
  border-radius: 16px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

export const ModalHeader = styled.div<{ hasTitle: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.hasTitle ? 'space-between' : 'flex-end'};
  padding: 20px 16px 12px 24px;
`;

export const ModalTitle = styled.div`
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  padding-right: 40px;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  text-align: center;
  border-radius: 8px;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
    color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  }

  svg {
    stroke: currentColor;
  }
`;

export const ModalContent = styled.div<{ hasHeader: boolean }>`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  padding: ${(props) => (props.hasHeader ? '0 24px 24px 24px' : '24px')};
  white-space: pre-line;
`;
