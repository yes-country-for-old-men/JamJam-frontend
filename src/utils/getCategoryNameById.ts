import CATEGORIES from '@constants/categoryData';

const getCategoryNameById = (id: number): string | undefined => {
  return CATEGORIES.find((category) => category.id === id)?.name;
};

export default getCategoryNameById;
