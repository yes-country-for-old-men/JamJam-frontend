import React from 'react';
import {
  modalAtom,
  openModalAtom,
  closeModalAtom,
  type ModalState,
} from '@stores/modalStore';
import { useAtom } from 'jotai';

const useModal = () => {
  const [modal] = useAtom(modalAtom);
  const [, setOpenModal] = useAtom(openModalAtom);
  const [, setCloseModal] = useAtom(closeModalAtom);

  const openModal = (modalConfig: Omit<ModalState, 'isOpen'>) => {
    setOpenModal(modalConfig);
  };

  const closeModal = () => {
    setCloseModal();
  };

  const confirm = (config: {
    title: string;
    content: React.ReactNode;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => {
    openModal({
      id: 'confirm-modal',
      type: 'confirm',
      title: config.title,
      content: config.content,
      onConfirm: config.onConfirm,
      confirmText: config.confirmText || '확인',
      cancelText: config.cancelText || '취소',
      showCloseButton: false,
    });
  };

  const alert = (config: {
    title: string;
    content: React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
  }) => {
    openModal({
      id: 'alert-modal',
      type: 'alert',
      title: config.title,
      content: config.content,
      onConfirm: config.onConfirm,
      confirmText: config.confirmText || '확인',
      showCloseButton: false,
    });
  };

  const loading = (
    config: {
      loadingText?: string;
      disableBackdropClick?: boolean;
    } = {},
  ) => {
    openModal({
      id: 'loading-modal',
      type: 'loading',
      loadingText: config.loadingText,
      showCloseButton: false,
      disableBackdropClick: config.disableBackdropClick,
    });
  };

  return {
    modal,
    openModal,
    closeModal,
    confirm,
    alert,
    loading,
    isOpen: modal?.isOpen ?? false,
  };
};

export default useModal;
