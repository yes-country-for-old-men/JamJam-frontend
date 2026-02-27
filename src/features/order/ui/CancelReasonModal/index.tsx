import React, { useState, useEffect } from 'react';
import {
  CLIENT_CANCEL_REASONS,
  PROVIDER_CANCEL_REASONS,
} from '@/features/order/config/cancelReasons';
import Button from '@/shared/ui/Button';
import Modal from '@/shared/ui/Modal';
import * as S from './CancelReasonModal.styles';

interface CancelReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  userRole: 'client' | 'provider';
}

const CancelReasonModal: React.FC<CancelReasonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userRole,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [customReason, setCustomReason] = useState('');

  const reasons =
    userRole === 'client' ? CLIENT_CANCEL_REASONS : PROVIDER_CANCEL_REASONS;

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(null);
      setCustomReason('');
    }
  }, [isOpen]);

  const isCustomInput =
    selectedIndex !== null && reasons[selectedIndex].value === '';

  const handleSubmit = () => {
    if (selectedIndex === null) return;

    const reason = isCustomInput
      ? customReason.trim()
      : reasons[selectedIndex].value;

    if (!reason) return;

    onSubmit(reason);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="취소 사유 선택">
      <S.Form>
        <S.RadioGroup>
          {reasons.map((option, index) => (
            <S.RadioLabel key={option.label}>
              <S.RadioInput
                type="radio"
                name="cancelReason"
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
              />
              {option.label}
            </S.RadioLabel>
          ))}
        </S.RadioGroup>
        {isCustomInput && (
          <S.TextArea
            placeholder="취소 사유를 입력해 주세요."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            autoFocus
          />
        )}
        <S.ButtonGroup>
          <S.ButtonWrapper>
            <Button variant="secondary" onClick={onClose} fullWidth>
              닫기
            </Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <Button variant="primary" onClick={handleSubmit} fullWidth>
              확인
            </Button>
          </S.ButtonWrapper>
        </S.ButtonGroup>
      </S.Form>
    </Modal>
  );
};

export default CancelReasonModal;
