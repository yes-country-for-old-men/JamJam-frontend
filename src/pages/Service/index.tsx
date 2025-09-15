import React, { useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useTabScroll } from '@hooks/useTabScroll';
import useServiceData from '@pages/Service/hooks/useServiceData';
import * as S from '@pages/Service/Service.styles';
import SectionTab from '@components/SectionTab';
import CategoryTabNavigator from '@components/CategoryTabNavigator';
import ServiceHeader from '@pages/Service/components/ServiceHeader';
import ServiceInfoSection from '@pages/Service/components/ServiceInfoSection';
import PortfolioSection from '@pages/Service/components/PortfolioSection';
import SidePanel from '@pages/Service/components/SidePanel';

const Service: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { data, loading, shouldRedirect } = useServiceData(serviceId);

  const serviceInfoRef = useRef<HTMLElement | null>(null);
  const portfolioRef = useRef<HTMLElement | null>(null);

  const hasPortfolio = data && data.portfolioImages.length > 0;
  const sectionRefs = hasPortfolio
    ? [serviceInfoRef, portfolioRef]
    : [serviceInfoRef];

  const TABS = hasPortfolio
    ? (['서비스 설명', '포트폴리오'] as const)
    : (['서비스 설명'] as const);

  const { activeTab, handleTabClick } = useTabScroll({
    tabs: TABS,
    sectionRefs,
  });

  const handleCategoryClick = () => {
    if (data) {
      navigate(`/category/${data.category}`);
    }
  };

  const handleOrderClick = () => {
    if (data) {
      navigate('/order', { state: { serviceData: data } });
    }
  };

  if (shouldRedirect) {
    return <Navigate to="/not-found" replace />;
  }

  if (loading) {
    return <S.LoadingWrapper />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
      <CategoryTabNavigator currentCategoryId={data.category} />
      <S.Container>
        <S.MainContent>
          <ServiceHeader data={data} onCategoryClick={handleCategoryClick} />
          <SectionTab
            tabs={TABS}
            activeTab={activeTab}
            onTabClick={handleTabClick}
          >
            <section ref={serviceInfoRef}>
              <ServiceInfoSection data={data} />
            </section>
            {hasPortfolio && (
              <section ref={portfolioRef}>
                <PortfolioSection data={data} />
              </section>
            )}
          </SectionTab>
        </S.MainContent>
        <SidePanel data={data} onOrderClick={handleOrderClick} />
      </S.Container>
    </>
  );
};

export default Service;
