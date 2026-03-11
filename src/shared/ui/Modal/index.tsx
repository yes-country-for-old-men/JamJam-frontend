import React, { useEffect, useMemo, createContext, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import * as S from './Modal.styles';

interface ModalContextValue {
  onClose: () => void;
  disableDismiss: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal sub-components must be used within <Modal>');
  return ctx;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  disableDismiss?: boolean;
  children: React.ReactNode;
}

const ModalRoot: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  disableDismiss = false,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableDismiss) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, disableDismiss]);

  useEffect(() => {
    if (!isOpen) document.body.style.overflow = '';
  }, [isOpen]);

  const contextValue = useMemo(
    () => ({ onClose, disableDismiss }),
    [onClose, disableDismiss],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {createPortal(
        <AnimatePresence>{isOpen && children}</AnimatePresence>,
        document.body,
      )}
    </ModalContext.Provider>
  );
};

const Overlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { onClose, disableDismiss } = useModalContext();
  return (
    <S.Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !disableDismiss) onClose();
      }}
    >
      {children}
    </S.Backdrop>
  );
};

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <S.ModalContainer
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ duration: 0.2 }}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </S.ModalContainer>
);

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <S.ModalHeader>{children}</S.ModalHeader>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <S.ModalTitle>{children}</S.ModalTitle>
);

const CloseButton: React.FC = () => {
  const { onClose } = useModalContext();
  return (
    <S.CloseButton onClick={onClose}>
      <CloseIcon />
    </S.CloseButton>
  );
};

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <S.ModalContent>{children}</S.ModalContent>
);

const Modal = Object.assign(ModalRoot, {
  Overlay,
  Container,
  Header,
  Title,
  CloseButton,
  Content,
});

export default Modal;
