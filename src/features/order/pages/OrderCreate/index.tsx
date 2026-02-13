import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  registerOrder,
  type OrderRegisterRequest,
} from '@/features/order/api/orderApi';
import OrderFormSection from '@/features/order/pages/OrderCreate/components/OrderFormSection';
import SidePanel from '@/features/order/pages/OrderCreate/components/SidePanel';
import { useOrderForm } from '@/features/order/pages/OrderCreate/hooks/useOrderForm';
import * as S from '@/features/order/pages/OrderCreate/OrderCreate.styles';
import { type ServiceDetailContent } from '@/features/service/api/serviceApi';
import { useDialog } from '@/shared/hooks/useDialog';
import { formatDeadlineISO } from '@/shared/utils';
import type { OrderFormData } from '@/features/order/types/Order';

const OrderCreate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { alert } = useDialog();
  const [serviceData, setServiceData] = useState<ServiceDetailContent | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { formData, handleInputChange, handleDateChange, handleFilesChange } =
    useOrderForm();

  useEffect(() => {
    if (location.state?.serviceData) {
      setServiceData(location.state.serviceData);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const validateForm = useCallback((): string[] => {
    const missingFields = [];

    if (!formData.title.trim()) {
      missingFields.push('제목');
    }

    if (
      !formData.deadline.year ||
      !formData.deadline.month ||
      !formData.deadline.day
    ) {
      missingFields.push('마감일');
    }

    if (!formData.content.trim()) {
      missingFields.push('의뢰 내용');
    }

    return missingFields;
  }, [formData]);

  const buildOrderData = useCallback(
    (
      orderFormData: OrderFormData,
      currentServiceData: ServiceDetailContent,
    ): OrderRegisterRequest => {
      const referenceFiles = orderFormData.files
        .map((file) => file.file)
        .filter((file): file is File => file instanceof File);

      return {
        request: {
          title: orderFormData.title.trim(),
          deadline: formatDeadlineISO(orderFormData.deadline),
          description: orderFormData.content.trim(),
          price: currentServiceData.salary,
          serviceId: currentServiceData.serviceId,
        },
        referenceFiles: referenceFiles.length > 0 ? referenceFiles : undefined,
      };
    },
    [],
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    const missingFields = validateForm();

    if (missingFields.length > 0) {
      await alert({
        title: '입력 확인',
        content: `${missingFields.join(', ')}을 입력해 주세요.`,
      });
      return;
    }

    if (!serviceData) return;

    setIsLoading(true);
    try {
      const orderData = buildOrderData(formData, serviceData);
      await registerOrder(orderData);

      await alert({
        title: '의뢰서 제출 완료',
        content:
          '의뢰서가 성공적으로 제출되었습니다. 채팅에서 진행 상황을 확인하세요.',
      });
      navigate('/chat');
    } catch {
      await alert({
        title: '제출 실패',
        content: '의뢰서 제출 중 오류가 발생했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [validateForm, serviceData, buildOrderData, formData, alert, navigate]);

  if (!serviceData) {
    return null;
  }

  return (
    <S.Container>
      <S.MainContent>
        <S.SectionTitle>서비스 의뢰</S.SectionTitle>
        <OrderFormSection
          formData={formData}
          onInputChange={handleInputChange}
          onDateChange={handleDateChange}
          onFilesChange={handleFilesChange}
        />
      </S.MainContent>
      <SidePanel
        serviceData={serviceData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </S.Container>
  );
};

export default OrderCreate;
