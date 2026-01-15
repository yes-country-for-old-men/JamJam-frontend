import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: React.ReactNode;
  className?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 10px;
  cursor: pointer;
  gap: 12px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.06));
  }
`;

const CategoryTitle = styled.span`
  text-align: center;
  font-weight: 600;
  line-height: 1.4;
  word-break: keep-all;
`;

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
    <Container className={className} onClick={handleClick}>
      <IconWrapper>{icon}</IconWrapper>
      <CategoryTitle>{name}</CategoryTitle>
    </Container>
  );
};

export default CategoryCard;
