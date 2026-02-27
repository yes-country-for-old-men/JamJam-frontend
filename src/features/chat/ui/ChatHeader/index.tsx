import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveChatRoom } from '@/entities/chat/api/chatApi';
import * as S from '@/features/chat/ui/ChatHeader/ChatHeader.styles';
import MenuIcon from '@/shared/assets/icons/menu.svg?react';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import { useDialog } from '@/shared/lib/useDialog';
import type { ChatRoom } from '@/entities/chat/model/Chat';

interface ChatHeaderProps {
  selectedChat: ChatRoom;
  onLeaveChatRoom?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedChat,
  onLeaveChatRoom,
}) => {
  const queryClient = useQueryClient();
  const { confirm, alert } = useDialog();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: leave } = useMutation({
    mutationFn: () => leaveChatRoom(selectedChat.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
      onLeaveChatRoom?.();
    },
    onError: async () => {
      await alert({
        title: '오류',
        content: '채팅방 나가기에 실패했습니다.',
      });
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLeaveChatRoom = async () => {
    setIsMenuOpen(false);
    const result = await confirm({
      title: '채팅방 나가기',
      content: '채팅방을 나가시겠습니까? 대화 내용이 모두 삭제됩니다.',
      confirmText: '나가기',
      cancelText: '취소',
    });

    if (result) {
      leave();
    }
  };

  return (
    <S.Container>
      <S.HeaderLeft>
        <S.ProfileWrapper>
          {selectedChat.profileUrl ? (
            <S.ProfileImage src={selectedChat.profileUrl} alt="profile" />
          ) : (
            <UserProfileImageIcon width={36} height={36} />
          )}
        </S.ProfileWrapper>
        <S.ChatTitle>{selectedChat.name}</S.ChatTitle>
      </S.HeaderLeft>
      <S.MenuWrapper ref={menuRef}>
        <S.MenuButton onClick={handleMenuClick}>
          <MenuIcon />
        </S.MenuButton>
        {isMenuOpen && (
          <S.DropdownMenu>
            <S.DropdownItem onClick={handleLeaveChatRoom}>
              채팅방 나가기
            </S.DropdownItem>
          </S.DropdownMenu>
        )}
      </S.MenuWrapper>
    </S.Container>
  );
};

export default ChatHeader;
