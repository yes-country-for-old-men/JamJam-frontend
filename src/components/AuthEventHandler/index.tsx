import { useEffect } from 'react';
import useModal from '@hooks/useModal';
import eventManager from '@utils/eventManager';
import LoginModal from '@components/Modal/LoginModal';

const AuthEventHandler = () => {
  const { openModal } = useModal();

  useEffect(() => {
    const handleOpenLoginModal = () => {
      openModal({
        id: 'login-modal',
        content: <LoginModal />,
      });
    };

    eventManager.on('openLoginModal', handleOpenLoginModal);

    return () => {
      eventManager.off('openLoginModal', handleOpenLoginModal);
    };
  }, [openModal]);

  return null;
};

export default AuthEventHandler;
