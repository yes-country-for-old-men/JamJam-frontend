import React, { useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { createChatRoom } from '@/entities/chat/api/chatApi';
import { useProviderDetailQuery } from '@/entities/provider/model/useProviderDetailQuery';
import { useAuthStatus } from '@/features/auth/model/useAuthStatus';
import * as S from '@/pages/provider/Provider.styles';
import { eventManager } from '@/shared/lib';
import { useDialog } from '@/shared/lib/useDialog';
import { useTabScroll } from '@/shared/lib/useTabScroll';
import SectionTab from '@/shared/ui/SectionTab';
import ProfileCard from '@/widgets/provider-profile/ui/ProfileCard';
import ProviderInfoSection from '@/widgets/provider-profile/ui/ProviderInfoSection';
import ServicesSection from '@/widgets/provider-profile/ui/ServicesSection';
import SidePanel from '@/widgets/provider-profile/ui/SidePanel';

const Provider: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, isProvider } = useAuthStatus();
  const { alert } = useDialog();

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

  const handleInquiryClick = async () => {
    if (!isLoggedIn) {
      eventManager.emit('openLoginModal');
      return;
    }

    if (!parsedUserId) return;

    try {
      const response = await createChatRoom({ otherId: parsedUserId });
      const { roomId } = response.data.content;
      navigate('/chat', { state: { roomId } });
    } catch {
      await alert({
        title: '문의 실패',
        content: '문의 처리 중 오류가 발생했습니다.',
      });
    }
  };

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
      <SidePanel
        data={providerData}
        isProvider={isProvider}
        onInquiryClick={handleInquiryClick}
      />
    </S.Container>
  );
};

export default Provider;
