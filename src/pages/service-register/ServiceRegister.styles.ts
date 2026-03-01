import styled from '@emotion/styled';
import { Z_INDEX } from '@/shared/config';

export const Container = styled.article`
  width: 840px;
`;

export const PageTitle = styled.div`
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 700;
`;

export const SubTitle = styled.div`
  margin-bottom: 20px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
  font-weight: 500;
`;

export const Section = styled.section`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const InvalidMessage = styled.div`
  color: ${(props) => props.theme.COLORS.RED};
  font-size: 12px;
  margin: 4px 0 0 4px;
`;

export const GuideContainer = styled.div`
  border-left: 3px solid ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  padding-left: 16px;
  margin-bottom: 24px;
`;

export const GuideContent = styled.ul`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
`;

export const GuideHeader = styled.div`
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-size: 15px;
  margin-bottom: 8px;
`;

export const GuideItem = styled.li`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  &:before {
    content: '•';
    margin-right: 8px;
  }
`;

export const DescriptionTextArea = styled.textarea`
  width: 100%;
  min-height: 240px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  padding: 16px;
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.GRAY[5]};
  resize: none;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const CharacterCounter = styled.div`
  text-align: right;
  font-size: 13px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin: 4px 4px 0 0;
`;

export const MessageAndCounterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

export const SkipButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  background-color: white;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  transition: all 0.2s ease;
`;

export const NavigationButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const RecommendationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

export const RecommendationChip = styled.button`
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 20px;
  font-size: 14px;
  padding: 8px 16px;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => props.theme.COLORS.MAIN.SECONDARY};
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;

export const ThumbnailTabBar = styled.div`
  display: flex;
  width: 280px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  margin-bottom: 12px;
`;

export const ThumbnailTab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? 600 : 400)};
  color: ${(props) =>
    props.active
      ? props.theme.COLORS.MAIN.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  border-bottom: 2px solid
    ${(props) =>
      props.active ? props.theme.COLORS.MAIN.PRIMARY : 'transparent'};
`;

export const ThumbnailUploadBox = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
`;

export const ThumbnailAIBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 280px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 12px;
  overflow: hidden;
`;

export const ThumbnailGeneratedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ThumbnailLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  z-index: ${Z_INDEX.BASE};
  gap: 12px;
`;

export const ThumbnailLoadingText = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;
