import type Category from '@type/Category';

import BusinessIcon from '@assets/icons/category/business.svg?react';
import ConsultingIcon from '@assets/icons/category/consulting.svg?react';
import MarketingIcon from '@assets/icons/category/marketing.svg?react';
import DevelopmentIcon from '@assets/icons/category/development.svg?react';
import DesignIcon from '@assets/icons/category/design.svg?react';
import WriteIcon from '@assets/icons/category/write.svg?react';
import TranslationIcon from '@assets/icons/category/translation.svg?react';
import PhotographIcon from '@assets/icons/category/photograph.svg?react';
import EducationIcon from '@assets/icons/category/education.svg?react';
import CraftIcon from '@assets/icons/category/craft.svg?react';
import HobbyIcon from '@assets/icons/category/hobby.svg?react';
import LivingIcon from '@assets/icons/category/living.svg?react';

const ICON_SIZE = 72;

export const CATEGORY_IDS = {
  BUSINESS: 1,
  CONSULTING: 2,
  MARKETING: 3,
  DEVELOPMENT: 4,
  DESIGN: 5,
  WRITE: 6,
  TRANSLATION: 7,
  PHOTOGRAPH: 8,
  EDUCATION: 9,
  CRAFT: 10,
  HOBBY: 11,
  LIVING: 12,
} as const;

const CATEGORIES: readonly Category[] = [
  {
    id: CATEGORY_IDS.BUSINESS,
    name: '경영 · 기획',
    icon: <BusinessIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.CONSULTING,
    name: '컨설팅 · 멘토링',
    icon: <ConsultingIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.MARKETING,
    name: '마케팅 · 홍보',
    icon: <MarketingIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.DEVELOPMENT,
    name: '개발 · IT',
    icon: <DevelopmentIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.DESIGN,
    name: '디자인 · 편집',
    icon: <DesignIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.WRITE,
    name: '문서 · 작문',
    icon: <WriteIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.TRANSLATION,
    name: '번역 · 통역',
    icon: <TranslationIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.PHOTOGRAPH,
    name: '사진 · 영상',
    icon: <PhotographIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.EDUCATION,
    name: '교육 · 강의',
    icon: <EducationIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.CRAFT,
    name: '주문 제작',
    icon: <CraftIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.HOBBY,
    name: '취미 레슨',
    icon: <HobbyIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.LIVING,
    name: '생활 서비스',
    icon: <LivingIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
];

export default CATEGORIES;
