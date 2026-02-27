import styled from '@emotion/styled';

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  padding: 16px 24px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

export const ChatTextarea = styled.textarea`
  flex: 1;
  width: 100%;
  max-height: 120px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 20px;
  font-size: 14px;
  padding: 12px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  resize: none;

  &:focus {
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const SendButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  & svg {
    width: auto;
    height: 20px;
    fill: ${({ theme, disabled }) =>
      disabled ? theme.COLORS.GRAY[2] : theme.COLORS.MAIN.PRIMARY};
  }
`;

export const FilePreviewContainer = styled.div`
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[6]};
`;

export const FilePreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const FileCount = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const ClearAllButton = styled.button`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.RED};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FilePreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

export const FilePreviewItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${(props) => props.theme.COLORS.BACKGROUND};
  border-radius: 8px;
`;

export const FilePreviewImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
`;

export const FilePreviewIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  & svg {
    width: auto;
    height: 32px;
  }
`;

export const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FileName = styled.div`
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileSize = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-top: 2px;
`;

export const RemoveFileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  &:hover {
    opacity: 0.7;
  }

  & svg {
    width: auto;
    height: 8px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AttachButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 8px;

  & svg {
    width: auto;
    height: 20px;
    fill: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  }

  &:hover {
    opacity: ${(props) => (props.disabled ? 0.5 : 0.7)};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
