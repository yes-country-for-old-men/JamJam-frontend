import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
`;

export const MultipleUploadArea = styled.div<{
  isDragOver: boolean;
  disabled: boolean;
}>`
  background-color: ${(props) =>
    props.isDragOver
      ? props.theme.COLORS.MAIN.SECONDARY
      : props.theme.COLORS.GRAY[6]};
  border: 1px dashed
    ${(props) =>
      props.isDragOver
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.GRAY[4]};
  border-radius: 12px;
  text-align: center;
  padding: 48px;
  transition: all 0.2s ease;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.COLORS.GRAY[6]
        : props.theme.COLORS.MAIN.SECONDARY};
    border-color: ${(props) =>
      props.disabled
        ? props.theme.COLORS.GRAY[4]
        : props.theme.COLORS.MAIN.PRIMARY};

    & svg {
      fill: ${(props) =>
        props.disabled
          ? props.theme.COLORS.LABEL.SECONDARY
          : props.theme.COLORS.MAIN.PRIMARY};
    }
    & div {
      color: ${(props) =>
        props.disabled
          ? props.theme.COLORS.LABEL.SECONDARY
          : props.theme.COLORS.MAIN.PRIMARY};
    }
  }

  ${(props) =>
    props.isDragOver &&
    !props.disabled &&
    `
    & svg {
      fill: ${props.theme.COLORS.MAIN.PRIMARY};
    }
    & div {
      color: ${props.theme.COLORS.MAIN.PRIMARY};
    }
  `}
`;

export const UploadText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-top: 8px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 16px;
`;

export const ImagePreviewItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 12px;
  overflow: hidden;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageRemoveButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  & svg {
    fill: white;
    width: 8px;
    height: 8px;
  }
`;
