import type { ReactNode } from 'react';
import { atom } from 'jotai';

export type DialogState =
  | {
      type: 'alert';
      id: string;
      isOpen: boolean;
      title: string;
      content: ReactNode;
      confirmText: string;
      onConfirm: () => void;
      onClose: () => void;
    }
  | {
      type: 'confirm';
      id: string;
      isOpen: boolean;
      title: string;
      content: ReactNode;
      confirmText: string;
      cancelText: string;
      onConfirm: () => void;
      onClose: () => void;
    }
  | {
      type: 'loading';
      id: string;
      isOpen: boolean;
      text?: string;
    };

export const dialogStackAtom = atom<DialogState[]>([]);

export const openDialogAtom = atom(null, (get, set, dialog: DialogState) => {
  const stack = get(dialogStackAtom);
  if (stack.some((d) => d.id === dialog.id)) return;
  set(dialogStackAtom, [...stack, dialog]);
});

export const closeDialogAtom = atom(null, (get, set, dialogId: string) => {
  const stack = get(dialogStackAtom);
  const targetIndex = stack.findIndex((d) => d.id === dialogId);
  if (targetIndex === -1) return;

  const updatedStack = [...stack];
  updatedStack[targetIndex] = { ...updatedStack[targetIndex], isOpen: false };
  set(dialogStackAtom, updatedStack);

  setTimeout(() => {
    const currentStack = get(dialogStackAtom);
    set(
      dialogStackAtom,
      currentStack.filter((d) => d.id !== dialogId),
    );
  }, 200);
});
