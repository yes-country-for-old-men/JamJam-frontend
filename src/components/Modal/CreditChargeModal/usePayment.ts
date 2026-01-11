import { useCallback } from 'react';
import PortOne from '@portone/browser-sdk/v2';
import apiClient from '@apis/apiClient';
import { ensurePunctuation, eventManager } from '@utils';

const PAYMENT_MESSAGES = {
  SUCCESS: '결제가 완료되었습니다.',
  GENERAL_ERROR: '결제 진행 중 오류가 발생했습니다.',
  ORDER_ERROR: '결제 요청 중 오류가 발생했습니다.',
  VERIFICATION_ERROR: '결제 검증 중 오류가 발생했습니다.',
  TITLES: {
    SUCCESS: '결제 완료',
    FAILURE: '결제 실패',
  },
} as const;

interface PaymentOrderRequest {
  paymentUid: string;
  price: number;
}

interface PaymentCompleteRequest {
  paymentUid: string;
}

const showPaymentAlert = (
  title: string,
  content: string,
  onConfirm?: () => void,
) => {
  eventManager.emit('alert', {
    title,
    content: ensurePunctuation(content),
    onConfirm,
  });
};

const savePaymentOrder = async (data: PaymentOrderRequest) => {
  return apiClient.post('/api/payment/order', data);
};

const completePayment = async (data: PaymentCompleteRequest) => {
  return apiClient.post('/api/payment/complete', data);
};

const usePayment = () => {
  const requestPayment = useCallback(async (chargeAmount: number) => {
    const paymentId = crypto.randomUUID();

    try {
      await savePaymentOrder({
        paymentUid: paymentId,
        price: chargeAmount,
      });
    } catch (error) {
      const errorMessage: string =
        error instanceof Error ? error.message : PAYMENT_MESSAGES.ORDER_ERROR;

      showPaymentAlert(PAYMENT_MESSAGES.TITLES.FAILURE, errorMessage);
      return;
    }

    try {
      const response = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STORE_ID,
        paymentId,
        orderName: '잼잼 크레딧',
        totalAmount: chargeAmount,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
        channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
      });

      if (response?.code) {
        const errorMessage =
          response.pgMessage || PAYMENT_MESSAGES.GENERAL_ERROR;
        showPaymentAlert(PAYMENT_MESSAGES.TITLES.FAILURE, errorMessage);
        return;
      }

      try {
        await completePayment({
          paymentUid: paymentId,
        });

        showPaymentAlert(
          PAYMENT_MESSAGES.TITLES.SUCCESS,
          PAYMENT_MESSAGES.SUCCESS,
          () => window.location.reload(),
        );
      } catch (verificationError) {
        const errorMessage: string =
          verificationError instanceof Error
            ? verificationError.message
            : PAYMENT_MESSAGES.VERIFICATION_ERROR;

        showPaymentAlert(PAYMENT_MESSAGES.TITLES.FAILURE, errorMessage);
      }
    } catch (error) {
      const errorMessage: string =
        error instanceof Error ? error.message : PAYMENT_MESSAGES.GENERAL_ERROR;

      showPaymentAlert(PAYMENT_MESSAGES.TITLES.FAILURE, errorMessage);
    }
  }, []);

  return { requestPayment };
};

export default usePayment;
