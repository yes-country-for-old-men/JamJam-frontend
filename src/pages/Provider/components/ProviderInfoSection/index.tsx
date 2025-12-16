import React from 'react';
import { type ProviderDetailContent } from '@apis/provider';
import CareerIcon from '@assets/icons/career.svg?react';
import EducationIcon from '@assets/icons/education.svg?react';
import LicenseIcon from '@assets/icons/license.svg?react';
import * as S from '@pages/Provider/Provider.styles';
import { getSkillNameById } from '@utils';

interface ProviderInfoSectionProps {
  data: ProviderDetailContent;
}

const formatEducation = (education: {
  school: string;
  major: string;
  degree: string;
}): string => {
  return `${education.school} ${education.major} ${education.degree}`;
};

const formatCareer = (career: {
  company: string;
  position: string;
}): string => {
  return `${career.company} ${career.position}`;
};

const ProviderInfoSection: React.FC<ProviderInfoSectionProps> = ({ data }) => (
  <>
    <S.InfoSection>
      <S.SectionTitle>자기 소개</S.SectionTitle>
      <S.IntroductionText>{data.introduction}</S.IntroductionText>
    </S.InfoSection>
    <S.InfoSection>
      <S.SectionTitle>보유 기술</S.SectionTitle>
      <S.SkillsContainer>
        {data.skills.map((skill) => (
          <S.SkillTag key={skill.id}>{getSkillNameById(skill.id)}</S.SkillTag>
        ))}
      </S.SkillsContainer>
    </S.InfoSection>
    <S.InfoSection>
      <S.SectionTitle>경력 사항</S.SectionTitle>
      <S.ExperienceList>
        {data.careers.map((career) => (
          <S.ExperienceItem key={career.id}>
            <CareerIcon />
            <S.ExperienceContent>{formatCareer(career)}</S.ExperienceContent>
          </S.ExperienceItem>
        ))}
      </S.ExperienceList>
    </S.InfoSection>
    <S.InfoSection>
      <S.SectionTitle>학력 및 자격증</S.SectionTitle>
      <S.ExperienceList>
        {data.educations.map((education) => (
          <S.ExperienceItem key={education.id}>
            <EducationIcon />
            <S.ExperienceContent>
              {formatEducation(education)}
            </S.ExperienceContent>
          </S.ExperienceItem>
        ))}
        {data.licenses.map((license) => (
          <S.ExperienceItem key={license.id}>
            <LicenseIcon />
            <S.ExperienceContent>{license.name}</S.ExperienceContent>
          </S.ExperienceItem>
        ))}
      </S.ExperienceList>
    </S.InfoSection>
  </>
);

export default ProviderInfoSection;
