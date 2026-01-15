import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  serviceRegisterSchema,
  type ServiceRegisterData,
} from '@/features/service/schemas/serviceRegisterSchema';
import type FileWithId from '@/shared/types/FileWithId';

interface ServiceFormData extends ServiceRegisterData {
  priceDisplay: string;
}

const useServiceRegisterForm = () => {
  const form = useForm<ServiceRegisterData>({
    resolver: zodResolver(serviceRegisterSchema),
    defaultValues: {
      description: '',
      serviceName: '',
      serviceDetail: '',
      category: undefined,
      price: 0,
      thumbnailImage: null as unknown as File,
      portfolioImages: [],
      includeTitleInThumbnail: true,
    },
    mode: 'onSubmit',
  });

  const watchedValues = form.watch();

  const formData: ServiceFormData = {
    ...watchedValues,
    priceDisplay: watchedValues.price
      ? watchedValues.price.toLocaleString()
      : '',
  };

  const updateFormData = useCallback(
    (updates: Partial<ServiceRegisterData>) => {
      Object.entries(updates).forEach(([key, value]) => {
        form.setValue(key as keyof ServiceRegisterData, value);
      });
    },
    [form],
  );

  const updatePrice = useCallback(
    (newPrice: number) => {
      form.setValue('price', newPrice);
    },
    [form],
  );

  const updatePortfolioImages = useCallback(
    (images: FileWithId[]) => {
      form.setValue('portfolioImages', images);
    },
    [form],
  );

  return {
    form,
    formData,
    updateFormData,
    updatePrice,
    updatePortfolioImages,
  };
};

export default useServiceRegisterForm;
