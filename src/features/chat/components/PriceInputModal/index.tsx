import React, { useState, useEffect } from 'react';
import Button from '@/shared/components/Button';
import Modal from '@/shared/components/Modal';
import * as S from './PriceInputModal.styles';

interface PriceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (price: number) => void;
}

const PriceInputModal: React.FC<PriceInputModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setValue('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const price = parseInt(value, 10);
    if (Number.isNaN(price) || price <= 0) return;
    onSubmit(price);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="결제 요청">
      <S.Form>
        <S.Description>요청할 금액을 입력해 주세요.</S.Description>
        <S.PriceInput
          type="number"
          placeholder="금액 입력"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <S.ButtonGroup>
          <S.ButtonWrapper>
            <Button variant="secondary" onClick={onClose} fullWidth>
              취소
            </Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <Button variant="primary" onClick={handleSubmit} fullWidth>
              결제 요청
            </Button>
          </S.ButtonWrapper>
        </S.ButtonGroup>
      </S.Form>
    </Modal>
  );
};

export default PriceInputModal;
