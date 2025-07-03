import SKILLS_BY_CATEGORY from '@constants/skillData';

const getSkillNameById = (id: number): string | undefined => {
  const allSkills = Object.values(SKILLS_BY_CATEGORY).flat();
  return allSkills.find((skill) => skill.id === id)?.name;
};

export default getSkillNameById;
