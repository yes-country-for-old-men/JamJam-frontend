import React from 'react';
import { useAtom } from 'jotai';
import {
  modalAtom,
  openModalAtom,
  closeModalAtom,
  type ModalState,
} from '@stores/modalStore';

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
    confirmText?: string;
  }) => {
    openModal({
      id: 'alert-modal',
      title: config.title,
      content: config.content,
      confirmText: config.confirmText || '확인',
      showCloseButton: false,
    });
  };

  return {
    modal,
    openModal,
    closeModal,
    confirm,
    alert,
    isOpen: modal?.isOpen ?? false,
  };
};

export default useModal;
