import React from 'react';
import {
  modalStackAtom,
  openModalAtom,
  closeModalAtom,
  type ModalState,
} from '@atoms/modalAtoms';
import { useAtom } from 'jotai';

const useModal = () => {
  const [modalStack] = useAtom(modalStackAtom);
  const [, setOpenModal] = useAtom(openModalAtom);
  const [, setCloseModal] = useAtom(closeModalAtom);

  const openModal = (modalConfig: Omit<ModalState, 'isOpen'>) => {
    setOpenModal(modalConfig);
  };

  const closeModal = (modalId?: string) => {
    setCloseModal(modalId);
  };

  const confirm = (config: {
    title: string;
    content: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      const modalId = `confirm-modal-${Date.now()}`;
      openModal({
        id: modalId,
        type: 'confirm',
        title: config.title,
        content: config.content,
        confirmText: config.confirmText || '확인',
        cancelText: config.cancelText || '취소',
        showCloseButton: false,
        onConfirm: () => {
          closeModal(modalId);
          resolve(true);
        },
        onClose: () => {
          closeModal(modalId);
          resolve(false);
        },
      });
    });
  };

  const alert = (config: {
    title: string;
    content: React.ReactNode;
    confirmText?: string;
  }): Promise<void> => {
    return new Promise((resolve) => {
      const modalId = `alert-modal-${Date.now()}`;
      openModal({
        id: modalId,
        type: 'alert',
        title: config.title,
        content: config.content,
        confirmText: config.confirmText || '확인',
        showCloseButton: false,
        onConfirm: () => {
          closeModal(modalId);
          resolve();
        },
        onClose: () => {
          closeModal(modalId);
          resolve();
        },
      });
    });
  };

  const loading = (
    config: {
      loadingText?: string;
      disableBackdropClick?: boolean;
    } = {},
  ) => {
    const modalId = `loading-modal-${Date.now()}`;
    openModal({
      id: modalId,
      type: 'loading',
      loadingText: config.loadingText,
      showCloseButton: false,
      disableBackdropClick: config.disableBackdropClick,
    });
    return modalId;
  };

  return {
    modalStack,
    openModal,
    closeModal,
    confirm,
    alert,
    loading,
  };
};

export default useModal;
