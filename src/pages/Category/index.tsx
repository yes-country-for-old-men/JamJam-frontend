import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import SearchBar from '@components/SearchBar';
import CategoryTabNavigator from '@pages/Category/components/CategoryTabNavigator';
import ServiceCard from '@components/ServiceCard';
import CATEGORIES from '@constants/categoryData';
import { MOCK_SERVICES } from '@constants/mockData';

const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-width: max-content;
  overflow-x: auto;
`;

const SearchSection = styled.section`
  width: 100%;
  max-width: 560px;
  transform: scale(0.9);
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  padding: 0 24px;
  width: 100%;
`;

const CategoryHeader = styled.header`
  width: 100%;
  margin-bottom: 28px;
`;

const CategoryTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  text-align: start;
`;

const ServicesSection = styled.section``;

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
      <SearchSection>
        <SearchBar />
      </SearchSection>
      <CategoryTabNavigator
        categories={CATEGORIES}
        currentCategoryId={currentCategoryId}
        onCategoryClick={handleCategoryClick}
      />
      <ContentWrapper>
        {currentCategory && (
          <CategoryHeader>
            <CategoryTitle>{currentCategory.name}</CategoryTitle>
          </CategoryHeader>
        )}
        <ServicesSection>
          <ServiceGrid>
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                minPrice={service.minPrice}
                thumbnailUrl={service.thumbnailUrl}
                providerName={service.providerName}
              />
            ))}
          </ServiceGrid>
        </ServicesSection>
      </ContentWrapper>
    </Container>
  );
};

export default Category;
