import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import useModal from '@hooks/useModal';
import Button from '@components/Button';
import CloseIcon from '@assets/icons/close.svg?react';

const Backdrop = styled(motion.div)`
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
  z-index: 1111;
`;

const ModalContainer = styled(motion.div)`
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

const ModalHeader = styled.div<{ hasTitle: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.hasTitle ? 'space-between' : 'flex-end'};
  padding: 20px 16px 12px 24px;
`;

const ModalTitle = styled.div`
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  margin: 0;
  padding-right: 40px;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: transparent;
  color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  text-align: center;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
    color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  }

  svg {
    stroke: currentColor;
  }
`;

const ModalContent = styled.div<{ hasHeader: boolean }>`
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  padding: ${(props) => (props.hasHeader ? '0 24px 24px 24px' : '24px')};
  white-space: pre-line;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 24px 24px 24px;
  gap: 8px;
`;

const FooterButtonWrapper = styled.div`
  flex: 1;
`;

const Modal: React.FC = () => {
  const { modal, closeModal } = useModal();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !modal?.disableBackdropClick) {
      closeModal();
    }
  };

  const handleClose = () => {
    modal?.onClose?.();
    closeModal();
  };

  const handleConfirm = () => {
    modal?.onConfirm?.();
    closeModal();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal?.isOpen) {
        handleClose();
      }
    };

    if (modal?.isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [modal?.isOpen]);

  const hasTitle = Boolean(modal?.title);
  const showCloseButton = Boolean(modal?.showCloseButton);

  return createPortal(
    <AnimatePresence>
      {modal?.isOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <ModalContainer
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {(hasTitle || showCloseButton) && (
              <ModalHeader hasTitle={hasTitle}>
                {hasTitle && <ModalTitle>{modal.title}</ModalTitle>}
                {showCloseButton && (
                  <CloseButton onClick={handleClose}>
                    <CloseIcon />
                  </CloseButton>
                )}
              </ModalHeader>
            )}
            <ModalContent hasHeader={hasTitle || showCloseButton}>
              {modal.content}
            </ModalContent>
            {(modal.onConfirm || modal.confirmText) && (
              <ModalFooter>
                {modal.cancelText && (
                  <FooterButtonWrapper>
                    <Button variant="secondary" onClick={handleClose} fullWidth>
                      {modal.cancelText}
                    </Button>
                  </FooterButtonWrapper>
                )}
                <FooterButtonWrapper>
                  <Button variant="primary" onClick={handleConfirm} fullWidth>
                    {modal.confirmText || '확인'}
                  </Button>
                </FooterButtonWrapper>
              </ModalFooter>
            )}
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
