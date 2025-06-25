import PortOne from '@portone/browser-sdk/v2';
import eventManager from '@utils/eventManager';
import ensurePunctuation from '@utils/ensurePunctuation';

const PAYMENT_MESSAGES = {
  SUCCESS: '결제가 완료되었습니다.',
  GENERAL_ERROR: '결제 중 오류가 발생했습니다.',
  TITLES: {
    SUCCESS: '결제 완료',
    FAILURE: '결제 실패',
  },
} as const;

const showPaymentAlert = (title: string, content: string) => {
  eventManager.emit('alert', {
    title,
    content: ensurePunctuation(content),
  });
};

const requestPayment = async (chargeAmount: number) => {
  try {
    const response = await PortOne.requestPayment({
      storeId: import.meta.env.VITE_PORTONE_STORE_ID,
      paymentId: crypto.randomUUID(),
      orderName: '잼잼 크레딧',
      totalAmount: chargeAmount,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
    });

    if (response?.code) {
      const errorMessage = response.pgMessage || PAYMENT_MESSAGES.GENERAL_ERROR;
      showPaymentAlert(PAYMENT_MESSAGES.TITLES.FAILURE, errorMessage);
    } else {
      showPaymentAlert(
        PAYMENT_MESSAGES.TITLES.SUCCESS,
        PAYMENT_MESSAGES.SUCCESS,
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : PAYMENT_MESSAGES.GENERAL_ERROR;

    showPaymentAlert(PAYMENT_MESSAGES.TITLES.FAILURE, errorMessage);
  }
};

export default requestPayment;
