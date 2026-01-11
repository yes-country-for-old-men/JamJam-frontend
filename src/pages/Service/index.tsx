import React, { useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import CategoryTabNavigator from '@components/CategoryTabNavigator';
import SectionTab from '@components/SectionTab';
import { useTabScroll } from '@hooks/useTabScroll';
import PortfolioSection from '@pages/Service/components/PortfolioSection';
import ServiceHeader from '@pages/Service/components/ServiceHeader';
import ServiceInfoSection from '@pages/Service/components/ServiceInfoSection';
import SidePanel from '@pages/Service/components/SidePanel';
import useServiceDetailQuery from '@pages/Service/hooks/queries/useServiceDetailQuery';
import * as S from '@pages/Service/Service.styles';

const Service: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const parsedServiceId = serviceId ? parseInt(serviceId, 10) : null;
  const { data, isLoading, error } = useServiceDetailQuery(parsedServiceId);

  const serviceInfoRef = useRef<HTMLElement | null>(null);
  const portfolioRef = useRef<HTMLElement | null>(null);

  const serviceData = data?.data?.code === 'SUCCESS' ? data.data.content : null;
  const hasPortfolio = serviceData && serviceData.portfolioImages.length > 0;

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
    if (serviceData) {
      navigate(`/category/${serviceData.category}`);
    }
  };

  const handleOrderClick = () => {
    if (serviceData) {
      navigate('/order', { state: { serviceData } });
    }
  };

  if (!serviceId || Number.isNaN(parsedServiceId!)) {
    return <Navigate to="/not-found" replace />;
  }

  if (error || (data && data.data?.code !== 'SUCCESS')) {
    return <Navigate to="/not-found" replace />;
  }

  if (isLoading) {
    return <S.LoadingWrapper />;
  }

  if (!serviceData) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
      <CategoryTabNavigator currentCategoryId={serviceData.category} />
      <S.Container>
        <S.MainContent>
          <ServiceHeader
            data={serviceData}
            onCategoryClick={handleCategoryClick}
          />
          <SectionTab
            tabs={TABS}
            activeTab={activeTab}
            onTabClick={handleTabClick}
          >
            <section ref={serviceInfoRef}>
              <ServiceInfoSection data={serviceData} />
            </section>
            {hasPortfolio && (
              <section ref={portfolioRef}>
                <PortfolioSection data={serviceData} />
              </section>
            )}
          </SectionTab>
        </S.MainContent>
        <SidePanel data={serviceData} onOrderClick={handleOrderClick} />
      </S.Container>
    </>
  );
};

export default Service;
