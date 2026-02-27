import React, { useEffect, useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  updateService,
  type ServiceUpdateRequest,
} from '@/entities/service/api/serviceApi';
import { useServiceDetailQuery } from '@/entities/service/model/useServiceDetailQuery';
import {
  serviceEditSchema,
  type ServiceEditData,
} from '@/features/service/model/serviceEditSchema';
import * as S from '@/pages/service-edit/ServiceEdit.styles';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';
import { CATEGORIES } from '@/shared/config';
import { parsePrice } from '@/shared/lib';
import { useDialog } from '@/shared/lib/useDialog';
import Button from '@/shared/ui/Button';
import FormMessage from '@/shared/ui/FormMessage';
import Input from '@/shared/ui/Input';
import MultiImageUpload from '@/shared/ui/MultiImageUpload';
import RichTextEditor from '@/shared/ui/RichTextEditor';
import Select from '@/shared/ui/Select';
import SingleImageUpload from '@/shared/ui/SingleImageUpload';
import type { FileWithId } from '@/shared/types/FileWithId';

const ServiceEdit: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const parsedServiceId = serviceId ? parseInt(serviceId, 10) : null;

  const { data, isLoading, error } = useServiceDetailQuery(parsedServiceId);
  const { alert } = useDialog();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingPortfolioImages, setExistingPortfolioImages] = useState<
    { id: number; url: string }[]
  >([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [newPortfolioImages, setNewPortfolioImages] = useState<FileWithId[]>(
    [],
  );

  const serviceData = data?.data?.code === 'SUCCESS' ? data.data.content : null;

  const form = useForm<ServiceEditData>({
    resolver: zodResolver(serviceEditSchema),
    defaultValues: {
      serviceName: '',
      serviceDetail: '',
      category: undefined,
      price: 0,
      thumbnailImage: '',
      portfolioImages: [],
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (serviceData) {
      form.reset({
        serviceName: serviceData.serviceName,
        serviceDetail: serviceData.description,
        category: serviceData.category,
        price: serviceData.salary,
        thumbnailImage: serviceData.thumbnail,
        portfolioImages: [],
      });
      setExistingPortfolioImages(serviceData.portfolioImages);
    }
  }, [serviceData, form]);

  const priceValue = form.watch('price');
  const priceDisplay = priceValue ? priceValue.toLocaleString() : '';

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parsePrice(e.target.value);
      form.setValue('price', numericValue);
    },
    [form],
  );

  const handleRemoveExistingImage = (imageId: number) => {
    setExistingPortfolioImages((prev) =>
      prev.filter((img) => img.id !== imageId),
    );
    setDeletedImageIds((prev) => [...prev, imageId]);
  };

  const handleNewPortfolioImagesChange = (images: FileWithId[]) => {
    setNewPortfolioImages(images);
  };

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formValues = form.getValues();

      const thumbnailFile =
        formValues.thumbnailImage instanceof File
          ? formValues.thumbnailImage
          : undefined;

      const newPortfolioFiles = newPortfolioImages.map((item) => item.file);

      const requestData: ServiceUpdateRequest = {
        serviceId: parsedServiceId!,
        request: {
          serviceName: formValues.serviceName,
          description: formValues.serviceDetail,
          salary: formValues.price,
          categoryId: formValues.category as number,
          deleteImageIds:
            deletedImageIds.length > 0 ? deletedImageIds : undefined,
        },
        thumbnail: thumbnailFile,
        portfolioImages:
          newPortfolioFiles.length > 0 ? newPortfolioFiles : undefined,
      };

      await updateService(requestData);
      await queryClient.invalidateQueries({
        queryKey: ['serviceDetail', parsedServiceId],
      });

      await alert({
        title: '수정 완료',
        content: '서비스가 성공적으로 수정되었습니다.',
      });

      navigate(`/service/${parsedServiceId}`);
    } catch {
      await alert({
        title: '서비스 수정 실패',
        content: '서비스 수정 중 오류가 발생했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!serviceId || Number.isNaN(parsedServiceId!)) {
    return <Navigate to="/not-found" replace />;
  }

  if (error || (data && data.data?.code !== 'SUCCESS')) {
    return <Navigate to="/not-found" replace />;
  }

  if (isLoading) {
    return <S.Container />;
  }

  if (!serviceData) {
    return <Navigate to="/not-found" replace />;
  }

  const maxNewImages = 10 - existingPortfolioImages.length;

  return (
    <S.Container>
      <S.PageTitle>서비스 수정</S.PageTitle>
      <S.Section>
        <S.Label>서비스 명</S.Label>
        <Controller
          name="serviceName"
          control={form.control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="서비스 명을 입력해 주세요"
            />
          )}
        />
        {form.formState.errors.serviceName && (
          <FormMessage
            type="error"
            message={form.formState.errors.serviceName.message || ''}
          />
        )}
      </S.Section>
      <S.Section>
        <S.Label>서비스 상세 설명</S.Label>
        <Controller
          name="serviceDetail"
          control={form.control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              height={540}
            />
          )}
        />
        {form.formState.errors.serviceDetail && (
          <FormMessage
            type="error"
            message={form.formState.errors.serviceDetail.message || ''}
          />
        )}
      </S.Section>
      <S.Section>
        <S.Label>카테고리</S.Label>
        <Controller
          name="category"
          control={form.control}
          render={({ field }) => (
            <Select
              value={field.value || ''}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            >
              <option value={undefined}>전문 분야를 선택하세요</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          )}
        />
        {form.formState.errors.category && (
          <FormMessage
            type="error"
            message={form.formState.errors.category.message || ''}
          />
        )}
      </S.Section>
      <S.Section>
        <S.Label>가격 (VAT 포함가)</S.Label>
        <Input
          type="text"
          value={priceDisplay}
          onChange={handlePriceChange}
          placeholder="가격을 입력해 주세요"
        />
        {form.formState.errors.price && (
          <FormMessage
            type="error"
            message={form.formState.errors.price.message || ''}
          />
        )}
      </S.Section>
      <S.Section>
        <S.Label>썸네일 사진</S.Label>
        <Controller
          name="thumbnailImage"
          control={form.control}
          render={({ field }) => (
            <SingleImageUpload
              image={field.value}
              onImageChange={field.onChange}
              width={280}
              height={280}
            />
          )}
        />
        {form.formState.errors.thumbnailImage?.message && (
          <FormMessage
            type="error"
            message={form.formState.errors.thumbnailImage.message as string}
          />
        )}
      </S.Section>
      <S.Section>
        <S.Label>포트폴리오 사진</S.Label>
        {existingPortfolioImages.length > 0 && (
          <S.ExistingImagesGrid>
            {existingPortfolioImages.map((img) => (
              <S.ExistingImageItem key={img.id}>
                <S.ExistingImage src={img.url} alt="portfolio" />
                <S.RemoveButton
                  onClick={() => handleRemoveExistingImage(img.id)}
                >
                  <DeleteIcon />
                </S.RemoveButton>
              </S.ExistingImageItem>
            ))}
          </S.ExistingImagesGrid>
        )}
        {maxNewImages > 0 && (
          <MultiImageUpload
            images={newPortfolioImages}
            onImagesChange={handleNewPortfolioImagesChange}
            maxImages={maxNewImages}
          />
        )}
      </S.Section>
      <S.NavigationButtonsWrapper>
        <Button
          size="large"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button
          size="large"
          variant="primary"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          저장
        </Button>
      </S.NavigationButtonsWrapper>
    </S.Container>
  );
};

export default ServiceEdit;
