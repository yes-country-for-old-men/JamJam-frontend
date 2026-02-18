import styled from '@emotion/styled';

export const Container = styled.div`
  margin-top: 12px;
`;

export const FileUploadArea = styled.div<{ isDragOver: boolean }>`
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border: 1px dashed
    ${(props) =>
      props.isDragOver
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.GRAY[4]};
  border-radius: 12px;
  text-align: center;
  transition: all 0.2s ease;
  padding: 48px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.MAIN.SECONDARY};
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};

    & svg {
      fill: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    }
    & div {
      color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    }
  }

  ${(props) =>
    props.isDragOver &&
    `
    background-color: ${props.theme.COLORS.MAIN.SECONDARY};

    & svg {
      fill: ${props.theme.COLORS.MAIN.PRIMARY};
    }
    & div {
      color: ${props.theme.COLORS.MAIN.PRIMARY};
    }
  `}
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileUploadText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-top: 4px;
`;

export const FileList = styled.div`
  margin-top: 12px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 6px;
  font-size: 14px;
  padding: 8px 12px;
  margin-bottom: 4px;
`;

export const FileName = styled.span`
  flex: 1;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileRemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  padding: 2px;

  &:hover {
    color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  }
`;
