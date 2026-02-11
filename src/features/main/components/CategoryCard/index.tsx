import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './CategoryCard.styles';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: React.ReactNode;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  icon,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${id}`);
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.IconWrapper>{icon}</S.IconWrapper>
      <S.CategoryTitle>{name}</S.CategoryTitle>
    </S.Container>
  );
};

export default CategoryCard;
