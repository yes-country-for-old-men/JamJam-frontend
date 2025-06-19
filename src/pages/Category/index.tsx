import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import SearchBar from '@components/SearchBar';
import CategoryTabNavigator from '@pages/Category/components/CategoryTabNavigator';
import ServiceCard from '@pages/Category/components/ServiceCard';
import CATEGORIES from '@constants/categoryData';
import { MOCK_SERVICES } from '@constants/mockData';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-width: max-content;
  overflow-x: auto;
  padding: 0;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 560px;
  transform: scale(0.9);
  margin-bottom: 20px;
`;

const CategoryTitle = styled.div`
  width: 100%;
  font-size: 28px;
  font-weight: 700;
  text-align: start;
  margin-bottom: 28px;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px;
`;

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const currentCategoryId = categoryId ? parseInt(categoryId, 10) : null;

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((category) => category.id === currentCategoryId);
  }, [currentCategoryId]);

  const filteredServices = useMemo(() => {
    if (!currentCategoryId) return [];
    return MOCK_SERVICES.filter(
      (service) => service.categoryId === currentCategoryId,
    );
  }, [currentCategoryId]);

  const handleCategoryClick = (newCategoryId: number) => {
    navigate(`/category/${newCategoryId}`);
  };

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>
      <CategoryTabNavigator
        categories={CATEGORIES}
        currentCategoryId={currentCategoryId}
        onCategoryClick={handleCategoryClick}
      />
      <div style={{ maxWidth: 1200, padding: '0 24px' }}>
        {currentCategory && (
          <CategoryTitle>{currentCategory.name}</CategoryTitle>
        )}
        <ServiceGrid>
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              minPrice={service.minPrice}
              thumbnailUrl={service.thumbnailUrl}
              providerName={service.providerName}
            />
          ))}
        </ServiceGrid>
      </div>
    </Container>
  );
};

export default Category;
