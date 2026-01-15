import React, { useEffect } from 'react';
import LoginModal from '@/features/auth/components/LoginModal';
import useModal from '@/shared/hooks/useModal';
import { eventManager } from '@/shared/utils';

const EventHandler = () => {
  const { openModal, confirm, alert } = useModal();

  useEffect(() => {
    const handleOpenLoginModal = () => {
      openModal({
        id: 'login-modal',
        content: <LoginModal />,
      });
    };

    const handleConfirm = (data: {
      title: string;
      content: React.ReactNode;
      onConfirm: () => void;
      confirmText?: string;
      cancelText?: string;
    }) => {
      confirm(data);
    };

    const handleAlert = (data: {
      title: string;
      content: React.ReactNode;
      confirmText?: string;
    }) => {
      alert(data);
    };

    eventManager.on('openLoginModal', handleOpenLoginModal);
    eventManager.on('confirm', handleConfirm);
    eventManager.on('alert', handleAlert);

    return () => {
      eventManager.off('openLoginModal', handleOpenLoginModal);
      eventManager.off('confirm', handleConfirm);
      eventManager.off('alert', handleAlert);
    };
  }, [openModal, confirm, alert]);

  return null;
};

export default EventHandler;
