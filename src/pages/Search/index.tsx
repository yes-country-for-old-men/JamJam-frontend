import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { searchServices, type ServiceSearchItem } from '@apis/search';
import SearchBar from '@components/SearchBar';
import CategoryTabNavigator from '@components/CategoryTabNavigator';
import ServiceCard from '@components/ServiceCard';
import Spinner from '@components/Spinner';

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

const SearchHeader = styled.header`
  width: 100%;
  margin-bottom: 28px;
`;

const SearchTitle = styled.div`
  font-size: 21px;
  font-weight: 600;
`;

const SearchKeyword = styled.span`
  color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  font-weight: 700;
`;

const ResultsSection = styled.section``;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px;
  margin-bottom: 40px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  font-size: 18px;
  padding: 80px 24px;
`;

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const observerRef = useRef<HTMLDivElement>(null);

  const [services, setServices] = useState<ServiceSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const keyword = searchParams.get('keyword') || '';

  const loadSearchResults = useCallback(
    async (page: number, isInitial = false) => {
      if (loading || !keyword) return;

      setLoading(true);
      try {
        const response = await searchServices({
          keyword: keyword || undefined,
          page,
          size: 20,
        });

        if (response.data?.content) {
          const { services: newServices, hasNext: nextExists } =
            response.data.content;

          if (isInitial) {
            setServices(newServices);
          } else {
            setServices((prev) => [...prev, ...newServices]);
          }

          setHasNext(nextExists);
          setCurrentPage(page);
          setHasSearched(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, keyword],
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNext && !loading) {
        loadSearchResults(currentPage + 1);
      }
    },
    [hasNext, loading, currentPage, loadSearchResults],
  );

  useEffect(() => {
    if (keyword) {
      setServices([]);
      setCurrentPage(0);
      setHasNext(true);
      setHasSearched(false);
      loadSearchResults(0, true);
    }
  }, [keyword]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  const displayKeyword = keyword;

  return (
    <Container>
      <SearchSection>
        <SearchBar />
      </SearchSection>
      <CategoryTabNavigator currentCategoryId={null} />
      <ContentWrapper>
        {displayKeyword && (
          <SearchHeader>
            <SearchTitle>
              <SearchKeyword>{`'${displayKeyword}'`}</SearchKeyword> 에 대한
              검색 결과
            </SearchTitle>
          </SearchHeader>
        )}
        <ResultsSection>
          {hasSearched && services.length === 0 && !loading ? (
            <NoResults>검색 결과가 없습니다.</NoResults>
          ) : (
            <ServiceGrid>
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
            </ServiceGrid>
          )}
          {hasNext && (
            <div ref={observerRef}>
              {loading && (
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
              )}
            </div>
          )}
        </ResultsSection>
      </ContentWrapper>
    </Container>
  );
};

export default Search;
