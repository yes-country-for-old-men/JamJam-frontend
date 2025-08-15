import { z } from 'zod';

export const descriptionSchema = z
  .string()
  .min(10, '서비스 소개는 10자 이상 입력해 주세요.')
  .max(1000, '1000자 이내로 입력해 주세요.');

export const serviceNameSchema = z
  .string()
  .min(1, '서비스 명을 입력해 주세요.');

export const serviceDetailSchema = z
  .string()
  .min(1, '서비스 상세 설명을 입력해 주세요.');

export const categorySchema = z
  .number({
    required_error: '카테고리를 선택해 주세요.',
    invalid_type_error: '카테고리를 선택해 주세요.',
  })
  .optional();

export const priceSchema = z
  .number({
    required_error: '가격을 입력해 주세요.',
  })
  .refine((price) => price > 0, '가격을 입력해 주세요.')
  .refine((price) => price >= 100, '최소 100원 이상 입력해 주세요.');

export const thumbnailImageSchema = z
  .any()
  .refine((file) => file !== null, '썸네일 이미지를 업로드해 주세요.')
  .refine((file) => file instanceof File && file.size <= 10 * 1024 * 1024, {
    message: '10MB 보다 큰 이미지는 업로드할 수 없습니다.',
  });

export const portfolioImagesSchema = z
  .array(z.any())
  .optional()
  .refine(
    (files) => {
      if (!files || files.length === 0) return true;
      return files.every(
        (fileWithId) =>
          fileWithId?.file instanceof File &&
          fileWithId.file.size <= 5 * 1024 * 1024,
      );
    },
    {
      message: '5MB 보다 큰 이미지는 업로드할 수 없습니다.',
    },
  );

export const includeTitleInThumbnailSchema = z.boolean();

export const serviceRegisterSchema = z.object({
  description: descriptionSchema,
  serviceName: serviceNameSchema,
  serviceDetail: serviceDetailSchema,
  category: categorySchema,
  price: priceSchema,
  thumbnailImage: thumbnailImageSchema,
  portfolioImages: portfolioImagesSchema,
  includeTitleInThumbnail: includeTitleInThumbnailSchema,
});

export type ServiceRegisterData = z.infer<typeof serviceRegisterSchema>;
