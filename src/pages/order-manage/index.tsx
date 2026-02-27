import React from 'react';
import { useOrderCountQuery } from '@/features/order/hooks/queries/useOrderCountQuery';
import OrderManagePanel from '@/pages/order-manage/components/OrderManagePanel';
import * as S from './OrderManage.styles';

const OrderManage: React.FC = () => {
  const { data: statusData, isLoading } = useOrderCountQuery();

  if (isLoading) {
    return (
      <S.Container>
        <S.SectionTitle>주문 관리</S.SectionTitle>
        <S.LoadingWrapper />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.SectionTitle>주문 관리</S.SectionTitle>
      <OrderManagePanel statusData={statusData} />
    </S.Container>
  );
};

export default OrderManage;
