import styled from '@emotion/styled';

export const Container = styled.main`
  display: flex;
  width: 1200px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  gap: 36px;
  padding: 0 24px;
  margin: 0 auto;
`;

export const MainContent = styled.article`
  width: 840px;
`;

export const InfoSection = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const IntroductionText = styled.div`
  line-height: 1.6;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SkillTag = styled.span`
  background-color: white;
  border: 0.5px solid ${(props) => props.theme.COLORS.GRAY[4]};
  border-radius: 20px;
  font-size: 14px;
  padding: 8px 16px;
`;

export const ExperienceList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ExperienceItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 4px;

  &:first-child {
    padding-top: 0;
  }
`;

export const ExperienceContent = styled.span``;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;
