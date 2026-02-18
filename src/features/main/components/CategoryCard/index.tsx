import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './CategoryCard.styles';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${id}`);
  };

  return (
    <S.Container onClick={handleClick}>
      <S.IconWrapper>{icon}</S.IconWrapper>
      <S.CategoryName>{name}</S.CategoryName>
    </S.Container>
  );
};

export default CategoryCard;
