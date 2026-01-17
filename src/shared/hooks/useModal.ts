import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import {
  modalStackAtom,
  openModalAtom,
  closeModalAtom,
  type ModalState,
} from '@/shared/atoms/modalAtoms';

export const useModal = () => {
  const [modalStack] = useAtom(modalStackAtom);
  const [, setOpenModal] = useAtom(openModalAtom);
  const [, setCloseModal] = useAtom(closeModalAtom);

  const openModal = useCallback(
    (modalConfig: Omit<ModalState, 'isOpen'>) => {
      setOpenModal(modalConfig);
    },
    [setOpenModal],
  );

  const closeModal = useCallback(
    (modalId?: string) => {
      setCloseModal(modalId);
    },
    [setCloseModal],
  );

  const confirm = useCallback(
    (config: {
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
    },
    [openModal, closeModal],
  );

  const alert = useCallback(
    (config: {
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
    },
    [openModal, closeModal],
  );

  const loading = useCallback(
    (
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
    },
    [openModal],
  );

  return {
    modalStack,
    openModal,
    closeModal,
    confirm,
    alert,
    loading,
  };
};
