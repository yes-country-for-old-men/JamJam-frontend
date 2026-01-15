import { useState, useMemo } from 'react';
import CATEGORIES from '@/features/category/constants/serviceCategories';
import SKILLS_BY_CATEGORY from '@/shared/constants/skills';

const useSkillSelection = () => {
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

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    displaySkills,
    clearSearch,
  };
};

export default useSkillSelection;
