import React, { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTabScroll } from '@hooks/useTabScroll';
import useProviderData from '@pages/Provider/hooks/useProviderData';
import * as S from '@pages/Provider/Provider.styles';
import SectionTab from '@components/SectionTab';
import ProfileCard from '@pages/Provider/components/ProfileCard';
import ProviderInfoSection from '@pages/Provider/components/ProviderInfoSection';
import ServicesSection from '@pages/Provider/components/ServicesSection';
import SidePanel from '@pages/Provider/components/SidePanel';

const Provider: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, loading, shouldRedirect } = useProviderData(userId);

  const expertInfoRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const sectionRefs = [expertInfoRef, servicesRef];

  const TABS = ['전문가 정보', '서비스'] as const;
  const { activeTab, handleTabClick } = useTabScroll({
    tabs: TABS,
    sectionRefs,
  });

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
    <S.Container>
      <S.MainContent>
        <ProfileCard data={data} />
        <SectionTab
          tabs={TABS}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        >
          <section ref={expertInfoRef}>
            <ProviderInfoSection data={data} />
          </section>
          <section ref={servicesRef}>
            <ServicesSection data={data} />
          </section>
        </SectionTab>
      </S.MainContent>
      <SidePanel data={data} />
    </S.Container>
  );
};

export default Provider;
