import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  padding: 0 24px;
  overflow-y: auto;
`;

export const MessageGroup = styled.div<{ isOwn: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
`;

export const MessageRow = styled.div<{ isOwn: boolean }>`
  display: flex;
  align-items: flex-end;
  width: 100%;
  ${(props) => props.isOwn && 'justify-content: flex-end;'}
`;

export const SenderProfileContainer = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  font-size: 12px;
  align-self: flex-start;
  margin-right: 8px;
  overflow: hidden;
`;

export const SenderProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const MessageBubble = styled.div<{
  isOwn: boolean;
  status?: string;
  position: 'single' | 'first' | 'middle' | 'last';
}>`
  max-width: 70%;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 12px 16px;
  opacity: ${(props) => (props.status === 'sending' ? 0.7 : 1)};

  ${(props) => {
    const { isOwn, position } = props;
    const baseRadius = '18px';
    const tightRadius = '4px';

    let borderRadius = '';

    if (position === 'single') {
      borderRadius = baseRadius;
    } else if (position === 'first') {
      borderRadius = isOwn
        ? `${baseRadius} ${baseRadius} ${tightRadius} ${baseRadius}`
        : `${baseRadius} ${baseRadius} ${baseRadius} ${tightRadius}`;
    } else if (position === 'middle') {
      borderRadius = isOwn
        ? `${baseRadius} ${tightRadius} ${tightRadius} ${baseRadius}`
        : `${tightRadius} ${baseRadius} ${baseRadius} ${tightRadius}`;
    } else if (position === 'last') {
      borderRadius = isOwn
        ? `${baseRadius} ${tightRadius} ${baseRadius} ${baseRadius}`
        : `${tightRadius} ${baseRadius} ${baseRadius} ${baseRadius}`;
    }

    return css`
      border-radius: ${borderRadius};
      background-color: ${isOwn
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.GRAY[6]};
      color: ${isOwn ? 'white' : props.theme.COLORS.LABEL.PRIMARY};
    `;
  }}
`;

export const MessageTimestamp = styled.time<{ isOwn: boolean }>`
  flex-shrink: 0;
  align-self: flex-end;
  font-size: 11px;
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  ${(props) => (props.isOwn ? 'margin-right: 4px;' : 'margin-left: 4px;')}
  white-space: nowrap;
`;

export const MessageDateDivider = styled.div`
  text-align: center;
  margin: 16px 0;
`;

export const MessageDateBadge = styled.time`
  border-radius: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 12px;
`;
