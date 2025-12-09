import React, { useRef } from 'react';
import SendIcon from '@assets/icons/send.svg?react';
import * as S from '@pages/Chat/components/ChatInput/ChatInput.styles';
import theme from '@styles/theme';

interface ChatInputProps {
  messageText: string;
  isConnected: boolean;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  messageText,
  isConnected,
  onMessageChange,
  onSendMessage,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(e.target.value);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  return (
    <S.Container>
      <S.InputWrapper>
        <S.ChatTextarea
          ref={inputRef}
          placeholder="메시지를 입력하세요."
          value={messageText}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          rows={1}
          disabled={!isConnected}
        />
      </S.InputWrapper>
      <S.SendButton
        onClick={onSendMessage}
        disabled={!messageText.trim() || !isConnected}
      >
        <SendIcon
          fill={
            messageText.trim() && isConnected
              ? theme.COLORS.JAMJAM_PRIMARY[1]
              : theme.COLORS.GRAY[2]
          }
        />
      </S.SendButton>
    </S.Container>
  );
};

export default ChatInput;
