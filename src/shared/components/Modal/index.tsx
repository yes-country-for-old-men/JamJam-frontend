import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import Button from '@/shared/components/Button';
import Spinner from '@/shared/components/Spinner';
import { getModalZIndex } from '@/shared/constants';
import { useModal } from '@/shared/hooks/useModal';
import * as S from './Modal.styles';

const Modal: React.FC = () => {
  const { modalStack, closeModal } = useModal();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalStack.length > 0) {
        const topModal = modalStack[modalStack.length - 1];
        if (!topModal.disableBackdropClick) {
          topModal.onClose?.();
          closeModal(topModal.id);
        }
      }
    };

    if (modalStack.length > 0) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalStack, closeModal]);

  return createPortal(
    <AnimatePresence>
      {modalStack.map((modal, index) => {
        const handleBackdropClick = (e: React.MouseEvent) => {
          if (
            e.target === e.currentTarget &&
            !modal.disableBackdropClick &&
            index === modalStack.length - 1
          ) {
            modal.onClose?.();
            closeModal(modal.id);
          }
        };

        const handleClose = () => {
          modal.onClose?.();
          closeModal(modal.id);
        };

        const handleConfirm = () => {
          modal.onConfirm?.();
          closeModal(modal.id);
        };

        const hasTitle = Boolean(modal.title);
        const showCloseButton = Boolean(modal.showCloseButton);

        const renderContent = () => {
          if (modal.loadingText !== undefined) {
            return (
              <S.LoadingContent>
                <Spinner />
                {modal.loadingText && (
                  <S.LoadingText
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: [1, 0.5, 1],
                      y: 0,
                    }}
                    transition={{
                      opacity: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      y: {
                        duration: 0.3,
                        ease: 'easeOut',
                      },
                    }}
                  >
                    {modal.loadingText}
                  </S.LoadingText>
                )}
              </S.LoadingContent>
            );
          }
          return modal.content;
        };

        const isLoadingModal = modal.loadingText !== undefined;

        return modal.isOpen ? (
          <S.Backdrop
            key={modal.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            zIndex={getModalZIndex(index)}
          >
            {isLoadingModal ? (
              renderContent()
            ) : (
              <S.ModalContainer
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(hasTitle || showCloseButton) && (
                  <S.ModalHeader hasTitle={hasTitle}>
                    {hasTitle && <S.ModalTitle>{modal.title}</S.ModalTitle>}
                    {showCloseButton && (
                      <S.CloseButton onClick={handleClose}>
                        <CloseIcon />
                      </S.CloseButton>
                    )}
                  </S.ModalHeader>
                )}
                <S.ModalContent hasHeader={hasTitle || showCloseButton}>
                  {renderContent()}
                </S.ModalContent>
                {(modal.onConfirm || modal.confirmText) && (
                  <S.ModalFooter>
                    {modal.cancelText && (
                      <S.FooterButtonWrapper>
                        <Button
                          variant="secondary"
                          onClick={handleClose}
                          fullWidth
                        >
                          {modal.cancelText}
                        </Button>
                      </S.FooterButtonWrapper>
                    )}
                    <S.FooterButtonWrapper>
                      <Button
                        variant="primary"
                        onClick={handleConfirm}
                        fullWidth
                      >
                        {modal.confirmText || '확인'}
                      </Button>
                    </S.FooterButtonWrapper>
                  </S.ModalFooter>
                )}
              </S.ModalContainer>
            )}
          </S.Backdrop>
        ) : null;
      })}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
