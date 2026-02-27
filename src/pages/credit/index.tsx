import React, { useState, useEffect, useCallback } from 'react';
import {
  getCreditHistory,
  type CreditHistoryItem,
} from '@/entities/credit/api/creditApi';
import { useUserInfoQuery } from '@/entities/user/model/useUserInfoQuery';
import CreditChargeModal from '@/features/credit/ui/CreditChargeModal';
import { formatDate } from '@/shared/lib';
import Button from '@/shared/ui/Button';
import Pagination from '@/shared/ui/Pagination';
import Select from '@/shared/ui/Select';
import * as S from './Credit.styles';

const Credit: React.FC = () => {
  const [chargeModalOpen, setChargeModalOpen] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'DEPOSIT' | 'WITHDRAW'>('ALL');
  const [histories, setHistories] = useState<CreditHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data: userInfo } = useUserInfoQuery();

  const handleChargeClick = () => {
    setChargeModalOpen(true);
  };

  const handleWithdrawClick = () => {};

  const loadCreditHistory = useCallback(
    async (page: number) => {
      if (loading) return;

      setLoading(true);
      try {
        const response = await getCreditHistory({
          type: filter,
          page: page - 1,
          size: 10,
        });

        if (response.data?.content) {
          const { histories: newHistories, totalPages: total } =
            response.data.content;
          setHistories(newHistories);
          setTotalPages(total);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, filter],
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      loadCreditHistory(page);
    }
  };

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0;
    const formattedAmount = Math.abs(amount).toLocaleString();
    return `${isPositive ? '+' : '-'}${formattedAmount}원`;
  };

  useEffect(() => {
    setCurrentPage(1);
    loadCreditHistory(1);
  }, [filter]);

  return (
    <S.Container>
      <S.SectionTitle>잼잼 크레딧</S.SectionTitle>
      <S.CreditCard>
        <S.CreditCardTitle>보유 중인 크레딧</S.CreditCardTitle>
        <S.CreditAmount>
          <S.AmountText>
            {userInfo?.credit?.toLocaleString() || 0}
            <S.Unit>원</S.Unit>
          </S.AmountText>
          <S.CreditButtons>
            <Button
              onClick={handleWithdrawClick}
              variant="outline"
              size="large"
            >
              출금
            </Button>
            <Button onClick={handleChargeClick} size="large">
              충전
            </Button>
          </S.CreditButtons>
        </S.CreditAmount>
      </S.CreditCard>
      <S.FilterSection>
        <Select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as 'ALL' | 'DEPOSIT' | 'WITHDRAW')
          }
        >
          <option value="ALL">전체</option>
          <option value="DEPOSIT">입금</option>
          <option value="WITHDRAW">출금</option>
        </Select>
      </S.FilterSection>
      <S.TransactionList>
        <S.TransactionHeader>
          <div>날짜</div>
          <div>사유</div>
          <div>금액</div>
        </S.TransactionHeader>
        {histories.length === 0 && !loading ? (
          <S.NoResults>해당하는 내역이 없습니다.</S.NoResults>
        ) : (
          histories.map((history) => (
            <S.TransactionItem key={history.createdAt}>
              <S.TransactionDate>
                {formatDate(new Date(history.createdAt))}
              </S.TransactionDate>
              <S.TransactionDescription>
                {history.reason}
              </S.TransactionDescription>
              <S.TransactionAmount isPositive={history.amount > 0}>
                {formatAmount(history.amount)}
              </S.TransactionAmount>
            </S.TransactionItem>
          ))
        )}
      </S.TransactionList>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <CreditChargeModal
        isOpen={chargeModalOpen}
        onClose={() => setChargeModalOpen(false)}
      />
    </S.Container>
  );
};

export default Credit;
