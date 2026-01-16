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
  messageType?: string;
}>`
  max-width: max(70%, 280px);
  padding: ${(props) =>
    props.messageType === 'IMAGE' || props.messageType === 'FILE'
      ? '0'
      : '12px 16px'};
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  opacity: ${(props) => (props.status === 'sending' ? 0.7 : 1)};
  overflow: hidden;

  ${(props) => {
    const { isOwn, position, messageType } = props;

    if (messageType === 'IMAGE' || messageType === 'FILE') {
      return css`
        background-color: ${props.theme.COLORS.BACKGROUND};
        border-radius: 18px;
      `;
    }

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

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FileMessage = styled.div`
  display: flex;
  align-items: center;
  width: 280px;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:last-of-type {
    border: none;
  }
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;

  & svg {
    width: auto;
    height: 20px;
  }
`;

export const FileDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FileNameText = styled.div`
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileSizeText = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 12px;
`;

export const ImageGrid = styled.div<{ count: number }>`
  display: grid;
  gap: 1px;
  width: 280px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};

  ${(props) => {
    const { count } = props;
    if (count === 2) {
      return css`
        grid-template-columns: 1fr 1fr;
      `;
    }
    if (count === 3) {
      return css`
        grid-template-columns: 1fr 1fr;
        & > *:first-of-type {
          grid-column: span 2;
        }
      `;
    }
    if (count === 4) {
      return css`
        grid-template-columns: 1fr 1fr;
      `;
    }
    return css`
      grid-template-columns: repeat(3, 1fr);
    `;
  }}
`;

export const ImageGridItemWrapper = styled.div`
  cursor: pointer;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};

  &:hover {
    opacity: 0.7;
  }
`;

export const ImageGridItem = styled.img`
  width: 100%;
  aspect-ratio: 1;
`;

export const ImageMessage = styled.img`
  display: block;
  width: 280px;
  min-height: 210px;
  cursor: pointer;
  object-fit: cover;

  &:hover {
    opacity: 0.7;
  }
`;
