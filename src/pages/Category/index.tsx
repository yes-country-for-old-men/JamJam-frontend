import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { getServiceList, type ServiceListItem } from '@apis/service';
import SearchBar from '@components/SearchBar';
import CategoryTabNavigator from '@components/CategoryTabNavigator';
import ServiceCard from '@components/ServiceCard';
import Spinner from '@components/Spinner';
import CATEGORIES from '@constants/categoryData';

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
  margin-bottom: 40px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const observerRef = useRef<HTMLDivElement>(null);

  const [services, setServices] = useState<ServiceListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const currentCategoryId = categoryId ? parseInt(categoryId, 10) : null;

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((category) => category.id === currentCategoryId);
  }, [currentCategoryId]);

  const loadServices = useCallback(
    async (page: number, isInitial = false) => {
      if (loading || !currentCategoryId) return;

      setLoading(true);
      try {
        const response = await getServiceList({
          category: currentCategoryId,
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
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, currentCategoryId],
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNext && !loading) {
        loadServices(currentPage + 1);
      }
    },
    [hasNext, loading, currentPage, loadServices],
  );

  useEffect(() => {
    if (currentCategoryId) {
      setServices([]);
      setCurrentPage(0);
      setHasNext(true);
      loadServices(0, true);
    }
  }, [currentCategoryId]);

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

  return (
    <Container>
      <SearchSection>
        <SearchBar />
      </SearchSection>
      <CategoryTabNavigator currentCategoryId={currentCategoryId} />
      <ContentWrapper>
        {currentCategory && (
          <CategoryHeader>
            <CategoryTitle>{currentCategory.name}</CategoryTitle>
          </CategoryHeader>
        )}
        <ServicesSection>
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
          {hasNext && (
            <div ref={observerRef}>
              {loading && (
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
              )}
            </div>
          )}
        </ServicesSection>
      </ContentWrapper>
    </Container>
  );
};

export default Category;
