import styled from '@emotion/styled';

export const ExistingImagesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
`;

export const ExistingImageItem = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
`;

export const ExistingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 12px;
    height: 12px;
    fill: white;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export {
  Container,
  PageTitle,
  Section,
  Label,
  InvalidMessage,
  NavigationButtonsWrapper,
} from '@/pages/service-register/ServiceRegister.styles';
