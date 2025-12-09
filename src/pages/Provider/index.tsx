import React, { useRef } from 'react';
import SectionTab from '@components/SectionTab';
import { useTabScroll } from '@hooks/useTabScroll';
import ProfileCard from '@pages/Provider/components/ProfileCard';
import ProviderInfoSection from '@pages/Provider/components/ProviderInfoSection';
import ServicesSection from '@pages/Provider/components/ServicesSection';
import SidePanel from '@pages/Provider/components/SidePanel';
import useProviderDetailQuery from '@pages/Provider/hooks/queries/useProviderDetailQuery';
import * as S from '@pages/Provider/Provider.styles';
import { useParams, Navigate } from 'react-router-dom';

const Provider: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const parsedUserId = userId ? parseInt(userId, 10) : null;
  const { data, isLoading, error } = useProviderDetailQuery(parsedUserId);

  const expertInfoRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const sectionRefs = [expertInfoRef, servicesRef];

  const providerData =
    data?.data?.code === 'SUCCESS' ? data.data.content : null;

  const TABS = ['전문가 정보', '서비스'] as const;
  const { activeTab, handleTabClick } = useTabScroll({
    tabs: TABS,
    sectionRefs,
  });

  if (!userId || Number.isNaN(parsedUserId!)) {
    return <Navigate to="/not-found" replace />;
  }

  if (error || (data && data.data?.code !== 'SUCCESS')) {
    return <Navigate to="/not-found" replace />;
  }

  if (isLoading) {
    return <S.LoadingWrapper />;
  }

  if (!providerData) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <S.Container>
      <S.MainContent>
        <ProfileCard data={providerData} />
        <SectionTab
          tabs={TABS}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        >
          <section ref={expertInfoRef}>
            <ProviderInfoSection data={providerData} />
          </section>
          <section ref={servicesRef}>
            <ServicesSection data={providerData} />
          </section>
        </SectionTab>
      </S.MainContent>
      <SidePanel data={providerData} />
    </S.Container>
  );
};

export default Provider;
