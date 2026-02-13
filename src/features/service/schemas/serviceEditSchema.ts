import { z } from 'zod';
import {
  serviceNameSchema,
  serviceDetailSchema,
  categorySchema,
  priceSchema,
} from '@/features/service/schemas/serviceSchema';

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
  thumbnailImage: z.union([z.instanceof(File), z.string()]),
  portfolioImages: z.array(portfolioImageSchema).optional(),
});

export type ServiceEditData = z.infer<typeof serviceEditSchema>;
export type PortfolioImage = z.infer<typeof portfolioImageSchema>;
