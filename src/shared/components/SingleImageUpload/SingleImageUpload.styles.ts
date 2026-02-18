import styled from '@emotion/styled';
import { Z_INDEX } from '@/shared/constants';

export const Container = styled.div`
  position: relative;
`;

export const ImageUploadArea = styled.div<{
  isDragOver: boolean;
  hasImage: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border: none;
  border-radius: 12px;
  text-align: center;
  padding: ${(props) => (props.hasImage ? '0' : '16px')};
  transition: all 0.2s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.MAIN.SECONDARY};
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};

    ${(props) =>
      !props.hasImage &&
      `
      & svg {
        fill: ${props.theme.COLORS.MAIN.PRIMARY};
      }
      & div {
        color: ${props.theme.COLORS.MAIN.PRIMARY};
      }
    `}
  }

  ${(props) =>
    props.isDragOver &&
    !props.hasImage &&
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

export const ImageBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

export const ImageOverlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 6px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  ${ImageUploadArea}:hover & {
    opacity: 1;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-top: 4px;
`;

export const OverlayText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-top: 8px;
`;

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const DeleteButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: ${Z_INDEX.IMAGE_OVERLAY};

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  & svg {
    fill: white;
    width: 10px;
    height: 10px;
  }
`;
