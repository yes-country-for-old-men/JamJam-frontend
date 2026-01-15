import { z } from 'zod';
import {
  descriptionSchema,
  serviceNameSchema,
  serviceDetailSchema,
  categorySchema,
  priceSchema,
  thumbnailImageSchema,
  portfolioImagesSchema,
  includeTitleInThumbnailSchema,
} from '@/features/service/schemas/serviceSchema';

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
