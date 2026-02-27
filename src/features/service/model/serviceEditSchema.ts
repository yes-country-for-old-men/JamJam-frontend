import { z } from 'zod';
import {
  serviceNameSchema,
  serviceDetailSchema,
  categorySchema,
  priceSchema,
} from '@/entities/service/model/serviceSchema';

const portfolioImageSchema = z.object({
  id: z.union([z.string(), z.number()]),
  file: z.instanceof(File).optional(),
  url: z.string().optional(),
  isExisting: z.boolean(),
});

export const serviceEditSchema = z.object({
  serviceName: serviceNameSchema,
  serviceDetail: serviceDetailSchema,
  category: categorySchema,
  price: priceSchema,
  thumbnailImage: z.union([
    z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, {
      message: '10MB 보다 큰 이미지는 업로드할 수 없습니다.',
    }),
    z.string(),
  ]),
  portfolioImages: z.array(portfolioImageSchema).optional(),
});

export type ServiceEditData = z.infer<typeof serviceEditSchema>;
export type PortfolioImage = z.infer<typeof portfolioImageSchema>;
