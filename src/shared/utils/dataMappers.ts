import CATEGORIES from '@/features/category/constants/serviceCategories';
import SKILLS_BY_CATEGORY from '@/shared/constants/skills';

const categoryMap = new Map(
  CATEGORIES.map((category) => [category.id, category.name]),
);

const skillMap = new Map(
  Object.values(SKILLS_BY_CATEGORY)
    .flat()
    .map((skill) => [skill.id as number, skill.name] as const),
);

export const getCategoryNameById = (id: number): string | undefined => {
  return categoryMap.get(id);
};

export const getSkillNameById = (id: number): string | undefined => {
  return skillMap.get(id);
};
