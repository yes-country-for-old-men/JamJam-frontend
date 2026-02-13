export interface CancelReasonOption {
  label: string;
  value: string;
}

export const CLIENT_CANCEL_REASONS: CancelReasonOption[] = [
  { label: '단순 변심', value: '단순 변심' },
  { label: '일정 변경', value: '일정 변경' },
  { label: '다른 전문가 이용', value: '다른 전문가 이용' },
  { label: '직접 입력', value: '' },
];

export const PROVIDER_CANCEL_REASONS: CancelReasonOption[] = [
  { label: '일정 불가', value: '일정 불가' },
  { label: '작업 범위 초과', value: '작업 범위 초과' },
  { label: '의뢰인과 협의 후 취소', value: '의뢰인과 협의 후 취소' },
  { label: '직접 입력', value: '' },
];
