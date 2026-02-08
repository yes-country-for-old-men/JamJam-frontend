import { type ReactNode, useCallback } from 'react';
import { useAtom } from 'jotai';
import { openDialogAtom, closeDialogAtom } from '@/shared/atoms/dialogAtoms';

export const useDialog = () => {
  const [, setOpenDialog] = useAtom(openDialogAtom);
  const [, setCloseDialog] = useAtom(closeDialogAtom);

  const alert = useCallback(
    (config: {
      title: string;
      content: ReactNode;
      confirmText?: string;
    }): Promise<void> => {
      return new Promise((resolve) => {
        const dialogId = `alert-${Date.now()}`;
        setOpenDialog({
          type: 'alert',
          id: dialogId,
          isOpen: true,
          title: config.title,
          content: config.content,
          confirmText: config.confirmText || '확인',
          onConfirm: () => {
            setCloseDialog(dialogId);
            resolve();
          },
          onClose: () => {
            setCloseDialog(dialogId);
            resolve();
          },
        });
      });
    },
    [setOpenDialog, setCloseDialog],
  );

  const confirm = useCallback(
    (config: {
      title: string;
      content: ReactNode;
      confirmText?: string;
      cancelText?: string;
    }): Promise<boolean> => {
      return new Promise((resolve) => {
        const dialogId = `confirm-${Date.now()}`;
        setOpenDialog({
          type: 'confirm',
          id: dialogId,
          isOpen: true,
          title: config.title,
          content: config.content,
          confirmText: config.confirmText || '확인',
          cancelText: config.cancelText || '취소',
          onConfirm: () => {
            setCloseDialog(dialogId);
            resolve(true);
          },
          onClose: () => {
            setCloseDialog(dialogId);
            resolve(false);
          },
        });
      });
    },
    [setOpenDialog, setCloseDialog],
  );

  const loading = useCallback(
    (config: { text?: string } = {}): (() => void) => {
      const dialogId = `loading-${Date.now()}`;
      setOpenDialog({
        type: 'loading',
        id: dialogId,
        isOpen: true,
        text: config.text,
      });
      return () => setCloseDialog(dialogId);
    },
    [setOpenDialog, setCloseDialog],
  );

  return { alert, confirm, loading };
};
