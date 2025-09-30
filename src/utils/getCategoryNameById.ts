import CATEGORIES from '@constants/serviceCategories';

const getCategoryNameById = (id: number): string | undefined => {
  return CATEGORIES.find((category) => category.id === id)?.name;
};

export default getCategoryNameById;
