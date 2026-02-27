import React, { useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus';
import { createChatRoom } from '@/features/chat/api/chatApi';
import { inquireService } from '@/features/service/api/serviceApi';
import PortfolioSection from '@/features/service/components/ServiceDetail/PortfolioSection';
import ServiceHeader from '@/features/service/components/ServiceDetail/ServiceHeader';
import ServiceInfoSection from '@/features/service/components/ServiceDetail/ServiceInfoSection';
import SidePanel from '@/features/service/components/ServiceDetail/SidePanel';
import { useServiceDetailQuery } from '@/features/service/hooks/queries/useServiceDetailQuery';
import * as S from '@/pages/service-detail/Service.styles';
import CategoryTabNavigator from '@/shared/components/CategoryTabNavigator';
import SectionTab from '@/shared/components/SectionTab';
import { useDialog } from '@/shared/hooks/useDialog';
import { useTabScroll } from '@/shared/hooks/useTabScroll';
import { decodeToken, eventManager } from '@/shared/utils';

const Service: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuthStatus();
  const { alert } = useDialog();

  const token = localStorage.getItem('accessToken') || '';
  const currentUserId = decodeToken(token)?.userId;

  const parsedServiceId = serviceId ? parseInt(serviceId, 10) : null;
  const { data, isLoading, error } = useServiceDetailQuery(parsedServiceId);

  const serviceInfoRef = useRef<HTMLElement | null>(null);
  const portfolioRef = useRef<HTMLElement | null>(null);

  const serviceData = data?.data?.code === 'SUCCESS' ? data.data.content : null;
  const hasPortfolio = serviceData && serviceData.portfolioImages.length > 0;

  const isOwner =
    currentUserId && serviceData
      ? String(serviceData.userId) === currentUserId
      : false;
  const isProvider = userInfo?.role === 'PROVIDER';

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

  const handleEditClick = () => {
    if (serviceData) {
      navigate(`/my/service-edit/${serviceData.serviceId}`);
    }
  };

  const handleProviderClick = () => {
    if (serviceData) {
      navigate(`/provider/${serviceData.userId}`);
    }
  };

  const handleInquiryClick = async () => {
    if (!isLoggedIn) {
      eventManager.emit('openLoginModal');
      return;
    }

    if (!parsedServiceId || !serviceData) return;

    try {
      await inquireService({ serviceId: parsedServiceId });
      const response = await createChatRoom({ otherId: serviceData.userId });
      const { roomId } = response.data.content;
      navigate('/chat', { state: { roomId } });
    } catch {
      await alert({
        title: '문의 실패',
        content: '문의 처리 중 오류가 발생했습니다.',
      });
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
            isProvider={isProvider}
            onCategoryClick={handleCategoryClick}
            onInquiryClick={handleInquiryClick}
            onProviderClick={handleProviderClick}
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
        <SidePanel
          data={serviceData}
          isOwner={isOwner}
          onOrderClick={handleOrderClick}
          onEditClick={handleEditClick}
        />
      </S.Container>
    </>
  );
};

export default Service;
