import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearch from '@pages/Search/hooks/useSearch';
import useSearchQuery from '@pages/Search/hooks/queries/useSearchQuery';
import * as S from '@pages/Search/Search.styles';
import SearchBar from '@components/SearchBar';
import CategoryTabNavigator from '@components/CategoryTabNavigator';
import ServiceCard from '@components/ServiceCard';
import Spinner from '@components/Spinner';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSearchQuery({
      keyword: keyword || undefined,
    });

  const { observerRef } = useSearch({
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
      <CategoryTabNavigator currentCategoryId={null} />
      <S.ContentWrapper>
        {keyword && (
          <S.SearchHeader>
            <S.SearchTitle>
              <S.SearchKeyword>{`'${keyword}'`}</S.SearchKeyword> 에 대한 검색
              결과
            </S.SearchTitle>
          </S.SearchHeader>
        )}
        <S.ResultsSection>
          {services.length === 0 ? (
            <S.NoResults>검색 결과가 없습니다.</S.NoResults>
          ) : (
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
          )}
          {hasNextPage && (
            <div ref={observerRef}>
              {isFetchingNextPage && (
                <S.SpinnerWrapper>
                  <Spinner />
                </S.SpinnerWrapper>
              )}
            </div>
          )}
        </S.ResultsSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Search;
