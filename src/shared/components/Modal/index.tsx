import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import * as S from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  disableBackdropClick?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  disableBackdropClick = false,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableBackdropClick) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (!isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose, disableBackdropClick]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !disableBackdropClick) {
      onClose();
    }
  };

  const hasTitle = Boolean(title);
  const hasHeader = hasTitle || showCloseButton;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <S.Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <S.ModalContainer
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {hasHeader && (
              <S.ModalHeader hasTitle={hasTitle}>
                {hasTitle && <S.ModalTitle>{title}</S.ModalTitle>}
                {showCloseButton && (
                  <S.CloseButton onClick={onClose}>
                    <CloseIcon />
                  </S.CloseButton>
                )}
              </S.ModalHeader>
            )}
            <S.ModalContent hasHeader={hasHeader}>{children}</S.ModalContent>
          </S.ModalContainer>
        </S.Backdrop>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
