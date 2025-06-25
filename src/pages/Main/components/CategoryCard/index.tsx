import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import theme from '@styles/theme';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: React.ReactNode;
  className?: string;
}

const ANIMATION_VARIANTS = {
  container: {
    rest: {
      scale: 1,
      borderColor: theme.COLORS.GRAY[5],
    },
    hover: {
      scale: 1.05,
      borderColor: theme.COLORS.JAMJAM_PRIMARY[1],
    },
    tap: {
      scale: 0.95,
    },
  },
} as const;

const Container = styled(motion.div)`
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
    <Container
      className={className}
      variants={ANIMATION_VARIANTS.container}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      transition={{ type: 'tween', duration: 0.2 }}
    >
      <IconWrapper>{icon}</IconWrapper>
      <CategoryTitle>{name}</CategoryTitle>
    </Container>
  );
};

export default CategoryCard;
