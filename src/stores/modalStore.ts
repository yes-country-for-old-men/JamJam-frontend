import React from 'react';
import { atom } from 'jotai';

export interface ModalState {
  id: string;
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCloseButton?: boolean;
  disableBackdropClick?: boolean;
}

export const modalAtom = atom<ModalState | null>(null);

export const openModalAtom = atom(
  null,
  (_get, set, modal: Omit<ModalState, 'isOpen'>) => {
    set(modalAtom, { ...modal, isOpen: true });
  },
);

export const closeModalAtom = atom(null, (get, set) => {
  const currentModal = get(modalAtom);
  if (currentModal) {
    set(modalAtom, { ...currentModal, isOpen: false });
    setTimeout(() => {
      set(modalAtom, null);
    }, 200);
  }
});
