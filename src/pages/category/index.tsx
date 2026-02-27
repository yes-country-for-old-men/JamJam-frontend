import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useServiceListQuery } from '@/features/category/hooks/queries/useServiceListQuery';
import { useCategory } from '@/features/category/hooks/useCategory';
import * as S from '@/pages/category/Category.styles';
import CategoryTabNavigator from '@/shared/components/CategoryTabNavigator';
import SearchBar from '@/shared/components/SearchBar';
import ServiceCard from '@/shared/components/ServiceCard';
import Spinner from '@/shared/components/Spinner';

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const currentCategoryId = categoryId ? parseInt(categoryId, 10) : null;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useServiceListQuery({
      category: currentCategoryId!,
    });

  const { currentCategory, observerRef } = useCategory({
    categoryId,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const services = useMemo(() => {
    return (
      data?.pages.flatMap((page) => page.data?.content?.services || []) || []
    );
  }, [data]);

  if (isLoading) {
    return (
      <S.Container>
        <S.SearchSection>
          <SearchBar />
        </S.SearchSection>
        <S.SpinnerWrapper>
          <Spinner />
        </S.SpinnerWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.SearchSection>
        <SearchBar />
      </S.SearchSection>
      <CategoryTabNavigator currentCategoryId={currentCategoryId} />
      <S.ContentWrapper>
        {currentCategory && (
          <S.CategoryHeader>
            <S.CategoryTitle>{currentCategory.name}</S.CategoryTitle>
          </S.CategoryHeader>
        )}
        <S.ServicesSection>
          <S.ServiceGrid>
            {services.map((service) => (
              <ServiceCard
                key={service.serviceId}
                id={service.serviceId}
                name={service.serviceName}
                minPrice={service.salary}
                thumbnailUrl={service.thumbnailUrl}
                providerName={service.providerName}
              />
            ))}
          </S.ServiceGrid>
          {hasNextPage && (
            <div ref={observerRef}>
              {isFetchingNextPage && (
                <S.SpinnerWrapper>
                  <Spinner />
                </S.SpinnerWrapper>
              )}
            </div>
          )}
        </S.ServicesSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Category;
