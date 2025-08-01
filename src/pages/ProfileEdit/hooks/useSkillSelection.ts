import { useState, useMemo, useCallback } from 'react';
import type { Skill } from '@type/Provider';
import CATEGORIES from '@constants/categoryData';
import SKILLS_BY_CATEGORY from '@constants/skillData';

const useSkillSelection = (
  skills: Skill[],
  setSkills: (skills: Skill[]) => void,
) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const allSkills = useMemo(() => Object.values(SKILLS_BY_CATEGORY).flat(), []);

  const displaySkills = useMemo(() => {
    if (searchTerm.trim()) {
      return allSkills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    return (
      SKILLS_BY_CATEGORY[selectedCategory as keyof typeof SKILLS_BY_CATEGORY] ||
      []
    );
  }, [searchTerm, selectedCategory, allSkills]);

  const handleSkillToggle = useCallback(
    (skill: Skill) => {
      const isSelected = skills.some((s) => s.id === skill.id);

      if (isSelected) {
        setSkills(skills.filter((s) => s.id !== skill.id));
      } else if (skills.length < 20) {
        setSkills([...skills, skill]);
      }
    },
    [skills, setSkills],
  );

  const handleRemoveSkill = useCallback(
    (skillToRemove: Skill) => {
      setSkills(skills.filter((skill) => skill.id !== skillToRemove.id));
    },
    [skills, setSkills],
  );

  const clearAllSkills = useCallback(() => {
    setSkills([]);
  }, [setSkills]);

  return {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    displaySkills,
    handleSkillToggle,
    handleRemoveSkill,
    clearAllSkills,
  };
};

export default useSkillSelection;
