import React, { useEffect } from 'react';
import LoginModal from '@components/Modal/LoginModal';
import useModal from '@hooks/useModal';
import { eventManager } from '@utils';

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
