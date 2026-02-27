import React from 'react';
import { useMyOrderListQuery } from '@/features/order/hooks/queries/useMyOrderListQuery';
import OrderHistoryList from '@/pages/order-history/components/OrderHistoryList';
import * as S from './OrderHistory.styles';

const OrderHistory: React.FC = () => {
  const { data: orderList, isLoading } = useMyOrderListQuery();

  if (isLoading) {
    return (
      <S.Container>
        <S.SectionTitle>내 주문 관리</S.SectionTitle>
        <S.LoadingWrapper />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.SectionTitle>내 주문 관리</S.SectionTitle>
      <OrderHistoryList orderList={orderList} />
    </S.Container>
  );
};

export default OrderHistory;
