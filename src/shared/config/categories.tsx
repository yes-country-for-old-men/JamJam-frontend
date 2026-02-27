import BusinessIcon from '@/shared/assets/icons/category/business.svg?react';
import ConsultingIcon from '@/shared/assets/icons/category/consulting.svg?react';
import CraftIcon from '@/shared/assets/icons/category/craft.svg?react';
import DesignIcon from '@/shared/assets/icons/category/design.svg?react';
import DevelopmentIcon from '@/shared/assets/icons/category/development.svg?react';
import EducationIcon from '@/shared/assets/icons/category/education.svg?react';
import HobbyIcon from '@/shared/assets/icons/category/hobby.svg?react';
import LivingIcon from '@/shared/assets/icons/category/living.svg?react';
import MarketingIcon from '@/shared/assets/icons/category/marketing.svg?react';
import PhotographIcon from '@/shared/assets/icons/category/photograph.svg?react';
import TranslationIcon from '@/shared/assets/icons/category/translation.svg?react';
import WriteIcon from '@/shared/assets/icons/category/write.svg?react';
import type { Category } from '@/entities/category/model/Category';

const ICON_SIZE = 72;

export const CATEGORIES: readonly Category[] = [
  {
    id: 1,
    name: '경영 · 기획',
    icon: <BusinessIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 2,
    name: '컨설팅 · 멘토링',
    icon: <ConsultingIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 3,
    name: '마케팅 · 홍보',
    icon: <MarketingIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 4,
    name: '개발 · IT',
    icon: <DevelopmentIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 5,
    name: '디자인 · 편집',
    icon: <DesignIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 6,
    name: '문서 · 작문',
    icon: <WriteIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 7,
    name: '번역 · 통역',
    icon: <TranslationIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 8,
    name: '사진 · 영상',
    icon: <PhotographIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 9,
    name: '교육 · 강의',
    icon: <EducationIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 10,
    name: '주문 제작',
    icon: <CraftIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 11,
    name: '취미 레슨',
    icon: <HobbyIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 12,
    name: '생활 서비스',
    icon: <LivingIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
];
