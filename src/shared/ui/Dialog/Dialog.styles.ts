import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Backdrop = styled(motion.div)<{ zIndex: number }>`
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
  z-index: ${(props) => props.zIndex};
`;

export const DialogContainer = styled(motion.div)`
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

export const DialogHeader = styled.div`
  padding: 20px 16px 12px 24px;
`;

export const DialogTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const DialogContent = styled.div<{ hasHeader: boolean }>`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  padding: ${(props) => (props.hasHeader ? '0 24px 24px 24px' : '24px')};
  white-space: pre-line;
`;

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 24px 24px 24px;
  gap: 8px;
`;

export const FooterButtonWrapper = styled.div`
  flex: 1;
`;

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const LoadingText = styled(motion.div)`
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;
