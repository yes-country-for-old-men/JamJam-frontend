import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { createPortal } from 'react-dom';
import { getModalZIndex } from '@/shared/config';
import { dialogStackAtom, type DialogState } from '@/shared/model/dialogAtoms';
import Button from '@/shared/ui/Button';
import Spinner from '@/shared/ui/Spinner';
import * as S from './Dialog.styles';

const Dialog: React.FC = () => {
  const [dialogStack] = useAtom(dialogStackAtom);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dialogStack.length > 0) {
        const topDialog = dialogStack[dialogStack.length - 1];
        if (topDialog.type !== 'loading') {
          topDialog.onClose();
        }
      }
    };

    if (dialogStack.length > 0) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dialogStack]);

  const renderDialog = (dialog: DialogState, index: number) => {
    if (!dialog.isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (
        e.target === e.currentTarget &&
        dialog.type !== 'loading' &&
        index === dialogStack.length - 1
      ) {
        dialog.onClose();
      }
    };

    if (dialog.type === 'loading') {
      return (
        <S.Backdrop
          key={dialog.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          zIndex={getModalZIndex(index)}
        >
          <S.LoadingContent>
            <Spinner />
            {dialog.text && (
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
                {dialog.text}
              </S.LoadingText>
            )}
          </S.LoadingContent>
        </S.Backdrop>
      );
    }

    const hasTitle = Boolean(dialog.title);

    return (
      <S.Backdrop
        key={dialog.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
        zIndex={getModalZIndex(index)}
      >
        <S.DialogContainer
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {hasTitle && (
            <S.DialogHeader>
              <S.DialogTitle>{dialog.title}</S.DialogTitle>
            </S.DialogHeader>
          )}
          <S.DialogContent hasHeader={hasTitle}>
            {dialog.content}
          </S.DialogContent>
          <S.DialogFooter>
            {dialog.type === 'confirm' && (
              <S.FooterButtonWrapper>
                <Button variant="secondary" onClick={dialog.onClose} fullWidth>
                  {dialog.cancelText}
                </Button>
              </S.FooterButtonWrapper>
            )}
            <S.FooterButtonWrapper>
              <Button variant="primary" onClick={dialog.onConfirm} fullWidth>
                {dialog.confirmText}
              </Button>
            </S.FooterButtonWrapper>
          </S.DialogFooter>
        </S.DialogContainer>
      </S.Backdrop>
    );
  };

  return createPortal(
    <AnimatePresence>
      {dialogStack.map((dialog, index) => renderDialog(dialog, index))}
    </AnimatePresence>,
    document.body,
  );
};

export default Dialog;
