import React, { useEffect, useState } from 'react';
import LoginModal from '@/features/auth/ui/LoginModal';
import { useDialog } from '@/shared/hooks/useDialog';
import { eventManager } from '@/shared/utils';

const EventHandler = () => {
  const { confirm, alert } = useDialog();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleOpenLoginModal = () => {
      setLoginOpen(true);
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
  }, [confirm, alert]);

  return <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />;
};

export default EventHandler;
