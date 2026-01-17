import React from 'react';
import { atom } from 'jotai';

export interface ModalState {
  id: string;
  isOpen: boolean;
  type?: 'default' | 'loading' | 'confirm' | 'alert';
  title?: string;
  content?: React.ReactNode;
  loadingText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCloseButton?: boolean;
  disableBackdropClick?: boolean;
}

export const modalStackAtom = atom<ModalState[]>([]);

export const openModalAtom = atom(
  null,
  (get, set, modal: Omit<ModalState, 'isOpen'>) => {
    const stack = get(modalStackAtom);
    const existingModal = stack.find((m) => m.id === modal.id);
    if (existingModal) {
      return;
    }
    set(modalStackAtom, [...stack, { ...modal, isOpen: true }]);
  },
);

export const closeModalAtom = atom(null, (get, set, modalId?: string) => {
  const stack = get(modalStackAtom);

  if (modalId) {
    const targetIndex = stack.findIndex((m) => m.id === modalId);
    if (targetIndex !== -1) {
      const updatedStack = [...stack];
      updatedStack[targetIndex] = {
        ...updatedStack[targetIndex],
        isOpen: false,
      };
      set(modalStackAtom, updatedStack);

      setTimeout(() => {
        const currentStack = get(modalStackAtom);
        set(
          modalStackAtom,
          currentStack.filter((m) => m.id !== modalId),
        );
      }, 200);
    }
  } else if (stack.length > 0) {
    const updatedStack = [...stack];
    const lastIndex = updatedStack.length - 1;
    updatedStack[lastIndex] = { ...updatedStack[lastIndex], isOpen: false };
    set(modalStackAtom, updatedStack);

    setTimeout(() => {
      const currentStack = get(modalStackAtom);
      set(modalStackAtom, currentStack.slice(0, -1));
    }, 200);
  }
});
