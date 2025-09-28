import React from 'react';
import { type ProfileForm } from '@pages/ProfileEdit/hooks/useProfileForm';
import useSkillSelection from '@pages/ProfileEdit/hooks/useSkillSelection';
import type { Skill } from '@type/Provider';
import * as S from '@pages/ProfileEdit/ProfileEdit.styles';
import CATEGORIES from '@constants/categoryData';
import DeleteIcon from '@assets/icons/cross.svg?react';

interface SkillsSectionProps {
  form: ProfileForm;
}

const Tag: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => (
  <S.TagItem onClick={onClick}>
    {children}
    <DeleteIcon width={8} height={8} />
  </S.TagItem>
);

const SkillsSection: React.FC<SkillsSectionProps> = ({ form }) => {
  const skills = form.watch('skills');

  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    displaySkills,
    clearSearch,
  } = useSkillSelection();

  const handleSkillToggle = (skill: Skill) => {
    const isSelected = skills.some((s) => s.id === skill.id);

    if (isSelected) {
      form.setValue(
        'skills',
        skills.filter((s) => s.id !== skill.id),
      );
    } else if (skills.length < 20) {
      form.setValue('skills', [...skills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: Skill) => {
    form.setValue(
      'skills',
      skills.filter((skill) => skill.id !== skillToRemove.id),
    );
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    clearSearch();
  };

  return (
    <S.Section>
      <S.SectionTitle>보유 기술</S.SectionTitle>
      <S.FormGroup>
        <S.SkillSelectionHeader>
          {skills.length > 0 ? (
            <S.TagContainer>
              {skills.map((skill) => (
                <Tag key={skill.id} onClick={() => handleRemoveSkill(skill)}>
                  {skill.name}
                </Tag>
              ))}
            </S.TagContainer>
          ) : (
            <S.EmptySkillsContainer>
              아래에서 기술을 선택해 보세요. 최대 20개까지 선택할 수 있습니다.
            </S.EmptySkillsContainer>
          )}
        </S.SkillSelectionHeader>
        <S.SkillSelectionContainer>
          <S.CategoryList>
            {CATEGORIES.map((category) => (
              <S.CategoryItem
                key={category.id}
                active={selectedCategory === category.id && !searchTerm.trim()}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </S.CategoryItem>
            ))}
          </S.CategoryList>
          <S.SkillListContainer>
            <S.SkillSearchBox
              placeholder="기술 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <S.SkillList>
              {displaySkills.map((skill) => {
                const isSelected = skills.some((s) => s.id === skill.id);
                return (
                  <S.SkillItem
                    key={skill.id}
                    selected={isSelected}
                    onClick={() => handleSkillToggle(skill)}
                    disabled={!isSelected && skills.length >= 20}
                  >
                    {skill.name}
                  </S.SkillItem>
                );
              })}
              {displaySkills.length === 0 && (
                <S.EmptySkillsContainer>
                  검색 결과가 없습니다.
                </S.EmptySkillsContainer>
              )}
            </S.SkillList>
          </S.SkillListContainer>
        </S.SkillSelectionContainer>
      </S.FormGroup>
    </S.Section>
  );
};

export default SkillsSection;
