import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useScrollSpy from '@hooks/useScrollSpy';
import getCategoryNameById from '@utils/getCategoryNameById';
import type { ProviderProfile } from '@type/Provider';
import Button from '@components/Button';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import LocationIcon from '@assets/icons/location.svg?react';
import CareerIcon from '@assets/icons/career.svg?react';
import LicenseIcon from '@assets/icons/license.svg?react';
import EducationIcon from '@assets/icons/education.svg?react';

const Container = styled.main`
  display: flex;
  width: 1200px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  gap: 36px;
  padding: 0 24px;
  margin: 0 auto;
`;

const MainContent = styled.article`
  width: 880px;
`;

const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
`;

const ProfileImageWrapper = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 84px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 50%;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  overflow: hidden;
  margin: 0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProviderNickname = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const CategoryBadge = styled.span`
  background-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[2]};
  border-radius: 20px;
  color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  gap: 4px;
`;

const SideCard = styled.aside`
  position: sticky;
  top: 80px;
  width: calc(1200px - 880px);
  height: fit-content;
  background-color: white;
  border-radius: 16px;
  padding: 20px;
`;

const SideCardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const StatusInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StatusLabel = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  font-size: 14px;
`;

const StatusValue = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const InquiryButtonWrapper = styled.div`
  margin-top: 24px;
`;

const InfoSection = styled.section`
  margin-bottom: 32px;
`;

const ServiceSection = styled.section``;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const TabContainer = styled.nav`
  position: sticky;
  display: flex;
  top: 80px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  z-index: 1;
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: transparent;
  border-bottom: 2.5px solid
    ${({ theme, active }) =>
      active ? theme.COLORS.JAMJAM_PRIMARY[1] : 'transparent'};
  color: ${({ theme, active }) =>
    active ? theme.COLORS.LABEL_PRIMARY : theme.COLORS.LABEL_SECONDARY};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding: 16px 32px;
`;

const TabContentContainer = styled.div`
  padding: 28px 8px;
`;

const IntroductionText = styled.div`
  line-height: 1.6;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillTag = styled.span`
  background-color: white;
  border: 0.5px solid ${(props) => props.theme.COLORS.GRAY[4]};
  border-radius: 20px;
  font-size: 14px;
  padding: 8px 16px;
`;

const ExperienceList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ExperienceItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 4px;

  &:first-child {
    padding-top: 0;
  }
`;

const ExperienceContent = styled.span``;

const ProfileCard: React.FC<{ data: ProviderProfile }> = ({ data }) => (
  <ProfileSection>
    <ProfileImageWrapper>
      {data.profileUrl ? (
        <ProfileImage src={data.profileUrl} alt="profile" />
      ) : (
        <UserProfileImageIcon width={84} height={84} />
      )}
    </ProfileImageWrapper>
    <ProfileInfo>
      <ProfileHeader>
        <ProviderNickname>{data.nickname}</ProviderNickname>
        <CategoryBadge>{getCategoryNameById(data.categoryId)}</CategoryBadge>
      </ProfileHeader>
      <LocationInfo>
        <LocationIcon />
        {data.location}
      </LocationInfo>
    </ProfileInfo>
  </ProfileSection>
);

const ExpertInfoSection: React.FC<{ data: ProviderProfile }> = ({ data }) => (
  <>
    <InfoSection>
      <SectionTitle>자기 소개</SectionTitle>
      <IntroductionText>{data.introduction}</IntroductionText>
    </InfoSection>
    <InfoSection>
      <SectionTitle>보유 기술</SectionTitle>
      <SkillsContainer>
        {data.skills.map((skill) => (
          <SkillTag key={skill}>{skill}</SkillTag>
        ))}
      </SkillsContainer>
    </InfoSection>
    <InfoSection>
      <SectionTitle>경력 사항</SectionTitle>
      <ExperienceList>
        {data.careers.map((career) => (
          <ExperienceItem key={career}>
            <CareerIcon />
            <ExperienceContent>{career}</ExperienceContent>
          </ExperienceItem>
        ))}
      </ExperienceList>
    </InfoSection>
    <InfoSection>
      <SectionTitle>학력 및 자격증</SectionTitle>
      <ExperienceList>
        {data.educations.map((education) => (
          <ExperienceItem key={`education-${education}`}>
            <EducationIcon />
            <ExperienceContent>{education}</ExperienceContent>
          </ExperienceItem>
        ))}
        {data.licenses.map((license) => (
          <ExperienceItem key={`license-${license}`}>
            <LicenseIcon />
            <ExperienceContent>{license}</ExperienceContent>
          </ExperienceItem>
        ))}
      </ExperienceList>
    </InfoSection>
  </>
);

const ServicesSection: React.FC = () => (
  <ServiceSection>
    <SectionTitle>제공 서비스</SectionTitle>
  </ServiceSection>
);

const SidePanel: React.FC<{ data: ProviderProfile }> = ({ data }) => (
  <SideCard>
    <SideCardTitle>{data.nickname}</SideCardTitle>
    <StatusInfo>
      <StatusLabel>연락 가능 시간</StatusLabel>
      <StatusValue>{data.contactHours}</StatusValue>
    </StatusInfo>
    <StatusInfo>
      <StatusLabel>평균 응답 시간</StatusLabel>
      <StatusValue>{data.averageResponseTime}</StatusValue>
    </StatusInfo>
    <InquiryButtonWrapper>
      <Button fullWidth>문의하기</Button>
    </InquiryButtonWrapper>
  </SideCard>
);

const Provider: React.FC<{ data: ProviderProfile }> = ({ data }) => {
  const expertInfoRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const sectionRefs = [expertInfoRef, servicesRef];

  const activeSection = useScrollSpy(sectionRefs);
  const TABS = ['전문가 정보', '서비스'] as const;
  const activeTab = TABS[activeSection];

  const scrollToSection = (index: number) => {
    const targetRef = sectionRefs[index];
    if (targetRef.current) {
      const yOffset = -140;
      const y =
        targetRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleTabClick = (tabName: (typeof TABS)[number]) => {
    const index = TABS.indexOf(tabName);
    scrollToSection(index);
  };

  return (
    <Container>
      <MainContent>
        <ProfileCard data={data} />
        <TabContainer>
          {TABS.map((tab) => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </TabContainer>
        <TabContentContainer>
          <section ref={expertInfoRef}>
            <ExpertInfoSection data={data} />
          </section>
          <section ref={servicesRef}>
            <ServicesSection />
          </section>
        </TabContentContainer>
      </MainContent>
      <SidePanel data={data} />
    </Container>
  );
};

export default Provider;
